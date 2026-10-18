"""GD Mimarlık Reels için özgün, telifsiz kısa müzikler.
Tüm sesler numpy ile sentezlenir (örnek veya kayıt kullanılmaz), bu yüzden telif sorunu yoktur.
Kullanım: python3 muzik_uret.py <çıktı_klasörü>
"""
import sys, os, wave
import numpy as np

SR = 44100
NOTE = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}


def hz(name, octave):
    return 440.0 * 2 ** ((NOTE[name] + 12 * (octave - 4) - 9) / 12)


def chord(root, kind, octave):
    iv = {'m7': [0, 3, 7, 10], 'maj7': [0, 4, 7, 11], 'm9': [0, 3, 7, 10, 14], 'maj': [0, 4, 7, 12],
          '6': [0, 4, 7, 9], 'sus2': [0, 2, 7, 12], 'add9': [0, 4, 7, 14]}[kind]
    base = hz(root, octave)
    return [base * 2 ** (i / 12) for i in iv]


def env(n, a, r, sr=SR):
    e = np.ones(n)
    na, nr = int(a * sr), int(r * sr)
    if na: e[:na] = np.linspace(0, 1, na) ** 1.5
    if nr: e[-nr:] *= np.linspace(1, 0, nr) ** 1.5
    return e


def pad(freqs, dur, vol=0.12):
    n = int(dur * SR); t = np.arange(n) / SR; out = np.zeros(n)
    for f in freqs:
        for det in (-0.12, 0.0, 0.12):  # hafif detune: geniş, sıcak yüzey
            ff = f * 2 ** (det / 12)
            out += np.sin(2 * np.pi * ff * t) + 0.35 * np.sin(2 * np.pi * 2 * ff * t + 0.4) + 0.12 * np.sin(2 * np.pi * 3 * ff * t)
    out *= vol / (len(freqs) * 3)
    return out * env(n, 0.9, 1.1)


def pluck(f, dur=1.6, vol=0.22):
    n = int(dur * SR); t = np.arange(n) / SR
    y = (np.sin(2 * np.pi * f * t) * np.exp(-t * 3.2) + 0.45 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 5.5)
         + 0.2 * np.sin(2 * np.pi * 3.01 * f * t) * np.exp(-t * 8))
    y[:int(.004 * SR)] *= np.linspace(0, 1, int(.004 * SR))
    return y * vol


def bass(f, dur, vol=0.28):
    n = int(dur * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t)) * vol * env(n, 0.03, 0.4)


def hat(vol=0.05, seed=0):
    n = int(0.06 * SR); rng = np.random.default_rng(seed)
    x = rng.standard_normal(n) * np.exp(-np.arange(n) / (0.012 * SR))
    return np.diff(x, prepend=0) * vol


def reverb(x, secs=2.4, wet=0.28, seed=3):
    rng = np.random.default_rng(seed); n = int(secs * SR)
    ir = rng.standard_normal((2, n)) * np.exp(-np.arange(n) / (0.5 * SR)) * 0.02
    L = np.fft.irfft(np.fft.rfft(x[0], len(x[0]) + n) * np.fft.rfft(ir[0], len(x[0]) + n))[:len(x[0])]
    R = np.fft.irfft(np.fft.rfft(x[1], len(x[1]) + n) * np.fft.rfft(ir[1], len(x[1]) + n))[:len(x[1])]
    return x * (1 - wet) + np.stack([L, R]) * wet * 6


def make(dur, bpm, prog, root_oct=3, arp=(0, 2, 1, 3, 2, 1, 3, 2), hats=False, bassline=True, pluck_vol=0.22, seed=1):
    n = int(dur * SR); mix = np.zeros((2, n)); spb = 60.0 / bpm; bar = 4 * spb
    rng = np.random.default_rng(seed)
    bars = int(np.ceil(dur / bar))
    for b in range(bars):
        root, kind = prog[b % len(prog)]; t0 = b * bar
        ch = chord(root, kind, root_oct)
        s0 = int(t0 * SR)
        p = pad(ch, bar + 1.2)
        seg = p[:max(0, min(len(p), n - s0))]
        mix[0, s0:s0 + len(seg)] += seg; mix[1, s0:s0 + len(seg)] += seg * 0.92
        if bassline:
            bs = bass(hz(root, root_oct - 1), bar)
            seg = bs[:max(0, min(len(bs), n - s0))]
            mix[0, s0:s0 + len(seg)] += seg; mix[1, s0:s0 + len(seg)] += seg
        for i, idx in enumerate(arp):
            t = t0 + i * spb / 2
            if t >= dur: break
            f = ch[idx % len(ch)] * 2
            pk = pluck(f, vol=pluck_vol * (0.8 + 0.4 * rng.random()))
            a = int(t * SR); seg = pk[:max(0, min(len(pk), n - a))]
            pan = 0.35 + 0.3 * (i % 2)
            mix[0, a:a + len(seg)] += seg * (1 - pan); mix[1, a:a + len(seg)] += seg * pan
        if hats:
            for i in range(8):
                t = t0 + i * spb / 2
                if t >= dur: break
                h = hat(seed=int(t * 100) % 97); a = int(t * SR); seg = h[:max(0, min(len(h), n - a))]
                mix[0, a:a + len(seg)] += seg; mix[1, a:a + len(seg)] += seg
    # yankı + yankılanma (reverb)
    d = int(spb * 0.75 * SR)
    echo = np.zeros_like(mix); echo[:, d:] = mix[:, :-d] * 0.32; mix = mix + echo[::-1]
    mix = reverb(mix)
    mix /= max(1e-6, np.max(np.abs(mix))); mix *= 0.82
    fi, fo = int(0.6 * SR), int(1.8 * SR)
    mix[:, :fi] *= np.linspace(0, 1, fi); mix[:, -fo:] *= np.linspace(1, 0, fo)
    return mix


TRACKS = {
    'tur':    dict(dur=17.1, bpm=84, prog=[('A', 'm9'), ('F', 'maj7'), ('C', 'add9'), ('G', '6')], seed=11),
    'surec':  dict(dur=16.4, bpm=92, prog=[('D', 'm7'), ('A#', 'maj7'), ('F', 'maj'), ('C', 'sus2')], arp=(0, 1, 2, 3, 2, 1, 3, 2), seed=12),
    'rakam':  dict(dur=16.2, bpm=100, prog=[('E', 'm7'), ('C', 'maj7'), ('G', '6'), ('D', 'sus2')], hats=True, seed=13),
    'hizmet': dict(dur=16.0, bpm=104, prog=[('C', 'maj7'), ('A', 'm7'), ('F', 'add9'), ('G', '6')], arp=(0, 2, 1, 3, 1, 2, 3, 1), hats=True, pluck_vol=0.25, seed=14),
    'cagri':  dict(dur=14.6, bpm=78, prog=[('A', 'm9'), ('G', '6'), ('F', 'maj7'), ('E', 'm7')], arp=(0, 3, 1, 2, 0, 3, 2, 1), pluck_vol=0.2, seed=15),
}

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else '.'
    os.makedirs(out, exist_ok=True)
    for name, kw in TRACKS.items():
        y = make(**kw)
        pcm = (np.clip(y.T, -1, 1) * 32767).astype('<i2')
        with wave.open(os.path.join(out, f'{name}.wav'), 'wb') as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
        print(name, 'tamam', kw['dur'], 'sn')

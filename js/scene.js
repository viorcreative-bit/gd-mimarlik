/* Ana sayfa girişi: kaydırdıkça evin içine girilir.
   Kamera, ev görselinin (2000x1328) odaları arasında yumuşakça gezinir. */
(() => {
  'use strict';
  const scene = document.getElementById('scene');
  if (!scene) return;
  const world = document.getElementById('world');
  const shade = document.getElementById('sceneShade');
  const intro = document.getElementById('sceneIntro');
  const card = document.getElementById('roomCard');
  const nav = document.getElementById('roomsNav');
  const cue = document.getElementById('sceneCue');
  const bar = document.getElementById('sceneBar');
  const cta = document.getElementById('rcCta');
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const W = 2000, H = 1328;

  // Odalar: görsel koordinatlarında [x, y, genişlik, yükseklik]
  const ROOMS = [
    { k: 'Çatı katı', rect: [440, 178, 430, 240], eyebrow: 'Kat 4 · Çatı katı', title: 'Işıkla dolu çalışma odası',
      text: 'Beyaz tavan, gömme spot aydınlatma ve bitki detayıyla sakin, ferah bir çalışma alanı.', tags: ['Gömme aydınlatma', 'Beyaz tavan', 'Yeşil detay'] },
    { k: 'Stüdyo', rect: [400, 335, 700, 400], eyebrow: 'Kat 3 · Stüdyo', title: 'Terracotta duvarlı stüdyo',
      text: 'Sıcak terracotta duvar, endüstriyel ray spotlar ve uzun çalışma masaları. Kalın perdeler akustiği yumuşatır.', tags: ['Terracotta duvar', 'Ray spot', 'Uzun çalışma masası', 'Keten perde'] },
    { k: 'Salon', rect: [412, 612, 660, 372], eyebrow: 'Kat 2 · Salon & mutfak', title: 'Krem tonlarda açık plan',
      text: 'Sıcak krem yüzeyler, düşük oturma grubu, sarkıt lambalar ve açık mutfak ile gün boyu ışık alan bir yaşam alanı.', tags: ['Krem palet', 'Sarkıt lamba', 'Açık mutfak', 'Saksı bitki'] },
    { k: 'Yaşam', rect: [432, 795, 665, 375], eyebrow: 'Kat 1 · Yaşam alanı', title: 'Yeşil duvar, ahşap zemin',
      text: 'Adaçayı yeşili duvar, koyu ahşap zemin, turuncu sandalyeler ve abajurlarla huzurlu bir akşam köşesi.', tags: ['Adaçayı duvar', 'Koyu ahşap zemin', 'Abajur', 'Turuncu sandalye'] }
  ];
  const HOUSE = [350, 150, 790, 900];
  const FULL = [0, 0, W, H];
  // [ilerleme, kamera, oda indeksi (-1 = oda yok)]
  const KF = [
    [0.00, 'full', -1], [0.07, 'full', -1], [0.17, HOUSE, -1],
    [0.24, ROOMS[0].rect, 0], [0.33, ROOMS[0].rect, 0],
    [0.40, ROOMS[1].rect, 1], [0.50, ROOMS[1].rect, 1],
    [0.57, ROOMS[2].rect, 2], [0.67, ROOMS[2].rect, 2],
    [0.74, ROOMS[3].rect, 3], [0.84, ROOMS[3].rect, 3],
    [0.93, HOUSE, 4], [1.00, HOUSE, 4]
  ];

  nav.innerHTML = ROOMS.map((r, i) => `<li><button type="button" data-i="${i}" aria-label="${r.eyebrow}"><span>${r.k}</span></button></li>`).join('');
  const tagsEl = document.getElementById('rcTags');
  let vw = innerWidth, vh = innerHeight, portrait = false, start = 0, span = 1;

  function measure() {
    vw = innerWidth; vh = innerHeight; portrait = vw < vh * 0.9;
    const r = scene.getBoundingClientRect();
    start = r.top + scrollY; span = Math.max(1, scene.offsetHeight - vh);
  }
  function cam(rect) {
    if (rect === 'full') {
      const s = Math.max(vw / W, vh / H);
      return { s, cx: portrait ? 760 : 1000, cy: H / 2 };
    }
    const [x, y, w, h] = rect;
    const fx = portrait ? 0.94 : 0.84, fy = portrait ? 0.46 : 0.7;
    const s = portrait ? vh * 0.4 / h : Math.min(vw * fx / w, vh * fy / h);
    // oda kartı için masaüstünde kamerayı hafif sağa, mobilde yukarı kaydır
    return { s, cx: x + w / 2 + (portrait ? 0 : -w * 0.06), cy: y + h / 2 + (portrait ? h * 0.18 : 0) };
  }
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  let shown = -2;
  function show(i) {
    if (i === shown) return; shown = i;
    nav.querySelectorAll('button').forEach((b, k) => b.classList.toggle('on', k === i));
    nav.classList.toggle('vis', i >= 0);
    if (i < 0) { card.classList.remove('on'); return; }
    if (i === 4) {
      document.getElementById('rcEyebrow').textContent = 'Sıra sizin evinizde';
      document.getElementById('rcTitle').textContent = 'Hayalinizdeki evi birlikte tasarlayalım';
      document.getElementById('rcText').textContent = 'Plan çiziminden son dekorasyon detayına kadar her katı sizinle birlikte kuruyoruz.';
      tagsEl.innerHTML = ''; cta.hidden = false;
    } else {
      const r = ROOMS[i];
      document.getElementById('rcEyebrow').textContent = r.eyebrow;
      document.getElementById('rcTitle').textContent = r.title;
      document.getElementById('rcText').textContent = r.text;
      tagsEl.innerHTML = r.tags.map(t => `<li>${t}</li>`).join(''); cta.hidden = true;
    }
    card.classList.remove('on'); void card.offsetWidth; card.classList.add('on');
  }

  function render() {
    const p = clamp((scrollY - start) / span, 0, 1);
    let a = KF[0], b = KF[KF.length - 1];
    for (let i = 0; i < KF.length - 1; i++) if (p >= KF[i][0] && p <= KF[i + 1][0]) { a = KF[i]; b = KF[i + 1]; break; }
    const t = b[0] === a[0] ? 1 : ease((p - a[0]) / (b[0] - a[0]));
    const ca = cam(a[1]), cb = cam(b[1]);
    const s = Math.exp(Math.log(ca.s) + (Math.log(cb.s) - Math.log(ca.s)) * t);
    const cx = ca.cx + (cb.cx - ca.cx) * t, cy = ca.cy + (cb.cy - ca.cy) * t;
    world.style.transform = `translate3d(${vw / 2 - cx * s}px,${vh / 2 - cy * s}px,0) scale(${s})`;
    intro.style.opacity = clamp(1 - p / 0.075, 0, 1);
    intro.style.pointerEvents = p > 0.06 ? 'none' : 'auto';
    intro.style.transform = `translateY(${-p * 160}px)`;
    shade.style.opacity = clamp(1 - p / 0.15, 0, 1);
    cue.style.opacity = clamp(1 - p / 0.05, 0, 1);
    bar.style.transform = `scaleX(${p})`;
    // en yakın bekleme noktasındaki oda
    show(p >= 0.2 ? (b[2] === a[2] ? a[2] : (t > .5 ? b[2] : a[2])) : -1);
  }

  nav.addEventListener('click', e => {
    const btn = e.target.closest('button'); if (!btn) return;
    const i = +btn.dataset.i, kf = KF.find(k => k[2] === i);
    scrollTo({ top: start + span * kf[0] + 2, behavior: reduce ? 'auto' : 'smooth' });
  });

  if (reduce) {
    // hareketi azaltılmış kullanıcılar için: sabit görünüm
    scene.classList.add('static');
    world.style.transform = `translate3d(${(innerWidth - W * Math.max(innerWidth / W, innerHeight / H)) / 2}px,0,0) scale(${Math.max(innerWidth / W, innerHeight / H)})`;
    return;
  }
  let tick = false;
  const on = () => { if (!tick) { tick = true; requestAnimationFrame(() => { render(); tick = false; }); } };
  addEventListener('scroll', on, { passive: true });
  addEventListener('resize', () => { measure(); render(); });
  addEventListener('load', () => { measure(); render(); });
  measure(); render();
})();

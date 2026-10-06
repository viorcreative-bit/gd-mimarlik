/* Ana sayfa girişi: kaydırdıkça evin içine girilir.
   Kamera ev görselinin (2000x1328) odaları arasında gezinir; odaklanan oda köşe çerçeveyle
   vurgulanır, çevresi bulanıklaşır ve bir çizgiyle açıklama kartına bağlanır. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const scene = $('scene');
  if (!scene) return;
  const stage = scene.querySelector('.stage');
  const world = $('world'), shade = $('sceneShade'), intro = $('sceneIntro');
  const card = $('roomCard'), nav = $('roomsNav'), cue = $('sceneCue'), bar = $('sceneBar'), cta = $('rcCta');
  const dim = $('focusDim'), frame = $('focusFrame'), leader = $('leader');
  const line = $('leaderLine'), ring = $('leaderRing'), dot = $('leaderDot');
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const W = 2000, H = 1328;

  // rect: görsel koordinatlarında [x, y, genişlik, yükseklik]; pt: işaret noktası; side: kart tarafı
  const ROOMS = [
    { k: 'Çatı katı', rect: [735, 105, 590, 255], pt: [836, 282], side: 'L', eyebrow: 'Kat 4 · Çatı katı', title: 'Gece ışığında ana salon',
      text: 'Gömme spotlar, tavan kornişi ve sıcak abajur ışığıyla akşamları sakin ve davetkar bir yaşam odası.', tags: ['Gömme spot', 'Abajur', 'Altın perde', 'Tavan kornişi'] },
    { k: 'Mutfak & salon', rect: [605, 352, 810, 240], pt: [1062, 505], side: 'R', eyebrow: 'Kat 3 · Mutfak & salon', title: 'Krem tonlarda açık plan',
      text: 'Turuncu sandalyeler, sarkıt aydınlatma ve saksı bitkisiyle gün boyu canlı, sıcak bir mutfak ve oturma alanı.', tags: ['Açık mutfak', 'Turuncu sandalye', 'Sarkıt lamba', 'Saksı bitki'] },
    { k: 'Yemek & oturma', rect: [580, 596, 810, 230], pt: [838, 782], side: 'L', eyebrow: 'Kat 2 · Yemek & oturma', title: 'Bal tonlarında yaşam alanı',
      text: 'Büyük yemek masası, sarkıt lambalar, koltuk grubu ve zemin lambasıyla aile akşamlarına uygun sıcak bir köşe.', tags: ['Yemek masası', 'Sarkıt lamba', 'Zemin lambası', 'Bal tonu'] },
    { k: 'Stüdyo', rect: [715, 828, 785, 290], pt: [940, 1010], side: 'R', eyebrow: 'Kat 1 · Stüdyo', title: 'Ray spotlu çalışma stüdyosu',
      text: 'Endüstriyel ray spotlar, uzun çalışma masaları ve renkli parke zeminle ekibin bir arada çalıştığı ferah alan.', tags: ['Ray spot', 'Parke zemin', 'Çalışma masası', 'Kalın perde'] }
  ];
  const HOUSE = [560, 90, 950, 1040];
  const KF = [ // [ilerleme, kamera, oda]
    [0.00, 'full', -1], [0.07, 'full', -1], [0.17, HOUSE, -1],
    [0.24, 0, 0], [0.33, 0, 0],
    [0.40, 1, 1], [0.50, 1, 1],
    [0.57, 2, 2], [0.67, 2, 2],
    [0.74, 3, 3], [0.84, 3, 3],
    [0.93, HOUSE, 4], [1.00, HOUSE, 4]
  ];

  nav.innerHTML = ROOMS.map((r, i) => `<li><button type="button" data-i="${i}" aria-label="${r.eyebrow}"><span>${r.k}</span></button></li>`).join('');
  const tagsEl = $('rcTags');
  let vw = innerWidth, vh = innerHeight, sw = vw, sh = vh, portrait = false, start = 0, span = 1;
  let shown = -2, closed = false, cur = { s: 1, tx: 0, ty: 0 };

  function measure() {
    vw = innerWidth; vh = innerHeight; portrait = vw < vh * 0.9;
    const sr = stage.getBoundingClientRect(); sw = sr.width; sh = sr.height;
    const r = scene.getBoundingClientRect(); start = r.top + scrollY; span = Math.max(1, scene.offsetHeight - vh);
  }
  function cam(k) {
    const cover = Math.max(sw / W, sh / H);
    let s, cx, cy;
    if (k === 'full') { s = cover * 1.15; cx = portrait ? 1040 : 0; cy = H / 2; }
    else {
      const room = typeof k === 'number' ? ROOMS[k] : null;
      const [x, y, w, h] = room ? room.rect : k;
      cx = x + w / 2; cy = y + h / 2;
      if (room) {
        if (portrait) { s = sh * 0.4 / h; cy += h * 0.18; }
        else {
          s = Math.min(sw * 0.58 / w, sh * 0.72 / h);
          cx += (room.side === 'L' ? -1 : 1) * (sw * 0.1) / s; // oda karşı tarafa kayar, kart boşluğa girer
        }
      } else s = portrait ? Math.min(sw * 0.94 / w, sh * 0.5 / h) : Math.min(sw * 0.84 / w, sh * 0.78 / h);
    }
    s = Math.max(s, cover); // görselin dışına taşma
    const hx = sw / 2 / s, hy = sh / 2 / s;
    cx = Math.min(W - hx, Math.max(hx, cx)); cy = Math.min(H - hy, Math.max(hy, cy));
    return { s, cx, cy };
  }
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  function setCard(i) {
    $('rcCount').textContent = i === 4 ? '' : `0${i + 1} / 0${ROOMS.length}`;
    if (i === 4) {
      $('rcEyebrow').textContent = 'Sıra sizin evinizde';
      $('rcTitle').textContent = 'Hayalinizdeki evi birlikte tasarlayalım';
      $('rcText').textContent = 'Plan çiziminden son dekorasyon detayına kadar her katı sizinle birlikte kuruyoruz.';
      tagsEl.innerHTML = ''; cta.hidden = false;
    } else {
      const r = ROOMS[i];
      $('rcEyebrow').textContent = r.eyebrow; $('rcTitle').textContent = r.title; $('rcText').textContent = r.text;
      tagsEl.innerHTML = r.tags.map(t => `<li>${t}</li>`).join(''); cta.hidden = true;
    }
    card.classList.remove('L', 'R'); card.classList.add(i === 4 ? 'L' : ROOMS[i].side);
    card.classList.remove('on'); void card.offsetWidth;
  }
  function show(i) {
    if (i === shown) return; shown = i; closed = false;
    nav.classList.toggle('vis', i >= 0);
    nav.querySelectorAll('button').forEach((b, k) => b.classList.toggle('on', k === i));
    if (i >= 0) setCard(i);
  }

  function render() {
    const p = clamp((scrollY - start) / span, 0, 1);
    let a = KF[0], b = KF[KF.length - 1];
    for (let i = 0; i < KF.length - 1; i++) if (p >= KF[i][0] && p <= KF[i + 1][0]) { a = KF[i]; b = KF[i + 1]; break; }
    const t = b[0] === a[0] ? 1 : ease((p - a[0]) / (b[0] - a[0]));
    const ca = cam(a[1]), cb = cam(b[1]);
    const s = Math.exp(Math.log(ca.s) + (Math.log(cb.s) - Math.log(ca.s)) * t);
    const cx = ca.cx + (cb.cx - ca.cx) * t, cy = ca.cy + (cb.cy - ca.cy) * t;
    const tx = sw / 2 - cx * s, ty = sh / 2 - cy * s;
    cur = { s, tx, ty };
    world.style.transform = `translate3d(${tx}px,${ty}px,0) scale(${s})`;
    intro.style.opacity = clamp(1 - p / 0.075, 0, 1);
    intro.style.pointerEvents = p > 0.06 ? 'none' : 'auto';
    intro.style.transform = `translateY(${-p * 160}px)`;
    shade.style.opacity = clamp(1 - p / 0.15, 0, 1);
    cue.style.opacity = clamp(1 - p / 0.05, 0, 1);
    bar.style.transform = `scaleX(${p})`;

    // oda odağı: 1 = tam odakta
    const ra = a[2], rb = b[2];
    let room, f;
    if (ra >= 0 && ra === rb) { room = ra; f = 1; }
    else if (ra >= 0 && rb >= 0) { room = t > .5 ? rb : ra; f = Math.abs(1 - 2 * t) ; }
    else if (ra >= 0 && rb < 0) { room = ra; f = 1 - t; }
    else if (rb >= 0 && rb < 4) { room = rb; f = t; }
    else { room = -1; f = 0; }
    const cardRoom = room === -1 ? (ra === 4 || rb === 4 ? 4 : -1) : room;
    const finalStage = (ra === 4 && rb === 4) || (rb === 4 && t > .5);
    show(finalStage ? 4 : (f > .5 ? room : (room >= 0 && room < 4 && f > .02 ? room : -1)));
    const active = shown;
    const isRoom = active >= 0 && active < 4 && f > 0.02;
    const vis = (isRoom ? f : (active === 4 ? clamp((p - 0.935) / 0.04, 0, 1) : 0));
    card.classList.toggle('on', vis > 0.55 && !closed);

    if (isRoom && !portrait) {
      const r = ROOMS[active].rect, pad = 14;
      const x = tx + r[0] * s - pad, y = ty + r[1] * s - pad, w = r[2] * s + pad * 2, h = r[3] * s + pad * 2;
      frame.style.cssText = `opacity:${f};transform:translate(${x}px,${y}px);width:${w}px;height:${h}px`;
      dim.style.opacity = f;
      const bs = dim.children, X = Math.max(0, x), Y = Math.max(0, y), X2 = Math.min(sw, x + w), Y2 = Math.min(sh, y + h);
      const set = (el, l, t, wd, ht) => { el.style.cssText = `left:${l}px;top:${t}px;width:${Math.max(0, wd)}px;height:${Math.max(0, ht)}px`; };
      set(bs[0], 0, 0, sw, Y); set(bs[1], 0, Y2, sw, sh - Y2); set(bs[2], 0, Y, X, Y2 - Y); set(bs[3], X2, Y, sw - X2, Y2 - Y);
    } else { frame.style.opacity = 0; dim.style.opacity = 0; }

    // işaret ve bağlantı çizgisi
    if (isRoom && !closed && vis > .55 && !portrait) {
      const pt = ROOMS[active].pt, px = tx + pt[0] * s, py = ty + pt[1] * s;
      const cr = card.getBoundingClientRect(), sr = stage.getBoundingClientRect();
      const left = card.classList.contains('L');
      const ax = (left ? cr.right : cr.left) - sr.left, ay = cr.top - sr.top + 52;
      line.setAttribute('x1', ax); line.setAttribute('y1', ay); line.setAttribute('x2', px); line.setAttribute('y2', py);
      ring.setAttribute('cx', px); ring.setAttribute('cy', py); dot.setAttribute('cx', px); dot.setAttribute('cy', py);
      leader.style.opacity = f;
    } else leader.style.opacity = 0;
  }

  $('rcClose').addEventListener('click', () => { closed = true; card.classList.remove('on'); leader.style.opacity = 0; });
  $('skipScene').addEventListener('click', () => scrollTo({ top: start + span + vh * 0.9, behavior: reduce ? 'auto' : 'smooth' }));
  nav.addEventListener('click', e => {
    const btn = e.target.closest('button'); if (!btn) return;
    const i = +btn.dataset.i, kf = KF.find(k => k[2] === i);
    scrollTo({ top: start + span * kf[0] + 2, behavior: reduce ? 'auto' : 'smooth' });
  });

  if (reduce) {
    scene.classList.add('static'); measure();
    const s = Math.max(sw / W, sh / H);
    world.style.transform = `translate3d(${(sw - W * s) / 2}px,0,0) scale(${s})`;
    return;
  }
  let tick = false;
  const on = () => { if (!tick) { tick = true; requestAnimationFrame(() => { render(); tick = false; }); } };
  addEventListener('scroll', on, { passive: true });
  addEventListener('resize', () => { measure(); render(); });
  addEventListener('load', () => { measure(); render(); });
  measure(); render();
})();

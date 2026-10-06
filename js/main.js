(() => {
  'use strict';
  // ── Ayarlar ── gerçek numara/e-posta bilgilerini buradan güncelleyin
  const CONFIG = {
    email: 'info@gdmimarlik.com',
    whatsapp: '' // örn. '905321234567' (başında + olmadan). Boşsa WhatsApp butonu e-postaya yönlendirir.
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const img = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=78`;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const { PROJECTS, SERVICES, NEWS, PROCESS } = window;

  // hatalı görseller için zarif yedek
  document.addEventListener('error', e => {
    const t = e.target;
    if (t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = 1; t.style.visibility = 'hidden'; t.parentElement.style.background = 'linear-gradient(135deg,#d9d3c6,#b8935a55)'; }
  }, true);

  /* ── Preloader ── */
  const loader = $('#loader'), num = $('#loaderNum'), bar = $('#loaderBar');
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + Math.random() * 14 + 4);
    num.textContent = Math.floor(p); bar.style.width = p + '%';
    if (p >= 100) { clearInterval(tick); setTimeout(start, 250); }
  }, 80);
  function start() {
    loader.classList.add('done');
    document.body.classList.remove('is-loading');
    setTimeout(() => document.body.classList.add('ready'), 350);
    setTimeout(() => loader.remove(), 1400);
  }

  /* ── Render ── */
  const projGrid = $('#projGrid');
  projGrid.innerHTML = PROJECTS.map((pr, i) => `
    <article class="proj rv" data-cat="${pr.cat}" data-id="${pr.id}" data-cursor="Aç" tabindex="0" role="button" aria-label="${pr.name}">
      <div class="proj-img"><img src="${img(pr.img, 1400)}" alt="${pr.name}" loading="lazy">${pr.tag ? `<span class="proj-tag">${pr.tag}</span>` : ''}</div>
      <div class="proj-info"><h3 class="proj-name">${pr.name}</h3><span class="proj-sub">${pr.catLabel} · ${pr.loc.split(',')[0]} · ${pr.year}</span></div>
    </article>`).join('');

  $('#svcList').innerHTML = SERVICES.map((s, i) => `
    <li class="svc${i === 0 ? ' open' : ''}" data-i="${i}">
      <div class="svc-head"><span class="svc-n">${s.n}</span><span class="svc-t">${s.t}</span><span class="svc-plus"></span></div>
      <div class="svc-body"><div><p>${s.d}</p></div></div>
    </li>`).join('');
  $('#svcImg').src = img(SERVICES[0].img, 900);

  $('#steps').innerHTML = PROCESS.map((s, i) => `
    <li class="step rv"><span class="step-n">0${i + 1}</span><span class="step-t">${s[0]}</span><p class="step-d">${s[1]}</p></li>`).join('');

  $('#newsGrid').innerHTML = NEWS.map(n => `
    <article class="news rv" data-id="${n.id}" data-cursor="Oku" tabindex="0" role="button" aria-label="${n.title}">
      <div class="news-img"><img src="${img(n.img, 1000)}" alt="" loading="lazy"></div>
      <span class="news-cat">${n.cat}</span>
      <h3 class="news-t">${n.title}</h3>
      <p class="news-ex">${n.excerpt}</p>
      <span class="news-meta">${n.date} · ${n.read} okuma</span>
    </article>`).join('');

  $('#year').textContent = new Date().getFullYear();

  /* ── Manifesto: kelime kelime aydınlanma ── */
  const man = $('#manifesto');
  man.innerHTML = man.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
  const words = $$('.w', man);

  /* ── Scroll: progress, nav, manifesto, parallax ── */
  const nav = $('#nav'), prog = $('#progress');
  let lastY = 0, ticking = false;
  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (y / h * 100) + '%';
    nav.classList.toggle('scrolled', y > 60);
    nav.classList.toggle('hide', y > lastY && y > 500 && !$('#menu').classList.contains('open'));
    lastY = y;
    const r = man.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
    const n = Math.round(t * words.length);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
    if (!reduce) $$('.proj:not(.out) .proj-img img').forEach(im => {
      const b = im.parentElement.getBoundingClientRect();
      if (b.bottom < 0 || b.top > innerHeight) return;
      const k = (b.top + b.height / 2 - innerHeight / 2) / innerHeight;
      im.style.transform = `translateY(${-k * 6}%)`;
    });
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ── Reveal + sayaç ── */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });
  $$('.section-head,.manifesto-foot,.quote blockquote,.contact-title,.info>div').forEach(el => { el.classList.add('rv'); io.observe(el); });

  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, t0 = performance.now(), d = 1800;
    (function step(t) {
      const k = Math.min(1, (t - t0) / d);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4)));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => cio.observe(el));

  /* ── Menü ── */
  const burger = $('#burger'), menu = $('#menu');
  function toggleMenu(open) {
    const o = open ?? !menu.classList.contains('open');
    menu.classList.toggle('open', o); burger.classList.toggle('open', o);
    burger.setAttribute('aria-expanded', o); menu.setAttribute('aria-hidden', !o);
    document.body.classList.toggle('no-scroll', o);
  }
  burger.addEventListener('click', () => toggleMenu());
  $$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ── Filtre ── */
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    $$('#filters .chip').forEach(c => c.classList.toggle('active', c === b));
    $$('.proj').forEach(c => {
      const show = b.dataset.f === 'all' || c.dataset.cat === b.dataset.f;
      c.classList.toggle('out', !show);
      if (show) { c.classList.remove('in'); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('in'))); }
    });
    onScroll();
  });

  /* ── Hizmetler akordeon ── */
  const svcImg = $('#svcImg');
  $('#svcList').addEventListener('click', e => {
    const li = e.target.closest('.svc'); if (!li) return;
    $$('.svc').forEach(s => s.classList.toggle('open', s === li));
    const s = SERVICES[li.dataset.i];
    svcImg.classList.add('swap');
    setTimeout(() => { svcImg.src = img(s.img, 900); svcImg.classList.remove('swap'); }, 300);
  });

  /* ── Overlay: proje & yazı ── */
  const ov = $('#overlay'), ovBody = $('#overlayBody'), ovScroll = $('#overlayScroll');
  let current = null;
  function openProject(id, push = true) {
    const pr = PROJECTS[id]; if (!pr) return;
    const next = PROJECTS[(id + 1) % PROJECTS.length];
    ovBody.innerHTML = `
      <div class="ov-hero"><img src="${img(pr.img, 2000)}" alt="${pr.name}">
        <div class="ov-hero-text"><p class="eyebrow">${pr.catLabel} — ${pr.loc}</p><h2 class="ov-title">${pr.name}</h2></div></div>
      <div class="wrap ov-main">
        <div class="ov-text"><p class="ov-lead">${pr.lead}</p>${pr.body.map(t => `<p>${t}</p>`).join('')}</div>
        <div class="meta">
          ${[['Konum', pr.loc], ['Alan', pr.area], ['Yıl', pr.year], ['Süre', pr.duration], ['Durum', pr.status], ['Tür', pr.type]].map(([l, v]) => `<div><span>${l}</span><b style="font-weight:500">${v}</b></div>`).join('')}
        </div>
      </div>
      <div class="wrap ov-gallery">${pr.gallery.map(g => `<img src="${img(g, 1400)}" alt="${pr.name} görsel" loading="lazy">`).join('')}</div>
      <a class="ov-next" data-open="p${next.id}"><small>Sonraki proje</small><div>${next.name} →</div></a>`;
    show(push ? '#proje-' + id : null);
  }
  function openNews(id, push = true) {
    const n = NEWS[id]; if (!n) return;
    ovBody.innerHTML = `<article class="article">
      <span class="news-cat">${n.cat}</span><h1>${n.title}</h1><div class="news-meta">${n.date} · ${n.read} okuma</div>
      <img src="${img(n.img, 1600)}" alt="">${n.body.map(([t, x]) => t === 'h' ? `<h2>${x}</h2>` : `<p>${x}</p>`).join('')}
      <p style="margin-top:2.5rem"><a class="link-arrow" href="#iletisim" data-close>Projeniz için yazın →</a></p></article>`;
    show(push ? '#yazi-' + id : null);
  }
  function show(hash) {
    ovScroll.scrollTop = 0; current = hash;
    ov.classList.add('open'); ov.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    if (hash) history.pushState(null, '', hash);
    $('#overlayClose').focus({ preventScroll: true });
  }
  function closeOv(push = true) {
    ov.classList.remove('open'); ov.setAttribute('aria-hidden', 'true');
    if (!menu.classList.contains('open')) document.body.classList.remove('no-scroll');
    if (push && current) history.pushState(null, '', location.pathname + location.search);
    current = null;
  }
  $('#overlayClose').addEventListener('click', () => closeOv());
  ov.addEventListener('click', e => {
    const o = e.target.closest('[data-open]');
    if (o) openProject(+o.dataset.open.slice(1));
    if (e.target.closest('[data-close]')) { closeOv(); }
    const g = e.target.closest('.ov-gallery img');
    if (g) { $('#lightboxImg').src = g.src.replace(/w=\d+/, 'w=2200'); $('#lightbox').classList.add('open'); }
  });
  projGrid.addEventListener('click', e => { const c = e.target.closest('.proj'); if (c) openProject(+c.dataset.id); });
  $('#newsGrid').addEventListener('click', e => { const c = e.target.closest('.news'); if (c) openNews(+c.dataset.id); });
  [projGrid, $('#newsGrid')].forEach(g => g.addEventListener('keydown', e => { if (e.key === 'Enter') e.target.click(); }));
  $('#lightbox').addEventListener('click', () => $('#lightbox').classList.remove('open'));
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if ($('#lightbox').classList.contains('open')) $('#lightbox').classList.remove('open');
    else if (ov.classList.contains('open')) closeOv();
    else toggleMenu(false);
  });
  function route() {
    const h = location.hash;
    const m = h.match(/^#(proje|yazi)-(\d+)$/);
    if (m) (m[1] === 'proje' ? openProject : openNews)(+m[2], false), current = h;
    else if (ov.classList.contains('open')) closeOv(false);
  }
  addEventListener('popstate', route);
  if (/^#(proje|yazi)-/.test(location.hash)) route();

  /* ── Form ── */
  const form = $('#form'), msg = $('#formMsg');
  let ptype = '';
  $('#pills').addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    const on = !b.classList.contains('active');
    $$('#pills .chip').forEach(c => c.classList.remove('active'));
    b.classList.toggle('active', on); ptype = on ? b.textContent : '';
  });
  function compose() {
    const f = Object.fromEntries(new FormData(form));
    return `Merhaba GD Mimarlık,\n\nAdım: ${f.ad} ${f.soyad || ''}\nE-posta: ${f.email}\nTelefon: ${f.tel || '-'}\nProje türü: ${ptype || '-'}\n\n${f.mesaj}`;
  }
  function valid() {
    let ok = true;
    $$('[required]', form).forEach(i => {
      const bad = !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value));
      i.classList.toggle('err', bad); if (bad) ok = false;
    });
    msg.textContent = ok ? '' : 'Lütfen işaretli alanları doldurun.';
    return ok;
  }
  form.addEventListener('submit', e => {
    e.preventDefault(); if (!valid()) return;
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Proje talebi — ' + (ptype || 'Genel'))}&body=${encodeURIComponent(compose())}`;
    msg.textContent = 'E-posta uygulamanız açılıyor — gönder tuşuna basmanız yeterli. Teşekkürler!';
  });
  $('#waBtn').addEventListener('click', () => {
    if (!valid()) return;
    if (CONFIG.whatsapp) open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(compose())}`, '_blank');
    else form.requestSubmit();
  });

  /* ── İmleç & mıknatıs ── */
  if (fine && !reduce) {
    const c = $('#cursor'), lab = $('#cursorLabel');
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; c.classList.add('on'); });
    (function loop() { cx += (x - cx) * .18; cy += (y - cy) * .18; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-cursor]');
      c.classList.toggle('big', !!t); c.classList.toggle('has-label', !!t);
      lab.textContent = t ? t.dataset.cursor : '';
    });
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      el.addEventListener('mouseleave', () => el.style.transform = '');
    });
  }

  $('#toTop').addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: 'smooth' }); });
})();

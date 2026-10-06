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
  const page = document.body.dataset.page;
  const params = new URLSearchParams(location.search);

  // hatalı görseller için zarif yedek
  document.addEventListener('error', e => {
    const t = e.target;
    if (t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = 1; t.style.visibility = 'hidden'; t.parentElement.style.background = 'linear-gradient(135deg,#d9d3c6,#b8935a55)'; }
  }, true);

  /* ── Ortak yerleşim: menü, alt bilgi, imleç ── */
  const LINKS = [['index.html', 'Ana Sayfa', 'home'], ['hakkimizda.html', 'Hakkımızda', 'about'], ['projeler.html', 'Projeler', 'projects', 'project'], ['hizmetler.html', 'Hizmetler', 'services'], ['haberler.html', 'Günlük', 'news', 'article']];
  const isActive = l => l[2] === page || l[3] === page;
  $('#site-header').innerHTML = `
    <div class="cursor" id="cursor" aria-hidden="true"><span id="cursorLabel"></span></div>
    <div class="progress" id="progress"></div>
    <header class="nav" id="nav">
      <a href="index.html" class="brand" data-magnetic>GD<span>.</span> <em>Mimarlık</em></a>
      <nav class="nav-links" aria-label="Ana menü">
        ${LINKS.slice(1).map(l => `<a href="${l[0]}"${isActive(l) ? ' class="current"' : ''}>${l[1]}</a>`).join('')}
        <a href="iletisim.html" class="nav-cta${page === 'contact' ? ' current' : ''}" data-magnetic>İletişim <b>→</b></a>
      </nav>
      <button class="burger" id="burger" aria-label="Menüyü aç" aria-expanded="false"><span></span><span></span></button>
    </header>
    <div class="menu" id="menu" aria-hidden="true">
      <nav>${[...LINKS, ['iletisim.html', 'İletişim', 'contact']].map((l, i) => `<a href="${l[0]}"><small>0${i + 1}</small>${l[1]}</a>`).join('')}</nav>
      <div class="menu-foot"><span>Ataşehir, İstanbul</span><a href="mailto:${CONFIG.email}">${CONFIG.email}</a><a href="https://www.instagram.com/gdmimarlik/" target="_blank" rel="noopener">@gdmimarlik</a></div>
    </div>`;
  $('#site-footer').innerHTML = `
    <footer class="footer">
      <div class="wrap footer-top">
        <img src="assets/logo.png" alt="GD Mimarlık" class="footer-logo">
        <p>Villa, ofis, kafe, restoran ve daha birçok alanda proje tasarım ve uygulama. Her proje bizim için bir imzadır.</p>
        <div class="footer-links">${[...LINKS, ['iletisim.html', 'İletişim']].map(l => `<a href="${l[0]}">${l[1]}</a>`).join('')}</div>
      </div>
      <div class="footer-word" aria-hidden="true">GD Mimarlık</div>
      <div class="wrap footer-bottom">
        <span>© ${new Date().getFullYear()} GD Mimarlık. Tüm hakları saklıdır.</span>
        <span><a href="https://www.instagram.com/gdmimarlik/" target="_blank" rel="noopener">Instagram</a> · <a href="#top" id="toTop">Yukarı ↑</a></span>
      </div>
    </footer>`;
  $('#toTop').addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });

  /* ── Açılış: yalnızca oturumdaki ilk ana sayfa ziyaretinde ── */
  let seen = false;
  try { seen = sessionStorage.getItem('gd-seen') === '1'; sessionStorage.setItem('gd-seen', '1'); } catch (e) {}
  if (page === 'home' && !seen) {
    document.body.classList.add('is-loading');
    const l = document.createElement('div');
    l.className = 'loader'; l.setAttribute('aria-hidden', 'true');
    l.innerHTML = '<div class="loader-word">GD <i>Mimarlık</i></div><div class="loader-count"><span id="loaderNum">0</span></div><div class="loader-bar"><span id="loaderBar"></span></div>';
    document.body.prepend(l);
    const num = $('#loaderNum'), bar = $('#loaderBar');
    let p = 0;
    const tick = setInterval(() => {
      p = Math.min(100, p + Math.random() * 14 + 4);
      num.textContent = Math.floor(p); bar.style.width = p + '%';
      if (p >= 100) { clearInterval(tick); setTimeout(() => { l.classList.add('done'); document.body.classList.remove('is-loading'); setTimeout(ready, 350); setTimeout(() => l.remove(), 1400); }, 250); }
    }, 80);
  } else requestAnimationFrame(() => requestAnimationFrame(ready));
  function ready() { document.body.classList.add('ready'); }

  /* ── Sayfa geçişi ── */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname === location.pathname && u.search === location.search) return;
    if (reduce) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = u.href; }, 420);
  });
  addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('leaving'); });

  /* ── Kart şablonları ── */
  const projCard = pr => `
    <article class="proj rv" data-cat="${pr.cat}">
      <a href="proje.html?id=${pr.id}" data-cursor="Aç" aria-label="${pr.name}">
        <div class="proj-img"><img src="${img(pr.img, 1400)}" alt="${pr.name}" loading="lazy">${pr.tag ? `<span class="proj-tag">${pr.tag}</span>` : ''}</div>
        <div class="proj-info"><h3 class="proj-name">${pr.name}</h3><span class="proj-sub">${pr.catLabel} · ${pr.loc.split(',')[0]} · ${pr.year}</span></div>
      </a>
    </article>`;
  const newsCard = n => `
    <article class="news rv">
      <a href="haber.html?id=${n.id}" data-cursor="Oku">
        <div class="news-img"><img src="${img(n.img, 1000)}" alt="" loading="lazy"></div>
        <span class="news-cat">${n.cat}</span>
        <h3 class="news-t">${n.title}</h3>
        <p class="news-ex">${n.excerpt}</p>
        <span class="news-meta">${n.date} · ${n.read} okuma</span>
      </a>
    </article>`;

  const projGrid = $('#projGrid');
  if (projGrid) projGrid.innerHTML = PROJECTS.slice(0, +projGrid.dataset.limit || undefined).map(projCard).join('');
  const newsGrid = $('#newsGrid');
  if (newsGrid) newsGrid.innerHTML = (page === 'home' ? NEWS.slice(0, 3) : NEWS).map(newsCard).join('');
  const steps = $('#steps');
  if (steps) steps.innerHTML = PROCESS.map((s, i) => `<li class="step rv"><span class="step-n">0${i + 1}</span><span class="step-t">${s[0]}</span><p class="step-d">${s[1]}</p></li>`).join('');
  const tiles = $('#svcTiles');
  if (tiles) tiles.innerHTML = SERVICES.map(s => `<a href="hizmetler.html" class="tile rv"><span class="tile-n">${s.n}</span><h3>${s.t}</h3><p>${s.d}</p></a>`).join('');

  /* ── Hizmetler akordeon ── */
  const svcList = $('#svcList');
  if (svcList) {
    svcList.innerHTML = SERVICES.map((s, i) => `
      <li class="svc${i === 0 ? ' open' : ''}" data-i="${i}">
        <div class="svc-head"><span class="svc-n">${s.n}</span><span class="svc-t">${s.t}</span><span class="svc-plus"></span></div>
        <div class="svc-body"><div><p>${s.d}</p></div></div>
      </li>`).join('');
    const svcImg = $('#svcImg'); svcImg.src = img(SERVICES[0].img, 900);
    svcList.addEventListener('click', e => {
      const li = e.target.closest('.svc'); if (!li) return;
      $$('.svc').forEach(s => s.classList.toggle('open', s === li));
      svcImg.classList.add('swap');
      setTimeout(() => { svcImg.src = img(SERVICES[li.dataset.i].img, 900); svcImg.classList.remove('swap'); }, 300);
    });
  }

  /* ── Detay sayfaları ── */
  const detail = $('#detail');
  if (detail && page === 'project') {
    const id = Math.max(0, Math.min(PROJECTS.length - 1, +params.get('id') || 0));
    const pr = PROJECTS[id], next = PROJECTS[(id + 1) % PROJECTS.length];
    document.title = `${pr.name} — GD Mimarlık`;
    detail.innerHTML = `
      <div class="ov-hero"><img src="${img(pr.img, 2000)}" alt="${pr.name}">
        <div class="ov-hero-text"><p class="eyebrow">${pr.catLabel} — ${pr.loc}</p><h1 class="ov-title">${pr.name}</h1></div></div>
      <div class="wrap ov-main">
        <div class="ov-text"><p class="ov-lead">${pr.lead}</p>${pr.body.map(t => `<p>${t}</p>`).join('')}</div>
        <div class="meta">${[['Konum', pr.loc], ['Alan', pr.area], ['Yıl', pr.year], ['Süre', pr.duration], ['Durum', pr.status], ['Tür', pr.type]].map(([l, v]) => `<div><span>${l}</span><b style="font-weight:500">${v}</b></div>`).join('')}</div>
      </div>
      <div class="wrap ov-gallery">${pr.gallery.map(g => `<img src="${img(g, 1400)}" alt="${pr.name} görsel" loading="lazy">`).join('')}</div>
      <a class="ov-next" href="proje.html?id=${next.id}"><small>Sonraki proje</small><div>${next.name} →</div></a>`;
    const lb = $('#lightbox');
    detail.addEventListener('click', e => {
      const g = e.target.closest('.ov-gallery img'); if (!g) return;
      $('#lightboxImg').src = g.src.replace(/w=\d+/, 'w=2200'); lb.classList.add('open');
    });
    lb.addEventListener('click', () => lb.classList.remove('open'));
    addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
  }
  if (detail && page === 'article') {
    const id = Math.max(0, Math.min(NEWS.length - 1, +params.get('id') || 0));
    const n = NEWS[id], next = NEWS[(id + 1) % NEWS.length];
    document.title = `${n.title} — GD Mimarlık`;
    detail.innerHTML = `<article class="article">
      <a href="haberler.html" class="link-arrow back">← Tüm yazılar</a>
      <span class="news-cat">${n.cat}</span><h1>${n.title}</h1><div class="news-meta">${n.date} · ${n.read} okuma</div>
      <img src="${img(n.img, 1600)}" alt="">${n.body.map(([t, x]) => t === 'h' ? `<h2>${x}</h2>` : `<p>${x}</p>`).join('')}
      <p style="margin-top:2.5rem"><a class="link-arrow" href="iletisim.html">Projeniz için yazın <b>→</b></a></p></article>
      <a class="ov-next" href="haber.html?id=${next.id}"><small>Sonraki yazı</small><div>${next.title}</div></a>`;
  }

  /* ── Manifesto: kelime kelime aydınlanma ── */
  const man = $('#manifesto');
  let words = [];
  if (man) { man.innerHTML = man.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' '); words = $$('.w', man); }

  /* ── Kaydırma ── */
  const nav = $('#nav'), prog = $('#progress'), menu = $('#menu');
  let lastY = 0, ticking = false;
  function onScroll() {
    const y = scrollY, h = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    prog.style.width = (y / h * 100) + '%';
    nav.classList.toggle('scrolled', y > 60);
    nav.classList.toggle('hide', y > lastY && y > 500 && !menu.classList.contains('open'));
    lastY = y;
    if (man) {
      const r = man.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
      const n = Math.round(t * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    }
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
  $$('.section-head,.manifesto-foot,.quote blockquote,.contact-title,.info>div,.cta-in,.page-head .wrap,.stat').forEach(el => el.classList.add('rv'));
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });

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
  const burger = $('#burger');
  function toggleMenu(open) {
    const o = open ?? !menu.classList.contains('open');
    menu.classList.toggle('open', o); burger.classList.toggle('open', o);
    burger.setAttribute('aria-expanded', o); menu.setAttribute('aria-hidden', !o);
    document.body.classList.toggle('no-scroll', o);
  }
  burger.addEventListener('click', () => toggleMenu());
  addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

  /* ── Filtre ── */
  const filters = $('#filters');
  if (filters) {
    const initial = params.get('kategori');
    const apply = f => {
      $$('#filters .chip').forEach(c => c.classList.toggle('active', c.dataset.f === f));
      $$('.proj').forEach(c => {
        const show = f === 'all' || c.dataset.cat === f;
        c.classList.toggle('out', !show);
        if (show) { c.classList.remove('in'); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('in'))); }
      });
      onScroll();
    };
    filters.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) apply(b.dataset.f); });
    if (initial && $(`[data-f="${initial}"]`)) apply(initial);
  }

  /* ── Form ── */
  const form = $('#form'), msg = $('#formMsg');
  if (form) {
    let ptype = '';
    $('#pills').addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      const on = !b.classList.contains('active');
      $$('#pills .chip').forEach(c => c.classList.remove('active'));
      b.classList.toggle('active', on); ptype = on ? b.textContent : '';
    });
    const compose = () => {
      const f = Object.fromEntries(new FormData(form));
      return `Merhaba GD Mimarlık,\n\nAdım: ${f.ad} ${f.soyad || ''}\nE-posta: ${f.email}\nTelefon: ${f.tel || '-'}\nProje türü: ${ptype || '-'}\n\n${f.mesaj}`;
    };
    const valid = () => {
      let ok = true;
      $$('[required]', form).forEach(i => {
        const bad = !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value));
        i.classList.toggle('err', bad); if (bad) ok = false;
      });
      msg.textContent = ok ? '' : 'Lütfen işaretli alanları doldurun.';
      return ok;
    };
    form.addEventListener('submit', e => {
      e.preventDefault(); if (!valid()) return;
      location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Proje talebi — ' + (ptype || 'Genel'))}&body=${encodeURIComponent(compose())}`;
      msg.textContent = 'E-posta uygulamanız açılıyor, gönder tuşuna basmanız yeterli. Teşekkürler!';
    });
    $('#waBtn').addEventListener('click', () => {
      if (!valid()) return;
      if (CONFIG.whatsapp) open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(compose())}`, '_blank');
      else form.requestSubmit();
    });
  }

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
})();

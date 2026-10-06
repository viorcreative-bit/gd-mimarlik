(() => {
  'use strict';
  // ── Ayarlar ── gerçek iletişim bilgilerini buradan güncelleyin
  const CONFIG = {
    email: 'info@gdmimarlik.com',
    phone: '+90 5XX XXX XX XX',
    address: 'Ataşehir, İstanbul',
    whatsapp: '' // örn. '905321234567' (başında + olmadan). Boşsa buton e-postaya yönlendirir.
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const img = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=78`;
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const { PROJECTS, SERVICES, NEWS, PROCESS } = window;
  const page = document.body.dataset.page;
  const params = new URLSearchParams(location.search);
  const ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const ICONS = [
    '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2"/>',
    '<path d="M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 9h2a2 2 0 0 1 0 5h-2M8 3v2M12 3v2"/>',
    '<path d="M4 20V10l8-6 8 6v10M9 20v-6h6v6"/><path d="M2 20h20"/>',
    '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
    '<path d="M14 6l4 4-9 9H5v-4zM12 8l4 4"/>'
  ];

  // yedek görsel
  document.addEventListener('error', e => {
    const t = e.target;
    if (t.tagName === 'IMG' && !t.dataset.fb) { t.dataset.fb = 1; t.style.visibility = 'hidden'; }
  }, true);

  /* ── Ortak yerleşim ── */
  const NAV = [['index.html', 'Ana Sayfa', 'home'], ['projeler.html', 'Projeler', 'projects', 'project'], ['hizmetler.html', 'Hizmetler', 'services'], ['hakkimizda.html', 'Hakkımızda', 'about'], ['haberler.html', 'Blog', 'news', 'article']];
  const cur = l => (l[2] === page || l[3] === page) ? ' current" aria-current="page' : '';
  $('#site-header').innerHTML = `
    <a class="skip" href="#main">İçeriğe geç</a>
    <header class="nav" id="nav">
      <a href="index.html" class="brand" aria-label="GD Mimarlık, ana sayfa"><img src="assets/logo-brown.png" alt="GD Mimarlık"></a>
      <nav class="nav-links" aria-label="Ana menü">${NAV.map(l => `<a href="${l[0]}" class="${cur(l)}">${l[1]}</a>`).join('')}</nav>
      <a href="iletisim.html" class="nav-cta">İletişim</a>
      <button class="burger" id="burger" aria-label="Menüyü aç" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>
    </header>
    <div class="menu" id="menu" aria-hidden="true">
      <nav aria-label="Mobil menü">${[...NAV, ['iletisim.html', 'İletişim']].map(l => `<a href="${l[0]}">${l[1]}</a>`).join('')}</nav>
      <div class="menu-foot"><span>${CONFIG.address}</span><a href="mailto:${CONFIG.email}">${CONFIG.email}</a><a href="https://www.instagram.com/gdmimarlik/" target="_blank" rel="noopener">@gdmimarlik</a></div>
    </div>`;
  $('#site-footer').innerHTML = `
    <footer class="footer"><div class="wrap">
      <div class="f-top">
        <div><a href="index.html" class="f-brand"><img src="assets/logo-brown.png" alt="GD Mimarlık"></a>
          <p>Villa, ofis, kafe, restoran ve daha birçok alanda proje tasarım ve uygulama. Her proje bizim için bir imzadır.</p></div>
        <div><h4>Sayfalar</h4><ul>${[...NAV, ['iletisim.html', 'İletişim']].map(l => `<li><a href="${l[0]}">${l[1]}</a></li>`).join('')}</ul></div>
        <div><h4>Hizmetler</h4><ul>${SERVICES.slice(0, 5).map(s => `<li><a href="hizmetler.html">${s.t}</a></li>`).join('')}</ul></div>
        <div><h4>İletişim</h4><ul><li>${CONFIG.address}</li><li><a href="tel:${CONFIG.phone.replace(/\s/g, '')}">${CONFIG.phone}</a></li><li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li><li><a href="https://www.instagram.com/gdmimarlik/" target="_blank" rel="noopener">@gdmimarlik</a></li></ul></div>
      </div>
      <div class="f-word" aria-hidden="true">GD Mimarlık</div>
      <div class="f-bot"><span>© ${new Date().getFullYear()} GD Mimarlık. Tüm hakları saklıdır.</span><a href="#top" id="toTop">Yukarı çık ↑</a></div>
    </div></footer>`;
  if (page !== 'contact') document.body.insertAdjacentHTML('beforeend', '<a class="edge-tab" href="iletisim.html">Ücretsiz keşif <span aria-hidden="true">↗</span></a>');
  $('#toTop').addEventListener('click', e => { e.preventDefault(); scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('ready')));

  /* ── Sayfa geçişi ── */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || reduce) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.hash && u.pathname === location.pathname || /^(mailto|tel):/.test(a.getAttribute('href'))) return;
    if (u.pathname === location.pathname && u.search === location.search) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => { location.href = u.href; }, 380);
  });
  addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('leaving'); });

  /* ── Şablonlar ── */
  const projCard = pr => `
    <a class="card rv" href="proje.html?id=${pr.id}" data-cat="${pr.cat}" aria-label="${pr.name}">
      ${pr.tag ? `<span class="card-tag">${pr.tag}</span>` : ''}
      <div class="card-img"><img src="${img(pr.img, 1200)}" alt="${pr.name}" loading="lazy"></div>
      <div class="card-info"><div><div class="card-cat">${pr.catLabel} · ${pr.year}</div><div class="card-name">${pr.name}</div><div class="card-loc">${pr.loc}</div></div><span class="card-go">${ARROW}</span></div>
    </a>`;
  const newsCard = n => `
    <article class="news rv"><a href="haber.html?id=${n.id}">
      <div class="news-img"><img src="${img(n.img, 900)}" alt="" loading="lazy"></div>
      <span class="news-cat">${n.cat}</span><h3 class="news-t">${n.title}</h3>
      <p class="news-ex">${n.excerpt}</p><span class="news-meta">${n.date} · ${n.read} okuma</span>
    </a></article>`;

  const mosaic = $('#mosaic');
  if (mosaic) mosaic.innerHTML = PROJECTS.slice(0, +mosaic.dataset.limit || undefined).map(projCard).join('');
  const newsGrid = $('#newsGrid');
  if (newsGrid) newsGrid.innerHTML = (page === 'home' ? NEWS.slice(0, 3) : NEWS).map(newsCard).join('');
  const svcGrid = $('#svcGrid');
  if (svcGrid) svcGrid.innerHTML = SERVICES.map((s, i) => `
    <div class="svc rv"><span class="svc-i"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[i]}</svg></span><h3>${s.t}</h3><p>${s.d}</p></div>`).join('');
  const svcCards = $('#svcCards');
  if (svcCards) svcCards.innerHTML = SERVICES.slice(0, 3).map((s, i) => `
    <article class="svc-card rv"><small>0${i + 1} / ${s.t.split(' ')[0]}</small>
      <span class="svc-i"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[i]}</svg></span>
      <h3>${s.t}</h3><p>${s.d}</p><ul>${(s.checks || []).map(c => `<li>${c}</li>`).join('')}</ul>
      <a class="btn" href="hizmetler.html">Çözümleri incele ${ARROW}</a></article>`).join('');
  const glass = $('#glassGrid');
  if (glass) glass.innerHTML = PROCESS.slice(0, 3).map((s, i) => `<div class="glass rv"><b>0${i + 1}</b><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join('');
  const steps = $('#steps');
  if (steps) steps.innerHTML = PROCESS.map((s, i) => `<li class="step rv"><span class="step-n">0${i + 1}</span><span class="step-t">${s[0]}</span><p class="step-d">${s[1]}</p></li>`).join('');

  /* ── Detay sayfaları ── */
  const detail = $('#detail');
  if (detail && page === 'project') {
    const id = Math.max(0, Math.min(PROJECTS.length - 1, +params.get('id') || 0));
    const pr = PROJECTS[id], next = PROJECTS[(id + 1) % PROJECTS.length];
    document.title = `${pr.name} — GD Mimarlık`;
    detail.innerHTML = `
      <section class="d-hero"><img src="${img(pr.img, 2000)}" alt="${pr.name}"><div class="d-hero-t"><p class="eyebrow">${pr.catLabel} · ${pr.loc}</p><h1>${pr.name}</h1></div></section>
      <div class="wrap d-main">
        <div class="d-text"><p class="d-lead">${pr.lead}</p>${pr.body.map(t => `<p>${t}</p>`).join('')}</div>
        <div class="meta">${[['Konum', pr.loc], ['Alan', pr.area], ['Yıl', pr.year], ['Süre', pr.duration], ['Durum', pr.status], ['Tür', pr.type]].map(([l, v]) => `<div><span>${l}</span><b>${v}</b></div>`).join('')}</div>
      </div>
      <div class="wrap gal">${pr.gallery.map(g => `<img src="${img(g, 1400)}" alt="${pr.name} görseli" loading="lazy">`).join('')}</div>
      <a class="next" href="proje.html?id=${next.id}"><small>Sonraki proje</small><div>${next.name} →</div></a>`;
    const lb = $('#lightbox');
    detail.addEventListener('click', e => {
      const g = e.target.closest('.gal img'); if (!g) return;
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
      <p class="crumb"><a href="haberler.html">← Tüm yazılar</a></p>
      <span class="news-cat">${n.cat}</span><h1>${n.title}</h1><div class="news-meta">${n.date} · ${n.read} okuma</div>
      <img src="${img(n.img, 1600)}" alt="">${n.body.map(([t, x]) => t === 'h' ? `<h2>${x}</h2>` : `<p>${x}</p>`).join('')}
      <p style="margin-top:2rem"><a class="link" href="iletisim.html">Projeniz için yazın ${ARROW}</a></p></article>
      <a class="next" href="haber.html?id=${next.id}"><small>Sonraki yazı</small><div>${next.title}</div></a>`;
  }

  /* ── Nav, parallax, reveal, sayaç ── */
  const nav = $('#nav'), menu = $('#menu'), burger = $('#burger');
  let lastY = 0, tick = false;
  const heroMedia = $('.hero-media');
  function onScroll() {
    const y = scrollY;
    nav.classList.toggle('hide', y > lastY && y > 400 && !menu.classList.contains('open'));
    lastY = y;
    if (heroMedia && !reduce && y < innerHeight) heroMedia.style.translate = `0 ${y * .12}px`;
    tick = false;
  }
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });

  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
  }), { threshold: .1, rootMargin: '0px 0px -6% 0px' });
  $$('.sec-head,.split-in,.strip figure,.stat,.val,.member,.cta .wrap,.info-card,.form').forEach(el => el.classList.add('rv'));
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });

  const cio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    cio.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, t0 = performance.now(), d = 1600;
    (function step(t) {
      const k = Math.min(1, (t - t0) / d);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4)));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => cio.observe(el));

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
    const apply = f => {
      $$('#filters .chip').forEach(c => { const on = c.dataset.f === f; c.classList.toggle('active', on); c.setAttribute('aria-pressed', on); });
      $$('.card').forEach(c => {
        const show = f === 'all' || c.dataset.cat === f;
        c.classList.toggle('out', !show);
        if (show) { c.classList.remove('in'); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('in'))); }
      });
    };
    filters.addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) apply(b.dataset.f); });
    const k = params.get('kategori'); if (k && $(`[data-f="${k}"]`)) apply(k);
  }

  /* ── Form ── */
  const form = $('#form'), msg = $('#formMsg');
  if (form) {
    let ptype = '';
    $('#pills').addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      const on = !b.classList.contains('active');
      $$('#pills .chip').forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed', false); });
      b.classList.toggle('active', on); b.setAttribute('aria-pressed', on); ptype = on ? b.textContent : '';
    });
    const compose = () => {
      const f = Object.fromEntries(new FormData(form));
      return `Merhaba GD Mimarlık,\n\nAdım: ${f.ad} ${f.soyad || ''}\nE-posta: ${f.email}\nTelefon: ${f.tel || '-'}\nProje türü: ${ptype || '-'}\n\n${f.mesaj}`;
    };
    const valid = () => {
      let ok = true;
      $$('[required]', form).forEach(i => {
        const bad = !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value));
        i.classList.toggle('err', bad); i.setAttribute('aria-invalid', bad); if (bad) ok = false;
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
})();

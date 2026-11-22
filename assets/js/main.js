/* Rawafed School demo — interactions */
(function () {
  var root = document.documentElement;
  var qs = new URLSearchParams(location.search);

  /* ---------- theme ---------- */
  function setTheme(t, persist) {
    root.dataset.theme = t;
    if (persist) try { localStorage.setItem('rw-theme', t); } catch (e) {}
  }
  if (qs.get('theme')) setTheme(qs.get('theme') === 'dark' ? 'dark' : 'light', false);
  document.getElementById('theme-toggle').addEventListener('click', function () {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });

  /* ---------- language ---------- */
  function setLang(l, persist) {
    var dict = window.RW_I18N || {};
    root.lang = l; root.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var e = dict[el.dataset.i18n]; if (e && e[l] != null) el.innerHTML = e[l];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var e = dict[el.dataset.i18nPh]; if (e && e[l] != null) el.placeholder = e[l];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var e = dict[el.dataset.i18nAria]; if (e && e[l] != null) el.setAttribute('aria-label', e[l]);
    });
    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      var e = dict[el.dataset.i18nContent]; if (e && e[l] != null) el.setAttribute('content', e[l]);
    });
    var t = document.querySelector('title[data-i18n]');
    if (t && dict[t.dataset.i18n]) document.title = dict[t.dataset.i18n][l];
    if (persist) try { localStorage.setItem('rw-lang', l); } catch (e) {}
  }
  document.getElementById('lang-toggle').addEventListener('click', function () {
    setLang(root.lang === 'ar' ? 'en' : 'ar', true);
  });
  var initLang = qs.get('lang') || (function () { try { return localStorage.getItem('rw-lang'); } catch (e) { return null; } })();
  if (initLang === 'en') setLang('en', false);

  /* ---------- mobile nav ---------- */
  var navToggle = document.getElementById('nav-toggle');
  navToggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    a.addEventListener('click', function () { document.body.classList.remove('nav-open'); navToggle.setAttribute('aria-expanded', 'false'); });
  });
  if (qs.get('nav') === 'open') { document.body.classList.add('nav-open'); navToggle.setAttribute('aria-expanded', 'true'); }

  /* ---------- header scroll direction ---------- */
  var header = document.querySelector('.site-header');
  var scrollAnchor = Math.max(0, window.scrollY);
  var scrollPending = false;
  function updateHeader() {
    var y = Math.max(0, window.scrollY);
    var delta = y - scrollAnchor;
    var keepVisible = y <= header.offsetHeight + 12 || document.body.classList.contains('nav-open') || header.contains(document.activeElement);
    if (keepVisible) {
      header.classList.remove('is-hidden');
      scrollAnchor = y;
    } else if (Math.abs(delta) >= 8) {
      header.classList.toggle('is-hidden', delta > 0);
      scrollAnchor = y;
    }
    scrollPending = false;
  }
  window.addEventListener('scroll', function () {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateHeader); }
  }, { passive: true });
  header.addEventListener('focusin', function () { header.classList.remove('is-hidden'); });
  navToggle.addEventListener('click', function () { header.classList.remove('is-hidden'); scrollAnchor = Math.max(0, window.scrollY); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { document.body.classList.remove('nav-open'); navToggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- teacher filters ---------- */
  var chips = document.querySelectorAll('#teacher-filters .chip');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-on'); });
      chip.classList.add('is-on');
      var f = chip.dataset.f;
      document.querySelectorAll('.teacher-card').forEach(function (card) {
        card.hidden = f !== 'all' && card.dataset.stage !== f;
      });
    });
  });

  /* ---------- demo forms ---------- */
  document.querySelectorAll('.demo-form').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ok = form.querySelector('.form-ok');
      if (ok) { ok.hidden = false; ok.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
    });
  });

  /* ---------- reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.stage-card, .act-card, .news-card, .teacher-card, .value-card, .act-full, .step, .contact-card, .stat');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
    setTimeout(function () { revealEls.forEach(function (el) { el.classList.add('is-in'); }); }, 1600);
  }

  /* ---------- back to top ---------- */
  var toTop = document.getElementById('to-top');
  addEventListener('scroll', function () {
    toTop.classList.toggle('show', scrollY > 600);
  }, { passive: true });
  toTop.addEventListener('click', function () { scrollTo({ top: 0, behavior: 'smooth' }); });
})();

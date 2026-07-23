/* ============================================================
   USAFinCalc — Navbar behavior
   Vanilla JS. No dependencies.
   ============================================================ */
(function () {
  'use strict';

  var nb = document.getElementById('nb');
  if (!nb) return;

  /* ── 1. Sticky scroll state (blur + shadow) ─────────────────── */
  var SCROLL_THRESHOLD = 8;
  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nb.classList.add('is-scrolled');
    } else {
      nb.classList.remove('is-scrolled');
    }
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 2. Desktop dropdown triggers (keyboard support) ─────────── */
  var ddTriggers = Array.prototype.slice.call(document.querySelectorAll('.nb-dd-trigger'));

  function closeAllDropdowns(except) {
    ddTriggers.forEach(function (btn) {
      if (btn !== except) btn.setAttribute('aria-expanded', 'false');
    });
  }

  ddTriggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns(btn);
      btn.setAttribute('aria-expanded', String(!expanded));
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        btn.setAttribute('aria-expanded', 'false');
        btn.blur();
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nb-has-dd')) closeAllDropdowns();
  });

  nb.addEventListener('focusout', function (e) {
    var item = e.target.closest('.nb-has-dd');
    if (item && !item.contains(e.relatedTarget)) {
      var trigger = item.querySelector('.nb-dd-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── 3. Active link (mark current route) ─────────────────────── */
  (function markActive() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nb-link[href], .nb-dd-link[href]').forEach(function (a) {
      var href = a.getAttribute('href').replace(/\/$/, '') || '/';
      if (href === path) {
        a.classList.add('is-active');
        var parentDd = a.closest('.nb-has-dd');
        if (parentDd) {
          var trigger = parentDd.querySelector('.nb-dd-trigger');
          if (trigger) trigger.classList.add('is-active');
        }
      }
    });
  })();

  /* ── 4. Mobile drawer ─────────────────────────────────────────── */
  var hamburger = document.getElementById('nb-hamburger');
  var drawer = document.getElementById('nb-drawer');
  var overlay = document.getElementById('nb-overlay');
  var drawerClose = document.getElementById('nb-drawer-close');
  var lastFocused = null;

  function getFocusable(container) {
    return Array.prototype.slice.call(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (el) { return el.offsetParent !== null; });
  }

  function openDrawer() {
    lastFocused = document.activeElement;
    drawer.hidden = false;
    overlay.hidden = false;
    requestAnimationFrame(function () {
      drawer.classList.add('is-open');
      overlay.classList.add('is-visible');
    });
    document.body.classList.add('nb-scroll-lock');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');

    var focusables = getFocusable(drawer);
    if (focusables.length) focusables[0].focus();

    document.addEventListener('keydown', onDrawerKeydown);
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.classList.remove('nb-scroll-lock');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');

    var onEnd = function () {
      drawer.hidden = true;
      overlay.hidden = true;
      drawer.removeEventListener('transitionend', onEnd);
    };
    drawer.addEventListener('transitionend', onEnd);

    document.removeEventListener('keydown', onDrawerKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onDrawerKeydown(e) {
    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }
    if (e.key !== 'Tab') return;

    var focusables = getFocusable(drawer);
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  /* ── 5. Mobile accordion groups ──────────────────────────────── */
  var drawerTriggers = Array.prototype.slice.call(document.querySelectorAll('.nb-drawer-trigger'));
  drawerTriggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.closest('.nb-drawer-group');
      var isOpen = group.classList.contains('is-open');
      group.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ── 6. Search ─────────────────────────────────────────────────
     The "/" and Ctrl+K/Cmd+K shortcuts, live results dropdown, and
     mobile results panel are already wired site-wide by js/search.js
     against #fc-search / #fc-search-m, which this navbar reuses. ── */

  /* ── 7. Dark mode toggle (persisted) ─────────────────────────── */
  var THEME_KEY = 'usafincalc-theme';
  var themeToggles = [
    document.getElementById('nb-theme-toggle'),
    document.getElementById('nb-theme-toggle-m')
  ].filter(Boolean);

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-nb-theme', theme);
    themeToggles.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  }

  function initTheme() {
    // USAFinCalc's page content (hero, cards, footer, etc.) is permanently
    // dark themed site-wide — there is no existing light mode to match.
    // Default the nav to dark so it blends in; a saved explicit choice
    // (from a page that does support light mode) always wins.
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (err) { /* storage unavailable */ }
    applyTheme(saved === 'light' ? 'light' : 'dark');
  }

  themeToggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-nb-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (err) { /* storage unavailable */ }
    });
  });

  initTheme();

  /* ── 8. AI Assistant button (placeholder — feature in dev) ──── */
  var aiButtons = [document.getElementById('nb-ai-btn'), document.getElementById('nb-ai-btn-m')].filter(Boolean);
  aiButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.setAttribute('aria-disabled', 'true');
    });
  });

})();

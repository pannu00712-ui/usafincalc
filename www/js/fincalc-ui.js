// USAFinCalc UI interactions
// Implements ONLY the features confirmed broken by the missing js/fincalc-core.js:
//   - topbar dismiss button (.fc-topbar-x)
//   - nav scroll shadow (.fc-nav.scrolled)
//   - FAQ accordion (.fc-faq-q / .fc-faq-it.open)
//   - "show all states" toggle (toggleStates())
//   - newsletter signup (doEmail())
// This file does not attempt to replicate any other historical behavior of
// fincalc-core.js; each block below is independently guarded so it safely
// no-ops on pages that don't contain the relevant markup.

(function () {
  'use strict';

  // ── Topbar dismiss ──
  // Handles <button class="fc-topbar-x"> on any page, via delegation so it
  // works regardless of whether the button also carries its own inline
  // onclick (e.g. index.html) — in that case this simply runs a harmless
  // no-op second time.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.fc-topbar-x') : null;
    if (!btn) return;
    var topbar = btn.closest ? btn.closest('.fc-topbar') : null;
    if (!topbar) topbar = document.getElementById('fc-topbar');
    if (topbar) topbar.style.display = 'none';
  });

  // ── Nav scroll shadow ──
  // Toggles the .scrolled class on .fc-nav so the CSS-defined box-shadow
  // (.fc-nav.scrolled) applies once the page is scrolled.
  var nav = document.querySelector('.fc-nav');
  if (nav) {
    var updateNavShadow = function () {
      if (window.scrollY > 4) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateNavShadow, { passive: true });
    updateNavShadow();
  }

  // ── FAQ accordion ──
  // Toggles the .open class on the parent .fc-faq-it when its .fc-faq-q
  // button is clicked. CSS already hides/shows .fc-faq-a based on .open.
  document.addEventListener('click', function (e) {
    var q = e.target.closest ? e.target.closest('.fc-faq-q') : null;
    if (!q) return;
    var item = q.closest ? q.closest('.fc-faq-it') : null;
    if (!item) return;
    var isOpen = item.classList.toggle('open');
    q.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // ── "Show all states" toggle ──
  // Referenced inline as onclick="toggleStates()" on #states-btn.
  window.toggleStates = function () {
    var wrap = document.getElementById('states-more');
    var btn = document.getElementById('states-btn');
    if (!wrap) return;
    var isOpen = wrap.classList.toggle('open');
    if (btn) btn.textContent = isOpen ? 'Show fewer states \u2191' : 'Show all states \u2193';
  };

  // ── Newsletter signup ──
  // Referenced inline as onclick="doEmail()" on .fc-email-bt.
  // No backend endpoint exists in this project, so this validates the
  // input and gives the user feedback via the existing #em-msg element,
  // and fires the standard gtag analytics event if gtag is present.
  window.doEmail = function () {
    var input = document.getElementById('em-ip');
    var msg = document.getElementById('em-msg');
    if (!input) return;
    var email = input.value.trim();
    var isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      if (msg) msg.textContent = 'Please enter a valid email address.';
      return;
    }
    if (msg) msg.textContent = 'Thanks! You\u2019re on the list.';
    input.value = '';
    if (typeof gtag === 'function') {
      gtag('event', 'newsletter_signup');
    }
  };

  // ── Results disclosure toggle (.fc-rd-toggle / .fc-rd-details) ──
  // Event-delegated so it works for any number of these banners on a
  // page (e.g. multiple calculators) without id collisions or needing
  // a separate inline <script> block per banner.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.fc-rd-toggle') : null;
    if (!btn) return;
    var panelId = btn.getAttribute('aria-controls');
    var panel = panelId ? document.getElementById(panelId) : btn.parentElement.querySelector('.fc-rd-details');
    if (!panel) return;
    var open = panel.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open
      ? 'Hide details \u25b4'
      : 'Show details & ad opt-out options \u25be';
  });
})();

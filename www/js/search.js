// USAFinCalc shared site search
// Powers #fc-search (desktop nav) and #fc-search-m (mobile), plus the mobile
// results region (#sr-m / #sr-g-m / #sr-lb-m) already present in the nav markup.
// Also powers the homepage hero search (#fc-search-hero / #fc-hs-panel /
// #fc-hs-clear) — same shared index, same result markup, own keyboard nav.
(function () {
  var INDEX = [{"slug":"15-dollars-an-hour-is-how-much-a-year","label":"$15 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"20-dollars-an-hour-is-how-much-a-year","label":"$20 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"25-dollars-an-hour-is-how-much-a-year","label":"$25 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"30-dollars-an-hour-is-how-much-a-year","label":"$30 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"35-dollars-an-hour-is-how-much-a-year","label":"$35 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"40-dollars-an-hour-is-how-much-a-year","label":"$40 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"401k-calculator-usa","label":"401(k) Calculator 2026","cat":"calculator"},{"slug":"45-dollars-an-hour-is-how-much-a-year","label":"$45 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"50-dollars-an-hour-is-how-much-a-year","label":"$50 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"55-dollars-an-hour-is-how-much-a-year","label":"$55 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"60-dollars-an-hour-is-how-much-a-year","label":"$60 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"65-dollars-an-hour-is-how-much-a-year","label":"$65 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"70-dollars-an-hour-is-how-much-a-year","label":"$70 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"75-dollars-an-hour-is-how-much-a-year","label":"$75 an Hour Is How Much a Year? (2026 After-Tax Answer)","cat":"hourly"},{"slug":"about","label":"About USAFinCalc","cat":"calculator"},{"slug":"alabama-tax-calculator","label":"Alabama Income Tax Calculator 2026","cat":"tax"},{"slug":"amortization-calculator","label":"Amortization Calculator 2026","cat":"calculator"},{"slug":"annuity-calculator","label":"Annuity Calculator","cat":"calculator"},{"slug":"apr-calculator","label":"APR Calculator","cat":"calculator"},{"slug":"arizona-tax-calculator","label":"Arizona Income Tax Calculator 2026","cat":"tax"},{"slug":"auto-lease-calculator","label":"Auto Lease Calculator","cat":"calculator"},{"slug":"auto-loan-calculator","label":"Auto Loan Calculator 2026","cat":"calculator"},{"slug":"best-budgeting-tips","label":"12 Budgeting Tips That Actually Work in 2026","cat":"calculator"},{"slug":"blog","label":"Finance Blog 2026","cat":"calculator"},{"slug":"bond-calculator","label":"Bond Calculator","cat":"calculator"},{"slug":"bonus-tax-calculator","label":"Bonus Tax Calculator 2026","cat":"tax"},{"slug":"budget-planner","label":"Budget Planner 2026","cat":"calculator"},{"slug":"business-loan-calculator","label":"Business Loan Calculator","cat":"calculator"},{"slug":"business-tax-calculator","label":"Business Tax Calculator 2026","cat":"tax"},{"slug":"california-tax-calculator","label":"California Income Tax Calculator 2026","cat":"tax"},{"slug":"capital-gains-tax-calculator","label":"Capital Gains Tax Calculator 2026","cat":"tax"},{"slug":"car-payment-calculator","label":"Car Payment Calculator 2026","cat":"calculator"},{"slug":"cd-calculator","label":"CD Calculator 2026","cat":"calculator"},{"slug":"closing-costs-calculator","label":"Closing Costs Calculator 2026","cat":"calculator"},{"slug":"college-savings-calculator","label":"College Savings Calculator 2026","cat":"calculator"},{"slug":"colorado-tax-calculator","label":"Colorado Income Tax Calculator 2026","cat":"tax"},{"slug":"compound-interest-calculator","label":"Compound Interest Calculator 2026","cat":"calculator"},{"slug":"connecticut-tax-calculator","label":"Connecticut Income Tax Calculator 2026","cat":"tax"},{"slug":"contact","label":"Contact USAFinCalc","cat":"calculator"},{"slug":"cost-of-living-calculator","label":"Cost of Living Calculator 2026","cat":"calculator"},{"slug":"credit-card-calculator","label":"Credit Card Payoff Calculator 2026","cat":"calculator"},{"slug":"credit-score-calculator","label":"Credit Score Calculator 2026","cat":"calculator"},{"slug":"credit-score-simulator","label":"Credit Score Simulator 2026","cat":"calculator"},{"slug":"crypto-tax-calculator","label":"Crypto Tax Calculator 2026","cat":"tax"},{"slug":"currency-converter","label":"Currency Converter 2026","cat":"calculator"},{"slug":"data-sources","label":"Data Sources","cat":"calculator"},{"slug":"debt-consolidation-calculator","label":"Debt Consolidation Calculator","cat":"calculator"},{"slug":"debt-payoff-calculator","label":"Debt Payoff Calculator 2026","cat":"calculator"},{"slug":"disclaimer","label":"Disclaimer","cat":"calculator"},{"slug":"discount-calculator","label":"Discount Calculator","cat":"calculator"},{"slug":"editorial-policy","label":"Editorial Policy","cat":"calculator"},{"slug":"emergency-fund-calculator","label":"Emergency Fund Calculator 2026","cat":"calculator"},{"slug":"estate-tax-calculator","label":"Estate Tax Calculator","cat":"tax"},{"slug":"fha-loan-calculator","label":"FHA Loan Calculator 2026","cat":"calculator"},{"slug":"fire-calculator","label":"FIRE Calculator 2026","cat":"calculator"},{"slug":"florida-tax-calculator","label":"Florida Income Tax Calculator 2026","cat":"tax"},{"slug":"georgia-tax-calculator","label":"Georgia Income Tax Calculator 2026","cat":"tax"},{"slug":"heloc-calculator","label":"HELOC Calculator","cat":"calculator"},{"slug":"home-affordability-calculator-usa","label":"Home Affordability Calculator USA 2026","cat":"calculator"},{"slug":"hourly-to-salary-calculator","label":"Hourly to Salary Calculator 2026","cat":"calculator"},{"slug":"how-to-improve-credit-score","label":"How to Improve Your Credit Score: 9 Things That Actually Move the Number","cat":"calculator"},{"slug":"hsa-calculator","label":"HSA Calculator 2026","cat":"calculator"},{"slug":"illinois-tax-calculator","label":"Illinois Income Tax Calculator 2026","cat":"tax"},{"slug":"income-tax-calculator","label":"Income Tax Calculator USA 2026","cat":"tax"},{"slug":"indiana-tax-calculator","label":"Indiana Income Tax Calculator 2026","cat":"tax"},{"slug":"inflation-calculator","label":"Inflation Calculator 2026","cat":"calculator"},{"slug":"investment-calculator","label":"Investment Calculator","cat":"calculator"},{"slug":"iowa-tax-calculator","label":"Iowa Income Tax Calculator 2026","cat":"tax"},{"slug":"ira-calculator","label":"IRA Calculator","cat":"calculator"},{"slug":"kentucky-tax-calculator","label":"Kentucky Income Tax Calculator 2026","cat":"tax"},{"slug":"marriage-tax-calculator","label":"Marriage Tax Calculator","cat":"tax"},{"slug":"maryland-tax-calculator","label":"Maryland Income Tax Calculator 2026","cat":"tax"},{"slug":"massachusetts-tax-calculator","label":"Massachusetts Income Tax Calculator 2026","cat":"tax"},{"slug":"methodology","label":"Methodology","cat":"calculator"},{"slug":"michigan-tax-calculator","label":"Michigan Income Tax Calculator 2026","cat":"tax"},{"slug":"minnesota-tax-calculator","label":"Minnesota Income Tax Calculator 2026","cat":"tax"},{"slug":"missouri-tax-calculator","label":"Missouri Income Tax Calculator 2026","cat":"tax"},{"slug":"mortgage-calculator-usa","label":"Mortgage Calculator USA 2026","cat":"calculator"},{"slug":"mortgage-on-200k-house","label":"Mortgage on a $200,000 House","cat":"mortgage"},{"slug":"mortgage-on-300k-house","label":"Mortgage on a $300,000 House","cat":"mortgage"},{"slug":"mortgage-on-400k-house","label":"Mortgage on a $400,000 House","cat":"mortgage"},{"slug":"mortgage-on-500k-house","label":"Mortgage on a $500,000 House","cat":"mortgage"},{"slug":"net-worth-calculator","label":"Net Worth Calculator 2026","cat":"calculator"},{"slug":"nevada-tax-calculator","label":"Nevada Income Tax Calculator 2026","cat":"tax"},{"slug":"new-jersey-tax-calculator","label":"New Jersey Income Tax Calculator 2026","cat":"tax"},{"slug":"new-york-tax-calculator","label":"New York Income Tax Calculator 2026","cat":"tax"},{"slug":"north-carolina-tax-calculator","label":"North Carolina Income Tax Calculator 2026","cat":"tax"},{"slug":"ohio-tax-calculator","label":"Ohio Income Tax Calculator 2026","cat":"tax"},{"slug":"oregon-tax-calculator","label":"Oregon Income Tax Calculator 2026","cat":"tax"},{"slug":"paycheck-calculator","label":"Paycheck Calculator 2026","cat":"calculator"},{"slug":"pennsylvania-tax-calculator","label":"Pennsylvania Income Tax Calculator 2026","cat":"tax"},{"slug":"pension-calculator","label":"Pension Calculator","cat":"calculator"},{"slug":"personal-loan-calculator","label":"Personal Loan Calculator 2026","cat":"calculator"},{"slug":"present-value-calculator","label":"Present Value Calculator","cat":"calculator"},{"slug":"pricing","label":"Pricing","cat":"calculator"},{"slug":"privacy","label":"Privacy Policy","cat":"calculator"},{"slug":"property-tax-calculator","label":"Property Tax Calculator 2026","cat":"tax"},{"slug":"refinance-calculator","label":"Mortgage Refinance Calculator 2026","cat":"calculator"},{"slug":"rent-vs-buy-calculator","label":"Rent vs Buy Calculator 2026","cat":"calculator"},{"slug":"rental-property-calculator","label":"Rental Property ROI Calculator","cat":"calculator"},{"slug":"retirement-withdrawal-calculator","label":"Retirement Withdrawal Calculator 2026","cat":"calculator"},{"slug":"rmd-calculator","label":"RMD Calculator","cat":"calculator"},{"slug":"roi-calculator","label":"ROI Calculator","cat":"calculator"},{"slug":"roth-ira-calculator","label":"Roth IRA Calculator 2026","cat":"calculator"},{"slug":"salary-calculator-usa","label":"Salary Calculator USA 2026","cat":"calculator"},{"slug":"sales-tax-calculator","label":"Sales Tax Calculator 2026","cat":"tax"},{"slug":"savings-calculator","label":"Savings Calculator","cat":"calculator"},{"slug":"self-employment-tax-calculator","label":"Self-Employment Tax Calculator 2026","cat":"tax"},{"slug":"simple-interest-calculator","label":"Simple Interest Calculator","cat":"calculator"},{"slug":"social-security-calculator","label":"Social Security Calculator 2026","cat":"calculator"},{"slug":"south-carolina-tax-calculator","label":"South Carolina Income Tax Calculator 2026","cat":"tax"},{"slug":"stock-return-calculator-usa","label":"Stock Return Calculator USA 2026","cat":"calculator"},{"slug":"student-loan-calculator-usa","label":"Student Loan Calculator USA 2026","cat":"calculator"},{"slug":"tax-calculator-usa","label":"Tax Calculator USA 2026","cat":"calculator"},{"slug":"tennessee-tax-calculator","label":"Tennessee Income Tax Calculator 2026","cat":"tax"},{"slug":"terms","label":"Terms of Use","cat":"calculator"},{"slug":"texas-tax-calculator","label":"Texas Income Tax Calculator 2026","cat":"tax"},{"slug":"utah-tax-calculator","label":"Utah Income Tax Calculator 2026","cat":"tax"},{"slug":"va-mortgage-calculator","label":"VA Mortgage Calculator","cat":"calculator"},{"slug":"virginia-tax-calculator","label":"Virginia Income Tax Calculator 2026","cat":"tax"},{"slug":"washington-tax-calculator","label":"Washington Income Tax Calculator 2026","cat":"tax"},{"slug":"wisconsin-tax-calculator","label":"Wisconsin Income Tax Calculator 2026","cat":"tax"},{"slug": "average-net-worth-by-age", "label": "Average Net Worth by Age in 2026", "cat": "blog"},{"slug": "crypto-tax-guide", "label": "Crypto Tax Guide 2026", "cat": "blog"},{"slug": "how-to-negotiate-salary", "label": "How to Negotiate Your Salary in 2026", "cat": "blog"},{"slug": "self-employment-tax-deductions", "label": "15 Self-Employment Tax Deductions", "cat": "blog"},{"slug": "retirement-savings-by-age", "label": "How Much to Save for Retirement by Age", "cat": "blog"},{"slug": "401k-vs-roth-401k", "label": "401(k) vs Roth 401(k): Which to Choose", "cat": "blog"},{"slug": "first-time-homebuyer-tax-credits", "label": "First-Time Homebuyer Tax Credits 2026", "cat": "blog"},{"slug": "roth-vs-traditional-ira", "label": "Roth vs Traditional IRA in 2026", "cat": "blog"},{"slug": "mortgage-interest-deduction", "label": "Mortgage Interest Deduction 2026", "cat": "blog"},{"slug": "capital-gains-tax-guide", "label": "Capital Gains Tax Guide 2026", "cat": "blog"},{"slug": "hsa-triple-tax-advantage", "label": "HSA: The Triple Tax Advantage", "cat": "blog"},{"slug": "529-plan-vs-roth-ira-for-college", "label": "529 Plan vs Roth IRA for College 2026", "cat": "blog"},{"slug": "ai-tools-personal-finance", "label": "AI Tools for Personal Finance 2026", "cat": "blog"},{"slug": "how-to-read-w2-form", "label": "How to Read Your W-2 Form", "cat": "blog"},{"slug": "hsa-vs-fsa-guide", "label": "HSA vs FSA 2026: Complete Guide", "cat": "blog"},{"slug": "marriage-penalty-vs-marriage-bonus", "label": "Marriage Penalty vs Marriage Bonus 2026", "cat": "blog"},{"slug": "remote-work-tax-rules", "label": "Remote Work Tax Rules by State 2026", "cat": "blog"},{"slug": "rent-vs-buy-calculator-guide", "label": "Rent vs Buy: The Math Explained", "cat": "blog"},{"slug": "student-loan-forgiveness-programs", "label": "Student Loan Forgiveness Programs 2026", "cat": "blog"},{"slug": "tax-loss-harvesting-explained", "label": "Tax Loss Harvesting Explained", "cat": "blog"}]
;

  var ICONS = {
    salary: '\ud83d\udcb0', hourly: '\u23f1\ufe0f', mortgage: '\ud83c\udfe1',
    tax: '\ud83e\uddfe', calculator: '\ud83e\uddee', blog: '\ud83d\udcdd'
  };

  function scoreMatch(label, slug, query) {
    var l = label.toLowerCase(), s = slug.toLowerCase(), q = query.toLowerCase();
    if (l.indexOf(q) === 0) return 100;
    if (s.indexOf(q) === 0) return 90;
    if (l.indexOf(q) !== -1) return 50;
    if (s.indexOf(q) !== -1) return 40;
    return -1;
  }

  function search(query) {
    query = (query || '').trim();
    if (!query) return [];
    var results = [];
    for (var i = 0; i < INDEX.length; i++) {
      var entry = INDEX[i];
      var score = scoreMatch(entry.label, entry.slug, query);
      if (score > -1) results.push({ entry: entry, score: score });
    }
    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, 8).map(function (r) { return r.entry; });
  }

  function buildResultsHTML(results, query) {
    if (!results.length) {
      return '<div class="sr-empty">No calculators found for &ldquo;' + escapeHtml(query) + '&rdquo;</div>';
    }
    return results.map(function (r) {
      var icon = ICONS[r.cat] || '\ud83e\uddee';
      return '<a class="sr-item" href="/' + r.slug + '">' +
        '<span class="sr-item-icon" aria-hidden="true">' + icon + '</span>' +
        '<span class="sr-item-label">' + escapeHtml(r.label) + '</span>' +
        '</a>';
    }).join('');
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function ensureDesktopPanel(inputEl) {
    var existing = document.getElementById('sr-d');
    if (existing) return existing;
    var panel = document.createElement('div');
    panel.id = 'sr-d';
    panel.className = 'sr-d-panel';
    panel.setAttribute('role', 'listbox');
    inputEl.parentNode.style.position = inputEl.parentNode.style.position || 'relative';
    inputEl.parentNode.appendChild(panel);
    return panel;
  }

  function wireDesktopSearch() {
    var input = document.getElementById('fc-search');
    if (!input) return;
    var panel = ensureDesktopPanel(input);

    function render() {
      var q = input.value;
      if (!q.trim()) { panel.style.display = 'none'; panel.innerHTML = ''; return; }
      var results = search(q);
      panel.innerHTML = buildResultsHTML(results, q);
      panel.style.display = 'block';
    }

    input.addEventListener('input', render);
    input.addEventListener('focus', function () { if (input.value.trim()) render(); });
    document.addEventListener('click', function (e) {
      if (e.target !== input && !panel.contains(e.target)) {
        panel.style.display = 'none';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { panel.style.display = 'none'; input.blur(); }
      // Ctrl+K / Cmd+K focuses search from anywhere
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        input.focus();
        input.select();
        return;
      }
      // "/" focuses search, matching the placeholder hint "Search calculators... ( / )"
      if (e.key === '/' &&
          document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        var heroInput = document.getElementById('fc-search-hero');
        if (heroInput) { heroInput.focus(); if (heroInput.select) heroInput.select(); }
        else { input.focus(); }
      }
    });
  }

  function wireMobileSearch() {
    var input = document.getElementById('fc-search-m');
    if (!input) return;
    var resultsRegion = document.getElementById('sr-m');
    var grid = document.getElementById('sr-g-m');
    var label = document.getElementById('sr-lb-m');

    function render() {
      var q = input.value;
      if (!q.trim()) {
        if (resultsRegion) resultsRegion.style.display = 'none';
        return;
      }
      var results = search(q);
      if (label) label.textContent = results.length ? ('Results for "' + q + '"') : '';
      if (grid) grid.innerHTML = buildResultsHTML(results, q);
      if (resultsRegion) resultsRegion.style.display = 'block';
    }

    input.addEventListener('input', render);

    window.clearSearchMobile = function () {
      input.value = '';
      if (resultsRegion) resultsRegion.style.display = 'none';
      if (grid) grid.innerHTML = '';
      input.focus();
    };
  }

  function wireHeroSearch() {
    var input = document.getElementById('fc-search-hero');
    if (!input) return;
    var panel = document.getElementById('fc-hs-panel');
    var clearBtn = document.getElementById('fc-hs-clear');
    var activeIndex = -1;

    function items() {
      return panel ? panel.querySelectorAll('.sr-item') : [];
    }

    function closePanel() {
      if (!panel) return;
      panel.classList.remove('open');
      panel.innerHTML = '';
      activeIndex = -1;
    }

    function setActive(nextIndex) {
      var list = items();
      if (!list.length) return;
      if (activeIndex > -1 && list[activeIndex]) list[activeIndex].classList.remove('active');
      if (nextIndex < 0) nextIndex = list.length - 1;
      if (nextIndex >= list.length) nextIndex = 0;
      activeIndex = nextIndex;
      list[activeIndex].classList.add('active');
      list[activeIndex].scrollIntoView({ block: 'nearest' });
    }

    function render() {
      var q = input.value;
      if (clearBtn) clearBtn.classList.toggle('show', !!q);
      if (!q.trim()) { closePanel(); return; }
      var results = search(q);
      if (panel) {
        panel.innerHTML = buildResultsHTML(results, q);
        panel.classList.add('open');
      }
      activeIndex = -1;
    }

    input.addEventListener('input', render);
    input.addEventListener('focus', function () { if (input.value.trim()) render(); });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!panel || !panel.classList.contains('open')) render();
        setActive(activeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (panel && panel.classList.contains('open')) setActive(activeIndex - 1);
      } else if (e.key === 'Enter') {
        var list = items();
        var target = (activeIndex > -1 && list[activeIndex]) ? list[activeIndex] : list[0];
        if (target) {
          e.preventDefault();
          if (typeof gtag === 'function') gtag('event', 'search', { search_term: input.value });
          window.location.href = target.getAttribute('href');
        }
      } else if (e.key === 'Escape') {
        closePanel();
        input.blur();
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        closePanel();
        clearBtn.classList.remove('show');
        input.focus();
      });
    }

    document.addEventListener('click', function (e) {
      if (!panel) return;
      if (e.target !== input && !panel.contains(e.target) && e.target !== clearBtn) {
        closePanel();
      }
    });
  }

  function trackSearchSubmit(input) {
    if (!input) return;
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var results = search(input.value);
        if (results.length) {
          if (typeof gtag === 'function') gtag('event', 'search', { search_term: input.value });
          window.location.href = '/' + results[0].slug;
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireDesktopSearch();
    wireMobileSearch();
    wireHeroSearch();
    trackSearchSubmit(document.getElementById('fc-search'));
    trackSearchSubmit(document.getElementById('fc-search-m'));
  });
})();

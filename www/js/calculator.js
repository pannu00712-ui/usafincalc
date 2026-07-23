/**
 * USAFinCalc — Salary Calculator Logic
 * Production build | Vanilla JS | No dependencies
 *
 * Depends on tax-data.js being loaded first (exposes
 * window.USAFinCalc.TAX_DATA). All rates/brackets/thresholds are
 * read from there — nothing tax-related is hardcoded below.
 */
(function () {
    'use strict';

    const TAX_DATA = (window.USAFinCalc && window.USAFinCalc.TAX_DATA);
    if (!TAX_DATA) {
        console.error('USAFinCalc: tax-data.js failed to load — calculator disabled.');
        return;
    }

    // =====================================================
    // CALCULATOR STATE
    // (renamed from `state` in earlier draft — a local variable
    //  of the same name inside calculate() was shadowing this
    //  object and crashing every recalculation. Renaming removes
    //  the possibility of that collision entirely.)
    // =====================================================
    const calcState = {
        salary: 85000,
        filingStatus: 'single',
        stateCode: 'TX',
        retirement401k: 0
    };

    // =====================================================
    // DOM REFS
    // =====================================================
    const DOM = {};

    function cacheDOMElements() {
        DOM.wrapper = document.getElementById('salary-calculator');
        if (!DOM.wrapper) return;

        DOM.salarySlider = document.getElementById('salary-slider');
        DOM.salaryInput = document.getElementById('salary-input');
        DOM.filingStatus = document.getElementById('filing-status');
        DOM.stateSelect = document.getElementById('state-select');
        DOM.retirement401k = document.getElementById('retirement-401k');

        DOM.takeHomeAnnual = document.getElementById('take-home-annual');
        DOM.takeHomeMonthly = document.getElementById('take-home-monthly');
        DOM.federalTax = document.getElementById('federal-tax');
        DOM.stateTax = document.getElementById('state-tax');
        DOM.ficaTax = document.getElementById('fica-tax');
        DOM.effectiveRate = document.getElementById('effective-rate');
        DOM.marginalRate = document.getElementById('marginal-rate');
        DOM.taxSavings = document.getElementById('tax-savings');

        DOM.progressFill = document.getElementById('progress-fill');
        DOM.progressTax = document.getElementById('progress-tax');
        DOM.progressBreakdown = document.getElementById('progress-breakdown');

        DOM.taxYearDisplay = document.getElementById('tax-year-display');
    }

    // =====================================================
    // CALCULATIONS (pure functions — easy to unit test)
    // =====================================================
    function calculateFederalTax(income, status) {
        const brackets = TAX_DATA.federal.brackets[status] || TAX_DATA.federal.brackets.single;
        const deduction = TAX_DATA.federal.standardDeduction[status] || TAX_DATA.federal.standardDeduction.single;

        const taxable = Math.max(0, income - deduction);
        let tax = 0;
        let marginalRate = 0;

        for (const bracket of brackets) {
            if (taxable > bracket.min) {
                const taxableInBracket = Math.min(taxable, bracket.max) - bracket.min;
                if (taxableInBracket > 0) {
                    tax += taxableInBracket * bracket.rate;
                    marginalRate = bracket.rate;
                }
            }
        }

        return { tax, taxable, marginalRate, deduction };
    }

    function calculateStateTax(income, stateCode) {
        const stateData = TAX_DATA.states[stateCode];
        if (!stateData) return 0;

        if (stateData.type === 'flat') {
            return income * stateData.rate;
        }

        if (stateData.type === 'progressive') {
            let tax = 0;
            for (const bracket of stateData.brackets) {
                if (income > bracket.min) {
                    const taxableInBracket = Math.min(income, bracket.max) - bracket.min;
                    if (taxableInBracket > 0) {
                        tax += taxableInBracket * bracket.rate;
                    }
                }
            }
            return tax;
        }

        return 0;
    }

    function calculateFICA(income, status) {
        const ss = TAX_DATA.fica.socialSecurity;
        const medicare = TAX_DATA.fica.medicare;

        const socialSecurityTax = Math.min(income, ss.wageBase) * ss.rate;

        let medicareTax = income * medicare.rate;

        // FIX: threshold must follow the selected filing status —
        // the previous build always used `.single` regardless of
        // what the user chose, over-charging married filers.
        const threshold = medicare.additionalThreshold[status] || medicare.additionalThreshold.single;
        if (income > threshold) {
            medicareTax += (income - threshold) * medicare.additionalRate;
        }

        return { socialSecurity: socialSecurityTax, medicare: medicareTax, total: socialSecurityTax + medicareTax };
    }

    function calculateTakeHome(salary, status, stateCode, retirementContribution) {
        const taxableIncome = Math.max(0, salary - retirementContribution);

        // Federal & state both recognize a traditional 401(k) deferral
        // (simplification: assumes state follows federal treatment,
        // true for the large majority of states modeled here).
        const federal = calculateFederalTax(taxableIncome, status);
        const stateTax = calculateStateTax(taxableIncome, stateCode);

        // FICA is calculated on gross wages — a 401(k) does NOT
        // reduce Social Security/Medicare wages under current law.
        const fica = calculateFICA(salary, status);

        const totalTax = federal.tax + stateTax + fica.total;
        const takeHome = salary - totalTax - retirementContribution;

        return {
            gross: salary,
            taxable: federal.taxable,
            federalTax: federal.tax,
            stateTax: stateTax,
            ficaTotal: fica.total,
            socialSecurity: fica.socialSecurity,
            medicare: fica.medicare,
            totalTax: totalTax,
            takeHome: takeHome,
            effectiveRate: salary > 0 ? (totalTax / salary) * 100 : 0,
            marginalRate: federal.marginalRate * 100,
            retirementContribution: retirementContribution,
            standardDeduction: federal.deduction,
            taxSavings: calculateTaxSavings(salary, status, stateCode, retirementContribution)
        };
    }

    function calculateTaxSavings(salary, status, stateCode, retirementContribution) {
        if (retirementContribution === 0) return 0;

        const withoutRetirement = calculateTakeHome(salary, status, stateCode, 0);
        // Compute the "with retirement" tax total inline rather than
        // via a second calculateTakeHome() call — avoids building a
        // full results object (incl. a redundant nested tax-savings
        // calc) just to read one field back out of it.
        const taxableIncome = Math.max(0, salary - retirementContribution);
        const federal = calculateFederalTax(taxableIncome, status);
        const stateTax = calculateStateTax(taxableIncome, stateCode);
        const fica = calculateFICA(salary, status);
        const withRetirementTotalTax = federal.tax + stateTax + fica.total;

        return withoutRetirement.totalTax - withRetirementTotalTax;
    }

    // =====================================================
    // FORMATTING & ANIMATION
    // =====================================================
    function formatCurrency(amount) {
        return '$' + Math.round(amount).toLocaleString();
    }

    function formatPercent(value) {
        return value.toFixed(1) + '%';
    }

    function animateNumber(element, target, prefix, suffix, isCurrency) {
        if (!element) return;
        // NOTE: use `typeof === 'undefined'` rather than `prefix || '$'` —
        // the latter would replace a deliberate empty-string prefix
        // (used for percentage values) with '$', which is exactly the
        // bug that produced "$19.3%" instead of "19.3%" in testing.
        prefix = (typeof prefix === 'undefined') ? '$' : prefix;
        suffix = (typeof suffix === 'undefined') ? '' : suffix;
        isCurrency = isCurrency !== false;

        const current = parseFloat(element.textContent.replace(/[^0-9.-]+/g, '')) || 0;
        const duration = 400;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = current + (target - current) * eased;

            element.textContent = isCurrency
                ? prefix + Math.round(value).toLocaleString() + suffix
                : prefix + value.toFixed(1) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = isCurrency
                    ? prefix + Math.round(target).toLocaleString() + suffix
                    : prefix + target.toFixed(1) + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    function updateUI(results) {
        if (!results) return;

        animateNumber(DOM.takeHomeAnnual, results.takeHome, '$', '', true);
        animateNumber(DOM.takeHomeMonthly, results.takeHome / 12, '$', '', true);
        animateNumber(DOM.federalTax, results.federalTax, '$', '', true);
        animateNumber(DOM.stateTax, results.stateTax, '$', '', true);
        animateNumber(DOM.ficaTax, results.ficaTotal, '$', '', true);
        animateNumber(DOM.effectiveRate, results.effectiveRate, '', '%', false);
        animateNumber(DOM.marginalRate, results.marginalRate, '', '%', false);
        animateNumber(DOM.taxSavings, results.taxSavings, '$', '', true);

        if (DOM.progressFill && DOM.progressTax) {
            const takeHomePercent = results.gross > 0 ? (results.takeHome / results.gross) * 100 : 0;
            const taxPercent = results.gross > 0 ? (results.totalTax / results.gross) * 100 : 0;
            const retirementPercent = results.gross > 0 ? (results.retirementContribution / results.gross) * 100 : 0;

            DOM.progressFill.style.transform = 'scaleX(' + (Math.max(0, Math.min(takeHomePercent, 100)) / 100) + ')';
            DOM.progressTax.style.transform = 'scaleX(' + (Math.max(0, Math.min(taxPercent, 100)) / 100) + ')';

            if (DOM.progressBreakdown) {
                DOM.progressBreakdown.innerHTML =
                    '<span>Take-Home: ' + formatPercent(takeHomePercent) + '</span>' +
                    '<span>Taxes: ' + formatPercent(taxPercent) + '</span>' +
                    '<span>401(k): ' + formatPercent(retirementPercent) + '</span>';
            }
        }

        if (DOM.taxSavings) {
            DOM.taxSavings.className = results.taxSavings > 0 ? 'value positive' : 'value neutral';
        }

        // Keep the slider's screen-reader value in sync with the
        // formatted amount ("$85,000" instead of the raw "85000").
        if (DOM.salarySlider) {
            DOM.salarySlider.setAttribute('aria-valuetext', formatCurrency(results.gross));
        }
    }

    // =====================================================
    // MAIN CALCULATE
    // =====================================================
    function get401kMax(salary) {
        const limit = TAX_DATA.fica.retirement401k.limitUnder50;
        return Math.min(limit, salary);
    }

    function calculate() {
        const salary = clampNumber(parseFloat(DOM.salaryInput && DOM.salaryInput.value), 0, 500000, calcState.salary);
        const status = (DOM.filingStatus && DOM.filingStatus.value) || 'single';
        const stateCode = (DOM.stateSelect && DOM.stateSelect.value) || 'TX';
        const retirement = clampNumber(parseFloat(DOM.retirement401k && DOM.retirement401k.value), 0, get401kMax(salary), 0);

        calcState.salary = salary;
        calcState.filingStatus = status;
        calcState.stateCode = stateCode;
        calcState.retirement401k = retirement;

        const results = calculateTakeHome(salary, status, stateCode, retirement);
        updateUI(results);

        return results;
    }

    function clampNumber(value, min, max, fallback) {
        if (isNaN(value)) return fallback;
        return Math.max(min, Math.min(max, value));
    }

    // =====================================================
    // EVENTS
    // =====================================================
    function bindEvents() {
        if (DOM.salarySlider && DOM.salaryInput) {
            DOM.salarySlider.addEventListener('input', function () {
                DOM.salaryInput.value = this.value;
                calculate();
            });

            DOM.salaryInput.addEventListener('input', function () {
                const value = clampNumber(parseFloat(this.value), 0, 500000, 0);
                DOM.salarySlider.value = value;
                calculate();
            });
        }

        if (DOM.filingStatus) {
            DOM.filingStatus.addEventListener('change', calculate);
        }

        if (DOM.stateSelect) {
            DOM.stateSelect.addEventListener('change', calculate);
        }

        if (DOM.retirement401k) {
            DOM.retirement401k.addEventListener('input', function () {
                const currentSalary = clampNumber(parseFloat(DOM.salaryInput && DOM.salaryInput.value), 0, 500000, calcState.salary);
                const max = get401kMax(currentSalary);
                const value = clampNumber(parseFloat(this.value), 0, max, 0);
                this.value = value;
                calculate();
            });
        }
    }

    // =====================================================
    // INIT
    // =====================================================
    function init() {
        cacheDOMElements();
        if (!DOM.wrapper) return;

        if (DOM.salarySlider) DOM.salarySlider.value = calcState.salary;
        if (DOM.salaryInput) DOM.salaryInput.value = calcState.salary;
        if (DOM.retirement401k) DOM.retirement401k.value = calcState.retirement401k;
        if (DOM.filingStatus) DOM.filingStatus.value = calcState.filingStatus;
        if (DOM.taxYearDisplay) DOM.taxYearDisplay.textContent = TAX_DATA.version;

        if (DOM.stateSelect) {
            const states = TAX_DATA.states;
            const fragment = document.createDocumentFragment();
            Object.keys(states).sort().forEach(function (code) {
                const data = states[code];
                const option = document.createElement('option');
                option.value = code;
                option.textContent = data.name + (data.rate === 0 && data.type === 'flat' ? ' (No Tax)' : '');
                fragment.appendChild(option);
            });
            DOM.stateSelect.innerHTML = '';
            DOM.stateSelect.appendChild(fragment);
            DOM.stateSelect.value = calcState.stateCode;
        }

        bindEvents();
        calculate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

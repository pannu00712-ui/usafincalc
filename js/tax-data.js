/**
 * USAFinCalc — Tax Data 2026
 * ─────────────────────────────────────────────────────────────
 * ANNUAL UPDATE INSTRUCTIONS (read this every January):
 *   1. Update `version` and `lastUpdated` below.
 *   2. Update federal.brackets.{single,married,head} with new
 *      IRS bracket thresholds (rates rarely change, thresholds do).
 *   3. Update federal.standardDeduction with new IRS figures.
 *   4. Update fica.socialSecurity.wageBase with the new SSA wage base.
 *   5. Update fica.medicare.additionalThreshold if IRS changes it
 *      (historically stable, but check).
 *   6. Update any state rate/bracket that changed that year.
 *   7. Update calculator.js's 401(k) contribution limits
 *      (search for "401(k) limit" comment) — these live in the
 *      HTML tooltip and the JS clamp, not here, because they're
 *      IRS retirement-plan limits, not income-tax data.
 *
 * DO NOT hardcode any rate, bracket, or threshold anywhere else
 * in the codebase — calculator.js must only ever read from
 * USAFinCalc.TAX_DATA so a future update only touches this file.
 * ─────────────────────────────────────────────────────────────
 */
(function (root) {
    'use strict';

    const TAX_DATA = {
        version: '2026',
        lastUpdated: '2026-06-28',

        federal: {
            // Ordered ascending; `max: Infinity` marks the top bracket.
            brackets: {
                single: [
                    { min: 0, max: 12400, rate: 0.10 },
                    { min: 12401, max: 50400, rate: 0.12 },
                    { min: 50401, max: 105700, rate: 0.22 },
                    { min: 105701, max: 201775, rate: 0.24 },
                    { min: 201776, max: 256225, rate: 0.32 },
                    { min: 256226, max: 640600, rate: 0.35 },
                    { min: 640601, max: Infinity, rate: 0.37 }
                ],
                married: [
                    { min: 0, max: 24800, rate: 0.10 },
                    { min: 24801, max: 100800, rate: 0.12 },
                    { min: 100801, max: 211400, rate: 0.22 },
                    { min: 211401, max: 403550, rate: 0.24 },
                    { min: 403551, max: 512450, rate: 0.32 },
                    { min: 512451, max: 1281200, rate: 0.35 },
                    { min: 1281201, max: Infinity, rate: 0.37 }
                ],
                head: [
                    { min: 0, max: 18600, rate: 0.10 },
                    { min: 18601, max: 67400, rate: 0.12 },
                    { min: 67401, max: 141300, rate: 0.22 },
                    { min: 141301, max: 261450, rate: 0.24 },
                    { min: 261451, max: 384500, rate: 0.32 },
                    { min: 384501, max: 640600, rate: 0.35 },
                    { min: 640601, max: Infinity, rate: 0.37 }
                ]
            },
            standardDeduction: {
                single: 16100,
                married: 32200,
                head: 24100
            }
        },

        fica: {
            socialSecurity: {
                rate: 0.062,
                wageBase: 176100 // 2026 SSA wage base — income above this isn't taxed for SS
            },
            medicare: {
                rate: 0.0145,
                additionalRate: 0.009, // Additional Medicare Tax (ACA), above threshold
                additionalThreshold: {
                    single: 200000,
                    married: 250000,
                    head: 200000
                }
            },
            // 2026 IRS elective-deferral limits for 401(k)/403(b) plans.
            // Kept here (not hardcoded in calculator.js) so a limit change
            // only requires editing this file.
            retirement401k: {
                limitUnder50: 23500,
                limitOver50: 31000
            }
        },

        states: {
            // Zero income tax states
            AK: { name: 'Alaska', rate: 0, type: 'flat' },
            FL: { name: 'Florida', rate: 0, type: 'flat' },
            NV: { name: 'Nevada', rate: 0, type: 'flat' },
            NH: { name: 'New Hampshire', rate: 0, type: 'flat' }, // no wage tax
            SD: { name: 'South Dakota', rate: 0, type: 'flat' },
            TN: { name: 'Tennessee', rate: 0, type: 'flat' },
            TX: { name: 'Texas', rate: 0, type: 'flat' },
            WA: { name: 'Washington', rate: 0, type: 'flat' },
            WY: { name: 'Wyoming', rate: 0, type: 'flat' },

            // Flat-rate states (simplified: single statewide rate)
            CO: { name: 'Colorado', rate: 0.044, type: 'flat' },
            IL: { name: 'Illinois', rate: 0.0495, type: 'flat' },
            IN: { name: 'Indiana', rate: 0.029, type: 'flat' }, // FIX: was 3.23% (stale); 2026 rate is 2.9%
            MA: { name: 'Massachusetts', rate: 0.05, type: 'flat' }, // plus 4% surtax on income over $1M, not modeled
            MI: { name: 'Michigan', rate: 0.0425, type: 'flat' },
            NC: { name: 'North Carolina', rate: 0.0399, type: 'flat' }, // FIX: was 4.75%; final phasedown step to 3.99% completed Jan 1 2026
            PA: { name: 'Pennsylvania', rate: 0.0307, type: 'flat' },
            UT: { name: 'Utah', rate: 0.045, type: 'flat' }, // FIX: was 4.85% (stale); 2026 rate is 4.5%
            GA: { name: 'Georgia', rate: 0.0499, type: 'flat' }, // FIX: was 5.49% (stale); 2026 rate is 4.99%
            OH: { name: 'Ohio', rate: 0.0399, type: 'flat' },
            VA: { name: 'Virginia', rate: 0.0575, type: 'flat' },
            WI: { name: 'Wisconsin', rate: 0.054, type: 'flat' }, // simplified: actually progressive 3.5%-7.65%, mid-range estimate
            AZ: { name: 'Arizona', rate: 0.025, type: 'flat' },
            MD: { name: 'Maryland', rate: 0.0575, type: 'flat' },
            MO: { name: 'Missouri', rate: 0.0485, type: 'flat' },
            NJ: { name: 'New Jersey', rate: 0.064, type: 'flat' },
            OR: { name: 'Oregon', rate: 0.0875, type: 'flat' },
            SC: { name: 'South Carolina', rate: 0.065, type: 'flat' },
            VT: { name: 'Vermont', rate: 0.0635, type: 'flat' },
            DC: { name: 'Washington DC', rate: 0.06, type: 'flat' },
            // FIX (new): these 5 states were missing entirely, which meant the old
            // salary-calculator-usa.html dropdown used their TOP MARGINAL rate as a
            // flat rate on the full salary — a severe overstatement. Verified 2026 flat rates:
            LA: { name: 'Louisiana', rate: 0.03, type: 'flat' },
            KY: { name: 'Kentucky', rate: 0.035, type: 'flat' },
            IA: { name: 'Iowa', rate: 0.038, type: 'flat' },
            MS: { name: 'Mississippi', rate: 0.044, type: 'flat' },
            ID: { name: 'Idaho', rate: 0.053, type: 'flat' },
            KS: { name: 'Kansas', rate: 0.055, type: 'flat' }, // simplified: narrow progressive range 5.2%-5.58%

            // Progressive-bracket states (same min/max/rate shape as federal)
            CA: {
                name: 'California',
                type: 'progressive',
                brackets: [
                    { min: 0, max: 10976, rate: 0.01 },
                    { min: 10977, max: 26020, rate: 0.02 },
                    { min: 26021, max: 41006, rate: 0.04 },
                    { min: 41007, max: 56924, rate: 0.06 },
                    { min: 56925, max: 72244, rate: 0.08 },
                    { min: 72245, max: 91952, rate: 0.093 },
                    { min: 91953, max: 115840, rate: 0.103 },
                    { min: 115841, max: Infinity, rate: 0.123 }
                ]
            },
            NY: {
                name: 'New York',
                type: 'progressive',
                brackets: [
                    { min: 0, max: 8830, rate: 0.04 },
                    { min: 8831, max: 22360, rate: 0.0475 },
                    { min: 22361, max: 32870, rate: 0.0535 },
                    { min: 32871, max: 45750, rate: 0.0625 },
                    { min: 45751, max: 115320, rate: 0.0655 },
                    { min: 115321, max: Infinity, rate: 0.0685 }
                ]
            },
            // FIX (new): MN was previously mis-listed as `type: 'flat', rate: 0.0685`
            // — 6.85% isn't even one of Minnesota's real bracket rates, and applying
            // it flatly to the whole salary was doubly wrong (wrong type AND wrong
            // number). Real 2026 structure per MN Dept. of Revenue: 4 brackets,
            // 5.35% / 6.8% / 7.85% / 9.85% (single-filer thresholds shown).
            MN: {
                name: 'Minnesota',
                type: 'progressive',
                brackets: [
                    { min: 0, max: 31690, rate: 0.0535 },
                    { min: 31691, max: 104090, rate: 0.068 },
                    { min: 104091, max: 193240, rate: 0.0785 },
                    { min: 193241, max: Infinity, rate: 0.0985 }
                ]
            },
            // The following states use a SIMPLIFIED 2-bracket model (confirmed low
            // and top rates from published 2026 sources, single $30,000 breakpoint)
            // rather than each state's full multi-bracket schedule, which wasn't
            // available from a single reliable source at the time this was written.
            // This is a meaningfully closer estimate than a flat top-rate approximation,
            // but is still an approximation — treat these 9 states as "close estimate",
            // not exact, until full bracket tables are sourced per state.
            AL: { name: 'Alabama', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.02 }, { min: 30001, max: Infinity, rate: 0.05 }] },
            AR: { name: 'Arkansas', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.02 }, { min: 30001, max: Infinity, rate: 0.039 }] },
            CT: { name: 'Connecticut', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.03 }, { min: 30001, max: Infinity, rate: 0.0699 }] },
            DE: { name: 'Delaware', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.022 }, { min: 30001, max: Infinity, rate: 0.066 }] },
            HI: { name: 'Hawaii', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.04 }, { min: 30001, max: Infinity, rate: 0.11 }] },
            ME: { name: 'Maine', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.058 }, { min: 30001, max: Infinity, rate: 0.0715 }] },
            MT: { name: 'Montana', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.047 }, { min: 30001, max: Infinity, rate: 0.0565 }] },
            NE: { name: 'Nebraska', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.0246 }, { min: 30001, max: Infinity, rate: 0.0455 }] },
            NM: { name: 'New Mexico', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.015 }, { min: 30001, max: Infinity, rate: 0.059 }] },
            ND: { name: 'North Dakota', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.0 }, { min: 30001, max: Infinity, rate: 0.025 }] },
            OK: { name: 'Oklahoma', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.0025 }, { min: 30001, max: Infinity, rate: 0.0475 }] },
            RI: { name: 'Rhode Island', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.0375 }, { min: 30001, max: Infinity, rate: 0.0599 }] },
            WV: { name: 'West Virginia', type: 'progressive', brackets: [{ min: 0, max: 30000, rate: 0.0236 }, { min: 30001, max: Infinity, rate: 0.0512 }] }
            // All 50 states + DC now covered.
        }
    };

    /**
     * Recursively freeze so tax figures can never be mutated at
     * runtime by a coding mistake elsewhere (e.g. `bracket.rate = x`
     * inside a loop). Pure safety net, no behavior change.
     */
    function deepFreeze(obj) {
        Object.getOwnPropertyNames(obj).forEach(function (key) {
            const val = obj[key];
            if (val && typeof val === 'object') deepFreeze(val);
        });
        return Object.freeze(obj);
    }
    deepFreeze(TAX_DATA);

    // ── Single namespaced global (only one name touches `window`) ──
    root.USAFinCalc = root.USAFinCalc || {};
    root.USAFinCalc.TAX_DATA = TAX_DATA;

    // CommonJS export for testing / build tooling
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = TAX_DATA;
    }
})(typeof window !== 'undefined' ? window : globalThis);

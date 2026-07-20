# USAFinCalc EEAT Audit & Fix — README
**Version:** 1.0  
**Compatible With:** usafincalc_fixed_v7 and later

---

## What This Script Does

`eeat_audit.py` performs a complete automated EEAT (Experience, Expertise,
Authoritativeness, Trustworthiness) audit on all HTML files in your
USAFinCalc project and fixes every issue it can automatically.

### It audits and fixes:

| Area | What's Checked | What's Fixed |
|------|---------------|--------------|
| **About Page** | Mission, purpose, independence | Injects structured "Who We Are" section |
| **Contact Page** | Email visible, support info | Adds email + support content |
| **Editorial Policy** | Review process, accuracy, update policy | Adds full editorial policy section |
| **Methodology** | Formula transparency, assumptions | Adds per-calculator methodology docs |
| **Data Sources** | IRS, SSA, BLS, Fed links | Adds full cited government source list |
| **Disclaimer** | "Not financial advice", professional consult | Strengthens disclaimer content |
| **Privacy Policy** | Cookies, analytics, CCPA, GDPR | Adds full privacy policy content |
| **Terms of Service** | Liability, copyright, usage terms | Adds full ToS content |
| **Trust Links** | Footer links to all 8 trust pages | Injects missing links into every page |
| **Copyright Year** | Current year in copyright notice | Updates stale years automatically |
| **Last Updated** | Date meta tag on all pages | Injects meta date + hidden span |
| **Author Meta** | `<meta name="author">` tag | Adds author meta to `<head>` |
| **Schema.org** | Organization JSON-LD | Adds WebSite + Publisher schema |
| **Disclaimer Banner** | Per-page disclaimer | Injects banner on pages missing one |
| **Calc Trust Badge** | "Free, no registration, browser-based" | Injects trust signals on calc pages |

---

## Rules Followed

- ✅ Does NOT add new calculators
- ✅ Does NOT create new pages
- ✅ Does NOT change URLs
- ✅ Does NOT redesign the UI
- ✅ Does NOT change calculator logic or formulas
- ✅ Does NOT invent fake credentials, authors, certifications, or testimonials
- ✅ Preserves all existing SEO and functionality
- ✅ Creates backups before modifying any file

---

## How to Run

### Step 1: Install dependency
```bash
pip install beautifulsoup4
```

### Step 2: Extract your project zip
```bash
unzip usafincalc_fixed_v7.zip -d usafincalc
cd usafincalc
```

### Step 3: Copy the script into your project root
```bash
cp /path/to/eeat_audit.py .
```

### Step 4: Run the audit
```bash
python3 eeat_audit.py
```

Or specify a subdirectory if your HTML files are nested:
```bash
python3 eeat_audit.py ./public
python3 eeat_audit.py ./dist
```

### Step 5: Review the report
```
eeat_audit_report.txt    ← Full detailed report
.eeat_backup/            ← Originals (safe to delete after review)
```

---

## Output Example

```
============================================================
  USAFinCalc EEAT Audit & Fix
  Root: /path/to/usafincalc
  Date: 2025-01-15 14:22
============================================================

Found 123 HTML files

Creating backups...
Backups saved to: .eeat_backup/

--- Auditing Trust Pages ---
  ✓ Found: about.html
  ✓ Found: contact.html
  ✓ Found: editorial-policy.html
  ✓ Found: methodology.html
  ✓ Found: data-sources.html
  ✓ Found: disclaimer.html
  ✓ Found: privacy-policy.html
  ✓ Found: terms-of-service.html

--- Auditing All 123 HTML Pages ---
  Progress: 20/123 files...
  Progress: 40/123 files...
  ...
  Progress: 123/123 files...

============================================================
  EEAT AUDIT REPORT
============================================================
  Total HTML files audited:  123
  Total EEAT issues found:   387
  Total EEAT issues fixed:   364
  Files modified:            118
  Remaining issues:          23
  
  EEAT Score: 88/100
============================================================
```

---

## EEAT Score Breakdown (/100)

| Component | Max Points | How Scored |
|-----------|-----------|------------|
| Trust pages exist (8 pages) | 40 | Proportional to how many exist |
| Disclaimer on pages | 20 | Sample of first 20 pages |
| Current copyright year | 10 | Present in index.html |
| Trust links in footer | 20 | Proportional to links present |
| Schema.org JSON-LD | 10 | Present in index.html |

---

## Configuration

Edit the top of `eeat_audit.py` to customize:

```python
SITE_NAME = "USAFinCalc"
SITE_DOMAIN = "usafincalc.com"
CURRENT_YEAR = 2025          # Auto-detected from system
CONTACT_EMAIL = "contact@usafincalc.com"   # ← UPDATE THIS
```

**Important:** Update `CONTACT_EMAIL` to your real contact email before running.

---

## After Running

### What to manually verify:
1. **Contact email** — ensure the email injected is your actual contact email
2. **Trust page links** — check that injected footer links resolve correctly
   (relative paths may need adjustment if pages are in subdirectories)
3. **Calc trust badge styling** — the badge uses inline styles; you may want
   to move styles to your CSS file
4. **Disclaimer banner styling** — same as above

### What to manually fix (remaining issues):
- **PAGE_MISSING** issues = trust pages that don't exist at all (need to create)
- Any calc page where the injection point couldn't be found
- Pages where copyright notice is in an image (can't be auto-detected)

---

## Restoring Originals

If you want to revert any file to its pre-audit state:
```bash
cp .eeat_backup/about.html about.html
```

To revert all files:
```bash
cp -r .eeat_backup/* .
```

---

## What This Script Does NOT Do

- Does not access the internet
- Does not send data anywhere
- Does not modify CSS, JS, or image files
- Does not change `<title>` tags or meta descriptions
- Does not alter `<nav>` or `<header>` elements (only `<footer>`)
- Does not add fake reviews, testimonials, or credentials
- Does not rename or move files

---

## EEAT Best Practice Checklist (Post-Audit)

After running the script, manually verify:

- [ ] Contact email is valid and monitored
- [ ] About page accurately describes the site (no false claims)
- [ ] All trust pages load without 404 errors
- [ ] Footer links on every page point to correct trust pages
- [ ] Privacy policy accurately describes your analytics setup
- [ ] Editorial policy reflects your actual content review process
- [ ] Data source links are alive (spot-check a few)
- [ ] Copyright year matches current year
- [ ] Disclaimer is visible on calculator result pages
- [ ] Schema.org validates at https://validator.schema.org/

---

*Generated by USAFinCalc EEAT Audit Tool — for educational/operational use only.*

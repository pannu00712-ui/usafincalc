<#
  USAFinCalc - Ahrefs issue fix script
  Fixes, across your real .html files:
    1) Nav "Calculators" link: /#calculators -> /calculators (sitewide, all files)
    2) Footer placeholder links: href="#" -> real URLs (sitewide, all files)
    3) "Related Calculators" block: href="#" -> real sibling calculator URLs
       (only for the 8 confirmed orphan pages)

  HOW TO USE:
    1. Copy this file into C:\Users\annu\usafincalc  (same folder as your .html files)
    2. Open PowerShell in that folder
    3. Run:  .\fix-links.ps1
    4. Review with: git diff
    5. If it looks right: git add -A; git commit -m "Fix nav, footer, and related-calculator links (Ahrefs audit)"; git push origin main

  This script only touches .html files in the current directory (not subfolders),
  and only replaces the exact broken patterns confirmed from your live site.
#>

$ErrorActionPreference = "Stop"
$root = Get-Location
Write-Host "Running in: $root" -ForegroundColor Cyan

# ---------------------------------------------------------------------------
# STEP 1 + 2: sitewide fixes (nav + footer) applied to every .html file
# ---------------------------------------------------------------------------

$htmlFiles = Get-ChildItem -Path $root -Filter "*.html" -File

$footerOld = '<a href="#">Home</a> · <a href="#">Tax Calculator</a> · <a href="#">Paycheck Calculator</a> · <a href="#">Privacy</a>'
$footerNew = '<a href="/">Home</a> · <a href="/tax-calculator-usa">Tax Calculator</a> · <a href="/paycheck-calculator">Paycheck Calculator</a> · <a href="/privacy">Privacy</a>'

$sitewideCount = 0

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $original = $content

    # Fix 1: nav "Calculators" link (matches both desktop nb-link and mobile nb-drawer-link, since both share this exact href)
    $content = $content -replace '/#calculators', '/calculators'

    # Fix 2: footer placeholder links
    $content = $content -replace [regex]::Escape($footerOld), $footerNew

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $sitewideCount++
        Write-Host "  Updated (nav/footer): $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`nSitewide nav/footer fix applied to $sitewideCount files.`n" -ForegroundColor Yellow

# ---------------------------------------------------------------------------
# STEP 3: "Related Calculators" fix - only for the 8 confirmed orphan pages
# Each entry: filename -> array of (label, url) real sibling calculators
# ---------------------------------------------------------------------------

$relatedFixes = @{
    "car-payment-calculator.html" = @(
        @{label="Car Affordability Calculator"; url="/car-affordability-calculator"},
        @{label="Debt Snowball Calculator";     url="/debt-snowball-calculator"},
        @{label="Amortization Calculator";      url="/amortization-calculator"},
        @{label="Refinance Calculator";         url="/refinance-calculator"},
        @{label="Net Worth Calculator";         url="/net-worth-calculator"}
    )
    "bond-calculator.html" = @(
        @{label="Compound Interest Calculator"; url="/compound-interest-calculator"},
        @{label="CD Calculator";                url="/cd-calculator"},
        @{label="Retirement Calculator";        url="/retirement-calculator"},
        @{label="Federal Tax Calculator";       url="/tax-calculator-usa"},
        @{label="Stock Return Calculator";      url="/stock-return-calculator-usa"},
        @{label="Stock & Investment Calculators"; url="/stock-investment-calculators"}
    )
    "cd-calculator.html" = @(
        @{label="Bond Yield Calculator";        url="/bond-calculator"},
        @{label="Compound Interest Calculator"; url="/compound-interest-calculator"},
        @{label="Retirement Calculator";        url="/retirement-calculator"},
        @{label="Stock & Investment Calculators"; url="/stock-investment-calculators"}
    )
    "retirement-calculator.html" = @(
        @{label="401(k) Calculator";            url="/401k-calculator-usa"},
        @{label="Roth IRA Calculator";           url="/roth-ira-calculator"},
        @{label="Social Security Calculator";    url="/social-security-calculator"},
        @{label="FIRE Calculator";               url="/fire-calculator"},
        @{label="Compound Interest Calculator";  url="/compound-interest-calculator"}
    )
    "amortization-calculator.html" = @(
        @{label="Mortgage Calculator";           url="/mortgage-calculator-usa"},
        @{label="Biweekly Mortgage Calculator";  url="/biweekly-mortgage-calculator"},
        @{label="FHA Loan Calculator";            url="/fha-loan-calculator"},
        @{label="Refinance Calculator";          url="/refinance-calculator"}
    )
    "fha-loan-calculator.html" = @(
        @{label="Mortgage Calculator";           url="/mortgage-calculator-usa"},
        @{label="Home Affordability Calculator"; url="/home-affordability-calculator-usa"},
        @{label="Biweekly Mortgage Calculator";  url="/biweekly-mortgage-calculator"},
        @{label="Amortization Calculator";       url="/amortization-calculator"}
    )
    "property-tax-calculator-guide.html" = @(
        @{label="Federal Tax Calculator";        url="/tax-calculator-usa"},
        @{label="Tax by State";                  url="/tax-by-state"},
        @{label="Mortgage Calculator";           url="/mortgage-calculator-usa"},
        @{label="Home Affordability Calculator"; url="/home-affordability-calculator-usa"}
    )
    "maryland-paycheck-calculator.html" = @(
        @{label="Paycheck Calculator";           url="/paycheck-calculator"},
        @{label="Salary Calculator";             url="/salary-calculator-usa"},
        @{label="Hourly to Salary Calculator";   url="/hourly-to-salary-calculator"},
        @{label="Federal Tax Calculator";        url="/tax-calculator-usa"}
    )
}

# Regex to find the whole <ul class="related-links">...</ul> block
$relatedBlockPattern = '(?s)<ul class="related-links">.*?</ul>'

$relatedCount = 0

foreach ($filename in $relatedFixes.Keys) {
    $path = Join-Path $root $filename
    if (-not (Test-Path $path)) {
        Write-Host "  SKIPPED (not found): $filename" -ForegroundColor DarkYellow
        continue
    }

    $content = Get-Content -Path $path -Raw -Encoding UTF8

    if ($content -notmatch $relatedBlockPattern) {
        Write-Host "  SKIPPED (no related-links block found, check manually): $filename" -ForegroundColor DarkYellow
        continue
    }

    $items = $relatedFixes[$filename]
    $liLines = $items | ForEach-Object { "            <li><a href=`"$($_.url)`">$($_.label)</a></li>" }
    $newBlock = "<ul class=`"related-links`">`n" + ($liLines -join "`n") + "`n        </ul>"

    # Use a MatchEvaluator instead of -replace to avoid $-escaping issues in the replacement text
    $evaluator = [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $newBlock }
    $newContent = [regex]::Replace($content, $relatedBlockPattern, $evaluator)

    Set-Content -Path $path -Value $newContent -Encoding UTF8 -NoNewline
    $relatedCount++
    Write-Host "  Updated (related-links): $filename" -ForegroundColor Green
}

Write-Host "`nRelated-calculators fix applied to $relatedCount of $($relatedFixes.Count) target files.`n" -ForegroundColor Yellow
Write-Host "Done. Review changes with: git diff" -ForegroundColor Cyan
Write-Host "Then commit with: git add -A; git commit -m 'Fix nav, footer, and related-calculator links (Ahrefs audit)'; git push origin main" -ForegroundColor Cyan

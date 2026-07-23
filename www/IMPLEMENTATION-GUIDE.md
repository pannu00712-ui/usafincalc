# USAFinCalc Site Search — Implementation Guide

## What changed

Site-wide search was already partially built (js/search.js, css/search.css) but only
wired into ~8 pages, and only as a mobile hamburger-menu search. This update:

1. **Added a desktop search box directly in the top nav** on all 162 pages (between
   the logo and the nav links). Works on both desktop and mobile — no separate
   mobile-only implementation needed.
2. **Fixed a broken reference**: `js/fincalc-search-data.js` was linked on 4 pages but
   never existed in the project (404). Removed — the search index already lives
   inline inside `js/search.js`, so nothing else was needed.
3. **Added keyboard shortcuts**: `Ctrl+K` / `Cmd+K` focuses search from anywhere on
   the page (in addition to the existing `/` shortcut). Visible as a "Ctrl K" hint
   inside the search box on desktop.
4. **Added the 11 new blog articles** to the search index (`cat: "blog"`, 📝 icon).
5. **Fixed `retirement-calculator.html`**, which was a truncated/broken file (missing
   closing tags, footer, and — importantly — its entire calculator JavaScript). It's
   now a complete, working page with search included.

## Files touched

```
css/search.css      — added .site-nav-search styles (desktop search box + Ctrl-K hint)
js/search.js         — added Ctrl+K shortcut, added 11 blog articles to INDEX, blog icon
*.html (162 pages)   — injected <div class="site-nav-search">…</div> into the nav,
                        added <link href="/css/search.css"> and
                        <script defer src="/js/search.js"></script> where missing,
                        removed broken fincalc-search-data.js references
retirement-calculator.html — rebuilt: working calculator JS, closing tags, footer, search
```

## How the search box is wired into a page

Every page's nav now looks like this:

```html
<nav class="site-nav" aria-label="Main navigation">
  <a class="site-logo" href="/">…</a>
  <div class="site-nav-search">
    <span aria-hidden="true" class="fc-si">⌕</span>
    <input aria-label="Search calculators" autocomplete="off" id="fc-search"
           placeholder="Search calculators…" type="search"/>
    <span aria-hidden="true" class="fc-kbd">Ctrl K</span>
  </div>
  <ul class="site-nav-links">…</ul>
</nav>
```

`js/search.js` auto-detects `#fc-search` on `DOMContentLoaded` and wires it up — no
per-page JS needed. It:
- Scores matches (prefix match on label > prefix match on slug > substring match)
- Renders a dropdown panel of up to 8 results, appended into the search box's parent
- Enter key jumps to the top result and fires a GA4 `search` event (if `gtag` exists)
- Escape closes the dropdown

## Adding a new page (calculator or article) going forward

1. Copy the nav block above into the new page's `<nav class="site-nav">` (or use the
   existing `how-to-improve-credit-score.html` / any recent calculator page as a
   template — the nav is already correct there).
2. Add `<link href="/css/search.css" rel="stylesheet"/>` after `design-system.css`.
3. Add `<script defer src="/js/search.js"></script>` before `</body>`.
4. Add the new page to the `INDEX` array at the top of `js/search.js`:
   ```js
   {"slug":"your-new-page-slug","label":"Display Title Shown In Search","cat":"blog"}
   ```
   Categories in use: `calculator`, `tax`, `mortgage`, `hourly`, `salary`, `blog`.
   Each has its own icon in the `ICONS` map — reuse an existing one or add a new one.

## Legacy bespoke-design pages

Twelve pages (e.g. `bond-calculator.html`, `dividend-calculator.html`,
`retirement-calculator.html`, etc.) use an older, self-contained design with their own
`<style>` block instead of `/css/fincalc.css` + `/css/design-system.css`. These also
had dead `href="#"` nav links, which were fixed to point to the real calculator pages
as part of this pass. Search was added inline in the same way (`#fc-search` input +
`js/search.js`), using CSS variable fallbacks so it still renders correctly even
though these pages don't share the main design system's variable names.

## Deployment checklist

- [ ] Upload/replace the full `usafincalc_seo_fixed` folder (all files below are new
      or modified: `css/search.css`, `js/search.js`, 162 `.html` pages).
- [ ] Spot check 2–3 pages live: type in the search box, confirm the dropdown appears
      and links work.
- [ ] Confirm `Ctrl+K` focuses the search box from anywhere on the page.
- [ ] Confirm GA4 is receiving `search` events (Realtime → Events) after pressing
      Enter in the search box.
- [ ] Confirm `retirement-calculator.html` renders fully (footer visible, no console
      errors) and the calculator produces results on load and updates live as inputs
      change.

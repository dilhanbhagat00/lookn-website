# Lookn website — working agreement

Treat these as canonical. They override anything that might conflict in
chat instructions.

## Page model

- **`index.html` is a one-page landing.** Hero illustration + footer
  only. Nothing else. If a section doesn't fit on the same single
  screen, it doesn't belong on `/`.
- **Everything else lives on its own page**: `about.html`,
  `privacy.html`, `terms.html`, `support.html`, `404.html`. Cross-link
  from the footer.
- New content (features, FAQ, blog, pricing, etc.) → new page, not
  appended to the landing.

## Buttons — single SmartButton recipe, four variants

Every clickable element on this site is one of four variants:
`.btn--primary`, `.btn--chip`, `.btn--social`, `.btn--store`. They all
share a single base via `:where(.btn--primary, .btn--chip, .btn--social,
.btn--store)` so the press physics live in **one place**. A new variant
adds itself to the `:where()` list — it never restates `transition`,
`transform`, `cursor`, `focus-visible`, etc.

Base physics (do not duplicate per-variant):

- `transform: translateY(0)` rest
- `:hover` → `translateY(-2px)` lift
- `:active` → variant-specific `translateY(Npx)` + shadow collapses to
  `0 0 0 0 <color>` (transition-duration → `--btn-press`)
- `:focus-visible` → `outline: 3px solid var(--lookn-green)`

Each variant only declares: **bg / shadow color / text color / size**.

Recipe — bg + solid **flat** shadow stub (no `rgba()` blur, no
`box-shadow: 0 Npx Mpx ...` haze). Mirrors
`/Users/dilhanbhagat/Lookn/Components/SmartButton.jsx`:

| Variant      | bg          | shadow      | text       | use                            |
|--------------|-------------|-------------|------------|--------------------------------|
| `.btn--primary` (primary)  | `#66CE63` | `#3AB54A` | `#FFFFFF` | the green CTA, 404 back link  |
| `.btn--chip`    (white)    | `#FFFFFF` | `#E8E8E8` | `#1A1A1A` | sub-page nav, footer links    |
| `.btn--social`  (white)    | `#FFFFFF` | `#E8E8E8` | `#1A1A1A` | circular footer social icons  |
| `.btn--store`   (dark)     | `#000000`   | none      | `#FFFFFF` | App Store / Play Store CTAs   |

**Hover** for the white-base variants (`.btn--chip`, `.btn--social`) **flips to
the primary green**: `background: var(--lookn-green); color: #fff;
box-shadow: 0 Npx 0 0 var(--lookn-green-shadow);`. This is the
"lifts-to-brand" feel — the only good hover state we have. Use it.

**Don't ever:**
- Give a button a green text color in its **rest state**
- Use a green border to fake an outline (no `border` declarations on
  buttons — bg + shadow only)
- Use a soft / blurred drop shadow (`box-shadow: 0 4px 14px rgba(...)`)
  on a button — only flat solid stubs
- Fork a new `.btn--xyz` class without adding it to the `:where()` base

## Typography

- Fredoka only — `Fredoka-Bold`, `Fredoka-Medium`, `Fredoka-Regular`,
  `Fredoka-Light`. Loaded via Google Fonts
  `Fredoka:wght@400;500;600;700`.
- Never Poppins, Inter, system fonts, or anything else.
- On mobile, hero copy is **centered**, big, bold.

## Code style

- **No changelog comments.** A comment describes the current state and
  the **why**, not what was changed. Don't write `// PREVIEW: pointing
  at 2.png`, `// new bg added`, `// updated shadow to flat`. The diff
  and commit message are the changelog.
- **No comments that restate the code.** `// hero background` over
  `.hero__bg { ... }` is noise. Names should carry the meaning.
- If you find a stale "PREVIEW:" / "new ..." / restate-the-name comment
  while editing a file, delete it in the same edit.

## DRY

- Shared properties go in a single `:where()` selector group, not
  copy-pasted across variants.
- Color constants live in `:root` (`--lookn-green`,
  `--lookn-green-shadow`, etc.). Hover green should read
  `var(--lookn-green)`, never the hex.
- New page → reuse `.shell`, `.card`, `.foot`, `.btn--chip` from
  `style.css`. Don't add page-specific styles unless the page genuinely
  needs them.

## SEO

- Single `<h1>` per page.
- JSON-LD lives only on the page it describes (FAQ → `/about.html`,
  not `/`).
- `sitemap.xml` carries `<lastmod>` per page.

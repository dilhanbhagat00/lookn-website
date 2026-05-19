# Lookn website — working agreement

Treat these as canonical. They override anything that might conflict in
chat instructions.

## Page model

- **`index.html` is a one-page landing.** It contains ONLY the full-bleed
  hero illustration + the site footer. Nothing else. If a section
  doesn't fit on that one screen, it doesn't belong on `/`.
- **Everything else lives on its own page**: `about.html`,
  `privacy.html`, `terms.html`, `support.html`, `404.html`. Cross-link
  from the footer.
- New content (features, FAQ, blog, pricing, etc.) → new page, not
  appended to the landing.

## Buttons — Lookn client SmartButton recipe

Every clickable element on this site mirrors the SmartButton recipe in
`/Users/dilhanbhagat/Lookn/Components/SmartButton.jsx`:

- Solid background color
- **Solid flat darker shadow stub** underneath via
  `box-shadow: 0 Npx 0 0 <color>` (NO blur, NO rgba haze)
- Lifts up (`translateY(-2px)`) on `:hover`
- Presses down (`translateY(Npx)`, shadow collapses) on `:active`

Use these variant colors verbatim:

| Variant   | bg        | shadow    | text       |
|-----------|-----------|-----------|------------|
| primary   | `#66CE63` | `#3AB54A` | `#FFFFFF`  |
| gray      | `#F0F0F0` | `#D7D7D7` | `#666666`  |
| white     | `#FFFFFF` | `#E8E8E8` | `#000000`  |
| danger    | `#EF4444` | `#B91C1C` | `#FFFFFF`  |
| apple     | `#1A1A1A` | `#454545` | `#FFFFFF`  |

Reuse the existing CSS classes (`.btn`, `.btn--chip`, `.btn--social`,
`.btn--store`) — don't fork new ones. Any new clickable element should
land into one of those classes.

## Typography

- Fredoka only — `Fredoka-Bold`, `Fredoka-Medium`, `Fredoka-Regular`,
  `Fredoka-Light`. Loaded via Google Fonts `Fredoka:wght@400;500;600;700`.
- Never reach for Poppins, Inter, system fonts, or anything else.
- On mobile, hero copy is **centered** and visually large/bold so it
  reads at arm's length.

## Code style

- **No changelog-style comments.** Don't write
  `// PREVIEW: pointing at 2.png` or `// new bg added`. Comments
  describe the current state and the **why**, not the history of a change.
- **No descriptive comments that restate the code.** A `// hero
  background` above `.hero__bg { ... }` is noise.
- The diff and commit message are the changelog. The CSS file is the
  spec for what the page looks like *now*.
- If you find a stale `// PREVIEW:` or `// new ...` comment while
  editing, delete it in the same edit.

## SEO

- Single `<h1>` per page.
- JSON-LD lives only on the page it describes (FAQ → `/about.html`,
  not `/`).
- `sitemap.xml` carries `<lastmod>` per page.

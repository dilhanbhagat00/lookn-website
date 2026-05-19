# lookn-website

Finch-style one-screen landing page for **Lookn**. Zero build. Plain HTML + a single CSS file. Ships pure HTML, scores Lighthouse 100 out of the box, indexable by every search engine.

```
lookn-website/
├── index.html          ← one-screen landing (koko hero bg + App Store / Play Store)
├── privacy.html        ← plain-English privacy policy
├── terms.html          ← plain-English terms of service
├── support.html        ← contact email + FAQ (with JSON-LD FAQ schema)
├── 404.html            ← friendly not-found page
├── robots.txt
├── sitemap.xml
└── assets/
    ├── style.css       ← single shared stylesheet (DRY)
    ├── hero-bg.png     ← koko illustration, full-bleed background
    ├── icon.png        ← Lookn app icon
    ├── app-store-badge.png
    └── play-store-badge.png
```

## Brand

Pulled straight from the Lookn RN client so the site matches the app pixel-for-pixel:

| Token | Value | Source |
|---|---|---|
| Primary green | `#66CE63` | `Lookn/constants/colors.js` → `QuestColors.green` |
| Green shadow | `#3AB54A` | same file → `QuestColors.greenShadow` |
| Font | Fredoka 400–700 | `Lookn/Components/SmartButton.jsx` (`Fredoka-Bold`) |
| Button | Layered pill, 6px shadow offset, press-down on `:active` | `Lookn/Components/SmartButton.jsx` |
| Radius | `26px` (pill) / `20px` (cards) | SmartButton sizeConfig |

If any of those drift in the app, update `assets/style.css` (CSS variables at the top — one place to change).

## Local preview

No tooling. Just open `index.html` in a browser, or:

```sh
cd lookn-website
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy — Cloudflare Pages (recommended, free)

1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Pick the repo. **Build command:** *(leave blank)*. **Output directory:** `/`.
4. Save. Cloudflare gives you a `*.pages.dev` URL within a minute.
5. **Custom domain:** Pages → Custom domains → add `looknapp.com` (and `www.looknapp.com`). Update your DNS to point at the Cloudflare nameservers, or add the CNAME records they suggest.
6. **HSTS:** Cloudflare → SSL/TLS → Edge Certificates → enable HSTS with `max-age=31536000; includeSubDomains; preload`. Submit to <https://hstspreload.org>.

### Vercel / Netlify

Same drill — drop the folder, point your domain. No build step required.

## After it’s live — SEO checklist

1. **Google Search Console** — <https://search.google.com/search-console> → add `looknapp.com` → verify (DNS TXT or HTML meta) → submit `sitemap.xml`.
2. **Bing Webmaster Tools** — <https://www.bing.com/webmasters> → same. (Powers DuckDuckGo, ChatGPT search, and ~10% of US queries.)
3. **Lighthouse** — Chrome DevTools → Lighthouse → run on the live URL. Target ≥ 95 in all 4 categories. Should pass on day one.
4. **PageSpeed Insights** — <https://pagespeed.web.dev> → live URL. Confirm Core Web Vitals are green.
5. **OG card check** — <https://www.opengraph.xyz> → paste the live URL → confirm the social-share preview looks right.

## TODOs before launch

Search the codebase for `TODO`. The big ones:

- [ ] **App Store URL** in `index.html` — currently `href="#"`. Swap to `https://apps.apple.com/app/idXXXXXXXXX` and uncomment the `apple-itunes-app` meta with the real ID.
- [ ] **Google Play URL** in `index.html` — currently `href="#"`. Swap to `https://play.google.com/store/apps/details?id=com.lookn.app`. Uncomment the `android-app://` `<link rel="alternate">`.
- [ ] **og:image** — currently uses `hero-bg.png`. Consider creating a dedicated 1200×630 crop with the headline baked in for cleaner link previews. Save as `assets/og.png` and update both `index.html` meta tags.
- [ ] **Press / partnerships email** in `support.html` — currently routes to `support@looknapp.com` with a subject filter. If you want a dedicated `press@looknapp.com` later, update there.

## Changelog

- `2026-05-11` — Initial scaffold. One-screen landing inspired by Finch. Lookn-green CTAs with SmartButton-style layered shadow. Privacy / Terms / Support pages with FAQ schema.

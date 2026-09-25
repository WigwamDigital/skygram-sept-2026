# Skygram SEO site (Next.js)

Static, SEO-focused marketing site for **Skygram.ai**. It shares the design system of the main
React (Vite) app — same Tailwind theme, colors, `glass-card` / `gradient-text` utilities and
`Button` variants (`cta`, `glass`) — but every page is **prerendered at build time (SSG)**.

All sign-up / sign-in CTAs link out to the main app (`NEXT_PUBLIC_APP_URL`).

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS 3.4 (theme ported 1:1 from the Vite app)
- Self-hosted fonts via `@fontsource-variable` (Inter, Space Grotesk) — no network needed at build
- Netlify (auto-detected Next.js runtime) — see `netlify.toml`

## Getting started

```bash
cp .env.example .env.local   # adjust URLs if needed
npm install
npm run dev                  # http://localhost:3000
npm run build                # production build — all routes prerendered
```

## Environment variables

| Name | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of this site (canonicals, sitemap, OG) | `https://skygram.ai` |
| `NEXT_PUBLIC_APP_URL`  | Main React app (CTAs: register, login, calculator) | `https://app.skygram.ai` |

Set both in **Netlify → Site configuration → Environment variables**.

## Structure

```
src/
  app/
    layout.tsx        # global <head> metadata, header + footer
    page.tsx          # landing page (ported from src/pages/Index.tsx)
    zodiac/           # hub + [sign] SSG pages
    compatibility/    # hub + [pair] SSG pages
    placements/       # hub + [slug] (point hubs + placement pages)
    methodology/      # ported static pages
    privacy/
    terms/
    not-found.tsx
    sitemap.ts        # /sitemap.xml — add new SSG routes here
    robots.ts         # /robots.txt
  components/
    SiteHeader.tsx, SiteFooter.tsx
    ui/button.tsx     # same shadcn Button as the main app
  lib/
    site.ts           # siteConfig, appLink(), siteLink()
    utils.ts          # cn()
```

## SSG content

| Route | Pages | Data |
| --- | --- | --- |
| `/zodiac` + `/zodiac/[sign]` | 1 + 12 | `src/lib/zodiac/` (content per element in `signs/*.ts`) |
| `/compatibility` + `/compatibility/[pair]` | 1 + 78 | `src/lib/compatibility/` (dynamics, taglines, scoring) |
| `/placements` + `/placements/[slug]` | 1 + 7 hubs + 84 | `src/lib/placements/` (one file per point in `points/`) |

- Placement slugs: `moon-in-aries` … and `aries-rising`; `/placements/moon` etc. are point hubs in the same
  dynamic route. `sun-in-x`, `rising-in-x` and `x-ascendant` redirect to the canonical pages.
- Pair slugs are canonical (`aries-and-leo`, earlier sign first). Reverse order URLs
  (`leo-and-aries`) permanently redirect via `redirects()` in `next.config.ts`.
- Compatibility scores are deterministic Sun-sign estimates (aspect + element + modality +
  traditional matches) — see `buildPairing()` in `src/lib/compatibility/index.ts`.
- Every dynamic route sets `dynamicParams = false`, has `generateMetadata`, JSON-LD
  (Article, BreadcrumbList, FAQPage) and a build-time `opengraph-image.tsx`.
- Client components import from `src/lib/zodiac/meta.ts` only, to keep long-form content out of
  the JS bundle. `index.ts` throws at build if `meta.ts` drifts from the full sign data.
- New collections: add a route with `generateStaticParams`, then list its URLs in `src/app/sitemap.ts`.

## Deploying to Netlify

1. Move this folder to its own Git repo and push.
2. In Netlify: **Add new site → Import from Git**. Build command `npm run build`, publish `.next`
   (both already set in `netlify.toml`).
3. Add the environment variables above and deploy.

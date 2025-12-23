# Copilot instructions (elektropohotovost)

This repo is a Czech, SEO-first site for **Maloni s.r.o. – Elektro pohotovost NONSTOP 24/7**.

## Stack + constraints

- Next.js App Router with **static export** (`output: "export"`) and **`trailingSlash: true`**.
- Hosting target: **Azure Static Web Apps (SWA)** using `staticwebapp.config.json`.
- Content:
  - Locations are data-driven from `data/locations.ts`.
  - Blog uses MDX under `content/blog/`.
- No SSR/backend. Avoid features requiring runtime server execution.

## Canonical/base URL (critical)

- Absolute canonicals, sitemap and JSON-LD are **baked at build time**.
- Production builds require a real base URL.
  - Use `PUBLIC_BASE_URL` (or `NEXT_PUBLIC_BASE_URL`) like `https://www.elektropohotovost24.cz`.
  - `src/data/site.ts` intentionally fails the production build when the base URL is missing or `https://example.com`.

## Routing

- Because of `trailingSlash: true`, any new top-level route should also get a SWA redirect from non-slash to slash.
  - Update `staticwebapp.config.json` when adding routes.

## Security headers (CSP)

- CSP is global in `staticwebapp.config.json`.
- If you add external embeds/resources (iframes, scripts, fonts), update CSP minimally and narrowly.
- Do not weaken clickjacking protection (`X-Frame-Options: DENY`, `frame-ancestors 'none'`).

## SEO + structured data

- Prefer page-level `metadata`/`generateMetadata` with `alternates.canonical` set via `absoluteUrl()`.
- JSON-LD lives in `src/lib/jsonld.ts` and is rendered via `src/components/ui/JsonLd.tsx`.
- Keep JSON-LD entity IDs stable:
  - business: `${baseUrl}#business`
  - website: `${baseUrl}#website`
- Avoid per-page fragmentation of the business entity.

## Headings

- Ensure each page has a single H1.
- The shared `Section` component supports `titleAs` for this purpose.

## Build + generated outputs

- Validate changes with a production build:
  - `PUBLIC_BASE_URL=https://www.elektropohotovost24.cz npm run build`
- The build outputs into `out/` and postbuild generates sitemap/robots/llms/humans into `out/`.
- **Never commit `out/`**.

## Style + language

- Site content is Czech-only.
- Keep copy factual and non-spammy; avoid invented claims (response times, prices, guarantees) unless already present in existing content.

## When changing prices/contact

- Search and update consistently across:
  - Next pages/components
  - sitemap/robots generators (`scripts/generate-sitemap.ts`)
  - JSON-LD builders if affected

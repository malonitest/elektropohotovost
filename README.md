# Elektro pohotovost (Next.js static export)

Statický web (SSG) pro službu **Elektro pohotovost** v češtině.

## Tech

- Next.js (App Router) + TypeScript
- Statický export (`output: "export"`) + `trailingSlash: true`
- Tailwind CSS
- MDX blog (obsah v `content/blog/`)

## Build výstup

- `next build` generuje statický web do `out/`
- `postbuild` skript doplní `out/sitemap.xml`, `out/robots.txt`, `out/llms.txt`, `out/humans.txt` a zkopíruje `staticwebapp.config.json` do `out/`

## Konfigurace (canonical + sitemap)

Před nasazením nastavte (např. v Azure Static Web Apps → Application settings):

- `PUBLIC_BASE_URL` (nebo `NEXT_PUBLIC_BASE_URL`) – např. `https://www.elektropohotovost24.cz`
- `PUBLIC_PHONE` (nebo `NEXT_PUBLIC_PHONE`)
- `PUBLIC_EMAIL` (nebo `NEXT_PUBLIC_EMAIL`)

Poznámka: protože jde o statický export, absolutní canonical URL a sitemap se „zapečou“ při buildu.

## Spuštění lokálně

```bash
npm install
npm run dev
```

## Produkční build lokálně (doporučeno)

```bash
PUBLIC_BASE_URL=https://www.elektropohotovost24.cz npm run build
```

## Nasazení do Azure Static Web Apps

1. Připojte repo do Azure Static Web Apps.
2. Nastavte build:
	- App location: `/`
	- Output location: `out`
	- Build command: `npm run build`
3. Doplňte env proměnné (`PUBLIC_BASE_URL`, `PUBLIC_PHONE`, `PUBLIC_EMAIL`).
4. Routing je čistě statický (bez SSR).

Konfigurace SWA je v `staticwebapp.config.json` (security headers, cache headers a redirecty na trailing-slash varianty).

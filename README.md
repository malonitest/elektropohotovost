# Elektro pohotovost (Astro SSG)

Statický web (SSG) pro službu **Elektro pohotovost** v češtině.

## Technické požadavky

- Astro + TypeScript
- Bez SSR, bez backendu
- Build: `npm run build`
- Výstup: `dist/`
- Po buildu se generuje `dist/sitemap.xml` a `dist/robots.txt`

## Lokality a routy

- Oblasti: `/{areaSlug}/` (např. `/praha-zapad/`, `/zapadni-praha/`, `/beroun/`)
- Lokality: `/{areaSlug}/{locationSlug}/` (např. `/praha-zapad/cernosice/`)

Data jsou v:

- `src/data/areas.ts`
- `src/data/locations.ts` (včetně `publish: true/false` pro 1. vlnu)

## Konfigurace (canonical + sitemap)

Před publikováním nastavte (např. v Azure SWA „Application settings“):

- `PUBLIC_BASE_URL` – např. `https://www.domena.cz`
- `PUBLIC_PHONE` – např. `+420 123 456 789`
- `PUBLIC_EMAIL` – např. `info@domena.cz`

Bez vyplnění se web zbuildí, ale kontakty se zobrazí jako „doplňte v konfiguraci“.

## Spuštění lokálně

```bash
npm install
npm run dev
```

## Nasazení do Azure Static Web Apps

1. Připojte repo do Azure Static Web Apps.
2. Nastavte build:
	- App location: `/`
	- Output location: `dist`
	- Build command: `npm run build`
3. V „Configuration“ doplňte `PUBLIC_BASE_URL`, `PUBLIC_PHONE`, `PUBLIC_EMAIL`.
4. Bez SPA fallbacku: routing je čistě statický.

Konfigurace SWA je v `staticwebapp.config.json` (security headers + konzervativní redirecty pro hlavní URL na variantu s lomítkem).
```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

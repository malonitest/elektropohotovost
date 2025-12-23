import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { publishedLocations } from "../data/locations";
import { absoluteUrl, pathForLocationLanding } from "../src/lib/urls";
import { blogCategories } from "../src/data/blog";
import { getAllPosts } from "../src/lib/blog";

function isoLastmod(now = new Date()): string {
	return now.toISOString();
}

function xmlEscape(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

type UrlEntry = {
	loc: string;
	lastmod: string;
};

async function buildEntries(): Promise<UrlEntry[]> {
	const lastmod = isoLastmod();
	const entries: UrlEntry[] = [];

	const add = (pathname: string) => {
		entries.push({ loc: absoluteUrl(pathname), lastmod });
	};

	add("/");
	add("/lokality/");
	add("/sluzby/");
	add("/sluzby/elektro-pohotovost/");
	add("/sluzby/hodinovy-manzel/");
	add("/blog/");
	add("/blog/kategorie/");
	add("/faq/");
	add("/cenik/");
	add("/kontakt/");
	add("/legal/");

	for (const c of blogCategories) {
		add(`/blog/kategorie/${c.slug}/`);
	}
	for (const p of await getAllPosts()) {
		add(`/blog/${p.slug}/`);
	}

	for (const loc of publishedLocations) {
		add(pathForLocationLanding(loc.slug));
	}

	return entries;
}

function renderSitemap(entries: UrlEntry[]): string {
	const lines: string[] = [];
	lines.push("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
	lines.push("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">");
	for (const e of entries) {
		lines.push("  <url>");
		lines.push(`    <loc>${xmlEscape(e.loc)}</loc>`);
		lines.push(`    <lastmod>${xmlEscape(e.lastmod)}</lastmod>`);
		lines.push("  </url>");
	}
	lines.push("</urlset>");
	return lines.join("\n") + "\n";
}

async function main() {
	const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
	const outDir = path.join(repoRoot, "out");
	await mkdir(outDir, { recursive: true });

	// Copy SWA routing/headers config into the deployed artifact root.
	try {
		const swaConfig = await readFile(path.join(repoRoot, "staticwebapp.config.json"));
		await writeFile(path.join(outDir, "staticwebapp.config.json"), swaConfig);
	} catch {
		// optional
	}

	const entries = await buildEntries();
	const xml = renderSitemap(entries);
	await writeFile(path.join(outDir, "sitemap.xml"), xml, "utf8");

	const robots = `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`;
	await writeFile(path.join(outDir, "robots.txt"), robots, "utf8");

	const llms = `# Maloni s.r.o. – Elektro pohotovost (CZ)\n\nTento web je statický (SSG). Primární službou je \"Elektro pohotovost\" – havarijní elektrikář NONSTOP 24/7. Doplňkově nabízíme i samostatnou službu \"Hodinový manžel\" pro plánované opravy a montáže.\n\n## Struktura webu\n- Domů: /\n- Lokality (seznam + hledání): /lokality/\n- Lokality (detail): /elektro-pohotovost/{slug}/\n- Služby (přehled): /sluzby/\n- Služby (elektro pohotovost): /sluzby/elektro-pohotovost/\n- Služby (hodinový manžel): /sluzby/hodinovy-manzel/\n- Blog (přehled + vyhledávání): /blog/\n- Blog (kategorie): /blog/kategorie/{slug}/\n- Blog (článek): /blog/{slug}/\n- FAQ: /faq/\n- Ceník: /cenik/\n- Kontakt: /kontakt/\n- Právní informace: /legal/\n\n## Poznámky\n- Elektro pohotovost je havarijní služba 24/7. Hodinový manžel je plánovaná služba (bez havárií).\n- Každá lokalita má vlastní stránku s unikátním obsahem, FAQ a kontakty.\n\n## Kontakt\n- Telefon a e-mail najdete na /kontakt/\n`;
	await writeFile(path.join(outDir, "llms.txt"), llms, "utf8");

	const humans = `Elektro pohotovost\n\nTechnology:\n- Next.js (App Router, SSG export)\n- React\n- TypeScript\n- Tailwind CSS\n\nProject:\n- Static website optimized for Local SEO & AI search\n\nContact:\n- /kontakt/\n`;
	await writeFile(path.join(outDir, "humans.txt"), humans, "utf8");

	// eslint-disable-next-line no-console
	console.log(`sitemap.xml generated (${entries.length} URLs)`);
}

main().catch((err) => {
	// eslint-disable-next-line no-console
	console.error(err);
	process.exit(1);
});

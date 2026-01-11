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

	// Copy llms.txt from public/ directory
	try {
		const llmsContent = await readFile(path.join(repoRoot, "public", "llms.txt"), "utf8");
		await writeFile(path.join(outDir, "llms.txt"), llmsContent, "utf8");
	} catch (err) {
		console.warn("Warning: Could not copy llms.txt:", err);
	}

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

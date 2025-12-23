import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { areas } from "../src/data/areas";
import { publishedLocations } from "../src/data/locations";
import { problems } from "../src/data/problems";
import {
	absoluteUrl,
	pathForArea,
	pathForAreaProblemHub,
	pathForLocation,
	pathForProblem,
	pathForProblemHub
} from "../src/lib/urls";

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

function buildEntries(): UrlEntry[] {
	const lastmod = isoLastmod();
	const entries: UrlEntry[] = [];

	const add = (pathname: string) => {
		entries.push({ loc: absoluteUrl(pathname), lastmod });
	};

	add("/");
	add("/sluzby/");
	add("/kontakt/");
	add(pathForProblemHub());

	for (const area of areas) {
		add(pathForArea(area.slug));
		add(pathForAreaProblemHub(area.slug));
	}

	for (const loc of publishedLocations) {
		add(pathForLocation(loc.parentAreaSlug, loc.slug));
	}

	for (const p of problems) {
		add(pathForProblem(p.slug));
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
	const distDir = path.join(repoRoot, "dist");
	await mkdir(distDir, { recursive: true });

	// Copy SWA routing/headers config into the deployed artifact root.
	try {
		const swaConfig = await readFile(path.join(repoRoot, "staticwebapp.config.json"));
		await writeFile(path.join(distDir, "staticwebapp.config.json"), swaConfig);
	} catch {
		// optional
	}

	const entries = buildEntries();
	const xml = renderSitemap(entries);
	await writeFile(path.join(distDir, "sitemap.xml"), xml, "utf8");

	const robots = `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`;
	await writeFile(path.join(distDir, "robots.txt"), robots, "utf8");

	// eslint-disable-next-line no-console
	console.log(`sitemap.xml generated (${entries.length} URLs)`);
}

main().catch((err) => {
	// eslint-disable-next-line no-console
	console.error(err);
	process.exit(1);
});

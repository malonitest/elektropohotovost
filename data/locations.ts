import { locations as legacyLocations } from "../src/data/locations";

export type Location = {
	slug: string;
	name: string;
	publish: boolean;
	nearbySlugs: string[];
	coordinates?: {
		latitude: number;
		longitude: number;
	};
	lastUpdated?: string; // Date when pricing/info was last verified (YYYY-MM-DD)
};

function normalizeName(value: string): string {
	return value
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{Diacritic}+/gu, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

const nameToSlug = new Map<string, string>();
for (const loc of legacyLocations) {
	nameToSlug.set(normalizeName(loc.name), loc.slug);
}

export const locations: Location[] = legacyLocations.map((loc) => {
	const nearbySlugs = (loc.nearby || [])
		.map((txt) => nameToSlug.get(normalizeName(txt)))
		.filter(Boolean) as string[];

	return {
		slug: loc.slug,
		name: loc.name,
		publish: loc.publish,
		nearbySlugs: Array.from(new Set(nearbySlugs)).slice(0, 8),
		coordinates: loc.coordinates,
		lastUpdated: "2026-01-11" // Set initial update date for all locations
	};
});

export const publishedLocations = locations
	.filter((l) => l.publish)
	.sort((a, b) => a.name.localeCompare(b.name, "cs"));

export const locationBySlug = new Map(locations.map((l) => [l.slug, l] as const));

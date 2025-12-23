import type { Location } from "../data/locations";

function normalizeName(value: string): string {
	return value
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{Diacritic}+/gu, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, " ")
		.trim();
}

export function buildLocationNameIndex(locations: Location[]): Map<string, Location> {
	const map = new Map<string, Location>();
	for (const loc of locations) {
		map.set(normalizeName(loc.name), loc);
	}
	return map;
}

export function tryResolveNearbyToLocation(
	nearbyText: string,
	index: Map<string, Location>
): Location | undefined {
	return index.get(normalizeName(nearbyText));
}

import type { Area } from "../data/areas";
import type { Location } from "../data/locations";
import { baseUrl } from "../data/site";

export function pathForArea(areaSlug: string): string {
	return `/${areaSlug}/`;
}

export function pathForLocation(areaSlug: string, locationSlug: string): string {
	return `/${areaSlug}/${locationSlug}/`;
}

export function pathForProblemHub(): string {
	return "/porucha/";
}

export function pathForProblem(problemSlug: string): string {
	return `/porucha/${problemSlug}/`;
}

export function pathForAreaProblemHub(areaSlug: string): string {
	return `/${areaSlug}/porucha/`;
}

export function pathForLocationLanding(locationSlug: string): string {
	return `/elektro-pohotovost/${locationSlug}/`;
}

export function absoluteUrl(pathname: string): string {
	const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
	return `${baseUrl}${normalized}`;
}

export function canonicalForArea(area: Area): string {
	return absoluteUrl(pathForArea(area.slug));
}

export function canonicalForLocation(location: Location): string {
	return absoluteUrl(pathForLocation(location.parentAreaSlug, location.slug));
}

export function canonicalForProblemHub(): string {
	return absoluteUrl(pathForProblemHub());
}

export function canonicalForProblem(problemSlug: string): string {
	return absoluteUrl(pathForProblem(problemSlug));
}

export function canonicalForAreaProblemHub(areaSlug: string): string {
	return absoluteUrl(pathForAreaProblemHub(areaSlug));
}

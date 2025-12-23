import type { Area } from "../data/areas";
import type { Location } from "../data/locations";
import { pickVariant } from "./hash";

export function titleFor(placeName: string): string {
	return `Elektro pohotovost ${placeName} | Elektrikář 24/7`;
}

export function descriptionForArea(area: Area): string {
	// 140–160 znaků cíleně, bez spamu
	const base = `Nonstop elektro pohotovost v oblasti ${area.name}. Rychlé řešení výpadků proudu, zkratů a poruch rozvaděče. Výjezdy 24/7.`;
	return base.length > 160 ? base.slice(0, 157) + "…" : base;
}

export function descriptionForLocation(location: Location): string {
	const variants = [
		`Nonstop elektro pohotovost v lokalitě ${location.name}. Pomůžeme s výpadkem proudu, zkratem i shozeným jističem. Výjezd 24/7.`,
		`Elektro pohotovost ${location.name}: havárie elektro, výpadky elektřiny a poruchy rozvaděče. Nonstop 24/7, výjezd dle provozu.`,
		`Rychlá elektro pohotovost v ${location.name}. Opravy výpadků proudu, zkratů a jističů pro byty, domy i firmy. Nonstop 24/7.`
	] as const;
	const desc = pickVariant(location.slug, variants);
	return desc.length > 160 ? desc.slice(0, 157) + "…" : desc;
}

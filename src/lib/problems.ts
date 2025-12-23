import type { Location } from "../data/locations";
import type { Area } from "../data/areas";
import type { Problem, LocationLinksMode } from "../data/problems";
import { pickVariant } from "./hash";

export function titleForProblem(problemName: string): string {
	return `${problemName} | Elektro pohotovost – co dělat a kdy volat`;
}

export function descriptionForProblem(problem: Problem): string {
	const variants = [
		`${problem.name}: příznaky, nejčastější příčiny a bezpečné kroky, co udělat hned. Kdy volat elektro pohotovost a čemu se vyhnout.`,
		`Praktický postup pro ${problem.name}: příznaky, příčiny, co udělat teď a kdy volat elektrikáře. Bez práce pod napětím.`,
		`${problem.name} – rychlá orientace: jak poznat problém, co udělat okamžitě a kdy je lepší volat elektro pohotovost.`
	] as const;
	const desc = pickVariant(problem.slug, variants);
	return desc.length > 160 ? desc.slice(0, 157) + "…" : desc;
}

export function tldrForProblem(problem: Problem): string {
	const first = pickVariant(problem.slug + "-tldr-1", [
		`${problem.name}: typicky se projeví jako ${problem.symptoms[0] ?? "závada v okruhu"}.`,
		`U poruchy „${problem.name}“ bývá první známkou ${problem.symptoms[0] ?? "výpadek/omezení okruhu"}.`,
		`${problem.name} se často pozná podle toho, že ${problem.symptoms[0] ?? "dochází k výpadkům"}.`
	] as const);

	const second = pickVariant(problem.slug + "-tldr-2", [
		`Bezpečně začněte kontrolou jištění (jistič/chránič), odpojením zátěže a zhodnocením, zda je cítit zápach nebo přehřívání.`,
		`První kroky: nepokračujte v opakovaném nahazování jištění, odpojte spotřebiče a postupujte bez zásahů do elektroinstalace.`,
		`Doporučený start: ověřte rozsah problému, odstavte podezřelý okruh a nevykonávejte žádnou práci pod napětím.`
	] as const);

	const third = pickVariant(problem.slug + "-tldr-3", [
		`Pokud se porucha opakuje, jištění hned vypadává nebo je cítit spálenina, volejte elektro pohotovost.`,
		`Když nejde závadu bezpečně stabilizovat nebo se objevuje spálenina/jiskření, volejte elektrikáře 24/7.`,
		`Při přehřívání, zápachu nebo opakovaném vybavování jištění je vhodný výjezd elektro pohotovosti.`
	] as const);

	return `${first} ${second} ${third}`;
}

export function pickProblemsForLocation(params: {
	location: Location;
	problems: Problem[];
	countMin?: number;
	countMax?: number;
}): Problem[] {
	const { location, problems, countMin = 4, countMax = 6 } = params;
	const priority1 = problems.filter((p) => p.priority === 1);

	const rotate = <T,>(arr: T[], shift: number) => {
		if (!arr.length) return arr;
		const s = ((shift % arr.length) + arr.length) % arr.length;
		return [...arr.slice(s), ...arr.slice(0, s)];
	};

	const prefersByType: Record<Location["type"], string[]> = {
		obec: [
			"porucha-venkovni-zasuvky",
			"pretizeny-okruh",
			"porucha-rozvadece",
			"shozeny-jistic",
			"vypadek-proudu",
			"prehrata-zasuvka"
		],
		"mestska-cast": [
			"nejdou-svetla",
			"vyhazuje-proudovy-chranic",
			"shozeny-jistic",
			"prehrata-zasuvka",
			"vypadek-proudu",
			"zkrat-elektroinstalace"
		]
	};

	const preferredSlugs = prefersByType[location.type];
	const shift = pickVariant(location.slug + "-problem-rot", [0, 1, 2, 3] as const);
	const rotatedPreferredSlugs = rotate(preferredSlugs, shift);

	const preferred = rotatedPreferredSlugs
		.map((slug) => priority1.find((p) => p.slug === slug))
		.filter(Boolean) as Problem[];

	const fallback = priority1
		.filter((p) => !preferred.some((x) => x.slug === p.slug))
		.sort((a, b) => a.name.localeCompare(b.name, "cs"));

	const wanted = pickVariant(location.slug + "-problems-count", [countMin, countMax] as const);
	const picked = [...preferred, ...fallback].slice(0, wanted);
	return picked;
}

export function pickLocationsForProblemLinks(params: {
	mode: LocationLinksMode;
	locations: Location[];
	maxTop?: number;
}): {
	areasOnly: boolean;
	selected: Location[];
} {
	const { mode, locations, maxTop = 10 } = params;
	const published = locations.filter((l) => l.publish);

	if (mode === "all") {
		return { areasOnly: true, selected: [] };
	}

	if (mode === "top") {
		const top = published
			.filter((l) => l.priority === 1)
			.sort((a, b) => a.name.localeCompare(b.name, "cs"))
			.slice(0, maxTop);
		return { areasOnly: false, selected: top };
	}

	// area-specific: 5 Praha-západ + 5 Západní Praha (Beroun volitelně)
	const pickByArea = (areaSlug: string, count: number) =>
		published
			.filter((l) => l.parentAreaSlug === areaSlug && l.priority === 1)
			.sort((a, b) => a.name.localeCompare(b.name, "cs"))
			.slice(0, count);

	const pz = pickByArea("praha-zapad", 5);
	const zp = pickByArea("zapadni-praha", 5);
	const br = pickByArea("beroun", 2);
	return { areasOnly: false, selected: [...pz, ...zp, ...br] };
}

export function pickProblemsForArea(params: {
	area: Area;
	problems: Problem[];
	count?: number;
}): Problem[] {
	const { area, problems, count = 8 } = params;
	const priority1 = problems.filter((p) => p.priority === 1);

	const byAreaType: Record<Area["type"], string[]> = {
		"mestske-casti": [
			"nejdou-svetla",
			"vyhazuje-proudovy-chranic",
			"shozeny-jistic",
			"prehrata-zasuvka",
			"vypadek-proudu",
			"zkrat-elektroinstalace",
			"zapach-spaleniny",
			"vyhazuje-jistic-pri-spotrebici"
		],
		okres: [
			"vypadek-proudu",
			"shozeny-jistic",
			"pretizeny-okruh",
			"porucha-rozvadece",
			"porucha-venkovni-zasuvky",
			"prehrata-zasuvka",
			"zapach-spaleniny",
			"vyhazuje-jistic-pri-spotrebici"
		],
		"mesto-a-okoli": [
			"vypadek-proudu",
			"shozeny-jistic",
			"porucha-rozvadece",
			"pretizeny-okruh",
			"prehrata-zasuvka",
			"zapach-spaleniny",
			"porucha-venkovni-zasuvky",
			"vyhazuje-jistic-pri-spotrebici"
		]
	};

	const preferredSlugs = byAreaType[area.type];
	const shift = pickVariant(area.slug + "-area-problem-rot", [0, 1, 2, 3] as const);
	const rotate = <T,>(arr: T[], s: number) => {
		if (!arr.length) return arr;
		const n = ((s % arr.length) + arr.length) % arr.length;
		return [...arr.slice(n), ...arr.slice(0, n)];
	};
	const rotatedPreferred = rotate(preferredSlugs, shift);

	const preferred = rotatedPreferred
		.map((slug) => priority1.find((p) => p.slug === slug))
		.filter(Boolean) as Problem[];

	const fallback = priority1
		.filter((p) => !preferred.some((x) => x.slug === p.slug))
		.sort((a, b) => a.name.localeCompare(b.name, "cs"));

	return [...preferred, ...fallback].slice(0, count);
}

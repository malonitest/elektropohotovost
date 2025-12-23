export type AreaType = "okres" | "mestske-casti" | "mesto-a-okoli";

export type Area = {
	name: string;
	slug: string;
	type: AreaType;
	shortIntro: string;
	primaryLocations: string[]; // location slugs (within this area)
};

export const areas: Area[] = [
	{
		name: "Praha-západ",
		slug: "praha-zapad",
		type: "okres",
		shortIntro:
			"Elektro pohotovost pro obce okresu Praha‑západ. Havarijní opravy elektroinstalace, výjezdy k výpadkům proudu a závadám rozvaděče nonstop 24/7.",
		primaryLocations: [
			"cernosice",
			"dobrichovice",
			"revnice",
			"roztoky",
			"hostivice"
		]
	},
	{
		name: "Západní Praha",
		slug: "zapadni-praha",
		type: "mestske-casti",
		shortIntro:
			"Nonstop elektrikář pro západní část Prahy a městské části. Řešíme výpadky elektřiny, shozené jističe i zkraty v bytech, domech a firmách 24/7.",
		primaryLocations: ["praha-5", "smichov", "praha-6", "dejvice", "brevnov"]
	},
	{
		name: "Beroun",
		slug: "beroun",
		type: "mesto-a-okoli",
		shortIntro:
			"Elektro pohotovost v Berouně a okolí. Rychlé řešení poruch rozvaděče, zkratů a výpadků proudu v domácnostech i provozech – nonstop 24/7.",
		primaryLocations: ["beroun", "kraluv-dvur", "zdice", "horovice"]
	}
];

export const areaBySlug = new Map(areas.map((a) => [a.slug, a] as const));

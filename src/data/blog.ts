export type BlogCategory = {
	slug: string;
	name: string;
	short: string;
	service: "elektro" | "manzel" | "mixed";
};

export const blogCategories: BlogCategory[] = [
	{
		slug: "elektro-havarie",
		name: "Elektro havárie a první kroky",
		short: "Bezpečný postup při výpadku proudu, jiskření a dalších urgentních stavech.",
		service: "elektro"
	},
	{
		slug: "jisteni-a-rozvadec",
		name: "Jištění, chrániče a rozvaděč",
		short: "Jak číst signály z jištění a kdy je na místě zásah elektrikáře.",
		service: "elektro"
	},
	{
		slug: "bezpecnost-a-distributor",
		name: "Bezpečnost a kdy volat distributora",
		short: "Kdy volat PRE/ČEZ/EG.D, co nedělat a jak postupovat rozumně.",
		service: "elektro"
	},
	{
		slug: "cenik-a-domluva",
		name: "Domluva a orientační ceny",
		short: "Co ovlivňuje cenu, jak připravit informace a jak probíhá férová domluva.",
		service: "elektro"
	},
	{
		slug: "hodinovy-manzel",
		name: "Hodinový manžel – plánované opravy",
		short: "Montáže, drobné opravy a údržba bytu/domu v domluveném termínu.",
		service: "manzel"
	}
];

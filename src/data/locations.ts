export type LocationType = "obec" | "mestska-cast";

export type Location = {
	name: string;
	slug: string;
	parentAreaSlug: string;
	type: LocationType;
	nearby: string[]; // 3–8 textů (okolí)
	priority: 1 | 2 | 3;
	publish: boolean;
	microContextTags?: string[];
};

// Pozn.: Jedna lokalita patří jen do jedné oblasti (např. Loděnice je pouze v Berounsku).
export const locations: Location[] = [
	// A) Praha-západ
	{
		name: "Černošice",
		slug: "cernosice",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Radotín", "Mokropsy", "Všenory", "Dobřichovice"],
		priority: 1,
		publish: true,
		microContextTags: ["rodinne-domy", "garaze", "zahrady", "firmy"]
	},
	{
		name: "Dobřichovice",
		slug: "dobrichovice",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Černošice", "Všenory", "Lety", "Řevnice"],
		priority: 1,
		publish: true,
		microContextTags: ["rodinne-domy", "pripojky", "rozvadec", "dilny"]
	},
	{
		name: "Řevnice",
		slug: "revnice",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Dobřichovice", "Lety", "Všenory", "Vonoklasy"],
		priority: 1,
		publish: true,
		microContextTags: ["rodinne-domy", "chaty", "rozvadec", "firmy"]
	},
	{
		name: "Roztoky",
		slug: "roztoky",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Suchdol", "Horoměřice", "Kněževes", "Praha 6"],
		priority: 1,
		publish: true,
		microContextTags: ["bytove-domy", "rodinne-domy", "firmy"]
	},
	{
		name: "Hostivice",
		slug: "hostivice",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Chýně", "Jeneč", "Ruzyně", "Zličín"],
		priority: 1,
		publish: true,
		microContextTags: ["rodinne-domy", "prumysl", "firmy"]
	},
	{
		name: "Rudná",
		slug: "rudna",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Nučice", "Chýně", "Zbuzany", "Praha 5"],
		priority: 1,
		publish: true,
		microContextTags: ["rodinne-domy", "firmy", "dilny"]
	},
	{
		name: "Jesenice",
		slug: "jesenice",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Vestec", "Psáry", "Průhonice", "Zvole"],
		priority: 1,
		publish: true,
		microContextTags: ["rodinne-domy", "novostavby", "pripojky"]
	},
	{
		name: "Jílové u Prahy",
		slug: "jilove-u-prahy",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Psáry", "Libeř", "Zvole", "Ohrobec"],
		priority: 2,
		publish: false,
		microContextTags: ["rodinne-domy", "chaty", "dilny"]
	},
	{
		name: "Mníšek pod Brdy",
		slug: "mnisek-pod-brdy",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Líšno", "Čisovice", "Kytín", "Řevnice"],
		priority: 1,
		publish: true,
		microContextTags: ["rodinne-domy", "chaty", "garaze"]
	},
	{
		name: "Psáry",
		slug: "psary",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Jesenice", "Vestec", "Libeř", "Jílové u Prahy"],
		priority: 2,
		publish: false,
		microContextTags: ["rodinne-domy", "novostavby", "firmy"]
	},
	{
		name: "Vestec",
		slug: "vestec",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Jesenice", "Průhonice", "Praha 4", "Kunratice"],
		priority: 2,
		publish: false,
		microContextTags: ["rodinne-domy", "firmy"]
	},
	{
		name: "Horoměřice",
		slug: "horomerice",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Statenice", "Tuchoměřice", "Praha 6", "Roztoky"],
		priority: 2,
		publish: false,
		microContextTags: ["rodinne-domy", "firmy"]
	},
	{
		name: "Tuchoměřice",
		slug: "tuchomerice",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Kněževes", "Tursko", "Horoměřice", "Ruzyně"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "pripojky"]
	},
	{
		name: "Statenice",
		slug: "statenice",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Horoměřice", "Tuchoměřice", "Černý Vůl", "Praha 6"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "novostavby"]
	},
	{
		name: "Zbuzany",
		slug: "zbuzany",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Rudná", "Choteč", "Zličín", "Praha 5"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "garaze"]
	},
	{
		name: "Chýně",
		slug: "chyne",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Hostivice", "Jeneč", "Rudná", "Zličín"],
		priority: 3,
		publish: false,
		microContextTags: ["novostavby", "rodinne-domy", "pripojky"]
	},
	{
		name: "Ořech",
		slug: "orech",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Zbuzany", "Choteč", "Rudná", "Praha 5"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "firmy"]
	},
	{
		name: "Jeneč",
		slug: "jenec",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Hostivice", "Dobrovíz", "Tuchoměřice", "Chýně"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "garaze"]
	},
	{
		name: "Dobrovíz",
		slug: "dobroviz",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Jeneč", "Kněževes", "Hostivice", "Ruzyně"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "dilny"]
	},
	{
		name: "Kněževes",
		slug: "knezeves",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Tuchoměřice", "Dobrovíz", "Ruzyně", "Praha 6"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "firmy"]
	},
	{
		name: "Průhonice",
		slug: "pruhonice",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Vestec", "Jesenice", "Čestlice", "Praha 4"],
		priority: 2,
		publish: false,
		microContextTags: ["rodinne-domy", "firmy"]
	},
	{
		name: "Libeř",
		slug: "liber",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Psáry", "Jílové u Prahy", "Zvole", "Ohrobec"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "chaty"]
	},
	{
		name: "Zvole",
		slug: "zvole",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Libeř", "Ohrobec", "Jesenice", "Praha 4"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "garaze"]
	},
	{
		name: "Ohrobec",
		slug: "ohrobec",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Zvole", "Libeř", "Jílové u Prahy", "Psáry"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "chaty"]
	},
	{
		name: "Lety",
		slug: "lety",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Dobřichovice", "Řevnice", "Karlík", "Všenory"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "dilny"]
	},
	{
		name: "Vonoklasy",
		slug: "vonoklasy",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Řevnice", "Karlík", "Roblín", "Lety"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "chaty"]
	},
	{
		name: "Všenory",
		slug: "vsenory",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Dobřichovice", "Lety", "Černošice", "Řevnice"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "garaze"]
	},
	{
		name: "Karlík",
		slug: "karlik",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Lety", "Roblín", "Vonoklasy", "Řevnice"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "chaty", "zahrady"]
	},
	{
		name: "Roblín",
		slug: "roblin",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Karlík", "Vonoklasy", "Mořina", "Rudná"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "garaze"]
	},
	{
		name: "Nučice",
		slug: "nucice",
		parentAreaSlug: "praha-zapad",
		type: "obec",
		nearby: ["Rudná", "Loděnice", "Chrustenice", "Jinočany"],
		priority: 2,
		publish: false,
		microContextTags: ["rodinne-domy", "firmy"]
	},

	// B) Západní Praha (městské části + čtvrti)
	{
		name: "Praha 5",
		slug: "praha-5",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Smíchov", "Košíře", "Radlice", "Barrandov"],
		priority: 1,
		publish: true,
		microContextTags: ["bytove-domy", "spolecne-prostory", "firmy"]
	},
	{
		name: "Smíchov",
		slug: "smichov",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Anděl", "Radlice", "Košíře", "Praha 5"],
		priority: 1,
		publish: true,
		microContextTags: ["bytove-domy", "kancelare", "provozovny"]
	},
	{
		name: "Košíře",
		slug: "kosire",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Smíchov", "Motol", "Řepy", "Praha 5"],
		priority: 2,
		publish: false,
		microContextTags: ["bytove-domy", "spolecne-prostory"]
	},
	{
		name: "Radlice",
		slug: "radlice",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Smíchov", "Jinonice", "Barrandov", "Praha 5"],
		priority: 3,
		publish: false,
		microContextTags: ["bytove-domy", "kancelare"]
	},
	{
		name: "Barrandov",
		slug: "barrandov",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Hlubočepy", "Smíchov", "Radlice", "Řeporyje"],
		priority: 3,
		publish: false,
		microContextTags: ["bytove-domy", "garaze"]
	},
	{
		name: "Praha 6",
		slug: "praha-6",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Dejvice", "Břevnov", "Vokovice", "Ruzyně"],
		priority: 1,
		publish: true,
		microContextTags: ["bytove-domy", "spolecne-prostory", "instituce"]
	},
	{
		name: "Dejvice",
		slug: "dejvice",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Hradčany", "Bubeneč", "Praha 6", "Vokovice"],
		priority: 1,
		publish: true,
		microContextTags: ["bytove-domy", "kancelare", "instituce"]
	},
	{
		name: "Břevnov",
		slug: "brevnov",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Střešovice", "Dejvice", "Vokovice", "Motol"],
		priority: 1,
		publish: true,
		microContextTags: ["bytove-domy", "spolecne-prostory"]
	},
	{
		name: "Vokovice",
		slug: "vokovice",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Veleslavín", "Dejvice", "Ruzyně", "Praha 6"],
		priority: 2,
		publish: false,
		microContextTags: ["bytove-domy", "kancelare"]
	},
	{
		name: "Ruzyně",
		slug: "ruzyne",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Dlouhá Míle", "Vokovice", "Kněževes", "Hostivice"],
		priority: 2,
		publish: false,
		microContextTags: ["bytove-domy", "firmy"]
	},
	{
		name: "Praha 13",
		slug: "praha-13",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Stodůlky", "Nové Butovice", "Třebonice", "Zličín"],
		priority: 2,
		publish: false,
		microContextTags: ["bytove-domy", "spolecne-prostory", "firmy"]
	},
	{
		name: "Nové Butovice",
		slug: "nove-butovice",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Stodůlky", "Jinonice", "Praha 13", "Zličín"],
		priority: 3,
		publish: false,
		microContextTags: ["bytove-domy", "spolecne-prostory", "kancelare"]
	},
	{
		name: "Stodůlky",
		slug: "stodulky",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Nové Butovice", "Lužiny", "Třebonice", "Praha 13"],
		priority: 2,
		publish: false,
		microContextTags: ["bytove-domy", "spolecne-prostory"]
	},
	{
		name: "Jinonice",
		slug: "jinonice",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Radlice", "Nové Butovice", "Smíchov", "Stodůlky"],
		priority: 2,
		publish: false,
		microContextTags: ["bytove-domy", "kancelare"]
	},
	{
		name: "Třebonice",
		slug: "trebonice",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Stodůlky", "Zličín", "Řeporyje", "Jinonice"],
		priority: 3,
		publish: false,
		microContextTags: ["bytove-domy", "firmy"]
	},
	{
		name: "Řepy",
		slug: "repy",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Motol", "Košíře", "Zličín", "Ruzyně"],
		priority: 3,
		publish: false,
		microContextTags: ["bytove-domy", "spolecne-prostory"]
	},
	{
		name: "Zličín",
		slug: "zlicin",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Stodůlky", "Řepy", "Hostivice", "Chýně"],
		priority: 2,
		publish: false,
		microContextTags: ["bytove-domy", "firmy"]
	},
	{
		name: "Motol",
		slug: "motol",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Košíře", "Břevnov", "Řepy", "Smíchov"],
		priority: 3,
		publish: false,
		microContextTags: ["bytove-domy", "instituce"]
	},
	{
		name: "Řeporyje",
		slug: "reporyje",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Třebonice", "Barrandov", "Zličín", "Stodůlky"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "bytove-domy"]
	},
	{
		name: "Velká Ohrada",
		slug: "velka-ohrada",
		parentAreaSlug: "zapadni-praha",
		type: "mestska-cast",
		nearby: ["Stodůlky", "Košíře", "Motol", "Praha 13"],
		priority: 3,
		publish: false,
		microContextTags: ["bytove-domy", "spolecne-prostory"]
	},

	// C) Beroun a okolí (Berounsko)
	{
		name: "Beroun",
		slug: "beroun",
		parentAreaSlug: "beroun",
		type: "obec",
		nearby: ["Králův Dvůr", "Tetín", "Zdice", "Loděnice"],
		priority: 1,
		publish: true,
		microContextTags: ["bytove-domy", "rodinne-domy", "firmy"]
	},
	{
		name: "Králův Dvůr",
		slug: "kraluv-dvur",
		parentAreaSlug: "beroun",
		type: "obec",
		nearby: ["Beroun", "Zdice", "Tetín", "Loděnice"],
		priority: 1,
		publish: true,
		microContextTags: ["rodinne-domy", "firmy"]
	},
	{
		name: "Zdice",
		slug: "zdice",
		parentAreaSlug: "beroun",
		type: "obec",
		nearby: ["Beroun", "Králův Dvůr", "Komárov", "Žebrák"],
		priority: 2,
		publish: false,
		microContextTags: ["rodinne-domy", "dilny"]
	},
	{
		name: "Tetín",
		slug: "tetin",
		parentAreaSlug: "beroun",
		type: "obec",
		nearby: ["Beroun", "Srbsko", "Koněprusy", "Králův Dvůr"],
		priority: 3,
		publish: false,
		microContextTags: ["chaty", "rodinne-domy"]
	},
	{
		name: "Loděnice",
		slug: "lodenice",
		parentAreaSlug: "beroun",
		type: "obec",
		nearby: ["Beroun", "Králův Dvůr", "Nučice", "Rudná"],
		priority: 2,
		publish: false,
		microContextTags: ["rodinne-domy", "firmy"]
	},
	{
		name: "Hořovice",
		slug: "horovice",
		parentAreaSlug: "beroun",
		type: "obec",
		nearby: ["Žebrák", "Komárov", "Cerhovice", "Tlustice"],
		priority: 2,
		publish: false,
		microContextTags: ["bytove-domy", "rodinne-domy"]
	},
	{
		name: "Žebrák",
		slug: "zebrak",
		parentAreaSlug: "beroun",
		type: "obec",
		nearby: ["Hořovice", "Cerhovice", "Zdice", "Tlustice"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "dilny"]
	},
	{
		name: "Cerhovice",
		slug: "cerhovice",
		parentAreaSlug: "beroun",
		type: "obec",
		nearby: ["Žebrák", "Hořovice", "Tlustice", "Komárov"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "firmy"]
	},
	{
		name: "Komárov",
		slug: "komarov",
		parentAreaSlug: "beroun",
		type: "obec",
		nearby: ["Zdice", "Hořovice", "Tlustice", "Jince"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy", "dilny"]
	},
	{
		name: "Tlustice",
		slug: "tlustice",
		parentAreaSlug: "beroun",
		type: "obec",
		nearby: ["Hořovice", "Žebrák", "Cerhovice", "Komárov"],
		priority: 3,
		publish: false,
		microContextTags: ["rodinne-domy"]
	}
];

export const locationsByAreaSlug = new Map(
	Array.from(new Set(locations.map((l) => l.parentAreaSlug))).map((areaSlug) => [
		areaSlug,
		locations.filter((l) => l.parentAreaSlug === areaSlug)
	])
);

export const publishedLocations = locations.filter((l) => l.publish);

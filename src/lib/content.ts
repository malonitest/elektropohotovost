import type { Area } from "../data/areas";
import type { Location } from "../data/locations";
import { defaultResponseTimeText } from "../data/site";
import { pickVariant } from "./hash";

export type FaqItem = { question: string; answer: string };

export type PageCopy = {
	h1: string;
	tldr: string;
	serviceDescription: string;
	localContext: string;
	typicalInterventions: string[];
	whyUs: string[];
	faq: FaqItem[];
};

const typicalInterventionsBase = [
	"výpadek elektřiny",
	"shozený jistič",
	"zkrat v elektroinstalaci",
	"porucha rozvaděče",
	"přehřáté zásuvky",
	"jiskření nebo zápach z elektro",
	"nefunkční světla / okruhy"
] as const;

const whyUsBase = [
	"nonstop dostupnost",
	"rychlý dojezd",
	"odborní elektrikáři",
	"férové ceny",
	"doklad o provedení práce"
] as const;

function countWords(text: string): number {
	return text.trim().split(/\s+/).filter(Boolean).length;
}

function ensureWordRange(text: string, min: number, max: number): string {
	const words = countWords(text);
	if (words >= min && words <= max) return text;
	// jednoduché zkrácení bez zásahů do významu
	if (words > max) {
		return text.split(/(?<=[.!?])\s+/).slice(0, 3).join(" ").trim();
	}
	// pokud je kratší, přidej jednu větu s neutrálním kontextem
	return `${text} Pracujeme systematicky: nejdřív bezpečně odpojíme problémový okruh a až potom hledáme příčinu závady.`;
}

function tldrForPlace(placeName: string, placeKey: string, type: "area" | "obec" | "mestska-cast"): string {
	const first = pickVariant(placeKey, [
		`Řešíme havarijní poruchy elektroinstalace v lokalitě ${placeName} – výpadky proudu, zkraty a závady rozvaděče.`,
		`Nonstop elektro pohotovost pro ${placeName}: výjezdy k výpadkům elektřiny, shozeným jističům a zkratům.`,
		`Elektro pohotovost v ${placeName} pro byty, domy i firmy – řešíme výpadky, zkraty a poruchy rozvaděče.`
	] as const);

	const secondByType: Record<typeof type, string> = {
		area: `${defaultResponseTimeText} K dispozici jsme nonstop 24/7.`,
		obec: `${defaultResponseTimeText} K dispozici jsme nonstop 24/7.`,
		"mestska-cast": `${defaultResponseTimeText} K dispozici jsme nonstop 24/7.`
	};

	return `${first} ${secondByType[type]}`;
}

function serviceDescriptionForLocation(location: Location, area: Area): string {
	const common = pickVariant(location.slug + "-svc", [
		`Pomáháme při náhlých poruchách elektro v ${location.name} a v rámci oblasti ${area.name}. Diagnostikujeme závadu, zajistíme bezpečné vypnutí okruhu a provedeme opravu nebo provizorní zajištění, pokud je potřeba další materiál.`,
		`V ${location.name} řešíme havarijní opravy elektroinstalace pro domácnosti i firmy v rámci oblasti ${area.name}. Přijedeme na místo, ověříme stav jištění a rozvaděče a navrhneme nejrychlejší bezpečné řešení.`
	] as const);

	const byType =
		location.type === "obec"
			? pickVariant(location.slug + "-type", [
				"Typicky zasahujeme v rodinných domech (rozvaděč, jističe, zásuvkové okruhy), u přípojek a také v garážích nebo dílnách.",
				"Často řešíme závady v rodinných domech a menších provozech – od shozených jističů po lokální zkraty ve starších i novějších rozvodech."
			] as const)
			: pickVariant(location.slug + "-type", [
				"U městských částí se nejčastěji setkáváme s poruchami v bytových domech – bytové jističe, společné prostory, sklepy, osvětlení chodeb a problémové zásuvkové okruhy.",
				"V bytové zástavbě řešíme shozené jističe, přehřáté zásuvky a závady ve společných prostorech (chodby, sklepy, technické místnosti)."
			] as const);

	const combined = `${common} ${byType}`;
	return ensureWordRange(combined, 80, 140);
}

function localContextForLocation(location: Location): string {
	const tags = new Set(location.microContextTags ?? []);
	const base =
		location.type === "obec"
			? pickVariant(location.slug + "-ctx", [
				"Na místě kontrolujeme rozvaděč a jištění, změříme základní hodnoty a hledáme příčinu poruchy tak, aby bylo možné bezpečně obnovit provoz domácnosti.",
				"U domů a menších objektů je klíčové rychle odlišit závadu v okruhu od problému na spotřebiči. Postupujeme tak, abychom minimalizovali riziko dalšího přehřátí vodičů nebo zásuvek."
			] as const)
			: pickVariant(location.slug + "-ctx", [
				"V bytových domech často řešíme kombinaci bytových okruhů a společných rozvodů. Zaměříme se na jištění, svorkovnice a problematické okruhy tak, aby byla oprava bezpečná i pro ostatní byty.",
				"U bytů a společných prostor je důležité rychle zjistit, zda jde o problém v bytové části, na společném rozvaděči nebo na konkrétním okruhu. Kontrolu děláme s důrazem na bezpečnost a dokumentaci zásahu."
			] as const);

	const extras: string[] = [];
	if (tags.has("novostavby") || tags.has("pripojky")) {
		extras.push(
			"U novějších rozvodů často kontrolujeme také proudové chrániče a selektivitu jištění, aby se závada neopakovala."
		);
	}
	if (tags.has("prumysl") || tags.has("kancelare") || tags.has("provozovny") || tags.has("firmy")) {
		extras.push(
			"U firem a provozů se snažíme obnovit napájení prioritních okruhů co nejdřív a řešení navrhnout tak, aby bylo provozně udržitelné."
		);
	}
	if (tags.has("chaty")) {
		extras.push(
			"U rekreačních objektů a chat se zaměřujeme i na vlhkostní a mechanické příčiny závad, které se projevují nárazově."
		);
	}

	const extra = extras.length ? " " + extras.join(" ") : "";
	return `${base}${extra}`;
}

function faqForLocation(location: Location): FaqItem[] {
	const common: FaqItem[] = [
		{
			question: "Jak rychle dorazíte?",
			answer: defaultResponseTimeText
		},
		{
			question: "Fungujete i o víkendech a svátcích?",
			answer: "Ano. Pohotovost držíme nonstop 24/7, včetně víkendů a svátků."
		},
		{
			question: "Řešíte i drobné opravy?",
			answer:
				"Ano, pokud jde o bezpečnost nebo funkčnost (jističe, zásuvky, světla, rozvaděč). U neurgentních věcí navrhneme termín." 
		}
	];

	const uniqueByType: Record<Location["type"], FaqItem[]> = {
		obec: [
			{
				question: "Pomůžete i s poruchou v rodinném domě nebo v garáži?",
				answer:
					"Ano. Zasahujeme v rodinných domech, garážích i dílnách. Závadu nejdřív bezpečně odpojíme a pak opravíme nebo zajistíme." 
			},
			{
				question: "Řešíte i problémy na venkovních okruzích (zahrada, brána)?",
				answer:
					"Ano, pokud je závada v elektroinstalaci nebo jištění. U zařízení ověříme, zda není problém přímo na spotřebiči nebo pohonu." 
			}
		],
		"mestska-cast": [
			{
				question: "Zasahujete i v bytových domech a společných prostorech?",
				answer:
					"Ano. Řešíme závady v bytech i ve společných prostorech (chodby, sklepy, technické místnosti) včetně rozvaděčů." 
			},
			{
				question: "Co když nejde elektřina jen v jednom bytě?",
				answer:
					"Nejčastěji jde o problém v bytovém rozvaděči, jističích nebo konkrétním okruhu. Provedeme diagnostiku a navrhneme bezpečné řešení." 
			}
		]
	};

	const pricingVariant: FaqItem = pickVariant(location.slug + "-price", [
		{
			question: "Jaká je cena výjezdu?",
			answer:
				"Cena závisí na čase, náročnosti diagnostiky a rozsahu opravy. Vždy řekneme orientační cenu před zahájením práce." 
		},
		{
			question: "Platí se diagnostika i když se závada neprojeví?",
			answer:
				"Ano, účtuje se výjezd a čas na diagnostiku. Pokud závadu nelze hned odstranit, domluvíme další postup a rozsah práce." 
		}
	] as const);

	return [...common, ...uniqueByType[location.type], pricingVariant].slice(0, 5);
}

export function buildLocationCopy(location: Location, area: Area): PageCopy {
	return {
		h1: `Elektro pohotovost ${location.name} – elektrikář nonstop 24/7`,
		tldr: tldrForPlace(location.name, location.slug, location.type),
		serviceDescription: serviceDescriptionForLocation(location, area),
		localContext: localContextForLocation(location),
		typicalInterventions: Array.from(typicalInterventionsBase).slice(0, 7),
		whyUs: Array.from(whyUsBase),
		faq: faqForLocation(location)
	};
}

export function buildAreaCopy(area: Area): PageCopy {
	const h1 = `Elektro pohotovost ${area.name} – elektrikář nonstop 24/7`;
	const tldr = tldrForPlace(area.name, area.slug, "area");
	const serviceDescription = ensureWordRange(
		pickVariant(area.slug + "-svc", [
			`V oblasti ${area.name} zajišťujeme havarijní zásahy na elektroinstalaci pro byty, rodinné domy i firmy. Řešíme výpadky proudu, shozené jističe, zkraty a poruchy rozvaděče – s důrazem na bezpečné obnovení provozu.`,
			`Elektro pohotovost pro ${area.name} je určená pro situace, kdy nejde elektřina, opakovaně padá jistič nebo se objeví známky přehřívání (zásuvky, rozvaděč). Přijedeme, provedeme diagnostiku a navrhneme nejrychlejší bezpečný postup.`
		] as const),
		80,
		140
	);

	const localContext = pickVariant(area.slug + "-ctx", [
		"Pokrýváme výjezdy v rámci celé oblasti. Pokud je potřeba, domluvíme i následnou dokončovací práci (výměna prvků, úpravy okruhů, doplnění jištění) v samostatném termínu.",
		"Při havárii nejdřív řešíme bezpečnost a obnovení provozu. Následně vysvětlíme příčinu závady a doporučíme další kroky, aby se problém neopakoval."
	] as const);

	const faq: FaqItem[] = [
		{
			question: "Jak rychle dorazíte v rámci oblasti?",
			answer: defaultResponseTimeText
		},
		{
			question: "Fungujete nonstop 24/7?",
			answer: "Ano, pohotovost držíme nonstop 24/7."
		},
		{
			question: "Zasahujete v bytech, domech i firmách?",
			answer:
				"Ano. Zajišťujeme výjezdy k haváriím pro domácnosti i firmy, včetně řešení poruch rozvaděčů a jištění." 
		},
		{
			question: "Jak probíhá zásah při výpadku elektřiny?",
			answer:
				"Nejprve ověříme stav jištění a základní příčinu výpadku. Poté závadu odstraníme nebo bezpečně zajistíme do doby definitivní opravy." 
		},
		{
			question: "Jaká je cena výjezdu?",
			answer:
				"Cena se odvíjí od času, náročnosti diagnostiky a rozsahu opravy. Před zahájením práce vždy sdělíme orientační cenu." 
		}
	];

	return {
		h1,
		tldr,
		serviceDescription,
		localContext,
		typicalInterventions: Array.from(typicalInterventionsBase).slice(0, 7),
		whyUs: Array.from(whyUsBase),
		faq
	};
}

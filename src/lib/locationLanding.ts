import { pickVariant } from "./hash";
import type { FaqItem } from "./content";
import type { Location } from "../../data/locations";

export type LocationLandingContent = {
	heroKicker: string;
	heroTitle: string;
	heroLead: string;
	localPresence: {
		title: string;
		description: string;
	};
	safetyTitle: string;
	safetyBody: string;
	services: ReadonlyArray<string>;
	typicalFaults: ReadonlyArray<string>;
	availability: {
		responseTime: string;
		coveredPartsTitle: string;
		coveredParts: ReadonlyArray<string>;
	};
	pricing: {
		callout: string;
		rows: Array<{ label: string; range: string; note?: string }>;
	};
	whyUs: ReadonlyArray<string>;
	faq: FaqItem[];
	distributors: Array<{ name: string; phone: string; whenToCall: string }>;
	mapQuery: string;
};

function unique<T>(arr: T[]): T[] {
	return Array.from(new Set(arr));
}

export function buildLocationLandingContent(params: {
	location: Location;
	nearby: Array<{ slug: string; name: string }>;
	phoneDisplay: string;
}): LocationLandingContent {
	const { location, nearby, phoneDisplay } = params;

	const heroKicker = pickVariant(location.slug + ":kicker", [
		"Havarijní elektrikář NONSTOP 24/7",
		"Elektro pohotovost – rychlá pomoc",
		"Rychlý zásah • bezpečný postup"
	] as const);

	const heroTitle = `Elektro pohotovost ${location.name}`;

	const heroLead = pickVariant(location.slug + ":lead", [
		`Když nejde elektřina, padá jistič nebo je cítit spálenina, volejte. V ${location.name} řešíme havárie elektroinstalace pro byty, domy i firmy – bezpečně a s jasnou domluvou.`,
		`Nonstop servis pro ${location.name}: výpadky proudu, zkraty, chrániče a rozvaděče. Nejdřív stabilizujeme situaci, pak dohledáme příčinu a navrhneme nejlepší bezpečné řešení.`,
		`Elektro pohotovost v ${location.name} je pro situace, které nesnesou čekání. Pomůžeme rychle – a hlavně bezpečně – bez práce pod napětím a bez zbytečných slibů.`
	] as const);

	const localPresence = {
		title: `Působíme v ${location.name}`,
		description: pickVariant(location.slug + ":presence", [
			`Elektro pohotovost v ${location.name} zajišťujeme každý den v roce, 24 hodin denně. Jsme místní elektrikáři, kteří znají specifika zdejších domů a bytů – od starších objektů až po moderní novostavby.`,
			`V ${location.name} poskytujeme nonstop elektro pohotovost s rychlým příjezdem. Máme zkušenosti s různými typy objektů v této lokalitě – od rodinných domů přes bytové domy až po komerční prostory.`,
			`Naše elektro pohotovost pokrývá ${location.name} a nejbližší okolí s dostupností 24/7. Znalost místních podmínek a rychlá reakce nám umožňují efektivně řešit i náročné havarijní situace.`
		] as const)
	};

	const safetyTitle = "Bezpečnost na prvním místě";
	const safetyBody =
		"Pokud je cítit zápach spáleniny, něco praská, jiskří nebo se přehřívá zásuvka/rozvaděč, nemanipulujte se zařízením. Je-li to bezpečné, vypněte jistič postiženého okruhu a volejte. V případě kouře/požáru volejte 150/112.";

	const services = [
		"výpadek elektřiny (byt/dům/část objektu)",
		"shozený jistič nebo vybavený proudový chránič",
		"zkrat v okruhu, vyhořelá zásuvka, přehřáté svorky",
		"porucha rozvaděče a jištění",
		"nefunkční světla / zásuvkové okruhy",
		"závada na spotřebiči (odlišení od poruchy instalace)"
	];

	const typicalFaults = pickVariant(location.slug + ":faults", [
		[
			"opakovaně vypadává jistič po zapnutí zátěže",
			"nejde elektřina jen v části bytu/domu",
			"chránič padá hned po nahození",
			"zásuvka je teplá, jiskří nebo zapáchá",
			"světla blikají / nejdou některé okruhy",
			"podezření na zkrat v kabelu nebo krabici"
		],
		[
			"náhlý výpadek proudu bez zjevné příčiny",
			"padá jistič při zapnutí spotřebiče",
			"v rozvaděči je cítit teplo nebo zápach",
			"zásuvka/vypínač praská nebo je nestabilní",
			"kolísání napětí / blikání světel",
			"porucha okruhu v kuchyni/koupelně"
		]
	] as const);

	const coveredParts = unique([
		location.name,
		...nearby.slice(0, 6).map((n) => n.name)
	]);

	const availability = {
		responseTime: pickVariant(location.slug + ":eta", [
			"Orientační dojezd obvykle v řádu desítek minut (dle dopravy a vytížení).",
			"Dostupnost 24/7 – konkrétní dojezd upřesníme po telefonu podle provozu.",
			"Nejrychlejší je zavolat: řekneme aktuální možnosti a čas příjezdu."
		] as const),
		coveredPartsTitle: "Pokryté části a okolí",
		coveredParts
	};

	const pricing = {
		callout:
			"Ceník berte jako orientační rozsahy. Přesnou cenu upřesníme před zahájením práce podle situace, času a náročnosti.",
		rows: [
			{ label: "Výjezd + diagnostika", range: "2 500–3 500 Kč" },
			{ label: "Práce elektrikáře", range: "700–1 300 Kč / hod" },
			{ label: "Drobný materiál", range: "dle potřeby", note: "vždy po odsouhlasení" }
		]
	};

	const whyUs = [
		"certifikace a práce dle norem (dle typu zásahu)",
		"pojištění odpovědnosti (na vyžádání doložíme)",
		"zkušenost s bytovými domy, RD i provozy",
		"bezpečný postup: nejdřív stabilizace, pak řešení příčiny",
		"transparentní domluva rozsahu a orientační ceny"
	];

	const faq: FaqItem[] = [
		{
			question: `Jak rychle přijedete do ${location.name}?`,
			answer:
				"Dojezd závisí na dopravě a vytížení. Typicky jde o desítky minut; konkrétní odhad řekneme po telefonu podle aktuálního provozu."
		},
		{
			question: "Fungujete nonstop 24/7?",
			answer: "Ano, pohotovost držíme nonstop 24/7, včetně víkendů a svátků."
		},
		{
			question: "Co mám udělat jako první při výpadku elektřiny?",
			answer:
				"Ověřte, zda nejde o výpadek v domě/okolí. Pokud padá jistič nebo chránič, nenahezujte opakovaně. Odpojte zátěž (spotřebiče) a zavolejte – poradíme bezpečný postup."
		},
		{
			question: "Proč padá proudový chránič hned po nahození?",
			answer:
				"Často jde o závadu v okruhu, v připojeném spotřebiči nebo o vlhkost/poškození izolace. Na místě postupně oddělíme okruhy a příčinu dohledáme."
		},
		{
			question: "Řešíte i přehřáté zásuvky nebo zápach z elektro?",
			answer:
				"Ano. To jsou typické havarijní situace – může jít o povolené svorky, přetížený okruh nebo poškozenou zásuvku. Doporučujeme okruh vypnout a zavolat."
		},
		{
			question: "Kolik stojí výjezd?",
			answer:
				"Cena se liší podle času a situace. Orientačně výjezd + diagnostika 2 500–3 500 Kč. Před zahájením práce vždy sdělíme odhad a domluvíme postup."
		},
		{
			question: "Uděláte opravu hned na místě?",
			answer:
				"U řady závad ano (např. vadný prvek, přehřáté svorky, lokální zkrat). Pokud je potřeba rozsáhlejší oprava nebo materiál, instalaci bezpečně zajistíme a domluvíme další krok."
		},
		{
			question: "Kdy mám volat distributora místo elektrikáře?",
			answer:
				"Když je výpadek v celé ulici, hoří/poškozená přípojka, problém je před hlavním jističem nebo na elektroměru/pojistkové skříni distributora. V ostatních případech (rozvaděč v bytě, okruhy, zásuvky) je typicky na místě elektrikář."
		}
	];

	const distributors = [
		{
			name: "PREdistribuce",
			phone: "1236",
			whenToCall:
				"Praha: výpadek v síti, závada na přípojce nebo před hlavním jištěním/elektroměrem distributora."
		},
		{
			name: "ČEZ Distribuce",
			phone: "800 850 860",
			whenToCall:
				"Výpadek v síti, spadlý vodič, poškozené zařízení distribuční soustavy, závada před hlavním jističem."
		},
		{
			name: "EG.D (E.ON Distribuce)",
			phone: "800 22 55 77",
			whenToCall:
				"Výpadek v síti nebo závada na zařízení distributora (přípojka, vedení, elektroměr)."
		}
	];

	return {
		heroKicker,
		heroTitle,
		heroLead,
		localPresence,
		safetyTitle,
		safetyBody,
		services,
		typicalFaults,
		availability,
		pricing,
		whyUs,
		faq,
		distributors,
		mapQuery: `${location.name}, CZ`,
	};
}

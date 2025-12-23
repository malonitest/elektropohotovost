import type { Metadata } from "next";

import Card from "../../src/components/ui/Card";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import Section from "../../src/components/ui/Section";
import JsonLd from "../../src/components/ui/JsonLd";

import { phone, serviceHours, siteName } from "../../src/data/site";
import { absoluteUrl } from "../../src/lib/urls";
import { buildBreadcrumbList, buildFaqPage, buildLocalBusiness, buildService } from "../../src/lib/jsonld";

export const dynamic = "error";

const placeName = "Praha-západ";
const urlPath = "/elektro-pohotovost-praha-zapad/";
const canonical = absoluteUrl(urlPath);

export const metadata: Metadata = {
	title: `Elektro pohotovost ${placeName} – elektrikář nonstop 24/7 | ${siteName}`,
	description:
		"Elektro pohotovost Praha-západ 24/7: výpadek elektřiny, shozený jistič, zkrat, rozvaděč. Dojezd obvykle 30–90 min dle dopravy. Volejte.",
	alternates: { canonical }
};

export default function ElektroPohotovostPrahaZapadPage() {
	const telHref = `tel:${String(phone || "").replace(/\s+/g, "")}`;

	const tldr =
		"Elektro pohotovost Praha-západ: havarijní elektrikář pro domy, byty i firmy. Řešíme výpadky proudu, zkraty a závady rozvaděče. Nonstop 24/7.";

	const copy = {
		description:
			"Zajišťujeme havarijní výjezdy k poruchám elektroinstalace v okrese Praha-západ. Pomůžeme při výpadku elektřiny, opakovaně shozeném jističi nebo chrániči, zkratu v okruhu i při závadách rozvaděče. Na místě nejdřív zajistíme bezpečný stav, uděláme diagnostiku a doporučíme nejrychlejší bezpečné řešení.",
		localContext:
			"V rodinných domech a menších provozech v Praze-západ často řešíme poruchy na zásuvkových okruzích, vadné spotřebiče, přehřáté svorky v rozvaděči a opakované vybavování chrániče. Postupujeme tak, abychom minimalizovali riziko dalšího přehřátí a závadu spolehlivě odlišili od problému na spotřebiči.",
		typicalInterventions: [
			"výpadek elektřiny (dům / část domu)",
			"shozený jistič nebo chránič",
			"zkrat v okruhu nebo zásuvce",
			"přehřívání zásuvek, svorek, rozvaděče",
			"porucha rozvaděče a jištění",
			"nefunkční světla / okruhy"
		],
		whyUs: [
			"nonstop dostupnost 24/7",
			"rychlá domluva a srozumitelný postup",
			"důraz na bezpečnost a diagnostiku",
			"cenový rozsah vždy upřesníme po telefonu",
			"doklad o provedení práce"
		]
	};

	const faq = [
		{
			question: "Jak rychle přijedete do obcí Praha-západ?",
			answer:
				"Dojezd závisí na konkrétní obci, dopravě a vytížení. V praxi často vychází přibližně 30–90 minut. Pro aktuální odhad zavolejte."
		},
		{
			question: "Řešíte i poruchy v rodinných domech a přípojkách?",
			answer:
				"Ano. Často zasahujeme v rodinných domech (rozvaděč, jištění, zásuvkové okruhy) a řešíme i závady, které se projeví na konkrétním okruhu nebo spotřebiči."
		},
		{
			question: "Co když padá proudový chránič hned po zapnutí?",
			answer:
				"Doporučujeme nechat okruh vypnutý a zavolat. Na místě zjistíme, zda jde o závadu v instalaci, problém ve spotřebiči nebo o chránič/jistič."
		},
		{
			question: "Jaké jsou orientační ceny?",
			answer:
				"Cenu upřesníme po telefonu podle situace a času. Orientačně: výjezd + diagnostika 1400–2900 Kč, práce 700–1300 Kč/h, materiál dle potřeby po odsouhlasení."
		}
	];

	const breadcrumbs = [
		{ name: "Domů", url: absoluteUrl("/") },
		{ name: `Elektro pohotovost ${placeName}`, url: canonical }
	];

	const business = buildLocalBusiness(canonical, placeName) as Record<string, unknown>;
	if (typeof business["@type"] === "string") business["@type"] = [business["@type"], "Electrician"];

	const service = {
		...buildService(canonical, placeName),
		keywords: ["elektro pohotovost", "havarijní elektrikář", "elektrikář nonstop", "24/7", placeName]
	};

	const jsonLdGraph = [
		business,
		service,
		buildBreadcrumbList(canonical, breadcrumbs),
		buildFaqPage(canonical, faq)
	];

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">Havarijní výjezdy k poruchám elektroinstalace</div>
					<h1 className="sectionTitle">Elektro pohotovost {placeName} – elektrikář nonstop 24/7</h1>
					<p className="sectionLead">{tldr}</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<PrimaryButton href={telHref}>Volejte ihned: {phone}</PrimaryButton>
						<a className="btnSecondary" href="/praha-zapad/">Oblast Praha-západ</a>
						<a className="btnSecondary" href="/porucha/">Typické poruchy</a>
					</div>
					<p className="mt-3 text-sm text-text-muted">
						Dostupnost {serviceHours}. Dojezd obvykle 30–90 min dle dopravy.
					</p>
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					<Card title="Nonstop 24/7">
						<p>Poradíme a domluvíme nejrychlejší bezpečný postup.</p>
					</Card>
					<Card title="Rodinné domy i firmy">
						<p>Často řešíme rozvaděče, jištění a zásuvkové okruhy.</p>
					</Card>
					<Card title="Diagnostika na místě">
						<p>Pomůžeme odlišit závadu v okruhu od problému spotřebiče.</p>
					</Card>
				</div>
			</section>

			<Section title="Jak pomáháme" lead="Havarijní výjezdy pro Praha-západ.">
				<div className="grid gap-4 lg:grid-cols-2">
					<Card title="Popis služby">
						<p className="mt-2">{copy.description}</p>
						<p className="mt-3">{copy.localContext}</p>
					</Card>
					<Card title="Typické zásahy">
						<ul className="mt-3 space-y-2 text-text-secondary">
							{copy.typicalInterventions.map((x) => (
								<li key={x}>{x}</li>
							))}
						</ul>
						<div className="mt-4">
							<h3>Proč my</h3>
							<ul className="mt-2 space-y-2 text-text-secondary">
								{copy.whyUs.map((x) => (
									<li key={x}>{x}</li>
								))}
							</ul>
						</div>
					</Card>
				</div>
			</Section>

			<Section title="Dostupnost a ceny">
				<div className="grid gap-4 lg:grid-cols-2">
					<Card title="Dostupnost a dojezd">
						<p className="mt-2">
							Přijímáme výjezdy {serviceHours}. Dojezd v okrese Praha-západ se typicky pohybuje kolem 30–90 minut podle dopravy a vytížení.
						</p>
						<p className="mt-3 text-sm text-text-muted">
							V akutních situacích (zápach, jiskření, horké zásuvky) doporučujeme vypnout jistič postiženého okruhu.
						</p>
					</Card>
					<Card title="Orientační ceny (rozsah)">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>Výjezd + diagnostika: 1400–2900 Kč</li>
							<li>Práce elektrikáře: 700–1300 Kč / hod</li>
							<li>Materiál: dle potřeby (po odsouhlasení)</li>
						</ul>
						<p className="mt-3 text-sm text-text-muted">Odhad ceny řekneme dopředu po telefonu a domluvíme postup.</p>
					</Card>
				</div>
			</Section>

			<Section title="Užitečné odkazy">
				<div className="flex flex-wrap gap-2">
					<a className="btnSecondary" href="/praha-zapad/">Oblast Praha-západ</a>
					<a className="btnSecondary" href="/elektro-pohotovost-praha/">Praha</a>
					<a className="btnSecondary" href="/porucha/">Typické poruchy</a>
				</div>
			</Section>

			<Section title="FAQ">
				<div className="card cardPad">
					{faq.map((it) => (
						<div key={it.question} className="faqItem">
							<div className="faqQuestion">{it.question}</div>
							<div className="faqAnswer">{it.answer}</div>
						</div>
					))}
				</div>
			</Section>
		</>
	);
}

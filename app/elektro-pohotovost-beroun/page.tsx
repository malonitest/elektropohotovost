import type { Metadata } from "next";

import Card from "../../src/components/ui/Card";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import Section from "../../src/components/ui/Section";
import JsonLd from "../../src/components/ui/JsonLd";

import { phone, serviceHours, siteName } from "../../src/data/site";
import { absoluteUrl } from "../../src/lib/urls";
import { buildBreadcrumbList, buildFaqPage, buildLocalBusiness, buildService } from "../../src/lib/jsonld";

export const dynamic = "error";

const placeName = "Beroun";
const urlPath = "/elektro-pohotovost-beroun/";
const canonical = absoluteUrl(urlPath);

export const metadata: Metadata = {
	title: `Elektro pohotovost ${placeName} – elektrikář nonstop 24/7 | ${siteName}`,
	description:
		"Elektro pohotovost Beroun 24/7: výpadek proudu, shozený jistič, zkrat, rozvaděč. Dojezd obvykle 30–90 min dle dopravy. Volejte ihned.",
	alternates: { canonical }
};

export default function ElektroPohotovostBerounPage() {
	const telHref = `tel:${String(phone || "").replace(/\s+/g, "")}`;

	const tldr =
		"Elektro pohotovost Beroun: havarijní elektrikář pro domácnosti i firmy. Diagnostika a bezpečné řešení poruch elektroinstalace. Nonstop 24/7.";

	const copy = {
		description:
			"V Berouně a okolí řešíme havarijní poruchy elektroinstalace: výpadek elektřiny, opakovaně shozený jistič, zkrat v okruhu, přehřáté zásuvky a závady rozvaděčů. Nejprve zajistíme bezpečné vypnutí problémového okruhu, provedeme diagnostiku a navrhneme řešení – opravu na místě nebo provizorní zajištění s domluvou dalšího kroku.",
		localContext:
			"U rodinných domů i menších provozů v okolí Berouna je časté, že porucha vznikne na konkrétním okruhu nebo spotřebiči. Postupujeme tak, abychom závadu rychle lokalizovali a předešli dalšímu přehřívání vodičů, svorek nebo zásuvek.",
		typicalInterventions: [
			"výpadek elektřiny",
			"padající jistič nebo chránič",
			"zkrat v elektroinstalaci",
			"porucha rozvaděče",
			"přehřáté zásuvky / zápach z elektro",
			"nefunkční světla / okruhy"
		],
		whyUs: [
			"nonstop dostupnost 24/7",
			"rychlá domluva postupu",
			"odborní elektrikáři",
			"férový rozsah cen dopředu",
			"doklad o provedení práce"
		]
	};

	const faq = [
		{
			question: "Jak rychle dorazíte do Berouna a okolí?",
			answer:
				"Dojezd závisí na dopravě a vytížení. V praxi často vychází přibližně 30–90 minut. Pro aktuální odhad zavolejte."
		},
		{
			question: "Zvládnete opravit poruchu hned na místě?",
			answer:
				"U řady závad ano (např. přehřáté svorky, vadný jistič, lokální zkrat). Pokud je potřeba více práce nebo materiálu, umíme instalaci provizorně zajistit a domluvit pokračování."
		},
		{
			question: "Můžu si jistič nahodit sám?",
			answer:
				"Pokud jistič okamžitě znovu padá, nenahazujte ho opakovaně. Může jít o zkrat nebo přehřívání. Nechte okruh vypnutý a zavolejte."
		},
		{
			question: "Jaké jsou orientační ceny výjezdu v Berouně?",
			answer:
				"Cenu upřesníme po telefonu podle situace. Orientačně: výjezd + diagnostika 1400–2900 Kč, práce 700–1300 Kč/h, materiál dle potřeby po odsouhlasení."
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
						<a className="btnSecondary" href="/beroun/">Oblast Beroun a okolí</a>
						<a className="btnSecondary" href="/porucha/">Typické poruchy</a>
					</div>
					<p className="mt-3 text-sm text-text-muted">
						Dostupnost {serviceHours}. Dojezd obvykle 30–90 min dle dopravy.
					</p>
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					<Card title="Nonstop 24/7">
						<p>Volejte kdykoliv – pomůžeme s prvním postupem.</p>
					</Card>
					<Card title="Rodinné domy i provozy">
						<p>Časté jsou lokální závady v okruhu nebo ve spotřebiči.</p>
					</Card>
					<Card title="Bezpečné zajištění">
						<p>Pokud nejde hned opravit, instalaci provizorně zajistíme.</p>
					</Card>
				</div>
			</section>

			<Section title="Jak pomáháme" lead="Havarijní elektro zásahy v Berouně a okolí.">
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
							Přijímáme havarijní výjezdy {serviceHours}. Dojezd v Berouně a okolí se obvykle pohybuje kolem 30–90 minut podle dopravy a vytížení.
						</p>
						<p className="mt-3 text-sm text-text-muted">V akutních situacích doporučujeme vypnout jistič postiženého okruhu a zavolat.</p>
					</Card>
					<Card title="Orientační ceny (rozsah)">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>Výjezd + diagnostika: 1400–2900 Kč</li>
							<li>Práce elektrikáře: 700–1300 Kč / hod</li>
							<li>Materiál: dle potřeby (po odsouhlasení)</li>
						</ul>
						<p className="mt-3 text-sm text-text-muted">Odhad ceny řekneme dopředu a potvrdíme na místě před zahájením práce.</p>
					</Card>
				</div>
			</Section>

			<Section title="Užitečné odkazy">
				<div className="flex flex-wrap gap-2">
					<a className="btnSecondary" href="/beroun/">Oblast Beroun a okolí</a>
					<a className="btnSecondary" href="/elektro-pohotovost-stredocesky-kraj-zapad/">Středočeský kraj (západ)</a>
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

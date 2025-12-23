import type { Metadata } from "next";

import Card from "../../src/components/ui/Card";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import Section from "../../src/components/ui/Section";
import JsonLd from "../../src/components/ui/JsonLd";

import { brandRegionText, phone, serviceHours, siteName } from "../../src/data/site";
import { absoluteUrl } from "../../src/lib/urls";
import { buildBreadcrumbList, buildFaqPage, buildLocalBusiness, buildService } from "../../src/lib/jsonld";

export const dynamic = "error";

const placeName = "Středočeský kraj (západ)";
const urlPath = "/elektro-pohotovost-stredocesky-kraj-zapad/";
const canonical = absoluteUrl(urlPath);

export const metadata: Metadata = {
	title: `Elektro pohotovost ${placeName} – elektrikář nonstop 24/7 | ${siteName}`,
	description:
		"Elektro pohotovost ve Středočeském kraji (západ) 24/7: výpadek elektřiny, jistič, zkrat, rozvaděč. Dojezd obvykle 30–90 min dle dopravy. Volejte.",
	alternates: { canonical }
};

export default function ElektroPohotovostStredoceskyZapadPage() {
	const telHref = `tel:${String(phone || "").replace(/\s+/g, "")}`;

	const tldr =
		"Elektro pohotovost pro západní část Středočeského kraje: havarijní výjezdy k poruchám elektroinstalace v domácnostech i firmách. Nonstop 24/7.";

	const copy = {
		description:
			"Zajišťujeme havarijní zásahy při poruchách elektroinstalace v západní části Středočeského kraje. Pomůžeme při výpadku elektřiny, shozených jističích, zkratech v okruzích, přehřívání zásuvek a závadách rozvaděčů. Na místě postupujeme bezpečně: nejdřív odpojíme problémový okruh, uděláme diagnostiku a navrhneme řešení s jasnou domluvou.",
		localContext: `Nejčastěji vyjíždíme v regionu: ${brandRegionText}. Dojezd se vždy odvíjí od dopravy a vytížení; v akutních případech doporučujeme telefonický kontakt.`,
		typicalInterventions: [
			"výpadek elektřiny",
			"padající jistič nebo chránič",
			"zkrat v okruhu",
			"porucha rozvaděče",
			"přehřáté zásuvky / zápach z elektro",
			"nefunkční světla / okruhy"
		],
		whyUs: [
			"nonstop dostupnost 24/7",
			"rychlá domluva a přehledný postup",
			"bezpečnost na prvním místě",
			"transparentní cenový rozsah",
			"doklad o provedení práce"
		]
	};

	const faq = [
		{
			question: "Které oblasti v západní části kraje pokrýváte?",
			answer:
				"Primárně vyjíždíme v regionu Praha-západ, západní Praha, Beroun a okolí. Pokud jste kousek mimo, zavolejte a řekneme aktuální možnosti."
		},
		{
			question: "Jak rychle můžete dorazit?",
			answer:
				"Dojezd se odvíjí od dopravy a vytížení. Typicky to vychází přibližně 30–90 minut. Pro aktuální odhad je nejlepší zavolat."
		},
		{
			question: "Řešíte i poruchy u firem a provozoven?",
			answer:
				"Ano. U firem se snažíme co nejdřív obnovit napájení prioritních okruhů a navrhnout bezpečné řešení s ohledem na provoz."
		},
		{
			question: "Jaké jsou orientační ceny?",
			answer:
				"Cenu vždy upřesníme po telefonu dle situace. Orientačně: výjezd + diagnostika 1400–2900 Kč, práce 700–1300 Kč/h, materiál dle potřeby po odsouhlasení."
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
		keywords: [
			"elektro pohotovost",
			"havarijní elektrikář",
			"elektrikář nonstop",
			"24/7",
			"Středočeský kraj",
			"západ"
		]
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
					<h1 className="sectionTitle">Elektro pohotovost – {placeName} (elektrikář 24/7)</h1>
					<p className="sectionLead">{tldr}</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<PrimaryButton href={telHref}>Volejte ihned: {phone}</PrimaryButton>
						<a className="btnSecondary" href="/porucha/">Typické poruchy</a>
					</div>
					<p className="mt-3 text-sm text-text-muted">
						Dostupnost {serviceHours}. Dojezd obvykle 30–90 min dle dopravy.
					</p>
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					<Card title="Nonstop 24/7">
						<p>Výjezdy pro domácnosti i firmy.</p>
					</Card>
					<Card title="Bezpečnost">
						<p>Při zápachu, jiskření nebo přehřívání doporučujeme odpojit okruh a volat.</p>
					</Card>
					<Card title="Rozvaděče a jištění">
						<p>Diagnostika závad v okruzích a rozvaděčích.</p>
					</Card>
				</div>
			</section>

			<Section title="Jak pomáháme" lead="Havarijní zásahy pro západní část Středočeského kraje.">
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
							Přijímáme havarijní výjezdy {serviceHours}. Dojezd se typicky pohybuje kolem 30–90 minut podle dopravy a vytížení.
						</p>
						<p className="mt-3 text-sm text-text-muted">
							Pokud je cítit zápach z elektro nebo je něco horké na dotek, vypněte jistič okruhu a zavolejte.
						</p>
					</Card>
					<Card title="Orientační ceny (rozsah)">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>Výjezd + diagnostika: 1400–2900 Kč</li>
							<li>Práce elektrikáře: 700–1300 Kč / hod</li>
							<li>Materiál: dle potřeby (po odsouhlasení)</li>
						</ul>
						<p className="mt-3 text-sm text-text-muted">Konkrétní cenu potvrdíme po telefonu a domluvíme postup.</p>
					</Card>
				</div>
			</Section>

			<Section title="Rychlé odkazy">
				<div className="flex flex-wrap gap-2">
					<a className="btnSecondary" href="/elektro-pohotovost-praha/">Praha</a>
					<a className="btnSecondary" href="/elektro-pohotovost-praha-zapad/">Praha-západ</a>
					<a className="btnSecondary" href="/elektro-pohotovost-beroun/">Beroun</a>
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

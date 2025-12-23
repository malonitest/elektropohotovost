import type { Metadata } from "next";

import Card from "../../src/components/ui/Card";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import Section from "../../src/components/ui/Section";
import JsonLd from "../../src/components/ui/JsonLd";

import { phone, serviceHours, siteName } from "../../src/data/site";
import { absoluteUrl } from "../../src/lib/urls";
import { buildBreadcrumbList, buildFaqPage, buildLocalBusiness, buildService } from "../../src/lib/jsonld";

export const dynamic = "error";

const placeName = "Praha";
const urlPath = "/elektro-pohotovost-praha/";
const canonical = absoluteUrl(urlPath);

export const metadata: Metadata = {
	title: `Elektro pohotovost ${placeName} – elektrikář nonstop 24/7 | ${siteName}`,
	description:
		"Havarijní elektrikář 24/7 v Praze: výpadek elektřiny, shozený jistič, zkrat, rozvaděč. Dojezd obvykle 30–90 min dle dopravy. Volejte ihned.",
	alternates: { canonical }
};

export default function ElektroPohotovostPrahaPage() {
	const telHref = `tel:${String(phone || "").replace(/\s+/g, "")}`;

	const tldr =
		"Elektro pohotovost Praha: havarijní výjezdy k poruchám elektroinstalace pro byty, domy i firmy. Postupujeme bezpečně a s jasnou domluvou. Nonstop 24/7.";

	const copy = {
		description:
			"Pomáháme při náhlých poruchách elektroinstalace v Praze – výpadek elektřiny, shozený jistič, zkrat v okruhu, přehřívající zásuvky a závady rozvaděče. Nejprve zajistíme bezpečný stav (odpojení problémového okruhu), provedeme diagnostiku a navrhneme nejrychlejší bezpečné řešení. Pokud je potřeba další materiál nebo delší práce, domluvíme provizorní zajištění a další krok.",
		localContext:
			"V Praze se často potkáváme s poruchami v bytových domech i kancelářích. Důležité je rychle rozlišit, zda jde o závadu na konkrétním okruhu, na spotřebiči, nebo ve společném rozvaděči. Postupujeme systematicky a bez zbytečných slibů.",
		typicalInterventions: [
			"výpadek elektřiny (část bytu / celý byt)",
			"opakovaně padající jistič nebo chránič",
			"zkrat v zásuvkovém nebo světelném okruhu",
			"jiskření, zápach z elektro, horká zásuvka",
			"porucha rozvaděče (bytový / domovní)",
			"nefunkční světla / okruhy"
		],
		whyUs: [
			"nonstop dostupnost 24/7",
			"důraz na bezpečnost a jasnou domluvu",
			"odborná diagnostika na místě",
			"cenový rozsah vždy dopředu po telefonu",
			"doklad o provedení práce"
		]
	};

	const faq = [
		{
			question: "Jak rychle můžete přijet v Praze?",
			answer:
				"V Praze se dojezd odvíjí od dopravy a vytížení. V praxi to často vychází přibližně 30–90 minut. Pro aktuální odhad je nejlepší zavolat."
		},
		{
			question: "Co mám udělat hned, když cítím zápach nebo vidím jiskření?",
			answer:
				"Pokud je to bezpečné, vypněte jistič příslušného okruhu (nebo hlavní jistič), nepoužívejte postiženou zásuvku a zavolejte. V případě viditelného kouře nebo požáru volejte 150/112."
		},
		{
			question: "Řešíte i shozený proudový chránič?",
			answer:
				"Ano. Na místě ověříme, zda jde o závadu v okruhu, na spotřebiči, nebo o problém s chráničem/jističem. Postup je vždy s důrazem na bezpečné obnovení provozu."
		},
		{
			question: "Kolik stojí výjezd a oprava v Praze?",
			answer:
				"Cenu vždy upřesníme po telefonu podle situace a času. Orientačně: výjezd + diagnostika 1400–2900 Kč, práce 700–1300 Kč/h, drobný materiál dle potřeby."
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
						<a className="btnSecondary" href="/porucha/">Typické poruchy</a>
					</div>
					<p className="mt-3 text-sm text-text-muted">
						Dostupnost {serviceHours}. Dojezd obvykle 30–90 min dle dopravy.
					</p>
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					<Card title="Nonstop 24/7">
						<p>Volejte kdykoliv – poradíme po telefonu a domluvíme postup.</p>
					</Card>
					<Card title="Bezpečný postup">
						<p>Nejdřív zajistíme bezpečný stav a pak řešíme závadu.</p>
					</Card>
					<Card title="Rozvaděče, jističe, zkraty">
						<p>Typické situace řešíme diagnostikou na místě.</p>
					</Card>
				</div>
			</section>

			<Section title="Jak pomáháme" lead="Rychlé řešení havárií elektro v Praze.">
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
							Přijímáme havarijní výjezdy {serviceHours}. V Praze se dojezd typicky pohybuje kolem 30–90 minut podle dopravy a vytížení.
						</p>
						<p className="mt-3 text-sm text-text-muted">
							Pokud je cítit zápach z elektro nebo je zásuvka horká, doporučujeme vypnout jistič daného okruhu a zavolat.
						</p>
					</Card>
					<Card title="Orientační ceny (rozsah)">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>Výjezd + diagnostika: 1400–2900 Kč</li>
							<li>Práce elektrikáře: 700–1300 Kč / hod</li>
							<li>Materiál: dle potřeby (vždy po odsouhlasení)</li>
						</ul>
						<p className="mt-3 text-sm text-text-muted">
							Konečná cena závisí na závadě, přístupu a času. Předem řekneme odhad a domluvíme postup.
						</p>
					</Card>
				</div>
			</Section>

			<Section title="Kde ještě vyjíždíme" lead="Pokud nejste přímo v Praze, mrkněte i na okolní oblasti.">
				<div className="flex flex-wrap gap-2">
					<a className="btnSecondary" href="/elektro-pohotovost-praha-zapad/">Praha-západ</a>
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

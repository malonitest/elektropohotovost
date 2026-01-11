import type { Metadata } from "next";

import JsonLd from "../../../src/components/ui/JsonLd";
import Card from "../../../src/components/ui/Card";
import PrimaryButton from "../../../src/components/ui/PrimaryButton";
import { ServiceHero, ServicePriceBox, ServiceFAQ } from "../../../src/components/services";

import { brandRegionText, phone, serviceHours, siteName } from "../../../src/data/site";
import { absoluteUrl } from "../../../src/lib/urls";
import { buildBreadcrumbList, buildLocalBusiness, buildService, buildWebPage } from "../../../src/lib/jsonld";

export const dynamic = "error";

const canonical = absoluteUrl("/sluzby/elektro-pohotovost/");

export const metadata: Metadata = {
	title: `Elektro pohotovost NONSTOP 24/7 | ${siteName}`,
	description:
		"Havarijní elektrikář NONSTOP 24/7. Řešíme výpadky elektřiny, zkraty, jističe/chrániče a poruchy rozvaděče. Dostupnost a cenu upřesníme po telefonu.",
	alternates: { canonical },
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	openGraph: {
		title: `Elektro pohotovost NONSTOP 24/7 | ${siteName}`,
		description:
			"Havarijní elektrikář NONSTOP 24/7. Výpadek proudu, zkrat, rozvaděč, jistič/chránič. Rychlá domluva po telefonu.",
		type: "website",
		url: canonical,
		images: [{
			url: "/og-images/services.svg",
			width: 1200,
			height: 630,
			alt: "Elektro pohotovost NONSTOP 24/7"
		}]
	},
	twitter: {
		card: "summary_large_image",
		title: `Elektro pohotovost NONSTOP 24/7 | ${siteName}`,
		description: "Havarijní elektrikář NONSTOP 24/7. Výpadek proudu, zkrat, rozvaděč, jistič/chránič.",
		images: ["/og-images/services.svg"]
	}
};

export default function ElektroPohotovostServicePage() {
	const tel = String(phone || "").replace(/\s+/g, "");
	const telHref = tel ? `tel:${tel}` : "/kontakt/";

	const breadcrumbs = [
		{ name: "Domů", url: absoluteUrl("/") },
		{ name: "Služby", url: absoluteUrl("/sluzby/") },
		{ name: "Elektro pohotovost", url: canonical }
	];

	const jsonLdGraph = [
		buildLocalBusiness(canonical, brandRegionText),
		buildService(canonical, "NONSTOP 24/7"),
		buildWebPage({
			url: canonical,
			name: "Elektro pohotovost NONSTOP 24/7",
			description:
				"Havarijní elektrikář NONSTOP 24/7 pro poruchy elektroinstalace. Výjezdy v regionu Praha-západ, západní Praha, Beroun a okolí."
		}),
		buildBreadcrumbList(
			canonical,
			breadcrumbs.map((b) => ({ ...b, url: b.url }))
		)
	];

	const faq = [
		{
			question: "Kdy je elektro pohotovost správná volba?",
			answer:
				"Když jde o havarijní stav: výpadek elektřiny, opakovaně padající jistič nebo chránič, jiskření, zápach z elektro, přehřívání zásuvky, porucha rozvaděče. V takových situacích je prioritou bezpečně stabilizovat stav a rychle obnovit provoz."
		},
		{
			question: "Je služba opravdu NONSTOP 24/7?",
			answer:
				"Ano, havarijní zásahy řešíme NONSTOP 24/7. Konkrétní dojezd vždy upřesníme po telefonu podle dopravy a vytížení."
		},
		{
			question: "Řešíte i výpadek jen v jednom bytě nebo okruhu?",
			answer:
				"Ano. Často jde o závadu na konkrétním okruhu, spotřebiči nebo jištění. Provedeme diagnostiku a navrhneme nejrychlejší bezpečné řešení."
		},
		{
			question: "Co mám udělat hned, když něco jiskří nebo je cítit zápach?",
			answer:
				"Pokud je to bezpečné, vypněte jistič postiženého okruhu (případně hlavní jistič), nechte zařízení bez napětí a zavolejte. Pokud je kouř nebo požár, volejte 150/112."
		},
		{
			question: "Děláte i běžné opravy mimo havárie?",
			answer:
				"Pro plánované práce máme samostatnou službu hodinový manžel. Elektro pohotovost je určená pro havárie a urgentní poruchy."
		},
		{
			question: "Kde všude vyjíždíte?",
			answer:
				"Primárně Praha-západ, západní Praha, Beroun a okolí. Detailní lokality najdete v seznamu lokalit; pro aktuální dojezd je nejlepší zavolat."
		}
	] as const;

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<ServiceHero
				kicker="Havarijní elektrikář"
				title="Elektro pohotovost – NONSTOP 24/7"
				lead="Rychlá domluva, bezpečný postup a transparentní komunikace. Řešíme havarijní poruchy elektroinstalace — výpadky elektřiny, zkraty, jističe/chrániče a rozvaděče."
				primaryCta={{ href: telHref, label: tel ? `Volejte: ${phone}` : "Kontakt" }}
				secondaryCta={{ href: "/lokality/", label: "Vybrat lokalitu" }}
				note={`Dostupnost: ${serviceHours}. Dojezd upřesníme po telefonu.`}
			/>

			<section className="section">
				<div className="grid gap-4 lg:grid-cols-2">
					<Card title="Co typicky řešíme (havárie)">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>výpadek elektřiny, nefunkční okruh</li>
							<li>padající jistič nebo proudový chránič</li>
							<li>zkrat v elektroinstalaci</li>
							<li>porucha rozvaděče</li>
							<li>přehřáté zásuvky, jiskření, zápach z elektro</li>
						</ul>
						<p className="mt-4 text-sm text-text-muted">
							Nejste si jistí, jestli jde o havárii? Zavolejte — během krátkého rozhovoru upřesníme rizika a další krok.
						</p>
					</Card>

					<Card title="Jemná poznámka ke službám">
						<p className="mt-2">
							Potřebujete plánovanou montáž nebo drobné opravy v domácnosti? Nabízíme i službu hodinový manžel — odděleně od havarijní elektro pohotovosti.
						</p>
						<p className="mt-4">
							<a className="btnSecondary" href="/sluzby/hodinovy-manzel/">
								Hodinový manžel
							</a>
						</p>
					</Card>
				</div>

				<div className="mt-6 grid gap-4 lg:grid-cols-2">
					<ServicePriceBox
						title="Orientační rozsahy (elektro pohotovost)"
						lead="Ceny potvrzujeme před zahájením práce. Záleží na čase zásahu, situaci a náročnosti diagnostiky."
						rows={[
							{ label: "Výjezd + diagnostika", value: "2 500–3 500 Kč" },
							{ label: "Práce elektrikáře", value: "700–1 300 Kč / hod" },
							{ label: "Materiál", value: "dle potřeby", note: "vždy po odsouhlasení" }
						]}
						disclaimer="Pokud situace vyžaduje dočasné zajištění, domluvíme postup tak, aby byl provoz co nejdřív bezpečný."
					/>

					<div className="card cardPad">
						<div className="text-base font-bold text-text-primary">Kontakt</div>
						<p className="mt-2">
							Pro dostupnost, dojezd a orientační cenu je nejrychlejší zavolat. Pokud je to bezpečné, připravte si informaci, co přesně se děje (jistič/chránič, zápach, které okruhy nejdou).
						</p>
						<div className="mt-4 flex flex-wrap gap-3">
							<PrimaryButton href={telHref}>{tel ? `Volejte: ${phone}` : "Kontakt"}</PrimaryButton>
							<a className="btnSecondary" href="/kontakt/">
								Kontaktní údaje
							</a>
						</div>
					</div>
				</div>
			</section>

			<ServiceFAQ
				canonical={canonical}
				title="FAQ k elektro pohotovosti"
				kicker="Praktické odpovědi"
				lead="Krátké odpovědi na typické situace. Pokud je stav akutní nebo si nejste jistí bezpečným krokem, zavolejte — upřesníme postup." 
				items={[...faq]}
			/>
		</>
	);
}

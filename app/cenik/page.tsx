import type { Metadata } from "next";

import Card from "../../src/components/ui/Card";
import JsonLd from "../../src/components/ui/JsonLd";

import { absoluteUrl } from "../../src/lib/urls";
import { graphForGenericPage } from "../../src/lib/jsonld";
import { brandRegionText, siteName } from "../../src/data/site";

export const dynamic = "error";

const canonical = absoluteUrl("/cenik/");

export const metadata: Metadata = {
	title: `Ceník | ${siteName}`,
	description:
		"Orientační ceník elektro pohotovosti 24/7: výjezd, diagnostika, hodinová práce a materiál. Přesnou cenu vždy potvrdíme před zahájením práce.",
	alternates: { canonical },
	openGraph: {
		title: `Ceník | ${siteName}`,
		description:
			"Orientační ceník elektro pohotovosti 24/7: výjezd, diagnostika, hodinová práce a materiál. Přesnou cenu vždy potvrdíme před zahájením práce.",
		type: "website",
		url: canonical
	}
};

export default function CenikPage() {
	const jsonLdGraph = graphForGenericPage({
		url: canonical,
		placeName: "Ceník",
		areaServedName: brandRegionText,
		breadcrumbs: [
			{ name: "Domů", url: absoluteUrl("/") },
			{ name: "Ceník", url: canonical }
		]
	});

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">Transparentní domluva</div>
					<h1 className="sectionTitle">Ceník (orientoční rozsahy)</h1>
					<p className="sectionLead">
						Rozsahy jsou orientační. Konkrétní cenu upřesníme po telefonu a potvrdíme na místě před zahájením práce.
					</p>
				</div>

				<div className="grid gap-4 lg:grid-cols-2">
					<Card title="Výjezd a diagnostika">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>
								<b className="text-text-primary">Výjezd + diagnostika:</b> 2 500–3 500 Kč
							</li>
							<li>
								<b className="text-text-primary">Práce elektrikáře:</b> 700–1 300 Kč / hod
							</li>
							<li>
								<b className="text-text-primary">Materiál:</b> dle potřeby (vždy po odsouhlasení)
							</li>
						</ul>
						<p className="mt-4 text-sm text-text-muted">
							Cena se odvíjí od času zásahu, náročnosti diagnostiky a rozsahu opravy.
						</p>
					</Card>

					<Card title="Co ovlivňuje cenu">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>čas (den/noc, víkend/svátek)</li>
							<li>přístup k rozvaděči / okruhu</li>
							<li>nutný materiál a dostupnost náhradních dílů</li>
							<li>zda jde o závadu v instalaci nebo ve spotřebiči</li>
						</ul>
						<p className="mt-4">
							<a className="btnPrimary" href="/kontakt/">Kontakt</a>
						</p>
					</Card>
				</div>
			</section>
		</>
	);
}

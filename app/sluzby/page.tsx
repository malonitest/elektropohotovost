import type { Metadata } from "next";

import Card from "../../src/components/ui/Card";
import JsonLd from "../../src/components/ui/JsonLd";

import { brandRegionText, siteName } from "../../src/data/site";
import { absoluteUrl } from "../../src/lib/urls";
import { graphForGenericPage } from "../../src/lib/jsonld";

export const dynamic = "error";

export const metadata: Metadata = {
	title: `Služby | ${siteName}`,
	description:
		"Nonstop elektro pohotovost 24/7: výpadek elektřiny, shozený jistič, zkrat, porucha rozvaděče. Výjezdy pro byty, domy i firmy.",
	alternates: { canonical: absoluteUrl("/sluzby/") }
};

export default function ServicesPage() {
	const canonical = absoluteUrl("/sluzby/");

	const jsonLdGraph = graphForGenericPage({
		url: canonical,
		placeName: "Elektro pohotovost",
		areaServedName: brandRegionText,
		breadcrumbs: [
			{ name: "Domů", url: absoluteUrl("/") },
			{ name: "Služby", url: canonical }
		]
	});

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">Elektrikář NONSTOP 24/7</div>
					<h1 className="sectionTitle">Elektro pohotovost – služby</h1>
					<p className="sectionLead">
						Havarijní výjezdy k poruchám elektroinstalace v domácnostech i firmách. Bez zbytečných slibů – dostupnost a cenu vždy upřesníme po telefonu.
					</p>
				</div>
				<div className="grid gap-4 lg:grid-cols-2">
					<Card title="Co typicky řešíme">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>výpadek elektřiny</li>
							<li>shozený jistič / vybavený proudový chránič</li>
							<li>zkrat v elektroinstalaci</li>
							<li>porucha rozvaděče</li>
							<li>přehřáté zásuvky, jiskření, zápach z elektro</li>
							<li>nefunkční světla / okruhy</li>
						</ul>
					</Card>
					<Card title="Jak postupujeme">
						<p className="mt-2">
							Nejprve zajistíme bezpečný stav (odpojení problémového okruhu), uděláme diagnostiku a navrhneme nejrychlejší bezpečné řešení.
							Pokud je potřeba další materiál, domluvíme provizorní zajištění a další krok.
						</p>
						<p className="mt-4">
							Působíme v regionu: <b className="text-text-primary">{brandRegionText}</b>. Přesný dojezd závisí na dopravě a vytížení.
						</p>
					</Card>
				</div>

				<div className="mt-8 card cardPad">
					<div className="text-base font-bold text-text-primary">Rychlé odkazy</div>
					<div className="mt-4 flex flex-wrap gap-3">
						<a className="btnPrimary" href="/kontakt/">Kontakt</a>
						<a className="btnSecondary" href="/lokality/">Lokality</a>
					</div>
				</div>
			</section>
		</>
	);
}

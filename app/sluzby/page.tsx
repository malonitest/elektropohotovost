import type { Metadata } from "next";

import JsonLd from "../../src/components/ui/JsonLd";
import Card from "../../src/components/ui/Card";
import PrimaryButton from "../../src/components/ui/PrimaryButton";

import { brandRegionText, siteName } from "../../src/data/site";
import { absoluteUrl } from "../../src/lib/urls";
import { buildBreadcrumbList, buildLocalBusiness, buildWebPage } from "../../src/lib/jsonld";

export const dynamic = "error";

export const metadata: Metadata = {
	title: `Služby | ${siteName}`,
	description:
		"Přehled služeb: elektro pohotovost NONSTOP 24/7 (havarijní zásahy) a hodinový manžel (plánované opravy a montáže). Přehledně, důvěryhodně, bez míchání služeb.",
	alternates: { canonical: absoluteUrl("/sluzby/") },
	openGraph: {
		type: "website",
		title: `Služby | ${siteName}`,
		description: "Přehled služeb: elektro pohotovost NONSTOP 24/7 (havarijní zásahy) a hodinový manžel (plánované opravy a montáže).",
		url: absoluteUrl("/sluzby/"),
		images: [{
			url: "/og-images/services.svg",
			width: 1200,
			height: 630,
			alt: "Služby - Elektro pohotovost 24/7 a Hodinový manžel"
		}]
	},
	twitter: {
		card: "summary_large_image",
		title: `Služby | ${siteName}`,
		description: "Přehled služeb: elektro pohotovost NONSTOP 24/7 (havarijní zásahy) a hodinový manžel (plánované opravy a montáže).",
		images: ["/og-images/services.svg"]
	}
};

export default function ServicesPage() {
	const canonical = absoluteUrl("/sluzby/");

	const breadcrumbs = [
		{ name: "Domů", url: absoluteUrl("/") },
		{ name: "Služby", url: canonical }
	];

	const jsonLdGraph = [
		buildLocalBusiness(canonical, brandRegionText),
		buildWebPage({
			url: canonical,
			name: "Služby",
			description:
				"Přehled služeb: elektro pohotovost NONSTOP 24/7 pro havárie a hodinový manžel pro plánované opravy a montáže."
		}),
		buildBreadcrumbList(
			canonical,
			breadcrumbs.map((b) => ({ ...b, url: b.url }))
		)
	];

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">Přehled</div>
					<h1 className="sectionTitle">Služby</h1>
					<p className="sectionLead">
						Elektro pohotovost je naše hlavní konverzní služba (havarijní zásahy NONSTOP 24/7). Hodinový manžel je samostatná, plánovaná služba pro běžné opravy a montáže.
					</p>
				</div>
				<div className="grid gap-4 lg:grid-cols-2">
					<Card title="Elektro pohotovost NONSTOP (hlavní služba)">
						<p className="mt-2">
							Havarijní zásahy pro poruchy elektroinstalace. Pokud jde o výpadek proudu, zkrat, rozvaděč, jistič nebo chránič, řešíme to NONSTOP 24/7.
						</p>
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>havarijní charakter, urgentní řešení</li>
							<li>dostupnost 24/7</li>
							<li>nejrychlejší cesta je telefon</li>
						</ul>
						<div className="mt-4 flex flex-wrap gap-3">
							<PrimaryButton href="/sluzby/elektro-pohotovost/">Detail služby</PrimaryButton>
							<a className="btnSecondary" href="/lokality/">Vybrat lokalitu</a>
						</div>
					</Card>

					<Card title="Hodinový manžel (plánované práce)">
						<p className="mt-2">
							Samostatná služba pro běžné opravy a montáže — bez havárií a bez pohotovosti. Vhodné, když chcete věci udělat pečlivě, v klidu a ve sjednaném termínu.
						</p>
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>montáže, vrtání, věšení, drobné opravy</li>
							<li>běžná denní dostupnost (termín domluvou)</li>
							<li>transparentní odhad předem</li>
						</ul>
						<div className="mt-4 flex flex-wrap gap-3">
							<PrimaryButton href="/sluzby/hodinovy-manzel/">Detail služby</PrimaryButton>
							<a className="btnSecondary" href="/kontakt/">Objednat</a>
						</div>
					</Card>
				</div>

				<div className="mt-8 card cardPad">
					<div className="text-base font-bold text-text-primary">Kde působíme</div>
					<p className="mt-2">
						Region: <b className="text-text-primary">{brandRegionText}</b>. U elektro pohotovosti dojezd upřesníme podle provozu; u hodinového manžela domluvíme termín.
					</p>
				</div>
			</section>
		</>
	);
}

import { areas } from "../src/data/areas";
import { brandRegionText, siteName } from "../src/data/site";
import { absoluteUrl } from "../src/lib/urls";
import { graphForGenericPage } from "../src/lib/jsonld";

import JsonLd from "../src/components/ui/JsonLd";
import Section from "../src/components/ui/Section";
import Card from "../src/components/ui/Card";
import PrimaryButton from "../src/components/ui/PrimaryButton";

export const dynamic = "error";

export default function HomePage() {
	const canonical = absoluteUrl("/");
	const title = `${siteName} | Elektrikář 24/7`;
	const description =
		"Elektro pohotovost 24/7 pro výpadky elektřiny, zkraty a poruchy rozvaděče. Výjezdy pro byty, domy i firmy v regionu Praha-západ a západní Praha.";

	const jsonLdGraph = graphForGenericPage({
		url: canonical,
		placeName: "Elektro pohotovost",
		areaServedName: brandRegionText,
		breadcrumbs: [{ name: "Domů", url: canonical }]
	});

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">{brandRegionText}</div>
					<h1 className="sectionTitle">Elektro pohotovost – NONSTOP 24/7</h1>
					<p className="sectionLead">
						Pomáháme při havarijních poruchách elektroinstalace: výpadky elektřiny, zkraty a závady rozvaděče.
						Jasná domluva, bezpečný postup, doklad o práci.
					</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<PrimaryButton href="/kontakt/">Kontakt</PrimaryButton>
						<a className="btnSecondary" href="/porucha/">Typické poruchy</a>
					</div>
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					<Card title="Kdy volat">
						<p>
							Když nejde elektřina, opakovaně padá jistič, je cítit zápach z elektro nebo se přehřívá zásuvka či rozvaděč.
						</p>
					</Card>
					<Card title="Jak postupujeme">
						<p>
							Nejprve bezpečně odpojíme problémový okruh, provedeme diagnostiku a navrhneme nejrychlejší bezpečné řešení.
						</p>
					</Card>
					<Card title="Bez zbytečných slibů">
						<p>
							Dostupnost a cenu vždy upřesníme po telefonu podle situace a času.
						</p>
					</Card>
				</div>
			</section>

			<Section kicker="Lokality" title="Oblasti, kde vyjíždíme" lead="Vyberte oblast a zobrazte lokality a typické poruchy.">
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{areas.map((a) => (
						<a key={a.slug} className="card cardPad no-underline hover:shadow-md transition" href={`/${a.slug}/`}>
							<div className="text-base font-bold text-text-primary">{a.name}</div>
							<p className="mt-2">{a.shortIntro}</p>
						</a>
					))}
				</div>
			</Section>
		</>
	);
}

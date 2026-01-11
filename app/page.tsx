import type { Metadata } from "next";

import { brandRegionText, siteName } from "../src/data/site";
import { absoluteUrl } from "../src/lib/urls";
import { graphForGenericPage } from "../src/lib/jsonld";
import { publishedLocations } from "../data/locations";

import JsonLd from "../src/components/ui/JsonLd";
import Section from "../src/components/ui/Section";
import Card from "../src/components/ui/Card";
import PrimaryButton from "../src/components/ui/PrimaryButton";

export const dynamic = "error";

const canonical = absoluteUrl("/");
const title = `${siteName} | Elektrikář 24/7`;
const description =
	"Elektro pohotovost 24/7 pro výpadky elektřiny, zkraty a poruchy rozvaděče. Výjezdy pro byty, domy i firmy v regionu Praha-západ a západní Praha.";

export const metadata: Metadata = {
	title,
	description,
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
		type: "website",
		title,
		description,
		url: canonical,
		images: [{
			url: "/og-images/homepage.svg",
			width: 1200,
			height: 630,
			alt: "Elektro pohotovost 24/7 - Elektrikář Praha-západ, Beroun"
		}]
	},
	twitter: {
		card: "summary_large_image",
		title,
		description,
		images: ["/og-images/homepage.svg"]
	}
};

export default function HomePage() {
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
						<a className="btnSecondary" href="/lokality/">Zobrazit lokality</a>
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

			<Section kicker="Lokality" title="Kde vyjíždíme" lead="Vyberte lokalitu – každá stránka má vlastní postup, ceny a kontakty.">
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{publishedLocations.slice(0, 12).map((l) => (
						<a
							key={l.slug}
							className="card cardPad no-underline hover:shadow-md transition"
							href={`/elektro-pohotovost/${l.slug}/`}
						>
							<div className="text-base font-bold text-text-primary">{l.name}</div>
							<p className="mt-2">
								Elektro pohotovost {l.name}: výpadek proudu, jističe, zkraty, rozvaděče.
							</p>
						</a>
					))}
				</div>
				<div className="mt-6">
					<a className="btnSecondary" href="/lokality/">Zobrazit všechny lokality</a>
				</div>
			</Section>
		</>
	);
}

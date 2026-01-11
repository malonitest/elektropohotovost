import type { Metadata } from "next";

import JsonLd from "../../src/components/ui/JsonLd";
import LocationsSearch from "../../src/components/LocationsSearch";

import { publishedLocations } from "../../data/locations";
import { absoluteUrl } from "../../src/lib/urls";
import { graphForGenericPage } from "../../src/lib/jsonld";
import { brandRegionText, siteName } from "../../src/data/site";

export const dynamic = "error";

export const metadata: Metadata = {
	title: `Lokality | ${siteName}`,
	description:
		"Seznam lokalit pro elektro pohotovost 24/7. Vyhledejte svou obec/městskou část a otevřete detail s postupem, ceníkem a kontakty.",
	alternates: { canonical: absoluteUrl("/lokality/") },
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
		title: `Lokality | ${siteName}`,
		description:
			"Seznam lokalit pro elektro pohotovost 24/7. Vyhledejte svou obec/městskou část a otevřete detail s postupem, ceníkem a kontakty.",
		type: "website",
		url: absoluteUrl("/lokality/"),
		images: [{
			url: "/og-images/default.svg",
			width: 1200,
			height: 630,
			alt: "Lokality - Elektro pohotovost 24/7"
		}]
	},
	twitter: {
		card: "summary_large_image",
		title: `Lokality | ${siteName}`,
		description: "Seznam lokalit pro elektro pohotovost 24/7. Vyhledejte svou obec/městskou část a otevřete detail s postupem, ceníkem a kontakty.",
		images: ["/og-images/default.svg"]
	}
};

export default function LocationsPage() {
	const canonical = absoluteUrl("/lokality/");

	const jsonLdGraph = graphForGenericPage({
		url: canonical,
		placeName: "Lokality",
		areaServedName: brandRegionText,
		breadcrumbs: [
			{ name: "Domů", url: absoluteUrl("/") },
			{ name: "Lokality", url: canonical }
		]
	});

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">Elektro pohotovost 24/7</div>
					<h1 className="sectionTitle">Lokality</h1>
					<p className="sectionLead">
						Vyhledejte svou lokalitu a otevřete detailní stránku s bezpečným postupem, orientačním ceníkem a kontakty.
					</p>
				</div>

				<LocationsSearch locations={publishedLocations} />
			</section>
		</>
	);
}

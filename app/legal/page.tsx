import type { Metadata } from "next";

import Card from "../../src/components/ui/Card";
import JsonLd from "../../src/components/ui/JsonLd";

import { absoluteUrl } from "../../src/lib/urls";
import { graphForGenericPage } from "../../src/lib/jsonld";
import { brandRegionText, siteName } from "../../src/data/site";

export const dynamic = "error";

const canonical = absoluteUrl("/legal/");

export const metadata: Metadata = {
	title: `Právní informace | ${siteName}`,
	description:
		"Zásady ochrany osobních údajů (GDPR) a obchodní podmínky pro elektro pohotovost 24/7.",
	alternates: { canonical },
	openGraph: {
		title: `Právní informace | ${siteName}`,
		description:
			"Zásady ochrany osobních údajů (GDPR) a obchodní podmínky pro elektro pohotovost 24/7.",
		type: "website",
		url: canonical,
		images: [{
			url: "/og-images/default.svg",
			width: 1200,
			height: 630,
			alt: "Právní informace - Elektro pohotovost 24/7"
		}]
	},
	twitter: {
		card: "summary_large_image",
		title: `Právní informace | ${siteName}`,
		description: "Zásady ochrany osobních údajů (GDPR) a obchodní podmínky pro elektro pohotovost 24/7.",
		images: ["/og-images/default.svg"]
	},
	robots: {
		index: false,
		follow: true,
		nocache: true,
		googleBot: {
			index: false,
			follow: true
		}
	}
};

export default function LegalPage() {
	const jsonLdGraph = graphForGenericPage({
		url: canonical,
		placeName: "Právní informace",
		areaServedName: brandRegionText,
		breadcrumbs: [
			{ name: "Domů", url: absoluteUrl("/") },
			{ name: "Právní informace", url: canonical }
		]
	});

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">GDPR + podmínky</div>
					<h1 className="sectionTitle">Právní informace</h1>
					<p className="sectionLead">
						Níže je stručný přehled ochrany osobních údajů a podmínek poskytování služeb. Pro konkrétní právní nastavení doporučujeme konzultaci.
					</p>
				</div>

				<div className="grid gap-4">
					<Card title="Zásady ochrany osobních údajů (GDPR)">
						<div className="mt-2 space-y-3">
							<p>
								Zpracováváme pouze údaje nutné k vyřízení poptávky a provedení zásahu (např. jméno, telefon, adresa místa zásahu, popis závady).
							</p>
							<p>
								Účel: komunikace se zákazníkem, domluva termínu, realizace zásahu, případně účetnictví a plnění zákonných povinností.
							</p>
							<p>
								Doba uchování: po dobu nezbytnou pro vyřízení zakázky a splnění zákonných povinností (např. účetní doklady).
							</p>
							<p>
								Příjemci: údaje nepředáváme třetím stranám mimo nezbytné poskytovatele (např. účetní služby) a jen v rozsahu nutném.
							</p>
							<p>
								Vaše práva: přístup, oprava, výmaz (pokud lze), omezení zpracování, námitka, přenositelnost a podání stížnosti u dozorového úřadu.
							</p>
						</div>
					</Card>

					<Card title="Obchodní podmínky (stručně)">
						<div className="mt-2 space-y-3">
							<p>
								Služba je poskytována jako havarijní výjezd a diagnostika závady elektroinstalace. Na místě vždy upřesníme rozsah práce a orientační cenu.
							</p>
							<p>
								Zákazník se zavazuje zajistit bezpečný přístup k místu zásahu a k rozvaděči. Pokud to situace vyžaduje, může být zásah omezen na bezpečné zajištění do doby definitivní opravy.
							</p>
							<p>
								Platba: dle domluvy (na místě / převodem), po provedení práce nebo dle rozsahu zakázky.
							</p>
							<p>
								Reklamace: řešíme individuálně podle typu závady, použitých dílů a charakteru zásahu.
							</p>
						</div>
					</Card>
				</div>
			</section>
		</>
	);
}

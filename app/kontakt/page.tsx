import type { Metadata } from "next";

import Card from "../../src/components/ui/Card";
import PrimaryButton from "../../src/components/ui/PrimaryButton";
import SafetyAlert from "../../src/components/ui/SafetyAlert";
import JsonLd from "../../src/components/ui/JsonLd";

import {
	businessAddress,
	businessName,
	email,
	googleBusinessProfileUrl,
	phone,
	serviceHours,
	siteName
} from "../../src/data/site";
import { absoluteUrl } from "../../src/lib/urls";
import { graphForGenericPage } from "../../src/lib/jsonld";

export const dynamic = "error";

export const metadata: Metadata = {
	title: `Kontakt | ${siteName}`,
	description:
		"Kontakt na Maloni s.r.o. – Elektro pohotovost NONSTOP 24/7. Volejte pro dostupnost, dojezd a orientační cenu.",
	alternates: { canonical: absoluteUrl("/kontakt/") }
};

export default function ContactPage() {
	const canonical = absoluteUrl("/kontakt/");
	const tel = String(phone || "").replace(/\s+/g, "");
	const telHref = tel ? `tel:${tel}` : undefined;
	const mailHref = email ? `mailto:${email}` : undefined;

	const jsonLdGraph = graphForGenericPage({
		url: canonical,
		placeName: "Kontakt",
		areaServedName: "Praha-západ, západní Praha, Beroun a okolí",
		breadcrumbs: [
			{ name: "Domů", url: absoluteUrl("/") },
			{ name: "Kontakt", url: canonical }
		]
	});

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">{serviceHours}</div>
					<h1 className="sectionTitle">Kontakt – elektro pohotovost</h1>
					<p className="sectionLead">
						V krizové situaci je nejrychlejší zavolat. Po telefonu upřesníme dostupnost, dojezd a orientační cenu.
					</p>
				</div>
				<div className="grid gap-4 lg:grid-cols-3">
					<Card title="Volejte">
						<p className="mt-2">
							{telHref ? (
								<a className="no-underline" href={telHref}>
									<span className="badge">☎ {phone}</span>
								</a>
							) : (
								"Telefon doplňte v konfiguraci"
							)}
						</p>
						<div className="mt-4 flex flex-wrap gap-3">
							{telHref ? <PrimaryButton href={telHref}>Volejte nyní</PrimaryButton> : null}
							<a className="btnSecondary" href="/faq/">FAQ</a>
						</div>
						<small className="mt-4 block">Nonstop. Včetně víkendů a svátků.</small>
					</Card>

					<Card title="E-mail">
						<p className="mt-2">
							{mailHref ? (
								<a className="no-underline" href={mailHref}>
									<span className="badge">✉ {email}</span>
								</a>
							) : (
								"E-mail doplňte v konfiguraci"
							)}
						</p>
						<small className="mt-3 block">
							Pro urgentní situace doporučujeme telefon (rychlejší domluva).
						</small>
					</Card>

					<Card title="Firma">
						<div className="mt-2 text-text-secondary">
							<div className="font-bold text-text-primary">{businessName}</div>
							<div className="mt-2">
								{businessAddress.streetAddress}, {businessAddress.addressLocality} {businessAddress.postalCode}
							</div>
							{googleBusinessProfileUrl ? (
								<a className="mt-3 inline-block" href={googleBusinessProfileUrl}>
									Google Business profil
								</a>
							) : null}
						</div>
					</Card>
				</div>

				<div className="mt-6">
					<SafetyAlert title="Bezpečnost (rychlé kroky)">
						Pokud je cítit zápach z elektro, něco praská nebo je zásuvka horká, vypněte jistič příslušného okruhu (nebo hlavní jistič),
						nepoužívejte postižené zařízení a zavolejte. V případě viditelného kouře/požáru volejte 150/112.
					</SafetyAlert>
				</div>
			</section>
		</>
	);
}

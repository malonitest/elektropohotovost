import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "../../../src/components/ui/JsonLd";
import Card from "../../../src/components/ui/Card";
import SafetyAlert from "../../../src/components/ui/SafetyAlert";
import PrimaryButton from "../../../src/components/ui/PrimaryButton";

import { locationBySlug, publishedLocations } from "../../../data/locations";
import type { Location } from "../../../data/locations";
import { phone, serviceHours, siteName } from "../../../src/data/site";
import { absoluteUrl, pathForLocationLanding } from "../../../src/lib/urls";
import { graphForLocationLandingPage } from "../../../src/lib/jsonld";
import { buildLocationLandingContent } from "../../../src/lib/locationLanding";

export const dynamic = "error";

export function generateStaticParams() {
	return publishedLocations.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
	const loc = locationBySlug.get(params.slug);
	if (!loc || !loc.publish) return {};

	const canonical = absoluteUrl(pathForLocationLanding(loc.slug));
	const title = `Elektro pohotovost ${loc.name} | Elektrikář 24/7`;
	const description = `Nonstop elektro pohotovost v ${loc.name}. Výpadek elektřiny, jistič, chránič, zkrat, rozvaděč. Bezpečný postup, orientační ceník a kontakt 24/7.`;

	return {
		title: `${title} | ${siteName}`,
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
			title: `${title} | ${siteName}`,
			description,
			type: "website",
			url: canonical,
			images: [{
				url: "/og-images/default.svg",
				width: 1200,
				height: 630,
				alt: `Elektro pohotovost ${loc.name} - Elektrikář 24/7`
			}]
		},
		twitter: {
			card: "summary_large_image",
			title: `${title} | ${siteName}`,
			description,
			images: ["/og-images/default.svg"]
		}
	};
}

export default function LocationLandingPage({ params }: { params: { slug: string } }) {
	const loc = locationBySlug.get(params.slug);
	if (!loc || !loc.publish) return notFound();

	const telHref = `tel:${String(phone || "").replace(/\s+/g, "")}`;
	const smsHref = `sms:${String(phone || "").replace(/\s+/g, "")}`;

	const canonical = absoluteUrl(pathForLocationLanding(loc.slug));
	const nearby = (loc.nearbySlugs || [])
		.map((slug) => locationBySlug.get(slug))
		.filter((x): x is Location => Boolean(x?.publish))
		.slice(0, 8);

	const content = buildLocationLandingContent({
		location: loc,
		nearby: nearby.map((n) => ({ slug: n.slug, name: n.name })),
		phoneDisplay: String(phone || "")
	});

	const pageTitle = `Elektro pohotovost ${loc.name}`;
	const pageDescription = content.heroLead;

	const jsonLdGraph = graphForLocationLandingPage({
		url: canonical,
		placeName: loc.name,
		pageName: pageTitle,
		pageDescription,
		breadcrumbs: [
			{ name: "Domů", url: absoluteUrl("/") },
			{ name: "Lokality", url: absoluteUrl("/lokality/") },
			{ name: loc.name, url: canonical }
		],
		faq: content.faq
	});

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">{content.heroKicker}</div>
					<h1 className="sectionTitle">{content.heroTitle}</h1>
					<p className="sectionLead">{content.heroLead}</p>
					<div className="mt-6 flex flex-wrap gap-3">
						<PrimaryButton href={telHref}>Volejte: {phone}</PrimaryButton>
						<a className="btnSecondary" href={smsHref}>SMS</a>
						<a className="btnSecondary" href="/kontakt/">Kontakt</a>
					</div>
					<p className="mt-3 text-sm text-text-muted">Dostupnost {serviceHours}. Dojezd upřesníme po telefonu.</p>
				</div>

				<div className="mt-6">
					<SafetyAlert title={content.safetyTitle}>{content.safetyBody}</SafetyAlert>
				</div>

				<div className="mt-8 grid gap-4 lg:grid-cols-2">
					<Card title="Služby (havarijní zásahy)">
						<ul className="mt-3 space-y-2 text-text-secondary">
							{content.services.map((x) => (
								<li key={x}>{x}</li>
							))}
						</ul>
					</Card>
					<Card title="Typické poruchy">
						<ul className="mt-3 space-y-2 text-text-secondary">
							{content.typicalFaults.map((x) => (
								<li key={x}>{x}</li>
							))}
						</ul>
					</Card>
				</div>

				<div className="mt-8 grid gap-4 lg:grid-cols-2">
					<Card title="Dostupnost a pokryté části">
						<p className="mt-2">{content.availability.responseTime}</p>
						<div className="mt-4 text-sm font-semibold text-text-primary">{content.availability.coveredPartsTitle}</div>
						<div className="mt-3 flex flex-wrap gap-2">
							{content.availability.coveredParts.slice(0, 12).map((x) => (
								<span key={x} className="badge">{x}</span>
							))}
						</div>
					</Card>
					<Card title="Orientační ceník">
						<p className="mt-2">{content.pricing.callout}</p>
						<ul className="mt-4 space-y-2 text-text-secondary">
							{content.pricing.rows.map((r) => (
								<li key={r.label} className="flex items-start justify-between gap-4">
									<span>
										<b className="text-text-primary">{r.label}</b>
										{r.note ? <span className="ml-2 text-text-muted">({r.note})</span> : null}
									</span>
									<span className="text-text-primary">{r.range}</span>
								</li>
							))}
						</ul>
					</Card>
				</div>

				<div className="mt-8 grid gap-4 lg:grid-cols-2">
					<Card title="Proč my">
						<ul className="mt-3 space-y-2 text-text-secondary">
							{content.whyUs.map((x) => (
								<li key={x}>{x}</li>
							))}
						</ul>
					</Card>
					<Card title="Distributoři (kdy volat)">
						<p className="mt-2">
							Pokud je problém v síti (celá ulice/okolí) nebo před hlavním jištěním/na zařízení distributora, řeší to distributor.
						</p>
						<ul className="mt-4 space-y-3 text-text-secondary">
							{content.distributors.map((d) => (
								<li key={d.name}>
									<div className="font-bold text-text-primary">{d.name}: {d.phone}</div>
									<div className="mt-1">{d.whenToCall}</div>
								</li>
							))}
						</ul>
					</Card>
				</div>

				<div className="mt-8 grid gap-4 lg:grid-cols-2">
					<Card title="FAQ">
						<div className="mt-2">
							{content.faq.map((it) => (
								<details key={it.question} className="faqItem">
									<summary className="faqQuestion">
										<span>{it.question}</span>
										<span className="faqChevron">▾</span>
									</summary>
									<div className="faqAnswer">{it.answer}</div>
								</details>
							))}
						</div>
					</Card>
					<Card title="Kontakt + mapa">
						<p className="mt-2">
							Pro nejrychlejší domluvu volejte nebo napište SMS. Mapu zobrazujeme bez těžkých SDK (jen iframe).
						</p>
						<div className="mt-4 flex flex-wrap gap-2">
							<a className="btnPrimary" href={telHref}>Volejte: {phone}</a>
							<a className="btnSecondary" href={smsHref}>SMS</a>
							<a className="btnSecondary" href="/kontakt/">Kontakt</a>
						</div>
						<div className="mt-4 overflow-hidden rounded-xl border border-line">
							<iframe
								title={`Mapa – ${loc.name}`}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								src={`https://www.google.com/maps?q=${encodeURIComponent(content.mapQuery)}&output=embed`}
								style={{ width: "100%", height: 320, border: 0 }}
							/>
						</div>
						<p className="mt-3 text-sm">
							<a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.mapQuery)}`}>
								Otevřít mapu v Google Maps
							</a>
						</p>
					</Card>
				</div>

				{nearby.length ? (
					<div className="mt-8 card cardPad">
						<div className="text-base font-bold text-text-primary">Blízké lokality</div>
						<p className="mt-2">
							Rychlé odkazy na okolí (interní prolinkování podle nearbySlugs).
						</p>
						<div className="mt-4 flex flex-wrap gap-2">
							{nearby.map((n) => (
								<a key={n.slug} className="badge" href={pathForLocationLanding(n.slug)}>
									{n.name}
								</a>
							))}
						</div>
					</div>
				) : null}
			</section>
		</>
	);
}

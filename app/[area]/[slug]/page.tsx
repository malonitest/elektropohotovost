import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Card from "../../../src/components/ui/Card";
import SafetyAlert from "../../../src/components/ui/SafetyAlert";
import JsonLd from "../../../src/components/ui/JsonLd";

import { areaBySlug } from "../../../src/data/areas";
import { publishedLocations } from "../../../src/data/locations";
import { problems } from "../../../src/data/problems";
import { buildLocationCopy } from "../../../src/lib/content";
import { pickProblemsForLocation } from "../../../src/lib/problems";
import { absoluteUrl, pathForArea, pathForAreaProblemHub, pathForLocation, pathForProblem } from "../../../src/lib/urls";
import { graphForLocationPage } from "../../../src/lib/jsonld";
import { descriptionForLocation, titleFor } from "../../../src/lib/seo";

export const dynamic = "error";

export function generateStaticParams() {
	return publishedLocations.map((l) => ({ area: l.parentAreaSlug, slug: l.slug }));
}

export function generateMetadata({ params }: { params: { area: string; slug: string } }): Metadata {
	const area = areaBySlug.get(params.area);
	const location = publishedLocations.find((l) => l.parentAreaSlug === params.area && l.slug === params.slug);
	if (!area || !location) return {};

	const canonical = absoluteUrl(pathForLocation(area.slug, location.slug));
	return {
		title: titleFor(location.name),
		description: descriptionForLocation(location),
		alternates: { canonical }
	};
}

export default function LocationPage({ params }: { params: { area: string; slug: string } }) {
	const area = areaBySlug.get(params.area);
	const location = publishedLocations.find((l) => l.parentAreaSlug === params.area && l.slug === params.slug);
	if (!area || !location) return notFound();

	const canonical = absoluteUrl(pathForLocation(area.slug, location.slug));
	const copy = buildLocationCopy(location, area);
	const topProblems = pickProblemsForLocation({ location, problems, countMin: 9, countMax: 9 });
	const nearbyInArea = publishedLocations
		.filter((l) => l.parentAreaSlug === area.slug && l.slug !== location.slug)
		.sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name, "cs"))
		.slice(0, 6);

	const breadcrumbs = [
		{ name: "Domů", url: absoluteUrl("/") },
		{ name: area.name, url: absoluteUrl(pathForArea(area.slug)) },
		{ name: location.name, url: canonical }
	];

	const jsonLdGraph = graphForLocationPage({ url: canonical, area, location, breadcrumbs, faq: copy.faq });

	return (
		<>
			<JsonLd graph={jsonLdGraph} />
			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">{area.name}</div>
					<h1 className="sectionTitle">{copy.h1}</h1>
					<p className="sectionLead">{copy.tldr}</p>
				</div>

				<div className="grid gap-4 lg:grid-cols-2">
					<Card title="Rychlá diagnostika a zásah">
						<p className="mt-2">{copy.serviceDescription}</p>
						<p className="mt-3">{copy.localContext}</p>
						<div className="mt-4 flex flex-wrap gap-2">
							<a className="btnSecondary" href={pathForArea(area.slug)}>
								Oblast {area.name}
							</a>
							<a className="btnSecondary" href={pathForAreaProblemHub(area.slug)}>
								Poruchy v oblasti
							</a>
						</div>
					</Card>
					<Card title="Co řešíme nejčastěji">
						<ul className="mt-3 space-y-2 text-text-secondary">
							{copy.typicalInterventions.map((x) => (
								<li key={x}>{x}</li>
							))}
						</ul>
					</Card>
				</div>

				<div className="mt-8">
					<SafetyAlert title="Bezpečnost">{`Pokud cítíte zápach spáleniny, vidíte jiskření nebo se něco přehřívá, nemanipulujte se zařízením a volejte. Elektrika může být nebezpečná.`}</SafetyAlert>
				</div>

				<div className="mt-8 grid gap-4 lg:grid-cols-2">
					<Card title="Nejčastější poruchy">
						<ul className="mt-3 space-y-2">
							{topProblems.map((p) => (
								<li key={p.slug}>
									<a href={pathForProblem(p.slug)}>{p.name}</a>
								</li>
							))}
						</ul>
					</Card>
					<Card title="FAQ">
						<div className="mt-2">
							{copy.faq.map((it) => (
								<div key={it.question} className="faqItem">
									<div className="faqQuestion">{it.question}</div>
									<div className="faqAnswer">{it.answer}</div>
								</div>
							))}
						</div>
					</Card>
				</div>

				{nearbyInArea.length ? (
					<div className="mt-8">
						<Card title="Okolní lokality">
							<div className="mt-3 flex flex-wrap gap-2">
								{nearbyInArea.map((l) => (
									<a key={l.slug} className="badge" href={pathForLocation(l.parentAreaSlug, l.slug)}>
										{l.name}
									</a>
								))}
							</div>
						</Card>
					</div>
				) : null}
			</section>
		</>
	);
}

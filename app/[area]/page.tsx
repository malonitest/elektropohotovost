import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Section from "../../src/components/ui/Section";
import Card from "../../src/components/ui/Card";
import JsonLd from "../../src/components/ui/JsonLd";

import { areas, areaBySlug } from "../../src/data/areas";
import { publishedLocations } from "../../src/data/locations";
import { problems } from "../../src/data/problems";
import { buildAreaCopy } from "../../src/lib/content";
import { pickProblemsForArea } from "../../src/lib/problems";
import { absoluteUrl, pathForArea, pathForAreaProblemHub, pathForLocation, pathForProblem } from "../../src/lib/urls";
import { graphForAreaPage } from "../../src/lib/jsonld";
import { descriptionForArea, titleFor } from "../../src/lib/seo";

export const dynamic = "error";

export function generateStaticParams() {
	return areas.map((a) => ({ area: a.slug }));
}

export function generateMetadata({ params }: { params: { area: string } }): Metadata {
	const area = areaBySlug.get(params.area);
	if (!area) return {};

	const canonical = absoluteUrl(pathForArea(area.slug));
	return {
		title: titleFor(area.name),
		description: descriptionForArea(area),
		alternates: { canonical }
	};
}

export default function AreaPage({ params }: { params: { area: string } }) {
	const area = areaBySlug.get(params.area);
	if (!area) return notFound();

	const canonical = absoluteUrl(pathForArea(area.slug));
	const copy = buildAreaCopy(area);

	const areaPublished = publishedLocations
		.filter((l) => l.parentAreaSlug === area.slug)
		.sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name, "cs"));

	const topProblems = pickProblemsForArea({ area, problems, count: 8 });

	const breadcrumbs = [
		{ name: "Domů", url: absoluteUrl("/") },
		{ name: area.name, url: canonical }
	];

	const jsonLdGraph = graphForAreaPage({
		url: canonical,
		area,
		breadcrumbs,
		faq: copy.faq
	});

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
					<Card title="Služba v oblasti">
						<p className="mt-2">{copy.serviceDescription}</p>
						<p className="mt-3">{copy.localContext}</p>
					</Card>
					<Card title="Typické zásahy">
						<ul className="mt-3 space-y-2 text-text-secondary">
							{copy.typicalInterventions.map((x) => (
								<li key={x}>{x}</li>
							))}
						</ul>
						<div className="mt-4">
							<a className="btnSecondary" href={pathForAreaProblemHub(area.slug)}>
								Typické poruchy v oblasti
							</a>
						</div>
					</Card>
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

				<div className="mt-8">
					<Section
						kicker="Lokality"
						title="Lokality v oblasti"
						lead="Zobrazené lokality jsou veřejně publikované (publish=true)."
					>
						<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{areaPublished.map((l) => (
								<a
									key={l.slug}
									className="card cardPad no-underline hover:shadow-md transition"
									href={pathForLocation(area.slug, l.slug)}
								>
									<div className="text-base font-bold text-text-primary">{l.name}</div>
									<small>Priorita {l.priority}</small>
								</a>
							))}
						</div>
					</Section>
				</div>
			</section>
		</>
	);
}

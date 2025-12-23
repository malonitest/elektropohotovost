import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Card from "../../../src/components/ui/Card";
import SafetyAlert from "../../../src/components/ui/SafetyAlert";
import JsonLd from "../../../src/components/ui/JsonLd";

import type { Problem } from "../../../src/data/problems";
import { problems } from "../../../src/data/problems";
import { locations, publishedLocations } from "../../../src/data/locations";
import { areaBySlug } from "../../../src/data/areas";
import { absoluteUrl, pathForLocation, pathForProblem } from "../../../src/lib/urls";
import { descriptionForProblem, titleForProblem } from "../../../src/lib/problems";
import { graphForProblemPage } from "../../../src/lib/jsonld";
import { pickLocationsForProblemLinks } from "../../../src/lib/problems";

export const dynamic = "error";

export function generateStaticParams() {
	return problems.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
	const problem = problems.find((p) => p.slug === params.slug);
	if (!problem) return {};

	const canonical = absoluteUrl(pathForProblem(problem.slug));
	return {
		title: titleForProblem(problem.name),
		description: descriptionForProblem(problem),
		alternates: { canonical }
	};
}

export default function ProblemDetailPage({ params }: { params: { slug: string } }) {
	const problem = problems.find((p) => p.slug === params.slug);
	if (!problem) return notFound();

	const canonical = absoluteUrl(pathForProblem(problem.slug));
	const breadcrumbs = [
		{ name: "Domů", url: absoluteUrl("/") },
		{ name: "Poruchy", url: absoluteUrl("/porucha/") },
		{ name: problem.name, url: canonical }
	];

	const jsonLdGraph = graphForProblemPage({
		url: canonical,
		breadcrumbs,
		faq: problem.faq
	});

	const relatedProblems = problem.relatedProblems
		.map((slug) => problems.find((p) => p.slug === slug))
		.filter((p): p is Problem => Boolean(p))
		.slice(0, 6);

	const linkPick = pickLocationsForProblemLinks({
		mode: problem.locationLinksMode,
		locations,
		maxTop: 12
	});

	const linkedLocations = linkPick.areasOnly ? [] : linkPick.selected;
	const linkedAreas = linkPick.areasOnly
		? Array.from(new Set(publishedLocations.map((l) => l.parentAreaSlug)))
		: Array.from(new Set(linkedLocations.map((l) => l.parentAreaSlug)));

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">Porucha</div>
					<h1 className="sectionTitle">{problem.name}</h1>
					<p className="sectionLead">{problem.summary}</p>
				</div>
				<div className="grid gap-4 lg:grid-cols-2">
					<Card title="Příznaky">
						<ul className="mt-3 space-y-2 text-text-secondary">
							{problem.symptoms.map((s) => (
								<li key={s}>{s}</li>
							))}
						</ul>
					</Card>
					<Card title="Nejčastější příčiny">
						<ul className="mt-3 space-y-2 text-text-secondary">
							{problem.causes.map((c) => (
								<li key={c}>{c}</li>
							))}
						</ul>
					</Card>
				</div>

				<div className="mt-6 grid gap-4 lg:grid-cols-2">
					<Card title="Co udělat teď (bezpečně)">
						<ul className="mt-3 space-y-2 text-text-secondary">
							{problem.whatToDoNow.map((x) => (
								<li key={x}>{x}</li>
							))}
						</ul>
					</Card>
					<Card title="Čemu se vyhnout">
						<ul className="mt-3 space-y-2 text-text-secondary">
							{problem.whatNotToDo.map((x) => (
								<li key={x}>{x}</li>
							))}
						</ul>
					</Card>
				</div>

				<div className="mt-6">
					<SafetyAlert title="Kdy volat elektro pohotovost">
						<ul className="mt-2 space-y-2">
							{problem.whenToCall.map((x) => (
								<li key={x}>{x}</li>
							))}
						</ul>
					</SafetyAlert>
				</div>

				<div className="mt-8 grid gap-4 lg:grid-cols-2">
					<Card title="FAQ">
						<div className="mt-2">
							{problem.faq.map((it) => (
								<div key={it.question} className="faqItem">
									<div className="faqQuestion">{it.question}</div>
									<div className="faqAnswer">{it.answer}</div>
								</div>
							))}
						</div>
					</Card>

					{relatedProblems.length ? (
						<Card title="Související poruchy">
							<ul className="mt-3 space-y-2">
								{relatedProblems.map((p) => (
									<li key={p.slug}>
										<a href={pathForProblem(p.slug)}>{p.name}</a>
									</li>
								))}
							</ul>
						</Card>
					) : null}
				</div>

				<div className="mt-8 card cardPad">
					<div className="text-base font-bold text-text-primary">Kde to nejčastěji řešíme</div>
					<p className="mt-2">
						Vyberte oblast nebo lokalitu. Pro dostupnost vždy volejte – dojezd se liší dle dopravy a vytížení.
					</p>
					<div className="mt-4 flex flex-wrap gap-3">
						{linkedAreas.slice(0, 6).map((slug) => {
							const area = areaBySlug.get(slug);
							if (!area) return null;
							return (
								<a key={slug} className="btnSecondary" href={`/${slug}/`}>
									{area.name}
								</a>
							);
						})}
						<a className="btnPrimary" href="/kontakt/">Kontakt</a>
					</div>

					{linkedLocations.length ? (
						<div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
							{linkedLocations.map((loc) => (
								<a
									key={`${loc.parentAreaSlug}/${loc.slug}`}
									className="card cardPad no-underline hover:shadow-md transition"
									href={pathForLocation(loc.parentAreaSlug, loc.slug)}
								>
									<div className="text-sm font-bold text-text-primary">{loc.name}</div>
									<small>{areaBySlug.get(loc.parentAreaSlug)?.name ?? loc.parentAreaSlug}</small>
								</a>
							))}
						</div>
					) : null}
				</div>
			</section>
		</>
	);
}

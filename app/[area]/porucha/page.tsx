import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Card from "../../../src/components/ui/Card";
import JsonLd from "../../../src/components/ui/JsonLd";

import { areas, areaBySlug } from "../../../src/data/areas";
import { problems } from "../../../src/data/problems";
import { pickProblemsForArea } from "../../../src/lib/problems";
import { absoluteUrl, pathForArea, pathForAreaProblemHub } from "../../../src/lib/urls";
import { graphForProblemHubPage } from "../../../src/lib/jsonld";

export const dynamic = "error";

export function generateStaticParams() {
	return areas.map((a) => ({ area: a.slug }));
}

export function generateMetadata({ params }: { params: { area: string } }): Metadata {
	const area = areaBySlug.get(params.area);
	if (!area) return {};

	const canonical = absoluteUrl(pathForAreaProblemHub(area.slug));
	return {
		title: `Poruchy a závady – ${area.name}`,
		description: `Přehled nejčastějších poruch a závad v oblasti ${area.name}. Rychlé kroky první pomoci a kdy volat elektrikáře.`,
		alternates: { canonical }
	};
}

export default function AreaProblemHubPage({ params }: { params: { area: string } }) {
	const area = areaBySlug.get(params.area);
	if (!area) return notFound();

	const canonical = absoluteUrl(pathForAreaProblemHub(area.slug));
	const list = pickProblemsForArea({ area, problems, count: 24 });

	const breadcrumbs = [
		{ name: "Domů", url: absoluteUrl("/") },
		{ name: area.name, url: absoluteUrl(pathForArea(area.slug)) },
		{ name: "Porucha", url: canonical }
	];

	const jsonLdGraph = graphForProblemHubPage({ url: canonical, breadcrumbs });

	return (
		<>
			<JsonLd graph={jsonLdGraph} />
			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">{area.name}</div>
					<h1 className="sectionTitle">Poruchy a závady</h1>
					<p className="sectionLead">Nejčastější situace a rychlé kroky, co dělat.</p>
				</div>
				<div className="grid gap-4 lg:grid-cols-2">
					<Card title="Kdy volat elektrikáře">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>Jiskření, zápach spáleniny, kouř</li>
							<li>Vypadávající jistič nebo proudový chránič</li>
							<li>Nejde elektřina v části bytu/domu</li>
							<li>Hřející zásuvka, vypínač, rozvaděč</li>
						</ul>
					</Card>
					<Card title="Rychlé tipy (bezpečně)">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>Nemanipulujte s poškozeným kabelem ani zásuvkou.</li>
							<li>Vypněte postižený okruh v rozvaděči, pokud je to bezpečné.</li>
							<li>Pokud si nejste jistí, raději volejte – pomůžeme po telefonu.</li>
						</ul>
					</Card>
				</div>

				<div className="mt-8">
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{list.map((p) => (
							<a
								key={p.slug}
								className="card cardPad no-underline hover:shadow-md transition"
								href={`/porucha/${p.slug}/`}
							>
								<div className="text-base font-bold text-text-primary">{p.name}</div>
								<small>{p.summary}</small>
							</a>
						))}
					</div>
				</div>
			</section>
		</>
	);
}

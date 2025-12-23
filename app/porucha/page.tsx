import type { Metadata } from "next";

import Card from "../../src/components/ui/Card";
import JsonLd from "../../src/components/ui/JsonLd";

import { problems } from "../../src/data/problems";
import { absoluteUrl, pathForProblem, pathForProblemHub } from "../../src/lib/urls";
import { graphForProblemHubPage } from "../../src/lib/jsonld";

export const dynamic = "error";

export const metadata: Metadata = {
	title: "Typické poruchy | Elektro pohotovost",
	description:
		"Nejčastější poruchy elektroinstalace: příznaky, příčiny, co udělat hned a kdy volat elektro pohotovost. Bez práce pod napětím.",
	alternates: { canonical: absoluteUrl(pathForProblemHub()) }
};

export default function ProblemHubPage() {
	const canonical = absoluteUrl(pathForProblemHub());
	const jsonLdGraph = graphForProblemHubPage({
		url: canonical,
		breadcrumbs: [
			{ name: "Domů", url: absoluteUrl("/") },
			{ name: "Poruchy", url: canonical }
		]
	});

	const sorted = [...problems].sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name, "cs"));

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">Praktický postup</div>
					<h1 className="sectionTitle">Typické poruchy elektroinstalace</h1>
					<p className="sectionLead">
						Rychlá orientace: příznaky, nejčastější příčiny a bezpečné kroky, co udělat hned. Pokud je cítit spálenina nebo něco jiskří, volejte.
					</p>
				</div>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{sorted.map((p) => (
						<a key={p.slug} className="card cardPad no-underline hover:shadow-md transition" href={pathForProblem(p.slug)}>
							<div className="flex items-start justify-between gap-3">
								<div className="text-base font-bold text-text-primary">{p.name}</div>
								<span className="badge">Priorita {p.priority}</span>
							</div>
							<p className="mt-3">{p.summary}</p>
						</a>
					))}
				</div>

				<div className="mt-8">
					<Card title="Havarijní situace">
						<p className="mt-2">
							Pokud cítíte zápach z elektro, slyšíte praskání, vidíte jiskření nebo se něco přehřívá, vypněte jistič okruhu (nebo hlavní)
							a volejte. V případě kouře/požáru volejte 150/112.
						</p>
					</Card>
				</div>
			</section>
		</>
	);
}

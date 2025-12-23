import type { Metadata } from "next";

import Section from "../../src/components/ui/Section";
import Card from "../../src/components/ui/Card";

import BlogSearch from "../../src/components/blog/BlogSearch";

import { absoluteUrl } from "../../src/lib/urls";
import { getAllCategories, getSearchIndex } from "../../src/lib/blog";

export const dynamic = "error";

export const metadata: Metadata = {
	title: "Blog",
	description: "Praktické návody a vysvětlení z terénu: elektro havárie, jištění, bezpečnost a plánované opravy.",
	alternates: { canonical: absoluteUrl("/blog/") }
};

export default async function BlogIndexPage() {
	const categories = await getAllCategories();
	const index = await getSearchIndex();

	return (
		<>
			<Section
				kicker="Blog"
				title="Praktické návody a postupy"
				lead="Píšeme česky a z praxe. U havárií držíme bezpečný postup; u plánovaných prací řešíme domluvu a kvalitu."
			>
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{categories.map((c) => (
						<a
							key={c.slug}
							className="card cardPad no-underline hover:shadow-md transition"
							href={`/blog/kategorie/${c.slug}/`}
						>
							<div className="text-base font-bold text-text-primary">{c.name}</div>
							<div className="mt-2 text-sm text-text-muted">Článků: {c.count}</div>
						</a>
					))}
				</div>
			</Section>

			<Section
				title="Vyhledávání"
				lead="Jednoduché klientské vyhledávání podle názvu, popisu a kategorie."
			>
				<BlogSearch items={index} />
			</Section>

			<Section title="Proč tenhle blog" lead="Aby šlo rychle poznat: co je bezpečné udělat hned a kdy je čas volat elektrikáře.">
				<div className="grid gap-4 lg:grid-cols-3">
					<Card title="Bezpečnost">Nejdřív bezpečný postup. Pokud hrozí požár nebo úraz, neexperimentujeme.</Card>
					<Card title="Jasná domluva">U cen a termínů vysvětlujeme, co je běžné a co je red flag.</Card>
					<Card title="Z praxe">Píšeme tak, aby článek pomohl i ve stresu: krátké kroky, vysvětlení pojmů.</Card>
				</div>
			</Section>
		</>
	);
}

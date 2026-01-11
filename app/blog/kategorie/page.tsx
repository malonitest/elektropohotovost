import type { Metadata } from "next";

import Section from "../../../src/components/ui/Section";

import { absoluteUrl } from "../../../src/lib/urls";
import { getAllCategories } from "../../../src/lib/blog";

export const dynamic = "error";

export const metadata: Metadata = {
	title: "Kategorie blogu",
	description: "Přehled kategorií blogu: elektro havárie, jištění, bezpečnost a plánované opravy.",
	alternates: { canonical: absoluteUrl("/blog/kategorie/") },
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
		type: "website",
		title: "Kategorie blogu | Elektro pohotovost",
		description: "Přehled kategorií blogu: elektro havárie, jištění, bezpečnost a plánované opravy.",
		url: absoluteUrl("/blog/kategorie/"),
		images: [{
			url: "/og-images/blog.svg",
			width: 1200,
			height: 630,
			alt: "Kategorie blogu - Elektro pohotovost"
		}]
	},
	twitter: {
		card: "summary_large_image",
		title: "Kategorie blogu | Elektro pohotovost",
		description: "Přehled kategorií blogu: elektro havárie, jištění, bezpečnost a plánované opravy.",
		images: ["/og-images/blog.svg"]
	}
};

export default async function BlogCategoriesIndexPage() {
	const categories = await getAllCategories();

	return (
		<Section kicker="Blog" title="Kategorie" titleAs="h1" lead="Vyberte oblast, která se vás týká.">
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
	);
}

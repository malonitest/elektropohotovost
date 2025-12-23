import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Section from "../../../../src/components/ui/Section";

import { blogCategories } from "../../../../src/data/blog";
import { absoluteUrl } from "../../../../src/lib/urls";
import { getPostsByCategorySlug } from "../../../../src/lib/blog";

export const dynamic = "error";

export async function generateStaticParams() {
	return blogCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await props.params;
	const category = blogCategories.find((c) => c.slug === slug);
	if (!category) return {};

	const canonical = absoluteUrl(`/blog/kategorie/${slug}/`);
	return {
		title: category.name,
		description: category.short,
		alternates: { canonical }
	};
}

export default async function BlogCategoryPage(props: { params: Promise<{ slug: string }> }) {
	const { slug } = await props.params;
	const category = blogCategories.find((c) => c.slug === slug);
	if (!category) notFound();

	const posts = await getPostsByCategorySlug(slug);
	posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

	return (
		<>
			<Section kicker="Blog" title={category.name} titleAs="h1" lead={category.short}>
				<div className="grid gap-3">
					{posts.map((p) => (
						<a
							key={p.slug}
							className="card cardPad no-underline hover:shadow-md transition"
							href={`/blog/${p.slug}/`}
						>
							<div className="flex items-start justify-between gap-3">
								<div className="min-w-0">
									<div className="text-base font-bold text-text-primary">{p.title}</div>
									<p className="mt-2">{p.description}</p>
								</div>
								<div className="shrink-0 text-right">
									<div className="text-xs text-text-muted">{p.publishedAt}</div>
								</div>
							</div>
						</a>
					))}
				</div>

				<div className="mt-6">
					<a className="btnSecondary" href="/blog/">
						Zpět na blog
					</a>
				</div>
			</Section>
		</>
	);
}

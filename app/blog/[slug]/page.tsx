import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import Section from "../../../src/components/ui/Section";
import JsonLd from "../../../src/components/ui/JsonLd";

import { mdxComponents } from "../../../src/components/blog/MdxComponents";

import { blogAuthor } from "../../../src/data/author";
import { absoluteUrl } from "../../../src/lib/urls";
import { buildBlogPosting, buildBreadcrumbList, buildFaqPage } from "../../../src/lib/jsonld";
import { getAllPosts, getPostBySlug } from "../../../src/lib/blog";

export const dynamic = "error";

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await props.params;
	const post = await getPostBySlug(slug);
	if (!post) return {};

	const canonical = absoluteUrl(`/blog/${post.slug}/`);
	return {
		title: post.title,
		description: post.description,
		alternates: { canonical },
		openGraph: {
			type: "article",
			title: post.title,
			description: post.description,
			url: canonical,
			images: [{
				url: "/og-images/blog.svg",
				width: 1200,
				height: 630,
				alt: post.title
			}],
			publishedTime: post.publishedAt,
			modifiedTime: post.updatedAt || post.publishedAt,
			authors: [blogAuthor.name]
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.description,
			images: ["/og-images/blog.svg"]
		}
	};
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
	const { slug } = await props.params;
	const post = await getPostBySlug(slug);
	if (!post) notFound();

	const canonical = absoluteUrl(`/blog/${post.slug}/`);

	const all = await getAllPosts();
	const related = (post.relatedSlugs || [])
		.map((s) => all.find((p) => p.slug === s))
		.filter(Boolean)
		.slice(0, 6);

	const jsonLdGraph: unknown[] = [
		buildBreadcrumbList(canonical, [
			{ name: "Domů", url: absoluteUrl("/") },
			{ name: "Blog", url: absoluteUrl("/blog/") },
			{ name: post.title, url: canonical }
		]),
		buildBlogPosting({
			url: canonical,
			headline: post.title,
			description: post.description,
			datePublished: post.publishedAt,
			dateModified: post.updatedAt,
			authorName: blogAuthor.name,
			authorUrl: absoluteUrl(blogAuthor.url)
		})
	];

	if (post.faq && post.faq.length) {
		jsonLdGraph.push(buildFaqPage(canonical, post.faq));
	}

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<Section kicker={post.categoryName} title={post.title} titleAs="h1" lead={post.description}>
				<div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
					<span>Publikováno: {post.publishedAt}</span>
					<span aria-hidden>•</span>
					<span>Aktualizace: {post.updatedAt}</span>
				</div>

				<div className="mt-8 card cardPad">
					<article className="prose max-w-none">
						<MDXRemote
							source={post.content}
							components={mdxComponents}
							options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
						/>
					</article>
				</div>

				{related.length ? (
					<div className="mt-8">
						<div className="text-base font-bold text-text-primary">Související články</div>
						<div className="mt-3 grid gap-3">
							{related.map((p) => (
								<a
									key={p!.slug}
									className="card cardPad no-underline hover:shadow-md transition"
									href={`/blog/${p!.slug}/`}
								>
									<div className="text-sm font-extrabold text-text-primary">{p!.title}</div>
									<div className="mt-1 text-sm text-text-secondary">{p!.description}</div>
								</a>
							))}
						</div>
					</div>
				) : null}

				<div className="mt-8 flex flex-wrap gap-3">
					<a className="btnSecondary" href="/blog/">
						Zpět na blog
					</a>
					<a className="btnSecondary" href={`/blog/kategorie/${post.categorySlug}/`}>
						Další články v kategorii
					</a>
					<a className="btnPrimary" href="/kontakt/">
						Kontakt
					</a>
				</div>
			</Section>
		</>
	);
}

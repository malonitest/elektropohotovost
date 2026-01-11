import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import Section from "../../../src/components/ui/Section";
import JsonLd from "../../../src/components/ui/JsonLd";
import TableOfContents from "../../../src/components/blog/TableOfContents";

import { mdxComponents } from "../../../src/components/blog/MdxComponents";

import { blogAuthor } from "../../../src/data/author";
import { absoluteUrl } from "../../../src/lib/urls";
import { buildBlogPosting, buildBreadcrumbList, buildFaqPage, buildHowTo, buildVideoObject } from "../../../src/lib/jsonld";
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
			type: "article",
			title: post.title,
			description: post.description,
			url: canonical,
			images: [{
				url: post.featuredImage || "/og-images/blog.svg",
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
			images: [post.featuredImage || "/og-images/blog.svg"]
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

	// Calculate word count from content
	const wordCount = post.content.split(/\s+/).filter(w => w.length > 0).length;

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
			authorUrl: absoluteUrl(blogAuthor.url),
			keywords: post.keywords,
			categoryName: post.categoryName,
			wordCount,
			featuredImage: post.featuredImage
		})
	];

	if (post.faq && post.faq.length) {
		jsonLdGraph.push(buildFaqPage(canonical, post.faq, "Emergency"));
	}

	// Add HowTo schema for the power outage guide
	if (post.slug === "co-delat-pri-vypadku-proudu-navod") {
		jsonLdGraph.push(buildHowTo({
			url: canonical,
			name: "Co dělat při výpadku proudu",
			description: "Bezpečný postup jak zkontrolovat jistič a identifikovat problém při výpadku elektřiny",
			totalTime: "PT5M",
			steps: [
				{
					name: "Zkontrolujte rozsah výpadku",
					text: "Podívejte se z okna, jestli svítí sousedům nebo veřejné osvětlení. Zjistěte, jestli je problém jen u vás, nebo i v celém domě či ulici."
				},
				{
					name: "Najděte rozvaděč",
					text: "V bytě bývá rozvaděč obvykle u vchodu nebo v chodbě. V domě může být v technické místnosti nebo garáži. Hledejte šedou nebo bílou skříňku s popisky '230V' nebo 'elektro'."
				},
				{
					name: "Zkontrolujte jističe a chrániče",
					text: "Otevřete rozvaděč a podívejte se na přepínače. Spadlý jistič má páčku v poloze '0' nebo 'dolů'. Pokud vidíte zápach, jiskření nebo kouř, vypněte hlavní jistič a zavolejte elektrikáře."
				},
				{
					name: "Odpojte podezřelé spotřebiče",
					text: "Než zkusíte jistič nahodit, odpojte varnou desku, troubu, bojler, pračku, myčku a další výkonné spotřebiče. Pokud některý způsobil zkrat, při nahození by to mohlo znovu vyhodit."
				},
				{
					name: "Zkuste jednou nahodit jistič",
					text: "Pouze pokud nevidíte varovné signály: přehoďte spadlý jistič zpět do polohy '1' nebo 'nahoru', počkejte 5 sekund a zkontrolujte, jestli proud funguje."
				},
				{
					name: "Rozhodněte se, co dál",
					text: "Pokud jistič okamžitě spadl znovu, neodhazujte víckrát a zavolejte elektrikáře. Pokud cítíte zápach, vidíte kouř nebo jiskření, volejte elektro pohotovost ihned na 774 621 763."
				}
			],
			toolsNeeded: ["Baterka nebo svíčka", "Telefon na zavolání pomoci"]
		}));

		// Add VideoObject schema for the YouTube tutorial
		jsonLdGraph.push(buildVideoObject({
			url: canonical,
			name: "Jak bezpečně nahodit jistič",
			description: "Praktická video ukázka, jak správně a bezpečně postupovat při výpadku proudu a jak nahodit jistič.",
			thumbnailUrl: "https://i.ytimg.com/vi/g19k0Nh9N1I/maxresdefault.jpg",
			uploadDate: "2024-01-15",
			duration: "PT3M45S",
			contentUrl: "https://www.youtube.com/watch?v=g19k0Nh9N1I",
			embedUrl: "https://www.youtube.com/embed/g19k0Nh9N1I"
		}));
	}

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<Section kicker={post.categoryName} title={post.title} titleAs="h1" lead={post.description}>
				<div className="flex flex-wrap items-center gap-4 text-sm">
					<div className="flex items-center gap-2 text-text-muted">
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<span>Publikováno: {post.publishedAt}</span>
					</div>
					<span className="text-text-muted" aria-hidden>•</span>
					<div className="flex items-center gap-2">
						<svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
						</svg>
						<span className="font-semibold text-primary">Aktualizováno: {post.updatedAt}</span>
					</div>
				</div>

				<div className="mt-8 card cardPad">
					{wordCount > 500 && <TableOfContents />}
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

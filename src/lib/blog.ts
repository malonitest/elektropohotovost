import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { blogCategories } from "../data/blog";

export type BlogService = "elektro" | "manzel";

export type BlogFrontmatter = {
	title: string;
	description: string;
	slug: string;
	categorySlug: string;
	categoryName: string;
	service: BlogService;
	publishedAt: string;
	updatedAt: string;
	relatedSlugs?: string[];
	faq?: Array<{ question: string; answer: string }>;
	keywords?: string[];
	featuredImage?: string;
};

export type BlogPost = BlogFrontmatter & {
	content: string;
	sourcePath: string;
};

const repoRoot = process.cwd();
const blogRoot = path.join(repoRoot, "content", "blog");

async function walkDir(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	const files: string[] = [];
	for (const e of entries) {
		const full = path.join(dir, e.name);
		if (e.isDirectory()) files.push(...(await walkDir(full)));
		else if (e.isFile() && (e.name.endsWith(".mdx") || e.name.endsWith(".md"))) files.push(full);
	}
	return files;
}

function normalizeFrontmatter(raw: unknown, sourcePath: string): BlogFrontmatter {
	if (!raw || typeof raw !== "object") throw new Error(`Invalid frontmatter: ${sourcePath}`);
	const fm = raw as Partial<BlogFrontmatter>;

	const required = [
		"title",
		"description",
		"slug",
		"categorySlug",
		"categoryName",
		"service",
		"publishedAt",
		"updatedAt"
	] as const;
	for (const k of required) {
		if (!fm[k] || typeof fm[k] !== "string") throw new Error(`Missing ${k} in ${sourcePath}`);
	}
	if (fm.service !== "elektro" && fm.service !== "manzel") throw new Error(`Invalid service in ${sourcePath}`);

	return {
		title: fm.title!,
		description: fm.description!,
		slug: fm.slug!,
		categorySlug: fm.categorySlug!,
		categoryName: fm.categoryName!,
		service: fm.service,
		publishedAt: fm.publishedAt!,
		updatedAt: fm.updatedAt!,
		relatedSlugs: Array.isArray(fm.relatedSlugs) ? (fm.relatedSlugs.filter((x) => typeof x === "string") as string[]) : [],
		faq: Array.isArray(fm.faq)
			? (fm.faq
					.map((x) => (typeof x === "object" && x ? x : null))
					.filter(Boolean) as Array<{ question: string; answer: string }> )
			: [],
		keywords: Array.isArray(fm.keywords) ? (fm.keywords.filter((x) => typeof x === "string") as string[]) : []
	};
}

export async function getAllPosts(): Promise<BlogPost[]> {
	let files: string[] = [];
	try {
		files = await walkDir(blogRoot);
	} catch {
		return [];
	}

	const posts: BlogPost[] = [];
	for (const file of files) {
		const raw = await readFile(file, "utf8");
		const parsed = matter(raw);
		const frontmatter = normalizeFrontmatter(parsed.data, file);
		posts.push({ ...frontmatter, content: parsed.content, sourcePath: file });
	}

	posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
	return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
	const posts = await getAllPosts();
	return posts.find((p) => p.slug === slug);
}

export async function getAllCategories() {
	const posts = await getAllPosts();
	const bySlug = new Map<string, { slug: string; name: string; count: number }>();
	for (const c of blogCategories) {
		bySlug.set(c.slug, { slug: c.slug, name: c.name, count: 0 });
	}
	for (const p of posts) {
		const item = bySlug.get(p.categorySlug);
		if (item) item.count += 1;
		else bySlug.set(p.categorySlug, { slug: p.categorySlug, name: p.categoryName, count: 1 });
	}
	return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name, "cs"));
}

export async function getPostsByCategorySlug(categorySlug: string): Promise<BlogPost[]> {
	const posts = await getAllPosts();
	return posts.filter((p) => p.categorySlug === categorySlug);
}

export async function getSearchIndex(): Promise<
	Array<{
		slug: string;
		title: string;
		description: string;
		categorySlug: string;
		categoryName: string;
		service: BlogService;
		publishedAt: string;
	}>
> {
	const posts = await getAllPosts();
	return posts.map((p) => ({
		slug: p.slug,
		title: p.title,
		description: p.description,
		categorySlug: p.categorySlug,
		categoryName: p.categoryName,
		service: p.service,
		publishedAt: p.publishedAt
	}));
}

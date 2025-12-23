"use client";

import { useMemo, useState } from "react";

type BlogIndexItem = {
	slug: string;
	title: string;
	description: string;
	categorySlug: string;
	categoryName: string;
	service: "elektro" | "manzel";
	publishedAt: string;
};

function normalize(text: string) {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.trim();
}

export default function BlogSearch(props: { items: BlogIndexItem[] }) {
	const { items } = props;
	const [query, setQuery] = useState("");

	const results = useMemo(() => {
		const q = normalize(query);
		if (!q) return items;
		return items.filter((x) => {
			const hay = normalize(`${x.title} ${x.description} ${x.categoryName}`);
			return hay.includes(q);
		});
	}, [items, query]);

	return (
		<div className="card cardPad">
			<div className="text-base font-bold text-text-primary">Vyhledat článek</div>
			<p className="mt-2 text-sm text-text-muted">
				Zadejte klíčové slovo (např. „chránič“, „výpadek“, „montáž nábytku“).
			</p>
			<input
				className="mt-3 w-full rounded-lg border border-line bg-background-card px-4 py-3 text-text-primary"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Hledat…"
				aria-label="Vyhledat v blogu"
			/>

			<div className="mt-4 text-sm text-text-muted">Nalezeno: {results.length}</div>

			<div className="mt-4 grid gap-3">
				{results.slice(0, 50).map((p) => (
					<a key={p.slug} className="card cardPad no-underline hover:shadow-md" href={`/blog/${p.slug}/`}>
						<div className="flex items-start justify-between gap-3">
							<div className="min-w-0">
								<div className="text-sm font-extrabold text-text-primary">{p.title}</div>
								<div className="mt-1 text-sm text-text-secondary">{p.description}</div>
							</div>
							<div className="shrink-0 text-right">
								<div className="badge">{p.categoryName}</div>
								<div className="mt-2 text-xs text-text-muted">{p.publishedAt}</div>
							</div>
						</div>
					</a>
				))}
			</div>
		</div>
	);
}

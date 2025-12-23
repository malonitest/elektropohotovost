"use client";

import * as React from "react";

import type { Location } from "../../data/locations";

export default function LocationsSearch(props: { locations: Location[] }) {
	const { locations } = props;
	const [query, setQuery] = React.useState("");

	const filtered = React.useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return locations;
		return locations.filter((l) => l.name.toLowerCase().includes(q) || l.slug.toLowerCase().includes(q));
	}, [locations, query]);

	return (
		<div className="card cardPad">
			<label className="block text-sm font-semibold text-text-primary" htmlFor="q">
				Vyhledávání
			</label>
			<input
				id="q"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Zadejte město/část (např. Černošice)"
				className="mt-2 w-full rounded-lg border border-line bg-white px-4 py-3 text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary-ring"
				autoComplete="off"
			/>

			<div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((l) => (
					<a
						key={l.slug}
						className="card cardPad no-underline hover:shadow-md transition"
						href={`/elektro-pohotovost/${l.slug}/`}
					>
						<div className="text-base font-bold text-text-primary">{l.name}</div>
						<small>/elektro-pohotovost/{l.slug}/</small>
					</a>
				))}
			</div>

			<small className="mt-4 block">Zobrazeno: {filtered.length} / {locations.length}</small>
		</div>
	);
}

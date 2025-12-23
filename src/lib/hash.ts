export function stableHash(input: string): number {
	let hash = 5381;
	for (let i = 0; i < input.length; i++) {
		hash = (hash * 33) ^ input.charCodeAt(i);
	}
	// force unsigned 32-bit
	return hash >>> 0;
}

export function pickVariant<T>(input: string, variants: readonly T[]): T {
	if (variants.length === 0) {
		throw new Error("pickVariant: variants is empty");
	}
	const idx = stableHash(input) % variants.length;
	return variants[idx]!;
}

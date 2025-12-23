export default function JsonLd(props: { graph: unknown[] }) {
	const { graph } = props;
	if (!Array.isArray(graph) || graph.length === 0) return null;

	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": graph
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
		/>
	);
}

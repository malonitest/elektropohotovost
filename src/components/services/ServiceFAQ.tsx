import { buildFaqPage } from "../../lib/jsonld";
import JsonLd from "../ui/JsonLd";

export type ServiceFaqItem = {
	question: string;
	answer: string;
};

export default function ServiceFAQ(props: {
	canonical: string;
	title?: string;
	kicker?: string;
	lead?: string;
	items: ServiceFaqItem[];
	includeSchema?: boolean;
}) {
	const { canonical, title = "FAQ", kicker, lead, items, includeSchema = true } = props;

	const graph = includeSchema ? [buildFaqPage(canonical, items)] : [];

	return (
		<section className="section" aria-label={title}>
			{includeSchema ? <JsonLd graph={graph} /> : null}

			<div className="sectionHeader">
				{typeof kicker === "string" && kicker.trim() ? (
					<div className="sectionKicker">{kicker}</div>
				) : null}
				<h2 className="sectionTitle">{title}</h2>
				{typeof lead === "string" && lead.trim() ? <p className="sectionLead">{lead}</p> : null}
			</div>

			<div className="card cardPad">
				{items.map((q) => (
					<details key={q.question} className="faqItem">
						<summary className="faqQuestion">
							<span>{q.question}</span>
							<span className="faqChevron">▾</span>
						</summary>
						<div className="faqAnswer">{q.answer}</div>
					</details>
				))}
			</div>
		</section>
	);
}

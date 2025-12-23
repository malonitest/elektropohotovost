import * as React from "react";

export default function Section(
	props: React.PropsWithChildren<{
		kicker?: string;
		title: string;
		lead?: string;
		titleAs?: "h1" | "h2" | "h3";
	}>
) {
	const { kicker, title, lead, titleAs = "h2", children } = props;
	const TitleTag = titleAs as keyof React.JSX.IntrinsicElements;
	return (
		<section className="section">
			<div className="sectionHeader">
				{kicker ? <div className="sectionKicker">{kicker}</div> : null}
				<TitleTag className="sectionTitle">{title}</TitleTag>
				{lead ? <p className="sectionLead">{lead}</p> : null}
			</div>
			{children}
		</section>
	);
}

import * as React from "react";

export default function Section(
	props: React.PropsWithChildren<{
		kicker?: string;
		title: string;
		lead?: string;
	}>
) {
	const { kicker, title, lead, children } = props;
	return (
		<section className="section">
			<div className="sectionHeader">
				{kicker ? <div className="sectionKicker">{kicker}</div> : null}
				<h2 className="sectionTitle">{title}</h2>
				{lead ? <p className="sectionLead">{lead}</p> : null}
			</div>
			{children}
		</section>
	);
}

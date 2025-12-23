import * as React from "react";

export default function SafetyAlert(props: {
	title: string;
	children: React.ReactNode;
}) {
	const { title, children } = props;
	return (
		<div className="safetyCallout cardPad">
			<div className="safetyCalloutTitle">{title}</div>
			<div className="safetyCalloutText">{children}</div>
		</div>
	);
}

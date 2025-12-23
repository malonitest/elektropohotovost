import * as React from "react";

export default function Card(
	props: React.PropsWithChildren<{ title?: string; className?: string }>
) {
	const { title, children, className } = props;
	return (
		<div className={["card cardPad", className].filter(Boolean).join(" ")}>
			{title ? <div className="text-base font-bold text-text-primary">{title}</div> : null}
			<div className={title ? "mt-2" : ""}>{children}</div>
		</div>
	);
}

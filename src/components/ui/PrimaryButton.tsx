import * as React from "react";

export default function PrimaryButton(
	props: React.PropsWithChildren<{ href: string; className?: string }>
) {
	const { href, className, children } = props;
	return (
		<a href={href} className={["btnPrimary", className].filter(Boolean).join(" ")}
		>
			{children}
		</a>
	);
}

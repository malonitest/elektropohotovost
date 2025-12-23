import * as React from "react";

import Card from "../ui/Card";
import SafetyAlert from "../ui/SafetyAlert";

export const mdxComponents = {
	Card,
	SafetyAlert,
	ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
		<ul {...props} className={`mt-3 space-y-2 text-text-secondary ${props.className || ""}`} />
	),
	ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
		<ol {...props} className={`mt-3 space-y-2 text-text-secondary list-decimal pl-5 ${props.className || ""}`} />
	),
	p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p {...props} className={`text-base leading-7 text-text-secondary ${props.className || ""}`} />
	),
	a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
		<a {...props} className={`text-primary underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500 ${props.className || ""}`} />
	)
};

import Card from "../ui/Card";
import type { ReactNode } from "react";

export default function ServiceCard(props: {
	title: string;
	children: ReactNode;
	className?: string;
}) {
	const { title, children, className } = props;
	return (
		<div className={className}>
			<Card title={title}>{children}</Card>
		</div>
	);
}

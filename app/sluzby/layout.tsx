import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteName } from "../../src/data/site";

export const metadata: Metadata = {
	title: {
		default: `Služby | ${siteName}`,
		template: `%s | ${siteName}`
	}
};

export default function ServicesLayout(props: { children: ReactNode }) {
	return props.children;
}

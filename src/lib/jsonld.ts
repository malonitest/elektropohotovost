import type { Area } from "../data/areas";
import type { Location } from "../data/locations";
import { email, phone, siteName } from "../data/site";
import type { FaqItem } from "./content";

export type BreadcrumbItem = { name: string; url: string };

function openingHoursSpecification() {
	return {
		"@type": "OpeningHoursSpecification",
		dayOfWeek: [
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
			"Sunday"
		],
		opens: "00:00",
		closes: "23:59"
	};
}

export function buildLocalBusiness(url: string, areaServedName: string) {
	const business: Record<string, unknown> = {
		"@type": "LocalBusiness",
		"@id": `${url}#business`,
		name: siteName,
		url,
		areaServed: {
			"@type": "AdministrativeArea",
			name: areaServedName
		},
		openingHoursSpecification: openingHoursSpecification()
	};

	if (typeof phone === "string" && phone.trim()) business.telephone = phone.trim();
	if (typeof email === "string" && email.trim()) business.email = email.trim();

	return business;
}

export function buildService(url: string, placeName: string) {
	return {
		"@type": "Service",
		"@id": `${url}#service`,
		name: `Elektro pohotovost ${placeName} – elektrikář 24/7`,
		serviceType: "Havarijní opravy elektro / elektrikář nonstop 24/7",
		provider: { "@id": `${url}#business` },
		areaServed: { "@type": "Place", name: placeName }
	};
}

export function buildBreadcrumbList(url: string, items: BreadcrumbItem[]) {
	return {
		"@type": "BreadcrumbList",
		"@id": `${url}#breadcrumbs`,
		itemListElement: items.map((it, idx) => ({
			"@type": "ListItem",
			position: idx + 1,
			name: it.name,
			item: it.url
		}))
	};
}

export function buildFaqPage(url: string, faq: FaqItem[]) {
	return {
		"@type": "FAQPage",
		"@id": `${url}#faq`,
		mainEntity: faq.map((q) => ({
			"@type": "Question",
			name: q.question,
			acceptedAnswer: { "@type": "Answer", text: q.answer }
		}))
	};
}

export function graphForAreaPage(params: {
	url: string;
	area: Area;
	breadcrumbs: BreadcrumbItem[];
	faq: FaqItem[];
}) {
	const { url, area, breadcrumbs, faq } = params;
	return [
		buildLocalBusiness(url, area.name),
		buildService(url, area.name),
		buildBreadcrumbList(url, breadcrumbs),
		buildFaqPage(url, faq)
	];
}

export function graphForLocationPage(params: {
	url: string;
	area: Area;
	location: Location;
	breadcrumbs: BreadcrumbItem[];
	faq: FaqItem[];
}) {
	const { url, area, location, breadcrumbs, faq } = params;
	return [
		buildLocalBusiness(url, area.name),
		buildService(url, location.name),
		buildBreadcrumbList(url, breadcrumbs),
		buildFaqPage(url, faq)
	];
}

export function graphForGenericPage(params: {
	url: string;
	placeName: string;
	areaServedName: string;
	breadcrumbs: BreadcrumbItem[];
	faq?: FaqItem[];
}) {
	const { url, placeName, areaServedName, breadcrumbs, faq = [] } = params;
	const graph = [
		buildLocalBusiness(url, areaServedName),
		buildService(url, placeName),
		buildBreadcrumbList(url, breadcrumbs)
	];
	if (faq.length) graph.push(buildFaqPage(url, faq));
	return graph;
}

export function graphForProblemHubPage(params: { url: string; breadcrumbs: BreadcrumbItem[] }) {
	const { url, breadcrumbs } = params;
	return [buildBreadcrumbList(url, breadcrumbs)];
}

export function graphForProblemPage(params: {
	url: string;
	breadcrumbs: BreadcrumbItem[];
	faq: FaqItem[];
}) {
	const { url, breadcrumbs, faq } = params;
	return [buildBreadcrumbList(url, breadcrumbs), buildFaqPage(url, faq)];
}

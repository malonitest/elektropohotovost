import type { Area } from "../data/areas";
import type { Location } from "../data/locations";
import { baseUrl, businessAddress, businessName, email, googleBusinessProfileUrl, phone, siteName } from "../data/site";
import type { FaqItem } from "./content";
import { absoluteUrl } from "./urls";

export type BreadcrumbItem = { name: string; url: string };

const businessId = `${baseUrl}#business`;
const websiteId = `${baseUrl}#website`;

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
		"@id": businessId,
		name: businessName,
		alternateName: siteName,
		url: baseUrl,
		image: [
			absoluteUrl("/og-images/default.svg"),
			absoluteUrl("/og-images/homepage.svg")
		],
		priceRange: "500 Kč - 5000 Kč",
		address: {
			"@type": "PostalAddress",
			streetAddress: businessAddress.streetAddress,
			addressLocality: businessAddress.addressLocality,
			postalCode: businessAddress.postalCode,
			addressCountry: businessAddress.addressCountry
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: "49.9167",
			longitude: "14.1833"
		},
		areaServed: {
			"@type": "GeoCircle",
			geoMidpoint: {
				"@type": "GeoCoordinates",
				latitude: "50.0755",
				longitude: "14.4378"
			},
			geoRadius: "50000"
		},
		openingHoursSpecification: openingHoursSpecification(),
		paymentAccepted: "Cash, Card",
		currenciesAccepted: "CZK"
	};

	if (typeof phone === "string" && phone.trim()) business.telephone = phone.trim();
	if (typeof email === "string" && email.trim()) business.email = email.trim();
	if (typeof googleBusinessProfileUrl === "string" && googleBusinessProfileUrl.trim()) {
		business.sameAs = [googleBusinessProfileUrl.trim()];
		business.hasMap = googleBusinessProfileUrl.trim();
	}

	return business;
}

export function buildWebSite() {
	return {
		"@type": "WebSite",
		"@id": websiteId,
		url: baseUrl,
		name: siteName
	};
}

export function buildOrganization() {
	const org: Record<string, unknown> = {
		"@type": "Organization",
		"@id": `${baseUrl}#organization`,
		name: businessName,
		url: baseUrl,
		logo: {
			"@type": "ImageObject",
			url: absoluteUrl("/og-images/default.svg")
		}
	};

	if (typeof phone === "string" && phone.trim()) org.telephone = phone.trim();
	if (typeof email === "string" && email.trim()) org.email = email.trim();
	if (typeof googleBusinessProfileUrl === "string" && googleBusinessProfileUrl.trim()) {
		org.sameAs = [googleBusinessProfileUrl.trim()];
	}

	return org;
}

export function buildService(url: string, placeName: string) {
	const phoneNumber = typeof phone === "string" ? phone.replace(/\s+/g, "") : "";
	const formattedPhone = phoneNumber ? `+420${phoneNumber}` : "";

	return {
		"@type": "Service",
		"@id": `${url}#service`,
		name: `Elektro pohotovost ${placeName} – elektrikář 24/7`,
		description: "Havarijní opravy elektro, výpadky proudu, zkraty, jističe a chrániče. NONSTOP 24/7.",
		image: absoluteUrl("/og-images/services.svg"),
		serviceType: "Emergency Electrical Repair",
		provider: { "@id": businessId },
		areaServed: { "@type": "Place", name: placeName },
		offers: {
			"@type": "Offer",
			priceCurrency: "CZK",
			price: "800",
			priceSpecification: {
				"@type": "UnitPriceSpecification",
				price: "800",
				priceCurrency: "CZK",
				referenceQuantity: {
					"@type": "QuantitativeValue",
					value: "1",
					unitText: "hour"
				}
			}
		},
		availableChannel: formattedPhone ? {
			"@type": "ServiceChannel",
			servicePhone: {
				"@type": "ContactPoint",
				telephone: formattedPhone,
				availableLanguage: "cs"
			}
		} : undefined
	};
}

export function buildPlace(
	location: { 
		name: string; 
		coordinates?: { latitude: number; longitude: number };
	}, 
	url: string
) {
	if (!location.coordinates) return null;

	const place: Record<string, unknown> = {
		"@type": "Place",
		"@id": `${url}#place`,
		name: location.name,
		geo: {
			"@type": "GeoCoordinates",
			latitude: String(location.coordinates.latitude),
			longitude: String(location.coordinates.longitude)
		},
		address: {
			"@type": "PostalAddress",
			addressLocality: location.name,
			addressCountry: "CZ"
		}
	};

	return place;
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

export function buildBlogPosting(params: {
	url: string;
	headline: string;
	description: string;
	datePublished: string;
	dateModified: string;
	authorName: string;
	authorUrl?: string;
	keywords?: string[];
	categoryName?: string;
	wordCount?: number;
}) {
	const { url, headline, description, datePublished, dateModified, authorName, authorUrl, keywords, categoryName, wordCount } = params;

	const author: Record<string, unknown> = {
		"@type": "Organization",
		name: authorName
	};
	if (authorUrl && authorUrl.trim()) author.url = authorUrl.trim();

	const posting: Record<string, unknown> = {
		"@type": "BlogPosting",
		"@id": `${url}#post`,
		mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
		headline,
		description,
		image: absoluteUrl("/og-images/blog.svg"),
		datePublished,
		dateModified,
		author,
		publisher: { "@id": businessId }
	};

	if (keywords && keywords.length > 0) {
		posting.keywords = keywords;
	}

	if (categoryName && categoryName.trim()) {
		posting.articleSection = categoryName.trim();
	}

	if (wordCount && wordCount > 0) {
		posting.wordCount = wordCount;
	}

	return posting;
}

export function buildWebPage(params: {
	url: string;
	name: string;
	description?: string;
}) {
	const { url, name, description } = params;
	const page: Record<string, unknown> = {
		"@type": "WebPage",
		"@id": `${url}#webpage`,
		url,
		name,
		isPartOf: { "@id": websiteId }
	};
	if (description && description.trim()) page.description = description.trim();
	return page;
}

export function graphForAreaPage(params: {
	url: string;
	area: Area;
	breadcrumbs: BreadcrumbItem[];
	faq: FaqItem[];
}) {
	const { url, area, breadcrumbs, faq } = params;
	return [
		buildWebSite(),
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
		buildWebSite(),
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
		buildWebSite(),
		buildLocalBusiness(url, areaServedName),
		buildService(url, placeName),
		buildBreadcrumbList(url, breadcrumbs)
	];
	if (faq.length) graph.push(buildFaqPage(url, faq));
	return graph;
}

export function graphForLocationLandingPage(params: {
	url: string;
	placeName: string;
	pageName: string;
	pageDescription: string;
	breadcrumbs?: BreadcrumbItem[];
	faq: FaqItem[];
	location?: { 
		name: string; 
		coordinates?: { latitude: number; longitude: number };
	};
}) {
	const { url, placeName, pageName, pageDescription, breadcrumbs = [], faq, location } = params;
	const graph = [
		buildWebSite(),
		buildLocalBusiness(url, placeName),
		buildFaqPage(url, faq),
		buildWebPage({ url, name: pageName, description: pageDescription })
	];
	
	// Add Place schema with GPS coordinates for location pages
	if (location) {
		const place = buildPlace(location, url);
		if (place) graph.push(place);
	}
	
	if (breadcrumbs.length) graph.push(buildBreadcrumbList(url, breadcrumbs));
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

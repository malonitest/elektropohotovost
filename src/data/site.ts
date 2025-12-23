export const siteName = "Elektro pohotovost" as const;

// Doplňte před publikováním (canonical + sitemap vyžadují absolutní URL).
// V Azure Static Web Apps nastavte proměnnou prostředí: PUBLIC_BASE_URL
const env = (import.meta as any)?.env as Record<string, string> | undefined;

export const baseUrl = (
	env?.PUBLIC_BASE_URL || process.env.PUBLIC_BASE_URL || "https://example.com"
)
	.replace(/\/$/, "") as string;

// Kontakty – bez vymyšlených údajů. Doplňte vlastní.
export const phone = (env?.PUBLIC_PHONE || process.env.PUBLIC_PHONE || "") as string;
export const email = (env?.PUBLIC_EMAIL || process.env.PUBLIC_EMAIL || "") as string;

export const serviceHours = "Nonstop 24/7" as const;

export const brandRegionText =
	"Praha-západ, západní Praha, Beroun a okolí" as const;

export const defaultResponseTimeText =
	"Obvykle vyjíždíme v řádu desítek minut podle dopravy a vytížení." as const;

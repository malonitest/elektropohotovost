export const siteName = "Elektro pohotovost" as const;

// Ověřené firemní údaje (používáme i v JSON-LD). Pokud je potřebujete měnit per-env,
// můžete je přepsat proměnnými prostředí.
export const businessName = "Maloni sro" as const;
export const businessAddress = {
	streetAddress: "U vodoteče 149",
	addressLocality: "Vysoký Újezd",
	postalCode: "26716",
	addressCountry: "CZ"
} as const;
export const googleBusinessProfileUrl =
	"https://www.google.com/search?q=Maloni&stick=H4sIAAAAAAAA_-NgU1I1qEg0MDa3sEyztDSzTDQyTzG2MqhIMU9NSza0SDY3SklOTTGzXMTK5puYk5-XCQCeyS9ZMgAAAA&hl=cs&mat=CUpwxJcgq6IvElcBTVDHnnMLCo1ugG0zkZX--FHWw8Wpk99TiDa1AMITyoUnKx5oR9j3qRI1r_lfIsyrdtzgnvPUQUrVSxpCYCMASWrfdVpX9BTKYTXBGYWvFBb6b3HVRnY&authuser=0" as const;

// Doplňte před publikováním (canonical + sitemap vyžadují absolutní URL).
// V Azure Static Web Apps nastavte proměnnou prostředí: PUBLIC_BASE_URL
const env = (import.meta as any)?.env as Record<string, string> | undefined;

export const baseUrl = (
	env?.PUBLIC_BASE_URL || process.env.PUBLIC_BASE_URL || "https://example.com"
)
	.replace(/\/$/, "") as string;

// Kontakty – bez vymyšlených údajů. Doplňte vlastní.
export const phone = (env?.PUBLIC_PHONE || process.env.PUBLIC_PHONE || "774 621 763") as string;
export const email = (env?.PUBLIC_EMAIL || process.env.PUBLIC_EMAIL || "") as string;

export const serviceHours = "Nonstop 24/7" as const;

export const brandRegionText =
	"Praha-západ, západní Praha, Beroun a okolí" as const;

export const defaultResponseTimeText =
	"Obvykle vyjíždíme v řádu desítek minut podle dopravy a vytížení." as const;

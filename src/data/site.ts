export const siteName = "Elektro pohotovost" as const;

// Ověřené firemní údaje (používáme i v JSON-LD). Pokud je potřebujete měnit per-env,
// můžete je přepsat proměnnými prostředí.
export const businessName = "Maloni s.r.o." as const;
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
// (pro Next.js klientské použití lze použít i NEXT_PUBLIC_BASE_URL).
const env = process.env as Record<string, string | undefined>;

const rawBaseUrl = (env.NEXT_PUBLIC_BASE_URL || env.PUBLIC_BASE_URL || "https://example.com").replace(
	/\/$/,
	""
);

function assertValidBaseUrlForBuild(value: string) {
	if (process.env.NODE_ENV !== "production") return;

	const fromEnv = Boolean(env.NEXT_PUBLIC_BASE_URL || env.PUBLIC_BASE_URL);
	if (!fromEnv) {
		throw new Error(
			"Missing PUBLIC_BASE_URL (or NEXT_PUBLIC_BASE_URL). Static export bakes absolute canonicals/sitemap at build-time. Example: https://www.elektropohotovost24.cz"
		);
	}

	if (value === "https://example.com") {
		throw new Error(
			"PUBLIC_BASE_URL/NEXT_PUBLIC_BASE_URL must not be https://example.com. Set it to your real domain, e.g. https://www.elektropohotovost24.cz"
		);
	}

	let parsed: URL;
	try {
		parsed = new URL(value);
	} catch {
		throw new Error(
			`PUBLIC_BASE_URL/NEXT_PUBLIC_BASE_URL must be a valid absolute URL (got: ${value}). Example: https://www.elektropohotovost24.cz`
		);
	}

	const isLocalhost = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
	if (!isLocalhost && parsed.protocol !== "https:") {
		throw new Error(
			`PUBLIC_BASE_URL/NEXT_PUBLIC_BASE_URL must use https in production (got: ${value}). Example: https://www.elektropohotovost24.cz`
		);
	}
}

assertValidBaseUrlForBuild(rawBaseUrl);

export const baseUrl = rawBaseUrl as string;

// Kontakty – bez vymyšlených údajů. Doplňte vlastní.
export const phone = (env.NEXT_PUBLIC_PHONE || env.PUBLIC_PHONE || "774 621 763") as string;
export const email = (env.NEXT_PUBLIC_EMAIL || env.PUBLIC_EMAIL || "") as string;

export const serviceHours = "Nonstop 24/7" as const;

export const brandRegionText =
	"Praha-západ, západní Praha, Beroun a okolí" as const;

export const defaultResponseTimeText =
	"Obvykle vyjíždíme v řádu desítek minut podle dopravy a vytížení." as const;

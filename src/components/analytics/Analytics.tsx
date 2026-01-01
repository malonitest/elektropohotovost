"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import MicrosoftClarity from "./MicrosoftClarity";

type ConsentState = "unknown" | "granted" | "denied";

const CONSENT_KEY = "analytics_consent";
const CONSENT_COOKIE = "analytics_consent";
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // ~180 days

function readCookie(name: string) {
	if (typeof document === "undefined") return "";
	const match = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}=([^;]*)`));
	return match ? decodeURIComponent(match[1]) : "";
}

function writeCookie(name: string, value: string) {
	if (typeof document === "undefined") return;
	document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
}

function readStoredConsent(): ConsentState {
	if (typeof window === "undefined") return "unknown";

	try {
		const fromLocalStorage = window.localStorage.getItem(CONSENT_KEY);
		if (fromLocalStorage === "granted" || fromLocalStorage === "denied") return fromLocalStorage;
	} catch {
		// ignore
	}

	const fromCookie = readCookie(CONSENT_COOKIE);
	if (fromCookie === "granted" || fromCookie === "denied") return fromCookie;

	return "unknown";
}

function persistConsent(value: Exclude<ConsentState, "unknown">) {
	try {
		window.localStorage.setItem(CONSENT_KEY, value);
	} catch {
		// ignore
	}
	writeCookie(CONSENT_COOKIE, value);
}

export default function Analytics({
	clarityId,
	phone
}: {
	clarityId: string;
	phone: string;
}) {
	const [consent, setConsent] = useState<ConsentState>("unknown");
	const clarityEnabled = useMemo(() => consent === "granted", [consent]);

	useEffect(() => {
		setConsent(readStoredConsent());
	}, []);

	const allowAnalytics = useCallback(() => {
		persistConsent("granted");
		setConsent("granted");
	}, []);

	const denyAnalytics = useCallback(() => {
		persistConsent("denied");
		setConsent("denied");
	}, []);

	return (
		<>
			<MicrosoftClarity clarityId={clarityId} phone={phone} enabled={clarityEnabled} />
+
			{consent === "unknown" ? (
				<div className="fixed bottom-0 left-0 right-0 z-[60] border-t border-line bg-background/95 backdrop-blur">
					<div className="container-app flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
						<div className="min-w-0">
							<div className="text-sm font-bold text-text-primary">Souhlas s analytikou</div>
							<div className="mt-1 text-sm text-text-secondary">
								Používáme Microsoft Clarity pro zlepšování webu. Povolením pomůžete měřit návštěvnost a kliknutí (např. na tlačítko volání).
							</div>
						</div>
						<div className="flex shrink-0 flex-wrap gap-2">
							<button type="button" className="btnSecondary" onClick={denyAnalytics}>
								Odmítnout
							</button>
							<button type="button" className="btnPrimary" onClick={allowAnalytics}>
								Povolit
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}

"use client";

import Script from "next/script";
import { useEffect, useMemo } from "react";

declare global {
	interface Window {
		clarity?: (...args: any[]) => void;
	}
}

function normalizeDigits(value: string) {
	return String(value || "").replace(/\D+/g, "");
}

function extractTelDigitsFromHref(href: string) {
	if (!href) return "";
	const trimmed = href.trim();
	if (!trimmed.toLowerCase().startsWith("tel:")) return "";
	return normalizeDigits(trimmed.slice(4));
}

export default function MicrosoftClarity({
	clarityId,
	phone,
	enabled
}: {
	clarityId: string;
	phone: string;
	enabled: boolean;
}) {
	const phoneDigits = useMemo(() => normalizeDigits(phone), [phone]);

	useEffect(() => {
		if (!enabled) return;
		if (!phoneDigits) return;

		function onClick(event: MouseEvent) {
			const target = event.target as HTMLElement | null;
			const link = target?.closest?.("a") as HTMLAnchorElement | null;
			const href = link?.getAttribute("href") || "";
			const clickedDigits = extractTelDigitsFromHref(href);
			if (!clickedDigits) return;

			if (typeof window.clarity === "function") {
				window.clarity("set", "call_phone", clickedDigits);
				window.clarity("event", "tel_click");
				if (phoneDigits && clickedDigits === phoneDigits) {
					window.clarity("event", "volete_774621763_click");
				}
			}
		}

		document.addEventListener("click", onClick, true);
		return () => document.removeEventListener("click", onClick, true);
	}, [enabled, phoneDigits]);

	return (
		<>
			{enabled ? (
				<Script
					id="microsoft-clarity"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `(function(c,l,a,r,i,t,y){\n    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n    t=l.createElement(r);t.async=1;t.src=\"https://www.clarity.ms/tag/\"+i;\n    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\n})(window, document, \"clarity\", \"script\", \"${clarityId}\");`
					}}
				/>
			) : null}
		</>
	);
}

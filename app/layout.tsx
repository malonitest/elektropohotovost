import type { Metadata } from "next";
import "./globals.css";

import SiteFooter from "../src/components/ui/Footer";

import { baseUrl, businessName, phone, serviceHours, siteName } from "../src/data/site";

export const metadata: Metadata = {
	title: {
		default: siteName,
		template: `%s | ${siteName}`
	},
	description: "Elektro pohotovost NONSTOP 24/7 – havarijní elektrikář.",
	metadataBase: new URL(baseUrl)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const tel = String(phone || "").replace(/\s+/g, "");
	const telHref = tel ? `tel:${tel}` : undefined;

	return (
		<html lang="cs">
			<body>
				<header className="siteHeader">
					<div className="container-app">
						<div className="siteNav">
							<div className="min-w-0">
								<div className="text-sm font-extrabold text-text-primary truncate">
									{businessName} – {siteName}
								</div>
								<div className="text-xs text-text-muted">{serviceHours}</div>
							</div>
							<nav className="navLinks" aria-label="Hlavní navigace">
								<a className="navLink" href="/lokality/">Lokality</a>
								<details className="navDropdown relative">
									<summary className="navLink cursor-pointer list-none select-none">
										<span className="inline-flex items-center gap-1">
											Služby <span aria-hidden>▾</span>
										</span>
									</summary>
									<div className="navDropdownMenu">
										<a className="navDropdownItem" href="/sluzby/elektro-pohotovost/">
											Elektro pohotovost NONSTOP
										</a>
										<a className="navDropdownItem" href="/sluzby/hodinovy-manzel/">
											Hodinový manžel
										</a>
									</div>
								</details>
								<a className="navLink" href="/blog/">Blog</a>
								<a className="navLink" href="/faq/">FAQ</a>
								<a className="navLink" href="/cenik/">Ceník</a>
								<a className="navLink" href="/kontakt/">Kontakt</a>
							</nav>
							{telHref ? (
								<a className="btnPrimary hidden sm:inline-flex" href={telHref}>
									Volejte: {phone}
								</a>
							) : null}
						</div>
					</div>
				</header>

				<main className="container-app">{children}</main>

				<SiteFooter />

				{telHref ? (
					<div className="mobileCallBar sm:hidden">
						<div className="mobileCallBarInner">
							<div className="min-w-0">
								<div className="text-sm font-bold text-text-primary truncate">Elektro pohotovost</div>
								<div className="text-xs text-text-muted">{serviceHours}</div>
							</div>
							<a className="btnPrimary tap" href={telHref}>
								Volejte
							</a>
						</div>
					</div>
				) : null}
			</body>
		</html>
	);
}

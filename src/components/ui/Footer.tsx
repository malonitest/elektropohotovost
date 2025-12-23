import { businessAddress, businessName, googleBusinessProfileUrl, phone, siteName } from "../../data/site";

export default function SiteFooter() {
	const tel = String(phone || "").replace(/\s+/g, "");
	return (
		<footer className="mt-16 border-t border-line bg-text-primary text-white">
			<div className="container-app py-10">
				<div className="grid gap-8 md:grid-cols-4">
					<div>
						<div className="text-base font-extrabold">{businessName}</div>
						<div className="mt-2 text-sm text-white">{siteName} – Elektro pohotovost NONSTOP 24/7</div>
					</div>
					<div>
						<div className="text-sm font-bold">Odkazy</div>
						<div className="mt-2 space-y-2 text-sm text-white">
							<a className="block text-white no-underline hover:underline hover:decoration-white/60" href="/lokality/">
								Lokality
							</a>
							<a className="block text-white no-underline hover:underline hover:decoration-white/60" href="/sluzby/">
								Služby
							</a>
							<a className="block text-white no-underline hover:underline hover:decoration-white/60" href="/faq/">
								FAQ
							</a>
							<a className="block text-white no-underline hover:underline hover:decoration-white/60" href="/cenik/">
								Ceník
							</a>
							<a className="block text-white no-underline hover:underline hover:decoration-white/60" href="/legal/">
								Právní informace
							</a>
						</div>
					</div>
					<div>
						<div className="text-sm font-bold">Kontakt</div>
						<div className="mt-2 text-sm text-white">
							{tel ? (
								<a
									className="text-white no-underline underline-offset-4 decoration-white/60 hover:decoration-white"
									href={`tel:${tel}`}
								>
									{phone}
								</a>
							) : (
								"Telefon doplňte v konfiguraci"
							)}
						</div>
						{googleBusinessProfileUrl ? (
							<a className="mt-2 inline-block text-sm text-white no-underline hover:underline hover:decoration-white/60" href={googleBusinessProfileUrl}>
								Google profil
							</a>
						) : null}
					</div>
					<div>
						<div className="text-sm font-bold">Adresa</div>
						<div className="mt-2 text-sm text-white">
							{businessAddress.streetAddress}, {businessAddress.addressLocality} {businessAddress.postalCode}
						</div>
					</div>
				</div>
				<div className="mt-10 text-xs text-white">© {new Date().getFullYear()} {businessName}</div>
			</div>
		</footer>
	);
}

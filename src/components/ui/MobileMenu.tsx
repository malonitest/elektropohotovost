"use client";

import { useEffect, useId, useState } from "react";

type Props = {
	phoneLabel?: string;
	telHref?: string;
};

export default function MobileMenu(props: Props) {
	const { phoneLabel, telHref } = props;
	const [open, setOpen] = useState(false);
	const panelId = useId();

	useEffect(() => {
		if (!open) return;
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [open]);

	return (
		<>
			<button
				type="button"
				className="btnSecondary sm:hidden"
				aria-haspopup="dialog"
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((value) => !value)}
			>
				Menu
			</button>

			{open ? (
				<div
					className="fixed inset-0 z-[70] bg-background/80 backdrop-blur"
					role="dialog"
					aria-modal="true"
					id={panelId}
					onClick={(event) => {
						if (event.target === event.currentTarget) setOpen(false);
					}}
				>
					<div className="container-app py-4">
						<div className="card cardPad">
							<div className="flex items-center justify-between gap-3">
								<div className="text-base font-extrabold text-text-primary">Menu</div>
								<button type="button" className="btnSecondary" onClick={() => setOpen(false)}>
									Zavřít
								</button>
							</div>

							<nav className="mt-4 grid gap-2" aria-label="Mobilní navigace">
								<a className="navLink" href="/lokality/" onClick={() => setOpen(false)}>
									Lokality
								</a>
								<details className="navDropdown">
									<summary className="navLink cursor-pointer list-none select-none">Služby ▾</summary>
									<div className="mt-2 grid gap-1">
										<a className="navLink" href="/sluzby/elektro-pohotovost/" onClick={() => setOpen(false)}>
											Elektro pohotovost NONSTOP
										</a>
										<a className="navLink" href="/sluzby/hodinovy-manzel/" onClick={() => setOpen(false)}>
											Hodinový manžel
										</a>
									</div>
								</details>
								<a className="navLink" href="/blog/" onClick={() => setOpen(false)}>
									Blog
								</a>
								<a className="navLink" href="/faq/" onClick={() => setOpen(false)}>
									FAQ
								</a>
								<a className="navLink" href="/cenik/" onClick={() => setOpen(false)}>
									Ceník
								</a>
								<a className="navLink" href="/kontakt/" onClick={() => setOpen(false)}>
									Kontakt
								</a>

								{telHref ? (
									<a className="btnPrimary mt-3" href={telHref} onClick={() => setOpen(false)}>
										Volejte {phoneLabel || ""}
									</a>
								) : null}
							</nav>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}

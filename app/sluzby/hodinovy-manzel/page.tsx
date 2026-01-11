import type { Metadata } from "next";

import JsonLd from "../../../src/components/ui/JsonLd";
import Card from "../../../src/components/ui/Card";
import PrimaryButton from "../../../src/components/ui/PrimaryButton";
import { ServiceHero, ServiceFAQ, ServicePriceBox } from "../../../src/components/services";

import { brandRegionText, phone, siteName } from "../../../src/data/site";
import { absoluteUrl } from "../../../src/lib/urls";
import { buildBreadcrumbList, buildLocalBusiness, buildWebPage } from "../../../src/lib/jsonld";

export const dynamic = "error";

const canonical = absoluteUrl("/sluzby/hodinovy-manzel/");

export const metadata: Metadata = {
	title: `Hodinový manžel – opravy a montáže | ${siteName}`,
	description:
		"Hodinový manžel pro plánované práce: drobné opravy v bytě, montáž nábytku, vrtání a věšení, drobné instalatérské a elektro práce. Praha, Praha-západ, Beroun.",
	alternates: { canonical },
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	openGraph: {
		title: `Hodinový manžel – opravy a montáže | ${siteName}`,
		description:
			"Plánované opravy a montáže s profesionálním přístupem. Hodinový manžel pro domácnosti i byty v regionu Praha, Praha-západ a Beroun.",
		type: "website",
		url: canonical,
		images: [{
			url: "/og-images/services.svg",
			width: 1200,
			height: 630,
			alt: "Hodinový manžel - Opravy a montáže"
		}]
	},
	twitter: {
		card: "summary_large_image",
		title: `Hodinový manžel – opravy a montáže | ${siteName}`,
		description: "Plánované opravy a montáže s professionálním přístupem. Hodinový manžel pro domácnosti i byty.",
		images: ["/og-images/services.svg"]
	}
};

export default function HodinovyManzelPage() {
	const tel = String(phone || "").replace(/\s+/g, "");
	const telHref = tel ? `tel:${tel}` : "/kontakt/";

	const breadcrumbs = [
		{ name: "Domů", url: absoluteUrl("/") },
		{ name: "Služby", url: absoluteUrl("/sluzby/") },
		{ name: "Hodinový manžel", url: canonical }
	];

	const faq = [
		{
			question: "Co všechno zvládne hodinový manžel?",
			answer:
				"Běžné domácí opravy a montáže: sestavení nábytku, upevnění polic, vrtání a věšení, výměna baterií a sifonů, drobné seřízení dveří a kování, menší údržba bytu nebo domu. Pokud je práce specializovaná (např. revize nebo rozsáhlé zásahy do instalací), domluvíme vhodné řešení."
		},
		{
			question: "Jak rychle přijedete?",
			answer:
				"Jde o plánovanou službu — termín domluvíme podle Vašich možností. Pro rychlé domluvení obvykle stačí krátký telefonát, kde upřesníme rozsah práce a potřebný materiál."
		},
		{
			question: "Děláte i elektro?",
			answer:
				"Ano, pouze drobné elektro práce v rámci běžné údržby (např. výměna svítidel nebo vypínačů) — bez revizí a bez havarijní pohotovosti. Havarijní elektro poruchy řešíme odděleně v rámci elektro pohotovosti NONSTOP."
		},
		{
			question: "Jaká je cena?",
			answer:
				"Cenu stanovujeme transparentně podle času a náročnosti. Předem řekneme orientační odhad a minimální účtovanou dobu. Pokud se na místě ukáže něco navíc, vždy se nejdřív domluvíme."
		},
		{
			question: "Přivezete materiál?",
			answer:
				"Ano, drobný materiál můžeme přivézt po domluvě. Ideální je poslat fotku nebo seznam — vyhneme se zbytečným jízdám a práce bude hotová na první návštěvu."
		},
		{
			question: "Pracujete i o víkendu?",
			answer:
				"Dle domluvy ano. Hodinový manžel je plánovaná služba — víkendové termíny řešíme individuálně podle vytížení."
		}
	] as const;

	const jsonLdGraph = [
		buildLocalBusiness(canonical, brandRegionText),
		buildWebPage({
			url: canonical,
			name: "Hodinový manžel – spolehlivé opravy a montáže",
			description:
				"Plánované opravy a montáže v domácnosti s profesionálním přístupem. Drobné práce v bytě, montáž nábytku, vrtání a věšení, drobné instalatérské a elektro práce (bez revizí)."
		}),
		buildBreadcrumbList(
			canonical,
			breadcrumbs.map((b) => ({ ...b, url: b.url }))
		)
	];

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<ServiceHero
				kicker="Plánované práce"
				title="Hodinový manžel – spolehlivé opravy a montáže"
				lead="Precizní práce, férové ceny, profesionální přístup. Pomůžeme s drobnými opravami a montážemi v bytě i domě — bez stresu a bez překvapení."
				primaryCta={{ href: telHref, label: "Objednat službu" }}
				secondaryCta={{ href: "/kontakt/", label: "Kontakt / domluva" }}
				note="Upozornění: havarijní elektro poruchy řešíme samostatně v rámci elektro pohotovosti NONSTOP 24/7."
			/>

			<section className="section">
				<div className="grid gap-4 lg:grid-cols-2">
					<Card title="Kdy se hodí hodinový manžel">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>drobné opravy v bytě</li>
							<li>montáž nábytku</li>
							<li>vrtání, věšení, police</li>
							<li>výměna baterií, sifonů</li>
							<li>opravy dveří a zámků (bez zámečnické pohotovosti)</li>
						</ul>
						<p className="mt-4 text-sm text-text-muted">
							Působíme v regionu: <b className="text-text-primary">Praha, Praha-západ, Beroun</b> (a okolí). Termín je vždy plánovaný.
						</p>
					</Card>

					<Card title="Důležité vymezení služby">
						<p className="mt-2">
							Hodinový manžel je určený pro běžné domácí práce a montáže. Nejde o havarijní výjezdy.
						</p>
						<p className="mt-4">
							<a className="btnSecondary" href="/sluzby/elektro-pohotovost/">
								Elektro pohotovost NONSTOP
							</a>
						</p>
					</Card>
				</div>

				<div className="mt-8">
					<div className="sectionHeader">
						<div className="sectionKicker">Přehled</div>
						<h2 className="sectionTitle">Co umíme zařídit</h2>
						<p className="sectionLead">Vybrané okruhy prací. Pokud je Vaše poptávka na hraně (nebo si nejste jistí), zavolejte — upřesníme vhodný postup.</p>
					</div>
					<div className="grid gap-4 lg:grid-cols-3">
						<Card title="Montáž nábytku">
							<ul className="mt-3 space-y-2 text-text-secondary">
								<li>skříně, komody, postele</li>
								<li>seřízení a dotažení spojů</li>
								<li>bezpečné kotvení po domluvě</li>
							</ul>
						</Card>
						<Card title="Opravy v domácnosti">
							<ul className="mt-3 space-y-2 text-text-secondary">
								<li>drobné opravy a seřízení</li>
								<li>výměna kování, pantů, lišt</li>
								<li>údržba bytových detailů</li>
							</ul>
						</Card>
						<Card title="Drobné instalatérské práce">
							<ul className="mt-3 space-y-2 text-text-secondary">
								<li>výměna baterií a sifonů</li>
								<li>těsnění, drobné opravy</li>
								<li>montáž doplňků po domluvě</li>
							</ul>
						</Card>
						<Card title="Drobné elektro práce">
							<ul className="mt-3 space-y-2 text-text-secondary">
								<li>výměna svítidel, vypínačů</li>
								<li>opravy drobných závad</li>
								<li>bez revizí a bez pohotovosti</li>
							</ul>
							<p className="mt-4 text-sm text-text-muted">U složitějších zásahů doporučíme vhodnou cestu.</p>
						</Card>
						<Card title="Vrtání a věšení">
							<ul className="mt-3 space-y-2 text-text-secondary">
								<li>police, obrazy, držáky</li>
								<li>závěsy, garnýže</li>
								<li>rozumné posouzení podkladu</li>
							</ul>
						</Card>
						<Card title="Údržba bytu / domu">
							<ul className="mt-3 space-y-2 text-text-secondary">
								<li>drobná prevence závad</li>
								<li>kontrola a dotažení</li>
								<li>práce „na seznam“</li>
							</ul>
						</Card>
					</div>
				</div>

				<div className="mt-10 grid gap-4 lg:grid-cols-2">
					<Card title="Jak to funguje">
						<ol className="mt-3 space-y-2 text-text-secondary list-decimal pl-5">
							<li>Objednávka: stručně popíšete, co je potřeba.</li>
							<li>Domluva termínu: sladíme čas, materiál a očekávání.</li>
							<li>Realizace: práce probíhá čistě a s ohledem na byt/dům.</li>
							<li>Úklid po práci: prostor zůstane v pořádku.</li>
						</ol>
						<p className="mt-4 text-sm text-text-muted">
							Pokud je potřeba materiál navíc, vždy ho nejdřív odsouhlasíme.
						</p>
					</Card>

					<ServicePriceBox
						title="Ceník (orientační)"
						lead="Plánované práce oceňujeme podle času a náročnosti. Předem řekneme odhad a podmínky."
						rows={[
							{ label: "Hodinová sazba", value: "750–1 200 Kč / hod" },
							{ label: "Minimální účtovaná doba", value: "2 hod" },
							{ label: "Doprava", value: "dle lokality", note: "upřesníme při domluvě" }
						]}
						disclaimer="Ceny jsou orientační. Konkrétní cenu upřesníme podle rozsahu práce a termínu."
					/>
				</div>

				<div className="mt-10 grid gap-4 lg:grid-cols-2">
					<Card title="Proč Maloni s.r.o.">
						<ul className="mt-3 space-y-2 text-text-secondary">
							<li>zkušený technik</li>
							<li>precizní provedení</li>
							<li>pojištění odpovědnosti (na vyžádání)</li>
							<li>čistá práce</li>
							<li>férové jednání</li>
						</ul>
					</Card>
					<Card title="Kontakt / objednávka">
						<p className="mt-2">
							Nejrychlejší je zavolat a krátce popsat požadavek. Pokud máte fotky, urychlí to domluvu i přípravu.
						</p>
						<div className="mt-4 flex flex-wrap gap-3">
							<PrimaryButton href={telHref}>Objednat službu</PrimaryButton>
							<a className="btnSecondary" href="/kontakt/">
								Kontakt
							</a>
						</div>
					</Card>
				</div>
			</section>

			<ServiceFAQ
				canonical={canonical}
				title="FAQ k hodinovému manželovi"
				kicker="Domluva bez překvapení"
				lead="Aby byla objednávka rychlá a čistá: co umíme, jak domlouváme termíny a jak přistupujeme k materiálu i ceně."
				items={[...faq]}
			/>
		</>
	);
}

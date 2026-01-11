import type { Metadata } from "next";

import JsonLd from "../../src/components/ui/JsonLd";
import Card from "../../src/components/ui/Card";

import { absoluteUrl } from "../../src/lib/urls";
import { buildFaqPage } from "../../src/lib/jsonld";
import { siteName } from "../../src/data/site";

export const dynamic = "error";

const canonical = absoluteUrl("/faq/");

export const metadata: Metadata = {
	title: `FAQ | ${siteName}`,
	description:
		"Časté dotazy k elektro pohotovosti 24/7: dojezd, ceny, jističe/chrániče, bezpečnost a kdy volat distributora.",
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
		title: `FAQ | ${siteName}`,
		description:
			"Časté dotazy k elektro pohotovosti 24/7: dojezd, ceny, jističe/chrániče, bezpečnost a kdy volat distributora.",
		type: "website",
		url: canonical,
		images: [{
			url: "/og-images/default.svg",
			width: 1200,
			height: 630,
			alt: "FAQ - Elektro pohotovost 24/7"
		}]
	},
	twitter: {
		card: "summary_large_image",
		title: `FAQ | ${siteName}`,
		description: "Časté dotazy k elektro pohotovosti 24/7: dojezd, ceny, jističe/chrániče, bezpečnost a kdy volat distributora.",
		images: ["/og-images/default.svg"]
	}
};

const faq = [
	{
		question: "Fungujete nonstop 24/7?",
		answer: "Ano, pohotovost držíme nonstop 24/7 včetně víkendů a svátků."
	},
	{
		question: "Jak rychle můžete přijet?",
		answer:
			"Dojezd závisí na dopravě a vytížení. Konkrétní odhad vždy upřesníme po telefonu podle aktuálního provozu."
	},
	{
		question: "Co dělat, když nejde elektřina?",
		answer:
			"Ověřte, zda nejde o výpadek v domě/okolí. Zkontrolujte jištění (jistič/chránič) a odpojte zátěž. Pokud jištění opakovaně padá, nenahezujte ho opakovaně a volejte."
	},
	{
		question: "Padá proudový chránič – co to znamená?",
		answer:
			"Chránič může vybavit kvůli závadě v okruhu, vlhkosti nebo vadnému spotřebiči. Na místě příčinu dohledáme bezpečnou diagnostikou."
	},
	{
		question: "Je bezpečné nahazovat jistič pořád dokola?",
		answer:
			"Ne. Opakované nahazování může zhoršit přehřívání nebo závadu. Nechte okruh vypnutý, odpojte spotřebiče a zavolejte."
	},
	{
		question: "Řešíte i přehřáté zásuvky nebo zápach z elektro?",
		answer:
			"Ano. To jsou typické havarijní situace. Pokud je to bezpečné, vypněte příslušný okruh a volejte. Při kouři/požáru volejte 150/112."
	},
	{
		question: "Kolik stojí výjezd?",
		answer:
			"Cena se liší podle času a situace. Orientační rozsah sdělíme po telefonu a na místě vždy potvrdíme před zahájením práce."
	},
	{
		question: "Kdy volat distributora místo elektrikáře?",
		answer:
			"Když je výpadek v celé ulici/okolí nebo je závada na zařízení distributora (přípojka, vedení, elektroměr, před hlavním jištěním). Závady v rozvaděči bytu/domu a v okruzích typicky řeší elektrikář."
	},
	{
		question: "Děláte i dokončovací práce po havárii?",
		answer:
			"Ano. Nejprve řešíme bezpečnost a obnovení provozu, následně lze domluvit definitivní opravu nebo úpravy elektroinstalace." 
	}
] as const;

export default function FaqPage() {
	const jsonLdGraph = [buildFaqPage(canonical, [...faq])];

	return (
		<>
			<JsonLd graph={jsonLdGraph} />

			<section className="section">
				<div className="sectionHeader">
					<div className="sectionKicker">Elektro pohotovost 24/7</div>
					<h1 className="sectionTitle">FAQ</h1>
					<p className="sectionLead">Nejčastější dotazy k výjezdu, bezpečnosti a cenám.</p>
				</div>

				<Card title="Časté dotazy">
					<div className="mt-2">
						{faq.map((it) => (
							<details key={it.question} className="faqItem">
								<summary className="faqQuestion">
									<span>{it.question}</span>
									<span className="faqChevron">▾</span>
								</summary>
								<div className="faqAnswer">{it.answer}</div>
							</details>
						))}
					</div>
				</Card>
			</section>
		</>
	);
}

import Section from "../src/components/ui/Section";
import Card from "../src/components/ui/Card";

export default function NotFound() {
	return (
		<Section kicker="404" title="Stránka nebyla nalezena" lead="Odkaz může být starý nebo neplatný.">
			<div className="grid gap-4 lg:grid-cols-2">
				<Card title="Co můžete udělat">
					<ul className="mt-2 space-y-2 text-text-secondary">
						<li>Vraťte se na úvodní stránku.</li>
						<li>Vyhledejte lokalitu v seznamu.</li>
						<li>Kontaktujte nás v případě havárie.</li>
					</ul>
					<div className="mt-4 flex flex-wrap gap-3">
						<a className="btnSecondary" href="/">Domů</a>
						<a className="btnSecondary" href="/lokality/">Lokality</a>
						<a className="btnPrimary" href="/kontakt/">Kontakt</a>
					</div>
				</Card>
				<Card title="Poznámka">
					<p>
						Pokud jste hledali konkrétní lokalitu, může být dočasně bez veřejné publikace.
						Volejte a řekneme aktuální možnosti výjezdu.
					</p>
				</Card>
			</div>
		</Section>
	);
}

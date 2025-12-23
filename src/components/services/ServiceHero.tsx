import PrimaryButton from "../ui/PrimaryButton";

type Cta = {
	href: string;
	label: string;
};

export default function ServiceHero(props: {
	kicker?: string;
	title: string;
	lead: string;
	primaryCta: Cta;
	secondaryCta?: Cta;
	note?: string;
}) {
	const { kicker, title, lead, primaryCta, secondaryCta, note } = props;

	return (
		<section className="section">
			<div className="sectionHeader">
				{kicker ? <div className="sectionKicker">{kicker}</div> : null}
				<h1 className="sectionTitle">{title}</h1>
				<p className="sectionLead">{lead}</p>
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<PrimaryButton href={primaryCta.href}>{primaryCta.label}</PrimaryButton>
				{secondaryCta ? (
					<a className="btnSecondary" href={secondaryCta.href}>
						{secondaryCta.label}
					</a>
				) : null}
			</div>
			{note ? <p className="mt-3 text-sm text-text-muted">{note}</p> : null}
		</section>
	);
}

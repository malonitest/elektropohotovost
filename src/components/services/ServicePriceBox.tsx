export type ServicePriceRow = {
	label: string;
	value: string;
	note?: string;
};

export default function ServicePriceBox(props: {
	title: string;
	lead?: string;
	rows: ServicePriceRow[];
	disclaimer?: string;
}) {
	const { title, lead, rows, disclaimer } = props;

	return (
		<div className="priceBox cardPad">
			<div className="text-base font-bold text-text-primary">{title}</div>
			{lead ? <p className="mt-2 text-sm text-text-muted">{lead}</p> : null}
			<ul className="priceList">
				{rows.map((r) => (
					<li key={r.label} className="priceRow">
						<b>{r.label}</b>
						<span>
							{r.value}
							{r.note ? <span className="block text-xs text-text-muted">{r.note}</span> : null}
						</span>
					</li>
				))}
			</ul>
			{disclaimer ? <p className="mt-3 text-sm text-text-muted">{disclaimer}</p> : null}
		</div>
	);
}

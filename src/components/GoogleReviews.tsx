import Card from "./ui/Card";
import { googleBusinessProfileUrl } from "../data/site";

/**
 * Google Business Profile Reviews Widget
 * 
 * Displays a call-to-action to view and leave reviews on Google Business Profile.
 * This component encourages customers to engage with our GBP listing, which helps
 * with local SEO and provides social proof.
 * 
 * Note: For a live reviews feed, you would need to:
 * 1. Set up Google Places API
 * 2. Create a server-side endpoint to fetch reviews
 * 3. Cache the results to avoid API rate limits
 * 
 * For now, this provides a link to the GBP with visual prominence.
 */
export default function GoogleReviews() {
	if (!googleBusinessProfileUrl) {
		return null;
	}

	return (
		<Card>
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0 flex-1">
					<div className="text-base font-bold text-text-primary">
						Hodnocení zákazníků
					</div>
					<p className="mt-2 text-text-secondary">
						Přečtěte si, co říkají naši zákazníci o našich službách, nebo nám zanechte vlastní hodnocení na Google.
					</p>
					<div className="mt-4 flex flex-wrap gap-3">
						<a 
							className="btnSecondary"
							href={googleBusinessProfileUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							Zobrazit hodnocení
						</a>
						<a 
							className="btnPrimary"
							href={`${googleBusinessProfileUrl}#review`}
							target="_blank"
							rel="noopener noreferrer"
						>
							Napsat recenzi
						</a>
					</div>
				</div>
				<div className="shrink-0 text-4xl" aria-hidden="true">
					⭐
				</div>
			</div>
			<div className="mt-4 rounded-lg bg-background-subtle p-4">
				<div className="text-sm text-text-muted">
					<strong className="text-text-primary">Pomohli jsme vám?</strong> Vaše recenze nám pomůže sloužit dalším zákazníkům a zlepšovat naše služby.
				</div>
			</div>
		</Card>
	);
}

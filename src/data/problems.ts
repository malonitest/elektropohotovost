export type LocationLinksMode = "all" | "top" | "area-specific";

export type ProblemFaqItem = {
	question: string;
	answer: string;
};

export type Problem = {
	name: string;
	slug: string;
	summary: string;
	symptoms: string[];
	causes: string[];
	whatToDoNow: string[];
	whatNotToDo: string[];
	whenToCall: string[];
	faq: ProblemFaqItem[];
	relatedProblems: string[];
	priority: 1 | 2 | 3;
	locationLinksMode: LocationLinksMode;
};

export const problems: Problem[] = [
	{
		name: "Výpadek proudu",
		slug: "vypadek-proudu",
		summary:
			"Elektřina nejde v celém bytě/domu nebo v části okruhů. Nejprve ověřte jističe a rozsah výpadku, pak postupujte bezpečně.",
		symptoms: [
			"nejde světlo ani zásuvky v celém objektu",
			"nejde jen část okruhů (např. kuchyň/obývák)",
			"nejde proud po bouřce nebo po zapnutí spotřebiče",
			"opakovaně se vypíná jistič při obnovení"
		],
		causes: [
			"shozený jistič nebo vybavený proudový chránič",
			"zkrat nebo přetížení v jednom okruhu",
			"porucha v rozvaděči (uvolněný spoj, poškozený jistič)",
			"problém na přívodu / mimo objekt (distribuce)",
			"porucha spotřebiče, který vyhazuje jištění"
		],
		whatToDoNow: [
			"Zkontrolujte, zda je výpadek i u sousedů (rozlišíte lokalitu vs. jen váš objekt).",
			"Podívejte se na rozvaděč: jestli je shozený jistič nebo proudový chránič.",
			"Pokud jistič nejde zapnout, nezkoušejte opakovaně „na sílu“ – může jít o zkrat.",
			"Odpojte podezřelé spotřebiče ze zásuvek a zkuste zapnout jištění znovu.",
			"Když je cítit zápach nebo je něco horké, vypněte hlavní jistič a volejte elektrikáře."
		],
		whatNotToDo: [
			"Nemanipulujte s odkrytovaným rozvaděčem ani s vodiči.",
			"Nesnažte se opravovat zásuvky/vypínače pod napětím.",
			"Nevyměňujte pojistky/jističe bez odbornosti – riziko úrazu a požáru."
		],
		whenToCall: [
			"Nejde zapnout jistič nebo hned znovu vypadne.",
			"Výpadek se týká klíčových okruhů (kotel, čerpadlo, chladicí zařízení).",
			"Je cítit spálenina, slyšíte praskání nebo se něco přehřívá.",
			"Výpadek se opakuje bez zjevné příčiny."
		],
		faq: [
			{
				question: "Je výpadek proudu problém u mě, nebo v ulici?",
				answer:
					"Zkuste zjistit, zda mají elektřinu sousedé (chodba, vedlejší byt, okolní domy). Pokud výpadek postihuje širší okolí, může jít o distribuční poruchu."
			},
			{
				question: "Mám shozený jistič – můžu ho hned zapnout?",
				answer:
					"Ano, jednou můžete zkusit jistič zapnout. Pokud okamžitě znovu vypadne, je pravděpodobná závada v okruhu nebo na spotřebiči a je lepší volat elektrikáře."
			},
			{
				question: "Co když vypadává proud po bouřce?",
				answer:
					"Po bouřce může dojít k přepětí nebo k poruše na zařízení. Odpojte citlivou elektroniku, zkontrolujte jištění a pokud se problém opakuje, kontaktujte elektrikáře."
			},
			{
				question: "Může výpadek proudu způsobit vadný spotřebič?",
				answer:
					"Ano. Pokud jištění padá při zapnutí konkrétního spotřebiče, odpojte ho a otestujte okruh bez něj. Vadný spotřebič nechte zkontrolovat servisem."
			},
			{
				question: "Je bezpečné zkoušet jistič opakovaně?",
				answer:
					"Ne. Opakované nahazování může zhoršit přehřívání nebo poškození. Pokud jistič padá opakovaně, řešte příčinu a volejte odborníka."
			}
		],
		relatedProblems: [
			"shozeny-jistic",
			"vyhazuje-proudovy-chranic",
			"pretizeny-okruh",
			"vyhazuje-jistic-pri-spotrebici"
		],
		priority: 1,
		locationLinksMode: "top"
	},
	{
		name: "Neustále shazuje jistič",
		slug: "shozeny-jistic",
		summary:
			"Jistič nejde udržet nahozený nebo padá po krátké době. Typicky jde o zkrat, přetížení nebo závadu na spotřebiči.",
		symptoms: [
			"jistič nejde nahodit",
			"jistič padá po zapnutí konkrétního okruhu",
			"padá při větší zátěži (konvice, trouba, bojler)",
			"padá bez zjevné souvislosti (nahodíte a za chvíli vypadne)"
		],
		causes: [
			"zkrat v elektroinstalaci nebo ve spotřebiči",
			"přetížený okruh (více spotřebičů na jedné větvi)",
			"poškozený jistič nebo uvolněný spoj v rozvaděči",
			"vlhkost v krabicích/zásuvkách (často venku)",
			"porucha prodlužovačky nebo rozdvojky"
		],
		whatToDoNow: [
			"Vypněte a odpojte spotřebiče na daném okruhu (zásuvky).",
			"Zkuste nahodit jistič bez zátěže; pokud drží, připojujte spotřebiče postupně.",
			"Pokud jistič nejde nahodit vůbec, nezkoušejte opakovaně – může jít o zkrat.",
			"Když je cítit spálenina nebo se něco hřeje, vypněte hlavní jistič a volejte."
		],
		whatNotToDo: [
			"Nepřemosťujte jistič a nepoužívejte „silnější“ jištění jako náhradu.",
			"Nerozebírejte rozvaděč bez kvalifikace.",
			"Nezakrývejte problém prodlužovačkami – zvyšuje to riziko přehřátí."
		],
		whenToCall: [
			"Jistič okamžitě vypadne i bez připojených spotřebičů.",
			"Vidíte jiskření, slyšíte praskání nebo cítíte spáleninu.",
			"Jistič padá opakovaně a nelze najít viníka mezi spotřebiči.",
			"Jde o okruh s důležitým zařízením (topení, čerpadlo, server)."
		],
		faq: [
			{
				question: "Proč jistič padá i bez spotřebičů?",
				answer:
					"Často jde o závadu v elektroinstalaci (zkrat, poškozený kabel, vlhkost) nebo o problém přímo v rozvaděči. V takové situaci je vhodný výjezd elektrikáře." 
			},
			{
				question: "Můžu dát místo jističe silnější?",
				answer:
					"Ne. Vyšší hodnota jištění může vést k přehřátí vodičů a požáru. Jištění musí odpovídat kabeláži a projektu." 
			},
			{
				question: "Pomůže, když vypnu část spotřebičů?",
				answer:
					"Pokud je příčinou přetížení, ano. Odpojte spotřebiče a připojujte je postupně. Pokud jde o zkrat, jistič bude padat i bez zátěže." 
			},
			{
				question: "Co když jistič padá jen v noci?",
				answer:
					"Může jít o spotřebič s cyklem (bojler, topení) nebo o vlhkostní problém. Vyplatí se sledovat, co se v tu dobu zapíná, a závadu odborně diagnostikovat." 
			},
			{
				question: "Jak dlouho trvá najít příčinu?",
				answer:
					"Záleží na rozsahu instalace a projevu závady. Často pomůže postupné odpojování okruhů a měření; někdy je potřeba otevřít více krabic nebo prověřit rozvaděč." 
			}
		],
		relatedProblems: [
			"vyhazuje-jistic-pri-spotrebici",
			"pretizeny-okruh",
			"zkrat-elektroinstalace",
			"vyhazuje-proudovy-chranic"
		],
		priority: 1,
		locationLinksMode: "top"
	},
	{
		name: "Zkrat v elektroinstalaci",
		slug: "zkrat-elektroinstalace",
		summary:
			"Zkrat je stav, kdy se vodiče nebo části okruhu spojí nechtěným způsobem a vyhodí jištění. Může být doprovázen praskáním nebo zápachem.",
		symptoms: [
			"jistič nebo chránič okamžitě vypadne",
			"praskání, jiskření nebo zápach z elektro",
			"nefunguje část okruhu po události (vrtání, zatékání)",
			"vyhazuje jistič při zapnutí světla nebo zásuvky"
		],
		causes: [
			"poškozený kabel (např. vrtáním do zdi)",
			"vlhkost v krabici/zásuvce/vypínači",
			"poškozená izolace vodičů",
			"uvolněný spoj a následné přehřátí",
			"vadný spotřebič nebo svítidlo"
		],
		whatToDoNow: [
			"Pokud je cítit spálenina nebo je vidět jiskření, vypněte hlavní jistič.",
			"Nevracejte jištění opakovaně – zkrat může způsobit přehřívání.",
			"Odpojte spotřebiče na postiženém okruhu (pokud je to bezpečné a bez zásahu do instalace).",
			"Volejte elektrikáře pro diagnostiku okruhu a bezpečné uvedení do provozu."
		],
		whatNotToDo: [
			"Nerozebírejte zásuvky/vypínače a nezkoušejte „spravit“ vodiče.",
			"Nepracujte pod napětím.",
			"Neizolujte závadu provizorní páskou bez znalosti příčiny."
		],
		whenToCall: [
			"Jištění okamžitě padá a nelze okruh bezpečně obnovit.",
			"Závada vznikla po vrtání nebo po zatečení vody.",
			"Objevuje se zápach, kouř, přehřívání nebo jiskření.",
			"Nejste si jisti, který okruh je problémový."
		],
		faq: [
			{
				question: "Je zkrat vždy nebezpečný?",
				answer:
					"Zkrat je potenciálně nebezpečný, protože může způsobit rychlé zahřátí vodičů a jiskření. Pokud se opakuje, je potřeba odborná diagnostika." 
			},
			{
				question: "Může zkrat vzniknout po vrtání do zdi?",
				answer:
					"Ano. Poškození kabelu vrtákem patří mezi časté příčiny. V takovém případě okruh nepoužívejte a zavolejte elektrikáře." 
			},
			{
				question: "Pomůže vypnout všechny spotřebiče?",
				answer:
					"Pomoci to může, pokud zkrat způsobuje konkrétní spotřebič. Pokud je závada v instalaci, jištění bude padat i bez spotřebičů." 
			},
			{
				question: "Proč jistič padne hned při zapnutí?",
				answer:
					"Typicky je v okruhu zkrat nebo výrazně poškozená izolace. Jištění reaguje okamžitě, aby zabránilo dalším škodám." 
			},
			{
				question: "Lze zkrat opravit bez sekání?",
				answer:
					"Záleží na místě závady. Někdy stačí oprava v krabici nebo výměna poškozeného prvku; jindy je nutný zásah do vedení." 
			}
		],
		relatedProblems: [
			"shozeny-jistic",
			"zapach-spaleniny",
			"prehrata-zasuvka",
			"iskreni-vypinac"
		],
		priority: 1,
		locationLinksMode: "area-specific"
	},
	{
		name: "Porucha rozvaděče",
		slug: "porucha-rozvadece",
		summary:
			"Rozvaděč je srdce elektroinstalace. Závada se může projevit výpadky okruhů, přehříváním nebo opakovaným vybavováním jištění.",
		symptoms: [
			"opakované vybavování jističů/chrániče",
			"hřející se jistič nebo svorky (na dotek teplé dvířka rozvaděče)",
			"zápach z rozvaděče",
			"praskání, bzučení nebo jiskření"
		],
		causes: [
			"uvolněný nebo oxidovaný spoj",
			"poškozený jistič nebo chránič",
			"přetížený přívod/okruh",
			"vniknutí prachu nebo vlhkosti",
			"neodborné úpravy v rozvaděči"
		],
		whatToDoNow: [
			"Pokud je cítit spálenina nebo slyšíte praskání, vypněte hlavní jistič.",
			"Rozvaděč neotvírejte ani nezkoušejte dotahovat spoje.",
			"Zaznamenejte, které okruhy vypadávají a za jakých podmínek (pomůže diagnostice).",
			"Kontaktujte elektrikáře – u rozvaděče je zásah vždy odborná práce."
		],
		whatNotToDo: [
			"Nemanipulujte s jištěním opakovaně, pokud se rozvaděč hřeje.",
			"Nedotahujte šrouby ve svorkách bez kvalifikace.",
			"Neprovádějte úpravy rozvaděče „svépomocí“."
		],
		whenToCall: [
			"Rozvaděč se přehřívá nebo je cítit spálenina.",
			"Dochází k výpadkům více okruhů současně.",
			"Slyšíte praskání/bzučení nebo vidíte jiskření.",
			"Chránič nebo jistič se nedá udržet nahozený."
		],
		faq: [
			{
				question: "Je bezpečné otevřít rozvaděč a podívat se?",
				answer:
					"Bez odbornosti ne. I při vypnutém jističí mohou být některé části pod napětím. Doporučujeme nechat kontrolu na elektrikáři." 
			},
			{
				question: "Co znamená bzučení nebo praskání v rozvaděči?",
				answer:
					"Může jít o uvolněný spoj, přetížení nebo poškozený prvek. Je vhodné rozvaděč odstavit (vypnout hlavní jistič) a zavolat odborníka." 
			},
			{
				question: "Proč se jistič v rozvaděči hřeje?",
				answer:
					"Zahřívání může způsobit vysoká zátěž, špatný kontakt nebo poškozený jistič. Dlouhodobé přehřívání zvyšuje riziko poruchy." 
			},
			{
				question: "Může být porucha rozvaděče jen na jednom okruhu?",
				answer:
					"Ano, problém může být lokální (konkrétní jistič/okruh), ale i tak je potřeba odborné posouzení a bezpečná oprava." 
			},
			{
				question: "Co připravit pro elektrikáře?",
				answer:
					"Pomůže popsat, co přesně se děje, kdy k tomu dochází a jaké okruhy jsou dotčené. Pokud máte fotku štítků okruhů, bývá to užitečné." 
			}
		],
		relatedProblems: [
			"shozeny-jistic",
			"vyhazuje-proudovy-chranic",
			"zapach-spaleniny",
			"pretizeny-okruh"
		],
		priority: 1,
		locationLinksMode: "all"
	},
	{
		name: "Přehřátá / jiskřící zásuvka",
		slug: "prehrata-zasuvka",
		summary:
			"Zásuvka je horká, jiskří nebo z ní jde zápach. To je signál přehřátí kontaktů nebo uvolněného spoje a je vhodné jednat rychle a bezpečně.",
		symptoms: [
			"zásuvka je na dotek teplá až horká",
			"jiskření při zasunutí vidlice",
			"zápach spáleniny v okolí zásuvky",
			"hnědnutí plastu nebo deformace"
		],
		causes: [
			"uvolněný kontakt ve svorkách",
			"opotřebená zásuvka nebo poškozená vidlice",
			"dlouhodobě vysoká zátěž (topidla, konvice)",
			"špatný přechodový odpor (oxidace, špatná montáž)",
			"poškozený vodič v krabici"
		],
		whatToDoNow: [
			"Odpojte spotřebič (pokud je to bezpečné) a přestaňte zásuvku používat.",
			"Vypněte jistič příslušného okruhu.",
			"Pokud je cítit kouř/spálenina, vypněte hlavní jistič a větrejte.",
			"Zavolejte elektrikáře – přehřáté kontakty je potřeba odborně opravit."
		],
		whatNotToDo: [
			"Nezapojujte spotřebiče zpět do podezřelé zásuvky.",
			"Nepoužívejte redukce/rozdvojky k „obejití“ problému.",
			"Nerozebírejte zásuvku pod napětím."
		],
		whenToCall: [
			"Zásuvka se zahřívá i při běžném používání.",
			"Je vidět deformace nebo zčernání.",
			"Dochází k jiskření nebo k výpadkům okruhu.",
			"Zápach spáleniny přetrvává i po vypnutí okruhu."
		],
		faq: [
			{
				question: "Je teplá zásuvka vždy problém?",
				answer:
					"Zásuvka by se neměla výrazně zahřívat. Pokud je teplá až horká, jde často o špatný kontakt a je vhodné zásuvku odstavit a zkontrolovat." 
			},
			{
				question: "Může to způsobit prodlužovačka?",
				answer:
					"Ano. Nekvalitní nebo přetížená prodlužovačka zvyšuje přechodové odpory a může se přehřívat. I tak je potřeba zkontrolovat i samotnou zásuvku." 
			},
			{
				question: "Co když jiskří jen občas?",
				answer:
					"I občasné jiskření ukazuje na problém s kontaktem nebo s vidlicí. Závadu neodkládejte – přehřívání bývá postupné." 
			},
			{
				question: "Stačí vyměnit zásuvku?",
				answer:
					"Někdy ano, ale je nutné zkontrolovat i vodiče a svorky v krabici. Pokud je poškozený vodič nebo spoj, pouhá výměna zásuvky problém nevyřeší." 
			},
			{
				question: "Můžu zásuvku používat dočasně s nižší zátěží?",
				answer:
					"Nedoporučujeme. Přehřívání je často způsobeno kontaktem a může se zhoršit i při menší zátěži. Bezpečnější je okruh vypnout a zásuvku opravit." 
			}
		],
		relatedProblems: [
			"zapach-spaleniny",
			"pretizeny-okruh",
			"iskreni-vypinac",
			"shozeny-jistic"
		],
		priority: 1,
		locationLinksMode: "top"
	},
	{
		name: "Zápach spáleniny z elektro",
		slug: "zapach-spaleniny",
		summary:
			"Zápach spáleniny je varovný signál. Může jít o přehřátý spoj, poškozený spotřebič nebo poruchu v rozvaděči – postupujte opatrně.",
		symptoms: [
			"zápach plastu nebo spáleniny v místnosti",
			"zápach zesiluje u zásuvky/vypínače/rozvaděče",
			"občasné praskání nebo jiskření",
			"hřející se prvek (zásuvka, jistič, adaptér)"
		],
		causes: [
			"přechodový odpor na uvolněném spoji",
			"přetížený okruh nebo zásuvka",
			"vadný adaptér, nabíječka nebo prodlužovačka",
			"porucha v rozvaděči",
			"poškozená izolace vodičů"
		],
		whatToDoNow: [
			"Pokud je zápach výrazný, vypněte příslušný okruh (nebo hlavní jistič, pokud nevíte který).",
			"Odpojte spotřebiče z podezřelých zásuvek.",
			"Zkontrolujte, zda se něco nehřeje na dotek (bez rozebírání krytů).",
			"Větrejte a volejte elektrikáře, pokud zápach přetrvává nebo se zhoršuje."
		],
		whatNotToDo: [
			"Neignorujte zápach a nenechávejte okruh v provozu „na zkoušku“.",
			"Nehaste elektrické zařízení vodou.",
			"Nerozebírejte rozvaděč ani zásuvky."
		],
		whenToCall: [
			"Zápach je silný nebo se vrací opakovaně.",
			"Je vidět zčernání, deformace nebo kouř.",
			"Zápach je u rozvaděče nebo jističů.",
			"Nejste schopni určit zdroj."
		],
		faq: [
			{
				question: "Může zápach spáleniny pocházet jen ze spotřebiče?",
				answer:
					"Ano, často jde o adaptér, nabíječku nebo motorový spotřebič. I tak je dobré ověřit zásuvku a okruh – přehřátý kontakt může zápach zhoršit." 
			},
			{
				question: "Co je nejčastější příčina v domácnostech?",
				answer:
					"Často jde o uvolněný spoj v zásuvce nebo o přetíženou prodlužovačku. Závadu je vhodné řešit hned, aby se nezhoršila." 
			},
			{
				question: "Kdy vypnout hlavní jistič?",
				answer:
					"Pokud nevíte, odkud zápach jde, nebo se obáváte přehřívání v rozvaděči, je bezpečnější vypnout hlavní jistič a zavolat elektrikáře." 
			},
			{
				question: "Je potřeba volat hasiče?",
				answer:
					"Pokud vidíte kouř, plamen nebo se situace rychle zhoršuje, volejte tísňovou linku. Jinak je vhodné odstavit okruh a kontaktovat elektro pohotovost." 
			},
			{
				question: "Může zápach způsobit stará instalace?",
				answer:
					"Ano, zejména při uvolněných spojích nebo degradované izolaci. Diagnostika a případné opravy sníží riziko dalších poruch." 
			}
		],
		relatedProblems: [
			"prehrata-zasuvka",
			"porucha-rozvadece",
			"zkrat-elektroinstalace",
			"iskreni-vypinac"
		],
		priority: 1,
		locationLinksMode: "all"
	},
	{
		name: "Nefungují světla / okruh",
		slug: "nejdou-svetla",
		summary:
			"Nejde osvětlení v místnosti nebo celé části bytu/domu, ale zásuvky mohou fungovat. Často jde o problém v okruhu světel, vypínači nebo svítidle.",
		symptoms: [
			"světla nefungují v jedné místnosti",
			"nefunguje celý okruh světel, zásuvky fungují",
			"světlo problikává nebo zhasíná při dotyku vypínače",
			"jistič nebo chránič vypadne při zapnutí světla"
		],
		causes: [
			"vadná žárovka/LED zdroj nebo driver",
			"uvolněný spoj ve vypínači nebo v krabici",
			"závada ve svítidle (zkrat, přehřátí)",
			"poškozený kabel v okruhu",
			"problém v jističí pro okruh osvětlení"
		],
		whatToDoNow: [
			"Ověřte, zda nejde jen o zdroj světla (žárovka/LED).",
			"Zkontrolujte jistič okruhu osvětlení.",
			"Pokud jistič padá při zapnutí, světlo dále nezapínejte.",
			"Volejte elektrikáře, pokud jde o uvolněné spoje nebo závadu v instalaci."
		],
		whatNotToDo: [
			"Nerozebírejte vypínače ani svítidla pod napětím.",
			"Neobcházejte ochranné prvky (chránič/jistič).",
			"Nenechávejte problikávající svítidlo dlouhodobě v provozu."
		],
		whenToCall: [
			"Jistič padá při zapnutí světla.",
			"Problém se týká více místností nebo celého okruhu.",
			"Je cítit spálenina nebo je něco horké.",
			"Ve společných prostorách bytového domu (chodby/sklepy) nejde osvětlení."
		],
		faq: [
			{
				question: "Může to být jen žárovka?",
				answer:
					"Ano, často jde o vadný zdroj. Pokud ale padá jistič, jde pravděpodobně o závadu ve svítidle nebo v okruhu a je potřeba zásah elektrikáře." 
			},
			{
				question: "Proč světlo problikává?",
				answer:
					"Může jít o uvolněný spoj, vadný LED driver nebo problém ve vypínači. Problikávání je signál nestability a stojí za kontrolu." 
			},
			{
				question: "Co když nejdou světla, ale zásuvky fungují?",
				answer:
					"Instalace bývá rozdělena na okruhy. Může být vypnutý jistič okruhu světel nebo je v něm závada. Zkontrolujte rozvaděč a případně volejte elektrikáře." 
			},
			{
				question: "Je problém ve vypínači častý?",
				answer:
					"Ano, uvolněné kontakty nebo opotřebení vypínače mohou způsobit výpadky či jiskření. Oprava patří elektrikáři." 
			},
			{
				question: "Jak postupovat ve společných prostorech domu?",
				answer:
					"Zkuste zjistit, zda nejde o centrální jistič/časovač osvětlení. Pokud je problém v rozvaděči domu nebo se opakuje, je vhodné zavolat elektro pohotovost." 
			}
		],
		relatedProblems: [
			"iskreni-vypinac",
			"shozeny-jistic",
			"zkrat-elektroinstalace",
			"vypadek-proudu"
		],
		priority: 1,
		locationLinksMode: "area-specific"
	},
	{
		name: "Vybavuje proudový chránič",
		slug: "vyhazuje-proudovy-chranic",
		summary:
			"Proudový chránič vypadává, často při zapnutí spotřebiče nebo při vlhkosti. Chránič chrání před úrazem elektrickým proudem – nepodceňujte to.",
		symptoms: [
			"proudový chránič nejde nahodit",
			"chránič vypadne při zapnutí konkrétního okruhu",
			"vypadává při vlhku (koupelna, venek)",
			"padá náhodně během dne"
		],
		causes: [
			"únik proudu (závada izolace) v instalaci",
			"vadný spotřebič (těleso, motor, topná spirála)",
			"vlhkost v zásuvce/krabici",
			"poškozený kabel",
			"kombinace více drobných úniků v různých okruzích"
		],
		whatToDoNow: [
			"Odpojte spotřebiče ze zásuvek na postiženém okruhu.",
			"Zkuste chránič nahodit. Pokud drží, připojujte spotřebiče postupně.",
			"Pokud chránič nejde nahodit, nezkoušejte opakovaně – volejte elektrikáře.",
			"Ve vlhkém prostředí okruh raději odstavte a nechte zkontrolovat."
		],
		whatNotToDo: [
			"Nevyřazujte chránič z provozu.",
			"Nepoužívejte vlhké zásuvky ani venkovní okruhy bez ověření.",
			"Neprovádějte improvizované opravy kabelů."
		],
		whenToCall: [
			"Chránič nejde udržet nahozený.",
			"Závada souvisí s koupelnou, venkem nebo vlhkostí.",
			"Chránič padá bez zjevného důvodu.",
			"Nejste schopni určit okruh nebo spotřebič."
		],
		faq: [
			{
				question: "Proč chránič vypadává častěji než jistič?",
				answer:
					"Chránič reaguje na únik proudu (závadu izolace) a chrání před úrazem. Jistič řeší přetížení/zkrat. Proto může vypadávat i při menších závadách." 
			},
			{
				question: "Může za to vlhkost?",
				answer:
					"Ano. Vlhkost v zásuvce, krabici nebo venkovním okruhu je častá příčina. Okruh je vhodné odstavit a nechat zkontrolovat." 
			},
			{
				question: "Jak najít problémový spotřebič?",
				answer:
					"Odpojte vše ze zásuvek, nahoďte chránič a připojujte spotřebiče postupně. Pokud chránič padá u jednoho zařízení, nepoužívejte ho a řešte servis." 
			},
			{
				question: "Je možné chránič dočasně obejít?",
				answer:
					"Ne. Chránič je bezpečnostní prvek. Jeho vyřazení zvyšuje riziko úrazu a požáru." 
			},
			{
				question: "Co když chránič padá jen občas?",
				answer:
					"Může jít o kombinaci vlhkosti, cyklů spotřebičů a drobných úniků. Diagnostika elektrikářem pomůže najít okruh a příčinu." 
			}
		],
		relatedProblems: [
			"shozeny-jistic",
			"porucha-venkovni-zasuvky",
			"vyhazuje-jistic-pri-spotrebici",
			"zkrat-elektroinstalace"
		],
		priority: 1,
		locationLinksMode: "area-specific"
	},
	{
		name: "Jiskření ve vypínači",
		slug: "iskreni-vypinac",
		summary:
			"Jiskření nebo praskání ve vypínači často ukazuje na uvolněný kontakt nebo opotřebení. Je vhodné vypínač přestat používat a závadu řešit odborně.",
		symptoms: [
			"praskání při zapnutí/vypnutí",
			"jiskra ve vypínači",
			"vypínač je teplý",
			"světlo problikává nebo zhasíná"
		],
		causes: [
			"uvolněný vodič ve svorkách",
			"opotřebené kontakty vypínače",
			"přetížený okruh osvětlení",
			"vadné svítidlo nebo LED driver",
			"poškozená izolace v krabici"
		],
		whatToDoNow: [
			"Přestaňte vypínač používat a vypněte příslušný okruh v rozvaděči.",
			"Pokud je vypínač horký nebo je cítit spálenina, vypněte hlavní jistič.",
			"Zavolejte elektrikáře – jde o práci v instalaci."
		],
		whatNotToDo: [
			"Nerozebírejte vypínač pod napětím.",
			"Nezkoušejte dotahovat spoje bez kvalifikace.",
			"Nepokračujte v používání „jen občas“ – závada se může zhoršovat."
		],
		whenToCall: [
			"Je vidět jiskření nebo je slyšet praskání.",
			"Vypínač je teplý nebo je cítit zápach.",
			"Světla problikávají nebo vypadává jištění.",
			"Jde o společné prostory bytového domu."
		],
		faq: [
			{
				question: "Je malé jiskření při vypnutí normální?",
				answer:
					"U některých zátěží může dojít k drobnému jiskření, ale viditelné jiskření a praskání je důvod k odstavení okruhu a kontrole." 
			},
			{
				question: "Může být problém ve svítidle a ne ve vypínači?",
				answer:
					"Ano. Vadný LED driver nebo svítidlo může způsobit vyšší proudové špičky. Elektrikář zkontroluje vypínač i svítidlo." 
			},
			{
				question: "Co dělat, když je vypínač horký?",
				answer:
					"Okruh vypněte v rozvaděči a vypínač dále nepoužívejte. Horký vypínač ukazuje na špatný kontakt a riziko přehřátí." 
			},
			{
				question: "Pomůže výměna vypínače?",
				answer:
					"Často ano, ale je nutné ověřit i vodiče a spoje v krabici. Pokud je problém v kabelu nebo v okruhu, výměna samotného vypínače nestačí." 
			},
			{
				question: "Může to vyhazovat jistič?",
				answer:
					"Ano, pokud je závada výrazná nebo se zhoršuje. V takovém případě okruh nepoužívejte a řešte to rychle s elektrikářem." 
			}
		],
		relatedProblems: [
			"nejdou-svetla",
			"zkrat-elektroinstalace",
			"zapach-spaleniny",
			"prehrata-zasuvka"
		],
		priority: 2,
		locationLinksMode: "top"
	},
	{
		name: "Přetížený okruh",
		slug: "pretizeny-okruh",
		summary:
			"Okruh je dlouhodobě zatížen více spotřebiči, než na co je stavěný. Typicky padá jistič při současném provozu varné konvice, topidla apod.",
		symptoms: [
			"jistič padá při zapnutí více spotřebičů",
			"zásuvky nebo vidlice se zahřívají",
			"výpadky v kuchyni nebo dílně",
			"padá jistič při topení/vaření"
		],
		causes: [
			"více výkonných spotřebičů na jednom okruhu",
			"nevhodné používání prodlužovaček",
			"starší instalace s menšími rezervami",
			"špatně rozdělené okruhy v objektu"
		],
		whatToDoNow: [
			"Snižte zátěž – vypněte část spotřebičů.",
			"Nepoužívejte více topidel/konvic na jednom okruhu současně.",
			"Pokud se zásuvka zahřívá, okruh vypněte a nechte zkontrolovat.",
			"Pro dlouhodobé řešení domluvte s elektrikářem rozdělení okruhů."
		],
		whatNotToDo: [
			"Nezvyšujte hodnotu jističe.",
			"Nepřetěžujte prodlužovačky.",
			"Neignorujte přehřívání zásuvek."
		],
		whenToCall: [
			"Padá jistič i při běžném používání.",
			"Dochází k přehřívání zásuvek nebo vidlic.",
			"Okruhy jsou zjevně nedostačující pro současnou zátěž.",
			"Potřebujete bezpečně rozdělit okruhy (kuchyň, dílna, kancelář)."
		],
		faq: [
			{
				question: "Jak poznám přetížení okruhu?",
				answer:
					"Typicky padá jistič při současném provozu více výkonných spotřebičů. Dalším signálem může být zahřívání zásuvek nebo prodlužovaček." 
			},
			{
				question: "Pomůže používat spotřebiče postupně?",
				answer:
					"Ano, snížení současné zátěže často zabrání vybavení jističe. Pro trvalé řešení je ale vhodné upravit rozdělení okruhů." 
			},
			{
				question: "Proč je nebezpečné dávat „silnější jistič“?",
				answer:
					"Protože vodiče se mohou přehřát dřív, než jistič zareaguje. To zvyšuje riziko poškození izolace a požáru." 
			},
			{
				question: "Je problém častější ve starších domech?",
				answer:
					"Ano, starší instalace často nebyly navrženy na dnešní spotřebu. Přidání okruhů a modernizace rozvaděče může situaci výrazně zlepšit." 
			},
			{
				question: "Co je nejlepší dlouhodobé řešení?",
				answer:
					"Rozdělení zátěže do více okruhů, kontrola rozvaděče a případně doplnění samostatných okruhů pro kuchyň, topení nebo dílnu." 
			}
		],
		relatedProblems: [
			"shozeny-jistic",
			"prehrata-zasuvka",
			"porucha-rozvadece",
			"vyhazuje-jistic-pri-spotrebici"
		],
		priority: 1,
		locationLinksMode: "top"
	},
	{
		name: "Venkovní zásuvka / vlhkost",
		slug: "porucha-venkovni-zasuvky",
		summary:
			"Venkovní zásuvky a okruhy trpí vlhkostí. Projevuje se to vybavováním chrániče, výpadky nebo zhoršením po dešti.",
		symptoms: [
			"vypadává proudový chránič po dešti",
			"zásuvka venku nefunguje",
			"závada je horší ve vlhkém počasí",
			"jistič/chránič padá při zapojení zahradní techniky"
		],
		causes: [
			"vlhkost v zásuvce nebo v krabici",
			"poškozené těsnění nebo krytí",
			"poškozený kabel v zemi nebo na fasádě",
			"vadný venkovní spotřebič (sekačka, čerpadlo)",
			"oxidované kontakty"
		],
		whatToDoNow: [
			"Venkovní okruh odstavte (vypněte příslušné jištění).",
			"Nepoužívejte zásuvku, pokud je vlhká nebo poškozená.",
			"Odpojte venkovní spotřebiče a prodlužovačky.",
			"Nechte zásuvku a okruh zkontrolovat elektrikářem (krytí, izolace, chránič)."
		],
		whatNotToDo: [
			"Nesušte zásuvku horkovzduchem a nezasahujte do ní pod napětím.",
			"Nepřekrývejte závadu improvizovaně páskou.",
			"Nepoužívejte poškozené venkovní prodlužky."
		],
		whenToCall: [
			"Chránič padá opakovaně po dešti nebo při vlhku.",
			"Je podezření na poškozený kabel (zemní práce, hlodavci).",
			"Zásuvka je fyzicky poškozená.",
			"Potřebujete bezpečně obnovit provoz (čerpadlo, zahradní technika)."
		],
		faq: [
			{
				question: "Proč závada zhoršuje po dešti?",
				answer:
					"Vlhkost zvyšuje vodivost a zhoršuje izolaci. Proudový chránič pak vyhodnotí únik proudu a vypne okruh." 
			},
			{
				question: "Je venkovní zásuvka vždy na chrániči?",
				answer:
					"Měla by být chráněna proudovým chráničem. Pokud si nejste jisti, je vhodné nechat zapojení zkontrolovat." 
			},
			{
				question: "Může být problém v zahradním spotřebiči?",
				answer:
					"Ano. Poškozený kabel na sekačce nebo čerpadle může způsobit vybavení chrániče. Spotřebič nepoužívejte a řešte servis." 
			},
			{
				question: "Stačí vyměnit zásuvku?",
				answer:
					"Někdy ano, ale je potřeba ověřit i krabici, průchodky a stav kabelu. Závada může být i na trase vedení." 
			},
			{
				question: "Je bezpečné zásuvku „nechat vyschnout“ a zkusit to znovu?",
				answer:
					"Nedoporučujeme. Opakované zkoušení může zhoršit přehřívání a zvyšuje riziko úrazu. Bezpečnější je okruh odstavit a nechat zkontrolovat." 
			}
		],
		relatedProblems: [
			"vyhazuje-proudovy-chranic",
			"vyhazuje-jistic-pri-spotrebici",
			"zkrat-elektroinstalace",
			"shozeny-jistic"
		],
		priority: 1,
		locationLinksMode: "area-specific"
	},
	{
		name: "Jistič padá při konkrétním spotřebiči",
		slug: "vyhazuje-jistic-pri-spotrebici",
		summary:
			"Jistič nebo chránič vypadne vždy, když zapnete konkrétní spotřebič. Často jde o závadu spotřebiče nebo jeho přívodního kabelu.",
		symptoms: [
			"jištění vypadne jen při zapnutí konkrétního zařízení",
			"spotřebič po zapnutí „cvakne“ a okruh vypadne",
			"závada se zhoršuje v čase",
			"vypadává chránič u spotřebiče s vodou (pračka, myčka)"
		],
		causes: [
			"porucha spotřebiče (topné těleso, motor)",
			"poškozený přívodní kabel nebo vidlice",
			"závada v zásuvce (uvolněný spoj)",
			"kombinace spotřebič + přetížený okruh",
			"únik proudu u spotřebiče (vybaví chránič)"
		],
		whatToDoNow: [
			"Spotřebič odpojte a dále ho nepoužívejte.",
			"Zkuste okruh bez spotřebiče – pokud drží, problém je pravděpodobně v zařízení.",
			"Vizuálně zkontrolujte kabel a vidlici (bez rozebírání).",
			"Pokud jištění padá i bez spotřebiče, volejte elektrikáře (závada v okruhu)."
		],
		whatNotToDo: [
			"Nezkoušejte spotřebič opakovaně zapínat.",
			"Neopravujte spotřebič svépomocí, pokud nejste kvalifikovaní.",
			"Neobcházejte chránič ani jistič."
		],
		whenToCall: [
			"Spotřebič je důležitý a potřebujete bezpečně obnovit provoz okruhu.",
			"Jištění padá i po odpojení spotřebiče.",
			"Jde o spotřebič s vodou a vypadává chránič.",
			"Je cítit zápach nebo se něco přehřívá."
		],
		faq: [
			{
				question: "Je problém v zásuvce nebo ve spotřebiči?",
				answer:
					"Pokud okruh drží bez spotřebiče, je pravděpodobnější závada ve spotřebiči. Pokud padá i bez něj, hledejte problém v okruhu nebo v rozvaděči." 
			},
			{
				question: "Může to způsobit poškozený kabel?",
				answer:
					"Ano. Poškozený kabel nebo vidlice může vyvolat zkrat nebo únik proudu. Spotřebič okamžitě odpojte a řešte servis." 
			},
			{
				question: "Proč vypadává chránič u pračky nebo myčky?",
				answer:
					"Spotřebiče s vodou mohou mít únik proudu (např. topné těleso). Chránič chrání před úrazem, proto to řešte servisem nebo elektrikářem." 
			},
			{
				question: "Mám zkusit jinou zásuvku?",
				answer:
					"Můžete, ale jen pokud je to bezpečné a bez prodlužování na hraně. Pokud závada zůstává, je velmi pravděpodobně ve spotřebiči." 
			},
			{
				question: "Je nutný výjezd elektro pohotovosti?",
				answer:
					"Pokud potřebujete bezpečně obnovit okruh nebo pokud padá jištění i bez spotřebiče, výjezd dává smysl. Jinak bývá vhodnější servis spotřebiče." 
			}
		],
		relatedProblems: [
			"shozeny-jistic",
			"vyhazuje-proudovy-chranic",
			"pretizeny-okruh",
			"vypadek-proudu"
		],
		priority: 1,
		locationLinksMode: "top"
	}
];

export const problemBySlug = new Map(problems.map((p) => [p.slug, p] as const));

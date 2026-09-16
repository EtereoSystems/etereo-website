// Source of truth for the blog. Each post carries both languages; scripts/gen-blog.mjs
// turns these into self-contained static pages at /blog/<slug>/, and the React listing
// (content.ts insights.items) mirrors the light fields (tag/title/excerpt/read/slug/date).
// Bodies are trusted HTML we author here — never user input — so they are emitted verbatim.

export const POSTS = [
  {
    slug: "strangler-fig-legacy-migration",
    date: "2026-03-04",
    readMin: 9,
    author: "Patrik Klimko",
    tag: { en: "Architecture", sk: "Architektúra" },
    keywords: {
      en: "strangler fig pattern, legacy migration, incremental modernization, legacy system replacement, avoid big-bang rewrite",
      sk: "strangler fig, migrácia legacy systému, inkrementálna modernizácia, náhrada legacy systému, veľký rewrite",
    },
    title: {
      en: "Replacing a legacy system without a big-bang rewrite",
      sk: "Ako vymeniť legacy systém bez veľkého rewrite",
    },
    description: {
      en: "The strangler fig pattern in practice: how to replace a load-bearing legacy system slice by slice, sequencing by business risk instead of code elegance.",
      sk: "Strangler fig v praxi: ako vymeniť nosný legacy systém po častiach a poradie určiť podľa biznis rizika, nie podľa elegancie kódu.",
    },
    excerpt: {
      en: "Why incremental cutovers fail on the org chart before they fail on the code — and how to sequence a replacement so the business keeps running throughout.",
      sk: "Prečo inkrementálne prechody zlyhajú skôr na organizačnej štruktúre než na kóde — a ako naplánovať výmenu tak, aby biznis bežal celý čas.",
    },
    body: {
      en: `
<p>Every company with a system that has run for a decade eventually hears the same proposal: freeze the roadmap, rebuild from scratch, and switch over on a weekend. It is almost always the wrong plan. The rebuild takes twice as long as promised, the business changes underneath it, and the "switch over on a weekend" turns into a board-level incident. The alternative is older and less glamorous — and it is the one that actually works.</p>

<h2>The rewrite fails on the org chart first</h2>
<p>A big-bang rewrite asks the business to stand still while engineering catches up to where it already was. But the market does not pause, regulations change, a competitor ships, and the sales team promises a feature that only exists in the old system. So the old system keeps getting changed — which means the new one is now chasing a moving target. Two teams drift apart, the "freeze" quietly thaws, and eighteen months in you are maintaining two systems instead of one.</p>
<p>The failure is rarely technical. It is that a rewrite couples the entire business to a single, distant cutover date, and nothing about a real business tolerates a single distant date.</p>

<h2>What the strangler fig actually is</h2>
<p>The pattern takes its name from the fig that grows around a host tree, gradually taking over its structure until the original is gone — but the canopy never stops functioning. In software it means: put a routing layer in front of the legacy system, then replace it one capability at a time. Each new slice runs in production next to the old one; the router decides, per request, which implementation serves it. When a slice is proven, you route all its traffic to the new code and delete the old path. The system is never rewritten. It is <strong>gradually replaced while fully live</strong>.</p>
<p>The mechanics are unremarkable, which is the point: a façade or gateway that owns routing, a new service for the extracted capability, and a deliberate decision about who owns the data that capability touches. The discipline is in the sequencing, not the code.</p>

<h2>Sequence by risk, not by elegance</h2>
<p>The instinct is to start with the ugliest part of the codebase. Resist it. The first slice should be chosen to <em>retire risk and prove the approach</em>, not to satisfy an engineer's sense of tidiness. Good first candidates are capabilities that are well-understood, have clear boundaries, carry real business value, and are painful enough that success is visible to the people approving the budget.</p>
<p>We sequence around three questions. Where is the business exposed today — the slice that breaks at 2am? Where is change most frequent, so a cleaner implementation pays off fastest? And where are the data boundaries clean enough that we can move a capability without dragging half the schema with it? The intersection of those three is the first slice.</p>

<h2>Data is the hard part, not the code</h2>
<p>Extracting behaviour is straightforward. Extracting the data that behaviour depends on is where migrations stall. A capability that reads and writes tables shared by ten other features cannot simply be lifted out. You have a few honest options, and each has a cost. You can keep the data in place and have the new service reach back into the legacy database through a narrow, explicit interface — fast to build, but it postpones the real separation. You can dual-write to both the old and new stores during a transition and reconcile continuously — safer, but you carry two sources of truth for a while. Or you can make the new service the owner and have the legacy system read from it — clean, but it means the legacy code has to change too.</p>
<p>There is no universally correct choice; there is only the one that fits the slice. What matters is that the decision is made deliberately and written down, because an undocumented dual-write is how a modernization quietly becomes a data-integrity project.</p>

<h2>Knowing it is working — and when it stalls</h2>
<p>A healthy strangler migration produces something to inspect every few weeks: a slice in production, a measurable reduction in incidents on the old path, a clear line on the map moving from "legacy" to "replaced." If months pass with nothing shipped, the problem is usually not engineering. It is that the routing layer has become a place to add features instead of a place to remove them, or that no one has been willing to delete the old code once a slice is proven. Deleting the old path is not cleanup you do later — it is the step that makes the migration real. Until the legacy code is gone, you are running two systems and paying for both.</p>

<h2>A short checklist before you start</h2>
<p>Before committing to a strangler approach, get honest answers to a few questions. Can you put a routing layer in front of the system without a month of yak-shaving? Do you know, for the first slice, exactly which tables it owns and which it merely borrows? Is there a person on the business side who will notice and care when the first slice ships? And — the one people skip — is everyone agreed that "done" means the old code is deleted, not merely bypassed? If those answers are yes, incremental replacement will almost always beat the rewrite, because it keeps the thing that matters most running the entire time: the business.</p>
`,
      sk: `
<p>Každá firma, ktorej systém beží desať rokov, raz počuje ten istý návrh: zmraziť roadmapu, postaviť to odznova a cez víkend prepnúť. Skoro vždy je to zlý plán. Prestavba trvá dvakrát dlhšie, ako sľubovala, biznis sa medzitým zmení a „prepneme cez víkend" sa zmení na incident, ktorý rieši predstavenstvo. Existuje starší a menej efektný prístup — a práve ten funguje.</p>

<h2>Rewrite zlyhá najprv na organizačnej štruktúre</h2>
<p>Veľký rewrite žiada od firmy, aby stála na mieste, kým vývoj dobehne tam, kde už dávno bola. Lenže trh sa nezastaví, menia sa predpisy, konkurencia niečo vydá a obchod sľúbi funkciu, ktorá existuje len v starom systéme. Takže starý systém sa mení ďalej — a nový teraz naháňa pohyblivý cieľ. Dva tímy sa vzďaľujú, „zmrazenie" sa potichu rozpustí a po osemnástich mesiacoch udržiavate dva systémy namiesto jedného.</p>
<p>Príčina zlyhania je málokedy technická. Je v tom, že rewrite naviaže celý biznis na jediný, vzdialený dátum prepnutia — a reálny biznis takýto jediný vzdialený dátum neznesie.</p>

<h2>Čo strangler fig naozaj je</h2>
<p>Vzor má meno podľa figovníka, ktorý obrastie hostiteľský strom a postupne prevezme jeho štruktúru, až pôvodný strom zmizne — no koruna ani na chvíľu neprestane fungovať. V softvéri to znamená: pred legacy systém postavíte smerovaciu vrstvu a potom ho nahrádzate po jednej schopnosti. Každá nová časť beží v produkcii vedľa starej; router pre každú požiadavku rozhodne, ktorá implementácia ju obslúži. Keď je časť overená, všetku jej prevádzku presmerujete na nový kód a starú cestu zmažete. Systém sa nikdy nerobí odznova. <strong>Postupne sa nahrádza za plnej prevádzky.</strong></p>
<p>Mechanika je nezaujímavá, a to je pointa: fasáda alebo gateway, ktorá vlastní smerovanie, nová služba pre vyňatú schopnosť a vedomé rozhodnutie o tom, kto vlastní dáta, ktorých sa daná schopnosť dotýka. Disciplína je v poradí, nie v kóde.</p>

<h2>Poradie určite podľa rizika, nie podľa elegancie</h2>
<p>Inštinkt velí začať pri najškaredšej časti kódu. Odolajte mu. Prvá časť sa má vyberať tak, aby <em>znížila riziko a overila prístup</em>, nie aby uspokojila inžinierov zmysel pre poriadok. Dobrí kandidáti sú schopnosti, ktorým dobre rozumiete, majú jasné hranice, nesú reálnu biznis hodnotu a sú dosť bolestivé na to, aby úspech videli aj ľudia, ktorí schvaľujú rozpočet.</p>
<p>Poradie staviame na troch otázkach. Kde je biznis dnes najviac vystavený — ktorá časť padne o druhej v noci? Kde sa mení najčastejšie, aby sa čistejšia implementácia vrátila najrýchlejšie? A kde sú dátové hranice dosť čisté, aby sa schopnosť dala presunúť bez toho, aby ste za sebou ťahali polovicu schémy? Prienik týchto troch je prvá časť.</p>

<h2>Ťažké nie je kód, ale dáta</h2>
<p>Vyňať správanie je jednoduché. Vyňať dáta, na ktorých to správanie stojí, je miesto, kde migrácie viaznu. Schopnosť, ktorá číta a zapisuje do tabuliek zdieľaných s desiatimi ďalšími funkciami, sa jednoducho nevytiahne. Máte niekoľko poctivých možností a každá niečo stojí. Dáta môžete nechať na mieste a nová služba k nim siahne cez úzke, explicitné rozhranie priamo do legacy databázy — rýchle na postavenie, no odkladá to skutočné oddelenie. Počas prechodu môžete zapisovať do starého aj nového úložiska naraz a priebežne to zosúlaďovať — bezpečnejšie, no chvíľu nesiete dva zdroje pravdy. Alebo vlastníkom dát urobíte novú službu a legacy systém bude čítať z nej — čisté, no znamená to, že sa musí zmeniť aj legacy kód.</p>
<p>Univerzálne správna voľba neexistuje; existuje len tá, ktorá sedí na danú časť. Podstatné je, že sa rozhodne vedome a napíše sa to, lebo nezdokumentovaný dvojitý zápis je presne to, ako sa z modernizácie potichu stane projekt na záchranu integrity dát.</p>

<h2>Ako spoznáte, že to funguje — a kedy to viazne</h2>
<p>Zdravá strangler migrácia každých pár týždňov vyprodukuje niečo, čo sa dá skontrolovať: časť v produkcii, merateľný pokles incidentov na starej ceste, jasnú čiaru na mape, ktorá sa posúva z „legacy" na „nahradené". Ak prejdú mesiace bez toho, aby sa niečo dodalo, problém zvyčajne nie je vo vývoji. Je v tom, že sa zo smerovacej vrstvy stalo miesto na pridávanie funkcií namiesto miesta na ich odoberanie — alebo že nikto nebol ochotný zmazať starý kód, keď bola časť overená. Zmazanie starej cesty nie je upratovanie na neskôr — je to krok, ktorý robí migráciu skutočnou. Kým legacy kód nezmizne, beží vám dvojica systémov a platíte za oba.</p>

<h2>Krátky checklist, kým začnete</h2>
<p>Než sa upíšete strangler prístupu, získajte poctivé odpovede na pár otázok. Viete pred systém postaviť smerovaciu vrstvu bez mesiaca zbytočností? Viete pri prvej časti presne, ktoré tabuľky vlastní a ktoré si len požičiava? Je na strane biznisu človek, ktorý si všimne a bude mu záležať, keď prvá časť pôjde do produkcie? A — to ľudia preskakujú — zhodli sa všetci na tom, že „hotovo" znamená zmazaný starý kód, nielen obídený? Ak sú tie odpovede áno, inkrementálna výmena skoro vždy poráža rewrite, pretože celý čas necháva bežať to najdôležitejšie: biznis.</p>
`,
    },
  },

  {
    slug: "two-week-software-audit",
    date: "2026-04-15",
    readMin: 7,
    author: "Matej Kučera",
    tag: { en: "Delivery", sk: "Dodávka" },
    keywords: {
      en: "software audit, architecture review, technical due diligence, modernization roadmap, legacy assessment deliverables",
      sk: "softvérový audit, revízia architektúry, technické due diligence, roadmapa modernizácie, posúdenie legacy systému",
    },
    title: {
      en: "What a two-week software audit should actually deliver",
      sk: "Čo má dvojtýždňový softvérový audit naozaj priniesť",
    },
    description: {
      en: "A software audit should not end in a slide deck. Here are the four artefacts a real assessment produces — and how teams use them to get a modernization budget approved.",
      sk: "Softvérový audit nemá skončiť prezentáciou. Tu sú štyri výstupy, ktoré prináša skutočné posúdenie — a ako s nimi tímy získajú rozpočet na modernizáciu.",
    },
    excerpt: {
      en: "Most audits end in a slide deck nobody acts on. The four concrete artefacts a two-week assessment should hand over — and how clients turn them into approved budget.",
      sk: "Väčšina auditov skončí prezentáciou, na ktorú nikto nekoná. Štyri konkrétne výstupy dvojtýždňového posúdenia — a ako z nich klienti spravia schválený rozpočet.",
    },
    body: {
      en: `
<p>A two-week audit is the most common way we start with a new client, and it is also the deliverable most often done badly across the industry. Done badly, it produces a forty-slide deck of observations everyone already knew, a colour-coded risk matrix, and a recommendation to "invest in modernization." Nobody acts on it, because it gives no one a decision they can defend. Done well, an audit ends with four concrete things a leadership team can pick up and use the same week.</p>

<h2>1. An architecture map that reflects reality</h2>
<p>Not the diagram from the wiki that stopped being true in 2021 — the actual one. What services exist, what talks to what, where the data lives, which integrations are load-bearing, and where the undocumented glue is. The value of this map is not that it is pretty; it is that it is <em>honest</em>. It shows the parts of the system that everyone works around but no one owns, the single database that eleven services quietly depend on, the nightly job that would take the business down if it failed. You cannot plan a modernization against a fiction, and most teams are planning against one without realising it.</p>

<h2>2. A risk register ordered by business impact</h2>
<p>Every audit finds risks. A useful audit ranks them by what they cost the business, not by how technically offensive they are. A deprecated library is a finding; a deprecated library in the payment path with no test coverage and one person who understands it is a business risk with a name and a deadline. The register should let a non-technical executive read down the list and understand, in plain terms, what could go wrong, how likely it is, what it would cost, and what it takes to defuse it. That translation — from technical debt to business exposure — is most of what leadership is actually buying.</p>

<h2>3. A sequenced roadmap, not a wish list</h2>
<p>A list of everything that should be improved is not a plan; it is an anxiety generator. A roadmap sequences the work so that each phase reduces risk or unlocks value, ends in something inspectable, and does not require the previous phase to have been perfect. It answers the only question leadership really has: if we can fund three months, what three months buy us the most safety and the most optionality? A good roadmap is also honest about dependencies — the work that genuinely cannot start until something else is done — because hidden dependencies are how a "six-month" plan becomes an eighteen-month one.</p>

<h2>4. A working proof, not just a promise</h2>
<p>This is the artefact most audits skip, and it is the one that changes the conversation. In two weeks it is almost always possible to build one small, real thing: extract a single capability behind a façade, stand up a thin slice of the target architecture, or instrument the system so the cost or performance problem becomes measurable instead of anecdotal. A working proof does two things a document cannot. It de-risks the approach — you have now done the hard part once, for real — and it gives leadership evidence rather than assertion. "We think this will work" and "here is it working" ask for very different amounts of courage from the person signing the cheque.</p>

<h2>How clients turn this into budget</h2>
<p>The pattern we see repeatedly is that the audit does not sell the modernization — it lets the client's own champion sell it internally. A CTO who walks into a budget meeting with an honest architecture map, a risk register their CFO can read, a roadmap costed in fundable phases, and a working proof of the first phase is not asking for faith. They are presenting a decision with the uncertainty already removed. That is the real product of a two-week audit: not a report, but a defensible decision that someone inside the company can stand behind.</p>

<h2>What to demand from any audit</h2>
<p>If you are commissioning an assessment — from us or anyone — insist on these outcomes before it starts. Ask that the architecture map be validated against the running system, not the documentation. Ask that risks be expressed in money and time, not severity colours. Ask that the roadmap be broken into phases you could actually fund one at a time. And ask for something that runs at the end, however small. An audit that cannot commit to those four things is selling you a document, and a document is the one thing a struggling system does not need more of.</p>
`,
      sk: `
<p>Dvojtýždňový audit je najčastejší spôsob, akým začíname s novým klientom, a zároveň je to výstup, ktorý sa naprieč odvetvím najčastejšie robí zle. Zle spravený vyprodukuje štyridsať slajdov s pozorovaniami, ktoré každý dávno pozná, farebne odlíšenú maticu rizík a odporúčanie „investovať do modernizácie". Nikto na to nekoná, lebo to nikomu nedá rozhodnutie, ktoré by vedel obhájiť. Dobre spravený audit skončí štyrmi konkrétnymi vecami, ktoré vedenie firmy vezme do ruky a použije ešte ten istý týždeň.</p>

<h2>1. Mapa architektúry, ktorá zodpovedá realite</h2>
<p>Nie ten diagram z wiki, ktorý prestal platiť v roku 2021 — ten skutočný. Aké služby existujú, čo s čím komunikuje, kde ležia dáta, ktoré integrácie sú nosné a kde je nezdokumentované lepidlo. Hodnota tejto mapy nie je v tom, že je pekná; je v tom, že je <em>poctivá</em>. Ukáže časti systému, ktoré všetci obchádzajú, no nikto ich nevlastní; jednu databázu, na ktorej potichu závisí jedenásť služieb; nočnú úlohu, ktorá by pri zlyhaní položila celý biznis. Modernizáciu sa nedá plánovať proti fikcii — a väčšina tímov proti fikcii plánuje bez toho, aby o tom vedela.</p>

<h2>2. Register rizík zoradený podľa dopadu na biznis</h2>
<p>Riziká nájde každý audit. Užitočný audit ich zoradí podľa toho, koľko stoja biznis, nie podľa toho, ako technicky urážajú. Zastaraná knižnica je nález; zastaraná knižnica v platobnej ceste bez testov a s jediným človekom, ktorý jej rozumie, je biznis riziko s menom a termínom. Register má umožniť netechnickému manažérovi prejsť zoznam a v zrozumiteľných pojmoch pochopiť, čo sa môže pokaziť, aká je pravdepodobnosť, koľko by to stálo a čo treba na zneškodnenie. Práve tento preklad — z technického dlhu na biznis expozíciu — je väčšina toho, čo si vedenie v skutočnosti kupuje.</p>

<h2>3. Roadmapa s poradím, nie zoznam želaní</h2>
<p>Zoznam všetkého, čo by sa malo zlepšiť, nie je plán; je to generátor úzkosti. Roadmapa zoradí prácu tak, aby každá fáza znížila riziko alebo odomkla hodnotu, skončila niečím kontrolovateľným a nevyžadovala, aby predošlá fáza bola dokonalá. Odpovedá na jedinú otázku, ktorú vedenie naozaj má: ak vieme financovať tri mesiace, ktoré tri mesiace nám prinesú najviac bezpečia a najviac možností? Dobrá roadmapa je zároveň poctivá k závislostiam — k práci, ktorá naozaj nemôže začať, kým sa nedokončí niečo iné — lebo skryté závislosti sú presne to, ako sa zo „šesťmesačného" plánu stane osemnásťmesačný.</p>

<h2>4. Fungujúci dôkaz, nie len sľub</h2>
<p>Toto je výstup, ktorý väčšina auditov preskočí, a práve on mení celý rozhovor. Za dva týždne sa skoro vždy dá postaviť jedna malá, reálna vec: vyňať jednu schopnosť za fasádu, postaviť tenký rez cieľovej architektúry alebo systém zmerať tak, že sa z problému s nákladmi či výkonom stane merateľné číslo namiesto historky. Fungujúci dôkaz robí dve veci, ktoré dokument nedokáže. Znižuje riziko prístupu — tú ťažkú časť ste teraz raz naozaj spravili — a dáva vedeniu dôkaz namiesto tvrdenia. „Myslíme si, že to bude fungovať" a „tu to funguje" žiadajú od človeka, ktorý podpisuje šek, veľmi rozdielnu mieru odvahy.</p>

<h2>Ako z toho klienti spravia rozpočet</h2>
<p>Vzor, ktorý vidíme opakovane, je, že audit modernizáciu nepredá — umožní klientovmu vlastnému zástancovi predať ju interne. CTO, ktorá príde na rozpočtové stretnutie s poctivou mapou architektúry, registrom rizík, ktorý prečíta aj finančný riaditeľ, roadmapou nacenenou vo financovateľných fázach a fungujúcim dôkazom prvej fázy, nežiada o vieru. Predkladá rozhodnutie, z ktorého už bola odstránená neistota. To je skutočný produkt dvojtýždňového auditu: nie report, ale obhájiteľné rozhodnutie, za ktoré sa niekto vo firme dokáže postaviť.</p>

<h2>Čo žiadať od každého auditu</h2>
<p>Ak si objednávate posúdenie — od nás alebo od kohokoľvek — trvajte na týchto výstupoch ešte pred začiatkom. Žiadajte, aby sa mapa architektúry overila proti bežiacemu systému, nie proti dokumentácii. Žiadajte, aby sa riziká vyjadrili v peniazoch a čase, nie vo farbách závažnosti. Žiadajte, aby sa roadmapa rozdelila na fázy, ktoré viete financovať po jednej. A žiadajte niečo, čo na konci beží, nech je to akokoľvek malé. Audit, ktorý sa nevie zaviazať k týmto štyrom veciam, vám predáva dokument — a dokument je to jediné, čoho už má trápiaci sa systém dosť.</p>
`,
    },
  },

  {
    slug: "cut-cloud-costs-without-a-freeze",
    date: "2026-05-20",
    readMin: 8,
    author: "Patrik Klimko",
    tag: { en: "Platform", sk: "Platforma" },
    keywords: {
      en: "reduce cloud costs, cloud cost optimization, aws azure cost reduction, cloud waste, finops, right-sizing",
      sk: "znížiť náklady na cloud, optimalizácia cloudových nákladov, cloud plytvanie, finops, right-sizing, úspora aws azure",
    },
    title: {
      en: "Cutting cloud costs 40-70% without a migration freeze",
      sk: "Ako znížiť náklady na cloud o 40-70 % bez zmrazenia vývoja",
    },
    description: {
      en: "Most cloud bills are 40-70% waste. The unglamorous checklist that removes it — right-sizing, storage lifecycle, killing the staging estate — without freezing delivery.",
      sk: "Väčšina cloudových účtov je zo 40-70 % plytvanie. Nudný checklist, ktorý ho odstráni — right-sizing, životný cyklus dát, zrušenie staging prostredí — bez zmrazenia dodávok.",
    },
    excerpt: {
      en: "Cloud bills quietly grow to two or three times what the workload needs. The practical, incremental checklist for taking a third off — without a migration freeze.",
      sk: "Cloudové účty potichu narastú na dvoj- až trojnásobok toho, čo záťaž potrebuje. Praktický, inkrementálny checklist, ako z toho zložiť tretinu — bez zmrazenia vývoja.",
    },
    body: {
      en: `
<p>A cloud bill is one of the few numbers in a company that only ever goes up, and almost no one is asked to defend. It grows by accretion — a bigger instance here to fix a latency scare, a copy of production data there for a test that finished a year ago, an autoscaling floor set high during a launch and never lowered. Individually each decision was reasonable. Together they routinely add up to a bill that is two to three times what the workload actually needs. The good news is that reclaiming most of that waste requires no architectural heroics and no freeze on shipping features.</p>

<h2>Where the money is actually hiding</h2>
<p>Before touching anything, it is worth naming the usual suspects, because cloud waste is remarkably consistent across companies. The largest line is almost always compute that is provisioned for a peak that either never comes or comes for twenty minutes a day. Close behind is storage that no lifecycle policy ever touches — snapshots of snapshots, logs kept forever, data that could sit in cold storage at a tenth of the price. Then there is the staging and pre-production estate, which is frequently a full-size mirror of production running twenty-four hours a day to serve a team that works eight. And finally the quiet killers: data egress and cross-zone traffic, which never appear on an architecture diagram but can be a fifth of the bill.</p>

<h2>The checklist, in order of return</h2>
<p>We work the problem in roughly the order that returns the most money for the least risk. First, <strong>right-size compute</strong> against real utilisation data, not the size someone picked at 3am during an incident. Most instances are running at a fraction of their capacity; matching the instance to the actual load is the single biggest lever and carries almost no risk. Second, <strong>make scaling honest</strong> — set autoscaling floors to what the workload needs at its genuine minimum, and let it grow when it must, rather than paying for peak capacity around the clock. Third, <strong>put a lifecycle on storage</strong>: expire old snapshots, tier cold data down, and delete the things no one will ever read again. Fourth, <strong>shut the staging estate off when no one is using it</strong> — a scheduled shutdown of non-production environments overnight and at weekends can remove more than half their cost on its own. Fifth, once the obvious waste is gone and usage is predictable, <strong>commit to it</strong> with savings plans or reserved capacity for the baseline you now know you need.</p>

<h2>Why it does not require a freeze</h2>
<p>None of this asks the product teams to stop. Right-sizing, storage lifecycle, and scheduled shutdowns are operational changes that happen alongside normal delivery; they touch how the system is run, not what it does. That is the whole point of doing it this way. A "cost optimization project" that halts the roadmap for a quarter usually costs more in lost momentum than it saves on the bill, and it teaches the organisation that saving money and shipping features are enemies. They are not. The discipline is to treat cost as an operational property of the system — something you measure and tend continuously — rather than a crisis you periodically declare.</p>

<h2>Making sure it does not creep back</h2>
<p>The uncomfortable truth is that a one-time cleanup will fully reverse within a year if nothing changes about how the organisation works. Costs creep back the same way they arrived: one reasonable decision at a time, with no one watching the total. The fix is not another audit; it is visibility. Cost should be attributable to teams and features, so the people making the decisions can see the consequence. A dashboard that shows spend by service, an alert when a line item jumps, and a quick monthly look at the biggest movers is enough. The goal is not to make engineers frugal — it is to make the cost of a decision visible to the person making it, at the time they make it. Once that feedback loop exists, the bill stops being a surprise, and the 40-70% you reclaimed stays reclaimed.</p>
`,
      sk: `
<p>Účet za cloud je jedno z mála čísel vo firme, ktoré ide len nahor a takmer nikto ho nemusí obhajovať. Rastie nabaľovaním — tu väčšia inštancia po tom, čo vystrašila latencia, tam kópia produkčných dát pre test, ktorý skončil pred rokom, autoscaling nastavený vysoko počas launchu a už nikdy nestiahnutý. Každé rozhodnutie samo o sebe bolo rozumné. Spolu bežne dajú účet, ktorý je dvoj- až trojnásobkom toho, čo záťaž naozaj potrebuje. Dobrá správa je, že získať späť väčšinu tohto plytvania nevyžaduje architektonické hrdinstvá ani zmrazenie dodávok.</p>

<h2>Kde sa peniaze naozaj skrývajú</h2>
<p>Než sa niečoho dotkneme, oplatí sa pomenovať zvyčajných podozrivých, lebo cloudové plytvanie je naprieč firmami pozoruhodne konzistentné. Najväčšia položka je skoro vždy výpočtový výkon nadimenzovaný na špičku, ktorá buď nepríde, alebo príde na dvadsať minút denne. Hneď za ním je úložisko, ktorého sa nikdy nedotkla žiadna lifecycle politika — snapshoty snapshotov, logy držané naveky, dáta, ktoré by mohli ležať v studenom úložisku za desatinu ceny. Potom je tu staging a predprodukčné prostredie, ktoré je často plnohodnotnou kópiou produkcie bežiacou dvadsaťštyri hodín denne pre tím, čo pracuje osem. A nakoniec tichí zabijaci: egress dát a prevádzka medzi zónami, ktoré sa nikdy neobjavia na diagrame architektúry, no môžu byť pätinou účtu.</p>

<h2>Checklist v poradí podľa návratnosti</h2>
<p>Problém riešime zhruba v poradí, ktoré vráti najviac peňazí za najmenšie riziko. Po prvé, <strong>right-sizing výpočtu</strong> podľa reálnych dát o vyťažení, nie podľa veľkosti, ktorú niekto vybral o tretej ráno počas incidentu. Väčšina inštancií beží na zlomku svojej kapacity; zladiť inštanciu so skutočnou záťažou je najväčšia páka a nesie takmer nulové riziko. Po druhé, <strong>urobte škálovanie poctivým</strong> — nastavte spodnú hranicu autoscalingu na to, čo záťaž potrebuje pri skutočnom minime, a nechajte ju rásť, keď musí, namiesto platenia za špičkovú kapacitu nonstop. Po tretie, <strong>dajte úložisku životný cyklus</strong>: nechajte expirovať staré snapshoty, presúvajte studené dáta nižšie a mažte to, čo už nikto nikdy neprečíta. Po štvrté, <strong>vypnite staging, keď ho nikto nepoužíva</strong> — plánované vypínanie neprodukčných prostredí cez noc a cez víkendy vie samo o sebe odstrániť viac než polovicu ich nákladov. Po piate, keď je zjavné plytvanie preč a využitie je predvídateľné, <strong>zaviažte sa k nemu</strong> cez savings plans alebo rezervovanú kapacitu pre základňu, o ktorej už viete, že ju potrebujete.</p>

<h2>Prečo to nevyžaduje zmrazenie</h2>
<p>Nič z toho nežiada produktové tímy, aby prestali. Right-sizing, životný cyklus úložiska a plánované vypínanie sú prevádzkové zmeny, ktoré prebiehajú súbežne s bežnou dodávkou; dotýkajú sa toho, ako sa systém prevádzkuje, nie toho, čo robí. Práve v tom je celá pointa tohto prístupu. „Projekt na optimalizáciu nákladov", ktorý na štvrťrok zastaví roadmapu, zvyčajne stojí viac na stratenej dynamike, než ušetrí na účte — a naučí organizáciu, že šetrenie a dodávanie funkcií sú nepriatelia. Nie sú. Disciplína je v tom, brať náklady ako prevádzkovú vlastnosť systému — niečo, čo priebežne meriate a ošetrujete — a nie ako krízu, ktorú občas vyhlásite.</p>

<h2>Ako zabezpečiť, že sa to nevráti</h2>
<p>Nepríjemná pravda je, že jednorazové upratovanie sa do roka úplne vráti, ak sa nič nezmení na tom, ako organizácia pracuje. Náklady sa vracajú rovnako, ako prišli: po jednom rozumnom rozhodnutí, keď nikto nesleduje súčet. Riešením nie je ďalší audit; je to viditeľnosť. Náklady majú byť priraditeľné tímom a funkciám, aby ľudia, ktorí rozhodujú, videli dôsledok. Dashboard, ktorý ukazuje výdavky podľa služby, upozornenie, keď položka vyskočí, a rýchly mesačný pohľad na najväčšie pohyby stačia. Cieľom nie je urobiť z inžinierov šetrilov — je to spraviť náklad rozhodnutia viditeľným pre toho, kto ho robí, v čase, keď ho robí. Keď táto spätná väzba existuje, účet prestane byť prekvapením a tých 40-70 %, ktoré ste získali späť, tam zostane.</p>
`,
    },
  },

  {
    slug: "rewrite-replatform-or-refactor",
    date: "2026-06-24",
    readMin: 8,
    author: "Matej Kučera",
    tag: { en: "Strategy", sk: "Stratégia" },
    keywords: {
      en: "rewrite vs refactor, replatform, legacy modernization strategy, when to rewrite software, application modernization decision",
      sk: "rewrite vs refaktoring, replatforming, stratégia modernizácie legacy, kedy prepísať softvér, modernizácia aplikácií",
    },
    title: {
      en: "Rewrite, replatform, or refactor? Choosing a modernization strategy",
      sk: "Rewrite, replatform, alebo refaktoring? Ako vybrať stratégiu modernizácie",
    },
    description: {
      en: "Rewrite, replatform, and refactor solve different problems. A practical framework for choosing between them — and why the honest default is usually a mix.",
      sk: "Rewrite, replatform a refaktoring riešia rôzne problémy. Praktický rámec, ako medzi nimi vybrať — a prečo je poctivým východiskom zvyčajne kombinácia.",
    },
    excerpt: {
      en: "Three modernization strategies, three different risk profiles. A framework for matching the approach to the system — and the true cost of reaching for a rewrite too early.",
      sk: "Tri stratégie modernizácie, tri rôzne rizikové profily. Rámec, ako zladiť prístup so systémom — a skutočná cena za to, keď po rewrite siahnete priskoro.",
    },
    body: {
      en: `
<p>When a system starts to hurt, the conversation about what to do with it collapses far too quickly into a single word: rewrite. It is the most dramatic option, the most satisfying to imagine, and the most expensive to get wrong. Before reaching for it, it helps to be precise about what the three real options are, because they solve genuinely different problems and carry genuinely different risks.</p>

<h2>Three words that are not synonyms</h2>
<p><strong>Refactoring</strong> changes the internal structure of the code without changing what it does. You keep the same behaviour, the same platform, the same data — you make the existing thing cleaner, safer, and easier to change. <strong>Replatforming</strong> keeps the application largely as it is but moves it onto a better foundation: a supported runtime, a managed database, a container platform, the cloud. The behaviour is preserved; the ground underneath it changes. A <strong>rewrite</strong> throws the implementation away and builds the capability again, usually with a new architecture and often new technology. Only the rewrite discards the thing the business has already paid to learn — every edge case, every regulatory quirk, every hard-won fix that lives in the old code and nowhere else.</p>

<h2>A framework for choosing</h2>
<p>The right choice falls out of four honest questions. The first is about <em>value</em>: is this part of the system a source of competitive advantage, or is it undifferentiated plumbing? You refactor or rewrite where the business competes; you replatform, buy, or outsource where it does not. The second is about <em>coupling</em>: how entangled is this capability with everything around it? Tightly coupled code resists extraction, which pushes you toward in-place refactoring or a careful strangler approach rather than a clean rewrite. The third is about <em>knowledge</em>: does anyone still understand how this works? A system no one understands is the most dangerous possible rewrite candidate, because you cannot rebuild behaviour you cannot describe — there, the first job is to characterise the existing behaviour, not replace it. The fourth is about <em>rate of change</em>: code that changes constantly rewards investment in its structure; code that has not been touched in three years and works may not be worth touching at all.</p>

<h2>The hidden cost of a rewrite</h2>
<p>A rewrite's advertised cost is the engineering effort to rebuild the features. Its real cost includes three things that rarely make it into the estimate. There is the <em>knowledge you throw away</em> — the accumulated behaviour of a system that has survived contact with real users is an asset, and a rewrite discards it and rediscovers it the hard way, usually in production. There is the <em>parallel-running tax</em> — until the new system fully replaces the old, you run and maintain both, and that period is almost always longer than planned. And there is <em>opportunity cost</em> — the roadmap the business did not get while the team was rebuilding what it already had. None of this makes a rewrite wrong. It makes a rewrite a decision that should clear a high bar, not the default reaction to a system that has become uncomfortable.</p>

<h2>Why the honest answer is usually "a mix"</h2>
<p>In practice, almost no real system wants a single strategy applied uniformly. A mature platform is a portfolio: a differentiating core worth refactoring or selectively rewriting, a stable periphery that just needs a supported foundation underneath it, and commodity capabilities better replaced by something you buy. The most effective modernizations we run treat the decision at the level of the capability, not the system — refactor the part that changes weekly and matters, replatform the part that works but sits on an unsupported runtime, rewrite only the specific piece whose design actively prevents where the business needs to go, and leave the boring, stable parts alone. "Rewrite the system" is almost never the right sentence. "Here is the one strategy that fits each part of the system" is.</p>
`,
      sk: `
<p>Keď systém začne bolieť, rozhovor o tom, čo s ním, sa priveľmi rýchlo zrúti do jediného slova: rewrite. Je to najdramatickejšia možnosť, najpríjemnejšia na predstavu a najdrahšia, keď sa pokazí. Než po nej siahnete, pomôže byť presný v tom, aké sú tie tri reálne možnosti, lebo riešia naozaj rozdielne problémy a nesú naozaj rozdielne riziká.</p>

<h2>Tri slová, ktoré nie sú synonymá</h2>
<p><strong>Refaktoring</strong> mení vnútornú štruktúru kódu bez toho, aby menil, čo robí. Zachováte rovnaké správanie, rovnakú platformu, rovnaké dáta — existujúcu vec spravíte čistejšou, bezpečnejšou a ľahšie zmeniteľnou. <strong>Replatforming</strong> nechá aplikáciu do veľkej miery takú, aká je, no presunie ju na lepší základ: podporovaný runtime, spravovanú databázu, kontajnerovú platformu, cloud. Správanie ostáva; mení sa pôda pod ním. <strong>Rewrite</strong> zahodí implementáciu a schopnosť postaví nanovo, zvyčajne s novou architektúrou a často novou technológiou. Len rewrite zahodí to, čo si biznis už zaplatil naučiť sa — každý okrajový prípad, každú regulačnú zvláštnosť, každú ťažko vydobytú opravu, ktorá žije v starom kóde a nikde inde.</p>

<h2>Rámec na rozhodnutie</h2>
<p>Správna voľba vypadne zo štyroch poctivých otázok. Prvá je o <em>hodnote</em>: je táto časť systému zdrojom konkurenčnej výhody, alebo je to nediferencované potrubie? Refaktorujete alebo prepisujete tam, kde biznis súťaží; replatformujete, kupujete alebo outsourcujete tam, kde nie. Druhá je o <em>previazanosti</em>: ako veľmi je táto schopnosť zapletená so všetkým okolo? Tesne previazaný kód sa bráni vyňatiu, čo vás tlačí skôr k refaktoringu na mieste alebo opatrnému strangler prístupu než k čistému rewrite. Tretia je o <em>znalosti</em>: rozumie ešte niekto, ako to funguje? Systém, ktorému nikto nerozumie, je najnebezpečnejší možný kandidát na rewrite, lebo nemôžete postaviť nanovo správanie, ktoré neviete opísať — tam je prvou úlohou zmapovať existujúce správanie, nie ho nahradiť. Štvrtá je o <em>miere zmeny</em>: kód, ktorý sa mení neustále, odmeňuje investíciu do svojej štruktúry; kód, ktorý sa tri roky nedotkol a funguje, možno nestojí za to dotknúť sa ho vôbec.</p>

<h2>Skrytá cena rewrite</h2>
<p>Inzerovaná cena rewrite je inžinierske úsilie potrebné na postavenie funkcií nanovo. Jeho skutočná cena obsahuje tri veci, ktoré sa do odhadu dostanú len zriedka. Je tu <em>znalosť, ktorú zahodíte</em> — nazbierané správanie systému, ktorý prežil kontakt so skutočnými používateľmi, je aktívum, a rewrite ho zahodí a znovu objaví tou ťažkou cestou, zvyčajne v produkcii. Je tu <em>daň za súbežnú prevádzku</em> — kým nový systém úplne nenahradí starý, prevádzkujete a udržiavate oba, a toto obdobie je skoro vždy dlhšie, než sa plánovalo. A je tu <em>náklad stratenej príležitosti</em> — roadmapa, ktorú biznis nedostal, kým tím staval znovu to, čo už mal. Nič z toho nerobí rewrite nesprávnym. Robí z neho rozhodnutie, ktoré má prekonať vysokú latku, nie predvolenú reakciu na systém, ktorý začal byť nepohodlný.</p>

<h2>Prečo je poctivá odpoveď zvyčajne „kombinácia"</h2>
<p>V praxi takmer žiadny reálny systém nechce jednu stratégiu použitú rovnako všade. Zrelá platforma je portfólio: diferencujúce jadro, ktoré sa oplatí refaktorovať alebo selektívne prepísať, stabilná periféria, ktorá potrebuje len podporovaný základ pod sebou, a komoditné schopnosti, ktoré je lepšie nahradiť niečím, čo kúpite. Najúčinnejšie modernizácie, ktoré vedieme, riešia rozhodnutie na úrovni schopnosti, nie systému — refaktorujte časť, ktorá sa mení každý týždeň a záleží na nej, replatformujte časť, ktorá funguje, no sedí na nepodporovanom runtime, prepíšte len ten konkrétny kus, ktorého dizajn aktívne bráni tomu, kam biznis potrebuje ísť, a nudné, stabilné časti nechajte na pokoji. „Prepíšme systém" je takmer nikdy tá správna veta. „Tu je tá jedna stratégia, ktorá sedí na každú časť systému" áno.</p>
`,
    },
  },

  {
    slug: "saas-on-a-legacy-core",
    date: "2026-07-29",
    readMin: 9,
    author: "Patrik Klimko",
    tag: { en: "Integration", sk: "Integrácia" },
    keywords: {
      en: "saas on legacy system, integration patterns, anti-corruption layer, change data capture, api gateway, event streaming",
      sk: "saas na legacy systéme, integračné vzory, anti-corruption layer, change data capture, api gateway, event streaming",
    },
    title: {
      en: "Shipping a SaaS product on top of a legacy core",
      sk: "Ako postaviť SaaS produkt na legacy jadre",
    },
    description: {
      en: "You rarely get to replace the core system. The integration patterns that let a modern SaaS product sit on top of a legacy core without becoming a distributed monolith.",
      sk: "Jadrový systém málokedy vymeníte. Integračné vzory, ktoré umožnia modernému SaaS produktu sedieť na legacy jadre bez toho, aby sa z neho stal distribuovaný monolit.",
    },
    excerpt: {
      en: "The core system that runs the business is rarely the one you get to replace. The integration patterns for building modern product on top of it — and the trap to avoid.",
      sk: "Jadrový systém, na ktorom firma beží, je zriedka ten, ktorý smiete vymeniť. Integračné vzory na stavbu moderného produktu nad ním — a pasca, ktorej sa treba vyhnúť.",
    },
    body: {
      en: `
<p>Most product ambition in an established company runs into the same wall: the system that actually runs the business — the ledger, the policy engine, the order core — is the one thing you are not allowed to break, and usually not allowed to replace. It works, it is trusted, it is often decades of encoded rules, and the mandate is to build something new <em>around</em> it, not instead of it. Doing that well is an integration problem, and integration is where these initiatives quietly succeed or fail.</p>

<h2>Start by protecting the new from the old</h2>
<p>The first and most important pattern is the <strong>anti-corruption layer</strong>: a deliberate boundary that translates between the legacy core's model of the world and the clean model your new product wants to work with. The legacy system has its own vocabulary, its own quirks, its own assumptions baked in over years — and if those leak directly into your new code, the new product slowly becomes as tangled as the thing it was meant to modernize. The anti-corruption layer is the seam where the old language gets translated into the new one, and it is worth building even when it feels like overhead, because it is the difference between a product that stays clean and one that inherits every compromise of its host.</p>

<h2>Choose how data moves, deliberately</h2>
<p>Once the boundary exists, the real question is how data crosses it. There are three honest patterns and the right system usually uses more than one. You can call the legacy core <strong>synchronously</strong> through an API or gateway when the new product needs an answer right now and can tolerate the core's latency and availability — simple, but it couples your product's uptime to the core's. You can read from the core <strong>asynchronously</strong> by capturing its changes — change data capture off the database, or events the core emits — and building your own read models shaped for your product's needs; this decouples you from the core's performance and lets your product stay fast even when the core is slow. Or you can <strong>stream events</strong> as the integration backbone, so that new capabilities subscribe to what happens in the business rather than querying for it. The instinct to make everything a synchronous call is the most common mistake; it is also the one that turns a modern product into a fragile appendage of the legacy system.</p>

<h2>The consistency questions you cannot skip</h2>
<p>The moment data lives in two places — the legacy core and your product's read model — you have taken on the hardest problem in this kind of work: keeping them honestly in step. This is not a detail to solve later. You need clear answers to a few things from the start. When the core and your read model disagree, which one wins, and how does the other catch up? What happens when an event is delivered twice, or out of order, or not at all? How does a new capability behave when the core is briefly unavailable — does it fail, queue, or serve slightly stale data, and is that acceptable to the business? Making these choices explicitly, per capability, is the work. Idempotent handlers, a reconciliation process that continuously checks the two sides agree, and a conscious decision about acceptable staleness are what separate an integration that holds from one that generates a slow trickle of data-integrity incidents no one can quite explain.</p>

<h2>Avoiding the distributed monolith</h2>
<p>The failure mode that swallows these projects is subtle. You build your clean new services, you connect them to the core and to each other, and without noticing you create a web of synchronous calls where every request fans out to five systems and any one of them being slow makes the whole thing slow. You have not built a modern product on a legacy core; you have built a distributed monolith with worse failure characteristics than the monolith you started with. Avoiding it comes down to a few disciplines held consistently: prefer asynchronous integration over synchronous coupling wherever the business can tolerate it, let each capability own the data it needs rather than fetching it live from three places, and treat every synchronous dependency on the core as a deliberate cost you have chosen, not a convenience you reached for. The goal is a product that stays fast and available even when the old core is having a bad day — because the old core will have bad days, and the whole point was to stop letting them be your product's bad days too.</p>
`,
      sk: `
<p>Väčšina produktových ambícií v etablovanej firme narazí na tú istú stenu: systém, na ktorom firma naozaj beží — účtovné jadro, engine na pravidlá, jadro objednávok — je to jediné, čo nesmiete pokaziť, a zvyčajne ani vymeniť. Funguje, dôveruje sa mu, sú to často desaťročia zakódovaných pravidiel a mandát znie postaviť niečo nové <em>okolo</em> neho, nie namiesto neho. Spraviť to dobre je integračný problém — a integrácia je miesto, kde tieto iniciatívy potichu uspejú alebo zlyhajú.</p>

<h2>Začnite tým, že nové ochránite pred starým</h2>
<p>Prvý a najdôležitejší vzor je <strong>anti-corruption layer</strong>: zámerná hranica, ktorá prekladá medzi tým, ako svet modeluje legacy jadro, a čistým modelom, s ktorým chce pracovať váš nový produkt. Legacy systém má vlastný slovník, vlastné zvláštnosti, vlastné predpoklady zapečené za roky — a ak tie presiaknu priamo do vášho nového kódu, nový produkt sa pomaly zamotá rovnako ako to, čo mal modernizovať. Anti-corruption layer je šev, kde sa starý jazyk prekladá do nového, a oplatí sa postaviť aj vtedy, keď pôsobí ako réžia navyše — lebo je to rozdiel medzi produktom, ktorý ostane čistý, a produktom, ktorý zdedí každý kompromis svojho hostiteľa.</p>

<h2>Vyberte vedome, ako sa dáta pohybujú</h2>
<p>Keď hranica existuje, skutočná otázka je, ako ju dáta prekračujú. Existujú tri poctivé vzory a správny systém zvyčajne používa viac než jeden. Legacy jadro môžete volať <strong>synchrónne</strong> cez API alebo gateway, keď nový produkt potrebuje odpoveď hneď a znesie latenciu a dostupnosť jadra — jednoduché, no viaže dostupnosť vášho produktu na jadro. Z jadra môžete čítať <strong>asynchrónne</strong> tak, že zachytávate jeho zmeny — change data capture z databázy alebo eventy, ktoré jadro vysiela — a staviate vlastné read modely tvarované pre potreby vášho produktu; to vás odviaže od výkonu jadra a nechá váš produkt rýchly aj vtedy, keď je jadro pomalé. Alebo môžete <strong>streamovať eventy</strong> ako integračnú chrbticu, aby sa nové schopnosti prihlásili na to, čo sa v biznise deje, namiesto toho, aby sa na to dopytovali. Inštinkt spraviť zo všetkého synchrónne volanie je najčastejšia chyba; je to aj tá, ktorá z moderného produktu spraví krehký prívesok legacy systému.</p>

<h2>Otázky konzistencie, ktoré nesmiete preskočiť</h2>
<p>V okamihu, keď dáta žijú na dvoch miestach — v legacy jadre a vo vašom read modeli — ste si vzali najťažší problém tejto práce: udržať ich poctivo v súlade. Toto nie je detail na neskôr. Od začiatku potrebujete jasné odpovede na pár vecí. Keď sa jadro a váš read model nezhodnú, ktorý vyhráva a ako ten druhý dobehne? Čo sa stane, keď je event doručený dvakrát, mimo poradia alebo vôbec? Ako sa nová schopnosť správa, keď je jadro nakrátko nedostupné — zlyhá, zaradí do fronty, alebo obslúži mierne zastarané dáta, a je to pre biznis prijateľné? Robiť tieto voľby explicitne, pre každú schopnosť, je tá práca. Idempotentné handlery, zmierovací proces, ktorý priebežne kontroluje, že sa obe strany zhodujú, a vedomé rozhodnutie o prijateľnej zastaranosti sú to, čo oddeľuje integráciu, ktorá drží, od tej, ktorá plodí pomalý pramienok incidentov s integritou dát, ktoré nikto nevie celkom vysvetliť.</p>

<h2>Ako sa vyhnúť distribuovanému monolitu</h2>
<p>Zlyhanie, ktoré tieto projekty pohltí, je zákerné. Postavíte svoje čisté nové služby, prepojíte ich s jadrom aj navzájom a nebadane vytvoríte sieť synchrónnych volaní, kde sa každá požiadavka vetví do piatich systémov a stačí, aby bol jeden z nich pomalý, a pomalé je celé. Nepostavili ste moderný produkt na legacy jadre; postavili ste distribuovaný monolit s horšími vlastnosťami pri zlyhaní než monolit, s ktorým ste začali. Vyhnúť sa mu znamená držať pár disciplín konzistentne: uprednostnite asynchrónnu integráciu pred synchrónnou previazanosťou všade, kde to biznis znesie, nechajte každú schopnosť vlastniť dáta, ktoré potrebuje, namiesto ich živého ťahania z troch miest, a ku každej synchrónnej závislosti na jadre sa správajte ako k vedome zvolenému nákladu, nie ako k pohodliu, po ktorom ste siahli. Cieľom je produkt, ktorý ostane rýchly a dostupný aj vtedy, keď má staré jadro zlý deň — lebo staré jadro zlé dni mať bude, a celá pointa bola prestať dovoliť, aby boli aj zlými dňami vášho produktu.</p>
`,
    },
  },

  {
    slug: "offline-first-and-on-premise",
    date: "2026-09-02",
    readMin: 8,
    author: "Matej Kučera",
    tag: { en: "Engineering", sk: "Inžinierstvo" },
    keywords: {
      en: "offline-first architecture, on-premise software, air-gapped, data sovereignty, local-first, running AI on-premise, private LLM",
      sk: "offline-first architektúra, on-premise softvér, air-gapped, dátová suverenita, local-first, AI na on-premise, privátny LLM",
    },
    title: {
      en: "Offline-first and on-premise: software for disconnected, regulated worlds",
      sk: "Offline-first a on-premise: softvér pre odpojené a regulované prostredia",
    },
    description: {
      en: "Not everything belongs in the public cloud. How to build offline-first and on-premise software for regulated, disconnected environments — including running AI on private data.",
      sk: "Nie všetko patrí do verejného cloudu. Ako stavať offline-first a on-premise softvér pre regulované a odpojené prostredia — vrátane behu AI nad privátnymi dátami.",
    },
    excerpt: {
      en: "Cloud-by-default has a blind spot: the field, the factory floor, the classified network, the regulator. What it takes to build software — and AI — that runs where the data must stay.",
      sk: "Cloud ako predvoľba má slepé miesto: terén, výrobnú halu, utajovanú sieť, regulátora. Čo treba na softvér — a AI — ktorý beží tam, kde dáta musia zostať.",
    },
    body: {
      en: `
<p>The default assumption of modern software is a fast, permanent connection to a public cloud. For a great deal of important work, that assumption is simply wrong. Field teams operate where there is no signal. Factory-floor systems must keep running when the network drops. Defence, healthcare, and finance handle data that legally or contractually cannot leave a controlled environment. And a growing number of organisations want the capabilities of modern AI without sending their most sensitive information to someone else's servers. Building for these worlds is a distinct discipline, and it is one of the areas where careful engineering pays off most visibly.</p>

<h2>Offline-first is a design stance, not a feature</h2>
<p>Offline capability cannot be bolted on at the end; it is a decision that shapes the whole architecture. An offline-first system treats the local device as the primary source of truth and the network as an optimisation that may or may not be available. The application reads and writes locally and always stays responsive; synchronisation happens in the background when a connection appears. This inverts the usual assumption, and it forces you to confront the genuinely hard question early: what happens when two people, or two devices, changed the same thing while disconnected? Conflict resolution is the heart of offline-first work. Sometimes last-writer-wins is acceptable; sometimes you need to merge changes; sometimes a human has to decide. There is no universal answer, but there is a universal requirement — you must choose a strategy deliberately, per kind of data, because the alternative is silent data loss that surfaces as a furious user weeks later.</p>

<h2>On-premise is about control, and control has a cost</h2>
<p>Running software inside a client's own environment — their data centre, their private network, sometimes a fully air-gapped system with no internet at all — is often not a preference but a hard requirement of the domain. The benefit is unambiguous: the data never leaves, which for many regulated organisations is the entire point. The cost is equally real. You lose the cloud's managed services and elastic scale; you inherit the environment's constraints; and you have to make deployment and updates work without the assumptions the cloud lets you take for granted. Software built for on-premise has to be genuinely portable, its dependencies explicit and self-contained, its update path designed to work in a place where a person may be walking an installer in on a laptop. This is unglamorous engineering, and it is exactly the kind that separates software that ships into these environments from software that only demos into them.</p>

<h2>AI, without giving away the data</h2>
<p>The most current version of this problem is artificial intelligence. The obvious way to add AI to a product is to call a hosted model over the internet — which is precisely what a defence agency, a hospital, or a manufacturer with confidential process data often cannot do. The alternative is to run capable models locally, on the organisation's own hardware, so that sensitive documents and proprietary data are used for inference without ever leaving the building. This is now genuinely practical: open models have become good enough, and the tooling to run them efficiently on modest hardware has matured. The engineering shifts from calling an API to a different set of concerns — selecting a model that fits the available hardware, measuring quality and speed honestly against that constraint, and building the retrieval and evaluation layer that makes a local model useful on a specific body of private knowledge. The result is a system that gives an organisation the leverage of modern AI while keeping the one thing it cannot compromise: control of its own data.</p>

<h2>The trade-off, stated plainly</h2>
<p>None of this is free, and pretending otherwise does clients a disservice. Offline-first and on-premise systems ask for more careful design, more explicit handling of the cases the cloud papers over, and a higher standard of portability and self-sufficiency. In return they run where cloud-default software cannot go at all: in the field, on the factory floor, inside the regulated boundary, on the private network. For the organisations whose most important work lives in exactly those places, that is not a niche requirement — it is the whole requirement, and it is worth engineering for properly.</p>
`,
      sk: `
<p>Predvolený predpoklad moderného softvéru je rýchle, trvalé spojenie s verejným cloudom. Pri veľkej časti dôležitej práce je tento predpoklad jednoducho nesprávny. Terénne tímy pracujú tam, kde nie je signál. Systémy na výrobnej hale musia bežať ďalej, keď vypadne sieť. Obrana, zdravotníctvo a financie pracujú s dátami, ktoré zo zákona alebo zo zmluvy nesmú opustiť kontrolované prostredie. A rastúci počet organizácií chce schopnosti modernej AI bez toho, aby posielali svoje najcitlivejšie informácie na cudzie servery. Stavať pre tieto svety je samostatná disciplína — a jedna z oblastí, kde sa dôsledné inžinierstvo prejaví najviditeľnejšie.</p>

<h2>Offline-first je postoj k návrhu, nie funkcia</h2>
<p>Offline schopnosť sa nedá pridať nakoniec; je to rozhodnutie, ktoré formuje celú architektúru. Offline-first systém berie lokálne zariadenie ako primárny zdroj pravdy a sieť ako optimalizáciu, ktorá môže a nemusí byť k dispozícii. Aplikácia číta a zapisuje lokálne a vždy ostáva responzívna; synchronizácia prebieha na pozadí, keď sa spojenie objaví. To obracia zaužívaný predpoklad a núti vás skoro sa postaviť naozaj ťažkej otázke: čo sa stane, keď dvaja ľudia alebo dve zariadenia zmenili tú istú vec, kým boli odpojené? Riešenie konfliktov je srdcom offline-first práce. Niekedy stačí „vyhráva posledný zápis"; niekedy treba zmeny zlúčiť; niekedy musí rozhodnúť človek. Univerzálna odpoveď neexistuje, no existuje univerzálna požiadavka — stratégiu si musíte zvoliť vedome, pre každý druh dát, lebo alternatívou je tichá strata dát, ktorá sa o týždne vynorí ako nahnevaný používateľ.</p>

<h2>On-premise je o kontrole a kontrola má cenu</h2>
<p>Prevádzka softvéru vnútri klientovho vlastného prostredia — jeho dátového centra, jeho privátnej siete, niekedy úplne air-gapped systému bez internetu — často nie je preferencia, ale tvrdá požiadavka domény. Prínos je jednoznačný: dáta nikdy neodídu, čo je pre mnohé regulované organizácie celá pointa. Cena je rovnako reálna. Prídete o spravované služby a elastické škálovanie cloudu; zdedíte obmedzenia prostredia; a nasadenie aj aktualizácie musíte rozbehať bez predpokladov, ktoré cloud berie ako samozrejmé. Softvér stavaný pre on-premise musí byť naozaj prenositeľný, jeho závislosti explicitné a sebestačné, jeho cesta k aktualizáciám navrhnutá tak, aby fungovala aj tam, kde človek prináša inštalátor na notebooku. Toto je nudné inžinierstvo — a presne to, ktoré oddeľuje softvér, ktorý sa do týchto prostredí naozaj dostane, od softvéru, ktorý sa v nich len predvedie.</p>

<h2>AI bez toho, aby ste vydali dáta</h2>
<p>Najaktuálnejšia podoba tohto problému je umelá inteligencia. Zjavný spôsob, ako pridať AI do produktu, je zavolať hostovaný model cez internet — čo je presne to, čo obranná agentúra, nemocnica alebo výrobca s dôvernými procesnými dátami často spraviť nesmú. Alternatívou je prevádzkovať schopné modely lokálne, na vlastnom hardvéri organizácie, aby sa citlivé dokumenty a proprietárne dáta použili na inferenciu bez toho, aby čo i len opustili budovu. Dnes je to naozaj praktické: otvorené modely sú dosť dobré a nástroje na ich efektívny beh na skromnom hardvéri dozreli. Inžinierstvo sa presúva od volania API k inej sade otázok — vybrať model, ktorý sadne na dostupný hardvér, poctivo zmerať kvalitu a rýchlosť voči tomuto obmedzeniu a postaviť vrstvu vyhľadávania a vyhodnocovania, ktorá spraví lokálny model užitočným nad konkrétnym telom privátnych znalostí. Výsledkom je systém, ktorý dá organizácii páku modernej AI a zároveň jej nechá to jediné, čo nesmie obetovať: kontrolu nad vlastnými dátami.</p>

<h2>Kompromis, povedaný na rovinu</h2>
<p>Nič z toho nie je zadarmo a predstierať opak by bola voči klientom medvedia služba. Offline-first a on-premise systémy si žiadajú starostlivejší návrh, explicitnejšie ošetrenie prípadov, ktoré cloud prekryje, a vyšší štandard prenositeľnosti a sebestačnosti. Na oplátku bežia tam, kam sa softvér s cloudom ako predvoľbou nedostane vôbec: v teréne, na výrobnej hale, vnútri regulovanej hranice, na privátnej sieti. Pre organizácie, ktorých najdôležitejšia práca žije presne na týchto miestach, to nie je okrajová požiadavka — je to celá požiadavka, a oplatí sa ju poriadne odinžinierovať.</p>
`,
    },
  },
];

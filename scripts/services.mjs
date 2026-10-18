// Source of truth for the service pages. Each service carries both languages; scripts/gen-services.mjs
// turns these into self-contained bilingual static pages at /services/<slug>/ (full text of both
// languages ships in the HTML for crawlers/AI; src/blog-post.ts toggles language + menu). The home
// page Products cards link here. Generated dirs are gitignored and rebuilt on predev/prebuild.

export const SERVICES = [
{
  slug: "ai-process-automation",
  id: "P/01",
  tag: { en: "AI automation", sk: "Automatizácia s AI" },
  title: { en: "AI process automation", sk: "Automatizácia procesov s AI" },
  lead: {
    en: "AI agents take over the repetitive, high-volume work so your people spend their time on the decisions that actually need them.",
    sk: "AI agenti preberú opakovanú prácu s veľkým objemom, aby sa vaši ľudia mohli venovať rozhodnutiam, ktoré ich naozaj potrebujú.",
  },
  description: {
    en: "We find the process worth automating, prove it in a pilot, then deploy AI agents into your systems with guardrails, an audit trail and EU-compliant data handling.",
    sk: "Nájdeme proces, ktorý sa oplatí automatizovať, overíme ho v pilote a nasadíme AI agentov do vašich systémov — so zábezpekami, auditným záznamom a spracovaním dát v súlade s EÚ.",
  },
  keywords: {
    en: "AI process automation, AI agents, RAG, LLM integration, workflow automation, EU AI Act compliance",
    sk: "automatizácia procesov s AI, AI agenti, RAG, integrácia LLM, automatizácia workflow, súlad s EU AI Act",
  },
  intro: {
    en: `<p>This is for established companies where a handful of processes quietly consume a disproportionate share of your team's time — reading documents, triaging emails, entering orders, answering the same customer questions — and where the people doing that work are too senior to be spending their days on it.</p><p>The goal is not to automate for its own sake. Most of the value comes from choosing the right process first: one that is high-volume, repetitive and tolerant of a review step, where a measurable amount of time is being spent every week. We start by finding that process and estimating what automating it is actually worth, before anyone writes a line of code.</p><p>What we build are AI agents grounded in your own data and wired into the systems you already run, with a human kept in the loop wherever a decision carries consequences. Every action leaves an audit trail, and the whole thing is built to comply with <strong>GDPR and the EU AI Act</strong> from the start, not bolted on afterwards.</p>`,
    sk: `<p>Toto je pre zavedené firmy, kde niekoľko procesov potichu spotrebúva neúmerne veľkú časť času vášho tímu — čítanie dokumentov, triedenie e-mailov, zadávanie objednávok, odpovedanie na tie isté otázky zákazníkov — a kde sú ľudia, ktorí túto prácu robia, príliš skúsení na to, aby ňou trávili dni.</p><p>Cieľom nie je automatizovať pre automatizáciu. Väčšina prínosu pochádza z toho, že najprv zvolíme ten správny proces: s veľkým objemom, opakovaný a znášajúci krok kontroly, kde sa každý týždeň merateľne míňa čas. Začíname tým, že tento proces nájdeme a odhadneme, čo jeho automatizácia naozaj prinesie, skôr než ktokoľvek napíše riadok kódu.</p><p>Staviame AI agentov podložených vašimi vlastnými dátami a napojených na systémy, ktoré už prevádzkujete, s človekom v slučke všade tam, kde rozhodnutie nesie dôsledky. Každá akcia zanecháva auditný záznam a celé je to postavené tak, aby bolo v súlade s <strong>GDPR a EU AI Act</strong> od začiatku, nie dolepené dodatočne.</p>`,
  },
  phasesTitle: { en: "How we deliver it", sk: "Ako to dodávame" },
  phases: [
    {
      name: { en: "Find the right process", sk: "Nájdenie správneho procesu" },
      body: {
        en: `<p>We spend about two weeks mapping where your team's time actually goes — which tasks are high-volume, repetitive, rule-shaped and tolerant of a review step. Not everything that looks automatable is worth automating, and some of it should not be touched with AI at all.</p><p>For the candidates that survive, we estimate the return in plain terms: hours spent now, realistic accuracy, the cost to build and run, and what human review will still cost. You get a short, costed shortlist and an honest recommendation on what to automate first — and what to leave alone.</p>`,
        sk: `<p>Približne dva týždne mapujeme, kam skutočne plynie čas vášho tímu — ktoré úlohy majú veľký objem, sú opakované, majú tvar pravidiel a znášajú krok kontroly. Nie všetko, čo vyzerá automatizovateľne, sa oplatí automatizovať, a niečoho z toho by sa AI nemala dotknúť vôbec.</p><p>Pri kandidátoch, ktorí prejdú, odhadneme návratnosť zrozumiteľne: koľko hodín sa míňa teraz, reálna presnosť, náklady na postavenie a prevádzku a čo bude ešte stáť ľudská kontrola. Dostanete krátky, nacenený užší výber a úprimné odporúčanie, čo automatizovať ako prvé — a čo nechať tak.</p>`,
      },
      output: {
        en: "A ranked shortlist with a per-process ROI estimate and a recommendation",
        sk: "Zoradený užší výber s odhadom ROI pre každý proces a odporúčaním",
      },
    },
    {
      name: { en: "Prove it in a pilot", sk: "Overenie v pilote" },
      body: {
        en: `<p>Before committing to production, we build a bounded pilot on the single process the ROI case ranks highest. It runs on real data and real cases, alongside your existing process rather than replacing it, so you can compare the agent's output against how the work is done today.</p><p>The pilot exists to answer one question honestly: is the accuracy high enough, and the value real enough, to justify building the full thing? Sometimes the answer is no, and it is far cheaper to learn that in a pilot than in production.</p>`,
        sk: `<p>Skôr než sa zaviažeme k produkcii, postavíme ohraničený pilot na jedinom procese, ktorý v prípade ROI vyšiel najvyššie. Beží na reálnych dátach a reálnych prípadoch, popri vašom existujúcom procese a nie namiesto neho, takže viete porovnať výstup agenta s tým, ako sa práca robí dnes.</p><p>Pilot existuje preto, aby úprimne odpovedal na jednu otázku: je presnosť dosť vysoká a prínos dosť reálny na to, aby sa oplatilo postaviť celé riešenie? Niekedy je odpoveď nie, a je oveľa lacnejšie zistiť to v pilote než v produkcii.</p>`,
      },
      output: {
        en: "A working pilot with measured accuracy and a go / no-go decision",
        sk: "Funkčný pilot s nameranou presnosťou a rozhodnutím ísť / neísť ďalej",
      },
    },
    {
      name: { en: "Build with guardrails", sk: "Stavba so zábezpekami" },
      body: {
        en: `<p>Once the pilot proves out, we build for production in two-week iterations, each ending in something you can inspect. The agent is grounded in your own documents and data — retrieval over your knowledge, not a generic chatbot guessing — so its answers trace back to sources you control.</p><p>Guardrails are part of the design, not an afterthought. Consequential actions wait for human approval, the agent acts only above a confidence threshold and falls back gracefully when it is unsure, and every step it takes is logged. The point is an agent you can trust to know the limits of what it knows.</p>`,
        sk: `<p>Keď sa pilot osvedčí, staviame pre produkciu v dvojtýždňových iteráciách, z ktorých každá končí niečím, čo si viete prezrieť. Agent je podložený vašimi vlastnými dokumentmi a dátami — vyhľadávanie nad vašimi znalosťami, nie všeobecný chatbot, ktorý háda — takže jeho odpovede sa dajú dohľadať k zdrojom, ktoré ovládate.</p><p>Zábezpeky sú súčasťou návrhu, nie dodatkom. Dôsledkové akcie čakajú na schválenie človekom, agent koná iba nad prahom istoty a pri neistote sa elegantne stiahne, a každý jeho krok sa zaznamenáva. Ide o agenta, ktorému sa dá veriť, že pozná hranice toho, čo vie.</p>`,
      },
      output: {
        en: "Production agents with human-in-the-loop controls and full logging",
        sk: "Produkční agenti s kontrolou človekom v slučke a úplným záznamom",
      },
    },
    {
      name: { en: "Integrate and comply", sk: "Integrácia a súlad" },
      body: {
        en: `<p>An agent is only useful when it can act where your work already happens, so we connect it directly to your ERP, CRM and internal systems through their APIs — reading and writing the same records your team does, under permissions you set.</p><p>Compliance is designed in alongside the integration. We keep your data private, with EU data residency and on-premise options where the sensitivity calls for it, document how the system makes decisions for the EU AI Act, and settle the GDPR questions — lawful basis, retention, data subject rights — before go-live rather than after.</p>`,
        sk: `<p>Agent je užitočný iba vtedy, keď dokáže konať tam, kde sa vaša práca už deje, preto ho napájame priamo na váš ERP, CRM a interné systémy cez ich API — číta a zapisuje tie isté záznamy ako váš tím, podľa oprávnení, ktoré nastavíte.</p><p>Súlad navrhujeme spolu s integráciou. Vaše dáta držíme súkromné, s možnosťou uloženia v EÚ a nasadenia on-premise tam, kde si to citlivosť vyžaduje, dokumentujeme, ako systém prijíma rozhodnutia, kvôli EU AI Act, a otázky GDPR — právny základ, uchovávanie, práva dotknutých osôb — riešime pred spustením, nie po ňom.</p>`,
      },
      output: {
        en: "Live integrations plus GDPR and EU AI Act documentation",
        sk: "Živé integrácie plus dokumentácia k GDPR a EU AI Act",
      },
    },
    {
      name: { en: "Launch and measure", sk: "Spustenie a meranie" },
      body: {
        en: `<p>We roll the agent into production gradually, usually starting with a share of real volume while people watch the results, and widen it as the numbers hold. Before that, load testing, a security pass and failure drills confirm it behaves under pressure and degrades safely when a model or an upstream system is unavailable.</p><p>From day one in production we measure the three things that matter: accuracy against human judgement, the quality of what it produces, and the running cost per case. Those numbers are visible to you, not buried — so the business case stays something you can check rather than take on faith.</p>`,
        sk: `<p>Agenta uvádzame do produkcie postupne, zvyčajne najprv na časti reálneho objemu, kým ľudia sledujú výsledky, a rozširujeme ho, keď čísla držia. Predtým záťažové testy, bezpečnostná previerka a nácviky zlyhaní potvrdia, že sa správa pod tlakom a bezpečne degraduje, keď model alebo nadradený systém nie je dostupný.</p><p>Od prvého dňa v produkcii meriame tri veci, na ktorých záleží: presnosť oproti ľudskému úsudku, kvalitu toho, čo produkuje, a prevádzkové náklady na prípad. Tieto čísla sú pre vás viditeľné, nie skryté — takže obchodný prípad zostáva niečím, čo si viete overiť, a nie len veriť.</p>`,
      },
      output: {
        en: "A monitored rollout with live accuracy, quality and cost metrics",
        sk: "Monitorované nasadenie so živými metrikami presnosti, kvality a nákladov",
      },
    },
    {
      name: { en: "Operate and improve", sk: "Prevádzka a zlepšovanie" },
      body: {
        en: `<p>AI systems drift — your documents change, your data shifts, model providers update underneath you — so the work does not end at launch. We watch the metrics, retune prompts and retrieval against real cases, and tighten or relax the guardrails as the evidence tells us where review is still earning its keep.</p><p>Everything transfers to you: the agents, the prompts and configuration, and the monitoring. You own what we built and can run, inspect and change it without us. We stay on only where you want us to, on terms you control.</p>`,
        sk: `<p>AI systémy sa posúvajú — vaše dokumenty sa menia, vaše dáta sa vyvíjajú, poskytovatelia modelov ich pod vami aktualizujú — takže práca sa spustením nekončí. Sledujeme metriky, dolaďujeme prompty a vyhľadávanie oproti reálnym prípadom a priťahujeme či uvoľňujeme zábezpeky podľa toho, kde sa kontrola stále vypláca.</p><p>Všetko prechádza na vás: agenti, prompty a konfigurácia aj monitoring. Vlastníte to, čo sme postavili, a viete to prevádzkovať, kontrolovať a meniť bez nás. Zostávame nablízku iba tam, kde chcete, za podmienok, ktoré určujete.</p>`,
      },
      output: {
        en: "Full ownership — agents, prompts, configuration and monitoring",
        sk: "Úplné vlastníctvo — agenti, prompty, konfigurácia a monitoring",
      },
    },
  ],
  deliverablesTitle: { en: "What you get", sk: "Čo dostanete" },
  deliverables: {
    en: [
      "A process audit and a per-process ROI estimate before any build",
      "AI agents integrated into your ERP, CRM and internal systems",
      "An internal knowledge base — an AI assistant grounded in your own documents",
      "Human-in-the-loop controls, confidence thresholds and graceful fallback",
      "An audit trail on every action the agent takes",
      "GDPR and EU AI Act compliance documentation, with EU and on-premise data options",
      "Monitoring of accuracy, quality and running cost, and full ownership at handover",
    ],
    sk: [
      "Audit procesov a odhad ROI pre každý proces ešte pred stavbou",
      "AI agentov integrovaných do vášho ERP, CRM a interných systémov",
      "Internú znalostnú bázu — AI asistenta podloženého vašimi vlastnými dokumentmi",
      "Kontrolu človekom v slučke, prahy istoty a elegantné stiahnutie pri neistote",
      "Auditný záznam o každej akcii, ktorú agent vykoná",
      "Dokumentáciu súladu s GDPR a EU AI Act, s možnosťou uloženia dát v EÚ a on-premise",
      "Monitoring presnosti, kvality a prevádzkových nákladov a úplné vlastníctvo pri odovzdaní",
    ],
  },
  approachTitle: {
    en: "How we think about AI automation",
    sk: "Ako rozmýšľame o automatizácii s AI",
  },
  approach: {
    en: `<p>The hard part of this work is not the model — it is knowing where AI belongs and where it does not. A large language model is the right tool for messy, language-shaped tasks that tolerate review: reading a document, drafting a reply, classifying a request. For anything that must be exactly right every time, deterministic rules are cheaper, faster and safer, and we will tell you when a few lines of logic beat an agent. Reaching for AI where a rule would do is how automation projects earn their bad reputation.</p><p>We also treat accuracy as a number, not a feeling. An agent that is right 95% of the time is only safe if the remaining 5% is caught, which is why the design always pairs a confidence threshold with a human review path and a clear fallback. The agent is built to <em>defer</em> when it is unsure rather than to guess confidently — the failure we design against is a wrong answer delivered as if it were certain.</p><p>And we keep your data yours. Grounding the agent in your own content through retrieval means it answers from sources you control instead of inventing, and EU data residency and on-premise options mean sensitive information need never leave infrastructure you trust. Private, auditable and compliant is the default here, not a premium add-on.</p>`,
    sk: `<p>Ťažkou časťou tejto práce nie je model — je to vedieť, kam AI patrí a kam nie. Veľký jazykový model je ten správny nástroj pre neusporiadané úlohy jazykového tvaru, ktoré znášajú kontrolu: prečítať dokument, navrhnúť odpoveď, zatriediť požiadavku. Pre čokoľvek, čo musí byť zakaždým presne správne, sú deterministické pravidlá lacnejšie, rýchlejšie a bezpečnejšie, a my vám povieme, keď pár riadkov logiky poráža agenta. Siahať po AI tam, kde by stačilo pravidlo, je presne to, čím si automatizačné projekty vyslúžia zlú povesť.</p><p>Presnosť berieme ako číslo, nie ako pocit. Agent, ktorý má pravdu v 95 % prípadov, je bezpečný len vtedy, ak sa zvyšných 5 % zachytí — preto návrh vždy spája prah istoty s cestou ľudskej kontroly a jasným stiahnutím. Agent je postavený tak, aby sa pri neistote radšej <em>zdržal</em>, než sebavedomo hádal — zlyhanie, proti ktorému navrhujeme, je nesprávna odpoveď podaná, akoby bola istá.</p><p>A vaše dáta ponechávame vaše. Podloženie agenta vaším vlastným obsahom cez vyhľadávanie znamená, že odpovedá zo zdrojov, ktoré ovládate, namiesto vymýšľania, a možnosť uloženia v EÚ a nasadenia on-premise znamená, že citlivé informácie nemusia nikdy opustiť infraštruktúru, ktorej dôverujete. Súkromné, auditovateľné a v súlade je tu predvolený stav, nie prémiový doplnok.</p>`,
  },
  faqTitle: { en: "Common questions", sk: "Časté otázky" },
  faq: [
    {
      q: {
        en: "How do you decide what to automate first?",
        sk: "Ako sa rozhodujete, čo automatizovať ako prvé?",
      },
      a: {
        en: `<p>We start from where your team's time actually goes, then filter for processes that are high-volume, repetitive and tolerant of a review step — the ones where automation pays back quickly and a mistake can be caught. Each candidate gets a plain ROI estimate covering the time spent today, realistic accuracy, and the cost to build and run. You get a ranked shortlist and a recommendation; automating for its own sake is how these projects lose money, so we are deliberate about sequencing.</p>`,
        sk: `<p>Vychádzame z toho, kam skutočne plynie čas vášho tímu, a potom filtrujeme procesy, ktoré majú veľký objem, sú opakované a znášajú krok kontroly — tie, kde sa automatizácia rýchlo vráti a chybu možno zachytiť. Každý kandidát dostane zrozumiteľný odhad ROI pokrývajúci dnes míňaný čas, reálnu presnosť a náklady na stavbu a prevádzku. Dostanete zoradený užší výber a odporúčanie; automatizovať pre automatizáciu je spôsob, akým tieto projekty prerábajú, preto sme pri poradí zámerní.</p>`,
      },
    },
    {
      q: {
        en: "Will the AI make things up?",
        sk: "Nebude si AI vymýšľať?",
      },
      a: {
        en: `<p>That is the risk we design against hardest. The agent is grounded in your own documents and data through retrieval, so its answers come from sources you control rather than from the model's general memory. On top of that it acts only above a confidence threshold, hands consequential decisions to a person, and falls back gracefully when it is unsure — the aim is an agent that knows the limits of what it knows and defers instead of guessing.</p>`,
        sk: `<p>Je to riziko, proti ktorému navrhujeme najtvrdšie. Agent je podložený vašimi vlastnými dokumentmi a dátami cez vyhľadávanie, takže jeho odpovede pochádzajú zo zdrojov, ktoré ovládate, a nie zo všeobecnej pamäte modelu. Navyše koná iba nad prahom istoty, dôsledkové rozhodnutia odovzdáva človeku a pri neistote sa elegantne stiahne — cieľom je agent, ktorý pozná hranice toho, čo vie, a radšej sa zdrží, než by hádal.</p>`,
      },
    },
    {
      q: {
        en: "How do you handle GDPR and the EU AI Act?",
        sk: "Ako riešite GDPR a EU AI Act?",
      },
      a: {
        en: `<p>Both are designed in from the start rather than bolted on before go-live. We keep your data private, with EU data residency and on-premise deployment options where the sensitivity calls for it, and we document how the system reaches its decisions so it stands up to EU AI Act scrutiny. The GDPR questions — lawful basis, retention, data subject rights and who can see what — are settled during the build, and every action the agent takes is logged for audit.</p>`,
        sk: `<p>Oboje navrhujeme od začiatku, nie dolepené tesne pred spustením. Vaše dáta držíme súkromné, s možnosťou uloženia v EÚ a nasadenia on-premise tam, kde si to citlivosť vyžaduje, a dokumentujeme, ako systém dospieva k rozhodnutiam, aby obstál pri posudzovaní podľa EU AI Act. Otázky GDPR — právny základ, uchovávanie, práva dotknutých osôb a kto čo vidí — vyriešime počas stavby, a každá akcia agenta sa zaznamenáva pre audit.</p>`,
      },
    },
    {
      q: {
        en: "What if AI turns out to be the wrong tool?",
        sk: "Čo ak sa ukáže, že AI je nesprávny nástroj?",
      },
      a: {
        en: `<p>Then we say so, ideally in the pilot before you have spent real money. Plenty of processes are better served by deterministic rules — cheaper to run, faster, and exactly right every time — and we would rather recommend a few lines of logic than sell you an agent that fits badly. The bounded pilot exists precisely so a no-go decision is cheap, and a no is a legitimate and common outcome.</p>`,
        sk: `<p>Potom to povieme, ideálne v pilote skôr, než miniete skutočné peniaze. Mnohým procesom lepšie poslúžia deterministické pravidlá — lacnejšie na prevádzku, rýchlejšie a zakaždým presne správne — a radšej odporučíme pár riadkov logiky, než by sme vám predali agenta, ktorý sedí zle. Ohraničený pilot existuje práve preto, aby rozhodnutie neísť ďalej bolo lacné, a nie je to ani nelegitímny, ani vzácny výsledok.</p>`,
      },
    },
    {
      q: {
        en: "Who owns and runs the system afterwards?",
        sk: "Kto systém následne vlastní a prevádzkuje?",
      },
      a: {
        en: `<p>You do. At handover the agents, the prompts and configuration, and the monitoring all transfer to your team, with the documentation and training to run and change them without us. Because the same senior people who scoped the work built it, the handover is a transfer of something they understand fully, not a translation through a chain of account managers. We stay involved only where you want us to, on terms you set.</p>`,
        sk: `<p>Vy. Pri odovzdaní prechádzajú na váš tím agenti, prompty a konfigurácia aj monitoring, spolu s dokumentáciou a zaškolením, aby ste ich vedeli prevádzkovať a meniť bez nás. Keďže tí istí skúsení ľudia, ktorí prácu naplánovali, ju aj postavili, odovzdanie je prenosom niečoho, čomu plne rozumejú, nie prekladom cez reťazec account manažérov. Zostávame zapojení iba tam, kde chcete, za podmienok, ktoré určíte.</p>`,
      },
    },
  ],
  cta: {
    title: {
      en: "Have a process worth automating?",
      sk: "Máte proces, ktorý sa oplatí automatizovať?",
    },
    body: {
      en: "Start with a short, fixed-fee discovery: we map where your team's time goes, find the best candidate and estimate the ROI before anyone builds anything.",
      sk: "Začnite krátkym fixným auditom: zmapujeme, kam plynie čas vášho tímu, nájdeme najlepšieho kandidáta a odhadneme ROI skôr, než sa čokoľvek postaví.",
    },
    action: {
      en: "Book a discovery call",
      sk: "Dohodnúť úvodný hovor",
    },
  },
  chips: {
    en: ["AI agents", "RAG", "LLM integrations", "Workflow automation", "Human-in-the-loop", "EU AI Act"],
    sk: ["AI agenti", "RAG", "Integrácie LLM", "Automatizácia workflow", "Človek v slučke", "EU AI Act"],
  },
},
{
  slug: "custom-software-modernization",
  id: "P/02",
  tag: { en: "Custom software", sk: "Softvér na mieru" },
  title: {
    en: "Custom software & system modernization",
    sk: "Softvér na mieru a modernizácia systémov",
  },
  lead: {
    en: "When your core system runs the business, a rewrite is a gamble you cannot take. We modernize it piece by piece, in production, with no overnight switch that could take the whole company down.",
    sk: "Keď na vašom systéme stojí celý biznis, prepísať ho nanovo je stávka, ktorú si nemôžete dovoliť. Modernizujeme ho po častiach, priamo v prevádzke, bez nočného prepnutia, ktoré by mohlo položiť celú firmu.",
  },
  description: {
    en: "We modernize load-bearing legacy systems incrementally — one capability at a time, live in production, no big-bang cutover, with the code and know-how staying yours.",
    sk: "Modernizujeme nosné legacy systémy postupne — jednu schopnosť po druhej, priamo v prevádzke, bez veľkého prepnutia, pričom kód aj znalosti zostávajú vám.",
  },
  keywords: {
    en: "legacy system modernization, custom software development, strangler pattern migration, incremental rewrite, data migration, system integration",
    sk: "modernizácia legacy systémov, vývoj softvéru na mieru, strangler pattern, postupné prepisovanie systému, migrácia dát, integrácia systémov",
  },
  intro: {
    en: `<p>This is for established companies whose software has become the business — the system that books the orders, moves the money, or runs the floor. It works, mostly, but it is years of decisions deep, the people who built it have moved on, and every change feels risky. A clean rewrite sounds tempting until you price the two years of running both worlds at once, and a failed cutover is the kind of event that reaches the board.</p><p>We take the opposite bet. Instead of a single switch from old to new, we modernize the system in place, one capability at a time, with each replacement running in production next to the part it replaces until it has earned the right to take over. The business keeps running the whole way through. There is no weekend where everything changes and everyone holds their breath.</p><p>The people who scope this work are the people who ship it — one senior team, the same architecture review, from the first read of your code to the last legacy path switched off. You own the result outright, with no dependency on us to keep it alive.</p>`,
    sk: `<p>Toto je pre zavedené firmy, ktorých softvér sa stal samotným biznisom — systém, ktorý prijíma objednávky, posúva peniaze alebo riadi prevádzku. Väčšinou funguje, no je navrstvený z rokov rozhodnutí, ľudia, ktorí ho stavali, už dávno odišli a každá zmena pôsobí rizikovo. Prepísať ho nanovo znie lákavo, kým si nespočítate dva roky súbežnej prevádzky dvoch svetov — a neúspešné prepnutie je udalosť, ktorá sa dostane až pred predstavenstvo.</p><p>My stavíme na opak. Namiesto jediného prepnutia zo starého na nové modernizujeme systém priamo na mieste, jednu schopnosť po druhej, pričom každá náhrada beží v prevádzke vedľa časti, ktorú nahrádza, dokým nedokáže, že jej úlohu zvládne prevziať. Biznis beží po celý čas. Niet víkendu, počas ktorého sa všetko zmení a všetci zatajujú dych.</p><p>Ľudia, ktorí prácu navrhnú, sú tí, čo ju aj dodajú — jeden senior tím, rovnaký architektonický dohľad, od prvého prečítania vášho kódu až po vypnutie poslednej legacy cesty. Výsledok vlastníte úplne, bez závislosti na nás, aby ste ho udržali nažive.</p>`,
  },
  phasesTitle: {
    en: "How we modernize without stopping the business",
    sk: "Ako modernizujeme bez zastavenia biznisu",
  },
  phases: [
    {
      name: { en: "Discovery and audit", sk: "Prieskum a audit" },
      body: {
        en: `<p>We spend the first couple of weeks reading the code and tracing the data, not just interviewing people — because the real system is in what actually runs, and the gap between how a system is described and how it behaves is where the risk lives. We follow the critical paths end to end, find the undocumented jobs and the integrations nobody mentions, and watch where the data truly flows.</p><p>You come out of it with a dependency map and a risk register your board can act on — what is load-bearing, what is fragile, what would cost you most if it failed — plus a written, costed plan for the order we would tackle it in. It is a short fixed-fee audit, and it stands on its own even if you take it to someone else.</p>`,
        sk: `<p>Prvé zhruba dva týždne trávime čítaním kódu a sledovaním dát, nie len rozhovormi s ľuďmi — pretože skutočný systém je v tom, čo reálne beží, a priepasť medzi tým, ako je systém opísaný a ako sa správa, je miesto, kde sa skrýva riziko. Prechádzame kritické cesty od začiatku do konca, nachádzame nezdokumentované úlohy a integrácie, ktoré nikto nespomenul, a sledujeme, kadiaľ dáta skutočne tečú.</p><p>Odchádzate s mapou závislostí a registrom rizík, s ktorými vaše predstavenstvo vie pracovať — čo je nosné, čo je krehké a čo by vás stálo najviac, keby to zlyhalo — a s písomným a naceneným plánom poradia, v akom by sme to riešili. Je to krátky audit s pevnou cenou a obstojí sám osebe, aj keby ste s ním šli inam.</p>`,
      },
      output: {
        en: "A dependency map, a prioritised risk register, and a costed modernization plan",
        sk: "Mapa závislostí, prioritizovaný register rizík a nacenený plán modernizácie",
      },
    },
    {
      name: { en: "Architecture and sequencing", sk: "Architektúra a poradie" },
      body: {
        en: `<p>We design the target shape and, just as importantly, the order of operations to reach it. A routing layer goes in front of the legacy system so traffic can be sent to either the old path or a new one per capability — this is what makes incremental replacement possible without the business noticing a seam.</p><p>Sequencing is driven by business risk, not by which parts are the most satisfying to rebuild. We start where a failure would hurt most or where the old code blocks everything else, and we leave the quiet, stable corners for last — sometimes forever, if replacing them buys nothing. Every significant decision is written down as a short record of what we chose and why.</p>`,
        sk: `<p>Navrhujeme cieľový tvar a — rovnako dôležité — poradie krokov, ktorými sa k nemu dostaneme. Pred legacy systém vložíme smerovaciu vrstvu, aby bolo možné posielať prevádzku buď na starú, alebo na novú cestu podľa jednotlivých schopností — práve to umožňuje postupnú náhradu bez toho, aby biznis zbadal spoj.</p><p>Poradie určuje riziko pre biznis, nie to, ktoré časti sa prepisujú najpríjemnejšie. Začíname tam, kde by zlyhanie bolelo najviac alebo kde starý kód blokuje všetko ostatné, a tiché, stabilné kúty necháme nakoniec — niekedy navždy, ak ich náhrada neprinesie nič. Každé významné rozhodnutie zapisujeme ako krátky záznam o tom, čo sme zvolili a prečo.</p>`,
      },
      output: {
        en: "A target architecture, a routing layer plan, and a risk-ordered sequence with decision records",
        sk: "Cieľová architektúra, návrh smerovacej vrstvy a poradie podľa rizika so záznamami rozhodnutí",
      },
    },
    {
      name: { en: "Build in slices", sk: "Stavba po častiach" },
      body: {
        en: `<p>We work in two-week iterations, each ending in working software demoed to the people who use it. A slice is one capability — a report, a workflow, an API — rebuilt, deployed behind the routing layer, and run live alongside the old version so the two can be compared on real traffic before anything is trusted to the new path.</p><p>Nothing is a big reveal at the end. You see each piece land, in production, while the system you depend on keeps serving everyone exactly as before. If a slice is not right, we have changed one capability, not bet the company.</p>`,
        sk: `<p>Pracujeme v dvojtýždňových iteráciách, z ktorých každá končí funkčným softvérom predvedeným ľuďom, ktorí ho používajú. Časť je jedna schopnosť — report, pracovný postup, API — prestavaná, nasadená za smerovaciu vrstvu a bežiaca naživo popri starej verzii, aby sa obe dali porovnať na reálnej prevádzke skôr, než sa čokoľvek zverí novej ceste.</p><p>Nič nie je veľké odhalenie na konci. Každý diel vidíte pristáť v prevádzke, kým systém, na ktorom stojíte, obsluhuje všetkých presne ako predtým. Ak časť nie je v poriadku, zmenili sme jednu schopnosť, nie stávku o celú firmu.</p>`,
      },
      output: {
        en: "Working releases every two weeks, each one capability live in production",
        sk: "Funkčné vydania každé dva týždne, vždy jedna schopnosť naživo v prevádzke",
      },
    },
    {
      name: { en: "Migrate and integrate", sk: "Migrácia a integrácia" },
      body: {
        en: `<p>Moving the data is the hard part, and we treat it that way. For each slice we run the old and new stores in parallel, reconcile them continuously, and only cut a capability over once the numbers match — then keep the old path warm so we can fall back in minutes if something surfaces. Every migration step is reversible until we delete the old path, which we do only once it has proven itself.</p><p>Where you have systems we cannot or should not replace, we integrate around them — the payroll engine, the regulator's interface, the warehouse controller — so the modern parts and the legacy core cooperate cleanly instead of being forced into one rewrite.</p>`,
        sk: `<p>Presun dát je tá ťažká časť a tak k nemu aj pristupujeme. Pre každú časť necháme staré a nové úložisko bežať súbežne, priebežne ich zosúlaďujeme a schopnosť prepneme až vtedy, keď sa čísla zhodujú — a potom necháme starú cestu v pohotovosti, aby sme sa k nej vedeli vrátiť v priebehu minút, ak sa niečo vynorí. Každý krok migrácie je vratný, až kým starú cestu nezmažeme, čo urobíme, len keď sa osvedčí.</p><p>Tam, kde máte systémy, ktoré nemôžeme alebo nemáme nahrádzať, integrujeme okolo nich — mzdový engine, rozhranie regulátora, riadenie skladu — tak, aby moderné časti a legacy jadro spolupracovali čisto namiesto toho, aby boli natlačené do jedného prepisu.</p>`,
      },
      output: {
        en: "Data migrated slice by slice with dual-run and reconciliation, integrations in place, each step reversible",
        sk: "Dáta migrované po častiach so súbežnou prevádzkou a zosúladením, integrácie na mieste, každý krok vratný",
      },
    },
    {
      name: { en: "Cutover and harden", sk: "Prepnutie a spevnenie" },
      body: {
        en: `<p>Cutover happens in slices, never all at once, and each one is rehearsed. We load-test the new paths, run security and failure drills, and confirm regulatory obligations — GDPR, and sector rules where they apply — before the old code is switched off. Only after a capability has carried full production traffic cleanly do we delete its legacy path for good.</p><p>You get a readiness report for each cutover: what was tested, what the fallback is, and the evidence that the new path matches the old one. The result is fewer moving parts than you started with, not more.</p>`,
        sk: `<p>Prepnutie prebieha po častiach, nikdy naraz, a každé je nacvičené. Nové cesty záťažovo testujeme, robíme bezpečnostné skúšky a skúšky zlyhania a potvrdzujeme regulačné povinnosti — GDPR a sektorové pravidlá tam, kde platia — skôr, než sa starý kód vypne. Legacy cestu konkrétnej schopnosti zmažeme natrvalo až potom, čo bez problémov unesie plnú produkčnú prevádzku.</p><p>Ku každému prepnutiu dostanete správu o pripravenosti: čo sa testovalo, aká je záložná cesta a dôkaz, že nová cesta sa zhoduje so starou. Výsledkom je menej pohyblivých častí, než ste mali na začiatku, nie viac.</p>`,
      },
      output: {
        en: "Load, security and failure testing, a readiness report per cutover, and legacy paths retired",
        sk: "Záťažové, bezpečnostné a poruchové testy, správa o pripravenosti ku každému prepnutiu a vyradené legacy cesty",
      },
    },
    {
      name: { en: "Handover", sk: "Odovzdanie" },
      body: {
        en: `<p>Everything is built to be owned by you, not rented from us. We hand over documented code, the decision records, runbooks for the things that can go wrong, and training for the people who will carry it. We stay for a defined transition and then step back on purpose.</p><p>We choose boring, proven technology from the start precisely so that this moment works — stacks you can hire for and that will still be supported in a decade, with every choice written down. There is no proprietary ETEREO layer you would have to keep paying for.</p>`,
        sk: `<p>Všetko je postavené tak, aby ste to vlastnili vy, nie aby ste si to od nás prenajímali. Odovzdávame zdokumentovaný kód, záznamy rozhodnutí, príručky pre prípady, keď sa niečo pokazí, a zaškolenie ľudí, ktorí to budú niesť. Zostaneme na vymedzený čas prechodu a potom zámerne ustúpime.</p><p>Nudnú, overenú technológiu volíme od začiatku práve preto, aby tento moment vyšiel — technológie, na ktoré viete nabrať ľudí a ktoré budú podporované aj o desať rokov, s každým rozhodnutím zapísaným. Niet žiadnej proprietárnej vrstvy ETEREO, za ktorú by ste museli ďalej platiť.</p>`,
      },
      output: {
        en: "Documentation, runbooks, training, and full ownership of the code and the know-how",
        sk: "Dokumentácia, príručky, zaškolenie a úplné vlastníctvo kódu aj znalostí",
      },
    },
  ],
  deliverablesTitle: {
    en: "What you walk away with",
    sk: "S čím odchádzate",
  },
  deliverables: {
    en: [
      "A dependency map and risk register your board can act on",
      "A costed, risk-ordered modernization plan from the fixed-fee audit",
      "A routing layer that lets old and new run side by side",
      "Decision records explaining every significant choice",
      "Data migrated in reversible slices, with reconciliation evidence",
      "Clean integrations with the systems you keep",
      "Documented code, runbooks, training, and full ownership",
    ],
    sk: [
      "Mapa závislostí a register rizík, s ktorými vie pracovať predstavenstvo",
      "Nacenený plán modernizácie podľa rizika z auditu s pevnou cenou",
      "Smerovacia vrstva, ktorá umožní starému a novému bežať popri sebe",
      "Záznamy rozhodnutí vysvetľujúce každú významnú voľbu",
      "Dáta migrované vo vratných častiach s dôkazom o zosúladení",
      "Čisté integrácie so systémami, ktoré si ponechávate",
      "Zdokumentovaný kód, príručky, zaškolenie a úplné vlastníctvo",
    ],
  },
  approachTitle: {
    en: "How we think about modernization",
    sk: "Ako rozmýšľame o modernizácii",
  },
  approach: {
    en: `<p>The honest case against a big-bang rewrite is simple: it asks you to run two systems in parallel for years, reproduce behaviour nobody fully remembers, and then switch everything on one date — and the day you learn whether it worked is the worst possible day to find out. Most rewrites that start this way either never ship or ship late and wounded.</p><p>The incremental path we use is sometimes called the strangler approach: you put a routing layer in front of the old system and grow the new one around it, replacing a capability at a time, until the legacy core has been quietly surrounded and can be removed. The business never stops. Risk is paid down in small, reversible increments instead of saved up for one enormous bet.</p><p>We choose technology for longevity and hiring, not novelty — the kind of stack a new engineer already knows and that will still be maintained long after we are gone. Every decision is documented, because a modernization you cannot understand later is just a different legacy system.</p>`,
    sk: `<p>Čestný argument proti veľkému prepísaniu nanovo je jednoduchý: žiada od vás, aby ste roky prevádzkovali dva systémy súbežne, zreprodukovali správanie, ktoré si už nikto úplne nepamätá, a potom všetko zapli v jeden dátum — pričom deň, keď sa dozviete, či to fungovalo, je ten najhorší možný deň na to, aby ste to zistili. Väčšina prepisov, ktoré takto začnú, buď nikdy nedoputuje do prevádzky, alebo doputuje neskoro a doráňaná.</p><p>Postupná cesta, ktorú používame, sa niekedy nazýva strangler prístup: pred starý systém vložíte smerovaciu vrstvu a nový systém okolo neho necháte rásť, nahrádzajúc jednu schopnosť po druhej, dokým legacy jadro ticho neobkolesíte a nedá sa odstrániť. Biznis sa nikdy nezastaví. Riziko sa spláca v malých, vratných krokoch namiesto toho, aby sa šetrilo na jednu obrovskú stávku.</p><p>Technológiu volíme pre dlhovekosť a nábor, nie pre novosť — taký stack, ktorý nový inžinier už pozná a ktorý bude udržiavaný dávno potom, čo my odídeme. Každé rozhodnutie je zdokumentované, pretože modernizácia, ktorej neskôr nerozumiete, je len iný legacy systém.</p>`,
  },
  faqTitle: {
    en: "Common questions",
    sk: "Časté otázky",
  },
  faq: [
    {
      q: {
        en: "Why not just rewrite it from scratch?",
        sk: "Prečo to jednoducho neprepísať nanovo?",
      },
      a: {
        en: `<p>Because a rewrite asks you to reproduce years of accumulated behaviour, run two systems at once for a long time, and then bet the business on a single cutover date. For a load-bearing system, that risk is rarely worth it. Replacing one capability at a time keeps the business running and lets you stop, or change course, at any point — something a big-bang rewrite never allows.</p>`,
        sk: `<p>Pretože prepísanie od vás žiada zreprodukovať roky nahromadeného správania, prevádzkovať dlho dva systémy naraz a potom staviť biznis na jediný dátum prepnutia. Pri nosnom systéme sa to riziko málokedy oplatí. Nahradenie jednej schopnosti po druhej udrží biznis v chode a umožní vám kedykoľvek sa zastaviť alebo zmeniť kurz — čo veľké prepísanie nikdy nedovolí.</p>`,
      },
    },
    {
      q: {
        en: "How do you modernize without downtime?",
        sk: "Ako modernizujete bez výpadku?",
      },
      a: {
        en: `<p>A routing layer sits in front of the legacy system and sends each request to the old path or a new one. We build a capability, run it in production next to the version it replaces, compare them on real traffic, and only then route users to it. Because every slice is reversible until the old path is deleted, there is no weekend cutover and no moment where the whole system changes at once.</p>`,
        sk: `<p>Pred legacy systémom sedí smerovacia vrstva a každú požiadavku posiela buď na starú, alebo na novú cestu. Postavíme schopnosť, spustíme ju v prevádzke vedľa verzie, ktorú nahrádza, porovnáme ich na reálnej prevádzke a až potom na ňu smerujeme používateľov. Keďže každá časť je vratná, až kým sa stará cesta nezmaže, niet víkendového prepnutia ani okamihu, keď sa celý systém zmení naraz.</p>`,
      },
    },
    {
      q: {
        en: "What about our data — isn't migration the scary part?",
        sk: "Čo s našimi dátami — nie je migrácia tá desivá časť?",
      },
      a: {
        en: `<p>It is the hard part, so we treat it as the main event rather than a final step. For each slice we run the old and new data stores in parallel, reconcile them continuously, and cut over only when the numbers agree — keeping the old path warm so we can fall back in minutes. We migrate in slices, not in one overnight dump, so a problem is contained to one capability instead of the whole dataset.</p>`,
        sk: `<p>Je to tá ťažká časť, preto ju berieme ako hlavnú udalosť, nie ako posledný krok. Pre každú časť necháme staré a nové úložisko bežať súbežne, priebežne ich zosúlaďujeme a prepneme až vtedy, keď sa čísla zhodujú — pričom starú cestu držíme v pohotovosti, aby sme sa k nej vedeli vrátiť v priebehu minút. Migrujeme po častiach, nie jedným nočným presunom, takže problém sa udrží v jednej schopnosti namiesto celého súboru dát.</p>`,
      },
    },
    {
      q: {
        en: "Will we be locked in to ETEREO afterwards?",
        sk: "Budeme potom uviazaní na ETEREO?",
      },
      a: {
        en: `<p>No, and we design against it deliberately. You own the code, and we hand over documentation, decision records, runbooks and training so your own team can run and extend it. We build on boring, proven, widely known technology precisely so you can hire for it, and there is no proprietary layer of ours that you would have to keep paying to license.</p>`,
        sk: `<p>Nie, a zámerne to tak navrhujeme. Kód vlastníte vy a odovzdávame dokumentáciu, záznamy rozhodnutí, príručky a zaškolenie, aby ho váš vlastný tím vedel prevádzkovať a rozširovať. Staviame na nudnej, overenej a široko známej technológii práve preto, aby ste naň vedeli nabrať ľudí, a niet žiadnej našej proprietárnej vrstvy, za licenciu ktorej by ste museli ďalej platiť.</p>`,
      },
    },
    {
      q: {
        en: "Can you work with a system you cannot fully replace?",
        sk: "Viete pracovať so systémom, ktorý sa nedá úplne nahradiť?",
      },
      a: {
        en: `<p>Yes — that is the normal case. Some parts are too regulated, too specialised, or simply not worth replacing. We integrate around them cleanly, letting the modern capabilities and the legacy core cooperate, and we are honest when the right answer is to leave something as it is rather than spend your budget touching a stable corner that works.</p>`,
        sk: `<p>Áno — to je bežný prípad. Niektoré časti sú príliš regulované, príliš špecializované alebo jednoducho nestojí za to ich nahrádzať. Integrujeme okolo nich čisto, necháme moderné schopnosti a legacy jadro spolupracovať, a sme úprimní, keď je správnou odpoveďou nechať niečo tak, ako to je, namiesto toho, aby sme vám minuli rozpočet na stabilný kút, ktorý funguje.</p>`,
      },
    },
  ],
  cta: {
    title: {
      en: "Is your core system too important to rewrite?",
      sk: "Je vaše jadro príliš dôležité na to, aby ste ho prepisovali?",
    },
    body: {
      en: "Start with a short, fixed-fee audit — we read the code and the data and give your board a dependency map, a risk register, and a costed plan for modernizing without stopping the business.",
      sk: "Začnite krátkym auditom s pevnou cenou — prečítame kód aj dáta a dáme vášmu predstavenstvu mapu závislostí, register rizík a nacenený plán, ako modernizovať bez zastavenia biznisu.",
    },
    action: {
      en: "Book a modernization audit",
      sk: "Objednať audit modernizácie",
    },
  },
  chips: {
    en: [
      "Strangler pattern",
      "Routing layer",
      "Dual-run data migration",
      "Legacy integration",
      "Zero big-bang cutover",
      "Proven tech stack",
    ],
    sk: [
      "Strangler pattern",
      "Smerovacia vrstva",
      "Migrácia dát so súbežným behom",
      "Integrácia legacy",
      "Žiadne veľké prepnutie",
      "Overený technologický stack",
    ],
  },
},
{
  slug: "saas-product-development",
  id: "P/03",
  tag: { en: "SaaS", sk: "SaaS" },
  title: { en: "SaaS product development", sk: "Vývoj SaaS produktu" },
  lead: {
    en: "We build multi-tenant SaaS products from the first release to real scale — including the billing, permissions, admin and telemetry that quietly decide whether a product survives its first hundred customers.",
    sk: "Staviame multi-tenant SaaS produkty od prvého vydania až po reálne škálovanie — vrátane fakturácie, oprávnení, administrácie a telemetrie, ktoré ticho rozhodujú o tom, či produkt prežije prvú stovku zákazníkov.",
  },
  description: {
    en: "We build multi-tenant SaaS products end to end: a real MVP, tenant isolation, billing, auth and admin, then deliberate scaling. You own the product.",
    sk: "Staviame multi-tenant SaaS produkty od začiatku do konca: reálne MVP, izoláciu tenantov, fakturáciu, prihlasovanie a administráciu, potom uvážlivé škálovanie. Produkt je váš.",
  },
  keywords: {
    en: "SaaS product development, multi-tenant architecture, subscription billing, MVP development, SaaS scaling, tenant isolation",
    sk: "vývoj SaaS produktu, multi-tenant architektúra, predplatné a fakturácia, vývoj MVP, škálovanie SaaS, izolácia tenantov",
  },
  intro: {
    en: `<p>You are building a multi-tenant product — a platform many customers will sign in to, pay for and trust with their data. Maybe you are a founder starting from zero, or a company turning an internal tool that already works into something you can sell. Either way the hard part is rarely the feature you are excited about. It is the machinery around it.</p><p>Most SaaS products do not fail because the main feature was weak. They fail because tenant isolation was bolted on late, billing could not express the plan a sales call just promised, or the database and the team buckled at the moment growth finally arrived. We build the whole product — the visible feature and the invisible machinery — so that none of those becomes the thing that stops you.</p>`,
    sk: `<p>Staviate multi-tenant produkt — platformu, do ktorej sa bude prihlasovať množstvo zákazníkov, bude za ňu platiť a zverí jej svoje dáta. Možno ste zakladateľ, ktorý začína od nuly, alebo firma, ktorá mení interný nástroj, čo už funguje, na niečo predajné. Tak či onak, to ťažké je zriedka tá funkcia, z ktorej ste nadšení. Sú to veci okolo nej.</p><p>Väčšina SaaS produktov nezlyhá preto, že hlavná funkcia bola slabá. Zlyhajú preto, že izolácia tenantov sa dorábala neskoro, fakturácia nedokázala vyjadriť plán, ktorý práve sľúbil obchodný hovor, alebo sa databáza a tím zlomili vo chvíli, keď rast konečne prišiel. My staviame celý produkt — viditeľnú funkciu aj neviditeľnú mašinériu — tak, aby sa ani jedna z týchto vecí nestala tým, čo vás zastaví.</p>`,
  },
  phasesTitle: { en: "How we build your SaaS", sk: "Ako staviame váš SaaS" },
  phases: [
    {
      name: { en: "Shape the product", sk: "Vytvarovanie produktu" },
      body: {
        en: `<p>Before any code, we find the one assumption your product actually rests on — the thing that, if it is wrong, makes everything else irrelevant — and we design the smallest release that proves it. A real MVP is not a thin slice of every feature you have imagined; it is the smallest product that can go live, be paid for, and show whether people value what you are offering.</p><p>We map the tenants, the roles, the data and the flow of money, and we name the risks early rather than discovering them in month four. This is a short, fixed-fee engagement that ends in a written, costed plan you own whether or not you continue with us.</p>`,
        sk: `<p>Pred akýmkoľvek kódom nájdeme ten jeden predpoklad, na ktorom váš produkt naozaj stojí — tú vec, ktorá, ak je nesprávna, robí všetko ostatné zbytočným — a navrhneme najmenšie vydanie, ktoré ho overí. Reálne MVP nie je tenký plátok z každej funkcie, ktorú ste si predstavili; je to najmenší produkt, ktorý môže ísť naživo, dá sa zaň platiť a ukáže, či ľudia oceňujú to, čo ponúkate.</p><p>Zmapujeme tenantov, roly, dáta a tok peňazí a riziká pomenujeme včas, nie až keď ich objavíme vo štvrtom mesiaci. Je to krátka zákazka s pevnou cenou, ktorá končí písomným, naceneným plánom, ktorý je váš, či už budete pokračovať s nami alebo nie.</p>`,
      },
      output: {
        en: "A written, costed plan and a scoped MVP",
        sk: "Písomný nacenený plán a vymedzené MVP",
      },
    },
    {
      name: { en: "Architecture and multi-tenancy", sk: "Architektúra a multi-tenancy" },
      body: {
        en: `<p>Multi-tenancy is a decision in the data layer, and it has to be made on day one. Who can see whose data, how a tenant is isolated, how you will ever migrate or export one customer without touching the rest — these are cheap to design in and brutally expensive to retrofit. Retrofitting isolation into a product that already has customers is one of the most common ways a SaaS quietly dies.</p><p>We document the target architecture up front: the isolation model, the tenancy boundaries, how billing and permissions attach to them, and the trade-offs behind each choice. You get decision records, not just diagrams, so the reasoning survives after the whiteboard is wiped.</p>`,
        sk: `<p>Multi-tenancy je rozhodnutie v dátovej vrstve a musí padnúť hneď v prvý deň. Kto vidí čie dáta, ako je tenant izolovaný, ako niekedy presuniete alebo vyexportujete jedného zákazníka bez toho, aby ste sa dotkli ostatných — toto sa dá lacno navrhnúť a brutálne draho dorábať. Dorobenie izolácie do produktu, ktorý už má zákazníkov, patrí medzi najčastejšie spôsoby, akými SaaS ticho zomrie.</p><p>Cieľovú architektúru zdokumentujeme vopred: model izolácie, hranice tenancy, ako sa na ne naviažu fakturácia a oprávnenia, a kompromisy za každou voľbou. Dostanete záznamy rozhodnutí, nielen diagramy, aby zdôvodnenie prežilo aj po zotretí tabule.</p>`,
      },
      output: {
        en: "Architecture and tenancy decision records",
        sk: "Záznamy rozhodnutí o architektúre a tenancy",
      },
    },
    {
      name: { en: "Build the MVP", sk: "Postavenie MVP" },
      body: {
        en: `<p>We build in two-week iterations, each ending in working software you and real users can try — not a status report. The MVP is the product that proves value and can actually go live, so we keep it honest: we ship the core workflow end to end before we widen it, and we resist the pull to add one more feature before the first one has earned its place.</p><p>The same senior people who scoped the work write the code. There is no hand-off down a chain, so the person answering your question in week six is the person who made the decision in week two.</p>`,
        sk: `<p>Staviame v dvojtýždňových iteráciách, z ktorých každá končí funkčným softvérom, ktorý si vy aj reálni používatelia môžete vyskúšať — nie stavovým hlásením. MVP je produkt, ktorý dokazuje hodnotu a naozaj môže ísť naživo, preto ho držíme čestné: najprv dodáme hlavný pracovný tok od začiatku do konca, až potom ho rozširujeme, a bránime sa pokušeniu pridať ešte jednu funkciu skôr, než si tá prvá zaslúži svoje miesto.</p><p>Tí istí seniorní ľudia, ktorí prácu vymedzili, píšu aj kód. Niet odovzdávania po reťazi, takže človek, ktorý vám v šiestom týždni odpovedá na otázku, je ten istý, čo v druhom týždni urobil rozhodnutie.</p>`,
      },
      output: {
        en: "A working MVP, shipped in fortnightly releases",
        sk: "Funkčné MVP dodané v dvojtýždňových vydaniach",
      },
    },
    {
      name: { en: "Billing, auth and admin", sk: "Fakturácia, prihlasovanie a administrácia" },
      body: {
        en: `<p>Subscriptions and billing are a product surface, not a checkout button bolted on at the end. Plans, proration when someone upgrades mid-month, trials, dunning when a card fails, tax and VAT across borders — each of these is a place customers leave or stay, and we build them as deliberately as any feature they can see. Getting billing wrong is how a product loses revenue it has already earned.</p><p>Around it we build the rest of the machinery every serious SaaS needs: authentication, roles and permissions that map to how your customers are actually organised, an admin surface your own team can run the product from, onboarding that gets a new tenant to value quickly, and telemetry so you can see what people do instead of guessing.</p>`,
        sk: `<p>Predplatné a fakturácia sú plocha produktu, nie tlačidlo pokladne pridané na konci. Plány, pomerné doúčtovanie pri prechode uprostred mesiaca, skúšobné obdobia, upomínanie pri zlyhaní karty, dane a DPH cez hranice — každé z toho je miesto, kde zákazník odíde alebo zostane, a staviame ich tak uvážlivo ako ktorúkoľvek funkciu, ktorú vidí. Pokazená fakturácia je spôsob, akým produkt stráca príjmy, ktoré už zarobil.</p><p>Okolo nej staviame zvyšok mašinérie, ktorú potrebuje každý vážny SaaS: autentifikáciu, roly a oprávnenia, ktoré zodpovedajú tomu, ako sú vaši zákazníci skutočne usporiadaní, administračnú plochu, z ktorej váš tím produkt vedie, onboarding, ktorý nového tenanta rýchlo dovedie k hodnote, a telemetriu, aby ste videli, čo ľudia robia, namiesto hádania.</p>`,
      },
      output: {
        en: "Billing, auth, roles, admin, onboarding and telemetry",
        sk: "Fakturácia, prihlasovanie, roly, administrácia, onboarding a telemetria",
      },
    },
    {
      name: { en: "Launch and scale", sk: "Spustenie a škálovanie" },
      body: {
        en: `<p>Before go-live we harden what we built: load testing against realistic traffic, a security pass, and failure drills so you know how the product behaves when something breaks rather than finding out from a customer. Then we launch the MVP and scale deliberately, because the part that breaks first under growth is almost never raw compute — it is the database, and the organisation around it.</p><p>Scaling is sequenced, not panicked: we watch where the real load lands, fix the actual bottleneck, and keep the product running throughout. You get a readiness report before launch and a clear picture of what to reinforce next as you grow.</p>`,
        sk: `<p>Pred spustením naživo zatvrdíme to, čo sme postavili: záťažové testy proti realistickej prevádzke, bezpečnostnú previerku a nácviky zlyhaní, aby ste vedeli, ako sa produkt správa, keď sa niečo pokazí, namiesto toho, aby ste sa to dozvedeli od zákazníka. Potom spustíme MVP a škálujeme uvážlivo, pretože to, čo sa pod rastom zlomí ako prvé, takmer nikdy nie je surový výpočtový výkon — je to databáza a organizácia okolo nej.</p><p>Škálovanie je zoradené, nie panické: sledujeme, kde skutočná záťaž dopadá, opravíme ozajstné úzke miesto a produkt počas toho necháme bežať. Dostanete správu o pripravenosti pred spustením a jasný obraz o tom, čo posilniť ďalej, ako budete rásť.</p>`,
      },
      output: {
        en: "A hardened launch and a deliberate scaling plan",
        sk: "Zatvrdené spustenie a uvážlivý plán škálovania",
      },
    },
    {
      name: { en: "Operate, evolve and co-own", sk: "Prevádzka, rozvoj a spoluvlastníctvo" },
      body: {
        en: `<p>As the product grows, reliability, security and compliance stop being optional. We build GDPR handling, data residency and sensible operational practice in as the product matures, rather than scrambling when a large customer's procurement team asks. The goal is a product that can pass that review, not one that hopes to avoid it.</p><p>Throughout, you own the product and the roadmap — the code and the know-how stay with you, and we document and train so your team can run and extend it. We can keep building alongside you for as long as that is useful, as a co-owner of the work rather than a gatekeeper you depend on.</p>`,
        sk: `<p>Ako produkt rastie, spoľahlivosť, bezpečnosť a súlad s predpismi prestávajú byť voliteľné. Spracovanie podľa GDPR, dátovú rezidenciu a rozumnú prevádzkovú prax budujeme priebežne, ako produkt dozrieva, nie na poslednú chvíľu, keď sa opýta nákupné oddelenie veľkého zákazníka. Cieľom je produkt, ktorý touto previerkou prejde, nie ten, ktorý sa jej dúfa vyhnúť.</p><p>Po celý čas vlastníte produkt aj jeho plán rozvoja — kód aj know-how zostávajú u vás a dokumentujeme a školíme tak, aby ho váš tím vedel prevádzkovať a rozširovať. Môžeme stavať po vašom boku tak dlho, ako je to užitočné, ako spoluvlastník práce, nie strážca, od ktorého ste závislí.</p>`,
      },
      output: {
        en: "Operations, compliance, documentation and full ownership",
        sk: "Prevádzka, súlad s predpismi, dokumentácia a plné vlastníctvo",
      },
    },
  ],
  deliverablesTitle: { en: "What you get", sk: "Čo dostanete" },
  deliverables: {
    en: [
      "A scoped MVP and a written, costed plan",
      "Multi-tenant architecture with isolation designed into the data layer",
      "Subscriptions and billing: plans, proration, trials, dunning, tax and VAT",
      "Authentication, roles, permissions and an admin surface",
      "Tenant onboarding and product telemetry and analytics",
      "A readiness report, plus GDPR and data-residency handling",
      "Full documentation, training and ownership of the code",
    ],
    sk: [
      "Vymedzené MVP a písomný, nacenený plán",
      "Multi-tenant architektúru s izoláciou navrhnutou do dátovej vrstvy",
      "Predplatné a fakturáciu: plány, pomerné doúčtovanie, skúšobné obdobia, upomínanie, dane a DPH",
      "Autentifikáciu, roly, oprávnenia a administračnú plochu",
      "Onboarding tenantov a produktovú telemetriu a analytiku",
      "Správu o pripravenosti spolu so spracovaním podľa GDPR a dátovou rezidenciou",
      "Úplnú dokumentáciu, školenie a vlastníctvo kódu",
    ],
  },
  approachTitle: { en: "How we think about SaaS", sk: "Ako rozmýšľame o SaaS" },
  approach: {
    en: `<p>We treat the unglamorous parts as the product. The demo everyone remembers is the main feature; the reason a customer renews is that billing was correct, permissions did what they expected, and the admin tools let someone fix a problem without a developer. We spend our attention where it decides whether you keep the revenue, not only where it is fun to build.</p><p>We also build so that next year is cheaper than this one. Tenancy, billing and auth are the three things that calcify fastest in a SaaS, so we get their shape right before we move quickly on everything above them. Working in slices with a demo every two weeks keeps you steering the product, not receiving it — you see where it is going while there is still time to change direction.</p><p>And we build to hand over. A product you cannot run without the people who wrote it is a liability, however good it is, so documentation and training are part of the work, not a closing task.</p>`,
    sk: `<p>Tie neatraktívne časti berieme ako produkt. Demo, ktoré si každý zapamätá, je hlavná funkcia; dôvod, prečo zákazník obnoví predplatné, je to, že fakturácia bola správna, oprávnenia robili to, čo očakával, a administračné nástroje umožnili niekomu vyriešiť problém bez vývojára. Pozornosť venujeme tam, kde sa rozhoduje o tom, či si udržíte príjmy, nielen tam, kde je zábava stavať.</p><p>Staviame aj tak, aby bol budúci rok lacnejší než tento. Tenancy, fakturácia a prihlasovanie sú tri veci, ktoré v SaaS skostnatejú najrýchlejšie, preto im dáme správny tvar skôr, než sa rýchlo pohneme so všetkým nad nimi. Práca po častiach s demom každé dva týždne vás drží pri kormidle produktu, nie v pozícii príjemcu — vidíte, kam smeruje, kým je ešte čas zmeniť smer.</p><p>A staviame tak, aby sme mohli odovzdať. Produkt, ktorý neviete prevádzkovať bez ľudí, čo ho napísali, je záväzok, nech je akokoľvek dobrý, preto sú dokumentácia a školenie súčasťou práce, nie záverečnou úlohou.</p>`,
  },
  faqTitle: { en: "Common questions", sk: "Časté otázky" },
  faq: [
    {
      q: {
        en: "Can you productise our internal tool instead of starting from scratch?",
        sk: "Viete sproduktovať náš interný nástroj namiesto stavania od nuly?",
      },
      a: {
        en: `<p>Often, yes, and it can be a strong starting point — a tool people already rely on has proven its value in a way a blank page has not. The work is usually less about new features and more about the things single-tenant internal software never needed: separating one customer's data from another, adding billing and sign-up, and hardening security for people outside your company. We start with a short assessment of what carries over and what has to be rebuilt, so you decide with real numbers.</p>`,
        sk: `<p>Často áno a môže to byť silný štart — nástroj, na ktorý sa ľudia už spoliehajú, dokázal svoju hodnotu spôsobom, akým prázdna stránka nie. Práca býva menej o nových funkciách a viac o veciach, ktoré jednotenantový interný softvér nikdy nepotreboval: oddelenie dát jedného zákazníka od druhého, pridanie fakturácie a registrácie a zatvrdenie bezpečnosti pre ľudí mimo vašej firmy. Začíname krátkym posúdením toho, čo sa dá preniesť a čo treba postaviť nanovo, aby ste sa rozhodovali s reálnymi číslami.</p>`,
      },
    },
    {
      q: {
        en: "What counts as a real MVP?",
        sk: "Čo sa počíta za reálne MVP?",
      },
      a: {
        en: `<p>The smallest version of the product that can go live, be paid for, and prove whether customers value it. It is not a cut-down version of every feature on your list — that is just a slow way to build everything. A real MVP does one important thing end to end, including the parts around it that make it usable, so the lesson you learn is real rather than theoretical.</p>`,
        sk: `<p>Najmenšia verzia produktu, ktorá môže ísť naživo, dá sa zaň platiť a dokáže, či ho zákazníci oceňujú. Nie je to osekaná verzia každej funkcie z vášho zoznamu — to je len pomalý spôsob, ako postaviť všetko. Reálne MVP robí jednu dôležitú vec od začiatku do konca, vrátane vecí okolo nej, ktoré ju robia použiteľnou, takže ponaučenie, ktoré získate, je skutočné, nie teoretické.</p>`,
      },
    },
    {
      q: {
        en: "Why does multi-tenancy have to be decided so early?",
        sk: "Prečo sa o multi-tenancy musí rozhodnúť tak skoro?",
      },
      a: {
        en: `<p>Because it lives in the data layer, and the data layer is the hardest thing to change once you have customers in it. How tenants are isolated shapes almost every query, every permission check and every migration you will ever run. Retrofitting isolation into a product that already holds live customer data is slow, risky, and one of the most reliable ways to stall a growing SaaS — so we design it in before the first table exists.</p>`,
        sk: `<p>Pretože žije v dátovej vrstve a dátová vrstva je to najťažšie, čo sa dá zmeniť, keď v nej už máte zákazníkov. To, ako sú tenanti izolovaní, formuje takmer každý dopyt, každú kontrolu oprávnení a každú migráciu, ktorú kedy spustíte. Dorobenie izolácie do produktu, ktorý už drží živé zákaznícke dáta, je pomalé, rizikové a jeden z najspoľahlivejších spôsobov, ako zastaviť rastúci SaaS — preto ju navrhneme skôr, než vznikne prvá tabuľka.</p>`,
      },
    },
    {
      q: {
        en: "Do you handle billing, or do we wire up a payment provider ourselves?",
        sk: "Riešite fakturáciu, alebo si platobného poskytovateľa zapojíme sami?",
      },
      a: {
        en: `<p>We build it as part of the product. That means the plans, proration, trials, dunning and tax or VAT handling your pricing actually requires, wired to a payment provider and connected to permissions so a plan change immediately changes what a customer can do. Billing touches revenue, so it is one of the places we are most deliberate — a subtle error here is money you have already earned and then lose.</p>`,
        sk: `<p>Staviame ju ako súčasť produktu. To znamená plány, pomerné doúčtovanie, skúšobné obdobia, upomínanie a spracovanie daní či DPH, ktoré vaša cenotvorba naozaj vyžaduje, zapojené na platobného poskytovateľa a prepojené s oprávneniami tak, aby zmena plánu okamžite zmenila to, čo zákazník môže robiť. Fakturácia sa dotýka príjmov, preto patrí medzi miesta, kde sme najuvážlivejší — jemná chyba tu sú peniaze, ktoré ste už zarobili a potom o ne prídete.</p>`,
      },
    },
    {
      q: {
        en: "What happens when we outgrow the first version?",
        sk: "Čo sa stane, keď prerastieme prvú verziu?",
      },
      a: {
        en: `<p>That is the plan, not a surprise. We scale deliberately — watching where real load lands and reinforcing the part that actually buckles, which is usually the database and the way the team is organised rather than servers. Because you own the product and the roadmap, you can keep us alongside you for the scaling phase, bring it in-house, or do both; the code and the knowledge are yours throughout.</p>`,
        sk: `<p>To je plán, nie prekvapenie. Škálujeme uvážlivo — sledujeme, kde dopadá skutočná záťaž, a posilňujeme tú časť, ktorá sa naozaj zlomí, čo býva skôr databáza a spôsob, akým je tím usporiadaný, než servery. Keďže produkt aj jeho plán rozvoja vlastníte vy, môžete si nás nechať pri sebe na fázu škálovania, prevziať to dovnútra, alebo oboje; kód aj vedomosti sú po celý čas vaše.</p>`,
      },
    },
  ],
  cta: {
    title: { en: "Building a SaaS product?", sk: "Staviate SaaS produkt?" },
    body: {
      en: "Start with a short, fixed-fee discovery: we will shape a real MVP, map the tenancy and billing, and give you a written, costed plan to build from.",
      sk: "Začnite krátkym discovery s pevnou cenou: vytvarujeme reálne MVP, zmapujeme tenancy a fakturáciu a dáme vám písomný, nacenený plán, z ktorého budete stavať.",
    },
    action: { en: "Book a discovery call", sk: "Dohodnite si discovery hovor" },
  },
  chips: {
    en: [
      "Multi-tenancy",
      "Subscriptions and billing",
      "Auth and permissions",
      "Admin and onboarding",
      "Analytics and telemetry",
      "Scaling",
    ],
    sk: [
      "Multi-tenancy",
      "Predplatné a fakturácia",
      "Prihlasovanie a oprávnenia",
      "Administrácia a onboarding",
      "Analytika a telemetria",
      "Škálovanie",
    ],
  },
},
{
  slug: "web-mobile-applications",
  id: "P/04",
  tag: { en: "Web & mobile", sk: "Web a mobil" },
  title: { en: "Web & mobile applications", sk: "Webové a mobilné aplikácie" },
  lead: {
    en: "Websites, portals, e-shops and iOS and Android apps built to perform, stay accessible and last for years — with automated releases and store operations handled for you.",
    sk: "Webové stránky, portály, e-shopy a aplikácie pre iOS a Android postavené na výkon, prístupnosť a dlhodobú životnosť — s automatizovaným nasadzovaním a prevádzkou v obchodoch s aplikáciami.",
  },
  description: {
    en: "ETEREO builds fast, accessible websites, portals, e-shops and iOS and Android apps for established companies — with automated releases and store operations.",
    sk: "ETEREO stavia rýchle a prístupné webové stránky, portály, e-shopy a aplikácie pre iOS a Android pre zavedené firmy — s automatizovaným nasadzovaním a správou obchodov.",
  },
  keywords: {
    en: "web development, mobile app development, iOS and Android apps, Next.js development, React Native, accessible web design, e-shop development",
    sk: "vývoj webu, vývoj mobilných aplikácií, aplikácie pre iOS a Android, vývoj v Next.js, React Native, prístupný webdizajn, vývoj e-shopu",
  },
  intro: {
    en: `<p>You need a website, a customer portal, an e-shop or a mobile app your business can lean on for years — not a prototype that looks right in a demo and then quietly becomes a liability. Maybe the one you have is slow, hard to change, or failing the people who actually use it; maybe there is nothing yet and the first version has to be right, because it will carry real traffic and real revenue.</p>
<p>ETEREO builds web and mobile products for established companies, where the thing being built is load-bearing from day one. The same senior team scopes the work, designs it and ships it — the people on the first call are the people who write the code and stand behind every release. We decide web, native or PWA on the merits of your case, treat <strong>accessibility</strong> and <strong>speed</strong> as requirements rather than polish, and hand you something you fully own and can keep running long after launch.</p>`,
    sk: `<p>Potrebujete webovú stránku, zákaznícky portál, e-shop alebo mobilnú aplikáciu, na ktorú sa vaša firma môže roky spoľahnúť — nie prototyp, ktorý vyzerá dobre v ukážke a potom sa potichu zmení na príťaž. Možno je tá súčasná pomalá, ťažko sa mení alebo zlyháva voči ľuďom, ktorí ju reálne používajú; možno ešte nič nie je a prvá verzia musí byť rovno správna, pretože ponesie skutočnú návštevnosť a skutočné tržby.</p>
<p>ETEREO stavia webové a mobilné produkty pre zavedené firmy, kde je vytváraná vec nosná už od prvého dňa. Tá istá seniorská zostava prácu naceňuje, navrhuje aj dodáva — ľudia na prvom hovore sú tí istí, čo píšu kód a stoja za každým nasadením. Rozhodnutie medzi webom, natívnou aplikáciou a PWA robíme podľa podstaty vášho prípadu, <strong>prístupnosť</strong> a <strong>rýchlosť</strong> berieme ako požiadavky, nie ako leštenie, a odovzdávame vám niečo, čo plne vlastníte a dokážete prevádzkovať dlho po spustení.</p>`,
  },
  phasesTitle: { en: "How we deliver it", sk: "Ako to dodávame" },
  phases: [
    {
      name: { en: "Discovery & design", sk: "Objavovanie a návrh" },
      body: {
        en: `<p>We start from how and where your product is actually used — on a warehouse floor with gloves on, on a commute with one hand, at a desk with a mandate to clear a hundred records a day. That context decides almost everything that follows, so we map it before we draw a screen. In usually about two weeks we work through your users, their tasks, your existing systems and the real constraints, and come back with a costed plan rather than a mood board.</p>
<p>This is where we make the honest platform call. <strong>Native</strong> earns its cost when you need reliable offline use, deep device features or the smoothest possible interaction; <strong>web</strong> wins on reach, instant updates and a single codebase; a <strong>PWA</strong> can bridge the two. We say plainly when two native platforms doubles the build, and when one well-built responsive site would serve you better. Accessibility to <strong>WCAG 2.2</strong> and a concrete performance target are written into the brief here, not bolted on at the end.</p>`,
        sk: `<p>Začíname tým, ako a kde sa váš produkt reálne používa — na podlahe skladu v rukaviciach, cestou do práce jednou rukou, za stolom s úlohou prejsť sto záznamov za deň. Tento kontext rozhoduje o takmer všetkom ďalšom, preto ho zmapujeme skôr, než nakreslíme obrazovku. Zvyčajne približne za dva týždne prejdeme vašich používateľov, ich úlohy, existujúce systémy a reálne obmedzenia a vrátime sa s naceneným plánom, nie s náladovou koláržou.</p>
<p>Tu robíme úprimné rozhodnutie o platforme. <strong>Natívna aplikácia</strong> sa oplatí, keď potrebujete spoľahlivú prácu offline, hlboké funkcie zariadenia alebo čo najplynulejšiu interakciu; <strong>web</strong> vyhráva v dosahu, okamžitých aktualizáciách a jednom kóde; <strong>PWA</strong> dokáže oba svety premostiť. Otvorene povieme, keď dve natívne platformy zdvojnásobujú vývoj a keď vám jedna dobre postavená responzívna stránka poslúži lepšie. Prístupnosť podľa <strong>WCAG 2.2</strong> a konkrétny výkonnostný cieľ sú tu zapísané do zadania, nie dolepené na koniec.</p>`,
      },
      output: {
        en: "A costed plan, a platform decision and a design direction grounded in real use",
        sk: "Nacenený plán, rozhodnutie o platforme a smer návrhu vychádzajúci z reálneho používania",
      },
    },
    {
      name: { en: "Architecture", sk: "Architektúra" },
      body: {
        en: `<p>An app is rarely just the app. It needs a backend to hold data, enforce rules, authenticate users and integrate with whatever already runs your business, and getting that boundary right is what keeps the product fast and changeable later. We document the target architecture, the sequencing and the trade-offs up front, as decision records you can read.</p>
<p>Where it genuinely pays off, we build a <strong>shared domain core</strong> — the business logic and data models used by both iOS and Android — so a rule is written and tested once, not twice and then left to diverge. Content that marketing or operations will edit goes behind a <strong>headless CMS</strong>, so copy, images and campaigns change without a release.</p>`,
        sk: `<p>Aplikácia je málokedy len aplikácia. Potrebuje backend, ktorý drží dáta, presadzuje pravidlá, overuje používateľov a integruje sa s tým, čo už poháňa vašu firmu, a správne nastavená hranica je to, čo udrží produkt neskôr rýchly a zmeniteľný. Cieľovú architektúru, poradie krokov a kompromisy dokumentujeme vopred ako záznamy rozhodnutí, ktoré si viete prečítať.</p>
<p>Tam, kde sa to naozaj vyplatí, staviame <strong>zdieľané doménové jadro</strong> — biznis logiku a dátové modely používané pre iOS aj Android — aby bolo pravidlo napísané a otestované raz, nie dvakrát a potom rozídené. Obsah, ktorý bude upravovať marketing alebo prevádzka, dávame za <strong>headless CMS</strong>, aby sa texty, obrázky a kampane menili bez nasadenia.</p>`,
      },
      output: {
        en: "Decision records, the backend design and a content model you can edit",
        sk: "Záznamy rozhodnutí, návrh backendu a model obsahu, ktorý si viete upravovať",
      },
    },
    {
      name: { en: "Build", sk: "Vývoj" },
      body: {
        en: `<p>We build in two-week iterations, each ending in a working release you can put in front of real users — not a slide about progress. Early feedback is cheaper than late rework, so we sequence the riskiest and most valuable slices first and keep the product shippable throughout.</p>
<p>Speed is a discipline, not a final pass. We set <strong>performance budgets</strong> — a fast first paint, healthy <strong>Core Web Vitals</strong>, a bundle that stays within its limit — and hold each release to them, because a page that is quick in week three and slow at launch has simply had its slowness hidden until it is expensive to fix.</p>`,
        sk: `<p>Staviame v dvojtýždňových iteráciách a každá končí funkčným vydaním, ktoré viete dať pred reálnych používateľov — nie snímkou o pokroku. Skorá spätná väzba je lacnejšia než neskoré prerábanie, preto radíme najrizikovejšie a najhodnotnejšie časti dopredu a produkt držíme po celý čas nasaditeľný.</p>
<p>Rýchlosť je disciplína, nie záverečný krok. Nastavujeme <strong>výkonnostné rozpočty</strong> — rýchle prvé vykreslenie, zdravé <strong>Core Web Vitals</strong>, balík, ktorý zostáva v limite — a každé vydanie na ne držíme, pretože stránka, ktorá je v treťom týždni rýchla a pri spustení pomalá, má pomalosť len schovanú dovtedy, kým nie je drahé ju opraviť.</p>`,
      },
      output: {
        en: "Working releases every two weeks, held to explicit performance budgets",
        sk: "Funkčné vydania každé dva týždne, držané na jasných výkonnostných rozpočtoch",
      },
    },
    {
      name: { en: "Launch & store operations", sk: "Spustenie a prevádzka v obchodoch" },
      body: {
        en: `<p>Shipping web is one problem; shipping to the App Store and Google Play is another, with its own review queues, metadata, signing, privacy declarations and rejection reasons. We handle submission and review, and set up <strong>automated releases</strong> so a build goes from merge to store or server through a pipeline, not a person following a checklist at midnight.</p>
<p>We roll out in stages — a small percentage first, watched, then widened — so a problem reaches a fraction of your users and is caught before it reaches all of them. Nothing goes to everyone on trust alone.</p>`,
        sk: `<p>Nasadiť web je jeden problém; dostať aplikáciu do App Store a Google Play je druhý, s vlastnými frontami na schvaľovanie, metadátami, podpisovaním, vyhláseniami o súkromí a dôvodmi na zamietnutie. Odbavíme podanie aj schvaľovanie a nastavíme <strong>automatizované nasadzovanie</strong>, aby sa build dostal od zlúčenia do obchodu alebo na server cez pipeline, nie cez človeka plniaceho zoznam úloh o polnoci.</p>
<p>Zavádzame postupne — najprv malé percento, sledované, potom širšie — aby problém zasiahol zlomok vašich používateľov a zachytil sa skôr, než sa dostane ku všetkým. Nič nejde ku všetkým len na dôveru.</p>`,
      },
      output: {
        en: "A reviewed store listing, a release pipeline and a staged, monitored rollout",
        sk: "Schválený záznam v obchode, nasadzovacia pipeline a postupné, sledované zavedenie",
      },
    },
    {
      name: { en: "Maintain & grow", sk: "Údržba a rast" },
      body: {
        en: `<p>A web or mobile product is never finished at launch, and we are honest about that before you sign. Operating systems and browsers change every year, Apple and Google shift store policies, dependencies need security updates, and a feature that worked in one iOS version can break in the next. Left alone, an app slowly stops working.</p>
<p>So maintenance is treated as ongoing work, not an emergency: keeping up with platform changes, renewing certificates before they expire, acting on store requirements, and shipping the improvements real usage reveals. You can keep that with us or run it yourself — either way it is planned, not a surprise.</p>`,
        sk: `<p>Webový ani mobilný produkt nie je pri spustení nikdy hotový a sme k tomu úprimní skôr, než podpíšete. Operačné systémy a prehliadače sa každý rok menia, Apple a Google posúvajú pravidlá obchodov, závislosti potrebujú bezpečnostné aktualizácie a funkcia, ktorá fungovala v jednej verzii iOS, sa môže v ďalšej pokaziť. Ponechaná sama na seba aplikácia pomaly prestane fungovať.</p>
<p>Údržbu preto berieme ako priebežnú prácu, nie ako núdzový stav: držíme krok so zmenami platforiem, obnovujeme certifikáty skôr, než vypršia, reagujeme na požiadavky obchodov a dodávame zlepšenia, ktoré odhalí reálne používanie. Môžete si ju ponechať u nás alebo si ju robiť sami — tak či tak je plánovaná, nie prekvapením.</p>`,
      },
      output: {
        en: "A maintenance plan that keeps the product current, not a product that quietly rots",
        sk: "Plán údržby, ktorý produkt udržiava aktuálny, nie produkt, ktorý potichu chátra",
      },
    },
    {
      name: { en: "Handover & ownership", sk: "Odovzdanie a vlastníctvo" },
      body: {
        en: `<p>Whatever we build, you own outright — the code, the infrastructure, the store accounts and the knowledge to run them. We document how it fits together, train your team, and transfer operations gradually rather than in a single handover email.</p>
<p>If you want us to keep running it, that is a choice you make because the work is good, not because you were locked in. No proprietary black boxes, no key that only we hold.</p>`,
        sk: `<p>Čokoľvek postavíme, vlastníte naplno — kód, infraštruktúru, účty v obchodoch aj vedomosti na ich prevádzku. Zdokumentujeme, ako to do seba zapadá, zaškolíme váš tím a prevádzku odovzdávame postupne, nie jediným e-mailom s odovzdaním.</p>
<p>Ak chcete, aby sme to prevádzkovali ďalej, je to voľba, ktorú urobíte preto, že je práca dobrá, nie preto, že by ste boli uviazaní. Žiadne uzavreté čierne skrinky, žiadny kľúč, ktorý držíme len my.</p>`,
      },
      output: {
        en: "Full ownership — code, infrastructure, accounts and the know-how to operate them",
        sk: "Plné vlastníctvo — kód, infraštruktúra, účty aj know-how na prevádzku",
      },
    },
  ],
  deliverablesTitle: { en: "What you get", sk: "Čo dostanete" },
  deliverables: {
    en: [
      "A costed discovery plan with an honest web / native / PWA recommendation",
      "Accessible, responsive interfaces built to WCAG 2.2",
      "A backend and, where it fits, a shared domain core across iOS and Android",
      "A headless CMS so your team edits content without a release",
      "Working releases every two weeks, held to Core Web Vitals and performance budgets",
      "App Store and Google Play submission plus an automated release pipeline",
      "Full source code, documentation and ownership of every account",
    ],
    sk: [
      "Nacenený plán objavovania s úprimným odporúčaním web / natívna aplikácia / PWA",
      "Prístupné, responzívne rozhrania postavené podľa WCAG 2.2",
      "Backend a tam, kde to sadne, zdieľané doménové jadro pre iOS aj Android",
      "Headless CMS, aby váš tím upravoval obsah bez nasadenia",
      "Funkčné vydania každé dva týždne, držané na Core Web Vitals a výkonnostných rozpočtoch",
      "Podanie do App Store a Google Play plus automatizovaná nasadzovacia pipeline",
      "Celý zdrojový kód, dokumentácia a vlastníctvo každého účtu",
    ],
  },
  approachTitle: { en: "How we think about web and mobile", sk: "Ako premýšľame o webe a mobile" },
  approach: {
    en: `<p>Most of what makes a web or mobile product good or bad is decided before the first screen is designed: which platform, what the data looks like, where the work happens on a slow connection. We spend our judgement there, because a wrong call at that level is the one you cannot style your way out of later.</p>
<p>We use <strong>Next.js</strong> for web and <strong>React Native</strong> for native, with a <strong>headless CMS</strong> behind the content — a mature, boring-in-the-best-sense stack with a deep talent pool, so you are never dependent on a framework only we understand. Accessibility and performance are not features we sell back to you; they are the baseline, because a site that excludes people or makes them wait is failing at the one job it has.</p>
<p>And we build for the second year, not the demo. The structure that lets you add a feature in a week, the tests that catch a regression before your users do, the release process a new engineer can run — that is the part that decides whether the product is still an asset long after we have moved on.</p>`,
    sk: `<p>Väčšina toho, čo robí webový alebo mobilný produkt dobrým či zlým, sa rozhodne skôr, než sa navrhne prvá obrazovka: ktorá platforma, ako vyzerajú dáta, kde prebieha práca na pomalom pripojení. Svoj úsudok míňame práve tam, pretože zlé rozhodnutie na tejto úrovni je to, z ktorého sa už neskôr nedá vyštylovať von.</p>
<p>Na web používame <strong>Next.js</strong> a na natívne aplikácie <strong>React Native</strong>, s <strong>headless CMS</strong> za obsahom — vyzretý, v tom najlepšom zmysle nudný stack s hlbokou zásobou talentu, takže nikdy nie ste závislí od frameworku, ktorému rozumieme len my. Prístupnosť a výkon vám nepredávame späť ako funkcie; sú to základné nastavenie, lebo stránka, ktorá vylučuje ľudí alebo ich núti čakať, zlyháva v tej jedinej úlohe, ktorú má.</p>
<p>A staviame na druhý rok, nie na ukážku. Štruktúra, ktorá vám umožní pridať funkciu za týždeň, testy, ktoré zachytia regresiu skôr než vaši používatelia, a nasadzovací proces, ktorý zvládne aj nový inžinier — to je tá časť, ktorá rozhoduje, či bude produkt majetkom ešte dlho po tom, čo sme sa pohli ďalej.</p>`,
  },
  faqTitle: { en: "Common questions", sk: "Časté otázky" },
  faq: [
    {
      q: { en: "Should we build a native app or a website?", sk: "Máme postaviť natívnu aplikáciu, alebo webovú stránku?" },
      a: {
        en: `<p>It depends on how your product is used, and we work that out with you rather than selling you the more expensive option by default. If you need reliable offline use, deep device features or the smoothest possible interaction, native is worth its cost. If reach, instant updates and a single codebase matter more, a well-built responsive web app usually wins, and a PWA can cover a lot of the middle ground.</p>
<p>The honest caveat is cost: two native platforms, iOS and Android, is close to two builds. We will tell you when that is justified and when it is not.</p>`,
        sk: `<p>Záleží na tom, ako sa váš produkt používa, a zisťujeme to spolu s vami, nie tak, že vám vo východiskovom stave predáme drahšiu možnosť. Ak potrebujete spoľahlivú prácu offline, hlboké funkcie zariadenia alebo čo najplynulejšiu interakciu, natívna aplikácia za svoju cenu stojí. Ak viac záleží na dosahu, okamžitých aktualizáciách a jednom kóde, zvyčajne vyhráva dobre postavená responzívna webová aplikácia a PWA dokáže pokryť veľkú časť stredu.</p>
<p>Úprimná výhrada je cena: dve natívne platformy, iOS a Android, sú takmer dva vývoje. Povieme vám, kedy je to opodstatnené a kedy nie.</p>`,
      },
    },
    {
      q: { en: "How long until we have something to use?", sk: "Ako dlho potrvá, kým budeme mať niečo použiteľné?" },
      a: {
        en: `<p>You see working software within the first month. After a short discovery and architecture phase, we build in two-week iterations, and each one ends in a release you can put in front of real users. A full first version depends on scope, but in most engagements you are steering and reviewing real screens long before launch, not waiting for a big reveal at the end.</p>`,
        sk: `<p>Funkčný softvér uvidíte už v prvom mesiaci. Po krátkej fáze objavovania a architektúry staviame v dvojtýždňových iteráciách a každá končí vydaním, ktoré viete dať pred reálnych používateľov. Plná prvá verzia závisí od rozsahu, ale vo väčšine spoluprác riadite a pripomienkujete reálne obrazovky dávno pred spustením, nie čakáte na veľké odhalenie na konci.</p>`,
      },
    },
    {
      q: { en: "Who owns the code and the app store accounts?", sk: "Kto vlastní kód a účty v obchodoch s aplikáciami?" },
      a: {
        en: `<p>You do — all of it. The source code, the infrastructure and the App Store and Google Play accounts are yours, in your name, from the start. We document everything and train your team, so you are never dependent on us to make a change. If you keep us on for maintenance, it is because the arrangement works, not because leaving is hard.</p>`,
        sk: `<p>Vy — všetko. Zdrojový kód, infraštruktúra aj účty v App Store a Google Play sú vaše, na vaše meno, od začiatku. Všetko zdokumentujeme a zaškolíme váš tím, takže na zmenu nikdy nie ste závislí od nás. Ak si nás ponecháte na údržbu, je to preto, že to funguje, nie preto, že by bolo ťažké odísť.</p>`,
      },
    },
    {
      q: { en: "Do you keep maintaining it after launch?", sk: "Udržiavate to aj po spustení?" },
      a: {
        en: `<p>Yes, if you want that. A web or mobile product needs ongoing care — operating systems and browsers change, store policies shift, and security updates keep arriving — so we offer maintenance that keeps the product current rather than letting it slowly stop working. You can also take it in-house; we set it up so your own team can run it, and we hand over cleanly either way.</p>`,
        sk: `<p>Áno, ak chcete. Webový alebo mobilný produkt potrebuje priebežnú starostlivosť — operačné systémy a prehliadače sa menia, pravidlá obchodov sa posúvajú a bezpečnostné aktualizácie prichádzajú stále — preto ponúkame údržbu, ktorá produkt udržiava aktuálny namiesto toho, aby ho nechala pomaly prestať fungovať. Môžete si to vziať aj dovnútra; nastavíme to tak, aby to zvládol váš vlastný tím, a tak či tak odovzdávame čisto.</p>`,
      },
    },
    {
      q: { en: "How do you make sure it is fast and accessible?", sk: "Ako zaistíte, že to bude rýchle a prístupné?" },
      a: {
        en: `<p>By making both measurable requirements, not opinions. We set performance budgets early — a fast first paint, healthy Core Web Vitals, a bounded bundle — and hold every release to them, so speed does not quietly erode as features land. Accessibility is built to <strong>WCAG 2.2</strong> from the design stage and checked as we go, rather than audited in a panic before launch, because retrofitting either one is far more expensive than building it in.</p>`,
        sk: `<p>Tak, že z oboch robíme merateľné požiadavky, nie názory. Výkonnostné rozpočty nastavujeme zavčasu — rýchle prvé vykreslenie, zdravé Core Web Vitals, ohraničený balík — a každé vydanie na ne držíme, aby rýchlosť potichu neerodovala, ako pribúdajú funkcie. Prístupnosť staviame podľa <strong>WCAG 2.2</strong> už od fázy návrhu a kontrolujeme ju priebežne, nie ju v panike auditujeme pred spustením, pretože dodatočné doplnenie ktoréhokoľvek z nich je oveľa drahšie než postaviť to rovno.</p>`,
      },
    },
  ],
  cta: {
    title: {
      en: "Planning a website, portal, e-shop or app?",
      sk: "Plánujete web, portál, e-shop alebo aplikáciu?",
    },
    body: {
      en: "Start with a short, fixed-fee discovery. We will map your users and systems, make an honest platform call, and give you a costed plan — before anyone writes a line of code.",
      sk: "Začnite krátkym objavovaním za fixnú cenu. Zmapujeme vašich používateľov a systémy, urobíme úprimné rozhodnutie o platforme a dáme vám nacenený plán — skôr, než ktokoľvek napíše riadok kódu.",
    },
    action: { en: "Book a discovery call", sk: "Dohodnite si úvodný hovor" },
  },
  chips: {
    en: ["Next.js", "React Native", "Headless CMS", "WCAG 2.2", "Core Web Vitals", "CI / CD"],
    sk: ["Next.js", "React Native", "Headless CMS", "WCAG 2.2", "Core Web Vitals", "CI / CD"],
  },
},
{
  slug: "cloud-devops",
  id: "P/05",
  tag: { en: "Cloud & DevOps", sk: "Cloud a DevOps" },
  title: { en: "Cloud & DevOps", sk: "Cloud a DevOps" },
  lead: {
    en: "Infrastructure as code, CI/CD, monitoring and cost control on AWS and Azure — so shipping a new version becomes routine, not an event, and your cloud bill matches your workload.",
    sk: "Infraštruktúra ako kód, CI/CD, monitoring a kontrola nákladov na AWS a Azure — aby sa nasadenie novej verzie stalo rutinou, nie udalosťou, a aby váš účet za cloud zodpovedal záťaži.",
  },
  description: {
    en: "Cloud and DevOps for established companies: infrastructure as code, CI/CD, monitoring, reliability and real cost control on AWS and Azure. Senior team, no lock-in.",
    sk: "Cloud a DevOps pre zavedené firmy: infraštruktúra ako kód, CI/CD, monitoring, spoľahlivosť a reálna kontrola nákladov na AWS a Azure. Senior tím, bez závislosti.",
  },
  keywords: {
    en: "cloud and devops, infrastructure as code, terraform, ci/cd pipelines, aws and azure consulting, cloud cost optimisation",
    sk: "cloud a devops, infraštruktúra ako kód, terraform, ci/cd pipeline, konzultácie aws a azure, optimalizácia nákladov na cloud",
  },
  intro: {
    en: `<p>This is for companies whose deployments have become something to dread — a manual, late-night ritual that only one person fully understands, where a routine release still carries a real risk of taking production down. It is for teams that want to move to the cloud sensibly, because it fits, rather than because everyone else has. And it is for anyone whose cloud bill has quietly grown to two or three times what the workload actually needs, with no clear sense of where the money goes.</p>
<p>We treat infrastructure the way we treat the rest of your systems: as something load-bearing that has to keep running while we improve it. There is no big-bang re-platforming and no cutover weekend where everyone holds their breath. We work in slices, and every step ends in something you can inspect.</p>
<p>First we establish the real state of your infrastructure, deployments, reliability and cost. Then we agree what to change and in what order, and make shipping a new version routine rather than an event — with the environments, pipelines, monitoring and guardrails that let your own team run it long after we have gone.</p>`,
    sk: `<p>Toto je pre firmy, ktorých nasadenia sa stali niečím, čoho sa obávajú — ručným, nočným rituálom, ktorému naplno rozumie len jeden človek, kde aj bežné vydanie verzie nesie reálne riziko, že položí produkciu. Je to pre tímy, ktoré chcú prejsť do cloudu rozumne, lebo im to sedí, nie preto, že to urobili všetci ostatní. A je to pre každého, komu účet za cloud ticho narástol na dvoj- až trojnásobok toho, čo záťaž v skutočnosti potrebuje, bez jasnej predstavy, kam peniaze idú.</p>
<p>K infraštruktúre pristupujeme rovnako ako k zvyšku vašich systémov: ako k nosnej časti, ktorá musí bežať, zatiaľ čo ju zlepšujeme. Žiadne veľké preklopenie naraz a žiadny víkend s prechodom, počas ktorého všetci zadržiavajú dych. Pracujeme po častiach a každý krok končí niečím, čo si viete pozrieť.</p>
<p>Najprv zistíme skutočný stav vašej infraštruktúry, nasadzovania, spoľahlivosti a nákladov. Potom sa dohodneme, čo meniť a v akom poradí, a urobíme z nasadenia novej verzie rutinu namiesto udalosti — s prostrediami, pipeline, monitoringom a poistkami, vďaka ktorým to dokáže prevádzkovať váš vlastný tím ešte dlho po tom, čo odídeme.</p>`,
  },
  phasesTitle: { en: "How we deliver it", sk: "Ako to dodávame" },
  phases: [
    {
      name: { en: "Assess", sk: "Posúdenie" },
      body: {
        en: `<p>We start with a short, fixed-fee assessment — usually around two weeks — of how things actually stand, not how the architecture diagram says they should. We look at how code reaches production today, how long a release takes and how often one goes wrong, where the system has no redundancy, whether a backup has ever been restored, and where the cloud spend is going line by line.</p>
<p>You come away with a written, costed picture of the current state and a prioritised plan: what to change, in what order, and what each step is worth. Nothing further is committed until that plan makes sense to you.</p>`,
        sk: `<p>Začíname krátkym posúdením s pevnou cenou — zvyčajne okolo dvoch týždňov — toho, ako veci naozaj stoja, nie ako by podľa diagramu architektúry mali. Pozrieme sa, ako sa kód dnes dostáva do produkcie, ako dlho trvá vydanie a ako často sa pokazí, kde systém nemá redundanciu, či sa niekedy obnovovalo zo zálohy a kam riadok po riadku idú náklady na cloud.</p>
<p>Odnesiete si písomný, nacenený obraz súčasného stavu a plán podľa priorít: čo zmeniť, v akom poradí a akú hodnotu má každý krok. Nič ďalšie sa nezaväzuje, kým vám ten plán nedáva zmysel.</p>`,
      },
      output: {
        en: "A current-state report and a prioritised, costed roadmap",
        sk: "Správa o súčasnom stave a nacenený plán podľa priorít",
      },
    },
    {
      name: { en: "Plan & architect", sk: "Plán a architektúra" },
      body: {
        en: `<p>With the assessment agreed, we design the target state and write down the decisions behind it. This is where we settle the questions that are expensive to revisit later: cloud versus on-premise, and — if cloud — whether AWS or Azure fits your workload, your team's existing skills and your data-residency obligations, including EU residency where that matters. We decide these on fit, not on hype or on whoever's logo is loudest this year.</p>
<p>We also set the level of reliability you actually need. Not every system has to chase five nines; most do not, and the cost of each extra nine is steep. We document the sequencing and the trade-offs up front so there are no surprises mid-build.</p>`,
        sk: `<p>Keď je posúdenie odsúhlasené, navrhneme cieľový stav a zapíšeme rozhodnutia, ktoré sú za ním. Tu sa uzatvárajú otázky, ktoré je neskôr drahé otvárať znova: cloud oproti on-premise a — ak cloud — či vašej záťaži, doterajším zručnostiam tímu a povinnostiam ohľadom umiestnenia dát sedí AWS alebo Azure, vrátane umiestnenia v EÚ tam, kde na tom záleží. Rozhodujeme podľa vhodnosti, nie podľa hype ani podľa toho, čie logo je tento rok najhlasnejšie.</p>
<p>Zároveň nastavíme úroveň spoľahlivosti, ktorú naozaj potrebujete. Nie každý systém musí naháňať päť deviatok; väčšina nie, a cena každej ďalšej deviatky je strmá. Postupnosť a kompromisy zapíšeme dopredu, aby počas stavby neboli žiadne prekvapenia.</p>`,
      },
      output: {
        en: "Architecture decision records and a provider and residency decision",
        sk: "Záznamy architektonických rozhodnutí a voľba poskytovateľa a umiestnenia dát",
      },
    },
    {
      name: { en: "Implement — IaC and CI/CD", sk: "Realizácia — IaC a CI/CD" },
      body: {
        en: `<p>We describe your infrastructure as code, with Terraform, so environments are reproducible and a change to them is reviewed like any other change rather than clicked into a console and forgotten. Staging matches production closely enough to be trusted, and a new environment can be stood up from the repository instead of from memory.</p>
<p>On top of that we build the delivery pipeline: automated build, test and deploy, so releasing a new version becomes a routine, low-drama act — a push rather than an event. We add the safeguards that make routine safe, such as staged rollouts and a fast, rehearsed way back when something looks wrong.</p>`,
        sk: `<p>Vašu infraštruktúru opíšeme ako kód, nástrojom Terraform, aby boli prostredia reprodukovateľné a zmena v nich sa posudzovala ako každá iná zmena, nie naklikala do konzoly a zabudla. Staging sa zhoduje s produkciou natoľko, aby sa mu dalo veriť, a nové prostredie sa dá postaviť z repozitára, nie z pamäti.</p>
<p>Nad tým postavíme dodávaciu pipeline: automatizovaný build, test a nasadenie, aby sa vydanie novej verzie stalo rutinným, nedramatickým úkonom — pushom, nie udalosťou. Pridáme poistky, ktoré robia rutinu bezpečnou, ako postupné rozbaľovanie a rýchlu, nacvičenú cestu späť, keď niečo vyzerá zle.</p>`,
      },
      output: {
        en: "Infrastructure as code, reproducible environments and a working CI/CD pipeline",
        sk: "Infraštruktúra ako kód, reprodukovateľné prostredia a funkčná CI/CD pipeline",
      },
    },
    {
      name: { en: "Migrate & harden", sk: "Migrácia a spevnenie" },
      body: {
        en: `<p>If a migration is part of the work, we do it in slices, keeping the business running throughout rather than betting everything on one cutover. Each slice moves, proves itself under real traffic and can be rolled back on its own before the next one follows.</p>
<p>Alongside that we harden what we have built: a security review and tightening, sensible defaults for access and secrets, and the compliance work your sector requires, GDPR included. We also set up observability now rather than later — metrics, logs and alerting — so the new setup is legible from the first day it carries load, not after the first incident.</p>`,
        sk: `<p>Ak je migrácia súčasťou práce, robíme ju po častiach a biznis počas nej beží ďalej, namiesto toho, aby sme všetko stavili na jedno preklopenie. Každá časť sa presunie, osvedčí sa pod reálnou prevádzkou a dá sa vrátiť späť samostatne, skôr než nasleduje ďalšia.</p>
<p>Popri tom spevňujeme, čo sme postavili: bezpečnostný audit a utiahnutie, rozumné predvolené nastavenia prístupov a tajomstiev a súlad s predpismi, ktoré váš sektor vyžaduje, vrátane GDPR. Observabilitu nastavíme hneď, nie až neskôr — metriky, logy a upozornenia — aby bolo nové riešenie čitateľné od prvého dňa, keď nesie záťaž, nie až po prvom incidente.</p>`,
      },
      output: {
        en: "A migrated, hardened environment with monitoring and compliance in place",
        sk: "Zmigrované, spevnené prostredie s nastaveným monitoringom a súladom",
      },
    },
    {
      name: { en: "Operate & optimise", sk: "Prevádzka a optimalizácia" },
      body: {
        en: `<p>Once it is running, the job is to keep it running and to stop it quietly wasting money. Monitoring, logging and alerting are tuned so that you find problems before your customers do, and we set up incident response and on-call so there is a known, calm answer to the question of who is woken and what they do. Backups and disaster recovery are not assumed to work — we actually restore from them, because a backup that has never been restored is a hope, not a plan.</p>
<p>On cost, we right-size what is over-provisioned and eliminate the waste that accumulates in any growing cloud estate — idle resources, forgotten environments, the wrong pricing model. In our experience it is typical to recover somewhere in the region of 40 to 70 percent of an un-optimised bill without a migration freeze and without slowing delivery, though the real figure depends entirely on your estate.</p>`,
        sk: `<p>Keď to beží, úlohou je udržať to v behu a zabrániť tomu, aby to ticho plytvalo peniazmi. Monitoring, logovanie a upozornenia sú doladené tak, aby ste problémy našli skôr ako vaši zákazníci, a nastavíme reakciu na incidenty a pohotovosť, aby existovala známa, pokojná odpoveď na otázku, koho zobudiť a čo má robiť. O zálohách a obnove po havárii nepredpokladáme, že fungujú — skutočne z nich obnovujeme, lebo záloha, ktorá sa nikdy neobnovovala, je nádej, nie plán.</p>
<p>Pri nákladoch zmenšíme to, čo je predimenzované, a odstránime plytvanie, ktoré sa nazbiera v každom rastúcom cloudovom prostredí — nečinné zdroje, zabudnuté prostredia, nesprávny cenový model. Podľa našich skúseností sa z neoptimalizovaného účtu zvyčajne dá získať späť niekde v rozmedzí 40 až 70 percent bez zmrazenia migrácie a bez spomalenia dodávky, hoci skutočné číslo závisí úplne od vášho prostredia.</p>`,
      },
      output: {
        en: "Tuned observability, tested disaster recovery and a lower, right-sized bill",
        sk: "Doladená observabilita, otestovaná obnova po havárii a nižší, správne dimenzovaný účet",
      },
    },
    {
      name: { en: "Handover", sk: "Odovzdanie" },
      body: {
        en: `<p>The point of the engagement is that your team can run and extend the result without us. Everything is documented — the architecture, the pipelines, the runbooks for the things that go wrong at two in the morning — and we train the people who will own it, transferring operations gradually rather than at a single hard line.</p>
<p>There is no lock-in to ETEREO. The infrastructure code, the pipelines and the know-how are yours, written in standard tools you can hire for. We would like you to keep working with us because it is useful, not because leaving would be painful.</p>`,
        sk: `<p>Zmyslom spolupráce je, že váš tím dokáže výsledok prevádzkovať a rozširovať aj bez nás. Všetko je zdokumentované — architektúra, pipeline aj runbooky pre veci, ktoré sa pokazia o druhej ráno — a vyškolíme ľudí, ktorí to budú vlastniť, pričom prevádzku odovzdávame postupne, nie na jednej tvrdej čiare.</p>
<p>Žiadna závislosť na ETEREO. Kód infraštruktúry, pipeline aj know-how sú vaše, napísané v štandardných nástrojoch, na ktoré viete nabrať ľudí. Chceme, aby ste s nami pokračovali preto, že je to užitočné, nie preto, že odísť by bolo bolestivé.</p>`,
      },
      output: {
        en: "Full documentation, a trained team and complete ownership, with no lock-in",
        sk: "Úplná dokumentácia, vyškolený tím a plné vlastníctvo, bez závislosti",
      },
    },
  ],
  deliverablesTitle: { en: "What you get", sk: "Čo dostanete" },
  deliverables: {
    en: [
      "A current-state assessment of infrastructure, delivery, reliability and cost",
      "A prioritised, costed roadmap with the reasoning behind each step",
      "Infrastructure as code in Terraform, with reproducible environments",
      "A CI/CD pipeline with staged rollouts and a rehearsed rollback",
      "Monitoring, logging and alerting, plus an incident-response and on-call setup",
      "Tested backups and a disaster-recovery plan that has actually been restored",
      "Documentation, runbooks and team training, with no lock-in to ETEREO",
    ],
    sk: [
      "Posúdenie súčasného stavu infraštruktúry, dodávky, spoľahlivosti a nákladov",
      "Nacenený plán podľa priorít s odôvodnením každého kroku",
      "Infraštruktúra ako kód v Terraforme, s reprodukovateľnými prostrediami",
      "CI/CD pipeline s postupným rozbaľovaním a nacvičeným návratom späť",
      "Monitoring, logovanie a upozornenia plus nastavená reakcia na incidenty a pohotovosť",
      "Otestované zálohy a plán obnovy po havárii, z ktorého sa skutočne obnovovalo",
      "Dokumentácia, runbooky a školenie tímu, bez závislosti na ETEREO",
    ],
  },
  approachTitle: {
    en: "How we think about cloud and DevOps",
    sk: "Ako premýšľame o cloude a DevOps",
  },
  approach: {
    en: `<p>Our bias is towards boring, reproducible infrastructure. Anything created by hand is something nobody can recreate under pressure, so we describe it as code and change it through review. The aim is not sophistication for its own sake — it is that a new engineer, or your own team a year from now, can read the repository and understand exactly how the system is built.</p>
<p>We are deliberately provider-neutral. AWS and Azure are both good, and the right one for you depends on your workload, your team's skills and where your data is allowed to live — not on which we happen to prefer. We will tell you plainly when on-premise or a hybrid setup is the better answer, and we will not talk you into cloud you do not need or out of residency requirements you are obliged to meet.</p>
<p>And we treat cost and reliability as engineering concerns, not afterthoughts. A system that is cheap but fragile, or reliable but ruinously over-provisioned, is a failure of design. The useful question is rarely how many nines you can reach, but how many you actually need — and what the honest price of each one is.</p>`,
    sk: `<p>Náš sklon je k nudnej, reprodukovateľnej infraštruktúre. Čokoľvek vytvorené ručne je niečo, čo pod tlakom nikto nevie zopakovať, a tak to opisujeme ako kód a meníme cez posúdenie. Cieľom nie je prepracovanosť pre ňu samú — ide o to, aby nový inžinier alebo váš vlastný tím o rok vedel prečítať repozitár a presne pochopiť, ako je systém postavený.</p>
<p>Zámerne sme neutrálni voči poskytovateľovi. AWS aj Azure sú dobré a ten správny pre vás závisí od vašej záťaže, zručností tímu a toho, kde smú vaše dáta bývať — nie od toho, ktorý máme radšej. Otvorene vám povieme, keď je on-premise alebo hybridné riešenie lepšou odpoveďou, a nebudeme vás prehovárať do cloudu, ktorý nepotrebujete, ani z povinností ohľadom umiestnenia dát, ktoré musíte splniť.</p>
<p>A náklady aj spoľahlivosť berieme ako inžinierske otázky, nie ako to, na čo sa myslí až nakoniec. Systém, ktorý je lacný, ale krehký, alebo spoľahlivý, ale rujne predimenzovaný, je zlyhaním návrhu. Užitočná otázka málokedy znie, koľko deviatok dosiahnete, ale koľko ich naozaj potrebujete — a aká je úprimná cena každej z nich.</p>`,
  },
  faqTitle: { en: "Common questions", sk: "Časté otázky" },
  faq: [
    {
      q: {
        en: "Will you need to freeze releases or take the system down while you work?",
        sk: "Budete musieť zmraziť vydávanie verzií alebo vypnúť systém, kým pracujete?",
      },
      a: {
        en: `<p>No. We work in slices and keep the business running throughout — that is the whole method. Infrastructure-as-code and the delivery pipeline are built alongside what you have today, and a migration moves one piece at a time, each able to be rolled back on its own. If anything genuinely requires a brief window, it is planned and agreed well in advance, not sprung on you.</p>`,
        sk: `<p>Nie. Pracujeme po častiach a biznis počas celej doby beží ďalej — to je celá metóda. Infraštruktúra ako kód a dodávacia pipeline sa stavajú popri tom, čo máte dnes, a migrácia presúva jednu časť po druhej, pričom každú sa dá vrátiť späť samostatne. Ak si niečo naozaj vyžaduje krátke okno, je naplánované a odsúhlasené s dostatočným predstihom, nie na vás vybalené.</p>`,
      },
    },
    {
      q: {
        en: "AWS or Azure — which should we choose?",
        sk: "AWS alebo Azure — ktorý si máme vybrať?",
      },
      a: {
        en: `<p>Whichever fits your workload, your team's existing skills and your data-residency obligations. Both are capable platforms and we are not tied to either. If your data has to stay in the EU, that narrows the choice to specific regions, and we will design around it. We make the call during the architecture phase, document the reasoning, and you own that decision rather than inheriting ours.</p>`,
        sk: `<p>Ten, ktorý sedí vašej záťaži, doterajším zručnostiam tímu a vašim povinnostiam ohľadom umiestnenia dát. Obe sú schopné platformy a nie sme viazaní na žiadnu z nich. Ak vaše dáta musia zostať v EÚ, zúži to voľbu na konkrétne regióny a navrhneme riešenie okolo toho. Rozhodnutie urobíme vo fáze architektúry, odôvodnenie zapíšeme a to rozhodnutie vlastníte vy, namiesto toho, aby ste zdedili to naše.</p>`,
      },
    },
    {
      q: {
        en: "You mention cutting the cloud bill — how much can we really save?",
        sk: "Spomínate zníženie účtu za cloud — koľko reálne ušetríme?",
      },
      a: {
        en: `<p>It depends entirely on your estate, so we will not promise a number before we have looked. That said, in our experience an un-optimised bill often has somewhere in the region of 40 to 70 percent that can be recovered — through right-sizing, removing idle and forgotten resources, and choosing the correct pricing model — without freezing delivery or migrating anything. The assessment tells you the real figure for your case before you commit to the work.</p>`,
        sk: `<p>Závisí to úplne od vášho prostredia, takže nesľúbime číslo skôr, než sa pozrieme. To povedané, podľa našich skúseností má neoptimalizovaný účet často niekde v rozmedzí 40 až 70 percent, ktoré sa dá získať späť — správnym dimenzovaním, odstránením nečinných a zabudnutých zdrojov a voľbou správneho cenového modelu — bez zmrazenia dodávky a bez migrácie čohokoľvek. Skutočné číslo pre váš prípad vám povie posúdenie ešte predtým, než sa do práce zaviažete.</p>`,
      },
    },
    {
      q: {
        en: "What happens when something breaks at three in the morning?",
        sk: "Čo sa stane, keď sa niečo pokazí o tretej ráno?",
      },
      a: {
        en: `<p>That is exactly what observability and incident response are for. Monitoring and alerting are set up so a problem pages the right person before your customers notice, and the runbooks tell them what to check and what to do. We set up on-call and, where you want it, cover the early period ourselves while your team learns the system. The goal is a calm, rehearsed answer rather than a scramble.</p>`,
        sk: `<p>Presne na to je observabilita a reakcia na incidenty. Monitoring a upozornenia sú nastavené tak, aby problém upozornil správneho človeka skôr, než si ho všimnú vaši zákazníci, a runbooky mu povedia, čo skontrolovať a čo urobiť. Nastavíme pohotovosť a tam, kde chcete, pokryjeme prvé obdobie sami, kým sa váš tím systém naučí. Cieľom je pokojná, nacvičená odpoveď, nie zmätok.</p>`,
      },
    },
    {
      q: {
        en: "When you leave, can our own team actually run this?",
        sk: "Keď odídete, dokáže náš vlastný tím toto naozaj prevádzkovať?",
      },
      a: {
        en: `<p>Yes — that is the point of the handover. Everything is written in standard, widely used tools such as Terraform, documented end to end, and handed over with training and a gradual transfer of operations rather than a sudden drop. There is no proprietary ETEREO layer to keep us in the loop. The code and the know-how stay with you, and you are free to extend it or to bring in anyone you like.</p>`,
        sk: `<p>Áno — to je zmysel odovzdania. Všetko je napísané v štandardných, bežne používaných nástrojoch ako Terraform, zdokumentované od začiatku do konca a odovzdané so školením a postupným prenosom prevádzky, nie náhlym odstrihnutím. Niet žiadnej proprietárnej vrstvy ETEREO, ktorá by nás držala v hre. Kód a know-how zostávajú u vás a môžete to rozširovať alebo si priviesť kohokoľvek chcete.</p>`,
      },
    },
  ],
  cta: {
    title: {
      en: "Deployments feeling risky, or a cloud bill that keeps climbing?",
      sk: "Nasadenia pôsobia rizikovo, alebo účet za cloud stále rastie?",
    },
    body: {
      en: "Start with a short, fixed-fee assessment of your infrastructure, delivery, reliability and cost. You get a clear picture of where you stand and a costed plan before committing to anything more.",
      sk: "Začnite krátkym posúdením s pevnou cenou vašej infraštruktúry, dodávky, spoľahlivosti a nákladov. Dostanete jasný obraz o tom, kde stojíte, a nacenený plán ešte predtým, než sa zaviažete k čomukoľvek ďalšiemu.",
    },
    action: {
      en: "Book a cloud assessment",
      sk: "Objednať posúdenie cloudu",
    },
  },
  chips: {
    en: ["AWS / Azure", "Kubernetes", "Terraform", "CI/CD", "Monitoring", "EU data residency"],
    sk: ["AWS / Azure", "Kubernetes", "Terraform", "CI/CD", "Monitoring", "Umiestnenie dát v EÚ"],
  },
},
];

import type { Lang } from "../store";

export type Template = "ops" | "analytics" | "mobile" | "map";

export interface ScreenSpec {
  template: Template;
  accent: string;
  title: string;
  subtitle: string;
  kpis: { v: string; l: string }[];
  rows: string[];
}

export interface Project {
  /** display number, e.g. "01" */
  id: string;
  /** url key on /projects/?p=<slug> */
  slug: string;
  /** language-neutral tech list */
  stack: string;
  /** true → sensitive client, shown anonymised (defence / government) */
  confidential?: boolean;
  links?: { label: string; href: string }[];
  screen: ScreenSpec;
}

export interface PanelText {
  name: string;
  sector: string;
  /** 1–2 sentence teaser (hero panel + card) */
  blurb: string;
  /** headline numbers — only real, verifiable figures; empty when we have none yet */
  metrics: { v: string; l: string }[];
  // ── long form, rendered on /projects/?p=<slug> (optional until written) ──
  role?: string;
  challenge?: string;
  approach?: string[];
  outcome?: string;
  stage?: string;
  /** true → copy is a placeholder awaiting real details */
  draft?: boolean;
}

/**
 * Real ETEREO portfolio. Screen specs are language-neutral (the fake product UI
 * on the MacBook renders in English); translated prose lives in PANELS[lang].
 * Defence / government clients are shown anonymised (confidential: true).
 */
export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "nordic-defence",
    confidential: true,
    stack: "Secure on-prem · internal systems",
    screen: {
      template: "ops",
      accent: "#5b74ff",
      title: "Operations Console",
      subtitle: "Secure · on-premise",
      kpis: [
        { v: "100%", l: "On-prem" },
        { v: "0", l: "External calls" },
        { v: "24/7", l: "Availability" },
      ],
      rows: ["Access control", "Audit log", "Case workflow", "Offline sync"],
    },
  },
  {
    id: "02",
    slug: "danish-region-admin",
    confidential: true,
    stack: "Internal administration systems",
    screen: {
      template: "analytics",
      accent: "#3f8cff",
      title: "Administration",
      subtitle: "Regional back office",
      kpis: [
        { v: "12", l: "Departments" },
        { v: "1", l: "Source of truth" },
        { v: "99.9%", l: "Uptime" },
      ],
      rows: ["Intake", "Routing", "Approvals", "Archive"],
    },
  },
  {
    id: "03",
    slug: "danish-region-capital",
    confidential: true,
    stack: "Internal regional platform",
    screen: {
      template: "ops",
      accent: "#19c8b0",
      title: "Regional System",
      subtitle: "Internal platform",
      kpis: [
        { v: "1", l: "Unified view" },
        { v: "Live", l: "Status" },
        { v: "SSO", l: "Access" },
      ],
      rows: ["Registry", "Workflow", "Reporting", "Integrations"],
    },
  },
  {
    id: "04",
    slug: "defence-field-app",
    confidential: true,
    stack: "Native mobile · offline-first",
    screen: {
      template: "mobile",
      accent: "#7c7bff",
      title: "Field App",
      subtitle: "Native · offline",
      kpis: [
        { v: "iOS", l: "Native" },
        { v: "Offline", l: "By default" },
        { v: "0", l: "External calls" },
      ],
      rows: ["Briefing", "Checklist", "Report", "Sync"],
    },
  },
  {
    id: "05",
    slug: "ecostruxure-it",
    stack: "Java 21 · Spring Boot · Kubernetes · Kafka · PostgreSQL · Angular",
    screen: {
      template: "map",
      accent: "#37c871",
      title: "EcoStruxure IT",
      subtitle: "DCIM · data centres",
      kpis: [
        { v: "24/7", l: "Monitoring" },
        { v: "4", l: "Datastores" },
        { v: "µsvc", l: "On Kubernetes" },
      ],
      rows: ["Power", "Cooling", "Alarms", "Discovery"],
    },
  },
  {
    id: "06",
    slug: "beumer-localchat",
    stack: "Electron · React 19 · Python · FastAPI · FAISS · llama.cpp",
    screen: {
      template: "analytics",
      accent: "#f0a63c",
      title: "Model Benchmark",
      subtitle: "Offline evaluation",
      kpis: [
        { v: "100%", l: "Offline" },
        { v: "0", l: "External calls" },
        { v: "~195", l: "Tests" },
      ],
      rows: ["Load time", "First token", "Tokens / s", "Peak memory"],
    },
  },
  {
    id: "07",
    slug: "aperia",
    links: [{ label: "aperiaskin.com", href: "https://aperiaskin.com" }],
    stack: ".NET 9 · PostgreSQL · React Native · Expo · Claude API",
    screen: {
      template: "mobile",
      accent: "#f0567a",
      title: "Aperia",
      subtitle: "Skin intelligence",
      kpis: [
        { v: "7", l: "Languages" },
        { v: "60+", l: "Endpoints" },
        { v: "2", l: "App stores" },
      ],
      rows: ["Skin score", "Cycle phase", "Scan", "Insights"],
    },
  },
  {
    id: "08",
    slug: "restaurant-platform",
    stack: "Web · mobile ordering · multi-location",
    screen: {
      template: "analytics",
      accent: "#ff9d5c",
      title: "Restaurant Platform",
      subtitle: "Chain operations",
      kpis: [
        { v: "Live", l: "Orders" },
        { v: "Multi", l: "Location" },
        { v: "1", l: "Owner view" },
      ],
      rows: ["Orders", "Kitchen", "Locations", "Revenue"],
    },
  },
  {
    id: "09",
    slug: "client-sites",
    stack: "Design-led marketing sites",
    screen: {
      template: "map",
      accent: "#4bb8ff",
      title: "Client Websites",
      subtitle: "Web & brand",
      kpis: [
        { v: "UGC", l: "Creators" },
        { v: "Home", l: "Services" },
        { v: "Studios", l: "Architecture" },
      ],
      rows: ["Design", "Build", "Content", "Launch"],
    },
  },
];

/**
 * Translated project copy, parallel to PROJECTS. Long-form fields (role /
 * challenge / approach / outcome) are English-only for now on the three named
 * projects; the Slovak long form lands with the /projects/ detail pages.
 */
export const PANELS: Record<Lang, PanelText[]> = {
  en: [
    {
      name: "A Nordic defence agency",
      sector: "Defence",
      blurb: "A secure internal application for a defence agency, built to run on-premise with no external dependencies.",
      metrics: [],
      challenge:
        "A defence agency needed an internal operational system it could run entirely within its own walls — no cloud services, no external calls, nothing that depended on connectivity it could not guarantee or a vendor it could not audit. The security and sovereignty requirements shaped every decision before a single feature was discussed.",
      approach: [
        "Designed the platform to run fully on-premise, with no external dependencies at runtime, so the agency owns and controls the entire stack.",
        "Built role-based access control, an immutable audit trail and operational reporting in from the start, rather than adding them before a review.",
        "Treated offline and degraded-connectivity operation as a first-class case, so the system keeps working when the network does not.",
      ],
      outcome:
        "An internal operational platform the agency runs on its own infrastructure, with access control and an audit trail as properties of the system rather than features bolted on afterwards.",
    },
    {
      name: "A Danish regional government",
      sector: "Public sector",
      blurb: "Internal administration systems for a Danish regional government — the back-office workflows a region runs on.",
      metrics: [],
      challenge:
        "A regional government runs on back-office workflows — intake, routing, approvals, archiving — that had grown across disconnected tools and manual steps. The work was to bring those into internal administration systems staff could rely on day to day, within the governance and data-protection expectations of the public sector.",
      approach: [
        "Mapped the real back-office processes — how work actually flows from intake to decision to archive — before designing any screens.",
        "Built the core administration workflows into internal systems with clear ownership of each record and each step.",
        "Kept data protection and auditability as design constraints from the outset, as public-sector work requires.",
      ],
      outcome:
        "Internal administration systems that carry the region's day-to-day back-office work, with the process made explicit rather than living in people's heads and scattered tools.",
    },
    {
      name: "A Danish regional authority",
      sector: "Public sector",
      blurb: "An internal system for a Danish regional authority, replacing manual process with a single operational view.",
      metrics: [],
      challenge:
        "A regional authority was running a critical process manually, spread across spreadsheets and email, with no single place to see its real state. The work was to replace that with one internal system that gave a single operational view everyone could trust.",
      approach: [
        "Consolidated a fragmented manual process into one system with a single source of truth.",
        "Designed a clear operational view, so the current state is visible at a glance instead of reconstructed by hand.",
        "Built within the data-protection and governance constraints the public sector requires.",
      ],
      outcome:
        "A single operational view that replaced manual, scattered process — the authority can see the real state of the work without assembling it from separate tools.",
    },
    {
      name: "A national defence force",
      sector: "Defence · Mobile",
      blurb: "A native mobile app for a national defence force, built for reliability in the field.",
      metrics: [],
      challenge:
        "A national defence force needed a native mobile application that stays reliable in the field — where connectivity is intermittent, devices are used in difficult conditions, and failure is not an option. Reliability and resilience drove the design more than any single feature.",
      approach: [
        "Built natively for the target platform, for performance and predictable behaviour on real field devices.",
        "Designed for intermittent and absent connectivity, so the app keeps working offline and reconciles when a connection returns.",
        "Made resilience and data integrity first-class concerns rather than afterthoughts.",
      ],
      outcome:
        "A native field application built to keep working under the conditions a defence force actually operates in, not only in ideal ones.",
    },
    {
      name: "EcoStruxure IT Expert",
      sector: "Data centres · DCIM",
      blurb: "A large-scale DCIM platform by Schneider Electric for real-time data-centre monitoring. Backend work on field-service, licensing and device-lifecycle features.",
      metrics: [
        { v: "24/7", l: "Remote monitoring" },
        { v: "4", l: "Datastores" },
      ],
      role: "Backend engineer on the platform team.",
      challenge:
        "EcoStruxure IT Expert gives data-centre operators real-time visibility into power, cooling and alarms across their estate — a large Java platform mid-migration from a legacy backend to a modern microservice architecture, with data spread across four datastores and integrations into a Salesforce-based back office.",
      approach: [
        "Built and maintained field-service features — hardware refresh, service visits, support cases — and their integrations with the back-office APIs.",
        "Added subscription and license-coverage tracking (used vs. remaining nodes) surfaced in the customer app, plus device end-of-service flags for equipment nearing obsolescence.",
        "Worked to a strictly enforced architecture (ArchUnit) with OpenAPI-first contracts and full unit and integration testing (JUnit 5, Mockito, Testcontainers).",
      ],
      outcome:
        "Shipped customer-facing capabilities into a live DCIM platform and ran production data investigations that quantified coverage and drove product decisions.",
    },
    {
      name: "BEUMER Group LocalChat",
      sector: "Intralogistics · Offline AI",
      blurb: "A fully offline desktop assistant that answers service engineers' questions from confidential manuals — nothing leaves the machine. I built the model measurement and evaluation layer.",
      metrics: [
        { v: "100%", l: "Offline" },
        { v: "~195", l: "Tests" },
      ],
      role: "Measurement and evaluation layer — which model to ship, and whether it actually works.",
      challenge:
        "Service engineers need answers from confidential commissioning manuals and control-logic specs — often on airport and industrial sites with no internet. An assistant that uploads that documentation to a cloud API is unusable regardless of answer quality, so the whole system runs offline: an Electron + React 19 client over a local Python FastAPI service, retrieval in FAISS, generation via local quantised GGUF models (llama.cpp), behind a strict offline mode that blocks and counts every outbound request.",
      approach: [
        "Built a benchmarking suite from scratch in hand-written SVG (no charting library): grouped columns, time series, log-scale speedup bars, and a speed-vs-memory scatter with memory-ceiling bands.",
        "Model and embedding benchmarks measure every model on every device — load time, time-to-first-token, generation speed and peak memory — against questions of rising complexity, so a model that is only fast on the easy one cannot hide.",
        "A retrieval-evaluation view replays a hand-labelled 45-question set through the real index, showing hit-rate by difficulty with expected and actual answers side by side — because the automated judge grades its own family and cannot be trusted alone.",
      ],
      outcome:
        "Cross-platform hardware detection (NVIDIA, Apple Silicon, CPU-only) makes results from different machines comparable, and a CSV merge tool refuses to export silently-wrong data. Evaluated against real BEUMER technical documentation across three manuals.",
      stage: "Prototype, evaluated against real BEUMER documentation.",
    },
    {
      name: "Aperia",
      sector: "Consumer health · Mobile",
      blurb: "A hormone-aware skincare app linking AI skin analysis to the menstrual cycle. Solo-built end to end and shipped to both app stores.",
      metrics: [
        { v: "7", l: "Languages" },
        { v: "60+", l: "API endpoints" },
      ],
      role: "Solo — backend, mobile app, infrastructure and store delivery.",
      challenge:
        "Skin shifts with hormones across the menstrual cycle, with the products people use and with what they eat — but no mainstream app ties those together. Aperia answers “why” with data: AI skin analysis from a selfie (face detection only, never recognition), a cycle tracker, and a correlation engine that turns noisy daily logs into plain-language patterns.",
      approach: [
        "A .NET 9 backend in clean, layered architecture — 60+ REST endpoints, PostgreSQL, EF Core, background jobs — with a React Native / Expo app in strict TypeScript.",
        "Developed an AI model for skin analysis and a lighter model for insight narration; encrypted photo storage on Cloudflare R2, RevenueCat billing, and timezone-aware push with quiet hours.",
        "Privacy and GDPR from day one — explicit Article 9 consent for health data, in-app export and deletion, and language that frames a skin score as a moment, never a diagnosis.",
      ],
      outcome:
        "Localised into seven languages and shipped to both app stores as a solo developer, including Apple's face-data review and Google Play closed testing. Live subscription billing is wired and validated end to end.",
      stage: "In closed beta ahead of public launch.",
    },
    {
      name: "Restaurant chain platform",
      sector: "Hospitality",
      blurb: "An ordering and operations platform for a restaurant chain, with a hierarchical overview for the owner across every location.",
      metrics: [],
      challenge:
        "A restaurant chain needed one platform for ordering and day-to-day operations across multiple locations — and, above that, a hierarchical overview that let the owner see every location from one place instead of chasing numbers site by site.",
      approach: [
        "Built the ordering and operations flows each location uses day to day.",
        "Added a hierarchical overview that rolls every location up into one view for the owner, with the detail still reachable underneath.",
        "Designed the data model around multiple locations from the start, so the chain can grow without a rebuild.",
      ],
      outcome:
        "An ordering and operations platform the chain runs on, with a single owner-level view across every location rather than a separate picture per site.",
    },
    {
      name: "Client websites",
      sector: "Web & brand",
      blurb: "Design-led websites for founders and studios — UGC creators, home-services installers, and architecture portfolios.",
      metrics: [],
      challenge:
        "Founders and studios — UGC creators, home-services installers, architecture practices — need a website that carries their brand, not a template that flattens it. Each one needed design-led work where typography, motion and craft do the selling, built to perform and to last beyond launch day.",
      approach: [
        "Designed each site around the client's brand and audience rather than a reusable template.",
        "Built for performance and accessibility, so the sites are fast and usable, not just good-looking on the day they ship.",
        "Treated the work as something maintained and grown, not handed over and forgotten.",
      ],
      outcome:
        "Design-led sites that carry each client's brand and hold up after launch — built to perform, not just to look right in a first screenshot.",
    },
  ],
  sk: [
    {
      name: "Severská obranná agentúra",
      sector: "Obrana",
      blurb: "Bezpečná interná aplikácia pre obrannú agentúru, navrhnutá tak, aby bežala on-premise a bez externých závislostí.",
      metrics: [],
      challenge:
        "Obranná agentúra potrebovala interný prevádzkový systém, ktorý si vie prevádzkovať úplne sama, vo vlastných priestoroch — žiadne cloudové služby, žiadne externé volania, nič, čo by záviselo od pripojenia, ktoré nedokáže garantovať, ani od dodávateľa, ktorého nedokáže auditovať. Požiadavky na bezpečnosť a suverenitu určovali každé rozhodnutie ešte predtým, než prišla reč na prvú funkciu.",
      approach: [
        "Platformu sme navrhli tak, aby bežala úplne on-premise a bez externých závislostí za behu — agentúra tak vlastní a ovláda celý stack.",
        "Riadenie prístupu podľa rolí, nemenný auditný záznam a prevádzkový reporting sme zabudovali od začiatku, nie až tesne pred auditom.",
        "Prevádzku offline a pri obmedzenom pripojení sme brali ako základný scenár, takže systém funguje aj vtedy, keď sieť nefunguje.",
      ],
      outcome:
        "Interná prevádzková platforma, ktorú si agentúra prevádzkuje na vlastnej infraštruktúre — s riadením prístupu a auditným záznamom ako vlastnosťami samotného systému, nie funkciami prilepenými dodatočne.",
    },
    {
      name: "Dánska regionálna vláda",
      sector: "Verejný sektor",
      blurb: "Interné administratívne systémy pre dánsku regionálnu vládu — back-office procesy, na ktorých región stojí.",
      metrics: [],
      challenge:
        "Regionálna vláda stojí na back-office procesoch — príjem, smerovanie, schvaľovanie, archivácia — ktoré postupne narástli naprieč nespojenými nástrojmi a manuálnymi krokmi. Úlohou bolo preniesť ich do interných administratívnych systémov, na ktoré sa zamestnanci dokážu denne spoľahnúť, a to v rámci nárokov verejného sektora na správu a ochranu údajov.",
      approach: [
        "Najprv sme zmapovali reálne back-office procesy — ako práca naozaj plynie od príjmu cez rozhodnutie až po archiváciu — a až potom sme navrhovali obrazovky.",
        "Kľúčové administratívne procesy sme zabudovali do interných systémov s jasným vlastníctvom každého záznamu aj každého kroku.",
        "Ochranu údajov a auditovateľnosť sme držali ako návrhové obmedzenia od začiatku, ako to práca vo verejnom sektore vyžaduje.",
      ],
      outcome:
        "Interné administratívne systémy, ktoré nesú každodennú back-office prácu regiónu — s procesom vyjadreným explicitne namiesto toho, aby žil v hlavách ľudí a v roztrúsených nástrojoch.",
    },
    {
      name: "Dánsky regionálny úrad",
      sector: "Verejný sektor",
      blurb: "Interný systém pre dánsky regionálny úrad, ktorý nahradil manuálne procesy jedným prevádzkovým prehľadom.",
      metrics: [],
      challenge:
        "Regionálny úrad viedol kritický proces manuálne, roztrúsený v tabuľkách a e-mailoch, bez jediného miesta, kde by videl jeho skutočný stav. Úlohou bolo nahradiť to jedným interným systémom, ktorý poskytne jeden prevádzkový prehľad, ktorému dôverujú všetci.",
      approach: [
        "Rozdrobený manuálny proces sme zjednotili do jedného systému s jediným zdrojom pravdy.",
        "Navrhli sme prehľadný prevádzkový pohľad, takže aktuálny stav je vidno na prvý pohľad, nie zostavovaný ručne.",
        "Postavili sme ho v rámci obmedzení na ochranu údajov a správu, ktoré verejný sektor vyžaduje.",
      ],
      outcome:
        "Jeden prevádzkový prehľad, ktorý nahradil manuálny a roztrúsený proces — úrad vidí skutočný stav práce bez toho, aby ho skladal z oddelených nástrojov.",
    },
    {
      name: "Národné ozbrojené sily",
      sector: "Obrana · Mobil",
      blurb: "Natívna mobilná aplikácia pre národné ozbrojené sily, postavená na spoľahlivosť v teréne.",
      metrics: [],
      challenge:
        "Národné ozbrojené sily potrebovali natívnu mobilnú aplikáciu, ktorá zostane spoľahlivá aj v teréne — kde je pripojenie prerušované, zariadenia sa používajú v náročných podmienkach a zlyhanie neprichádza do úvahy. Návrh určovala spoľahlivosť a odolnosť viac než ktorákoľvek jednotlivá funkcia.",
      approach: [
        "Postavili sme ju natívne pre cieľovú platformu — pre výkon a predvídateľné správanie na reálnych terénnych zariadeniach.",
        "Navrhli sme ju na prerušované aj úplne chýbajúce pripojenie, takže funguje offline a po obnovení spojenia si dáta zosúladí.",
        "Odolnosť a integritu dát sme postavili na prvé miesto, nie až dodatočne.",
      ],
      outcome:
        "Natívna terénna aplikácia postavená tak, aby fungovala v podmienkach, v ktorých ozbrojené sily naozaj pôsobia — nielen v tých ideálnych.",
    },
    {
      name: "EcoStruxure IT Expert",
      sector: "Dátové centrá · DCIM",
      blurb: "Rozsiahla DCIM platforma od Schneider Electric na monitoring dátových centier v reálnom čase. Backendová práca na funkciách pre field-service, licencovanie a životný cyklus zariadení.",
      metrics: [
        { v: "24/7", l: "Vzdialený monitoring" },
        { v: "4", l: "Dátové úložiská" },
      ],
      role: "Backendový inžinier v platformovom tíme.",
      challenge:
        "EcoStruxure IT Expert dáva prevádzkovateľom dátových centier prehľad o napájaní, chladení a alarmoch naprieč celým ich prostredím v reálnom čase — veľká Java platforma uprostred migrácie z legacy backendu na modernú mikroslužbovú architektúru, s dátami rozloženými v štyroch úložiskách a s integráciami do back-office postaveného na Salesforce.",
      approach: [
        "Staval a udržiaval som funkcie pre field-service — obmenu hardvéru, servisné návštevy, podporné prípady — a ich integrácie s back-office API.",
        "Pridal som sledovanie predplatného a pokrytia licencií (využité vs. zostávajúce uzly) zobrazené v zákazníckej aplikácii, plus príznaky konca servisu pre zariadenia blížiace sa k zastaraniu.",
        "Pracoval som podľa striktne vynucovanej architektúry (ArchUnit), s kontraktmi vo formáte OpenAPI-first a s kompletným unit a integračným testovaním (JUnit 5, Mockito, Testcontainers).",
      ],
      outcome:
        "Dodal som zákaznícke funkcie do živej DCIM platformy a viedol produkčné dátové analýzy, ktoré kvantifikovali pokrytie a riadili produktové rozhodnutia.",
    },
    {
      name: "BEUMER Group LocalChat",
      sector: "Intralogistika · Offline AI",
      blurb: "Plne offline desktopový asistent, ktorý servisným technikom odpovedá na otázky z dôverných manuálov — nič neopustí zariadenie. Postavil som vrstvu merania a vyhodnocovania modelov.",
      metrics: [
        { v: "100%", l: "Offline" },
        { v: "~195", l: "Testov" },
      ],
      role: "Vrstva merania a vyhodnocovania — ktorý model nasadiť a či naozaj funguje.",
      challenge:
        "Servisní technici potrebujú odpovede z dôverných uvádzacích manuálov a špecifikácií riadiacej logiky — často na letiskách a v priemyselných areáloch bez internetu. Asistent, ktorý takú dokumentáciu nahrá do cloudového API, je nepoužiteľný bez ohľadu na kvalitu odpovedí, takže celý systém beží offline: klient v Electrone a React 19 nad lokálnou Python FastAPI službou, vyhľadávanie vo FAISS, generovanie cez lokálne kvantizované GGUF modely (llama.cpp), a to všetko za striktným offline režimom, ktorý blokuje a počíta každú odchádzajúcu požiadavku.",
      approach: [
        "Benchmarkovaciu sadu som postavil od nuly v ručne písanom SVG (bez grafovej knižnice): zoskupené stĺpce, časové rady, stĺpce zrýchlenia v logaritmickej škále a bodový graf rýchlosť vs. pamäť s pásmami stropu pamäte.",
        "Benchmarky modelov a embeddingov merajú každý model na každom zariadení — čas načítania, čas do prvého tokenu, rýchlosť generovania a špičkovú spotrebu pamäte — proti otázkam s rastúcou zložitosťou, takže model, ktorý je rýchly len na tej najľahšej, sa nemá kde skryť.",
        "Pohľad na vyhodnotenie vyhľadávania prehrá ručne označenú sadu 45 otázok cez reálny index a ukazuje úspešnosť podľa náročnosti, s očakávanými a skutočnými odpoveďami vedľa seba — pretože automatický hodnotiteľ známkuje vlastnú rodinu modelov a samému sa mu nedá veriť.",
      ],
      outcome:
        "Cross-platformová detekcia hardvéru (NVIDIA, Apple Silicon, len CPU) robí výsledky z rôznych strojov porovnateľnými a nástroj na zlúčenie CSV odmietne ticho exportovať nesprávne dáta. Vyhodnotené proti reálnej technickej dokumentácii BEUMER naprieč tromi manuálmi.",
      stage: "Prototyp, vyhodnotený proti reálnej dokumentácii BEUMER.",
    },
    {
      name: "Aperia",
      sector: "Spotrebiteľské zdravie · Mobil",
      blurb: "Aplikácia na starostlivosť o pleť zohľadňujúca hormóny, ktorá spája AI analýzu pleti s menštruačným cyklom. Postavená sólo od začiatku do konca a vydaná v oboch obchodoch.",
      metrics: [
        { v: "7", l: "Jazykov" },
        { v: "60+", l: "API endpointov" },
      ],
      role: "Sólo — backend, mobilná aplikácia, infraštruktúra aj dodanie do obchodov.",
      challenge:
        "Pleť sa mení s hormónmi počas menštruačného cyklu, s produktmi, ktoré ľudia používajú, aj s tým, čo jedia — no žiadna bežná aplikácia to nespája dohromady. Aperia odpovedá na „prečo“ dátami: AI analýza pleti zo selfie (len detekcia tváre, nikdy rozpoznávanie), sledovač cyklu a korelačný engine, ktorý z hlučných denných záznamov robí zrozumiteľné vzorce.",
      approach: [
        "Backend v .NET 9 v čistej, vrstvenej architektúre — 60+ REST endpointov, PostgreSQL, EF Core, úlohy na pozadí — a k nemu aplikácia v React Native / Expo v striktnom TypeScripte.",
        "Vyvinul som AI model na analýzu pleti a ľahší model na formulovanie poznatkov; šifrované ukladanie fotiek na Cloudflare R2, fakturáciu cez RevenueCat a push notifikácie zohľadňujúce časové pásmo s tichými hodinami.",
        "Súkromie a GDPR od prvého dňa — explicitný súhlas podľa článku 9 pre zdravotné údaje, export a vymazanie priamo v aplikácii a jazyk, ktorý skóre pleti rámcuje ako moment, nikdy nie ako diagnózu.",
      ],
      outcome:
        "Lokalizovaná do siedmich jazykov a vydaná v oboch obchodoch ako sólo vývojár — vrátane kontroly údajov o tvári od Apple a uzavretého testovania v Google Play. Živá fakturácia predplatného je zapojená a overená od začiatku do konca.",
      stage: "V uzavretej beta verzii pred verejným spustením.",
    },
    {
      name: "Platforma pre reťazec reštaurácií",
      sector: "Gastro",
      blurb: "Objednávacia a prevádzková platforma pre reťazec reštaurácií s hierarchickým prehľadom pre majiteľa naprieč všetkými pobočkami.",
      metrics: [],
      challenge:
        "Reťazec reštaurácií potreboval jednu platformu na objednávky a každodennú prevádzku naprieč viacerými pobočkami — a nad ňou hierarchický prehľad, ktorý majiteľovi umožní vidieť každú pobočku z jedného miesta namiesto naháňania čísel pobočku po pobočke.",
      approach: [
        "Postavili sme objednávkové a prevádzkové procesy, ktoré každá pobočka používa deň čo deň.",
        "Pridali sme hierarchický prehľad, ktorý poskladá všetky pobočky do jedného pohľadu pre majiteľa, pričom detail zostáva dostupný pod ním.",
        "Dátový model sme navrhli okolo viacerých pobočiek už od začiatku, takže reťazec môže rásť bez prestavby.",
      ],
      outcome:
        "Objednávacia a prevádzková platforma, na ktorej reťazec beží — s jedným prehľadom na úrovni majiteľa naprieč všetkými pobočkami namiesto samostatného obrazu pre každú pobočku.",
    },
    {
      name: "Klientske weby",
      sector: "Web a značka",
      blurb: "Dizajnovo orientované weby pre zakladateľov a štúdiá — UGC tvorcov, inštalatérov domácich služieb a architektonické portfóliá.",
      metrics: [],
      challenge:
        "Zakladatelia a štúdiá — UGC tvorcovia, inštalatéri domácich služieb, architektonické ateliéry — potrebujú web, ktorý nesie ich značku, nie šablónu, ktorá ju zploští. Každý z nich potreboval dizajnovo orientovanú prácu, kde predáva typografia, pohyb a remeslo, a ktorá je postavená na výkon a na to, aby vydržala aj po dni spustenia.",
      approach: [
        "Každý web sme navrhli okolo značky a publika klienta, nie okolo opakovateľnej šablóny.",
        "Postavili sme ich na výkon a prístupnosť, takže sú rýchle a použiteľné, nielen pekné v deň, keď idú von.",
        "Prácu sme brali ako niečo, čo sa udržiava a rozvíja, nie odovzdá a zabudne.",
      ],
      outcome:
        "Dizajnovo orientované weby, ktoré nesú značku každého klienta a obstoja aj po spustení — postavené na výkon, nie len na to, aby vyzerali dobre na prvom screenshote.",
    },
  ],
};

export const PROJECT_COUNT = PROJECTS.length;

// The home-page hero carousel shows only the first few projects, to keep the scroll
// sequence short; /projects/ still lists all of them. The hero machinery (choreo,
// Macbook, ProjectPanel) counts to HERO_COUNT; the gallery counts to PROJECT_COUNT.
export const HERO_COUNT = Math.min(5, PROJECT_COUNT);

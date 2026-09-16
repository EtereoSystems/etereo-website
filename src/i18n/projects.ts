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
      draft: true,
    },
    {
      name: "A Danish regional government",
      sector: "Public sector",
      blurb: "Internal administration systems for a Danish regional government — the back-office workflows a region runs on.",
      metrics: [],
      draft: true,
    },
    {
      name: "A Danish regional authority",
      sector: "Public sector",
      blurb: "An internal system for a Danish regional authority, replacing manual process with a single operational view.",
      metrics: [],
      draft: true,
    },
    {
      name: "A national defence force",
      sector: "Defence · Mobile",
      blurb: "A native mobile app for a national defence force, built for reliability in the field.",
      metrics: [],
      draft: true,
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
      draft: true,
    },
    {
      name: "Client websites",
      sector: "Web & brand",
      blurb: "Design-led websites for founders and studios — UGC creators, home-services installers, and architecture portfolios.",
      metrics: [],
      draft: true,
    },
  ],
  sk: [
    {
      name: "Severská obranná agentúra",
      sector: "Obrana",
      blurb: "Bezpečná interná aplikácia pre obrannú agentúru, navrhnutá na prevádzku on-premise bez externých závislostí.",
      metrics: [],
      draft: true,
    },
    {
      name: "Dánska regionálna vláda",
      sector: "Verejný sektor",
      blurb: "Interné administratívne systémy pre dánsku regionálnu vládu — back-office procesy, na ktorých región beží.",
      metrics: [],
      draft: true,
    },
    {
      name: "Dánsky regionálny úrad",
      sector: "Verejný sektor",
      blurb: "Interný systém pre dánsky regionálny úrad, ktorý nahradil manuálne procesy jedným prevádzkovým prehľadom.",
      metrics: [],
      draft: true,
    },
    {
      name: "Národné ozbrojené sily",
      sector: "Obrana · Mobil",
      blurb: "Natívna mobilná aplikácia pre národné ozbrojené sily, postavená na spoľahlivosť v teréne.",
      metrics: [],
      draft: true,
    },
    {
      name: "EcoStruxure IT Expert",
      sector: "Dátové centrá · DCIM",
      blurb: "Rozsiahla DCIM platforma od Schneider Electric na monitoring dátových centier v reálnom čase. Backendová práca na field-service, licenciách a životnom cykle zariadení.",
      metrics: [
        { v: "24/7", l: "Vzdialený monitoring" },
        { v: "4", l: "Dátové úložiská" },
      ],
    },
    {
      name: "BEUMER Group LocalChat",
      sector: "Intralogistika · Offline AI",
      blurb: "Plne offline desktopový asistent, ktorý servisným technikom odpovedá z dôverných manuálov — nič neopustí zariadenie. Postavil som vrstvu merania a vyhodnotenia modelov.",
      metrics: [
        { v: "100%", l: "Offline" },
        { v: "~195", l: "Testov" },
      ],
    },
    {
      name: "Aperia",
      sector: "Spotrebiteľské zdravie · Mobil",
      blurb: "Aplikácia na starostlivosť o pleť citlivá na hormóny, ktorá spája AI analýzu pleti s menštruačným cyklom. Postavená sólo od začiatku do konca a vydaná v oboch obchodoch.",
      metrics: [
        { v: "7", l: "Jazykov" },
        { v: "60+", l: "API endpointov" },
      ],
      stage: "V uzavretej beta verzii pred verejným spustením.",
    },
    {
      name: "Platforma pre reťazec reštaurácií",
      sector: "Gastro",
      blurb: "Objednávacia a prevádzková platforma pre reťazec reštaurácií s hierarchickým prehľadom pre majiteľa naprieč všetkými pobočkami.",
      metrics: [],
      draft: true,
    },
    {
      name: "Klientske weby",
      sector: "Web a značka",
      blurb: "Dizajnovo vedené weby pre zakladateľov a štúdiá — UGC tvorcovia, inštalatéri domácich služieb a architektonické portfóliá.",
      metrics: [],
      draft: true,
    },
  ],
};

export const PROJECT_COUNT = PROJECTS.length;

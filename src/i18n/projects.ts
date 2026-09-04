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
  id: string;
  stack: string;
  screen: ScreenSpec;
}

export interface PanelText {
  name: string;
  sector: string;
  blurb: string;
  metrics: { v: string; l: string }[];
}

/** Screen + technical data (language-neutral — product UIs render in English). */
export const PROJECTS: Project[] = [
  {
    id: "01",
    stack: "Go · PostgreSQL · Kafka · Kubernetes",
    screen: {
      template: "ops",
      accent: "#6d54f0",
      title: "Corebank Migration",
      subtitle: "Core replatform · live",
      kpis: [
        { v: "0", l: "Downtime hrs" },
        { v: "4.1M", l: "Records" },
        { v: "31/wk", l: "Releases" },
      ],
      rows: ["Ledger service", "Payments cutover", "Fraud stream", "Legacy shadow"],
    },
  },
  {
    id: "02",
    stack: "TypeScript · Next.js · ClickHouse",
    screen: {
      template: "analytics",
      accent: "#3f8cff",
      title: "Fleet Intelligence",
      subtitle: "Dispatch analytics",
      kpis: [
        { v: "6,000", l: "Vehicles" },
        { v: "18%", l: "Fuel saved" },
        { v: "99.98%", l: "Uptime" },
      ],
      rows: ["Route load", "Idle time", "On-time %", "Cost / km"],
    },
  },
  {
    id: "03",
    stack: "Swift · Kotlin · Offline-first",
    screen: {
      template: "mobile",
      accent: "#19c8b0",
      title: "Clinic Field App",
      subtitle: "Offline records",
      kpis: [
        { v: "34m", l: "Saved / day" },
        { v: "100%", l: "Audit trail" },
        { v: "5", l: "Regions" },
      ],
      rows: ["Patient intake", "Vitals sync", "Care plan", "e-Signature"],
    },
  },
  {
    id: "04",
    stack: "Python · Terraform · Grafana",
    screen: {
      template: "map",
      accent: "#37c871",
      title: "Grid Operations",
      subtitle: "Asset telemetry",
      kpis: [
        { v: "12k", l: "Sensors" },
        { v: "-41%", l: "Outage time" },
        { v: "24/7", l: "Monitoring" },
      ],
      rows: ["North grid", "Substation 7", "Meter mesh", "Fault replay"],
    },
  },
  {
    id: "05",
    stack: "React · GraphQL · Stripe",
    screen: {
      template: "analytics",
      accent: "#f0a63c",
      title: "Commerce Console",
      subtitle: "Omnichannel",
      kpis: [
        { v: "1.2M", l: "Orders / mo" },
        { v: "+27%", l: "Conversion" },
        { v: "120ms", l: "TTFB" },
      ],
      rows: ["Checkout", "Inventory truth", "Returns", "Loyalty"],
    },
  },
  {
    id: "06",
    stack: ".NET · Azure · Service Bus",
    screen: {
      template: "ops",
      accent: "#f0567a",
      title: "Claims Engine",
      subtitle: "Insurance ops",
      kpis: [
        { v: "3.4d", l: "→ 6h cycle" },
        { v: "92%", l: "Auto-triage" },
        { v: "0", l: "Escapes" },
      ],
      rows: ["Intake", "Risk score", "Adjuster queue", "Payout"],
    },
  },
  {
    id: "07",
    stack: "React Native · Rust · WebSocket",
    screen: {
      template: "mobile",
      accent: "#7c7bff",
      title: "Trader Companion",
      subtitle: "Real-time app",
      kpis: [
        { v: "48ms", l: "Tick latency" },
        { v: "1.8M", l: "Users" },
        { v: "4.9★", l: "Store" },
      ],
      rows: ["Watchlist", "Live quotes", "Alerts", "Portfolio"],
    },
  },
  {
    id: "08",
    stack: "Go · Postgres · OpenTelemetry",
    screen: {
      template: "map",
      accent: "#4bb8ff",
      title: "Port Logistics",
      subtitle: "Container flow",
      kpis: [
        { v: "38k", l: "TEU / wk" },
        { v: "-23%", l: "Dwell time" },
        { v: "6", l: "Terminals" },
      ],
      rows: ["Gate in", "Yard plan", "Crane cycle", "Customs"],
    },
  },
];

export const PANELS: Record<Lang, PanelText[]> = {
  en: [
    { name: "Corebank", sector: "Banking", blurb: "A 22-year-old core banking stack sliced into domain services and migrated with zero planned downtime.", metrics: [{ v: "0", l: "Planned downtime hours" }, { v: "-71%", l: "Infrastructure cost" }] },
    { name: "Fleetwise", sector: "Logistics", blurb: "Multi-tenant routing and telemetry across a 6,000-vehicle fleet, with the billing layer that moved sales upmarket.", metrics: [{ v: "40", l: "Enterprise tenants" }, { v: "18%", l: "Fuel reduction" }] },
    { name: "Caresync", sector: "Healthcare", blurb: "An offline-first clinician app on a compliance-first platform with a full audit trail and data-residency controls.", metrics: [{ v: "34 min", l: "Saved per clinician / day" }, { v: "100%", l: "Audit coverage" }] },
    { name: "Gridwatch", sector: "Energy", blurb: "Field operations and asset telemetry for a regional grid — turning 12k sensors into a single operational view.", metrics: [{ v: "-41%", l: "Outage duration" }, { v: "12k", l: "Live sensors" }] },
    { name: "Marketframe", sector: "Retail", blurb: "An omnichannel commerce platform engineered for peak-day performance budgets and honest inventory.", metrics: [{ v: "+27%", l: "Conversion" }, { v: "1.2M", l: "Orders / month" }] },
    { name: "Claimflow", sector: "Insurance", blurb: "A claims engine that cut cycle time from days to hours with automated triage — and zero quality escapes.", metrics: [{ v: "3.4d → 6h", l: "Cycle time" }, { v: "92%", l: "Auto-triaged" }] },
    { name: "Tradepal", sector: "Fintech", blurb: "A real-time trading companion app with sub-50ms tick latency and offline-resilient sync for 1.8M users.", metrics: [{ v: "48 ms", l: "Tick latency" }, { v: "4.9★", l: "App store" }] },
    { name: "Portgrid", sector: "Mobility", blurb: "Container-flow orchestration across six terminals, cutting dwell time with live yard and crane planning.", metrics: [{ v: "-23%", l: "Dwell time" }, { v: "38k", l: "TEU / week" }] },
  ],
  sk: [
    { name: "Corebank", sector: "Bankovníctvo", blurb: "22-ročné jadro bankového systému rozdelené na doménové služby a migrované bez plánovaného výpadku.", metrics: [{ v: "0", l: "Hodín plánovaného výpadku" }, { v: "-71%", l: "Náklady na infraštruktúru" }] },
    { name: "Fleetwise", sector: "Logistika", blurb: "Multi-tenant routing a telemetria naprieč 6 000 vozidlami, s fakturačnou vrstvou, ktorá posunula predaj vyššie.", metrics: [{ v: "40", l: "Firemných tenantov" }, { v: "18%", l: "Úspora paliva" }] },
    { name: "Caresync", sector: "Zdravotníctvo", blurb: "Offline-first aplikácia pre lekárov na compliance-first platforme s plnou auditnou stopou a rezidenciou dát.", metrics: [{ v: "34 min", l: "Ušetrených na lekára / deň" }, { v: "100%", l: "Pokrytie auditom" }] },
    { name: "Gridwatch", sector: "Energetika", blurb: "Terénne operácie a telemetria aktív pre regionálnu sieť — 12-tisíc senzorov v jednom prehľade.", metrics: [{ v: "-41%", l: "Trvanie výpadkov" }, { v: "12k", l: "Živých senzorov" }] },
    { name: "Marketframe", sector: "Retail", blurb: "Omnichannel e-commerce platforma navrhnutá na výkon v špičke a presné zásoby.", metrics: [{ v: "+27%", l: "Konverzia" }, { v: "1,2M", l: "Objednávok / mesiac" }] },
    { name: "Claimflow", sector: "Poisťovníctvo", blurb: "Systém na likvidáciu škôd, ktorý skrátil cyklus z dní na hodiny automatickým triedením — bez únikov kvality.", metrics: [{ v: "3,4d → 6h", l: "Čas cyklu" }, { v: "92%", l: "Auto-triage" }] },
    { name: "Tradepal", sector: "Fintech", blurb: "Real-time obchodná aplikácia s latenciou pod 50 ms a offline-odolnou synchronizáciou pre 1,8M používateľov.", metrics: [{ v: "48 ms", l: "Latencia" }, { v: "4,9★", l: "App store" }] },
    { name: "Portgrid", sector: "Mobilita", blurb: "Orchestrácia toku kontajnerov naprieč šiestimi terminálmi so živým plánovaním skladu a žeriavov.", metrics: [{ v: "-23%", l: "Čas zdržania" }, { v: "38k", l: "TEU / týždeň" }] },
  ],
};

export const PROJECT_COUNT = PROJECTS.length;

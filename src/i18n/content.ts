import type { Lang } from "../store";

export interface Service {
  id: string;
  title: string;
  body: string;
  tags: string[];
}
export interface Phase {
  n: string;
  title: string;
  body: string;
  artifact: string;
}
export interface WorkCase {
  tag: string;
  kind: string;
  duration: string;
  title: string;
  /** one-sentence teaser for the home page */
  body: string;
  stack: string;
  stats: { value: string; label: string }[];
  /** long form, rendered only on /projects/ */
  challenge: string;
  approach: string[];
  outcome: string;
}

export interface BlogPage {
  title: string;
  intro: string;
  note: string;
  back: string;
}

export interface AboutPage {
  title: string;
  intro: string;
  story: string[];
  factsTitle: string;
  facts: { label: string; value: string }[];
  teamTitle: string;
  teamIntro: string;
  note: string;
  back: string;
  cta: { title: string; body: string; action: string };
}

export interface CasePage {
  title: string;
  intro: string;
  note: string;
  back: string;
  labels: { challenge: string; approach: string; outcome: string; stack: string; duration: string; kind: string };
  cta: { title: string; body: string; action: string };
}
export interface Industry {
  n: string;
  title: string;
  body: string;
}
export interface Engagement {
  title: string;
  badge: string;
  cadence: string;
  body: string;
  points: string[];
  cta: string;
  featured?: boolean;
}
export interface Person {
  initials: string;
  name: string;
  role: string;
  body: string;
}
export interface Faq {
  q: string;
  a: string;
}
export interface Article {
  tag: string;
  read: string;
  title: string;
  body: string;
}

export interface Content {
  nav: { services: string; process: string; work: string; industries: string; about: string; insights: string; start: string };
  hero: {
    badge: string;
    tagline: string;
    sub: string;
    primary: string;
    secondary: string;
    scrollHint: string;
    screenTag: string;
    screenTitle: string;
  };
  services: { title: string; sub: string; items: Service[] };
  process: { title: string; sub: string; items: Phase[] };
  tech: { title: string; sub: string; groups: { label: string; items: string[] }[] };
  work: { eyebrow: string; title: string; sub: string; note: string; all: string; items: WorkCase[] };
  industries: { title: string; items: Industry[] };
  engage: { title: string; items: Engagement[] };
  voices: { title: string; items: { quote: string; name: string; role: string }[] };
  team: { title: string; all: string; people: Person[] };
  insights: { title: string; items: Article[] };
  faq: { title: string; items: Faq[] };
  contact: {
    eyebrow: string;
    title: string;
    sub: string;
    formTitle: string;
    formSub: string;
    name: string;
    email: string;
    company: string;
    need: string;
    needs: string[];
    context: string;
    contextPh: string;
    submit: string;
    sent: string;
    disclaimer: string;
    channels: { label: string; value: string }[];
  };
  footer: {
    blurb: string;
    cols: { title: string; links: { label: string; href: string }[] }[];
    rights: string;
    tagline: string;
  };
  casePage: CasePage;
  aboutPage: AboutPage;
  blogPage: BlogPage;
}

const en: Content = {
  nav: { services: "Services", process: "Process", work: "Work", industries: "Industries", about: "About us", insights: "Blog", start: "Start a project" },
  hero: {
    badge: "Digital transformation engineering",
    tagline: "We rebuild the systems your business already runs on.",
    sub: "Established companies hire us to modernise legacy platforms, ship SaaS products, and put mobile and web engineering on a footing that lasts. Strategy, architecture, delivery — one accountable team.",
    primary: "Book a discovery call",
    secondary: "See our work",
    scrollHint: "Scroll to open",
    screenTag: "Active engagement",
    screenTitle: "Delivery console",
  },
  services: {
    title: "Six disciplines, one delivery team",
    sub: "We are not a marketplace of freelancers. Every engagement is staffed from the same bench, held to the same architecture review, and shipped on the same release discipline.",
    items: [
      { id: "S/01", title: "Digital transformation", body: "Legacy platforms replatformed in slices, with the business running the whole way through. No big-bang cutovers.", tags: ["Assessment", "Replatforming", "Data migration"] },
      { id: "S/02", title: "Custom software", body: "Line-of-business systems built around how your operation actually works, not around a vendor's roadmap.", tags: ["Architecture", "Integrations", "Workflow"] },
      { id: "S/03", title: "SaaS products", body: "Multi-tenant products from zero: billing, entitlements, admin, telemetry and the boring parts that decide whether you scale.", tags: ["Multi-tenancy", "Billing", "Analytics"] },
      { id: "S/04", title: "Mobile engineering", body: "iOS, Android and cross-platform apps with offline behaviour, release automation and store operations handled.", tags: ["iOS", "Android", "React Native"] },
      { id: "S/05", title: "Web platforms", body: "Marketing sites, portals and commerce fronts engineered for performance budgets and accessibility, not just for launch day.", tags: ["Next.js", "Headless CMS", "Commerce"] },
      { id: "S/06", title: "Cloud & platform", body: "Infrastructure as code, CI/CD, observability and cost control — so shipping stops being an event.", tags: ["AWS", "Kubernetes", "Terraform"] },
    ],
  },
  process: {
    title: "A transformation runs on evidence, not enthusiasm",
    sub: "Five phases, each ending in something you can inspect: a decision record, a working environment, a shipped release.",
    items: [
      { n: "01", title: "Audit", body: "Two weeks inside your code, data and org chart.", artifact: "Risk register" },
      { n: "02", title: "Architect", body: "Target state, sequencing and the trade-offs written down.", artifact: "Decision records" },
      { n: "03", title: "Build", body: "Two-week increments, demoed to real users every time.", artifact: "Working release" },
      { n: "04", title: "Harden", body: "Load, security, compliance and failure drills.", artifact: "Evidence pack" },
      { n: "05", title: "Hand over", body: "Runbooks, pairing and on-call transition to your team.", artifact: "Ownership" },
    ],
  },
  tech: {
    title: "Boring technology, chosen on purpose",
    sub: "We pick stacks your team can hire for and your auditors can live with — then document every decision.",
    groups: [
      { label: "Product & web", items: ["TypeScript", "React / Next.js", "Astro", "Design systems", "Accessibility (WCAG 2.2)"] },
      { label: "Backend & data", items: ["Go, Python, .NET", "PostgreSQL, ClickHouse", "Kafka, event sourcing", "GraphQL & REST", "Warehouse & ETL"] },
      { label: "Mobile", items: ["Swift / SwiftUI", "Kotlin / Compose", "React Native", "Offline-first sync", "Release automation"] },
      { label: "Platform", items: ["AWS, Azure, GCP", "Kubernetes, Terraform", "GitHub Actions", "OpenTelemetry, Grafana", "SOC 2 tooling"] },
    ],
  },
  work: {
    eyebrow: "Selected work",
    all: "Read the full case studies",
    title: "In their own numbers",
    note: "Illustrative case studies for this draft — swap in your real client names and metrics.",
    sub: "",
    items: [
      { tag: "Banking", kind: "Core replatform", duration: "18 months", title: "A 22-year-old core banking stack, migrated without a single planned outage", body: "We sliced a monolithic core into domain services and moved 4.1M customer records in nightly batches, running old and new in parallel for eleven weeks before the final cutover.", challenge: "The core had accreted 22 years of undocumented behaviour, and the nightly batch no longer fit in a night. Every previous attempt had been planned as one cutover weekend, and every one had been called off.", approach: ["Read the code and traced the data before proposing anything — six weeks of audit produced a dependency map and a risk register the board could act on.", "Sliced the monolith along domain boundaries, starting where the regulatory weight was lightest.", "Ran old and new in parallel for eleven weeks, reconciling both ledgers nightly until the delta held at zero.", "Moved 4.1M customer records in nightly batches, each one reversible until the following morning."], outcome: "The final cutover took the system down for no planned minutes at all. Release cadence went from twelve a week to thirty-one, and infrastructure cost fell 71% once the legacy estate was switched off.", stack: "Go · PostgreSQL · Kafka · Kubernetes · AWS", stats: [ { value: "0", label: "Planned downtime hours" }, { value: "-71%", label: "Infrastructure cost" }, { value: "4.1M", label: "Records migrated" }, { value: "12→31", label: "Releases per week" } ] },
      { tag: "Logistics", kind: "SaaS product", duration: "9 months", title: "A dispatch product built from zero to 40 enterprise tenants", body: "Multi-tenant routing and telemetry with hardware integrations across 6,000 vehicles, plus the billing and entitlement layer that let sales move upmarket.", challenge: "The client sold dispatch software to single-depot operators and could not move upmarket. Every enterprise deal stalled on the same three things: tenant isolation, per-seat billing, and an audit trail nobody had built.", approach: ["Designed multi-tenancy into the data layer before any feature work — retrofitting it later is what had killed the previous attempt.", "Built billing and entitlements as a product surface rather than a wrapper around a payment provider.", "Integrated three generations of in-cab hardware across 6,000 vehicles, none of which spoke the same protocol.", "Put route and idle telemetry into ClickHouse so operators could answer cost-per-kilometre questions themselves."], outcome: "Forty enterprise tenants inside the first year, 18% lower fuel spend across the connected fleet, and 99.98% uptime through two peak seasons.", stack: "TypeScript · Next.js · ClickHouse · Terraform", stats: [ { value: "40", label: "Enterprise tenants" }, { value: "18%", label: "Fuel cost reduction" }, { value: "6k", label: "Connected vehicles" }, { value: "99.98%", label: "Uptime" } ] },
      { tag: "Healthcare", kind: "Mobile + platform", duration: "12 months", title: "Clinician mobile app on a compliance-first data platform", body: "Offline-first records for field clinicians in low-connectivity regions, on a platform with a full audit trail and data-residency controls built in from day one.", challenge: "Field clinicians worked in regions where connectivity dropped for hours, and the existing app lost data when it did. The platform behind it could not evidence where patient records physically lived.", approach: ["Made the app offline-first by default: every record writes locally and syncs when it can, with conflicts surfaced to the clinician instead of resolved silently.", "Built the audit trail into the write path, so coverage is a property of the system rather than a report someone remembers to run.", "Enforced data residency at the storage layer, with per-region keys and no cross-region replication.", "Shipped iOS and Android from a shared domain core, keeping the interface native on both."], outcome: "Thirty-four minutes back per clinician per day, complete audit coverage across five live regions, and zero data-residency findings in two external reviews.", stack: "Swift · Kotlin · Go · PostgreSQL", stats: [ { value: "34 min", label: "Saved per clinician daily" }, { value: "100%", label: "Audit trail coverage" }, { value: "5", label: "Regions live" }, { value: "0", label: "Data-residency findings" } ] },
    ],
  },
  industries: {
    title: "Regulated, operational, high-consequence",
    items: [
      { n: "01", title: "Financial services", body: "Core systems, payments, and the audit trail to prove it." },
      { n: "02", title: "Healthcare", body: "Clinical workflow and records under strict residency rules." },
      { n: "03", title: "Logistics & mobility", body: "Fleet, routing and telemetry at operational scale." },
      { n: "04", title: "Energy & utilities", body: "Field operations, metering and asset intelligence." },
      { n: "05", title: "Retail & commerce", body: "Omnichannel platforms, inventory truth, checkout speed." },
      { n: "06", title: "Public sector", body: "Citizen services built to accessibility and procurement standards." },
    ],
  },
  engage: {
    title: "Three ways to start",
    items: [
      { title: "Assessment", badge: "Fixed fee", cadence: "2–3 weeks", body: "A written read on your system before anyone commits to a programme.", points: ["Architecture and code audit", "Risk register and dependency map", "Sequenced modernisation plan", "Board-ready cost estimate"], cta: "Scope an assessment" },
      { title: "Delivery squad", badge: "Most common", cadence: "3–18 months", body: "A full team — product, design, engineering, platform — accountable for shipped outcomes.", points: ["4–8 senior people, one lead", "Two-week increments, demoed live", "Your repos, your cloud, your IP", "Exit points at every phase"], cta: "Talk about a squad", featured: true },
      { title: "Embedded engineers", badge: "Flexible", cadence: "Rolling monthly", body: "Senior specialists inside your existing teams, on your board and your standups.", points: ["Staff or lead named up front", "30-day rolling commitment", "Knowledge transfer built in", "Scale up or down quarterly"], cta: "Check availability" },
    ],
  },
  voices: {
    title: "Client voices",
    items: [
      { quote: "They found three failure modes our own team had normalised. The audit alone was worth the programme.", name: "A. Reyes", role: "CTO, financial services (placeholder)" },
      { quote: "First release in four weeks, and it was real software in production — not a prototype.", name: "M. Kaur", role: "VP Product, logistics (placeholder)" },
      { quote: "Our engineers are better than they were a year ago. That was the part I did not expect to buy.", name: "J. Lindqvist", role: "Head of Engineering, health (placeholder)" },
    ],
  },
  team: {
    title: "You meet the engineers, not the sales team",
    all: "Read more about us",
    people: [
      { initials: "PK", name: "Patrik Klimko", role: "Co-founder · Engineering", body: "Product and platform engineering, from first architecture to production run." },
      { initials: "MK", name: "Matej Kučera", role: "Co-founder · Engineering", body: "Systems, data and delivery — turning messy operations into software that holds." },
      { initials: "—", name: "Your senior lead", role: "Named per engagement", body: "Every programme gets one accountable lead who stays from audit to hand-over." },
      { initials: "+", name: "A small senior bench", role: "Specialists on call", body: "Mobile, cloud and data specialists pulled in exactly when the work needs them." },
    ],
  },
  insights: {
    title: "Notes from inside the work",
    items: [
      { tag: "Architecture", read: "9 min", title: "Strangler patterns that survive contact with a real business", body: "Why incremental cutovers fail on the org chart before they fail on the code — and how to sequence around it." },
      { tag: "Delivery", read: "6 min", title: "What a two-week audit should actually produce", body: "The four artefacts we hand over, and how clients use them to get budget approved." },
      { tag: "Platform", read: "7 min", title: "Cutting cloud spend 70% without a migration freeze", body: "The unglamorous checklist: right-sizing, data lifecycle, and killing the staging estate nobody uses." },
    ],
  },
  faq: {
    title: "Questions we always get",
    items: [
      { q: "How do you start on a legacy system nobody fully understands?", a: "We run a two-week audit: read the code, trace the data, interview the people who keep it alive. You get a dependency map, a risk register, and a sequenced plan — whether or not you continue with us." },
      { q: "Can you work alongside our in-house engineers?", a: "Yes — most of our work is embedded. We pair, review, and document as we go so your team owns the system when we leave, not just the deliverable." },
      { q: "What does an engagement typically cost?", a: "An assessment is a fixed fee. Delivery squads and embedded engineers are priced monthly against a named team. You get a board-ready estimate before any build starts." },
      { q: "How do you handle compliance and data residency?", a: "Residency, audit trails and access control are architecture decisions we take on day one, not features bolted on before launch. We document the evidence auditors ask for as we build." },
    ],
  },
  contact: {
    eyebrow: "Start here",
    title: "Tell us what is breaking.",
    sub: "A 45-minute call with two engineers — no discovery fee, no deck. You leave with a written read on scope, risk, and the shape of a first release.",
    formTitle: "Book a discovery call",
    formSub: "Two engineers, 45 minutes, no fee.",
    name: "Name",
    email: "Work email",
    company: "Company",
    need: "What do you need",
    needs: ["Legacy modernisation", "SaaS product", "Mobile app", "Web platform", "Team augmentation", "Cloud & DevOps"],
    context: "Context",
    contextPh: "What is the system today, and what has to be true in six months?",
    submit: "Request a call",
    sent: "Thanks — we'll reply within two working days.",
    disclaimer: "Contact details are placeholders in this draft.",
    channels: [
      { label: "New business", value: "info@etereosystems.com" },
      { label: "Studio", value: "Bratislava, Slovakia" },
      { label: "Hours", value: "Remote-first · CET" },
    ],
  },
  casePage: {
    title: "Three programmes, described in full",
    intro: "Each of these ran as one accountable team from audit to hand-over. The numbers are the ones the client measured.",
    note: "Illustrative case studies for this draft — swap in your real client names and metrics.",
    back: "Back to the site",
    labels: { challenge: "The problem", approach: "What we did", outcome: "Where it landed", stack: "Stack", duration: "Duration", kind: "Engagement" },
    cta: { title: "Have something that looks like one of these?", body: "A fixed-fee assessment puts a written read on your system in two to three weeks — whether or not a programme follows.", action: "Book a discovery call" },
  },
  aboutPage: {
    title: "About us",
    intro: "ETEREO is a Slovak software house built around one arrangement: the people who scope the work are the people who ship it.",
    story: [
      "We started ETEREO in 2026, after years spent inside other people's transformation programmes — most of them sold by one team, planned by a second and built by a third. By the time anyone wrote code, nobody left in the room had been in the meeting where the promises were made.",
      "So we keep the company small on purpose. Every engagement is staffed from the same senior bench, held to the same architecture review, and led by one person who stays from the first audit to the hand-over. When something breaks at two in the morning, the person who answers is the person who built it.",
      "We work mostly with established companies whose systems are load-bearing — the platform the business actually runs on, where a rewrite is not an option and a failed cutover is a board-level event. That constraint shapes the method: work in slices, keep the business running throughout, and end every phase in something you can inspect yourself.",
    ],
    factsTitle: "The essentials",
    facts: [
      { label: "Founded", value: "2026, Bratislava" },
      { label: "Founders", value: "Patrik Klimko and Matej Kučera" },
      { label: "Legal entity", value: "ETEREO s.r.o." },
      { label: "How we work", value: "Remote-first, CET hours" },
      { label: "Languages", value: "English and Slovak" },
      { label: "Where we work", value: "Slovakia, Central Europe, EU" },
    ],
    teamTitle: "Who you actually work with",
    teamIntro: "A small senior bench rather than a pyramid. You meet the engineers on the first call, and they are the ones who stay.",
    note: "ETEREO is a newly founded company. We do not claim historical project counts or client rosters — the case studies on this site are labelled illustrative until real client work is published.",
    back: "Back to the site",
    cta: {
      title: "Want to talk to the people who would do the work?",
      body: "It is the only kind of call we run — no account manager, no discovery deck, just the engineers who would build it.",
      action: "Book a discovery call",
    },
  },
  blogPage: {
    title: "Notes from inside the work",
    intro: "Write-ups from live programmes — what held, what we would sequence differently, and the parts that matter more than they sound like they should.",
    note: "Placeholder posts for this draft. None of them link anywhere yet — swap in real articles when you start publishing.",
    back: "Back to the site",
  },
  footer: {
    blurb: "Software engineering and digital transformation for companies whose systems already carry real weight.",
    cols: [
      { title: "Services", links: [{ label: "Digital transformation", href: "/#services" }, { label: "Custom software", href: "/#services" }, { label: "SaaS products", href: "/#services" }, { label: "Mobile & web", href: "/#services" }] },
      { title: "Company", links: [{ label: "Work", href: "/projects/" }, { label: "Team", href: "/about/" }, { label: "Blog", href: "/blog/" }] },
      { title: "Contact", links: [{ label: "Start a project", href: "/#contact" }, { label: "Engagement models", href: "/#engage" }, { label: "FAQ", href: "/#faq" }, { label: "Industries", href: "/#industries" }] },
    ],
    rights: "© 2026 ETEREO s.r.o. All rights reserved.",
    tagline: "Built for the long run",
  },
};

const sk: Content = {
  nav: { services: "Služby", process: "Postup", work: "Projekty", industries: "Odvetvia", about: "O nás", insights: "Blog", start: "Začať projekt" },
  hero: {
    badge: "Softvérové inžinierstvo a digitálna transformácia",
    tagline: "Prestavujeme systémy, na ktorých vaša firma denne beží.",
    sub: "Etablované firmy nás oslovujú, keď treba zmodernizovať staršie platformy, dodať SaaS produkty a postaviť mobilný aj webový vývoj na základoch, ktoré vydržia. Stratégia, architektúra a dodanie — jeden tím, ktorý za výsledok ručí.",
    primary: "Dohodnúť si úvodný hovor",
    secondary: "Pozrieť projekty",
    scrollHint: "Skrolujte a vstúpte",
    screenTag: "Aktívny projekt",
    screenTitle: "Konzola projektu",
  },
  services: {
    title: "Šesť disciplín, jeden dodávkový tím",
    sub: "Nie sme trhovisko freelancerov. Za každým projektom stojí ten istý tím, prechádza rovnakou architektonickou revíziou a nasadzuje sa podľa rovnakého procesu.",
    items: [
      { id: "S/01", title: "Digitálna transformácia", body: "Staršie platformy prestavujeme po častiach, za plnej prevádzky firmy. Žiadne rizikové migrácie zo dňa na deň.", tags: ["Analýza", "Prestavba", "Migrácia dát"] },
      { id: "S/02", title: "Softvér na mieru", body: "Firemné systémy postavené okolo toho, ako reálne pracujete — nie okolo roadmapy dodávateľa.", tags: ["Architektúra", "Integrácie", "Procesy"] },
      { id: "S/03", title: "SaaS produkty", body: "Multi-tenant produkty od nuly: fakturácia, oprávnenia, administrácia, telemetria aj tie nezáživné časti, ktoré rozhodujú o tom, či škálujete.", tags: ["Multi-tenancy", "Fakturácia", "Analytika"] },
      { id: "S/04", title: "Mobilný vývoj", body: "iOS, Android a cross-platform aplikácie s offline režimom, automatizovaným vydávaním a prevádzkou v app storoch.", tags: ["iOS", "Android", "React Native"] },
      { id: "S/05", title: "Webové platformy", body: "Weby, portály a e-shopy navrhnuté na výkon a prístupnosť — nielen na deň spustenia.", tags: ["Next.js", "Headless CMS", "Commerce"] },
      { id: "S/06", title: "Cloud a platforma", body: "Infraštruktúra ako kód, CI/CD, monitoring a kontrola nákladov — aby nasadzovanie prestalo byť udalosťou.", tags: ["AWS", "Kubernetes", "Terraform"] },
    ],
  },
  process: {
    title: "Transformácia stojí na dôkazoch, nie na nadšení",
    sub: "Päť fáz a každá končí niečím, čo si viete overiť: rozhodnutím, funkčným prostredím, nasadeným vydaním.",
    items: [
      { n: "01", title: "Audit", body: "Dva týždne v kóde, dátach a organizačnej štruktúre.", artifact: "Register rizík" },
      { n: "02", title: "Architektúra", body: "Cieľový stav, poradie krokov a kompromisy čierne na bielom.", artifact: "Rozhodnutia" },
      { n: "03", title: "Vývoj", body: "Dvojtýždňové prírastky, zakaždým odprezentované reálnym používateľom.", artifact: "Funkčné vydanie" },
      { n: "04", title: "Spevnenie", body: "Záťaž, bezpečnosť, súlad s reguláciami a nácvik zlyhaní.", artifact: "Dôkazový balík" },
      { n: "05", title: "Odovzdanie", body: "Runbooky, párové programovanie a prechod pohotovosti (on-call) na váš tím.", artifact: "Vlastníctvo" },
    ],
  },
  tech: {
    title: "Nudné technológie, zvolené zámerne",
    sub: "Vyberáme stacky, na ktoré viete nabrať ľudí a ktoré prejdú aj auditom — a každé rozhodnutie zdokumentujeme.",
    groups: [
      { label: "Produkt a web", items: ["TypeScript", "React / Next.js", "Astro", "Dizajnové systémy", "Prístupnosť (WCAG 2.2)"] },
      { label: "Backend a dáta", items: ["Go, Python, .NET", "PostgreSQL, ClickHouse", "Kafka, event sourcing", "GraphQL a REST", "Dátový sklad a ETL"] },
      { label: "Mobil", items: ["Swift / SwiftUI", "Kotlin / Compose", "React Native", "Offline-first synchronizácia", "Automatizácia vydávania"] },
      { label: "Platforma", items: ["AWS, Azure, GCP", "Kubernetes, Terraform", "GitHub Actions", "OpenTelemetry, Grafana", "Nástroje pre SOC 2"] },
    ],
  },
  work: {
    eyebrow: "Vybrané projekty",
    all: "Čítať celé prípadové štúdie",
    title: "V ich vlastných číslach",
    note: "Ilustratívne prípadové štúdie pre tento návrh — nahradíte ich skutočnými klientmi a číslami.",
    sub: "",
    items: [
      { tag: "Bankovníctvo", kind: "Prestavba jadra", duration: "18 mesiacov", title: "22-ročné jadro banky sme zmigrovali bez jediného plánovaného výpadku", body: "Monolitické jadro sme rozdelili na doménové služby a v nočných dávkach presunuli 4,1 mil. záznamov klientov. Staré a nové riešenie bežali paralelne jedenásť týždňov, až potom prišlo finálne prepnutie.", challenge: "Jadro nazbieralo 22 rokov nezdokumentovaného správania a nočná dávka sa už do noci nezmestila. Každý predchádzajúci pokus bol naplánovaný ako jeden cutover víkend — a každý bol zrušený.", approach: ["Najprv sme čítali kód a stopovali dáta, až potom navrhovali: šesť týždňov auditu dalo mapu závislostí a register rízík, s ktorým vedelo vedenie pracovať.", "Monolit sme krájali po doménových hraniciach, počnúc miestami s najmenšou regulatórnou váhou.", "Staré a nové bežalo paralelne jedenásť týždňov, s nočnou rekonciliáciou oboch účtovných kníh, kým bol rozdiel stabilne nulový.", "4,1 milióna záznamov klientov sme presúvali v nočných dávkach — každú vratnú až do nasledujúceho rána."], outcome: "Finálne prepnutie nezhaslo systém ani na minútu plánovaného výpadku. Frekvencia vydaní stúpla z dvanástich na tridsaťjeden týždenne a náklady na infraštruktúru klesli o 71 % po odstavení starého prostredia.", stack: "Go · PostgreSQL · Kafka · Kubernetes · AWS", stats: [ { value: "0", label: "Hodín plánovaného výpadku" }, { value: "-71%", label: "Náklady na infraštruktúru" }, { value: "4,1M", label: "Presunutých záznamov" }, { value: "12→31", label: "Vydaní za týždeň" } ] },
      { tag: "Logistika", kind: "SaaS produkt", duration: "9 mesiacov", title: "Dispečerský produkt od nuly po 40 firemných zákazníkov", body: "Multi-tenant smerovanie a telemetria s hardvérovými integráciami naprieč 6 000 vozidlami — plus fakturačná vrstva a vrstva oprávnení, vďaka ktorej mohol obchod cieliť na väčších klientov.", challenge: "Klient predával dispečerský softvér prevádzkam s jedným depom a nevedel sa posunúť vyššie. Každý firemný obchod zastal na tom istom: izolácia tenantov, fakturácia za používateľa a auditná stopa, ktorú nikto nepostavil.", approach: ["Multi-tenancy sme navrhli priamo do dátovej vrstvy ešte pred akákoľvek funkcionalitou — dodatočné dorábanie je presne to, čo zabilo predchádzajúci pokus.", "Fakturáciu a oprávnenia sme postavili ako súčasť produktu, nie ako obal okolo platobnej brány.", "Integrovali sme tri generácie palubného hardvéru naprieč 6 000 vozidlami, z ktorých ani jedna nehovorila rovnakým protokolom.", "Telemetriu trás a prestojov sme dali do ClickHouse, aby si prevádzka vedela odpovedať na otázky o nákladoch na kilometer sama."], outcome: "Štyridsať firemných zákazníkov v prvom roku, o 18 % nižšie náklady na palivo naprieč pripojenou flotilou a dostupnosť 99,98 % cez dve sezónne špičky.", stack: "TypeScript · Next.js · ClickHouse · Terraform", stats: [ { value: "40", label: "Firemných zákazníkov" }, { value: "18%", label: "Úspora paliva" }, { value: "6k", label: "Pripojených vozidiel" }, { value: "99,98%", label: "Dostupnosť" } ] },
      { tag: "Zdravotníctvo", kind: "Mobil + platforma", duration: "12 mesiacov", title: "Mobilná aplikácia pre lekárov na dátovej platforme s dôrazom na súlad s reguláciami", body: "Offline-first záznamy pre lekárov v teréne v regiónoch so slabým pripojením — na platforme, ktorá mala plnú auditnú stopu a kontrolu rezidencie dát zabudovanú od prvého dňa.", challenge: "Lekári v teréne pracovali v regiónoch, kde pripojenie vypadávalo na hodiny — a vtedy vtedajšia aplikácia strácala dáta. Platforma za ňou zároveň nevedela preukázať, kde záznamy pacientov fyzicky ležia.", approach: ["Aplikáciu sme urobili offline-first: každý záznam sa zapíše lokálne a synchronizuje, keď sa dá, pričom konflikty vidí lekár — neriešia sa poticho.", "Auditnú stopu sme zabudovali priamo do zápisovej cesty, takže pokrytie je vlastnosťou systému, nie reportom, ktorý si niekto musí spomenúť spustiť.", "Rezidenciu dát sme vynútili na úrovni úložiska, s kľúčmi pre každý región a bez cezregionálnej replikácie.", "iOS aj Android sme postavili nad spoločným doménovým jadrom, s natívnym rozhraním na oboch."], outcome: "Tridsaťštyri minút späť na lekára a deň, plné pokrytie auditom v piatich živých regiónoch a nula nálezov k rezidencii dát v dvoch externých previerkach.", stack: "Swift · Kotlin · Go · PostgreSQL", stats: [ { value: "34 min", label: "Ušetrených na lekára denne" }, { value: "100%", label: "Pokrytie auditnou stopou" }, { value: "5", label: "Regiónov v prevádzke" }, { value: "0", label: "Nálezov k rezidencii dát" } ] },
    ],
  },
  industries: {
    title: "Regulované, prevádzkové, kde chyby veľa stoja",
    items: [
      { n: "01", title: "Finančné služby", body: "Jadrové systémy, platby a auditná stopa, ktorá to doloží." },
      { n: "02", title: "Zdravotníctvo", body: "Klinické procesy a záznamy pod prísnymi pravidlami rezidencie dát." },
      { n: "03", title: "Logistika a mobilita", body: "Vozový park, smerovanie a telemetria v prevádzkovom rozsahu." },
      { n: "04", title: "Energetika", body: "Terénne operácie, meranie a prehľad o aktívach." },
      { n: "05", title: "Retail a e-commerce", body: "Omnichannel platformy, presné zásoby, rýchlosť pokladne." },
      { n: "06", title: "Verejný sektor", body: "Služby pre občanov podľa štandardov prístupnosti a verejného obstarávania." },
    ],
  },
  engage: {
    title: "Tri spôsoby, ako začať",
    items: [
      { title: "Audit", badge: "Fixná cena", cadence: "2–3 týždne", body: "Písomné posúdenie vášho systému skôr, než sa ktokoľvek zaviaže k celému programu.", points: ["Audit architektúry a kódu", "Register rizík a mapa závislostí", "Postupný plán modernizácie", "Odhad nákladov pre vedenie"], cta: "Naplánovať audit" },
      { title: "Dodávkový tím", badge: "Najčastejšie", cadence: "3–18 mesiacov", body: "Kompletný tím — produkt, dizajn, vývoj, platforma — zodpovedný za dodané výsledky.", points: ["4–8 seniorov, jeden vedúci", "Dvojtýždňové prírastky naživo", "Vaše repozitáre, váš cloud, vaše IP", "Výstupné body v každej fáze"], cta: "Poďme sa baviť o tíme", featured: true },
      { title: "Inžinieri vo vašom tíme", badge: "Flexibilné", cadence: "Mesačne", body: "Seniorní špecialisti priamo vo vašich tímoch — na vašej nástenke aj standupoch.", points: ["Menovaný člen alebo vedúci vopred", "30-dňový záväzok, obnovovaný", "Prenos know-how v cene", "Škálovanie po kvartáloch"], cta: "Overiť dostupnosť" },
    ],
  },
  voices: {
    title: "Hlasy klientov",
    items: [
      { quote: "Našli tri spôsoby zlyhania, ktoré náš tím už bral ako normu. Len ten audit sa oplatil za celý program.", name: "A. Reyes", role: "CTO, finančné služby (ukážka)" },
      { quote: "Prvé vydanie za štyri týždne — a bol to reálny softvér v produkcii, nie prototyp.", name: "M. Kaur", role: "VP Product, logistika (ukážka)" },
      { quote: "Naši inžinieri sú dnes lepší než pred rokom. To som teda nečakal, že si kúpim.", name: "J. Lindqvist", role: "Head of Engineering, zdravotníctvo (ukážka)" },
    ],
  },
  team: {
    title: "Stretnete inžinierov, nie obchodníkov",
    all: "Prečítajte si viac o nás",
    people: [
      { initials: "PK", name: "Patrik Klimko", role: "Spoluzakladateľ · Vývoj", body: "Produktové a platformové inžinierstvo — od prvej architektúry po produkčnú prevádzku." },
      { initials: "MK", name: "Matej Kučera", role: "Spoluzakladateľ · Vývoj", body: "Systémy, dáta a dodávka — z chaotickej prevádzky robíme softvér, ktorý drží." },
      { initials: "—", name: "Váš senior lead", role: "Menovaný pre každý projekt", body: "Každý program má jedného zodpovedného vedúceho — od auditu až po odovzdanie." },
      { initials: "+", name: "Malý seniorný tím", role: "Špecialisti na zavolanie", body: "Mobil, cloud a dáta zapojíme presne vtedy, keď si to práca vyžiada." },
    ],
  },
  insights: {
    title: "Poznámky priamo z práce",
    items: [
      { tag: "Architektúra", read: "9 min", title: "Strangler vzory, ktoré prežijú stret s reálnou firmou", body: "Prečo postupné migrácie zlyhávajú skôr na organizačnej štruktúre než na kóde — a ako podľa toho zoradiť kroky." },
      { tag: "Dodávka", read: "6 min", title: "Čo má dvojtýždňový audit reálne priniesť", body: "Štyri výstupy, ktoré odovzdávame, a ako ich klienti používajú na schválenie rozpočtu." },
      { tag: "Platforma", read: "7 min", title: "Ako znížiť cloudové náklady o 70 % bez zmrazenia migrácie", body: "Nezáživný zoznam úloh: right-sizing, životný cyklus dát a zrušenie staging prostredia, ktoré nikto nepoužíva." },
    ],
  },
  faq: {
    title: "Časté otázky",
    items: [
      { q: "Ako začnete na starom systéme, ktorému už nikto úplne nerozumie?", a: "Spravíme dvojtýždňový audit: prečítame kód, vystopujeme dáta a vypočujeme ľudí, ktorí systém držia pri živote. Dostanete mapu závislostí, register rizík a postupný plán — či už s nami budete pokračovať, alebo nie." },
      { q: "Viete pracovať spolu s našimi internými inžiniermi?", a: "Áno — väčšina našej práce je práve takáto, priamo vo vašom tíme. Párujeme, robíme code review a dokumentujeme priebežne, aby po nás váš tím vlastnil systém, nie len výstup." },
      { q: "Koľko taký projekt zvyčajne stojí?", a: "Audit je za fixnú cenu. Dodávkové tímy aj inžinierov vo vašom tíme účtujeme mesačne za konkrétny menovaný tím. Odhad pre vedenie dostanete ešte pred začiatkom vývoja." },
      { q: "Ako riešite súlad s reguláciami a rezidenciu dát?", a: "Rezidencia dát, auditné stopy a riadenie prístupu sú u nás architektonické rozhodnutia z prvého dňa, nie funkcie prilepené tesne pred spustením. Dôkazy, ktoré audítori žiadajú, dokumentujeme priebežne." },
    ],
  },
  contact: {
    eyebrow: "Začnite tu",
    title: "Povedzte nám, čo sa láme.",
    sub: "45-minútový hovor s dvoma inžiniermi — žiaden poplatok, žiadna prezentácia. Odídete s písomným posúdením rozsahu, rizika a podoby prvého vydania.",
    formTitle: "Dohodnúť si úvodný hovor",
    formSub: "Dvaja inžinieri, 45 minút, zdarma.",
    name: "Meno",
    email: "Pracovný e-mail",
    company: "Firma",
    need: "Čo potrebujete",
    needs: ["Modernizácia systému", "SaaS produkt", "Mobilná aplikácia", "Webová platforma", "Posila tímu", "Cloud a DevOps"],
    context: "Kontext",
    contextPh: "Aký je ten systém dnes a čo má platiť o šesť mesiacov?",
    submit: "Požiadať o hovor",
    sent: "Ďakujeme — ozveme sa do dvoch pracovných dní.",
    disclaimer: "Kontaktné údaje sú v tomto návrhu zástupné.",
    channels: [
      { label: "Nová spolupráca", value: "info@etereosystems.com" },
      { label: "Štúdio", value: "Bratislava, Slovensko" },
      { label: "Dostupnosť", value: "Na diaľku · SEČ" },
    ],
  },
  casePage: {
    title: "Tri programy, popísané celé",
    intro: "Každý z nich viedol jeden zodpovedný tím od auditu po odovzdanie. Čísla sú tie, ktoré meral klient.",
    note: "Ilustratívne prípadové štúdie pre tento návrh — nahradíte ich skutočnými klientmi a číslami.",
    back: "Späť na stránku",
    labels: { challenge: "Problém", approach: "Čo sme urobili", outcome: "Ako to dopadlo", stack: "Technológie", duration: "Trvanie", kind: "Spolupráca" },
    cta: { title: "Máte niečo podobné?", body: "Audit za fixnú cenu dá písomný pohľad na váš systém za dva až tri týždne — či už po ňom nasleduje program, alebo nie.", action: "Dohodnúť úvodný hovor" },
  },
  aboutPage: {
    title: "O nás",
    intro: "ETEREO je slovenská softvérová firma postavená na jednom princípe: ľudia, ktorí prácu nacenia, sú tí istí, ktorí ju aj dodajú.",
    story: [
      "ETEREO sme založili v roku 2026, po rokoch strávených v transformačných programoch iných firiem — kde zákazku predal jeden tím, naplánoval druhý a postavil tretí. Kým sa začalo písať, v miestnosti už nezostal nikto, kto bol pri tom, keď padali sľuby.",
      "Preto firmu zámerne držíme malú. Každý projekt obsadzujeme z tej istej seniornej lavičky, prechádza rovnakým architektonickým review a vedie ho jeden človek, ktorý ostáva od prvého auditu po odovzdanie. Keď o druhej v noci niečo spadne, dvíha to ten, kto to postavil.",
      "Pracujeme najmä s etablovanými firmami, ktorých systémy sú nosné — platforma, na ktorej biznis reálne beží, kde prepísať všetko odznova nie je možnosť a neúspešné prepnutie rieši predstavenstvo. Tá podmienka určuje aj metódu: pracovať po častiach, nechať biznis bežať po celý čas a každú fázu ukončiť niečím, čo si viete overiť sami.",
    ],
    factsTitle: "Základné údaje",
    facts: [
      { label: "Založené", value: "2026, Bratislava" },
      { label: "Zakladatelia", value: "Patrik Klimko a Matej Kučera" },
      { label: "Právna forma", value: "ETEREO s.r.o." },
      { label: "Ako pracujeme", value: "Remote-first, stredoeurópsky čas" },
      { label: "Jazyky", value: "Slovensky a anglicky" },
      { label: "Kde pôsobíme", value: "Slovensko, stredná Európa, EÚ" },
    ],
    teamTitle: "S kým naozaj pracujete",
    teamIntro: "Malá seniorná lavička namiesto pyramídy. Inžinierov stretnete hneď na prvom hovore — a oni pri projekte aj ostanú.",
    note: "ETEREO je novozaložená firma. Netvrdíme, koľko projektov máme za sebou ani aký máme zoznam klientov — prípadové štúdie na tejto stránke sú označené ako ilustratívne, kým nezverejníme skutočnú klientsku prácu.",
    back: "Späť na stránku",
    cta: {
      title: "Chcete hovoriť s ľuďmi, ktorí to budú robiť?",
      body: "Iné hovory nerobíme — žiadny account manager, žiadna prezentácia, len inžinieri, ktorí to postavia.",
      action: "Dohodnúť úvodný hovor",
    },
  },
  blogPage: {
    title: "Poznámky priamo z práce",
    intro: "Zápisky z bežiacich programov — čo vydržalo, čo by sme zoradili inak, a tie časti, na ktorých záleží viac, než to znie.",
    note: "Ukážkové príspevky pre tento návrh. Zatiaľ nikam nevedú — nahradíte ich skutočnými článkami, keď začnete publikovať.",
    back: "Späť na stránku",
  },
  footer: {
    blurb: "Softvérové inžinierstvo a digitálna transformácia pre firmy, ktorých systémy už nesú reálnu váhu.",
    cols: [
      { title: "Služby", links: [{ label: "Digitálna transformácia", href: "/#services" }, { label: "Softvér na mieru", href: "/#services" }, { label: "SaaS produkty", href: "/#services" }, { label: "Mobil a web", href: "/#services" }] },
      { title: "Firma", links: [{ label: "Projekty", href: "/projects/" }, { label: "Tím", href: "/about/" }, { label: "Blog", href: "/blog/" }] },
      { title: "Kontakt", links: [{ label: "Začať projekt", href: "/#contact" }, { label: "Modely spolupráce", href: "/#engage" }, { label: "Časté otázky", href: "/#faq" }, { label: "Odvetvia", href: "/#industries" }] },
    ],
    rights: "© 2026 ETEREO s.r.o. Všetky práva vyhradené.",
    tagline: "Postavené na dlhý beh",
  },
};

export const content: Record<Lang, Content> = { en, sk };

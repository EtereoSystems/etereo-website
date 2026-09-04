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
  body: string;
  stack: string;
  stats: { value: string; label: string }[];
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
  nav: { services: string; process: string; work: string; industries: string; team: string; insights: string; start: string };
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
  services: { eyebrow: string; title: string; sub: string; items: Service[] };
  process: { eyebrow: string; title: string; sub: string; items: Phase[] };
  tech: { eyebrow: string; title: string; sub: string; groups: { label: string; items: string[] }[] };
  work: { eyebrow: string; title: string; sub: string; note: string; items: WorkCase[] };
  industries: { eyebrow: string; title: string; items: Industry[] };
  engage: { eyebrow: string; title: string; items: Engagement[] };
  voices: { eyebrow: string; items: { quote: string; name: string; role: string }[] };
  team: { eyebrow: string; title: string; people: Person[] };
  insights: { eyebrow: string; title: string; all: string; items: Article[] };
  faq: { eyebrow: string; title: string; items: Faq[] };
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
  footer: { blurb: string; cols: { title: string; links: string[] }[]; rights: string; tagline: string };
}

const en: Content = {
  nav: { services: "Services", process: "Process", work: "Work", industries: "Industries", team: "Team", insights: "Insights", start: "Start a project" },
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
    eyebrow: "What we build",
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
    eyebrow: "How we work",
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
    eyebrow: "Extensible by design",
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
    title: "Three programmes, in their own numbers",
    note: "Illustrative case studies for this draft — swap in your real client names and metrics.",
    sub: "",
    items: [
      { tag: "Banking", kind: "Core replatform", duration: "18 months", title: "A 22-year-old core banking stack, migrated without a single planned outage", body: "We sliced a monolithic core into domain services and moved 4.1M customer records in nightly batches, running old and new in parallel for eleven weeks before the final cutover.", stack: "Go · PostgreSQL · Kafka · Kubernetes · AWS", stats: [ { value: "0", label: "Planned downtime hours" }, { value: "-71%", label: "Infrastructure cost" }, { value: "4.1M", label: "Records migrated" }, { value: "12→31", label: "Releases per week" } ] },
      { tag: "Logistics", kind: "SaaS product", duration: "9 months", title: "A dispatch product built from zero to 40 enterprise tenants", body: "Multi-tenant routing and telemetry with hardware integrations across 6,000 vehicles, plus the billing and entitlement layer that let sales move upmarket.", stack: "TypeScript · Next.js · ClickHouse · Terraform", stats: [ { value: "40", label: "Enterprise tenants" }, { value: "18%", label: "Fuel cost reduction" }, { value: "6k", label: "Connected vehicles" }, { value: "99.98%", label: "Uptime" } ] },
      { tag: "Healthcare", kind: "Mobile + platform", duration: "12 months", title: "Clinician mobile app on a compliance-first data platform", body: "Offline-first records for field clinicians in low-connectivity regions, on a platform with a full audit trail and data-residency controls built in from day one.", stack: "Swift · Kotlin · Go · PostgreSQL", stats: [ { value: "34 min", label: "Saved per clinician daily" }, { value: "100%", label: "Audit trail coverage" }, { value: "5", label: "Regions live" }, { value: "0", label: "Data-residency findings" } ] },
    ],
  },
  industries: {
    eyebrow: "Where we operate",
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
    eyebrow: "How to engage us",
    title: "Three ways to start",
    items: [
      { title: "Assessment", badge: "Fixed fee", cadence: "2–3 weeks", body: "A written read on your system before anyone commits to a programme.", points: ["Architecture and code audit", "Risk register and dependency map", "Sequenced modernisation plan", "Board-ready cost estimate"], cta: "Scope an assessment" },
      { title: "Delivery squad", badge: "Most common", cadence: "3–18 months", body: "A full team — product, design, engineering, platform — accountable for shipped outcomes.", points: ["4–8 senior people, one lead", "Two-week increments, demoed live", "Your repos, your cloud, your IP", "Exit points at every phase"], cta: "Talk about a squad", featured: true },
      { title: "Embedded engineers", badge: "Flexible", cadence: "Rolling monthly", body: "Senior specialists inside your existing teams, on your board and your standups.", points: ["Staff or lead named up front", "30-day rolling commitment", "Knowledge transfer built in", "Scale up or down quarterly"], cta: "Check availability" },
    ],
  },
  voices: {
    eyebrow: "Client voices",
    items: [
      { quote: "They found three failure modes our own team had normalised. The audit alone was worth the programme.", name: "A. Reyes", role: "CTO, financial services (placeholder)" },
      { quote: "First release in four weeks, and it was real software in production — not a prototype.", name: "M. Kaur", role: "VP Product, logistics (placeholder)" },
      { quote: "Our engineers are better than they were a year ago. That was the part I did not expect to buy.", name: "J. Lindqvist", role: "Head of Engineering, health (placeholder)" },
    ],
  },
  team: {
    eyebrow: "The people accountable",
    title: "You meet the engineers, not the sales team",
    people: [
      { initials: "PK", name: "Patrik Klimko", role: "Co-founder · Engineering", body: "Product and platform engineering, from first architecture to production run." },
      { initials: "MK", name: "Matej Kučera", role: "Co-founder · Engineering", body: "Systems, data and delivery — turning messy operations into software that holds." },
      { initials: "—", name: "Your senior lead", role: "Named per engagement", body: "Every programme gets one accountable lead who stays from audit to hand-over." },
      { initials: "+", name: "A small senior bench", role: "Specialists on call", body: "Mobile, cloud and data specialists pulled in exactly when the work needs them." },
    ],
  },
  insights: {
    eyebrow: "Insights",
    title: "Notes from inside the work",
    all: "All articles",
    items: [
      { tag: "Architecture", read: "9 min", title: "Strangler patterns that survive contact with a real business", body: "Why incremental cutovers fail on the org chart before they fail on the code — and how to sequence around it." },
      { tag: "Delivery", read: "6 min", title: "What a two-week audit should actually produce", body: "The four artefacts we hand over, and how clients use them to get budget approved." },
      { tag: "Platform", read: "7 min", title: "Cutting cloud spend 70% without a migration freeze", body: "The unglamorous checklist: right-sizing, data lifecycle, and killing the staging estate nobody uses." },
    ],
  },
  faq: {
    eyebrow: "Questions we always get",
    title: "",
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
      { label: "New business", value: "hello@etereo.sk" },
      { label: "Studio", value: "Bratislava, Slovakia" },
      { label: "Hours", value: "Remote-first · CET" },
    ],
  },
  footer: {
    blurb: "Software engineering and digital transformation for companies whose systems already carry real weight.",
    cols: [
      { title: "Services", links: ["Digital transformation", "Custom software", "SaaS products", "Mobile & web"] },
      { title: "Company", links: ["Work", "Team", "Insights", "Careers"] },
      { title: "Contact", links: ["Start a project", "Engagement models", "FAQ", "Industries"] },
    ],
    rights: "© 2026 ETEREO s.r.o. All rights reserved.",
    tagline: "Built for the long run",
  },
};

const sk: Content = {
  nav: { services: "Služby", process: "Postup", work: "Projekty", industries: "Odvetvia", team: "Tím", insights: "Blog", start: "Začať projekt" },
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
    eyebrow: "Čo staviame",
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
    eyebrow: "Ako pracujeme",
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
    eyebrow: "Rozšíriteľné od návrhu",
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
    title: "Tri programy, v ich vlastných číslach",
    note: "Ilustratívne prípadové štúdie pre tento návrh — nahradíte ich skutočnými klientmi a číslami.",
    sub: "",
    items: [
      { tag: "Bankovníctvo", kind: "Prestavba jadra", duration: "18 mesiacov", title: "22-ročné jadro banky sme zmigrovali bez jediného plánovaného výpadku", body: "Monolitické jadro sme rozdelili na doménové služby a v nočných dávkach presunuli 4,1 mil. záznamov klientov. Staré a nové riešenie bežali paralelne jedenásť týždňov, až potom prišlo finálne prepnutie.", stack: "Go · PostgreSQL · Kafka · Kubernetes · AWS", stats: [ { value: "0", label: "Hodín plánovaného výpadku" }, { value: "-71%", label: "Náklady na infraštruktúru" }, { value: "4,1M", label: "Presunutých záznamov" }, { value: "12→31", label: "Vydaní za týždeň" } ] },
      { tag: "Logistika", kind: "SaaS produkt", duration: "9 mesiacov", title: "Dispečerský produkt od nuly po 40 firemných zákazníkov", body: "Multi-tenant smerovanie a telemetria s hardvérovými integráciami naprieč 6 000 vozidlami — plus fakturačná vrstva a vrstva oprávnení, vďaka ktorej mohol obchod cieliť na väčších klientov.", stack: "TypeScript · Next.js · ClickHouse · Terraform", stats: [ { value: "40", label: "Firemných zákazníkov" }, { value: "18%", label: "Úspora paliva" }, { value: "6k", label: "Pripojených vozidiel" }, { value: "99,98%", label: "Dostupnosť" } ] },
      { tag: "Zdravotníctvo", kind: "Mobil + platforma", duration: "12 mesiacov", title: "Mobilná aplikácia pre lekárov na dátovej platforme s dôrazom na súlad s reguláciami", body: "Offline-first záznamy pre lekárov v teréne v regiónoch so slabým pripojením — na platforme, ktorá mala plnú auditnú stopu a kontrolu rezidencie dát zabudovanú od prvého dňa.", stack: "Swift · Kotlin · Go · PostgreSQL", stats: [ { value: "34 min", label: "Ušetrených na lekára denne" }, { value: "100%", label: "Pokrytie auditnou stopou" }, { value: "5", label: "Regiónov v prevádzke" }, { value: "0", label: "Nálezov k rezidencii dát" } ] },
    ],
  },
  industries: {
    eyebrow: "Kde pôsobíme",
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
    eyebrow: "Ako s nami začať",
    title: "Tri spôsoby, ako začať",
    items: [
      { title: "Audit", badge: "Fixná cena", cadence: "2–3 týždne", body: "Písomné posúdenie vášho systému skôr, než sa ktokoľvek zaviaže k celému programu.", points: ["Audit architektúry a kódu", "Register rizík a mapa závislostí", "Postupný plán modernizácie", "Odhad nákladov pre vedenie"], cta: "Naplánovať audit" },
      { title: "Dodávkový tím", badge: "Najčastejšie", cadence: "3–18 mesiacov", body: "Kompletný tím — produkt, dizajn, vývoj, platforma — zodpovedný za dodané výsledky.", points: ["4–8 seniorov, jeden vedúci", "Dvojtýždňové prírastky naživo", "Vaše repozitáre, váš cloud, vaše IP", "Výstupné body v každej fáze"], cta: "Poďme sa baviť o tíme", featured: true },
      { title: "Inžinieri vo vašom tíme", badge: "Flexibilné", cadence: "Mesačne", body: "Seniorní špecialisti priamo vo vašich tímoch — na vašej nástenke aj standupoch.", points: ["Menovaný člen alebo vedúci vopred", "30-dňový záväzok, obnovovaný", "Prenos know-how v cene", "Škálovanie po kvartáloch"], cta: "Overiť dostupnosť" },
    ],
  },
  voices: {
    eyebrow: "Hlasy klientov",
    items: [
      { quote: "Našli tri spôsoby zlyhania, ktoré náš tím už bral ako normu. Len ten audit sa oplatil za celý program.", name: "A. Reyes", role: "CTO, finančné služby (ukážka)" },
      { quote: "Prvé vydanie za štyri týždne — a bol to reálny softvér v produkcii, nie prototyp.", name: "M. Kaur", role: "VP Product, logistika (ukážka)" },
      { quote: "Naši inžinieri sú dnes lepší než pred rokom. To som teda nečakal, že si kúpim.", name: "J. Lindqvist", role: "Head of Engineering, zdravotníctvo (ukážka)" },
    ],
  },
  team: {
    eyebrow: "Ľudia, ktorí za tým stoja",
    title: "Stretnete inžinierov, nie obchodníkov",
    people: [
      { initials: "PK", name: "Patrik Klimko", role: "Spoluzakladateľ · Vývoj", body: "Produktové a platformové inžinierstvo — od prvej architektúry po produkčnú prevádzku." },
      { initials: "MK", name: "Matej Kučera", role: "Spoluzakladateľ · Vývoj", body: "Systémy, dáta a dodávka — z chaotickej prevádzky robíme softvér, ktorý drží." },
      { initials: "—", name: "Váš senior lead", role: "Menovaný pre každý projekt", body: "Každý program má jedného zodpovedného vedúceho — od auditu až po odovzdanie." },
      { initials: "+", name: "Malý seniorný tím", role: "Špecialisti na zavolanie", body: "Mobil, cloud a dáta zapojíme presne vtedy, keď si to práca vyžiada." },
    ],
  },
  insights: {
    eyebrow: "Blog",
    title: "Poznámky priamo z práce",
    all: "Všetky články",
    items: [
      { tag: "Architektúra", read: "9 min", title: "Strangler vzory, ktoré prežijú stret s reálnou firmou", body: "Prečo postupné migrácie zlyhávajú skôr na organizačnej štruktúre než na kóde — a ako podľa toho zoradiť kroky." },
      { tag: "Dodávka", read: "6 min", title: "Čo má dvojtýždňový audit reálne priniesť", body: "Štyri výstupy, ktoré odovzdávame, a ako ich klienti používajú na schválenie rozpočtu." },
      { tag: "Platforma", read: "7 min", title: "Ako znížiť cloudové náklady o 70 % bez zmrazenia migrácie", body: "Nezáživný zoznam úloh: right-sizing, životný cyklus dát a zrušenie staging prostredia, ktoré nikto nepoužíva." },
    ],
  },
  faq: {
    eyebrow: "Časté otázky",
    title: "",
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
      { label: "Nová spolupráca", value: "hello@etereo.sk" },
      { label: "Štúdio", value: "Bratislava, Slovensko" },
      { label: "Dostupnosť", value: "Na diaľku · SEČ" },
    ],
  },
  footer: {
    blurb: "Softvérové inžinierstvo a digitálna transformácia pre firmy, ktorých systémy už nesú reálnu váhu.",
    cols: [
      { title: "Služby", links: ["Digitálna transformácia", "Softvér na mieru", "SaaS produkty", "Mobil a web"] },
      { title: "Firma", links: ["Projekty", "Tím", "Blog", "Kariéra"] },
      { title: "Kontakt", links: ["Začať projekt", "Modely spolupráce", "Časté otázky", "Odvetvia"] },
    ],
    rights: "© 2026 ETEREO s.r.o. Všetky práva vyhradené.",
    tagline: "Postavené na dlhý beh",
  },
};

export const content: Record<Lang, Content> = { en, sk };

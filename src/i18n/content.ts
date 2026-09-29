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
  cta: { title: string; body: string; action: string; work: string };
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
  slug: string;
  date: string;
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
      { slug: "custom-software-for-legal", date: "2026-09-29", tag: "Legal", read: "8 min", title: "Custom software for law firms and legal teams", body: "A law firm runs on matters, documents and deadlines, not on a generic project board. Here is what legal software has to get right — and why a short assessment beats a long feature list." },
      { slug: "adding-ai-to-your-product", date: "2026-09-27", tag: "AI", read: "9 min", title: "Adding AI to your product: where it helps and where it hurts", body: "The pressure to add AI is real, and so is the urge to bolt a chatbot onto everything. Here is how to add it where it earns its place and avoid where it hurts." },
      { slug: "custom-software-for-real-estate", date: "2026-09-26", tag: "Real estate", read: "8 min", title: "Custom software for real estate and property management", body: "Off-the-shelf property tools get you started fast — then the workarounds pile up around leases, payments and portals. Here is how to tell when custom software is the cheaper answer." },
      { slug: "staff-augmentation-vs-dedicated-team", date: "2026-09-25", tag: "Teams", read: "8 min", title: "Staff augmentation vs a dedicated team: which model fits?", body: "Three engagement models get sold as interchangeable. They are not. The question that separates them is simple: when delivery slips, whose problem is it?" },
      { slug: "custom-software-for-logistics-and-transport", date: "2026-09-24", tag: "Logistics", read: "9 min", title: "Custom software for logistics and transport companies", body: "Most operators do not lack logistics software — they lack software that fits the twenty percent of their operation that does not look like everyone else's. Here is how to find that line before writing code." },
      { slug: "how-to-build-a-booking-system", date: "2026-09-23", tag: "Systems", read: "8 min", title: "How to build a booking or scheduling system that never double-books", body: "A calendar with a booking button looks trivial. The double-booking that costs you a customer is where the real engineering lives. When to build custom, and how to get availability right." },
      { slug: "ai-agents-for-business", date: "2026-09-21", tag: "AI", read: "9 min", title: "AI agents for business: what they are and where they fit", body: "An AI agent is a model that can take steps and use tools, not just answer. That is powerful and, in 2026, still immature — which is exactly why it needs engineering discipline." },
      { slug: "how-to-build-a-marketplace-platform", date: "2026-09-20", tag: "Product", read: "9 min", title: "How to build a marketplace platform", body: "Anyone can build a marketplace where buyers meet sellers. The question that decides whether it lives or dies is whether either side shows up first." },
      { slug: "from-spreadsheets-to-custom-software", date: "2026-09-19", tag: "Automation", read: "8 min", title: "From spreadsheets to software: when Excel stops being enough", body: "Excel is one of the best tools ever made, right up to the point where it is running something it should not. How to tell you have crossed that line, and what to build instead." },
      { slug: "custom-software-for-automotive", date: "2026-09-18", tag: "Automotive", read: "9 min", title: "Custom software for the automotive industry", body: "A part on the line is never just a part — it carries a history a recall may one day demand. Why automotive software lives or dies on traceability, and where custom pays off." },
      { slug: "how-to-build-a-customer-portal", date: "2026-09-16", tag: "Systems", read: "8 min", title: "How to build a customer portal that reduces support, not increases it", body: "Give customers a portal that answers their questions before they call, and support drops. Give them a slow, empty login, and it becomes another thing to complain about. Here's the difference." },
      { slug: "predictive-analytics-for-business", date: "2026-09-14", tag: "AI", read: "8 min", title: "Predictive analytics for business: forecasting with your own data", body: "Forecasting from your own data is one of the most useful things software can do — and one of the easiest to oversell. The value is in acting on the number, honestly." },
      { slug: "custom-software-for-construction", date: "2026-09-13", tag: "Construction", read: "9 min", title: "Custom software for construction companies", body: "Generic project management software was built for offices, and construction does not happen in an office. Here is where the field-versus-office gap costs money, and what custom software fixes." },
      { slug: "custom-software-for-manufacturing", date: "2026-09-12", tag: "Manufacturing", read: "9 min", title: "Custom software for manufacturing: MES, planning, and the shop floor", body: "The shop floor is not an office, and software built as if it were fails there quietly. Here is where custom manufacturing software earns its cost — and where it does not." },
      { slug: "custom-software-for-recruitment-and-staffing", date: "2026-09-11", tag: "Recruitment", read: "8 min", title: "Custom software for recruitment and staffing agencies", body: "A recruitment agency has two customers at once and a process no generic ATS quite fits. Here is where custom software earns its keep — and why to start with an assessment, not a demo." },
      { slug: "how-to-build-a-custom-erp", date: "2026-09-09", tag: "Systems", read: "9 min", title: "How to build a custom ERP system (without betting the company)", body: "ERP projects are famous for going over budget and taking down the businesses they were meant to help. How to get the benefits of a system that fits — without the big-bang risk." },
      { slug: "custom-software-for-pharma-and-life-sciences", date: "2026-09-07", tag: "Pharma", read: "9 min", title: "Custom software for pharma and life sciences", body: "In regulated life sciences, the audit trail is not a feature — it is the point. What changes when your software has to be validated, and how to build for it deliberately." },
      { slug: "how-to-build-an-inventory-management-system", date: "2026-09-06", tag: "Systems", read: "8 min", title: "How to build an inventory management system", body: "The reason a generic inventory tool breaks is never the counting. It is the one workflow your business runs that the tool was never built to model." },
      { slug: "how-to-outsource-software-development", date: "2026-09-05", tag: "Outsourcing", read: "9 min", title: "How to outsource software development without regretting it", body: "You have decided to outsource. The difference between a good result and an expensive lesson is set before the first line of code — in scope, partner choice, and who owns the knowledge as it is built." },
      { slug: "custom-software-for-travel-and-tourism", date: "2026-09-03", tag: "Travel", read: "8 min", title: "Custom software for travel and tourism", body: "Bookings look simple until availability, suppliers, deposits and peak season collide. Here is where off-the-shelf travel tools hit a ceiling and custom software starts to pay." },
      { slug: "offline-first-and-on-premise", date: "2026-09-02", tag: "Engineering", read: "8 min", title: "Offline-first and on-premise: software for disconnected, regulated worlds", body: "Cloud-by-default has a blind spot: the field, the factory floor, the classified network, the regulator. What it takes to build software — and AI — that runs where the data must stay." },
      { slug: "computer-vision-for-business", date: "2026-08-31", tag: "AI", read: "8 min", title: "Computer vision for business: practical uses beyond the hype", body: "Computer vision works best on one narrow, measurable task in a controlled setting. The demo is easy; the hard, unglamorous work is the data and the edge cases." },
      { slug: "custom-software-for-insurance", date: "2026-08-29", tag: "Insurance", read: "9 min", title: "Custom software for insurance companies", body: "Insurance software lives and dies on correctness and auditability, and the core system is usually old and load-bearing. Here is how to modernize around it without a risky rewrite." },
      { slug: "custom-software-for-nonprofits", date: "2026-08-28", tag: "Nonprofit", read: "8 min", title: "Custom software for nonprofits and associations", body: "Most nonprofits should not build custom software — and the ones that should need to know exactly why before they spend a grant on it." },
      { slug: "custom-software-for-healthcare", date: "2026-08-27", tag: "Healthcare", read: "9 min", title: "Custom software for healthcare: compliance, data, and safety", body: "In healthcare software you cannot simply ship and iterate loosely. Here is what the regulation, the data, and the safety bar actually demand of a build — and why slower is correct." },
      { slug: "custom-software-for-professional-services", date: "2026-08-24", tag: "Professional services", read: "8 min", title: "Custom software for professional services firms", body: "When your people are the product, the software that runs the firm is not overhead — it decides whether a good month is profitable. Where off-the-shelf PSA stops fitting." },
      { slug: "in-house-vs-outsourcing-software-development", date: "2026-08-22", tag: "Sourcing", read: "8 min", title: "In-house vs outsourcing software development", body: "Hiring an in-house team is the right answer more often than outsourcing marketing admits — and the wrong one more often than founders realise. Here is how to tell which is which." },
      { slug: "how-to-build-an-e-commerce-platform", date: "2026-08-21", tag: "E-commerce", read: "9 min", title: "How to build an e-commerce platform", body: "If you have outgrown your platform, building looks tempting. Most companies should stay — and the ones that leave should know exactly what they are giving up." },
      { slug: "how-to-build-an-internal-tool", date: "2026-08-19", tag: "Systems", read: "8 min", title: "How to build an internal tool your team will actually use", body: "The spreadsheet everyone hates but no one can kill is a business risk with a deadline. How to build the internal tool that replaces it — and why simple beats impressive." },
      { slug: "how-to-choose-an-ai-use-case", date: "2026-08-17", tag: "AI", read: "8 min", title: "How to choose an AI use case that actually pays off", body: "The hard part of AI is not the model — it is choosing the right first problem. A practical way to score candidate use cases by value and feasibility, and why your most visible problem is usually the wrong place to start." },
      { slug: "how-to-build-a-business-dashboard", date: "2026-08-15", tag: "Analytics", read: "8 min", title: "How to build a business dashboard that gets used", body: "Most dashboards get admired for a week and then ignored. The fix is not a nicer chart library — it is designing around the decisions someone actually has to make." },
      { slug: "how-to-build-a-subscription-billing-system", date: "2026-08-14", tag: "SaaS", read: "8 min", title: "How to build a subscription billing system", body: "Billing looks like a form and a payment. It is actually dozens of edge cases where money is unforgiving — and most of them are already solved for you." },
      { slug: "custom-software-for-fintech", date: "2026-08-12", tag: "Fintech", read: "9 min", title: "Custom software for fintech and financial services", body: "Money is unforgiving, and financial software that treats a transaction like an ordinary database write eventually loses someone's money. Here is what building it correctly actually demands." },
      { slug: "custom-software-for-education", date: "2026-08-08", tag: "Education", read: "8 min", title: "Custom software for education and e-learning", body: "A capable LMS covers more than most schools and training providers expect. Here is how to tell when you should configure one and when custom software genuinely pays off." },
      { slug: "how-to-build-a-learning-management-system", date: "2026-08-07", tag: "Systems", read: "8 min", title: "How to build a learning management system (LMS)", body: "An LMS looks like courses and a progress bar. Underneath are content standards, accessibility duties, and reporting — most of which a mature platform already does." },
      { slug: "how-to-build-a-custom-crm", date: "2026-08-05", tag: "Systems", read: "9 min", title: "How to build a custom CRM (and when you actually should)", body: "Most companies should not build a custom CRM — and a few absolutely should. How to tell which you are, and how to build one your salespeople actually use instead of avoid." },
      { slug: "custom-software-for-telecom", date: "2026-08-04", tag: "Telecom", read: "9 min", title: "Custom software for telecom companies", body: "Usage-based billing is unforgiving, the core is legacy, and scale is not optional. Here is where custom telecom software pays — and how to modernize around a stack you cannot simply replace." },
      { slug: "custom-software-for-wholesale-and-distribution", date: "2026-08-01", tag: "Distribution", read: "8 min", title: "Custom software for wholesale and distribution", body: "In distribution the margin is thin enough that the software either makes you money or quietly loses it. Where custom pays off around a standard ERP, and where it does not." },
      { slug: "custom-software-for-retail-and-ecommerce", date: "2026-07-31", tag: "Retail", read: "8 min", title: "Custom software for retail and e-commerce", body: "Off-the-shelf platforms take a retailer a long way, then hit a ceiling. Here is where that ceiling sits, why order management is the real backbone, and how to extend before you replace." },
      { slug: "saas-on-a-legacy-core", date: "2026-07-29", tag: "Integration", read: "9 min", title: "Shipping a SaaS product on top of a legacy core", body: "The core system that runs the business is rarely the one you get to replace. The integration patterns for building modern product on top of it — and the trap to avoid." },
      { slug: "custom-software-for-hospitality-and-restaurants", date: "2026-07-25", tag: "Hospitality", read: "8 min", title: "Custom software for hospitality and restaurants", body: "Most hospitality businesses do not need custom software everywhere — they need it in the few places where the standard tools force a workaround into every shift." },
      { slug: "how-to-build-a-helpdesk-tool", date: "2026-07-24", tag: "Systems", read: "8 min", title: "How to build a helpdesk and customer support tool", body: "Support outgrows a shared inbox on the org chart before it outgrows the tooling. Here is how to decide what to build, what to buy, and where to start narrow." },
      { slug: "how-to-build-an-mvp", date: "2026-07-22", tag: "Product", read: "8 min", title: "How to build an MVP that doesn't waste your budget", body: "A real MVP is a question, not a product. Here's how to find the one assumption to test, build the smallest thing that tests it, and avoid the trap that ruins most MVPs." },
      { slug: "how-to-choose-a-technology-stack", date: "2026-07-18", tag: "Strategy", read: "8 min", title: "How to choose a technology stack for custom software", body: "Buyers agonize over which framework their software should be built in. It is usually the wrong worry — here is what actually decides whether a stack serves you for a decade." },
      { slug: "how-to-build-a-quoting-tool", date: "2026-07-17", tag: "Systems", read: "8 min", title: "How to build a quoting and CPQ tool", body: "Complex pricing is exactly what breaks generic tools and spreadsheets. Here is what a quoting tool has to get right, and where to start when everything hurts." },
      { slug: "fractional-cto-when-you-need-one", date: "2026-07-15", tag: "Leadership", read: "8 min", title: "What a fractional CTO does, and when you need one", body: "You need someone senior who owns the technical decisions, but not a full-time salary. What a fractional CTO does week to week, and when the arrangement stops making sense." },
      { slug: "custom-software-for-agriculture", date: "2026-07-11", tag: "Agritech", read: "8 min", title: "Custom software for agriculture and agritech", body: "Agriculture runs on seasons, weak signal, and paperwork nobody enjoys. Software for it succeeds when it fits those constraints instead of fighting them." },
      { slug: "how-to-build-a-saas-product", date: "2026-07-08", tag: "SaaS", read: "10 min", title: "How to build a SaaS product from scratch", body: "Building a SaaS is less about the feature you're excited about and more about the invisible machinery around it — billing, tenancy, onboarding. Here's how to build one that lasts." },
      { slug: "custom-software-for-energy-and-utilities", date: "2026-07-04", tag: "Energy", read: "9 min", title: "Custom software for energy and utilities", body: "Energy software fails in ways ordinary business software never does: the data never stops, the rules change by decree, and a wrong number can be a safety event, not a rounding error." },
      { slug: "cloud-vs-on-premise", date: "2026-07-03", tag: "Cloud", read: "8 min", title: "Cloud vs on-premise: which is right for your software?", body: "Neither answer is universally right. The decision turns on data sensitivity, load shape, compliance, and the team you actually have — not on which side is fashionable." },
      { slug: "ai-on-your-own-data-rag-explained", date: "2026-07-01", tag: "AI", read: "8 min", title: "AI on your own data: RAG explained for decision-makers", body: "You want AI to answer over your private company data, securely. RAG is how that is done without pasting secrets into a public tool or retraining a model — explained for a decision-maker, not an engineer." },
      { slug: "how-to-build-a-field-service-management-app", date: "2026-06-30", tag: "Systems", read: "8 min", title: "How to build a field service management app", body: "The office wants scheduling and visibility; the technician wants an app that works with no signal and does not slow them down. Both realities have to be designed for." },
      { slug: "how-to-manage-a-remote-development-team", date: "2026-06-27", tag: "Delivery", read: "8 min", title: "How to manage a remote or nearshore development team", body: "The failure mode of remote teams is not laziness — it is a manager measuring the wrong thing. How to run an external team by outcomes, with a demo every sprint as the real status report." },
      { slug: "how-to-choose-a-cloud-provider", date: "2026-06-26", tag: "Cloud", read: "8 min", title: "How to choose a cloud provider: AWS vs Azure vs Google Cloud", body: "The provider matters less than the reasons people usually pick one. Decide on fit — skills, existing stack, specific services, data residency — not fashion." },
      { slug: "rewrite-replatform-or-refactor", date: "2026-06-24", tag: "Strategy", read: "8 min", title: "Rewrite, replatform, or refactor? Choosing a modernization strategy", body: "Three modernization strategies, three different risk profiles. A framework for matching the approach to the system — and the true cost of reaching for a rewrite too early." },
      { slug: "is-your-data-ready-for-ai", date: "2026-06-20", tag: "AI", read: "8 min", title: "Is your data ready for AI?", body: "You do not need perfect data to start with AI, but you do need to know its state. What readiness means in practice, the hidden work of getting there, and why the honest assessment comes before the model." },
      { slug: "fixed-price-vs-time-and-materials", date: "2026-06-17", tag: "Pricing", read: "8 min", title: "Fixed price vs time & materials: which contract actually protects you?", body: "Fixed price sounds like the safe choice — and it quietly pushes you toward the wrong software. How the main pricing models really work, and when each one protects you." },
      { slug: "how-to-build-a-document-management-system", date: "2026-06-13", tag: "Systems", read: "8 min", title: "How to build a document management system", body: "The problem is rarely storage — it is finding the right version of the right document and proving who did what. Build for retrieval and control, not for filing." },
      { slug: "how-to-ensure-software-quality", date: "2026-06-12", tag: "Quality", read: "8 min", title: "How to ensure software quality: testing and QA explained", body: "You do not need to read code to judge whether software is built well. You need to know which layers protect it, what good looks like from the outside, and the questions that separate a serious partner from a hopeful one." },
      { slug: "connecting-your-business-tools-system-integration", date: "2026-06-10", tag: "Integration", read: "8 min", title: "System integration: getting your business tools to talk to each other", body: "Every time a person copies a number from one system into another, you are paying for a missing integration in errors and wasted hours. How to connect your tools without building spaghetti." },
      { slug: "how-to-build-a-workflow-automation-tool", date: "2026-06-06", tag: "Automation", read: "8 min", title: "How to build a workflow automation tool", body: "The tool is the easy part. The hard part is seeing what your approval process actually is — including the exceptions people quietly handle — and fixing it before you cast it in software." },
      { slug: "how-to-choose-a-software-development-company", date: "2026-06-03", tag: "Hiring", read: "10 min", title: "How to choose a software development company: the questions that matter", body: "Picking the wrong software company is one of the most expensive mistakes a business can make. The questions that reveal who can actually deliver — and the red flags that don't." },
      { slug: "web-app-vs-mobile-app-vs-pwa", date: "2026-05-30", tag: "Platforms", read: "8 min", title: "Web app vs mobile app vs PWA: which should you build?", body: "The choice between a native app, a web app and a PWA gets decided by fashion far too often. Start instead from the one thing that actually settles it: how your users reach for the product." },
      { slug: "software-uptime-and-reliability", date: "2026-05-29", tag: "Reliability", read: "8 min", title: "Software uptime and reliability: what it takes to stay online", body: "Every extra nine of reliability costs disproportionately more than the last. The skill is not chasing perfect uptime; it is deciding how much you actually need, and building exactly that." },
      { slug: "cloud-migration-guide-for-business", date: "2026-05-27", tag: "Cloud", read: "9 min", title: "A practical cloud migration guide for established businesses", body: "Moving to the cloud is not automatically cheaper or better. Here is how to decide what to move, in what order, and what actually bites once the bill arrives." },
      { slug: "how-to-build-a-mobile-app-for-your-business", date: "2026-05-23", tag: "Mobile", read: "8 min", title: "How to build a mobile app for your business", body: "You have decided you need a mobile app. Before you commit, the decisions that shape the whole project: native versus cross-platform, the app-store reality, designing for a real phone, and why release day is the start of the work." },
      { slug: "cut-cloud-costs-without-a-freeze", date: "2026-05-20", tag: "Platform", read: "8 min", title: "Cutting cloud costs 40-70% without a migration freeze", body: "Cloud bills quietly grow to two or three times what the workload needs. The practical, incremental checklist for taking a third off — without a migration freeze." },
      { slug: "how-to-write-a-software-brief", date: "2026-05-16", tag: "Delivery", read: "8 min", title: "How to write a software brief that gets you good bids", body: "The brief you send decides the proposals you get back. Over-specify the solution and you invite padded or lowball bids — here is how to write one that earns you serious, comparable offers." },
      { slug: "total-cost-of-ownership-of-software", date: "2026-05-15", tag: "Cost", read: "8 min", title: "The total cost of ownership of custom software", body: "The purchase price of software is the smallest number you will ever pay for it. The bill that decides whether it was a good investment is the one that arrives every month for years." },
      { slug: "nearshore-software-development-in-europe", date: "2026-05-13", tag: "Sourcing", read: "9 min", title: "Nearshore software development in Europe: a buyer's guide", body: "Building software with a team a couple of timezones away — not twelve — is why Central Europe has become the sweet spot for Western companies. What nearshore gets you, and how to do it well." },
      { slug: "how-to-build-an-api-first-platform", date: "2026-05-09", tag: "Platforms", read: "8 min", title: "How to build an API-first platform", body: "When your product has to integrate, be extended, or power web and mobile at once, API-first stops being a buzzword and becomes the architecture. What it actually means, when it is worth it, and the promises you take on the day you publish one." },
      { slug: "how-to-reduce-technical-debt", date: "2026-05-06", tag: "Engineering", read: "8 min", title: "How to reduce technical debt without stopping the roadmap", body: "You cannot see technical debt on a balance sheet, but you feel it every time a small change takes a week. Here is how to reduce it without freezing delivery." },
      { slug: "software-maintenance-and-support-explained", date: "2026-05-02", tag: "Support", read: "8 min", title: "Software maintenance and support: what it costs and why it matters", body: "Most buyers treat launch as the finish line. It is the start of the part that decides whether the software survives — and here is what that part actually costs." },
      { slug: "no-code-vs-custom-software", date: "2026-04-29", tag: "Build vs buy", read: "8 min", title: "No-code vs custom software: when does each one win?", body: "No-code can get you live in a weekend and stuck in a year. Where it genuinely wins, the ceiling it hits, and the smart path that uses no-code to earn the right to build custom." },
      { slug: "how-to-scale-software-after-mvp", date: "2026-04-25", tag: "Scaling", read: "8 min", title: "How to scale software after your MVP", body: "The MVP got you here, but it will not get you there. What breaks first is rarely raw compute — it is the database and the way you work." },
      { slug: "digital-transformation-guide", date: "2026-04-24", tag: "Strategy", read: "9 min", title: "A practical guide to digital transformation", body: "Most digital transformations fail for the same reason: they are run as an IT project instead of a business change. Here is what the term actually means and how to make it real." },
      { slug: "monolith-to-microservices-when-its-worth-it", date: "2026-04-22", tag: "Architecture", read: "9 min", title: "Monolith to microservices: when it's worth it (and when it isn't)", body: "Most teams reach for microservices to fix messy code, and most do not need them. Here is what they actually solve, what they cost, and how to decide honestly." },
      { slug: "how-to-build-a-data-warehouse", date: "2026-04-18", tag: "Data", read: "8 min", title: "How to build a data warehouse and analytics pipeline", body: "When your numbers never match and a report takes three days, the problem is not your dashboards — it is that no one owns the truth. Here is how to build the place that does." },
      { slug: "two-week-software-audit", date: "2026-04-15", tag: "Delivery", read: "7 min", title: "What a two-week software audit should actually deliver", body: "Most audits end in a slide deck nobody acts on. The four concrete artefacts a two-week assessment should hand over — and how clients turn them into approved budget." },
      { slug: "gdpr-and-custom-software", date: "2026-04-11", tag: "Compliance", read: "8 min", title: "GDPR and custom software: building data protection in from day one", body: "GDPR is easiest and cheapest when it shapes the architecture rather than being bolted on. This is engineering guidance, not legal advice." },
      { slug: "how-to-rescue-a-failing-software-project", date: "2026-04-10", tag: "Delivery", read: "8 min", title: "How to rescue a failing software project", body: "Most failing projects were readable months before the deadline they finally missed. Here is how to stop, assess honestly, and get back to shipping something real." },
      { slug: "how-much-does-custom-ai-software-cost", date: "2026-04-08", tag: "AI", read: "9 min", title: "How much does custom AI software cost?", body: "The model is the cheap part. The real bill is data readiness, the un-glamorous software around it, and an inference cost ordinary software never had — here is how to think about it." },
      { slug: "how-to-modernize-a-legacy-database", date: "2026-04-04", tag: "Data", read: "8 min", title: "How to modernize a legacy database", body: "Applications get rewritten every few years; the database underneath them often does not. That is exactly why the old schema is where the real risk hides." },
      { slug: "custom-software-vs-off-the-shelf", date: "2026-04-01", tag: "Build vs buy", read: "9 min", title: "Custom software vs off-the-shelf: should you build or buy?", body: "Off-the-shelf is faster and cheaper to start — until the workarounds, subscriptions, and lock-in add up. A framework for deciding which one your problem actually needs." },
      { slug: "the-european-accessibility-act-and-your-software", date: "2026-03-28", tag: "Accessibility", read: "8 min", title: "The European Accessibility Act and your software: what to know", body: "The European Accessibility Act pulls many digital products and services toward WCAG-level accessibility. This is general information, not legal advice." },
      { slug: "how-to-switch-software-vendors", date: "2026-03-27", tag: "Sourcing", read: "8 min", title: "How to switch software vendors without losing the work", body: "The risk in changing software vendors is almost never the code. It is the knowledge and the access — and both walk out the door the moment the relationship ends badly." },
      { slug: "how-to-automate-a-manual-business-process", date: "2026-03-25", tag: "Automation", read: "8 min", title: "How to automate a manual business process with software", body: "Automation's biggest win is giving your team back the hours they lose to repetitive work — if you automate the right process, and don't just make a broken one run faster." },
      { slug: "how-to-build-a-progressive-web-app", date: "2026-03-21", tag: "Platforms", read: "8 min", title: "How to build a progressive web app (PWA)", body: "A PWA is a website that behaves more like an app: installable, offline-capable, one codebase. It is often the smart middle path — and sometimes the wrong tool. Here is how to tell." },
      { slug: "how-long-does-it-take-to-build-custom-software", date: "2026-03-18", tag: "Timeline", read: "8 min", title: "How long does it take to build custom software?", body: "Weeks, months, or a year — the timeline for custom software is set less by how fast a team codes than by how quickly you can make decisions. Here is what really moves it." },
      { slug: "security-for-custom-software", date: "2026-03-14", tag: "Security", read: "9 min", title: "Security for custom software: building it in, not bolting it on", body: "Most incidents do not come from clever attacks but from missing basics. Security is how you build, not a box you check before launch." },
      { slug: "how-to-plan-a-software-roadmap", date: "2026-03-13", tag: "Strategy", read: "8 min", title: "How to plan a software roadmap", body: "The most confident-looking roadmaps — a dated list of features stretching two years out — are the ones most certain to be wrong. There is a better way to plan." },
      { slug: "ai-automation-for-business-processes", date: "2026-03-11", tag: "AI", read: "8 min", title: "AI automation for business processes: a practical guide", body: "The best targets for AI are high-volume, document-heavy work where the rules are fuzzy. The trap is using AI where a simple rule is correct and cheaper — here is how to tell the difference." },
      { slug: "what-happens-in-a-software-discovery-phase", date: "2026-03-07", tag: "Delivery", read: "8 min", title: "What happens in a software discovery phase", body: "You asked for a build and a partner proposed a paid discovery first. It sounds like a delay. It is the cheapest insurance you will buy on the whole project." },
      { slug: "strangler-fig-legacy-migration", date: "2026-03-04", tag: "Architecture", read: "9 min", title: "Replacing a legacy system without a big-bang rewrite", body: "Why incremental cutovers fail on the org chart before they fail on the code — and how to sequence a replacement so the business keeps running throughout." },
      { slug: "how-to-avoid-scope-creep", date: "2026-02-28", tag: "Delivery", read: "8 min", title: "How to avoid scope creep on a software project", body: "Most scope creep is not a discipline problem — it is a goals problem. Here is how to tell healthy change from creep, and how to build a change process cheap enough that people actually use it." },
      { slug: "how-to-measure-software-roi", date: "2026-02-27", tag: "Strategy", read: "8 min", title: "How to measure the ROI of a software project", body: "You cannot measure the return on a software project after it ships if you never decided, before you built it, what return you were buying. Here is how to decide first." },
      { slug: "how-much-does-it-cost-to-build-an-mvp", date: "2026-02-25", tag: "Cost", read: "8 min", title: "How much does it cost to build an MVP?", body: "Most MVPs cost too much because they aren't minimal. The point of an MVP is to buy a learning, not a product — here's how to scope one that does its job cheaply." },
      { slug: "how-to-budget-for-a-software-project", date: "2026-02-21", tag: "Cost", read: "8 min", title: "How to budget for a software project", body: "A software budget is not a single number you commit to on day one. It is a way of buying certainty in stages — and the parts people leave out are the ones that sink it." },
      { slug: "how-to-build-an-ai-assistant-for-your-business", date: "2026-02-18", tag: "AI", read: "8 min", title: "How to build an AI assistant for your business", body: "A bare chatbot makes things up. A useful assistant is grounded in your own data, knows when to say it does not know, and respects who is allowed to see what — here is how to build one." },
      { slug: "how-much-does-it-cost-to-build-a-mobile-app", date: "2026-02-11", tag: "Cost", read: "9 min", title: "How much does it cost to build a mobile app?", body: "The price of a mobile app is set by a few decisions you make before a line of code is written — native or cross-platform, one platform or two, thin or deep. Here they are." },
      { slug: "proof-of-concept-vs-prototype-vs-mvp", date: "2026-02-07", tag: "Product", read: "8 min", title: "Proof of concept vs prototype vs MVP: what to build first", body: "Proof of concept, prototype, and MVP are not stages of the same thing — they answer different questions. Building the wrong one first is a common, expensive mistake." },
      { slug: "signs-your-business-needs-custom-software", date: "2026-02-04", tag: "Strategy", read: "7 min", title: "7 signs your business has outgrown off-the-shelf software", body: "The moment to build custom software rarely announces itself. It shows up as workarounds, hiring to cover for tools, and a spreadsheet no one dares touch. Seven signals it's time." },
      { slug: "how-much-does-it-cost-to-build-a-web-app", date: "2026-01-28", tag: "Cost", read: "9 min", title: "How much does it cost to build a web app?", body: "A web app can cost fifteen thousand euros or half a million — and the difference is rarely the pretty screens. What actually sets the price, and how to keep it sane." },
      { slug: "how-to-do-technical-due-diligence", date: "2026-01-21", tag: "Strategy", read: "9 min", title: "How to do technical due diligence before you invest or acquire", body: "Before you invest in or acquire a software company, you need to know whether its technology is a foundation or a liability. Here is how to find out — and why the demo will not tell you." },
      { slug: "how-much-does-it-cost-to-build-custom-software", date: "2026-01-14", tag: "Cost", read: "10 min", title: "How much does it cost to build custom software?", body: "\"It depends\" is a true answer and a useless one. Here is what actually drives the cost of custom software, real ballpark ranges, and how to get a number you can defend." },
      { slug: "the-software-development-process-explained", date: "2026-01-07", tag: "Process", read: "9 min", title: "The software development process, explained for non-technical leaders", body: "You don't need to code to tell whether a software project is healthy. A plain-English walk through how custom software really gets built — and the signals that it's going well or badly." },
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
      work: "See the work",
    },
  },
  blogPage: {
    title: "Notes from inside the work",
    intro: "Write-ups from live programmes — what held, what we would sequence differently, and the parts that matter more than they sound like they should.",
    note: "Practical field notes on legacy modernization, delivery, and cost — written from inside live programmes, not from the outside looking in.",
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
      { slug: "custom-software-for-legal", date: "2026-09-29", tag: "Legaltech", read: "8 min", title: "Softvér na mieru pre advokátske kancelárie a právne tímy", body: "Advokátska kancelária beží na spisoch, dokumentoch a lehotách, nie na generickej nástenke úloh. Toto musí právny softvér zvládnuť — a prečo krátke posúdenie poráža dlhý zoznam funkcií." },
      { slug: "adding-ai-to-your-product", date: "2026-09-27", tag: "AI", read: "9 min", title: "Pridávanie AI do produktu: kde pomáha a kde škodí", body: "Tlak pridať AI je reálny — a rovnako aj nutkanie prilepiť chatbota na všetko. Toto je, ako ju pridať tam, kde si zaslúži miesto, a vyhnúť sa tam, kde škodí." },
      { slug: "custom-software-for-real-estate", date: "2026-09-26", tag: "Reality", read: "8 min", title: "Softvér na mieru pre reality a správu nehnuteľností", body: "Krabicové realitné nástroje vás rýchlo naštartujú — potom sa okolo nájmov, platieb a portálov nakopia obchádzky. Tu je návod, ako spoznať, kedy je softvér na mieru lacnejšia odpoveď." },
      { slug: "staff-augmentation-vs-dedicated-team", date: "2026-09-25", tag: "Tímy", read: "8 min", title: "Staff augmentation vs dedikovaný tím: ktorý model vám sadne?", body: "Tri modely spolupráce sa predávajú ako zameniteľné. Nie sú. Otázka, ktorá ich oddeľuje, je jednoduchá: keď dodávka mešká, čí je to problém?" },
      { slug: "custom-software-for-logistics-and-transport", date: "2026-09-24", tag: "Logistika", read: "9 min", title: "Softvér na mieru pre logistiku a dopravu", body: "Väčšine dopravcov nechýba softvér — chýba im softvér, ktorý sadne na tých dvadsať percent prevádzky, čo nevyzerá ako u všetkých ostatných. Tu je návod, ako tú hranicu nájsť ešte pred písaním kódu." },
      { slug: "how-to-build-a-booking-system", date: "2026-09-23", tag: "Systémy", read: "8 min", title: "Ako postaviť rezervačný alebo plánovací systém, ktorý nikdy neduplikuje termín", body: "Kalendár s tlačidlom rezervácie vyzerá triviálne. Dvojitá rezervácia, ktorá vás stojí zákazníka, je tam, kde žije skutočné inžinierstvo. Kedy stavať na mieru a ako zvládnuť dostupnosť." },
      { slug: "ai-agents-for-business", date: "2026-09-21", tag: "AI", read: "9 min", title: "AI agenti pre firmy: čo sú a kam patria", body: "AI agent je model, ktorý vie robiť kroky a používať nástroje, nielen odpovedať. To je silné a v roku 2026 stále nedozreté — a práve preto to potrebuje inžiniersku disciplínu." },
      { slug: "how-to-build-a-marketplace-platform", date: "2026-09-20", tag: "Produkt", read: "9 min", title: "Ako postaviť marketplace platformu", body: "Marketplace, kde sa kupujúci stretnú s predajcami, postaví hocikto. Otázka, ktorá rozhodne o živote či smrti, je, či sa vôbec jedna strana ukáže prvá." },
      { slug: "from-spreadsheets-to-custom-software", date: "2026-09-19", tag: "Automatizácia", read: "8 min", title: "Od tabuliek k softvéru: keď Excel prestane stačiť", body: "Excel je jeden z najlepších nástrojov, aké kedy vznikli — presne do bodu, keď riadi niečo, čo by nemal. Ako spoznáte, že ste tú čiaru prekročili, a čo postaviť namiesto neho." },
      { slug: "custom-software-for-automotive", date: "2026-09-18", tag: "Automotive", read: "9 min", title: "Softvér na mieru pre automobilový priemysel", body: "Diel na linke nikdy nie je len diel — nesie históriu, ktorú si raz môže vyžiadať zvolávacia akcia. Prečo softvér pre automotive stojí a padá na sledovateľnosti a kde sa oplatí riešenie na mieru." },
      { slug: "how-to-build-a-customer-portal", date: "2026-09-16", tag: "Systémy", read: "8 min", title: "Ako postaviť zákaznícky portál, ktorý zníži podporu, nie zvýši", body: "Dajte zákazníkom portál, ktorý odpovie na ich otázky skôr, než zavolajú, a podpora klesne. Dajte im pomalé, prázdne prihlásenie a stane sa ďalšou vecou na sťažovanie. Tu je rozdiel." },
      { slug: "predictive-analytics-for-business", date: "2026-09-14", tag: "AI", read: "8 min", title: "Prediktívna analytika pre firmy: predpovedanie z vlastných dát", body: "Predpovedanie z vlastných dát je jedna z najužitočnejších vecí, aké softvér vie — a jedna z najľahšie prepredaných. Hodnota je v tom, že podľa čísla poctivo konáte." },
      { slug: "custom-software-for-construction", date: "2026-09-13", tag: "Stavebníctvo", read: "9 min", title: "Softvér na mieru pre stavebné firmy", body: "Generický softvér na riadenie projektov vznikol pre kancelárie, no stavba sa nedeje v kancelárii. Tu je, kde medzera medzi terénom a kanceláriou stojí peniaze a čo softvér na mieru rieši." },
      { slug: "custom-software-for-manufacturing", date: "2026-09-12", tag: "Výroba", read: "9 min", title: "Softvér na mieru pre výrobu: MES, plánovanie a výrobná hala", body: "Výrobná hala nie je kancelária a softvér stavaný, akoby ňou bola, tam potichu zlyháva. Tu je, kde sa výrobný softvér na mieru vyplatí — a kde nie." },
      { slug: "custom-software-for-recruitment-and-staffing", date: "2026-09-11", tag: "Nábor", read: "8 min", title: "Softvér na mieru pre personálne a staffingové agentúry", body: "Personálna agentúra má naraz dvoch zákazníkov a proces, na ktorý žiadne generické ATS celkom nesadne. Toto je miesto, kde sa softvér na mieru vypláca — a prečo začať posúdením, nie demom." },
      { slug: "how-to-build-a-custom-erp", date: "2026-09-09", tag: "Systémy", read: "9 min", title: "Ako postaviť ERP systém na mieru (bez stávky o firmu)", body: "ERP projekty sú povestné prekročeným rozpočtom a položením firiem, ktorým mali pomôcť. Ako získať výhody systému, ktorý sadne — bez rizika veľkého tresku." },
      { slug: "custom-software-for-pharma-and-life-sciences", date: "2026-09-07", tag: "Farmácia", read: "9 min", title: "Softvér na mieru pre farmáciu a life sciences", body: "V regulovaných life sciences nie je auditná stopa funkciou — je pointou. Čo sa mení, keď musí byť váš softvér validovaný, a ako naň stavať vedome." },
      { slug: "how-to-build-an-inventory-management-system", date: "2026-09-06", tag: "Systémy", read: "8 min", title: "Ako postaviť skladový systém", body: "Dôvod, prečo generický skladový nástroj zlyhá, nie je nikdy počítanie. Je to ten jeden proces, ktorý váš biznis beží a ktorý nástroj nikdy nebol stavaný namodelovať." },
      { slug: "how-to-outsource-software-development", date: "2026-09-05", tag: "Outsourcing", read: "9 min", title: "Ako outsourcovať vývoj softvéru a neľutovať to", body: "Rozhodli ste sa outsourcovať. Rozdiel medzi dobrým výsledkom a drahým poučením sa rozhodne pred prvým riadkom kódu — v rozsahu, výbere partnera a v tom, kto vlastní znalosti počas ich vzniku." },
      { slug: "custom-software-for-travel-and-tourism", date: "2026-09-03", tag: "Cestovný ruch", read: "8 min", title: "Softvér na mieru pre cestovný ruch a turizmus", body: "Rezervácie vyzerajú jednoducho, kým sa nestretnú dostupnosť, dodávatelia, zálohy a hlavná sezóna. Toto je miesto, kde krabicové nástroje narazia na strop a softvér na mieru sa začne vyplácať." },
      { slug: "offline-first-and-on-premise", date: "2026-09-02", tag: "Inžinierstvo", read: "8 min", title: "Offline-first a on-premise: softvér pre odpojené a regulované prostredia", body: "Cloud ako predvoľba má slepé miesto: terén, výrobnú halu, utajovanú sieť, regulátora. Čo treba na softvér — a AI — ktorý beží tam, kde dáta musia zostať." },
      { slug: "computer-vision-for-business", date: "2026-08-31", tag: "AI", read: "8 min", title: "Počítačové videnie pre firmy: praktické využitie za hranicou humbuku", body: "Počítačové videnie funguje najlepšie na jednej úzkej, merateľnej úlohe v kontrolovanom prostredí. Demo je ľahké; ťažkou, neefektnou robotou sú dáta a okrajové prípady." },
      { slug: "custom-software-for-insurance", date: "2026-08-29", tag: "Poisťovníctvo", read: "9 min", title: "Softvér na mieru pre poisťovne", body: "Softvér v poisťovníctve stojí a padá na správnosti a auditovateľnosti a jadrový systém býva starý a nosný. Tu je, ako okolo neho modernizovať bez rizikového rewrite." },
      { slug: "custom-software-for-nonprofits", date: "2026-08-28", tag: "Neziskový sektor", read: "8 min", title: "Softvér na mieru pre neziskové organizácie a združenia", body: "Väčšina neziskoviek by softvér na mieru stavať nemala — a tie, ktoré by mali, musia presne vedieť prečo, skôr než naň minú grant." },
      { slug: "custom-software-for-healthcare", date: "2026-08-27", tag: "Zdravotníctvo", read: "9 min", title: "Softvér na mieru pre zdravotníctvo: súlad s predpismi, dáta a bezpečnosť", body: "V zdravotníckom softvéri sa nedá len tak vypustiť a voľne iterovať. Tu je, čo regulácia, dáta a latka bezpečnosti reálne od projektu žiadajú — a prečo je pomalšie správne." },
      { slug: "custom-software-for-professional-services", date: "2026-08-24", tag: "Profesionálne služby", read: "8 min", title: "Softvér na mieru pre firmy poskytujúce profesionálne služby", body: "Keď sú vaši ľudia produktom, softvér, na ktorom firma beží, nie je réžia — rozhoduje o tom, či je dobrý mesiac ziskový. Kde krabicové PSA prestáva sadnúť." },
      { slug: "in-house-vs-outsourcing-software-development", date: "2026-08-22", tag: "Sourcing", read: "8 min", title: "Interný tím vs outsourcing vývoja softvéru", body: "Najať interný tím je správna odpoveď častejšie, než priznáva marketing outsourcingu — a nesprávna častejšie, než si zakladatelia uvedomujú. Tu je, ako rozlíšiť, čo je čo." },
      { slug: "how-to-build-an-e-commerce-platform", date: "2026-08-21", tag: "E-commerce", read: "9 min", title: "Ako postaviť e-commerce platformu", body: "Ak ste prerástli platformu, stavba vyzerá lákavo. Väčšina firiem by mala zostať — a tie, ktoré odídu, majú presne vedieť, čoho sa vzdávajú." },
      { slug: "how-to-build-an-internal-tool", date: "2026-08-19", tag: "Systémy", read: "8 min", title: "Ako postaviť interný nástroj, ktorý tím naozaj použije", body: "Tabuľka, ktorú všetci nenávidia, no nikto ju nevie zabiť, je biznis riziko s termínom. Ako postaviť interný nástroj, ktorý ju nahradí — a prečo jednoduché poráža pôsobivé." },
      { slug: "how-to-choose-an-ai-use-case", date: "2026-08-17", tag: "AI", read: "8 min", title: "Ako vybrať AI use case, ktorý sa naozaj vyplatí", body: "Ťažké na AI nie je model — je to výber prvého problému. Praktický spôsob, ako oceniť kandidátov na use case podľa hodnoty a realizovateľnosti, a prečo je váš najviditeľnejší problém zvyčajne zlé miesto na začiatok." },
      { slug: "how-to-build-a-business-dashboard", date: "2026-08-15", tag: "Analytika", read: "8 min", title: "Ako postaviť biznis dashboard, ktorý sa naozaj používa", body: "Väčšinu dashboardov ľudia týždeň obdivujú a potom ich prestanú otvárať. Riešením nie je krajšia knižnica grafov — je ním návrh okolo rozhodnutí, ktoré niekto reálne robí." },
      { slug: "how-to-build-a-subscription-billing-system", date: "2026-08-14", tag: "SaaS", read: "8 min", title: "Ako postaviť systém pre predplatné a fakturáciu", body: "Fakturácia vyzerá ako formulár a platba. V skutočnosti sú to desiatky hraničných prípadov, kde sú peniaze nemilosrdné — a väčšina z nich je už vyriešená." },
      { slug: "custom-software-for-fintech", date: "2026-08-12", tag: "Fintech", read: "9 min", title: "Softvér na mieru pre fintech a finančné služby", body: "Peniaze neodpúšťajú a finančný softvér, ktorý s transakciou zaobchádza ako s bežným zápisom do databázy, raz stratí niekomu peniaze. Tu je, čo si jeho správné postavenie reálne žiada." },
      { slug: "custom-software-for-education", date: "2026-08-08", tag: "Vzdelávanie", read: "8 min", title: "Softvér na mieru pre vzdelávanie a e-learning", body: "Schopný LMS pokryje viac, než väčšina škôl a vzdelávacích firiem čaká. Tu je, ako spoznať, kedy ho nakonfigurovať a kedy sa softvér na mieru naozaj oplatí." },
      { slug: "how-to-build-a-learning-management-system", date: "2026-08-07", tag: "Systémy", read: "8 min", title: "Ako postaviť learning management system (LMS)", body: "LMS vyzerá ako kurzy a ukazovateľ postupu. Pod tým sú štandardy obsahu, povinnosti prístupnosti a reporting — a väčšinu z toho zrelá platforma už robí." },
      { slug: "how-to-build-a-custom-crm", date: "2026-08-05", tag: "Systémy", read: "9 min", title: "Ako postaviť CRM na mieru (a kedy to naozaj má zmysel)", body: "Väčšina firiem by CRM na mieru stavať nemala — a pár by rozhodne malo. Ako spoznať, ktorá ste, a ako postaviť také, ktoré obchodníci naozaj používajú namiesto obchádzania." },
      { slug: "custom-software-for-telecom", date: "2026-08-04", tag: "Telekomunikácie", read: "9 min", title: "Softvér na mieru pre telekomunikačné firmy", body: "Billing podľa spotreby neodpúšťa, jadro je legacy a škála nie je voliteľná. Toto je miesto, kde sa telco softvér na mieru vypláca — a ako modernizovať okolo stacku, ktorý sa nedá len tak vymeniť." },
      { slug: "custom-software-for-wholesale-and-distribution", date: "2026-08-01", tag: "Distribúcia", read: "8 min", title: "Softvér na mieru pre veľkoobchod a distribúciu", body: "V distribúcii je marža taká tenká, že softvér vám buď zarába, alebo potichu prerába. Kde sa softvér na mieru okolo štandardného ERP oplatí a kde nie." },
      { slug: "custom-software-for-retail-and-ecommerce", date: "2026-07-31", tag: "Retail", read: "8 min", title: "Softvér na mieru pre retail a e-commerce", body: "Hotové platformy dostanú retailera ďaleko, potom narazia na strop. Tu je, kde ten strop leží, prečo je riadenie objednávok skutočná chrbtica a ako rozširovať skôr, než začnete nahrádzať." },
      { slug: "saas-on-a-legacy-core", date: "2026-07-29", tag: "Integrácia", read: "9 min", title: "Ako postaviť SaaS produkt na legacy jadre", body: "Jadrový systém, na ktorom firma beží, je zriedka ten, ktorý smiete vymeniť. Integračné vzory na stavbu moderného produktu nad ním — a pasca, ktorej sa treba vyhnúť." },
      { slug: "custom-software-for-hospitality-and-restaurants", date: "2026-07-25", tag: "Pohostinstvo", read: "8 min", title: "Softvér na mieru pre hotely a reštaurácie", body: "Väčšina prevádzok v pohostinstve nepotrebuje softvér na mieru všade — potrebuje ho v tých pár miestach, kde hotové nástroje vnútia obchádzku do každej zmeny." },
      { slug: "how-to-build-a-helpdesk-tool", date: "2026-07-24", tag: "Systémy", read: "8 min", title: "Ako postaviť helpdesk a nástroj pre zákaznícku podporu", body: "Podpora prerastie zdieľanú schránku skôr organizačne než technicky. Ako sa rozhodnúť, čo postaviť, čo kúpiť a kde začať úzko." },
      { slug: "how-to-build-an-mvp", date: "2026-07-22", tag: "Produkt", read: "8 min", title: "Ako postaviť MVP, ktoré nespáli váš rozpočet", body: "Skutočné MVP je otázka, nie produkt. Tu je, ako nájsť ten jeden predpoklad na otestovanie, postaviť najmenšiu vec, ktorá ho otestuje, a vyhnúť sa pasci, ktorá ničí väčšinu MVP." },
      { slug: "how-to-choose-a-technology-stack", date: "2026-07-18", tag: "Stratégia", read: "8 min", title: "Ako vybrať technologický stack pre softvér na mieru", body: "Kupujúci sa trápia tým, v akom frameworku má byť ich softvér postavený. Zvyčajne je to zlá starosť — tu je to, čo naozaj rozhoduje, či vám stack poslúži celú dekádu." },
      { slug: "how-to-build-a-quoting-tool", date: "2026-07-17", tag: "Systémy", read: "8 min", title: "Ako postaviť nástroj na cenové ponuky a CPQ", body: "Zložitá cenotvorba je presne to, čo láme generické nástroje a tabuľky. Čo musí nástroj na ponuky zvládnuť a kde začať, keď bolí všetko." },
      { slug: "fractional-cto-when-you-need-one", date: "2026-07-15", tag: "Vedenie", read: "8 min", title: "Čo robí fractional CTO a kedy ho potrebujete", body: "Potrebujete niekoho seniorného, kto vlastní technické rozhodnutia, no nie na plný úväzok. Čo fractional CTO robí týždeň po týždni a kedy toto usporiadanie prestane dávať zmysel." },
      { slug: "custom-software-for-agriculture", date: "2026-07-11", tag: "Agritech", read: "8 min", title: "Softvér na mieru pre poľnohospodárstvo a agritech", body: "Poľnohospodárstvo beží na sezónach, slabom signáli a papierovaní, ktoré nikoho neteší. Softvér preň uspeje vtedy, keď tieto obmedzenia rešpektuje, nie keď proti nim bojuje." },
      { slug: "how-to-build-a-saas-product", date: "2026-07-08", tag: "SaaS", read: "10 min", title: "Ako postaviť SaaS produkt od nuly", body: "Stavba SaaS je menej o funkcii, z ktorej ste nadšení, a viac o neviditeľnej mašinérii okolo nej — fakturácia, tenancia, onboarding. Tu je, ako postaviť taký, ktorý vydrží." },
      { slug: "custom-software-for-energy-and-utilities", date: "2026-07-04", tag: "Energetika", read: "9 min", title: "Softvér na mieru pre energetiku a utility", body: "Softvér v energetike zlyháva spôsobmi, aké bežný biznis softvér nepozná: dáta neprestávajú tiecť, pravidlá menia predpisy a zlé číslo môže byť bezpečnostná udalosť, nie chyba v zaokrúhlení." },
      { slug: "cloud-vs-on-premise", date: "2026-07-03", tag: "Cloud", read: "8 min", title: "Cloud verzus on-premise: čo je správne pre váš softvér?", body: "Ani jedna odpoveď nie je univerzálne správna. Rozhoduje citlivosť dát, tvar záťaže, compliance a tím, ktorý reálne máte — nie to, čo je práve v móde." },
      { slug: "ai-on-your-own-data-rag-explained", date: "2026-07-01", tag: "AI", read: "8 min", title: "AI na vlastných dátach: RAG vysvetlený pre rozhodovateľov", body: "Chcete, aby AI odpovedala nad vašimi súkromnými firemnými dátami, bezpečne. RAG je spôsob, ako na to bez vkladania tajomstiev do verejného nástroja a bez pretrénovania modelu — vysvetlený pre rozhodovateľa, nie inžiniera." },
      { slug: "how-to-build-a-field-service-management-app", date: "2026-06-30", tag: "Systémy", read: "8 min", title: "Ako postaviť aplikáciu pre riadenie servisu v teréne", body: "Kancelária chce plánovanie a prehľad; technik chce aplikáciu, ktorá funguje bez signálu a nespomaľuje ho. Návrh musí počítať s oboma svetmi." },
      { slug: "how-to-manage-a-remote-development-team", date: "2026-06-27", tag: "Dodávka", read: "8 min", title: "Ako riadiť remote alebo nearshore vývojársky tím", body: "Zlyhanie remote tímov nie je lenivosť — je to manažér, ktorý meria nesprávnu vec. Ako viesť externý tím podľa výsledkov, s demom každý sprint ako skutočným statusom." },
      { slug: "how-to-choose-a-cloud-provider", date: "2026-06-26", tag: "Cloud", read: "8 min", title: "Ako vybrať cloud providera: AWS verzus Azure verzus Google Cloud", body: "Na providerovi záleží menej než na dôvodoch, prečo si ho ľudia vyberajú. Rozhodujte podľa vhodnosti — zručnosti, stack, služby, rezidencia — nie podľa módy." },
      { slug: "rewrite-replatform-or-refactor", date: "2026-06-24", tag: "Stratégia", read: "8 min", title: "Rewrite, replatform, alebo refaktoring? Ako vybrať stratégiu modernizácie", body: "Tri stratégie modernizácie, tri rôzne rizikové profily. Rámec, ako zladiť prístup so systémom — a skutočná cena za to, keď po rewrite siahnete priskoro." },
      { slug: "is-your-data-ready-for-ai", date: "2026-06-20", tag: "AI", read: "8 min", title: "Sú vaše dáta pripravené na AI?", body: "Na začiatok s AI nepotrebujete dokonalé dáta, ale musíte poznať ich stav. Čo pripravenosť znamená v praxi, skrytá práca cesty k nej a prečo poctivé posúdenie prichádza pred modelom." },
      { slug: "fixed-price-vs-time-and-materials", date: "2026-06-17", tag: "Cenotvorba", read: "8 min", title: "Fixná cena vs time & materials: ktorá zmluva vás naozaj chráni?", body: "Fixná cena znie ako bezpečná voľba — a potichu vás tlačí k nesprávnemu softvéru. Ako hlavné cenové modely naozaj fungujú a kedy vás ktorý chráni." },
      { slug: "how-to-build-a-document-management-system", date: "2026-06-13", tag: "Systémy", read: "8 min", title: "Ako postaviť systém na správu dokumentov", body: "Problémom je málokedy úložisko — je ním nájsť správnu verziu správneho dokumentu a preukázať, kto čo urobil. Stavajte pre dohľadanie a kontrolu, nie pre archiváciu." },
      { slug: "how-to-ensure-software-quality", date: "2026-06-12", tag: "Kvalita", read: "8 min", title: "Ako zabezpečiť kvalitu softvéru: testovanie a QA zrozumiteľne", body: "Nemusíte čítať kód, aby ste posúdili, či je softvér postavený dobre. Stačí vedieť, ktoré vrstvy ho chránia, ako kvalita vyzerá zvonku a ktoré otázky odlíšia seriózneho dodávateľa od toho, čo len dúfa." },
      { slug: "connecting-your-business-tools-system-integration", date: "2026-06-10", tag: "Integrácia", read: "8 min", title: "Systémová integrácia: aby si vaše firemné nástroje rozumeli", body: "Zakaždým, keď človek prepíše číslo z jedného systému do druhého, platíte za chýbajúcu integráciu chybami a stratenými hodinami. Ako prepojiť nástroje bez toho, aby vznikli špagety." },
      { slug: "how-to-build-a-workflow-automation-tool", date: "2026-06-06", tag: "Automatizácia", read: "8 min", title: "Ako postaviť nástroj na automatizáciu workflow", body: "Nástroj je tá ľahká časť. Ťažké je uvidieť, aký váš schvaľovací proces naozaj je — vrátane výnimiek, ktoré ľudia potichu riešia — a opraviť ho skôr, než ho odlejete do softvéru." },
      { slug: "how-to-choose-a-software-development-company", date: "2026-06-03", tag: "Výber partnera", read: "10 min", title: "Ako si vybrať softvérovú firmu: otázky, na ktorých záleží", body: "Vybrať si nesprávnu softvérovú firmu je jedna z najdrahších chýb, akú firma spraví. Otázky, ktoré odhalia, kto naozaj dodá — a varovné signály, ktoré klamú." },
      { slug: "web-app-vs-mobile-app-vs-pwa", date: "2026-05-30", tag: "Platformy", read: "8 min", title: "Webová aplikácia, mobilná aplikácia alebo PWA: čo postaviť?", body: "Voľba medzi natívnou aplikáciou, webom a PWA sa priveľmi často rozhodne módou. Začnite radšej od jedinej veci, ktorá to naozaj rozhodne: ako vaši používatelia po produkte siahajú." },
      { slug: "software-uptime-and-reliability", date: "2026-05-29", tag: "Spoľahlivosť", read: "8 min", title: "Dostupnosť a spoľahlivosť softvéru: čo treba, aby zostal online", body: "Každá ďalšia deviatka spoľahlivosti stojí neúmerne viac než tá predošlá. Zručnosť nie je naháňať dokonalú dostupnosť, ale rozhodnúť, koľko jej naozaj potrebujete, a postaviť práve toľko." },
      { slug: "cloud-migration-guide-for-business", date: "2026-05-27", tag: "Cloud", read: "9 min", title: "Praktický sprievodca migráciou do cloudu pre zabehnuté firmy", body: "Presun do cloudu nie je automaticky lacnejší ani lepší. Takto sa rozhodnete, čo presunúť, v akom poradí a čo skutočne zabolí, keď príde faktúra." },
      { slug: "how-to-build-a-mobile-app-for-your-business", date: "2026-05-23", tag: "Mobil", read: "8 min", title: "Ako postaviť mobilnú aplikáciu pre vašu firmu", body: "Rozhodli ste sa, že potrebujete mobilnú aplikáciu. Skôr než sa zaviažete, rozhodnutia, ktoré formujú celý projekt: natívne vs cross-platform, realita app storov, návrh pre reálny telefón a prečo je deň vydania začiatkom práce." },
      { slug: "cut-cloud-costs-without-a-freeze", date: "2026-05-20", tag: "Platforma", read: "8 min", title: "Ako znížiť náklady na cloud o 40-70 % bez zmrazenia vývoja", body: "Cloudové účty potichu narastú na dvoj- až trojnásobok toho, čo záťaž potrebuje. Praktický, inkrementálny checklist, ako z toho zložiť tretinu — bez zmrazenia vývoja." },
      { slug: "how-to-write-a-software-brief", date: "2026-05-16", tag: "Dodávka", read: "8 min", title: "Ako napísať softvérové zadanie, ktoré prinesie dobré ponuky", body: "Zadanie, ktoré pošlete, rozhoduje o ponukách, ktoré dostanete späť. Prešpecifikujte riešenie a pozvete si nadhodnotené alebo podstrelené ponuky — tu je návod, ako napísať také, ktoré vám prinesie seriózne a porovnateľné ponuky." },
      { slug: "total-cost-of-ownership-of-software", date: "2026-05-15", tag: "Náklady", read: "8 min", title: "Celkové náklady na vlastníctvo softvéru na mieru", body: "Obstarávacia cena softvéru je najmenšie číslo, aké zaň kedy zaplatíte. Účet, ktorý rozhodne, či to bola dobrá investícia, je ten, čo prichádza každý mesiac po celé roky." },
      { slug: "nearshore-software-development-in-europe", date: "2026-05-13", tag: "Sourcing", read: "9 min", title: "Nearshore vývoj softvéru v Európe: sprievodca pre zákazníka", body: "Stavať softvér s tímom pár časových pásiem ďaleko — nie dvanásť — je dôvod, prečo sa stredná Európa stala sladkým miestom pre západné firmy. Čo vám nearshore dá a ako to robiť dobre." },
      { slug: "how-to-build-an-api-first-platform", date: "2026-05-09", tag: "Platformy", read: "8 min", title: "Ako postaviť API-first platformu", body: "Keď sa váš produkt musí integrovať, dať rozšíriť alebo poháňať web aj mobil naraz, API-first prestáva byť módnym slovom a stáva sa architektúrou. Čo naozaj znamená, kedy sa vyplatí a aké sľuby na seba beriete v deň, keď API zverejníte." },
      { slug: "how-to-reduce-technical-debt", date: "2026-05-06", tag: "Inžinierstvo", read: "8 min", title: "Ako znížiť technický dlh bez zastavenia roadmapy", body: "Technický dlh nevidno v účtovníctve, no cítite ho vždy, keď malá zmena trvá týždeň. Takto ho znížite bez zamrazenia dodávky." },
      { slug: "software-maintenance-and-support-explained", date: "2026-05-02", tag: "Podpora", read: "8 min", title: "Údržba a podpora softvéru: čo stojí a prečo na nej záleží", body: "Väčšina kupujúcich berie spustenie ako cieľovú čiaru. Je to začiatok tej časti, ktorá rozhoduje, či softvér prežije — a tu je to, čo tá časť naozaj stojí." },
      { slug: "no-code-vs-custom-software", date: "2026-04-29", tag: "Postaviť či kúpiť", read: "8 min", title: "No-code vs softvér na mieru: kedy vyhráva ktoré?", body: "S no-code môžete byť online za víkend a zaseknutí za rok. Kde naozaj vyhráva, na aký strop narazí a múdra cesta, ktorá no-code využíva na získanie práva stavať na mieru." },
      { slug: "how-to-scale-software-after-mvp", date: "2026-04-25", tag: "Škálovanie", read: "8 min", title: "Ako škálovať softvér po MVP", body: "MVP vás dostalo sem, ale ďalej vás nedostane. Ako prvé zvyčajne nepraská výkon serverov, ale databáza a spôsob, akým pracujete." },
      { slug: "digital-transformation-guide", date: "2026-04-24", tag: "Stratégia", read: "9 min", title: "Praktický sprievodca digitálnou transformáciou", body: "Väčšina digitálnych transformácií zlyhá z rovnakého dôvodu: vedú sa ako IT projekt namiesto biznis zmeny. Tu je, čo ten pojem naozaj znamená a ako ho premeniť na skutočnosť." },
      { slug: "monolith-to-microservices-when-its-worth-it", date: "2026-04-22", tag: "Architektúra", read: "9 min", title: "Z monolitu na mikroslužby: kedy sa to oplatí (a kedy nie)", body: "Väčšina tímov siaha po mikroslužbách, aby opravila neporiadny kód, a väčšina ich nepotrebuje. Toto naozaj riešia, čo stoja a ako sa rozhodnúť poctivo." },
      { slug: "how-to-build-a-data-warehouse", date: "2026-04-18", tag: "Dáta", read: "8 min", title: "Ako vybudovať dátový sklad a analytický pipeline", body: "Keď vám čísla nikdy nesedia a report trvá tri dni, problém nie sú dashboardy — problém je, že pravdu nikto nevlastní. Takto sa buduje miesto, ktoré ju vlastní." },
      { slug: "two-week-software-audit", date: "2026-04-15", tag: "Dodávka", read: "7 min", title: "Čo má dvojtýždňový softvérový audit naozaj priniesť", body: "Väčšina auditov skončí prezentáciou, na ktorú nikto nekoná. Štyri konkrétne výstupy dvojtýždňového posúdenia — a ako z nich klienti spravia schválený rozpočet." },
      { slug: "gdpr-and-custom-software", date: "2026-04-11", tag: "Súlad", read: "8 min", title: "GDPR a softvér na mieru: ochrana údajov zabudovaná od prvého dňa", body: "GDPR je najjednoduchšie a najlacnejšie vtedy, keď tvaruje architektúru, a nie keď sa dolepuje neskôr. Toto je inžinierske usmernenie, nie právna rada." },
      { slug: "how-to-rescue-a-failing-software-project", date: "2026-04-10", tag: "Dodávka", read: "8 min", title: "Ako zachrániť softvérový projekt, ktorý zlyháva", body: "Väčšina zlyhávajúcich projektov bola čitateľná mesiace pred termínom, ktorý napokon nestihli. Takto sa dá zastaviť, poctivo posúdiť a vrátiť k dodávaniu." },
      { slug: "how-much-does-custom-ai-software-cost", date: "2026-04-08", tag: "AI", read: "9 min", title: "Koľko stojí AI softvér na mieru?", body: "Model je tá lacná časť. Skutočný účet tvorí pripravenosť dát, nudný softvér okolo neho a náklady na inferenciu, aké bežný softvér nikdy nemal — a takto o tom uvažovať." },
      { slug: "how-to-modernize-a-legacy-database", date: "2026-04-04", tag: "Dáta", read: "8 min", title: "Ako modernizovať legacy databázu", body: "Aplikácie sa prepisujú každých pár rokov; databáza pod nimi často nie. Práve preto sa v starej schéme skrýva skutočné riziko." },
      { slug: "custom-software-vs-off-the-shelf", date: "2026-04-01", tag: "Postaviť či kúpiť", read: "9 min", title: "Softvér na mieru vs hotové riešenie: postaviť, alebo kúpiť?", body: "Hotové riešenie sa spustí rýchlejšie a lacnejšie — kým sa nenazbierajú obchádzky, predplatné a uzamknutie. Rámec na rozhodnutie, ktoré z nich váš problém naozaj potrebuje." },
      { slug: "the-european-accessibility-act-and-your-software", date: "2026-03-28", tag: "Prístupnosť", read: "8 min", title: "Európsky akt o prístupnosti a váš softvér: čo treba vedieť", body: "Európsky akt o prístupnosti ťahá mnohé digitálne produkty a služby k prístupnosti na úrovni WCAG. Toto je všeobecná informácia, nie právna rada." },
      { slug: "how-to-switch-software-vendors", date: "2026-03-27", tag: "Sourcing", read: "8 min", title: "Ako zmeniť softvérového dodávateľa bez straty odvedenej práce", body: "Riziko pri zmene dodávateľa takmer nikdy nie je kód. Sú to znalosti a prístupy — a oboje odíde v momente, keď sa vzťah skončí zle." },
      { slug: "how-to-automate-a-manual-business-process", date: "2026-03-25", tag: "Automatizácia", read: "8 min", title: "Ako automatizovať manuálny firemný proces softvérom", body: "Najväčšou výhrou automatizácie je vrátiť tímu hodiny, ktoré stráca na opakujúcej sa práci — ak automatizujete správny proces a len nezrýchlite pokazený." },
      { slug: "how-to-build-a-progressive-web-app", date: "2026-03-21", tag: "Platformy", read: "8 min", title: "Ako vytvoriť progresívnu webovú aplikáciu (PWA)", body: "PWA je web, ktorý sa správa viac ako appka: inštalovateľný, funkčný offline, jeden codebase. Často je to rozumná stredná cesta — a niekedy nesprávny nástroj. Takto to rozlíšite." },
      { slug: "how-long-does-it-take-to-build-custom-software", date: "2026-03-18", tag: "Časový plán", read: "8 min", title: "Ako dlho trvá vývoj softvéru na mieru?", body: "Týždne, mesiace či rok — časový plán softvéru na mieru určuje menej to, ako rýchlo tím kóduje, než to, ako rýchlo viete rozhodovať. Tu je, čo ním naozaj hýbe." },
      { slug: "security-for-custom-software", date: "2026-03-14", tag: "Bezpečnosť", read: "9 min", title: "Bezpečnosť softvéru na mieru: zabudovať ju, nie dolepiť", body: "Väčšina incidentov nepramení z dômyselných útokov, ale z chýbajúcich základov. Bezpečnosť je to, ako staviate, nie kolónka, ktorú odškrtnete pred spustením." },
      { slug: "how-to-plan-a-software-roadmap", date: "2026-03-13", tag: "Stratégia", read: "8 min", title: "Ako naplánovať softvérovú roadmapu", body: "Najsebavedomejšie vyzerajúce roadmapy — datovaný zoznam funkcií na dva roky dopredu — sú tie, ktoré budú takmer isto nesprávne. Existuje lepší spôsob plánovania." },
      { slug: "ai-automation-for-business-processes", date: "2026-03-11", tag: "AI", read: "8 min", title: "AI automatizácia firemných procesov: praktický sprievodca", body: "Najlepšie ciele pre AI sú objemné, dokumentmi nasýtené procesy, kde sú pravidlá neostré. Pasca je použiť AI tam, kde je jednoduché pravidlo správne a lacnejšie — a takto rozlíšite jedno od druhého." },
      { slug: "what-happens-in-a-software-discovery-phase", date: "2026-03-07", tag: "Dodávka", read: "8 min", title: "Čo sa deje v objavnej fáze softvéru", body: "Chceli ste stavbu a partner navrhol najprv platené discovery. Znie to ako zdržanie. Je to najlacnejšia poistka, akú na celom projekte kúpite." },
      { slug: "strangler-fig-legacy-migration", date: "2026-03-04", tag: "Architektúra", read: "9 min", title: "Ako vymeniť legacy systém bez veľkého rewrite", body: "Prečo inkrementálne prechody zlyhajú skôr na organizačnej štruktúre než na kóde — a ako naplánovať výmenu tak, aby biznis bežal celý čas." },
      { slug: "how-to-avoid-scope-creep", date: "2026-02-28", tag: "Dodávka", read: "8 min", title: "Ako sa vyhnúť rozširovaniu rozsahu na softvérovom projekte", body: "Väčšina rozširovania rozsahu nie je problém disciplíny — je to problém cieľov. Ako odlíšiť zdravú zmenu od creepu a ako postaviť proces zmien lacný natoľko, že ho ľudia naozaj používajú." },
      { slug: "how-to-measure-software-roi", date: "2026-02-27", tag: "Stratégia", read: "8 min", title: "Ako merať návratnosť softvérového projektu", body: "Návratnosť softvérového projektu neodmeriate po jeho vydaní, ak ste pred stavbou nerozhodli, akú návratnosť kupujete. Takto sa rozhoduje najprv." },
      { slug: "how-much-does-it-cost-to-build-an-mvp", date: "2026-02-25", tag: "Náklady", read: "8 min", title: "Koľko stojí vývoj MVP?", body: "Väčšina MVP stojí priveľa, lebo nie sú minimálne. Zmyslom MVP je kúpiť poznanie, nie produkt — tu je, ako navrhnúť také, ktoré spraví svoju prácu lacno." },
      { slug: "how-to-budget-for-a-software-project", date: "2026-02-21", tag: "Náklady", read: "8 min", title: "Ako zostaviť rozpočet na softvérový projekt", body: "Rozpočet na softvér nie je jedno číslo, ku ktorému sa zaviažete v prvý deň. Je to spôsob, ako si po častiach kupovať istotu — a časti, ktoré ľudia vynechajú, sú tie, čo ho potopia." },
      { slug: "how-to-build-an-ai-assistant-for-your-business", date: "2026-02-18", tag: "AI", read: "8 min", title: "Ako postaviť AI asistenta pre vašu firmu", body: "Holý chatbot si vymýšľa. Užitočný asistent stojí na vašich dátach, vie povedať, že nevie, a rešpektuje, kto čo smie vidieť — a takto ho postavíte." },
      { slug: "how-much-does-it-cost-to-build-a-mobile-app", date: "2026-02-11", tag: "Náklady", read: "9 min", title: "Koľko stojí vývoj mobilnej aplikácie?", body: "Cenu mobilnej aplikácie určuje pár rozhodnutí, ktoré spravíte skôr, než sa napíše riadok kódu — natívne či cross-platform, jedna platforma či dve, tenká či hlboká. Tu sú." },
      { slug: "proof-of-concept-vs-prototype-vs-mvp", date: "2026-02-07", tag: "Produkt", read: "8 min", title: "Proof of concept vs prototyp vs MVP: čo postaviť ako prvé", body: "Proof of concept, prototyp a MVP nie sú štádiá tej istej veci — odpovedajú na rôzne otázky. Postaviť ako prvý ten nesprávny je bežná a drahá chyba." },
      { slug: "signs-your-business-needs-custom-software", date: "2026-02-04", tag: "Stratégia", read: "7 min", title: "7 znakov, že vaša firma prerástla krabicový softvér", body: "Chvíľa na softvér na mieru sa málokedy ohlási. Prejaví sa ako obchádzky, najímanie na zakrytie nástrojov a tabuľka, ktorej sa nikto neodváži dotknúť. Sedem signálov, že je čas." },
      { slug: "how-much-does-it-cost-to-build-a-web-app", date: "2026-01-28", tag: "Náklady", read: "9 min", title: "Koľko stojí vývoj webovej aplikácie?", body: "Webová aplikácia môže stáť pätnásť tisíc eur alebo pol milióna — a rozdiel sú málokedy tie pekné obrazovky. Čo naozaj určuje cenu a ako ju udržať rozumnú." },
      { slug: "how-to-do-technical-due-diligence", date: "2026-01-21", tag: "Stratégia", read: "9 min", title: "Ako urobiť technické due diligence pred investíciou alebo akvizíciou", body: "Pred investíciou do softvérovej firmy alebo jej akvizíciou potrebujete vedieť, či je jej technológia základom alebo záväzkom. Ako to zistiť — a prečo vám to ukážka nepovie." },
      { slug: "how-much-does-it-cost-to-build-custom-software", date: "2026-01-14", tag: "Náklady", read: "10 min", title: "Koľko stojí vývoj softvéru na mieru?", body: "„Závisí to“ je pravdivá, no zbytočná odpoveď. Tu je to, čo naozaj určuje cenu softvéru na mieru, reálne orientačné rozpätia a ako získať číslo, ktoré obhájite." },
      { slug: "the-software-development-process-explained", date: "2026-01-07", tag: "Proces", read: "9 min", title: "Proces vývoja softvéru, vysvetlený pre netechnických lídrov", body: "Nemusíte kódovať, aby ste rozpoznali, či je softvérový projekt zdravý. Zrozumiteľná prechádzka tým, ako sa softvér na mieru naozaj stavia — a signály, že ide dobre alebo zle." },
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
      work: "Pozrieť našu prácu",
    },
  },
  blogPage: {
    title: "Poznámky priamo z práce",
    intro: "Zápisky z bežiacich programov — čo vydržalo, čo by sme zoradili inak, a tie časti, na ktorých záleží viac, než to znie.",
    note: "Praktické poznámky z terénu o modernizácii legacy systémov, dodávke a nákladoch — písané zvnútra bežiacich programov, nie z pohľadu zvonka.",
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

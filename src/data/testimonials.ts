import type { Lang } from "../store";

export type Testimonial = {
  id: string;
  /** full name, e.g. "Ján Novák" */
  name: string;
  role: Record<Lang, string>;
  company?: string;
  companyUrl?: string;
  industry?: Record<Lang, string>;
  /** path under /public; without one the card falls back to an initials avatar */
  photo?: string;
  linkedin?: string;
  quote: Record<Lang, string>;
  /** written approval to publish the name, role, company and photo */
  consent: boolean;
  /** placeholder copy for the dev server; never rendered by a production build */
  isMock?: boolean;
};

// Only real, signed-off quotes go here. A production build shows the section once at
// least two entries carry consent: true (see visibleTestimonials below).
const REAL: Testimonial[] = [
  // {
  //   id: "jan-novak-firma",
  //   name: "Ján Novák",
  //   role: { sk: "CTO", en: "CTO" },
  //   company: "Firma s.r.o.",
  //   companyUrl: "https://www.firma.sk",
  //   industry: { sk: "Logistika", en: "Logistics" },
  //   photo: "/testimonials/jan-novak.webp",
  //   linkedin: "https://www.linkedin.com/in/jan-novak",
  //   quote: {
  //     sk: "Citát presne tak, ako ho klient písomne schválil.",
  //     en: "The quote exactly as the client approved it in writing.",
  //   },
  //   consent: true,
  // },
];

// MOCK DATA – replace with real testimonials before launch
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "mock-peter-h",
    name: "Peter H.",
    role: { sk: "Konateľ", en: "Managing director" },
    industry: { sk: "Logistika", en: "Logistics" },
    quote: {
      sk: "Konečne dodávateľ, ktorý sa pýta na náš proces, nie len na rozpočet. MVP sme testovali s vodičmi skôr, než sme čakali.",
      en: "Finally a vendor who asked about our process, not just our budget. We were testing the MVP with drivers sooner than we expected.",
    },
    consent: false,
    isMock: true,
  },
  {
    id: "mock-lucia-m",
    name: "Lucia M.",
    role: { sk: "Produktová manažérka", en: "Product manager" },
    industry: { sk: "E-commerce", en: "E-commerce" },
    quote: {
      sk: "Pravidelné ukážky nám ušetrili veľa nedorozumení. Vždy sme presne vedeli, kde projekt stojí.",
      en: "The regular demos saved us a lot of misunderstandings. We always knew exactly where the project stood.",
    },
    consent: false,
    isMock: true,
  },
  {
    id: "mock-martin-k",
    name: "Martin K.",
    role: { sk: "CTO", en: "CTO" },
    industry: { sk: "Finančné služby", en: "Financial services" },
    quote: {
      sk: "Odovzdanie bolo bezproblémové. Dokumentácia a zaškolenie nášho tímu boli na úrovni, akú od externého partnera nečakáte.",
      en: "The handover was seamless. The documentation and training for our team were at a level you don't expect from an external partner.",
    },
    consent: false,
    isMock: true,
  },
  {
    id: "mock-jana-s",
    name: "Jana S.",
    role: { sk: "Riaditeľka prevádzky", en: "Head of operations" },
    industry: { sk: "Výroba", en: "Manufacturing" },
    quote: {
      sk: "AI automatizácia spracovania dokladov nám každý týždeň vracia hodiny práce.",
      en: "AI automation of our document processing gives us back hours of work every week.",
    },
    consent: false,
    isMock: true,
  },
  {
    id: "mock-tomas-b",
    name: "Tomáš B.",
    role: { sk: "Zakladateľ", en: "Founder" },
    industry: { sk: "SaaS", en: "SaaS" },
    quote: {
      sk: "Návrh riešenia bol konkrétny – rozsah, harmonogram aj cena bez skrytých položiek.",
      en: "The proposal was concrete – scope, timeline and price with no hidden items.",
    },
    consent: false,
    isMock: true,
  },
  {
    id: "mock-eva-r",
    name: "Eva R.",
    role: { sk: "Marketingová riaditeľka", en: "Marketing director" },
    industry: { sk: "Retail", en: "Retail" },
    quote: {
      sk: "Nový web je rýchly, prehľadný a konečne si ho vieme spravovať sami.",
      en: "The new website is fast, clear, and we can finally manage it ourselves.",
    },
    consent: false,
    isMock: true,
  },
];
// END MOCK DATA

// The mocks are left out of a production bundle entirely, not just filtered at render,
// so the fake names never ship in the JS either.
export const TESTIMONIALS: Testimonial[] = import.meta.env.DEV ? [...REAL, ...MOCK_TESTIMONIALS] : REAL;

/** Everything on the dev server; in production only real quotes cleared for publication. */
export function visibleTestimonials(items: Testimonial[], dev: boolean): Testimonial[] {
  return dev ? items : items.filter((t) => t.consent && !t.isMock);
}

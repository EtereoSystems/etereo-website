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
  /** shown as that many stars out of five */
  rating?: 1 | 2 | 3 | 4 | 5;
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

// DRAFT TESTIMONIALS – awaiting client approval. Set consent: true and isMock: false only after written approval.
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "draft-matej-m",
    name: "Matej M.",
    role: { sk: "Konateľ", en: "Managing director" },
    company: "CoolHeat Pro",
    companyUrl: "https://coolheatpro.sk",
    industry: { sk: "Stavebníctvo", en: "Construction" },
    quote: {
      sk: "Potrebovali sme web, ktorý zákazníkom rýchlo ukáže, čo robíme, a privedie nám dopyty. Dostali sme presne to – bez zbytočných kôl a vysvetľovania.",
      en: "We needed a website that quickly shows customers what we do and brings in inquiries. That's exactly what we got – without endless rounds of back-and-forth.",
    },
    rating: 5,
    consent: false,
    isMock: true,
  },
  {
    id: "draft-michal-b",
    name: "Michal B.",
    role: { sk: "CEO", en: "CEO" },
    company: "Real Reality",
    companyUrl: "https://realreality.sk",
    industry: { sk: "Reality", en: "Real estate" },
    quote: {
      sk: "Nový portál prehľadne ukazuje našu ponuku predaja, prenájmu aj projektov. Úpravy sa riešia rýchlo a vždy vieme, na čom sa práve pracuje.",
      en: "The new portal presents our sales, rentals and projects clearly. Changes get done quickly, and we always know what's being worked on.",
    },
    rating: 5,
    consent: false,
    isMock: true,
  },
  {
    id: "draft-karol-k",
    name: "Karol K.",
    role: { sk: "Zakladateľ", en: "Founder" },
    company: "Aperia",
    companyUrl: "https://aperiaskin.com",
    industry: { sk: "Beauty tech", en: "Beauty tech" },
    quote: {
      sk: "Z nápadu sa stala aplikácia so skenovaním pleti a vysvetleniami v siedmich jazykoch. Spätnú väzbu od používateľov sme zapracúvali priebežne, nie až na konci.",
      en: "An idea became an app with skin scanning and insights in seven languages. We worked in user feedback continuously, not just at the end.",
    },
    rating: 5,
    consent: false,
    isMock: true,
  },
  {
    id: "draft-karolina-k",
    name: "Karolína K.",
    role: { sk: "UGC tvorkyňa", en: "UGC creator" },
    company: "UGC with Karolina",
    companyUrl: "https://ugcwithkarolina.com",
    industry: { sk: "Tvorba obsahu", en: "Content creation" },
    quote: {
      sk: "Chcela som web, ktorý značkám ukáže moju prácu na prvý pohľad. Výsledok je čistý, rýchly a presne v mojom štýle.",
      en: "I wanted a website that shows brands my work at first glance. The result is clean, fast and exactly my style.",
    },
    rating: 5,
    consent: false,
    isMock: true,
  },
  {
    id: "draft-sofia-h",
    name: "Sofia H.",
    role: { sk: "Prevádzková riaditeľka", en: "Head of operations" },
    industry: { sk: "Gastronómia – reťazec reštaurácií", en: "Hospitality – restaurant chain" },
    quote: {
      sk: "Interná platforma nám spojila všetky prevádzky na jednom mieste. Konečne máme prehľad o objednávkach, zmenách aj zásobách bez tabuliek a telefonovania.",
      en: "The internal platform brought all our locations together in one place. We finally have a clear view of orders, shifts and inventory, without spreadsheets and phone calls.",
    },
    rating: 5,
    consent: false,
    isMock: true,
  },
];
// END DRAFT TESTIMONIALS

// The mocks are left out of a production bundle entirely, not just filtered at render,
// so names nobody has approved never ship in the JS either.
export const TESTIMONIALS: Testimonial[] = import.meta.env.DEV ? [...REAL, ...MOCK_TESTIMONIALS] : REAL;

/** Everything on the dev server; in production only real quotes cleared for publication. */
export function visibleTestimonials(items: Testimonial[], dev: boolean): Testimonial[] {
  return dev ? items : items.filter((t) => t.consent && !t.isMock);
}

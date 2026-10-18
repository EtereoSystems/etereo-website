import type { Lang } from "../store";

export type Testimonial = {
  id: string;
  /** full name, e.g. "Ján Novák" */
  name: string;
  role: Record<Lang, string>;
  company: string;
  companyUrl?: string;
  /** path under /public; without one the card falls back to an initials avatar */
  photo?: string;
  linkedin?: string;
  quote: Record<Lang, string>;
  /** written approval to publish the name, role, company and photo */
  consent: boolean;
};

// Only real, signed-off quotes go here. The section stays hidden until at least two
// entries carry consent: true (see Voices in Sections.tsx).
export const TESTIMONIALS: Testimonial[] = [
  // {
  //   id: "jan-novak-firma",
  //   name: "Ján Novák",
  //   role: { sk: "CTO", en: "CTO" },
  //   company: "Firma s.r.o.",
  //   companyUrl: "https://www.firma.sk",
  //   photo: "/testimonials/jan-novak.webp",
  //   linkedin: "https://www.linkedin.com/in/jan-novak",
  //   quote: {
  //     sk: "Citát presne tak, ako ho klient písomne schválil.",
  //     en: "The quote exactly as the client approved it in writing.",
  //   },
  //   consent: true,
  // },
];

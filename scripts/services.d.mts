interface T {
  en: string;
  sk: string;
}
interface TList {
  en: string[];
  sk: string[];
}

export interface ServicePhase {
  name: T;
  body: T;
  output: T;
}
export interface ServiceFaq {
  q: T;
  a: T;
}

export interface Service {
  slug: string;
  id: string;
  tag: T;
  title: T;
  lead: T;
  description: T;
  keywords: T;
  intro: T;
  phasesTitle: T;
  phases: ServicePhase[];
  deliverablesTitle: T;
  deliverables: TList;
  approachTitle: T;
  approach: T;
  faqTitle: T;
  faq: ServiceFaq[];
  cta: { title: T; body: T; action: T };
  chips: TList;
}

export const SERVICES: Service[];

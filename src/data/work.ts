import type { Lang } from "../store";

type Text = Record<Lang, string>;

export type WorkCell = { label: Text; value: Text };

// Named apart from the hero's `Project` in i18n/projects.ts, which is a different shape.
export type WorkProject = {
  id: string;
  tag: Text;
  title: Text;
  description: Text;
  cells: [WorkCell, WorkCell];
  /** the live site; the card links out to it */
  url?: string;
  /** under NDA: no link, a "Confidential" badge instead */
  confidential?: boolean;
};

// Real, published work only. The section copy around it (eyebrow, title, link label) is in
// content.work. No-break spaces keep a one-letter Slovak word off the end of a heading line,
// and tie each "·" to the word before it so a long value only breaks after a separator.
export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "real-reality",
    url: "https://realreality.sk",
    tag: { sk: "Reality", en: "Real estate" },
    title: {
      sk: "Real Reality – inzertný portál pre realitnú kanceláriu",
      en: "Real Reality – listings portal for a real estate agency",
    },
    description: {
      sk: "Ponuka nehnuteľností na predaj a prenájom aj developerské projekty bratislavskej realitnej kancelárie.",
      en: "Property listings for sale and rent, plus development projects, for a Bratislava-based real estate agency.",
    },
    cells: [
      { label: { sk: "Rozsah", en: "Scope" }, value: { sk: "Inzertný portál", en: "Listings portal" } },
      {
        label: { sk: "Sekcie", en: "Sections" },
        value: { sk: "Predaj · Prenájom · Projekty", en: "Sale · Rent · Projects" },
      },
    ],
  },
  {
    id: "aperia",
    url: "https://aperiaskin.com",
    tag: { sk: "Beauty tech", en: "Beauty tech" },
    title: {
      sk: "Aperia – web a mobilná aplikácia na analýzu pleti",
      en: "Aperia – website and mobile app for skin analysis",
    },
    description: {
      sk: "Skenovanie pleti s hodnotením podľa zón, sledovanie cyklu a návykov a vysvetlenia v zrozumiteľnom jazyku.",
      en: "Skin scans with per-zone scores, cycle and habit tracking, and plain-language insights.",
    },
    cells: [
      { label: { sk: "Rozsah", en: "Scope" }, value: { sk: "Web + mobilná aplikácia na mieru", en: "Website + custom mobile app" } },
      { label: { sk: "Jazyky", en: "Languages" }, value: { sk: "7 jazykových verzií", en: "7 localized versions" } },
    ],
  },
  {
    id: "ugc-with-karolina",
    url: "https://ugcwithkarolina.com",
    tag: { sk: "Tvorba obsahu", en: "Content creation" },
    title: {
      sk: "UGC with Karolina – osobný web tvorkyne obsahu",
      en: "UGC with Karolina – personal website for a content creator",
    },
    description: {
      sk: "Osobný web UGC tvorkyne, ktorý predstavuje jej portfólio a spoluprácu so značkami.",
      en: "A personal website showcasing a UGC creator's portfolio and brand collaborations.",
    },
    cells: [
      { label: { sk: "Rozsah", en: "Scope" }, value: { sk: "Osobný web", en: "Personal website" } },
      { label: { sk: "Cieľ", en: "Goal" }, value: { sk: "Prezentácia pre značky", en: "Showcase for brands" } },
    ],
  },
  {
    id: "danish-government",
    confidential: true,
    tag: { sk: "Verejný sektor", en: "Public sector" },
    title: {
      sk: "Systémy pre dánsku verejnú správu",
      en: "Systems for the Danish government",
    },
    description: {
      sk: "Vývoj na systémoch pre dánske štátne inštitúcie. Podrobnosti projektu sú dôverné.",
      en: "Development on systems for Danish public institutions. Project details are confidential.",
    },
    cells: [
      { label: { sk: "Krajina", en: "Country" }, value: { sk: "Dánsko", en: "Denmark" } },
      { label: { sk: "Detaily", en: "Details" }, value: { sk: "Pod NDA", en: "Under NDA" } },
    ],
  },
];

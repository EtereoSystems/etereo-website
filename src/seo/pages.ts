import type { Lang } from "../store";
import type { Page } from "./structuredData";

/**
 * The per-page registry the head is built from. Its own module rather than SeoHead's, so
 * adding a page is a data edit and the checklist can be asserted without rendering React.
 */
export const PATHS: Record<Page, string> = {
  home: "/",
  projects: "/projects/",
  about: "/about/",
  blog: "/blog/",
};

/** Per-page, per-language title + meta description. Kept tight for the SERP snippet. */
export const META: Record<Page, Record<Lang, { title: string; description: string; ogLocale: string }>> = {
  home: {
  en: {
    title: "ETEREO — Software Development & Digital Transformation | Slovakia",
    description:
      "ETEREO is a Slovak software house: legacy modernisation, custom software, SaaS products, and mobile & web engineering. Strategy, architecture, delivery — one accountable team.",
    ogLocale: "en_GB",
  },
  sk: {
    title: "ETEREO — Vývoj softvéru a digitálna transformácia | Slovensko",
    description:
      "ETEREO je slovenská softvérová firma: modernizácia systémov, softvér na mieru, SaaS produkty a mobilný aj webový vývoj. Stratégia, architektúra, dodanie — jeden zodpovedný tím.",
    ogLocale: "sk_SK",
  },
  },
  projects: {
    en: {
      title: "Projects — ETEREO | Selected software work",
      description:
        "Real systems ETEREO's founders have designed, built and shipped — confidential government and defence platforms, a Schneider Electric DCIM platform, an offline AI assistant for BEUMER Group, and Aperia in the app stores.",
      ogLocale: "en_GB",
    },
    sk: {
      title: "Projekty — ETEREO | Vybraná softvérová práca",
      description:
        "Reálne systémy, ktoré zakladatelia ETEREO navrhli, postavili a dodali — dôverné vládne a obranné platformy, DCIM platforma Schneider Electric, offline AI asistent pre BEUMER Group a Aperia v obchodoch s aplikáciami.",
      ogLocale: "sk_SK",
    },
  },
  about: {
    en: {
      title: "About us — ETEREO | Software house in Bratislava, Slovakia",
      description:
        "ETEREO s.r.o. is a Slovak software house founded in 2026 by Patrik Klimko and Matej Kučera. Remote-first, based in Bratislava, working in English and Slovak — the people who scope the work are the people who ship it.",
      ogLocale: "en_GB",
    },
    sk: {
      title: "O nás — ETEREO | Softvérová firma v Bratislave",
      description:
        "ETEREO s.r.o. je slovenská softvérová firma, ktorú v roku 2026 založili Patrik Klimko a Matej Kučera. Remote-first, so sídlom v Bratislave, pracujeme slovensky aj anglicky — ľudia, ktorí prácu nacenia, ju aj dodajú.",
      ogLocale: "sk_SK",
    },
  },
  blog: {
    en: {
      title: "Notes from inside the work — ETEREO",
      description:
        "Write-ups from live software programmes: strangler patterns that survive a real business, what a two-week audit should produce, and cutting cloud spend without a migration freeze.",
      ogLocale: "en_GB",
    },
    sk: {
      title: "Poznámky priamo z práce — ETEREO",
      description:
        "Zápisky z bežiacich programov: strangler vzory, ktoré prežijú stret s reálnou firmou, čo má priniesť dvojtýždňový audit, a ako znížiť cloudové náklady bez zmrazenia migrácie.",
      ogLocale: "sk_SK",
    },
  },
};

import { useEffect } from "react";
import { SITE, langUrl } from "../config";
import { useUI, type Lang } from "../store";
import { keywords, structuredData, type Page } from "./structuredData";

const PATHS: Record<Page, string> = {
  home: "/",
  projects: "/projects/",
  about: "/about/",
  blog: "/blog/",
};

/** Per-page, per-language title + meta description. Kept tight for the SERP snippet. */
const META: Record<Page, Record<Lang, { title: string; description: string; ogLocale: string }>> = {
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
      title: "Case studies — ETEREO | Software Development & Digital Transformation",
      description:
        "Three ETEREO programmes described in full: a core banking replatform with no planned downtime, a dispatch SaaS taken from zero to 40 enterprise tenants, and an offline-first clinician app on a compliance-first platform.",
      ogLocale: "en_GB",
    },
    sk: {
      title: "Prípadové štúdie — ETEREO | Vývoj softvéru a digitálna transformácia",
      description:
        "Tri programy ETEREO popísané celé: prestavba jadra banky bez plánovaného výpadku, dispečerský SaaS od nuly po 40 firemných zákazníkov a offline-first aplikácia pre lekárov na platforme so súladom od prvého dňa.",
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

/** upsert a <meta> by name or property. */
function meta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

/** upsert a <link rel> (optionally keyed by hreflang) and return it. */
function link(rel: string, href: string, hreflang?: string) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(sel);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keeps the document head in sync with the active language: title, description,
 * canonical, hreflang alternates, Open Graph / Twitter cards and the JSON-LD graph.
 * Runs entirely at runtime so a language switch updates every signal without a reload,
 * while index.html carries a full static copy for crawlers that never run JS.
 */
export function SeoHead({ page = "home" }: { page?: Page }) {
  const lang = useUI((s) => s.lang);

  useEffect(() => {
    const m = META[page][lang];
    const path = PATHS[page];
    const canonical = langUrl(lang, path);
    const ogImageAbs = `${SITE.url}${SITE.ogImage}`;

    document.documentElement.lang = lang;
    document.title = m.title;

    meta("name", "description", m.description);
    meta("name", "keywords", keywords(lang).join(", "));

    // canonical + hreflang alternates (single-page site → ?lang variants)
    link("canonical", canonical);
    link("alternate", langUrl("en", path), "en");
    link("alternate", langUrl("sk", path), "sk");
    link("alternate", `${SITE.url}${path}`, "x-default");

    // Open Graph
    meta("property", "og:type", "website");
    meta("property", "og:site_name", SITE.name);
    meta("property", "og:title", m.title);
    meta("property", "og:description", m.description);
    meta("property", "og:url", canonical);
    meta("property", "og:image", ogImageAbs);
    meta("property", "og:locale", m.ogLocale);
    meta("property", "og:locale:alternate", lang === "en" ? "sk_SK" : "en_GB");

    // Twitter / X
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", m.title);
    meta("name", "twitter:description", m.description);
    meta("name", "twitter:image", ogImageAbs);

    // JSON-LD structured data (replace the managed node each language change)
    const ID = "ld-json-runtime";
    let script = document.getElementById(ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = ID;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData(lang, page));
  }, [lang, page]);

  return null;
}

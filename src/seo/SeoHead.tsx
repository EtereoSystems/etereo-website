import { useEffect } from "react";
import { SITE, langUrl } from "../config";
import { useUI } from "../store";
import { keywords, structuredData, type Page } from "./structuredData";
import { META, PATHS } from "./pages";

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

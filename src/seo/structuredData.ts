import { SITE, langUrl } from "../config";
import { content } from "../i18n/content";
import type { Lang } from "../store";

/**
 * JSON-LD structured data. This is the single strongest signal for both classic
 * rich results (Google) and generative engines (ChatGPT, Claude, Perplexity,
 * Google AI): it states, in machine-readable form, who ETEREO is, what it does,
 * where it operates and what it can answer.
 *
 * Everything here is factual — no invented ratings, review counts or awards.
 */

const KEYWORDS_EN = [
  "software development company",
  "digital transformation",
  "legacy system modernisation",
  "custom software development",
  "SaaS product development",
  "mobile app development",
  "web platform engineering",
  "cloud & DevOps",
  "software house Slovakia",
  "software development Bratislava",
];

const KEYWORDS_SK = [
  "softvérová firma",
  "vývoj softvéru",
  "digitálna transformácia",
  "modernizácia starších systémov",
  "softvér na mieru",
  "vývoj SaaS produktov",
  "vývoj mobilných aplikácií",
  "webové platformy",
  "cloud a DevOps",
  "vývoj softvéru Bratislava",
];

export function keywords(lang: Lang): string[] {
  return lang === "sk" ? KEYWORDS_SK : KEYWORDS_EN;
}

/** ProfessionalService is a LocalBusiness subtype — carries both the org identity
 *  and the local/geo signals in one node. */
function professionalService(lang: Lang) {
  const c = content[lang];
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: `${SITE.url}/`,
    email: SITE.email,
    slogan: c.hero.tagline,
    description: c.hero.sub,
    image: `${SITE.url}${SITE.ogImage}`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/favicon.svg`,
    },
    founders: SITE.founders.map((name) => ({ "@type": "Person", name })),
    foundingDate: "2026",
    knowsLanguage: ["en", "sk"],
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    areaServed: SITE.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
    knowsAbout: keywords(lang),
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
    // the six disciplines, exposed as an offer catalog
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: c.services.title,
      itemListElement: c.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.body,
        },
      })),
    },
  };
}

function webSite(lang: Lang) {
  const c = content[lang];
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: c.hero.sub,
    inLanguage: lang,
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

function faqPage(lang: Lang) {
  const c = content[lang];
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    inLanguage: lang,
    mainEntity: c.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function webPage(lang: Lang) {
  const c = content[lang];
  return {
    "@type": "WebPage",
    "@id": `${langUrl(lang)}#webpage`,
    url: langUrl(lang),
    name: `${SITE.name} — ${SITE.slogan}`,
    description: c.hero.sub,
    inLanguage: lang,
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#organization` },
  };
}

/** Full JSON-LD graph for the current language. */
export function structuredData(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [professionalService(lang), webSite(lang), webPage(lang), faqPage(lang)],
  };
}

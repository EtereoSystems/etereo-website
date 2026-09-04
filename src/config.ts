/**
 * Single source of truth for everything SEO / identity related.
 *
 * The domain comes from VITE_SITE_URL (see .env) so it is set in ONE place and
 * flows into: canonical + hreflang links, Open Graph / Twitter tags, the
 * JSON-LD structured data, and the generated robots.txt / sitemap.xml / llms.txt.
 *
 * When the domain is decided, change VITE_SITE_URL in .env and rebuild — nothing
 * else needs touching.
 */

const RAW_URL = (import.meta.env.VITE_SITE_URL as string | undefined) || "https://www.etereo.sk";
// normalise: no trailing slash
export const SITE_URL = RAW_URL.replace(/\/+$/, "");

export const SITE = {
  url: SITE_URL,
  /** trading / brand name */
  name: "ETEREO",
  /** full legal entity */
  legalName: "ETEREO s.r.o.",
  /** one-liner used as a default meta description fallback */
  slogan: "Software engineering & digital transformation",
  email: "hello@etereo.sk",
  /** founders — used in Organization structured data */
  founders: ["Patrik Klimko", "Matej Kučera"],
  address: {
    city: "Bratislava",
    region: "Bratislavský kraj",
    country: "SK",
    countryName: "Slovakia",
  },
  /** approximate studio geo (Bratislava) — helps local/AI answers */
  geo: { lat: 48.1486, lng: 17.1077 },
  /** areas we serve, for LocalBusiness / ProfessionalService schema */
  areaServed: ["Slovakia", "Czechia", "Austria", "European Union", "Worldwide"],
  /** social / profile links — fill these in as they go live (drives sameAs) */
  sameAs: [
    // "https://www.linkedin.com/company/etereo",
    // "https://github.com/etereo",
    // "https://x.com/etereo",
  ] as string[],
  /** default social share image (lives in /public) */
  ogImage: "/og.svg",
  /** supported languages; the first is the default */
  langs: ["en", "sk"] as const,
} as const;

/** Absolute URL for a given language variant of the single-page site. */
export function langUrl(lang: "en" | "sk"): string {
  return lang === SITE.langs[0] ? `${SITE.url}/` : `${SITE.url}/?lang=${lang}`;
}

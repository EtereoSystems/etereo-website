import { readFileSync } from "node:fs";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { META, PATHS } from "../src/seo/pages";
import { keywords, structuredData, type Page } from "../src/seo/structuredData";
import { SITE, langUrl } from "../src/config";
import viteConfig from "../vite.config";
import type { Lang } from "../src/store";

const root = resolve(import.meta.dirname, "..");
const LANGS = SITE.langs as readonly Lang[];

/**
 * Adding a page means touching five places (entry HTML, vite input, PATHS, META,
 * structuredData, scripts/seo.mjs). This Record is typed on `Page`, so adding a page to
 * the union without listing it here fails `tsc` — and then these tests check the rest.
 */
const PAGES: Record<Page, { entry: string }> = {
  home: { entry: "index.html" },
  projects: { entry: "projects/index.html" },
  about: { entry: "about/index.html" },
  blog: { entry: "blog/index.html" },
};
const pages = Object.keys(PAGES) as Page[];

/** The generator's `paths` array, read as text: importing the script would run it. */
const seoScript = readFileSync(resolve(root, "scripts/seo.mjs"), "utf8");
const viteInputs = Object.values(
  (viteConfig as { build: { rollupOptions: { input: Record<string, string> } } }).build
    .rollupOptions.input,
);

describe.each(pages)("page %s", (page) => {
  const path = PATHS[page];

  it("has a directory-style path", () => {
    expect(path.startsWith("/")).toBe(true);
    expect(path.endsWith("/")).toBe(true);
  });

  it("has an entry HTML on disk", () => {
    expect(existsSync(resolve(root, PAGES[page].entry))).toBe(true);
  });

  it("is registered as a vite input", () => {
    expect(viteInputs).toContain(PAGES[page].entry);
  });

  it("is in the sitemap generator's paths", () => {
    expect(seoScript).toContain(`path: "${path}"`);
  });

  it.each(LANGS)("has %s metadata", (lang) => {
    const m = META[page][lang];
    expect(m.title.trim()).not.toBe("");
    expect(m.description.trim()).not.toBe("");
    // Google truncates a snippet well before this; anything longer is wasted.
    expect(m.description.length).toBeLessThanOrEqual(320);
    expect(m.ogLocale).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
  });

  it.each(LANGS)("has a %s JSON-LD graph", (lang) => {
    const data = structuredData(lang, page) as Record<string, unknown>;
    expect(data["@context"]).toBe("https://schema.org");
    // Must survive the JSON.stringify SeoHead does into the <script> tag.
    expect(() => JSON.parse(JSON.stringify(data))).not.toThrow();
    expect(JSON.stringify(data)).not.toContain("undefined");
  });
});

describe("titles and descriptions", () => {
  it("are unique per page so pages do not compete in search", () => {
    for (const lang of LANGS) {
      const titles = pages.map((p) => META[p][lang].title);
      expect(new Set(titles).size, `duplicate ${lang} title`).toBe(titles.length);
      const descriptions = pages.map((p) => META[p][lang].description);
      expect(new Set(descriptions).size, `duplicate ${lang} description`).toBe(descriptions.length);
    }
  });
});

describe("langUrl", () => {
  it("leaves the default language bare and marks the others", () => {
    expect(langUrl("en", "/about/")).toBe(`${SITE.url}/about/`);
    expect(langUrl("sk", "/about/")).toBe(`${SITE.url}/about/?lang=sk`);
  });

  it("normalises a missing trailing slash", () => {
    expect(langUrl("en", "/about")).toBe(`${SITE.url}/about/`);
  });

  it("has no trailing slash on the site URL itself", () => {
    expect(SITE.url).not.toMatch(/\/$/);
  });
});

describe("keywords", () => {
  it.each(LANGS)("returns a non-empty unique list for %s", (lang) => {
    const k = keywords(lang);
    expect(k.length).toBeGreaterThan(0);
    expect(new Set(k).size).toBe(k.length);
    expect(k.every((x) => x.trim() !== "")).toBe(true);
  });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const ENTRIES = ["index.html", "projects/index.html", "about/index.html", "blog/index.html"];
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

/**
 * Every entry carries a short list of things that exist only to stop a white flash, and
 * that a routine edit can silently drop. None of them is visible in a dev server on a
 * fast connection, so nothing else would notice their absence.
 */
describe.each(ENTRIES)("%s", (entry) => {
  const html = read(entry);

  it("paints its background during parse, from an inline literal", () => {
    const inline = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
    // A literal, not var(--bg): --bg lives in the stylesheet we are not waiting for.
    expect(inline).toMatch(/background:\s*#060811/);
    expect(inline).toMatch(/color-scheme:\s*dark/);
  });

  it("preloads both text fonts as CORS requests", () => {
    for (const font of ["inter-latin.woff2", "space-grotesk-latin.woff2"]) {
      const tag = html.match(new RegExp(`<link rel="preload"[^>]*${font}[^>]*>`))?.[0];
      expect(tag, `no preload for ${font}`).toBeTruthy();
      expect(tag).toContain(`as="font"`);
      // Fonts are fetched in CORS mode even same-origin; without this the preload is
      // ignored and the file is fetched twice.
      expect(tag).toContain("crossorigin");
    }
  });

  it("flags JS support before first paint", () => {
    expect(html).toContain(`document.documentElement.setAttribute("data-js", "")`);
  });

  it("carries a static head for crawlers that never run JS", () => {
    expect(html).toMatch(/<title>[^<]+<\/title>/);
    expect(html).toMatch(/<meta\s+name="description"/);
    expect(html).toContain(`<link rel="canonical" href="%VITE_SITE_URL%`);
    for (const hreflang of ["en", "sk", "x-default"]) {
      expect(html, `no ${hreflang} alternate`).toContain(`hreflang="${hreflang}"`);
    }
  });
});

describe("index.html boot shell", () => {
  const html = read("index.html");

  it("ships both fallbacks", () => {
    expect(html).toContain("boot-hero");
    expect(html).toContain("boot-doc");
  });

  it("hides whichever fallback does not apply", () => {
    expect(html).toMatch(/html\[data-js\]\s*\.boot-doc/);
    expect(html).toMatch(/html:not\(\[data-js\]\)\s*\.boot-hero/);
  });

  // A Slovak visitor seeing an English first screen is worse than the delay it removes,
  // so every translated node in the shell is duplicated and one is hidden by CSS.
  it("ships every shell string in both languages", () => {
    const en = html.match(/data-l="en"/g)?.length ?? 0;
    const sk = html.match(/data-l="sk"/g)?.length ?? 0;
    expect(en).toBeGreaterThan(0);
    expect(sk).toBe(en);
  });

  it("picks the shell language with the same rules as detectLang", () => {
    const script = html.match(/<script>([\s\S]*?)<\/script>/g)?.join("\n") ?? "";
    expect(script).toContain("data-boot-lang");
    expect(script).toContain("etereo.lang"); // same storage key as src/i18n/lang.ts
    expect(script).toMatch(/lang/); // reads the ?lang= param
    expect(script).toMatch(/\bcs\b/); // cs maps to sk, as detectLang does
  });

  it("defaults to English when the boot script never ran", () => {
    expect(html).toMatch(/html:not\(\[data-boot-lang="sk"\]\)\s*\[data-l="sk"\]/);
  });
});

import { describe, expect, it } from "vitest";
import { content } from "../src/i18n/content";
import { SITE } from "../src/config";
import type { Lang } from "../src/store";

const LANGS = SITE.langs as readonly Lang[];

/**
 * The tree with every leaf replaced by its type name. Comparing two of these catches
 * what the `Content` interface cannot: an array that grew in one language only, or an
 * optional field filled in on one side. The interface enforces the keys; this enforces
 * that both languages actually say the same amount.
 */
function shape(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(shape);
  if (v && typeof v === "object") {
    return Object.fromEntries(
      Object.keys(v as object)
        .sort()
        .map((k) => [k, shape((v as Record<string, unknown>)[k])]),
    );
  }
  return typeof v;
}

/** Every leaf as [dotted.path, value], so a failure names the field. */
function leaves(v: unknown, path = ""): [string, unknown][] {
  if (Array.isArray(v)) return v.flatMap((x, i) => leaves(x, `${path}[${i}]`));
  if (v && typeof v === "object") {
    return Object.entries(v as object).flatMap(([k, x]) => leaves(x, path ? `${path}.${k}` : k));
  }
  return [[path, v]];
}

describe("content", () => {
  it("has the same shape in every language", () => {
    const en = shape(content.en);
    for (const lang of LANGS.filter((l) => l !== "en")) {
      expect(shape(content[lang]), `${lang} drifted from en`).toEqual(en);
    }
  });

  // Declared on the interface, blank in both languages, and read by nothing: the Work
  // section renders `note` in the slot a sub would take. Listed so a NEW blank still fails.
  const KNOWN_BLANK = new Set(["work.sub"]);

  it.each(LANGS)("%s has no blank copy", (lang) => {
    for (const [path, value] of leaves(content[lang])) {
      if (typeof value !== "string" || KNOWN_BLANK.has(path)) continue;
      expect(value.trim(), `blank at ${lang}.${path}`).not.toBe("");
    }
  });

  it.each(LANGS)("%s has no placeholder copy left in", (lang) => {
    // "TBD"/"Lorem" reaching production is the failure mode; the site's own
    // "illustrative" disclaimers are deliberate copy and stay.
    const banned = /\b(lorem ipsum|todo|tbd|fixme|xxx+|placeholder text)\b/i;
    for (const [path, value] of leaves(content[lang])) {
      if (typeof value !== "string") continue;
      expect(value, `placeholder at ${lang}.${path}`).not.toMatch(banned);
    }
  });
});

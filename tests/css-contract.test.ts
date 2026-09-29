import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (p: string) => readFileSync(resolve(root, p), "utf8");

function walk(dir: string): string[] {
  return readdirSync(resolve(root, dir), { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.tsx?$/.test(e.name) ? [p] : [];
  });
}

const css = ["src/styles/global.css", "src/styles/components.css"].map(read).join("\n");
const sources = walk("src").map((p) => [p, read(p)] as const);

const unique = <T,>(xs: T[]) => [...new Set(xs)];
const matchAll = (s: string, re: RegExp) => unique([...s.matchAll(re)].map((m) => m[1]));

/** `var(--x)` anywhere in the stylesheets. */
const cssReads = matchAll(css, /var\((--[a-z0-9-]+)/g);
/** `--x:` as a declaration, i.e. defined by the CSS itself. */
const cssDefines = matchAll(css, /^\s*(--[a-z0-9-]+)\s*:/gm);

/**
 * Custom properties a component hands to the CSS, in the three forms this codebase
 * uses: a plain style key, a computed one (`["--accent" as string]`), and setProperty.
 */
const componentSets = new Map<string, string[]>();
for (const [file, text] of sources) {
  const found = [
    ...matchAll(text, /"(--[a-z0-9-]+)"\s*:/g),
    ...matchAll(text, /\[\s*"(--[a-z0-9-]+)"[^\]]*\]\s*:/g),
    ...matchAll(text, /setProperty\(\s*"(--[a-z0-9-]+)"/g),
  ];
  for (const prop of unique(found)) {
    componentSets.set(prop, [...(componentSets.get(prop) ?? []), file]);
  }
}

/**
 * Attributes a component toggles for CSS to select on, as CSS spells them. Three forms:
 * a literal key, `setAttribute`, and an indexed write whose names only exist in the
 * helper's type (`flag(k: "scrolling" | "scrolled")` in App.tsx).
 */
const kebab = (k: string) => "data-" + k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
const datasetFlags = unique(
  sources.flatMap(([, text]) => [
    ...matchAll(text, /dataset\.([A-Za-z][\w]*)\s*=/g).map(kebab),
    ...matchAll(text, /dataset\[\s*"([A-Za-z-]+)"\s*\]\s*=/g).map(kebab),
    ...matchAll(text, /setAttribute\(\s*"data-([a-z-]+)"/g).map((k) => "data-" + k),
    ...[...text.matchAll(/dataset\[\s*([A-Za-z_$][\w$]*)\s*\]/g)].flatMap((m) => {
      const union = text.match(new RegExp(m[1] + String.raw`\s*:\s*((?:"[A-Za-z-]+"\s*\|?\s*)+)`));
      return union ? matchAll(union[1], /"([A-Za-z-]+)"/g).map(kebab) : [];
    }),
  ]),
);

/**
 * The CSS and the components form a contract in both directions, and a whole-file
 * overwrite of one side breaks it in silence: nothing fails to compile, nothing throws,
 * the styling is simply gone. This is how `components.css` lost the mobile menu in
 * b052915 while `Nav.tsx` went on setting `--i` and `aria-expanded` for rules that no
 * longer existed.
 */
describe("what components set, the CSS reads", () => {
  // Guards the scanner itself: a regex that quietly stopped matching would make every
  // assertion below vacuously true.
  it("finds the properties this codebase is known to hand over", () => {
    expect([...componentSets.keys()]).toEqual(
      expect.arrayContaining(["--accent", "--handoff", "--hero-fade", "--i"]),
    );
  });

  it.each([...componentSets.entries()])("%s is read by the CSS", (prop, files) => {
    expect(cssReads, prop + " is set in " + files.join(", ") + " but no rule reads it").toContain(
      prop,
    );
  });
});

describe("what the CSS reads, something defines", () => {
  it.each(cssReads)("%s is defined in CSS or set by a component", (prop) => {
    const known = cssDefines.includes(prop) || componentSets.has(prop);
    expect(known, "var(" + prop + ") resolves to nothing: no declaration, nothing sets it").toBe(
      true,
    );
  });
});

describe("state the components toggle, the CSS selects on", () => {
  it("finds the flags this codebase is known to write", () => {
    expect(datasetFlags).toEqual(expect.arrayContaining(["data-scrolled", "data-scrolling"]));
  });

  it.each(datasetFlags)("%s has a rule", (attr) => {
    expect(css, attr + " is written by a component but no selector uses it").toContain("[" + attr);
  });

  // The burger's own aria-expanded drives the fold, so the picture and the announced
  // state cannot drift. Losing the rule leaves a button that toggles nothing visible.
  it("styles the burger from its aria-expanded", () => {
    expect(read("src/components/Nav.tsx")).toMatch(/aria-expanded=\{/);
    expect(css).toContain('[aria-expanded="true"]');
  });
});

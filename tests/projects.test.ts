import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { PANELS, PROJECTS, PROJECT_COUNT } from "../src/i18n/projects";
import { SITE } from "../src/config";
import type { Lang } from "../src/store";

const root = resolve(import.meta.dirname, "..");
const LANGS = SITE.langs as readonly Lang[];
const TEMPLATES = ["ops", "analytics", "mobile", "map"];

describe("PROJECTS", () => {
  it("is not empty and matches PROJECT_COUNT", () => {
    expect(PROJECTS.length).toBeGreaterThan(0);
    expect(PROJECT_COUNT).toBe(PROJECTS.length);
  });

  it("has unique slugs and ids", () => {
    expect(new Set(PROJECTS.map((p) => p.slug)).size).toBe(PROJECTS.length);
    expect(new Set(PROJECTS.map((p) => p.id)).size).toBe(PROJECTS.length);
  });

  it.each(PROJECTS.map((p) => [p.slug, p] as const))("%s is url-safe and described", (slug, p) => {
    expect(slug).toMatch(/^[a-z0-9-]+$/);
    expect(p.id).toMatch(/^\d{2}$/);
    expect(p.stack.trim()).not.toBe("");
  });

  // The fake product UI is rasterised into a CanvasTexture by screenTexture.ts, which
  // renders one of four templates and expects something in every field it draws.
  it.each(PROJECTS.map((p) => [p.slug, p.screen] as const))("%s draws a screen", (_slug, s) => {
    expect(TEMPLATES).toContain(s.template);
    expect(s.accent).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(s.title.trim()).not.toBe("");
    expect(s.subtitle.trim()).not.toBe("");
    expect(s.kpis.length).toBeGreaterThan(0);
    expect(s.rows.length).toBeGreaterThan(0);
    for (const k of s.kpis) {
      expect(k.v.trim()).not.toBe("");
      expect(k.l.trim()).not.toBe("");
    }
  });

  // Fetched on demand, one beat ahead: a missing file is a blank laptop screen mid-scroll
  // and an empty <img> on /projects/, with nothing failing at build time.
  it.each(PROJECTS.map((p) => p.slug))("%s has its screenshot on disk", (slug) => {
    expect(existsSync(resolve(root, `public/screens/screen-${slug}.webp`))).toBe(true);
  });

  it("links out with a label and an absolute url", () => {
    for (const p of PROJECTS) {
      for (const l of p.links ?? []) {
        expect(l.label.trim()).not.toBe("");
        expect(l.href).toMatch(/^https?:\/\//);
      }
    }
  });
});

describe("PANELS", () => {
  it.each(LANGS)("%s has one panel per project", (lang) => {
    expect(PANELS[lang]).toHaveLength(PROJECT_COUNT);
  });

  it.each(LANGS)("%s fills every panel's required copy", (lang) => {
    PANELS[lang].forEach((panel, i) => {
      const where = `${lang} panel ${i} (${PROJECTS[i].slug})`;
      expect(panel.name.trim(), where).not.toBe("");
      expect(panel.sector.trim(), where).not.toBe("");
      expect(panel.blurb.trim(), where).not.toBe("");
      for (const m of panel.metrics) {
        expect(m.v.trim(), where).not.toBe("");
        expect(m.l.trim(), where).not.toBe("");
      }
    });
  });

  /**
   * `name` and `sector` are translated, so the lists cannot be aligned by comparing them —
   * only their structure. A project whose optional long form is filled in on one side only
   * renders a detail page with empty sections in the other language.
   */
  const LONG_FORM_GAP = new Set(["ecostruxure-it", "beumer-localchat", "aperia"]);

  it("gives each project the same panel structure in every language", () => {
    PROJECTS.forEach((project, i) => {
      if (LONG_FORM_GAP.has(project.slug)) return;
      const keys = LANGS.map((lang) =>
        Object.entries(PANELS[lang][i])
          .filter(([, v]) => v !== undefined)
          .map(([k]) => k)
          .sort(),
      );
      for (const k of keys.slice(1)) expect(k, `${project.slug} differs by language`).toEqual(keys[0]);
    });
  });

  // Records the gap above instead of hiding it: shrinking the list keeps this green,
  // adding a fourth untranslated long form turns it red.
  it("has no long-form gap beyond the known three", () => {
    const missing = PROJECTS.filter(
      (_p, i) => PANELS.en[i].challenge && !PANELS.sk[i].challenge,
    ).map((p) => p.slug);
    for (const slug of missing) {
      expect([...LONG_FORM_GAP], `${slug} has an EN long form with no SK counterpart`).toContain(slug);
    }
  });
});

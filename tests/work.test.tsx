import { render, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Work } from "../src/sections/Sections";
import { WORK_PROJECTS } from "../src/data/work";
import { content } from "../src/i18n/content";
import { SITE } from "../src/config";
import { useUI, type Lang } from "../src/store";

const LANGS = SITE.langs as readonly Lang[];

function renderWork(lang: Lang) {
  useUI.setState({ lang });
  return render(<Work />).container.querySelectorAll<HTMLElement>("article.work");
}

// src/data/ sits outside content.ts, so content-parity's blank-copy check never sees it.
function texts(v: unknown): Record<string, string>[] {
  if (Array.isArray(v)) return v.flatMap(texts);
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    return LANGS.every((l) => typeof o[l] === "string") ? [o as Record<string, string>] : Object.values(o).flatMap(texts);
  }
  return [];
}

describe("projects (#work)", () => {
  it("has copy in every language for every project", () => {
    for (const t of texts(WORK_PROJECTS)) {
      for (const l of LANGS) expect(t[l].trim(), `blank ${l} in ${JSON.stringify(t)}`).not.toBe("");
    }
  });

  it("links out or is confidential, never both", () => {
    for (const p of WORK_PROJECTS) expect(Boolean(p.url) && Boolean(p.confidential), p.id).toBe(false);
  });

  it.each(LANGS)("%s: renders every project with its tag, description and both cells", (lang) => {
    const cards = renderWork(lang);
    expect(cards).toHaveLength(WORK_PROJECTS.length);
    WORK_PROJECTS.forEach((p, i) => {
      const card = cards[i];
      expect(within(card).getByRole("heading", { level: 3 }).textContent).toBe(p.title[lang]);
      expect(card.querySelector(".chip")?.textContent).toBe(p.tag[lang]);
      expect(card.querySelector(".work__desc")?.textContent).toBe(p.description[lang]);
      expect([...card.querySelectorAll("dd")].map((d) => d.textContent)).toEqual(p.cells.map((c) => c.value[lang]));
    });
  });

  it.each(LANGS)("%s: opens a live site in a new tab, with the project in the link's name", (lang) => {
    const w = content[lang].work;
    renderWork(lang).forEach((card, i) => {
      const p = WORK_PROJECTS[i];
      const links = card.querySelectorAll("a");
      if (!p.url) {
        expect(links, p.id).toHaveLength(0);
        expect(card.querySelector(".work__badge")?.textContent).toBe(w.confidential);
        return;
      }
      expect(links).toHaveLength(1);
      const a = links[0];
      expect(a.getAttribute("href")).toBe(p.url);
      expect(a.getAttribute("target")).toBe("_blank");
      expect(a.getAttribute("rel")).toBe("noopener noreferrer");
      // the accessible name starts with the visible label (WCAG 2.5.3)
      expect(a.getAttribute("aria-label")).toBe(`${w.visit}: ${p.title[lang]} (${w.newTab})`);
      expect(card.querySelector(".work__badge")).toBeNull();
    });
  });

  it.each(LANGS)("%s: ends with a link to the Projects page", (lang) => {
    useUI.setState({ lang });
    const { container } = render(<Work />);
    const a = container.querySelector(".work-more a");
    expect(a?.getAttribute("href")).toBe("/projects/");
    expect(a?.textContent).toBe(content[lang].work.all);
  });
});

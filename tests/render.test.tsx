import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import AboutPage from "../src/pages/AboutPage";
import BlogPage from "../src/pages/BlogPage";
import ProjectsPage from "../src/pages/ProjectsPage";
import { Contact } from "../src/components/Contact";
import { Footer } from "../src/components/Footer";
import { Nav } from "../src/components/Nav";
import * as Sections from "../src/sections/Sections";
import { SITE } from "../src/config";
import { useUI, type Lang } from "../src/store";

const LANGS = SITE.langs as readonly Lang[];

/**
 * The deploy that prompted this suite broke on a CTA reading a content field the
 * interface never declared. `tsc` catches the missing declaration; this catches the
 * other half — a declared field that renders as nothing because no copy was written.
 */
function expectNoEmptyLabels(root: HTMLElement) {
  for (const el of root.querySelectorAll("a, button, h1, h2, h3")) {
    // An icon-only control is fine as long as it carries a name some other way —
    // .nav__burger is two bare <span>s plus an aria-label, and that counts.
    const name =
      el.textContent?.trim() ||
      el.getAttribute("aria-label") ||
      el.getAttribute("title") ||
      el.querySelector("svg[aria-label], img[alt]:not([alt=''])")?.tagName ||
      "";
    expect(name, `unlabelled <${el.tagName.toLowerCase()} class="${el.className}">`).not.toBe("");
  }
}

function expectNoLeakedPlaceholders(root: HTMLElement) {
  const text = root.textContent ?? "";
  for (const leak of ["undefined", "[object Object]", "NaN"]) {
    expect(text, `rendered "${leak}"`).not.toContain(leak);
  }
}

const PAGES = { AboutPage, BlogPage, ProjectsPage } as const;
const SECTIONS = { ...Sections, Contact };

describe.each(LANGS)("rendered in %s", (lang) => {
  beforeEach(() => {
    useUI.setState({ lang });
  });

  it.each(Object.keys(PAGES) as (keyof typeof PAGES)[])("%s has no empty labels", (name) => {
    const { container } = render(<PagesEntry name={name} />);
    expectNoEmptyLabels(container);
    expectNoLeakedPlaceholders(container);
  });

  it.each(Object.keys(SECTIONS) as (keyof typeof SECTIONS)[])("%s has no empty labels", (name) => {
    const Section = SECTIONS[name];
    const { container } = render(<Section />);
    expectNoEmptyLabels(container);
    expectNoLeakedPlaceholders(container);
  });
});

function PagesEntry({ name }: { name: keyof typeof PAGES }) {
  const Page = PAGES[name];
  return <Page />;
}

describe("subpage chrome", () => {
  beforeEach(() => {
    useUI.setState({ lang: "en" });
  });

  // Nav/Footer anchors are prefixed per page (base="" on home, "/" on a subpage), so a
  // subpage linking to a bare "#products" would scroll its own page instead of home.
  it.each([
    ["AboutPage", AboutPage],
    ["ProjectsPage", ProjectsPage],
    ["BlogPage", BlogPage],
  ] as const)("%s has no bare in-page anchors", (_name, Page) => {
    const { container } = render(<Page />);
    const bare = [...container.querySelectorAll<HTMLAnchorElement>("a[href^='#']")].map(
      (a) => a.getAttribute("href"),
    );
    expect(bare).toEqual([]);
  });
});

describe("home page anchors", () => {
  beforeEach(() => {
    useUI.setState({ lang: "en" });
  });

  // Renaming a section's id breaks every link to it without an error: the link still
  // navigates, it just stops at the top of the page.
  it("every #anchor the nav and footer use has a target", () => {
    const { container } = render(
      <>
        <Nav />
        {Object.entries(SECTIONS).map(([name, Section]) => (
          <Section key={name} />
        ))}
        <Footer />
      </>,
    );
    const ids = [...container.querySelectorAll("[id]")].map((el) => el.id);
    const targets = [...container.querySelectorAll<HTMLAnchorElement>("a[href*='#']")]
      .map((a) => a.getAttribute("href")!.split("#")[1])
      // the hero's own id; rendering Hero would pull in the 3D stack
      .filter((id) => id !== "top");
    expect(targets.length).toBeGreaterThan(0);
    for (const id of targets) expect(ids, `#${id} has no target`).toContain(id);
  });

  // Products was #services, and bookmarks, search results and other sites still say so.
  it("keeps #services landing on the products section", () => {
    const { container } = render(<Sections.Products />);
    expect(container.querySelector("section#products #services")).not.toBeNull();
  });
});

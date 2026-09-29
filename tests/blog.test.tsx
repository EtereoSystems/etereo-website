import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { POSTS } from "../scripts/blog-posts.mjs";
import { content } from "../src/i18n/content";
import BlogPage from "../src/pages/BlogPage";
import { SITE } from "../src/config";
import { useUI, type Lang } from "../src/store";

const LANGS = SITE.langs as readonly Lang[];
const PER_PAGE = 10; // mirrors BlogPage's own constant

describe("POSTS", () => {
  it("is not empty and has unique slugs", () => {
    expect(POSTS.length).toBeGreaterThan(0);
    expect(new Set(POSTS.map((p) => p.slug)).size).toBe(POSTS.length);
  });

  it.each(POSTS.map((p) => [p.slug, p] as const))("%s is complete", (slug, post) => {
    expect(slug).toMatch(/^[a-z0-9-]+$/);
    expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(Date.parse(post.date))).toBe(false);
    expect(post.readMin).toBeGreaterThan(0);
    expect(post.author.trim()).not.toBe("");

    for (const field of ["tag", "keywords", "title", "description", "excerpt", "body"] as const) {
      for (const lang of LANGS) {
        expect(post[field][lang]?.trim(), `${slug}.${field}.${lang}`).not.toBe("");
      }
    }
  });

  // Bodies are authored HTML emitted verbatim by gen-blog.mjs, so an unclosed tag ships
  // as an unclosed tag. This is a shallow check: balance, not validity.
  it.each(POSTS.map((p) => [p.slug, p] as const))("%s has balanced block tags", (slug, post) => {
    for (const lang of LANGS) {
      const html = post.body[lang];
      for (const tag of ["p", "h2", "h3", "ul", "ol", "li", "strong"]) {
        const open = html.match(new RegExp(`<${tag}(\s[^>]*)?>`, "g"))?.length ?? 0;
        const close = html.match(new RegExp(`</${tag}>`, "g"))?.length ?? 0;
        expect(close, `${slug}.${lang}: <${tag}> opened ${open}, closed ${close}`).toBe(open);
      }
    }
  });
});

describe("the listing mirrors POSTS", () => {
  it.each(LANGS)("%s lists every post exactly once", (lang) => {
    const items = content[lang].insights.items;
    expect(items).toHaveLength(POSTS.length);
    expect(new Set(items.map((i) => i.slug)).size).toBe(items.length);
    expect([...items.map((i) => i.slug)].sort()).toEqual([...POSTS.map((p) => p.slug)].sort());
  });

  it.each(LANGS)("%s carries each post's own title and tag", (lang) => {
    const bySlug = new Map(POSTS.map((p) => [p.slug, p]));
    for (const item of content[lang].insights.items) {
      const post = bySlug.get(item.slug);
      expect(post, `no post for listing slug ${item.slug}`).toBeDefined();
      expect(item.title, `${item.slug} title`).toBe(post!.title[lang]);
      expect(item.tag, `${item.slug} tag`).toBe(post!.tag[lang]);
      expect(item.date, `${item.slug} date`).toBe(post!.date);
      expect(item.read).toMatch(/\d+\s*min/);
    }
  });

  it("lists newest first", () => {
    for (const lang of LANGS) {
      const dates = content[lang].insights.items.map((i) => i.date);
      expect([...dates], `${lang} listing is out of order`).toEqual(
        [...dates].sort().reverse(),
      );
    }
  });
});

describe("BlogPage pagination", () => {
  beforeEach(() => {
    useUI.setState({ lang: "en" });
  });

  const posts = (root: HTMLElement) => root.querySelectorAll(".posts > li");
  const firstTitle = (root: HTMLElement) => root.querySelector(".post h2")?.textContent;

  it(`shows ${PER_PAGE} posts per page`, () => {
    const { container } = render(<BlogPage />);
    expect(posts(container)).toHaveLength(PER_PAGE);
  });

  it("moves to a different set of posts on page 2", () => {
    const { container } = render(<BlogPage />);
    const first = firstTitle(container);
    expect(first).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    expect(firstTitle(container)).not.toBe(first);
    expect(posts(container)).toHaveLength(PER_PAGE);
  });

  it("offers exactly as many pages as the post count needs", () => {
    render(<BlogPage />);
    const last = Math.ceil(POSTS.length / PER_PAGE);
    expect(screen.getByRole("button", { name: `Page ${last}` })).toBeTruthy();
    expect(screen.queryByRole("button", { name: `Page ${last + 1}` })).toBeNull();
  });

  it("shows every post across all pages, with none repeated", () => {
    const { container } = render(<BlogPage />);
    const last = Math.ceil(POSTS.length / PER_PAGE);
    const seen: string[] = [];
    for (let page = 1; page <= last; page++) {
      if (page > 1) fireEvent.click(screen.getByRole("button", { name: `Page ${page}` }));
      seen.push(...[...container.querySelectorAll<HTMLAnchorElement>("a.post")].map((a) => a.pathname));
    }
    expect(new Set(seen).size).toBe(POSTS.length);
  });

  it("disables the step buttons at each end", () => {
    render(<BlogPage />);
    expect((screen.getByRole("button", { name: "Previous" }) as HTMLButtonElement).disabled).toBe(true);

    const last = Math.ceil(POSTS.length / PER_PAGE);
    fireEvent.click(screen.getByRole("button", { name: `Page ${last}` }));
    expect((screen.getByRole("button", { name: "Next" }) as HTMLButtonElement).disabled).toBe(true);
  });
});

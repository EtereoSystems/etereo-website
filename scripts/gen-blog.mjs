// Generates a self-contained, bilingual static page for every post at blog/<slug>/index.html.
// These are Vite inputs (see vite.config.ts) so Vite injects the hashed CSS and substitutes
// %VITE_SITE_URL%. The full article text of BOTH languages ships in the HTML (crawlers and AI
// read it without running JS); src/blog-post.ts only toggles language and the menu.
// Run by predev/prebuild — the output dirs are gitignored and regenerated on every build.

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { POSTS } from "./blog-posts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const WORDMARK = readFileSync(join(ROOT, "public/etereo-wordmark.svg"), "utf8")
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .trim();

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const NAV_LINKS = [
  { href: "/#services", en: "Services", sk: "Služby" },
  { href: "/#process", en: "Process", sk: "Postup" },
  { href: "/projects/", en: "Work", sk: "Projekty" },
  { href: "/#industries", en: "Industries", sk: "Odvetvia" },
  { href: "/about/", en: "About us", sk: "O nás" },
  { href: "/blog/", en: "Blog", sk: "Blog" },
];

const i18nSpan = (en, sk, cls = "") =>
  `<span${cls ? ` class="${cls}"` : ""} data-en="${esc(en)}" data-sk="${esc(sk)}">${esc(en)}</span>`;

function nav() {
  return `
    <header class="nav">
      <div class="nav__inner">
        <a href="/#top" class="nav__brand" aria-label="ETEREO home">
          <span class="wordmark nav__logo"><span class="wordmark__dot" aria-hidden></span><svg class="wordmark__text" viewBox="0 0 3020 480" role="img" aria-label="ETEREO">${WORDMARK}</svg></span>
        </a>
        <nav class="nav__links">
          ${NAV_LINKS.map((l) => `<a href="${l.href}">${i18nSpan(l.en, l.sk)}</a>`).join("\n          ")}
        </nav>
        <div class="nav__right">
          <div class="lang" role="group" aria-label="Language">
            <button class="on" data-lang-btn="en">EN</button><span>·</span><button data-lang-btn="sk">SK</button>
          </div>
          <a href="/#contact" class="btn btn--primary nav__cta">${i18nSpan("Start a project", "Začať projekt")}</a>
          <button class="nav__burger" aria-label="Menu"><span></span><span></span></button>
        </div>
      </div>
    </header>`;
}

function footer() {
  return `
    <footer class="footer">
      <div class="container footer__bar">
        <a href="/#top" class="nav__brand" aria-label="ETEREO home">
          <span class="wordmark"><span class="wordmark__dot" aria-hidden></span><svg class="wordmark__text" viewBox="0 0 3020 480" role="img" aria-label="ETEREO">${WORDMARK}</svg></span>
        </a>
        <span class="footer__tag">${i18nSpan("Built for the long run", "Stavané na dlhý beh")}</span>
      </div>
      <div class="container footer__bar">
        <span>© 2026 ETEREO s.r.o. ${i18nSpan("All rights reserved.", "Všetky práva vyhradené.")}</span>
        <a href="/blog/">${i18nSpan("← All articles", "← Všetky články")}</a>
      </div>
    </footer>`;
}

function fmtDate(iso, lang) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString(lang === "sk" ? "sk-SK" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function jsonLd(post) {
  const url = `%VITE_SITE_URL%/blog/${post.slug}/`;
  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title.en,
      description: post.description.en,
      inLanguage: "en",
      articleSection: post.tag.en,
      keywords: post.keywords.en,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Person", name: post.author },
      publisher: { "@id": "%VITE_SITE_URL%/#organization" },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      image: "%VITE_SITE_URL%/og.svg",
      url,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "%VITE_SITE_URL%/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "%VITE_SITE_URL%/blog/" },
        { "@type": "ListItem", position: 3, name: post.title.en, item: url },
      ],
    },
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function moreLinks(current) {
  const others = POSTS.filter((p) => p.slug !== current.slug).slice(0, 3);
  return `
        <nav class="article__more">
          <div class="article__more-title">${i18nSpan("More from the blog", "Ďalšie z blogu")}</div>
          <ul>
            ${others
              .map(
                (p) =>
                  `<li><a href="/blog/${p.slug}/"><span class="chip" style="border-color:var(--violet);color:var(--violet-2)">${i18nSpan(
                    p.tag.en,
                    p.tag.sk,
                  )}</span>${i18nSpan(p.title.en, p.title.sk, "article__more-name")}</a></li>`,
              )
              .join("\n            ")}
          </ul>
        </nav>`;
}

function page(post) {
  const url = `%VITE_SITE_URL%/blog/${post.slug}/`;
  const readEn = `${post.readMin} min read`;
  const readSk = `${post.readMin} min čítania`;
  return `<!doctype html>
<html lang="en"
  data-title-en="${esc(post.title.en + " — ETEREO")}"
  data-title-sk="${esc(post.title.sk + " — ETEREO")}"
  data-desc-en="${esc(post.description.en)}"
  data-desc-sk="${esc(post.description.sk)}">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#060811" />

    <title>${esc(post.title.en)} — ETEREO</title>
    <meta name="description" content="${esc(post.description.en)}" />
    <meta name="keywords" content="${esc(post.keywords.en)}" />
    <meta name="author" content="${esc(post.author)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="en" href="${url}" />
    <link rel="alternate" hreflang="sk" href="${url}?lang=sk" />
    <link rel="alternate" hreflang="x-default" href="${url}" />

    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="ETEREO" />
    <meta property="og:title" content="${esc(post.title.en)}" />
    <meta property="og:description" content="${esc(post.description.en)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="%VITE_SITE_URL%/og.svg" />
    <meta property="article:published_time" content="${post.date}" />
    <meta property="article:section" content="${esc(post.tag.en)}" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:locale:alternate" content="sk_SK" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(post.title.en)}" />
    <meta name="twitter:description" content="${esc(post.description.en)}" />
    <meta name="twitter:image" content="%VITE_SITE_URL%/og.svg" />

    <style>
      html { background: #060811; color-scheme: dark; }
    </style>
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/inter-latin.woff2" />
    <link rel="preload" as="font" type="font/woff2" crossorigin href="/fonts/space-grotesk-latin.woff2" />

    <!-- render-blocking so the page never paints unstyled (Vite rewrites these to the hashed
         build assets; in dev they are served render-blocking too, avoiding a flash of raw HTML) -->
    <link rel="stylesheet" href="../../src/styles/fonts.css" />
    <link rel="stylesheet" href="../../src/styles/global.css" />
    <link rel="stylesheet" href="../../src/styles/components.css" />

    <script type="application/ld+json">${jsonLd(post)}</script>
  </head>
  <body>
    <div id="root">${nav()}
      <main class="subpage article-page">
        <article class="article">
          <div class="container container--narrow">
            <a class="page-back" href="/blog/">${i18nSpan("All articles", "Všetky články")}</a>
            <div class="article__meta">
              <span class="chip">${i18nSpan(post.tag.en, post.tag.sk)}</span>
              <span class="article__dot">·</span>
              <time datetime="${post.date}"><span data-en="${esc(fmtDate(post.date, "en"))}" data-sk="${esc(
                fmtDate(post.date, "sk"),
              )}">${esc(fmtDate(post.date, "en"))}</span></time>
              <span class="article__dot">·</span>
              <span data-en="${esc(readEn)}" data-sk="${esc(readSk)}">${esc(readEn)}</span>
            </div>
            <h1 class="article__title"><span data-en="${esc(post.title.en)}" data-sk="${esc(
              post.title.sk,
            )}">${esc(post.title.en)}</span></h1>
            <p class="article__lead"><span data-en="${esc(post.excerpt.en)}" data-sk="${esc(
              post.excerpt.sk,
            )}">${esc(post.excerpt.en)}</span></p>
            <div class="article__byline">${i18nSpan("By " + post.author, "Autor: " + post.author)}</div>

            <div class="article__body" data-lang-body="en">${post.body.en}</div>
            <div class="article__body" data-lang-body="sk" hidden>${post.body.sk}</div>
${moreLinks(post)}
          </div>

          <section class="page-cta">
            <div class="container container--narrow">
              <h2>${i18nSpan("Have a system like the ones we write about?", "Máte systém, o akých píšeme?")}</h2>
              <p>${i18nSpan(
                "We start most engagements with a two-week audit. It ends in a plan you can fund.",
                "Väčšinu spoluprác začíname dvojtýždňovým auditom. Skončí plánom, ktorý viete financovať.",
              )}</p>
              <a class="btn btn--primary" href="/#contact">${i18nSpan(
                "Book a discovery call",
                "Dohodnúť si úvodný hovor",
              )}</a>
            </div>
          </section>
        </article>
      </main>${footer()}
    </div>
    <script type="module" src="/src/blog-post.ts"></script>
  </body>
</html>
`;
}

let n = 0;
for (const post of POSTS) {
  const dir = join(ROOT, "blog", post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(post));
  n++;
}
console.log(`gen-blog: wrote ${n} post pages`);

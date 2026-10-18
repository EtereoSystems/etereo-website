// Generates a self-contained, bilingual static page for every service at services/<slug>/index.html.
// These are Vite inputs (see vite.config.ts) so Vite injects the hashed CSS and substitutes
// %VITE_SITE_URL%. The full text of BOTH languages ships in the HTML (crawlers and AI read it
// without running JS); src/blog-post.ts (reused) only toggles language and the menu.
// Run by predev/prebuild — the output dirs are gitignored and regenerated on every build.

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { SERVICES } from "./services.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const WORDMARK = readFileSync(join(ROOT, "public/etereo-wordmark.svg"), "utf8")
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .trim();

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const NAV_LINKS = [
  { href: "/#products", en: "Products", sk: "Produkty" },
  { href: "/#process", en: "Process", sk: "Postup" },
  { href: "/projects/", en: "Work", sk: "Projekty" },
  { href: "/#industries", en: "Industries", sk: "Odvetvia" },
  { href: "/about/", en: "About us", sk: "O nás" },
  { href: "/blog/", en: "Blog", sk: "Blog" },
];

const i18nSpan = (en, sk, cls = "") =>
  `<span${cls ? ` class="${cls}"` : ""} data-en="${esc(en)}" data-sk="${esc(sk)}">${esc(en)}</span>`;

// one HTML field (already trusted markup) in both languages; blog-post.ts toggles [data-lang-body]
const i18nBody = (en, sk, cls = "") =>
  `<div class="${cls}" data-lang-body="en">${en}</div><div class="${cls}" data-lang-body="sk" hidden>${sk}</div>`;

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
        <a href="/#products">${i18nSpan("← All products", "← Všetky produkty")}</a>
      </div>
    </footer>`;
}

function jsonLd(svc) {
  const url = `%VITE_SITE_URL%/services/${svc.slug}/`;
  const graph = [
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: svc.title.en,
      serviceType: svc.tag.en,
      description: svc.description.en,
      inLanguage: "en",
      provider: { "@id": "%VITE_SITE_URL%/#organization" },
      areaServed: ["Slovakia", "Central Europe", "European Union"],
      url,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "%VITE_SITE_URL%/" },
        { "@type": "ListItem", position: 2, name: "Products", item: "%VITE_SITE_URL%/#products" },
        { "@type": "ListItem", position: 3, name: svc.title.en, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      inLanguage: "en",
      mainEntity: svc.faq.map((f) => ({
        "@type": "Question",
        name: f.q.en,
        acceptedAnswer: { "@type": "Answer", text: f.a.en.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() },
      })),
    },
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function phases(svc) {
  return `
        <ol class="svc-flow" role="list">
          ${svc.phases
            .map(
              (p, i) =>
                `<li class="svc-flow__step">
            <span class="svc-flow__n" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
            <h3>${i18nSpan(p.name.en, p.name.sk)}</h3>
            ${i18nBody(p.body.en, p.body.sk, "svc-flow__body")}
            <p class="svc-flow__out"><span class="sr-only">${i18nSpan("Output:", "Výstup:")} </span>${i18nSpan(
                  p.output.en,
                  p.output.sk,
                )}</p>
          </li>`,
            )
            .join("\n          ")}
        </ol>`;
}

function deliverables(svc) {
  const rows = svc.deliverables.en.map((en, i) => ({ en, sk: svc.deliverables.sk[i] }));
  return `
        <ul class="svc-deliver">
          ${rows
            .map((r) => `<li><span class="svc-deliver__tick" aria-hidden="true"></span>${i18nSpan(r.en, r.sk)}</li>`)
            .join("\n          ")}
        </ul>`;
}

function faq(svc) {
  return `
        <div class="svc-faq">
          ${svc.faq
            .map(
              (f) =>
                `<div class="svc-faq__item">
            <h3>${i18nSpan(f.q.en, f.q.sk)}</h3>
            ${i18nBody(f.a.en, f.a.sk, "svc-faq__a")}
          </div>`,
            )
            .join("\n          ")}
        </div>`;
}

function related(svc) {
  const others = SERVICES.filter((s) => s.slug !== svc.slug);
  return `
        <nav class="svc-related" aria-label="${esc("Other products")}">
          <div class="svc-related__title">${i18nSpan("Other products", "Ďalšie produkty")}</div>
          <ul>
            ${others
              .map(
                (s) =>
                  `<li><a href="/services/${s.slug}/"><span class="chip" style="border-color:var(--violet);color:var(--violet-2)">${i18nSpan(
                    s.tag.en,
                    s.tag.sk,
                  )}</span>${i18nSpan(s.title.en, s.title.sk, "svc-related__name")}</a></li>`,
              )
              .join("\n            ")}
          </ul>
        </nav>`;
}

function page(svc) {
  const url = `%VITE_SITE_URL%/services/${svc.slug}/`;
  return `<!doctype html>
<html lang="en"
  data-title-en="${esc(svc.title.en + " — ETEREO")}"
  data-title-sk="${esc(svc.title.sk + " — ETEREO")}"
  data-desc-en="${esc(svc.description.en)}"
  data-desc-sk="${esc(svc.description.sk)}">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#060811" />

    <title>${esc(svc.title.en)} — ETEREO</title>
    <meta name="description" content="${esc(svc.description.en)}" />
    <meta name="keywords" content="${esc(svc.keywords.en)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="en" href="${url}" />
    <link rel="alternate" hreflang="sk" href="${url}?lang=sk" />
    <link rel="alternate" hreflang="x-default" href="${url}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="ETEREO" />
    <meta property="og:title" content="${esc(svc.title.en)}" />
    <meta property="og:description" content="${esc(svc.description.en)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="%VITE_SITE_URL%/og.svg" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:locale:alternate" content="sk_SK" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(svc.title.en)}" />
    <meta name="twitter:description" content="${esc(svc.description.en)}" />
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

    <script type="application/ld+json">${jsonLd(svc)}</script>
  </head>
  <body>
    <div id="root">${nav()}
      <main class="subpage service-page">
        <header class="page-head">
          <div class="container container--narrow">
            <a class="page-back" href="/#products">${i18nSpan("All products", "Všetky produkty")}</a>
            <div class="svc-badge">
              <span class="svc-badge__n" aria-hidden="true">${esc(svc.id)}</span>
              <span class="chip">${i18nSpan(svc.tag.en, svc.tag.sk)}</span>
            </div>
            <h1>${i18nSpan(svc.title.en, svc.title.sk)}</h1>
            <p class="page-intro">${i18nSpan(svc.lead.en, svc.lead.sk)}</p>
            <ul class="svc-chips">
              ${svc.chips.en
                .map((en, i) => `<li class="chip">${i18nSpan(en, svc.chips.sk[i])}</li>`)
                .join("\n              ")}
            </ul>
            <div class="svc-head__cta">
              <a class="btn btn--primary" href="/#contact">${i18nSpan(
                svc.cta.action.en,
                svc.cta.action.sk,
              )}</a>
            </div>
          </div>
        </header>

        <section class="section--tight">
          <div class="container container--narrow">
            ${i18nBody(svc.intro.en, svc.intro.sk, "svc-intro")}
          </div>
        </section>

        <section class="section--tight svc-section">
          <div class="container container--narrow">
            <h2 class="svc-h2">${i18nSpan(svc.phasesTitle.en, svc.phasesTitle.sk)}</h2>
            ${phases(svc)}
          </div>
        </section>

        <section class="section--tight svc-section">
          <div class="container container--narrow">
            <h2 class="svc-h2">${i18nSpan(svc.deliverablesTitle.en, svc.deliverablesTitle.sk)}</h2>
            ${deliverables(svc)}
          </div>
        </section>

        <section class="section--tight svc-section">
          <div class="container container--narrow">
            <h2 class="svc-h2">${i18nSpan(svc.approachTitle.en, svc.approachTitle.sk)}</h2>
            ${i18nBody(svc.approach.en, svc.approach.sk, "svc-approach")}
          </div>
        </section>

        <section class="section--tight svc-section">
          <div class="container container--narrow">
            <h2 class="svc-h2">${i18nSpan(svc.faqTitle.en, svc.faqTitle.sk)}</h2>
            ${faq(svc)}
${related(svc)}
          </div>
        </section>

        <section class="page-cta">
          <div class="container container--narrow">
            <h2>${i18nSpan(svc.cta.title.en, svc.cta.title.sk)}</h2>
            <p>${i18nSpan(svc.cta.body.en, svc.cta.body.sk)}</p>
            <a class="btn btn--primary" href="/#contact">${i18nSpan(svc.cta.action.en, svc.cta.action.sk)}</a>
          </div>
        </section>
      </main>${footer()}
    </div>
    <script type="module" src="/src/blog-post.ts"></script>
  </body>
</html>
`;
}

let n = 0;
for (const svc of SERVICES) {
  const dir = join(ROOT, "services", svc.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), page(svc));
  n++;
}
console.log(`gen-services: wrote ${n} service pages`);

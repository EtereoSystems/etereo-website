// Generates a self-contained, bilingual static page for every service at services/<slug>/index.html.
// These are Vite inputs (see vite.config.ts) so Vite injects the hashed CSS and substitutes
// %VITE_SITE_URL%. The full text of BOTH languages ships in the HTML (crawlers and AI read it
// without running JS); src/service-page.ts reuses blog-post.ts for language and the menu, and
// adds the delivery stepper and the scroll reveal.
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

const num = (n) => String(n).padStart(2, "0");

// WAI-ARIA tabs once src/service-steps.ts runs; without JS (no html[data-js]) the tabs and
// the Back / Next buttons stay hidden and every step is listed in order instead.
function phases(svc) {
  const n = svc.phases.length;
  const tabs = svc.phases
    .map(
      (p, i) =>
        `<button type="button" class="svc-steps__tab" role="tab" id="svc-tab-${i + 1}" aria-controls="svc-step-${i + 1}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span class="svc-steps__n" aria-hidden="true">${num(i + 1)}</span>${i18nSpan(p.name.en, p.name.sk, "svc-steps__name")}</button>`,
    )
    .join("\n            ");
  const panels = svc.phases
    .map(
      (p, i) =>
        `<section class="svc-step${i === 0 ? " is-active" : ""}" role="tabpanel" id="svc-step-${i + 1}" aria-labelledby="svc-tab-${i + 1}" tabindex="0">
                <span class="svc-step__n" aria-hidden="true">${num(i + 1)} / ${num(n)}</span>
                <h3>${i18nSpan(p.name.en, p.name.sk)}</h3>
                ${i18nBody(p.body.en, p.body.sk, "svc-step__body")}
                <p class="svc-step__out"><span class="svc-step__out-label">${i18nSpan("Output", "Výstup")}</span>${i18nSpan(p.output.en, p.output.sk)}</p>
              </section>`,
    )
    .join("\n              ");
  return `
        <div class="svc-steps">
          <div class="svc-steps__nav" role="tablist" aria-labelledby="svc-steps-title">
            ${tabs}
          </div>
          <div class="svc-steps__panels">
            ${panels}
          </div>
          <div class="svc-steps__pager">
            <button type="button" class="btn btn--ghost svc-steps__go" data-step-go="-1" aria-disabled="true"><span aria-hidden="true">←</span>${i18nSpan("Back", "Späť")}</button>
            <button type="button" class="btn btn--ghost svc-steps__go" data-step-go="1">${i18nSpan("Next step", "Ďalší krok")}<span aria-hidden="true">→</span></button>
          </div>
        </div>`;
}

// A paragraph's first sentence, set apart so the three points can be skimmed. Left alone when
// the sentence would end inside <strong>/<em> rather than produce broken markup.
function withLead(inner) {
  const end = inner.search(/[.!?](?=\s+[A-ZÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ])/);
  if (end < 0) return inner;
  const lead = inner.slice(0, end + 1);
  const balanced = ["strong", "em"].every((t) => lead.split(`<${t}>`).length === lead.split(`</${t}>`).length);
  return balanced ? `<span class="svc-principle__lead">${lead}</span>${inner.slice(end + 1)}` : inner;
}

// The approach is three short essays. Set as numbered points it reads as an argument rather
// than a wall of prose; only bare <p> blocks split cleanly, so anything else fails the build.
function principles(html) {
  const paras = html.match(/<p>[\s\S]*?<\/p>/g) ?? [];
  if (paras.join("").replace(/\s+/g, "") !== html.replace(/\s+/g, "")) {
    throw new Error("gen-services: an approach must be <p> blocks only");
  }
  return paras
    .map(
      (p, i) =>
        `<div class="svc-principle"><span class="svc-principle__n" aria-hidden="true">${num(i + 1)}</span><p>${withLead(p.slice(3, -4))}</p></div>`,
    )
    .join("");
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

// Native <details>, so the answers open without JS and stay in the HTML for crawlers; a shared
// `name` keeps one open at a time, like the home page FAQ.
function faq(svc) {
  return `
        <div class="faq svc-faq">
          ${svc.faq
            .map(
              (f, i) =>
                `<details class="faq__item" name="svc-faq"${i === 0 ? " open" : ""}>
            <summary class="svc-faq__q"><h3>${i18nSpan(f.q.en, f.q.sk)}</h3><span class="faq__sign" aria-hidden="true"></span></summary>
            ${i18nBody(f.a.en, f.a.sk, "svc-faq__a")}
          </details>`,
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
                  `<li><a href="/services/${s.slug}/"><span class="chip svc-related__chip">${i18nSpan(
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
    <!-- before first paint, so the stepper's layout is right from the start -->
    <script>document.documentElement.setAttribute("data-js", "");</script>
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
            <h2 class="svc-h2" id="svc-steps-title">${i18nSpan(svc.phasesTitle.en, svc.phasesTitle.sk)}</h2>
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
            ${i18nBody(principles(svc.approach.en), principles(svc.approach.sk), "svc-approach")}
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
    <script type="module" src="/src/service-page.ts"></script>
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

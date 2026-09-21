# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for ETEREO s.r.o. — React 19 + TypeScript + Vite, with a scroll-driven 3D MacBook (react-three-fiber) as the hero. Four pages, bilingual EN/SK, no backend. There is no test suite.

There is **no client router**: the second page is a second Vite entry (see Pages below), so each page is its own HTML document.

## Commands

```bash
npm run dev       # vite dev server on :5173 (runs scripts/seo.mjs first via predev)
npm run build     # tsc -b && vite build → dist/ (prebuild: seo.mjs; postbuild: inline-css.mjs)
npm run preview   # serve the production build
npm run lint      # oxlint (config in .oxlintrc.json)
npm run seo       # regenerate public/robots.txt, sitemap.xml, llms.txt
npm run fonts     # re-download public/fonts/*.woff2 + regenerate src/styles/fonts.css
```

Type errors only surface via `npm run build` (`tsc -b`); `oxlint` does not type-check. `tsconfig.app.json` has `noUnusedLocals`/`noUnusedParameters` on, so dead bindings break the build.

## Code style

Comments say *why*, never what the code already says. Keep them to 1-3 lines, plain and direct — no multi-paragraph JSDoc blocks, no restating the signature, no arguing a decision at length. Most code needs none. If the reasoning genuinely needs more room, it belongs in this file instead.

## Domain / env

`VITE_SITE_URL` is the single source of truth for the domain. It flows into:
- `src/config.ts` (`SITE`, `langUrl()`) → canonical + hreflang, OG/Twitter, JSON-LD in `src/seo/`
- `index.html` via Vite's `%VITE_SITE_URL%` substitution (static copy for crawlers that don't run JS — keep it in sync with `src/seo/SeoHead.tsx`)
- `scripts/seo.mjs`, which **generates** `public/robots.txt`, `public/sitemap.xml` (one EN + one SK entry per page in its `paths` array), `public/llms.txt` — never edit them by hand, and they are **not tracked** — `.gitignore` covers all three, and they were untracked with `git rm --cached` once it turned out the ignore rule had landed after they were already committed (ignore rules do nothing for a path git already tracks, so every build kept dirtying the working tree). Nothing needs committing: the deploy runs `npm run build`, whose `prebuild` regenerates them into `public/` before Vite copies that into `dist/`.

Copy `.env.example` → `.env` for local work. CI overrides it: `.github/workflows/deploy.yml` builds with `VITE_SITE_URL=https://www.etereosystems.com` (note: differs from the `etereo.sk` default in `src/config.ts` and `.env.example`).

## Deployment

Push to `main` → GitHub Actions builds and rsyncs `dist/` over SSH to a Websupport host (secrets: `SSH_HOST`, `SSH_PORT`, `SSH_USER`, `SSH_PRIVATE_KEY`, `DEPLOY_PATH`). SSH/rsync are pinned to IPv4 (`-4`) because the runner has no IPv6 route — don't remove those flags.

`src/.github/workflows/deploy.yml` is a stale duplicate of an older workflow and is **not** used by Actions; only the root `.github/` one runs.

## Architecture

### Pages

Two Vite entries, wired in `vite.config.ts` under `build.rollupOptions.input`:

| Entry | Source | Builds to | Served at |
|---|---|---|---|
| `main` | `index.html` → `src/main.tsx` → `App.tsx` | `dist/index.html` | `/` |
| `projects` | `projects/index.html` → `src/projects.tsx` → `src/pages/ProjectsPage.tsx` | `dist/projects/index.html` | `/projects/` |
| `about` | `about/index.html` → `src/about.tsx` → `src/pages/AboutPage.tsx` | `dist/about/index.html` | `/about/` |
| `blog` | `blog/index.html` → `src/blog.tsx` → `src/pages/BlogPage.tsx` | `dist/blog/index.html` | `/blog/` |

The directory-plus-`index.html` shape is deliberate: Apache serves `/projects/` from it with no rewrite rules, so the rsync deploy is unchanged and a direct hit or refresh never 404s. Rollup splits the bundles automatically — three.js stays in the home-page chunk, so `/projects/` loads roughly 234 kB instead of 1.28 MB. Keep it that way; importing anything from `src/three/` into the projects page would drag the whole 3D stack across.

Every entry HTML carries two things that exist purely to stop a white flash when navigating between pages, and both are easy to undo by accident:

- an inline `<style>` setting `html { background: #060811; color-scheme: dark }`. A stylesheet cannot paint the background before it has loaded, so this has to be inline and it has to be a literal — `--bg` lives in the very file we are not waiting for.
- `<link rel="preload" as="font" … crossorigin>` for `inter-latin.woff2` and `space-grotesk-latin.woff2`. They carry the body text and every heading, so they start in parallel with the CSS instead of after it. `crossorigin` is required even though they are same-origin — fonts are fetched in CORS mode, and without it the preload is ignored and fetched twice.

### The static first screen (`index.html` only)

`#root` on the home page holds **two** fallbacks, and which one shows is decided by CSS before anything runs:

| | with JS (`html[data-js]`) | without |
|---|---|---|
| `.boot-hero` | shown until React mounts | hidden |
| `.boot-doc` | hidden | shown |

`.boot-hero` is the hero's first screen as static HTML — badge, wordmark, tagline, sub, CTAs, scroll cue — using the same class names as [Hero.tsx](src/components/Hero.tsx). Nothing painted before it, because everything visible was React's, so the first paint waited on ~92 kB gz of app JS. It now lands with the document itself: the styles are inlined at build time (see Styling), so on a throttled mobile connection first paint comes ~1.5 s earlier than it did and Speed Index roughly halves.

Three things keep it honest, and all three are easy to break:

- **The markup has to match what React renders**, class for class and string for string. React replaces all of `#root` on mount; if the two disagree the swap shows up as a layout shift, and CLS is currently 0.
- **It ships both languages.** Each translated node is duplicated with `data-l="en"` / `data-l="sk"`, and the inline boot script picks one by setting `data-boot-lang` on `<html>` before first paint. That script is a second, read-only implementation of `detectLang()` — same order, same `etereo.lang` key — kept deliberately, because a Slovak visitor seeing an English first screen is worse than the delay it removes. Change one, change the other. No attribute at all (script threw) falls back to English.
- **`.boot-doc` is the old crawler copy, unchanged.** It has to stay below the hero *and* hidden whenever the shell is shown, or a no-JS visitor gets nine screens of empty hero before any text.

The wordmark SVG is inlined here as well as in [Wordmark.tsx](src/components/Wordmark.tsx) — a second copy of ~5 kB of path data, and the one part of this that is genuinely duplicated rather than merely mirrored. An `<img>` would cost a request on the critical path, and leaving it out would shift the column.

The other three entries have no shell: they are ordinary pages whose content is not a 940vh scroll sequence, and adding one would mean four more copies to keep in step.

### Fonts

Self-hosted, nothing is requested from Google at runtime. `scripts/fonts.mjs` downloads the woff2 files into `public/fonts/` and generates [src/styles/fonts.css](src/styles/fonts.css); that CSS is **generated — edit the script, not the file**, but unlike the `seo.mjs` output it *is* committed, along with the woff2 files. Each entry imports `fonts.css` before `global.css`.

Only **latin + latin-ext** are shipped. Google also serves cyrillic, greek and vietnamese, which this site never renders. latin-ext is not optional: every Slovak diacritic (č š ž ť ň ľ ď ô) lives there, and the `unicode-range` declarations mean an English page downloads only the three latin files (~100 kB) while a Slovak one also pulls latin-ext.

This started as a white-flash fix. As a third-party `rel="stylesheet"`, the Google Fonts link was render-blocking and first paint tracked it exactly — 152 ms normally, 940 ms when that one request was slowed to 880 ms. Self-hosted, the same page paints in ~70 ms with no external dependency at all. It also removes the GDPR question that comes with sending every EU visitor's IP to Google.

All three families are SIL OFL 1.1; the licence ships alongside them in `public/fonts/LICENSE.txt`, as redistribution requires.

Adding a page means: a new `<name>/index.html` (copy the static crawler block from an existing one), an entry in `vite.config.ts`, a `PATHS` entry and a `META` block in [src/seo/SeoHead.tsx](src/seo/SeoHead.tsx), a branch in `structuredData()`, and a `paths` entry in `scripts/seo.mjs`.

Subpages share one set of chrome classes — `.subpage`, `.page-head`, `.page-back`, `.page-intro`, `.page-note`, `.page-cta` — so a third page inherits the frame for free. Page-specific classes (`.case*`, `.about-*`, `.roster`, `.facts`) sit under their own banner.

`Nav` takes a `base` prop that prefixes its in-page anchors — `""` on the home page, `"/"` on a subpage so `#services` becomes `/#services`. Three nav items are exceptions that link straight to a subpage from every page:

| Nav item | Target | Home page still has |
|---|---|---|
| Work | `/projects/` | `#work` teaser + ghost link (`work.all`) |
| About us | `/about/` | `#team` teaser + ghost link (`team.all`) |
| Blog | `/blog/` | nothing — the Blog section was removed outright |

`content.insights.items` therefore renders only on `/blog/`; there is no `Blog` component any more, and `.insights-*` / `.article*` CSS went with it.

### The hero scroll engine

`.hero` is `940vh` tall with a sticky inner container; scrolling it drives everything. Progress is computed in `App.tsx` and written to `heroScroll.progress` (0→1) in [src/store.ts](src/store.ts) — a plain mutable object **deliberately outside React/zustand** so the 3D frame loop can read it every frame without re-renders. Smooth scrolling is Lenis, skipped entirely under `prefers-reduced-motion` (falls back to a passive scroll listener).

[src/three/choreo.ts](src/three/choreo.ts) holds the shared timeline so the 3D scene and the DOM panel stay in agreement:
- `p < INTRO_END (0.08)` — splash, wordmark + laptop at rest
- `INTRO_END…SHOW_END (0.86)` — carousel: the laptop spins a full turn per "beat", facing the viewer at each integer beat; `LX[]` zig-zags it left/right per project
- `> SHOW_END` — zoom into the screen, handing off to the DOM site

`currentProgress()` respects a `window.__P` override, which is the way to jump the animation to a given progress when checking a frame by hand.

[src/three/Scene.tsx](src/three/Scene.tsx) is **lazy-loaded** from `Hero` and is the only route into three.js — that split is what keeps the home-page shell at ~41 kB instead of ~1,010 kB, with the 968 kB `Scene` chunk streaming in behind the splash (`--hero-fade` defaults to 1, so the wordmark is already on screen). Importing anything from `src/three/` outside `Scene` collapses the split.

`Hero` renders `<Scene>` only once an `armed` flag flips, in a `requestIdleCallback` after the first paint. `lazy` starts its import *during render*, so the 3D chunk was being requested before the browser had painted anything and shared the first screen's bandwidth with the stylesheet and the app chunk. Keep the gate: moving the import back into render undoes it.

`Hero` also watches `.hero__sticky` with an IntersectionObserver and passes `running` to both `Scene` (which stops pacing, below) and `ProjectPanel` (which stops scheduling its rAF). Without it the 3D kept drawing at full rate long after scrolling away — measured at 1,028 WebGL draw calls/s with the hero 9,375 px above the viewport; it is 0 now, and resumes on the way back.

### What the hero is allowed to spend

The `<Canvas>` runs `frameloop="demand"`, and `Pacer` in `Scene.tsx` decides which frames are worth rendering:

- **while the progress is changing** (plus `HOT_MS` after, because Lenis keeps easing) every frame is rendered — that is the user's own gesture and it carries the content;
- **at rest** the idle drift and the typewriter are paced, at `IDLE_FPS` or slower. The rate is not fixed: `Pacer` estimates what a rendered frame costs this device from its own rAF interval and holds it to `IDLE_DUTY` of the main thread, so a laptop keeps 24 fps of drift and a cheap phone falls back to a few frames a second instead of being pinned;
- **under `prefers-reduced-motion` with the scroll parked** nothing is drawn at all: the sway is off and the terminal holds one line, so the frame is genuinely static. A warm-up window covers the first render; r3f invalidates on its own when the model finishes loading, so a slow connection still gets its first frame.

There is no `ContactShadows`. It re-rendered the scene into a depth target and blurred it twice **per frame** to produce, on a page this dark, a faint smudge — a fifth of the hero's frame cost for something you have to look for. `Macbook.tsx` draws the same smudge as one textured quad (`makeBlob`) that tracks the laptop along the ground plane. Re-adding drei's version means paying that again.

There is **no `Environment`/`Lightformer`** either, and the laptop's materials are built around its absence. drei's environment bakes its lightformers through PMREM, which compiles several shader programs on the first rendered frame — about 40% of it under 4× CPU throttling, and worth ~10 Lighthouse points on desktop on its own. The cost is compilation rather than pixels, so turning `resolution` down barely helped (256 → 64, then 64 → 8, each took off roughly a tenth of that frame); the only real saving was removing it.

What replaces it, in `Scene.tsx` and the `traverse` in `Macbook.tsx`, is lighting the metal directly: lower `metalness` (0.42, not 0.85 — a metal with no environment to reflect renders black), and **two `pointLight`s with `decay={0}`** angled from the camera side. The decay matters. A `directionalLight` shades a flat surface one uniform colour, which is why the closed lid read as plastic; a positional light still varies across it even with the falloff switched off, and that variation is what reads as sheen. If you re-tune the body material, check the lid at a non-facing beat (`window.__P = 0.42`) — it is the pose with the least going on and shows a flat shade immediately.

Two independent rAF consumers read that progress: [src/three/Macbook.tsx](src/three/Macbook.tsx) (`useFrame`) and [src/components/ProjectPanel.tsx](src/components/ProjectPanel.tsx) (own loop, `setState` only when the computed beat actually changes). Both branch on a 900px width breakpoint: below it the laptop stays centred and lifted (`MOBILE_Y`) with the project text beneath instead of beside it.

That loop in `App.tsx` measures the hero on resize, not per frame. It used to re-query `.hero` and read `offsetTop`/`offsetHeight` every frame while also writing `data-scrolling`/`data-scrolled` every frame — a style invalidation followed by a forced layout, 60 times a second, for numbers that only change when the viewport does. Both flags are now written on transitions only.

`App.tsx` also scrolls to `location.hash` itself once the sections are mounted. The browser resolves a fragment while parsing, when `#root` still holds the static fallback and the real sections do not exist yet — so arriving from a subpage's nav (`/#industries`) silently landed at the top. Whether it happened to work depended on whether React mounted before the browser gave up, which is a race, not a feature.

The 3D loop talks to CSS by setting custom properties on `document.documentElement`: `--hero-fade` (splash overlay) and `--handoff` (the white veil at the end). That's the only 3D→DOM channel besides `entered` in the store.

### The laptop screen

[src/three/screenTexture.ts](src/three/screenTexture.ts) draws each project's fake product UI into a 2D canvas used as a `CanvasTexture`. The screen mesh is found at runtime by material name `Glass_-_Heavy_Color` in `public/models/macbook.glb` and its material swapped for an emissive one — renaming that material in the model breaks the screen. The mesh's UVs rotate + mirror the texture, so everything is drawn inside a compensating transform (`CANVAS_ROT`, `MIRROR`). `Macbook.tsx` redraws only when the beat changes (`drawn` ref), not per frame.

Handing that canvas to the GPU costs roughly **16 ms per megapixel**, and it is the single biggest cost in the hero — everything below exists to keep that number down, so measure before growing a canvas:

- **Two textures, not one.** The splash typewriter repaints on every frame it advances, so it has its own canvas (`TERM_PX`, sized from the viewport like `SS` below: 512 on a phone, 1024 otherwise); the project canvas is only re-uploaded on a beat change. `Macbook.tsx` swaps `material.map`/`emissiveMap` between them and deliberately does **not** set `material.needsUpdate` — both are sRGB maps, so the program key is unchanged and a recompile would be pure cost.
- **`SS` is computed from the viewport, not pinned at 2.** The laptop screen covers ~36% of the viewport width at a facing beat, so a 2400² canvas spends ~60 ms a beat on detail a 1440px window cannot resolve. It is read once at import — a resize does not rebuild the texture. The one place this under-samples is the final zoom on a retina screen, which the `--handoff` veil is already fading out.
- **The terminal's static chrome is cached as a bitmap** and blitted per character; only the typed line is redrawn.
- **`bg()` is skipped once a screenshot has loaded**, because the screenshot covers the visible screen rect edge to edge and the gradient behind it is never sampled.

Screenshots are **WebP, 1800×1125** (`public/screens/screen-<slug>.webp`, ~50 kB each) and are fetched **on demand**, one beat ahead. Nine 2400×1500 PNGs requested up front was 11 MB of download plus nine full-size decodes landing on the splash. `/projects/` renders the same files as `<img>`. Regenerating them needs an encoder the repo does not carry; the 2400px PNG originals are in git history at `0539b66`.

Screen content comes from `PROJECTS[].screen` in [src/i18n/projects.ts](src/i18n/projects.ts), rendered by one of four `template`s (`ops`/`analytics`/`mobile`/`map`). Adding a project to `PROJECTS` shifts the whole timeline — `PROJECT_COUNT` drives the beat count — so `LX` in `choreo.ts` must grow to match (last entry stays `0.0` so the final zoom is centred).

### Content & i18n

All prose lives in [src/i18n/content.ts](src/i18n/content.ts) as `content.en` / `content.sk` against a typed `Content` interface — edit copy there, not in components. Components read it via `useContent()`. Language-neutral project data (stack strings, screen specs) is in `projects.ts`; its translated blurbs are in `PANELS[lang]`.

Language is zustand state (`useUI`), resolved once by `detectLang()` in [src/i18n/lang.ts](src/i18n/lang.ts) when the store is created — so the first render is already correct, with no flash of the wrong language. Order, most explicit first: `?lang=` in the URL → a remembered choice in `localStorage` (`etereo.lang`) → the first language we ship that appears anywhere in `navigator.languages` (`cs` maps to `sk`) → English. The active language is mirrored back into the URL (`?lang=sk`; EN drops the param) so both variants stay shareable and crawlable, and `SeoHead` re-upserts every head tag on change.

Only *explicit* choices are persisted — a switcher click (via `setLang`, which is unreachable from anywhere else) or arriving on a `?lang=` URL. A detected language is never written to storage: that would freeze one guess and stop the browser's own setting from being re-read. Every storage access is wrapped in try/catch, since a private window can throw on the accessor itself.

Country/IP is deliberately **not** used. The site is static on shared hosting with no Cloudflare in front, so geo would need a third-party round trip before first paint, and geography is a weak proxy for language for a company whose stated market (`SITE.areaServed`) is cross-border.

`WorkCase` carries both lengths of the same case study: `body` is the one-sentence teaser the home page shows, while `challenge` / `approach` / `outcome` are rendered only on `/projects/`. `casePage` holds that page's own framing copy and its section labels. Both languages must stay in step — the `Content` interface will not let one drift.

Section markup lives in one file, [src/sections/Sections.tsx](src/sections/Sections.tsx), one exported component per section; `App.tsx` composes them. Subpages live in [src/pages/](src/pages/) instead and compose `Nav` / `Footer` directly. Scroll-in animation is opt-in per element by adding the `reveal` class — `useReveal()` observes them once on mount, so elements added after mount won't animate.

### Styling

Plain CSS, no framework: `global.css` (design tokens in `:root` — colours, fonts, radii) and `components.css`. Dark palette only. Add colours as tokens rather than literals.

**The build inlines them.** `scripts/inline-css.mjs` runs as `postbuild`, replaces the `<link rel="stylesheet">` in all ten built HTML documents with a `<style>` holding the same bytes, and deletes the now-unreferenced assets — so `dist/assets/` ships no CSS at all. It works on Vite's output, never on the sources, so there is still exactly one place styles live and nothing to keep in sync. Two things follow: `dist` HTML is ~36 kB larger (the host serves it brotli-compressed, which is what makes that affordable), and the stylesheet is no longer cached across pages, so a second page pays for it again. That is the right way round for a site people reach from search. If you ever add a stylesheet that should stay a request — something big and genuinely below the fold — this script is where to exempt it.

Shared primitives live in `global.css` and are composed by every section: `.section` / `.section--tight`, `.container` / `.container--narrow`, `.section-head`, `.eyebrow`, `.card`, `.chip`, `.btn` (`--primary` / `--ghost`), `.reveal`, `.grid-bg`. Section-specific classes live in `components.css` under `/* ===== NAME ===== */` banners in the same order as `App.tsx` composes them. A new section means composing the primitives plus one banner block.

Caveats worth knowing before editing:
- **Type sizes are not tokenized.** Colours, font families and radii are `:root` tokens; font sizes are literal px (23 distinct values, several half-pixel one-offs like `14.5px`). To match an existing size, grep for it rather than guessing a scale.
- **`.card` is one visual treatment shared by eight unrelated content types** (services, tech columns, work cases, engagement tiers, voices, team, articles, contact form), including a single hover lift + violet glow. Restyling `.card` changes all of them.
- The three families are self-hosted (see Fonts above), not loaded from Google. Changing one means editing `scripts/fonts.mjs` and the matching `--font-*` token.
- `.eyebrow` survives in exactly two places — Work ("Selected work" qualifies a three-case list as non-exhaustive) and Contact ("Start here" is wayfinding at the end of a long page). It was removed from the other nine sections as decoration; don't reintroduce it as a default label above every heading.

### Accessibility baseline

The first two items are solved — extend them rather than working around them. The rest are open gaps, recorded so they are closed deliberately rather than rediscovered:

- **One shared focus ring** lives in `global.css`: a zero-specificity `:where(a, button, input, …):focus-visible` rule using the `--focus` token. Form fields opt out via `.field input:focus { outline: none }` and carry their own violet border + halo instead. Don't add per-component focus styles; extend the shared rule.
- **`prefers-reduced-motion` covers every autonomous animation.** Lenis is skipped in `App.tsx`, `.reveal` is neutralised in `global.css`, the tech marquee and the `panelIn` panel entrance stop in `components.css`, and `Macbook.tsx` multiplies its idle `Math.sin(t * …)` float/sway by an `idle` factor read from `motionPref` in [src/store.ts](src/store.ts) (a plain mutable object like `heroScroll`, so the frame loop can read it without re-rendering). Deliberately still moving: the scroll-driven choreography itself (that is the user's own input, and it carries the content) and `.card`/`.btn` hover transforms (they answer a user action).
- **The hero's eight projects still have no text equivalent.** `ProjectPanel` is `aria-hidden` and the on-screen copy is rasterised into a `CanvasTexture`, so `PANELS` / `PROJECTS` reach neither assistive tech nor non-JS crawlers. `/projects/` covers only the three `content.work.items` case studies, which are separate data — the two sets are not in sync by design.
- `--text-3` (#737d96) is 4.86:1 on `--bg` and is used at 11–13px throughout; input placeholders (#5b6480) are 3.41:1, below AA.
- The contact form's `.need-chip` group is single-select built from `<button>`s without `aria-pressed`, the success swap has no `aria-live`, and inputs carry no `name` attributes.

## Content caveats

Case studies, stats, testimonials, contact details and the footer legal line are illustrative placeholders for a newly founded company (see README). The contact form is front-end only — it simulates a submit and posts nowhere.

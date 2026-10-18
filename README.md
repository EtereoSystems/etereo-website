# ETEREO — official website

A dark, cinematic single-page site for **ETEREO s.r.o.** built with **React + TypeScript + Vite**, featuring a scroll-driven 3D MacBook Air (react-three-fiber) that spins in, approaches, and zooms into its screen — where the ETEREO "delivery console" UI becomes the site. Bilingual **EN / SK**.

## Run it

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
```

## Build for production

```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, S3…).

## Project structure

```
public/
  models/macbook.glb     # optimised MacBook Air M2 (OBJ → GLB, ~290 KB)
  favicon.svg, og.svg
src/
  three/
    Scene.tsx            # R3F canvas, lighting, in-scene studio environment
    Macbook.tsx          # model load + scroll choreography (spin / approach / zoom)
    screenTexture.ts     # draws the ETEREO console UI onto the laptop screen
  components/            # Nav, Hero, Wordmark, Contact, Footer, useReveal
  sections/Sections.tsx  # Products, Process, Tech, Work, Industries, Engage, Voices, Team, Blog, FAQ
  i18n/content.ts        # ALL copy, EN + SK — edit here
  store.ts               # language + hero scroll progress
  styles/                # global.css (tokens, primitives) + components.css (imports components/, sections/, pages/)
```

## Editing content

- **All text** (both languages) lives in `src/i18n/content.ts`. Change it there.
- **Design tokens** (colours, fonts, spacing) live at the top of `src/styles/global.css`.
- **The laptop-screen UI** is drawn in code in `src/three/screenTexture.ts`.

## Notes / honest-content reminders

- Testimonials live in `src/data/testimonials.ts`, empty for now. Add only real quotes with written consent (`consent: true`); the section appears once there are two.
- The Projects section (`src/data/work.ts`) lists real work only. Add a project only once the client is happy to be named; mark NDA work `confidential: true` and leave out its `url`.
- Contact details (`info@etereosystems.com`, address) and the footer legal line are placeholders — fill in your real IČO / DIČ / registered seat.
- The contact form is not wired: `submitInquiry()` in `src/components/Contact.tsx` is a TODO, and until it posts somewhere every submit ends in an error message with a prefilled email link. It also needs a privacy policy page (`SITE.privacyUrl` in `src/config.ts`).

## 3D model

Source: `macbook-air-m2/` (OBJ + textures). Converted to an optimised `public/models/macbook.glb`.
The screen mesh (material `Glass_-_Heavy_Color`) is detected at runtime and replaced with the live ETEREO console texture.

## Tech

React 19 · TypeScript · Vite · three.js · @react-three/fiber · @react-three/drei · lenis (smooth scroll) · zustand.

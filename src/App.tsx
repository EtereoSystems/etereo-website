import { useEffect } from "react";
import Lenis from "lenis";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import {
  Services,
  Process,
  Tech,
  Work,
  Industries,
  Engage,
  Voices,
  Team,
  Faq,
} from "./sections/Sections";
import { useReveal } from "./components/useReveal";
import { useLangSync } from "./components/useLangSync";
import { SeoHead } from "./seo/SeoHead";
import { heroScroll } from "./store";

export default function App() {
  useReveal();
  useLangSync();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = () => document.getElementById("top")?.closest(".hero") as HTMLElement | null;

    const update = () => {
      const el = hero();
      const vh = window.innerHeight;
      if (el) {
        const range = el.offsetHeight - vh;
        const p = range > 0 ? (window.scrollY - el.offsetTop) / range : 0;
        heroScroll.progress = Math.min(1, Math.max(0, p));
      }
      document.body.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
    };

    let lenis: Lenis | null = null;
    let raf = 0;
    let stop: () => void;

    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.4 });
      const loop = (time: number) => {
        lenis!.raf(time);
        update();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      stop = () => {
        cancelAnimationFrame(raf);
        lenis?.destroy();
      };
    } else {
      const onScroll = () => update();
      window.addEventListener("scroll", onScroll, { passive: true });
      stop = () => window.removeEventListener("scroll", onScroll);
    }

    // The browser resolves a #hash while parsing, when #root still holds the static
    // fallback and the real sections do not exist yet — so arriving from a subpage's
    // nav landed at the top. Jump now that they are mounted.
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) {
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else target.scrollIntoView();
    }

    window.addEventListener("resize", update);
    update();
    return () => {
      stop();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <SeoHead />
      <Nav />
      <Hero />
      <main>
        <Services />
        <Process />
        <Tech />
        <Work />
        <Industries />
        <Engage />
        <Voices />
        <Team />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import { useEffect, useRef } from "react";
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
  Insights,
  Faq,
} from "./sections/Sections";
import { useReveal } from "./components/useReveal";
import { SeoHead } from "./seo/SeoHead";
import { heroScroll, useUI, type Lang } from "./store";

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const lang = useUI((s) => s.lang);
  const setLang = useUI((s) => s.setLang);
  useReveal();

  // Pick the initial language from ?lang=…, then the browser, defaulting to English.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "sk" || param === "en") {
      setLang(param as Lang);
    } else if (navigator.language?.toLowerCase().startsWith("sk")) {
      setLang("sk");
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reflect the active language into the URL so each variant is shareable + crawlable.
  useEffect(() => {
    document.documentElement.lang = lang;
    const url = new URL(window.location.href);
    if (lang === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, [lang]);

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

    if (!reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.4 });
      const loop = (time: number) => {
        lenis!.raf(time);
        update();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      const onScroll = () => update();
      window.addEventListener("scroll", onScroll, { passive: true });
      update();
      return () => window.removeEventListener("scroll", onScroll);
    }

    window.addEventListener("resize", update);
    update();
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      window.removeEventListener("resize", update);
    };
  }, []);

  // suppress unused ref warning while keeping API for future targeting
  void heroRef;

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
        <Insights />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import { useEffect } from "react";
import Lenis from "lenis";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import {
  Products,
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
    // Lenis smooths the wheel, which only a mouse has. On a touch device it adds nothing the
    // finger doesn't already do, while its always-on rAF competes with the browser's native,
    // GPU-driven scroll — so phones get the native path, which is what makes them buttery.
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const smooth = !reduce && !touch;
    const hero = () => document.getElementById("top")?.closest(".hero") as HTMLElement | null;

    // The hero's geometry only moves when the viewport does, so read it on resize rather
    // than per frame: offsetTop/offsetHeight force a synchronous layout, and the writes
    // below dirty style every frame, so measuring inside the loop thrashed the two.
    let top = 0;
    let range = 0;
    const measure = () => {
      const el = hero();
      top = el ? el.offsetTop : 0;
      range = el ? el.offsetHeight - window.innerHeight : 0;
    };

    // `data-scrolling` lets CSS answer the gesture — the hero's scroll cue tightens while
    // the page is actually moving. Lenis keeps easing after the wheel stops, so this stays
    // true for the whole glide, which is what makes it read as feedback.
    let lastY = -1;
    let idle = 0;
    let scrolling = false;
    let scrolled = false;
    // Writing a dataset attribute invalidates style even when the value is unchanged,
    // which is why both flags are written only on an actual transition.
    const flag = (k: "scrolling" | "scrolled", v: boolean) => {
      document.body.dataset[k] = v ? "true" : "false";
    };
    const update = () => {
      const y = window.scrollY;
      if (range > 0) heroScroll.progress = Math.min(1, Math.max(0, (y - top) / range));
      if (y !== lastY) {
        lastY = y;
        if (!scrolling) ((scrolling = true), flag("scrolling", true));
        clearTimeout(idle);
        idle = window.setTimeout(() => {
          scrolling = false;
          flag("scrolling", false);
        }, 140);
      }
      if (y > 24 !== scrolled) ((scrolled = y > 24), flag("scrolled", scrolled));
    };

    let lenis: Lenis | null = null;
    let raf = 0;
    let stop: () => void;

    if (smooth) {
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
      // Native scroll: coalesce the burst of scroll events into one update per frame, so the
      // hero progress and the flags stay frame-aligned without a loop running while idle.
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          update();
        });
      };
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

    const remeasure = () => ((measure(), update()));
    window.addEventListener("resize", remeasure);
    // fonts and images settling can still move what sits above the hero
    window.addEventListener("load", remeasure);
    remeasure();
    return () => {
      stop();
      clearTimeout(idle);
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
    };
  }, []);

  return (
    <>
      <SeoHead />
      <Nav />
      <Hero />
      <main>
        <Products />
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

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ProjectPanel } from "./ProjectPanel";
import { Wordmark } from "./Wordmark";
import { useContent } from "../i18n";

// three.js is ~800 kB of the bundle; keep it out of the critical path. Until it
// arrives the splash overlay is already on screen (--hero-fade defaults to 1).
const Scene = lazy(() => import("../three/Scene"));

export function Hero() {
  const c = useContent();
  const sticky = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(true);
  const [armed, setArmed] = useState(false);

  // `lazy` fires its import during render — before the browser has painted — so the
  // 3D chunk was racing the stylesheet and the app chunk for the first screen. Ask
  // for it in the idle period after that paint instead; on a fast connection this is
  // a frame or two, on a slow one it is the whole point.
  useEffect(() => {
    const arm = () => setArmed(true);

    // On a phone the 3D chunk is the heaviest thing on the page: downloading and running
    // three.js on a slow CPU dominates Total Blocking Time, and the laptop canvas is what
    // the browser picks as the Largest Contentful Paint — so loading it during the first
    // screen is what drags the mobile score down. Hold it until the first interaction
    // (they almost always scroll — the hint asks them to), which is exactly when the laptop
    // starts to matter, with a timed fallback so a visitor who never scrolls still gets it.
    // The static splash (wordmark, tagline, CTAs) is already painted, so nothing looks empty
    // but the laptop, and LCP falls back to that text, which is on screen from the first frame.
    const touch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 900;
    if (touch) {
      const events = ["scroll", "pointerdown", "touchstart", "keydown"] as const;
      let timer = 0;
      const onFirst = () => {
        window.clearTimeout(timer);
        events.forEach((e) => window.removeEventListener(e, onFirst));
        arm();
      };
      events.forEach((e) => window.addEventListener(e, onFirst, { once: true, passive: true }));
      // Fallback for a visitor who never scrolls: late enough to clear the first render (the
      // splash text is the LCP, so we let it settle before three.js takes the main thread),
      // but soon enough that an idle hero still comes alive on its own.
      timer = window.setTimeout(onFirst, 3500);
      return () => {
        window.clearTimeout(timer);
        events.forEach((e) => window.removeEventListener(e, onFirst));
      };
    }

    // Desktop: bring it in during the idle period right after the first paint — on a fast
    // connection that is a frame or two, on a slow one it is the whole point.
    let cancel = () => {};
    const raf = requestAnimationFrame(() => {
      // still missing on Safari < 16.4, so this is a real branch, not a formality
      const ric: typeof window.requestIdleCallback | undefined = window.requestIdleCallback;
      if (ric) {
        const h = ric(arm, { timeout: 600 });
        cancel = () => cancelIdleCallback(h);
      } else {
        const h = window.setTimeout(arm, 60);
        cancel = () => clearTimeout(h);
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      cancel();
    };
  }, []);

  // The hero is several screens tall with ~10 sections after it. Left alone the 3D keeps
  // drawing at 60fps long after it has scrolled away, so park it once it is out of sight.
  useEffect(() => {
    const el = sticky.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="top" className="hero" aria-label={c.hero.badge}>
      <div className="hero__sticky" ref={sticky}>
        <div className="grid-bg" />
        <div className="hero__glow" />
        <div className="hero__canvas">
          <Suspense fallback={null}>{armed && <Scene running={running} />}</Suspense>
        </div>

        <ProjectPanel running={running} />

        <div className="hero__overlay">
          <div className="hero__col">
            <div className="hero__badge">
              <span className="dot" /> {c.hero.badge}
            </div>
            <h1 className="hero__wordmark">
              <Wordmark dot={false} gradient />
            </h1>
            <p className="hero__tag">{c.hero.tagline}</p>
            <p className="hero__sub">{c.hero.sub}</p>
            <div className="hero__cta">
              <a href="#contact" className="btn btn--primary">
                {c.hero.primary}
              </a>
              <a href="#work" className="btn btn--ghost">
                {c.hero.secondary}
              </a>
            </div>
          </div>
        </div>

        <div className="hero__hint">
          <span className="hero__hint-label">{c.hero.scrollHint}</span>
          <span className="hero__hint-line">
            <svg className="hero__hint-arrow" viewBox="0 0 12 8" aria-hidden focusable="false">
              <path d="M1 1.5 L6 6.5 L11 1.5" />
            </svg>
          </span>
        </div>

        <div className="hero__veil" />
      </div>
    </section>
  );
}

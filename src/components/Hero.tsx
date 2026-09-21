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
    let cancel = () => {};
    const raf = requestAnimationFrame(() => {
      // still missing on Safari < 16.4, so this is a real branch, not a formality
      const ric: typeof window.requestIdleCallback | undefined = window.requestIdleCallback;
      if (ric) {
        const h = ric(() => setArmed(true), { timeout: 600 });
        cancel = () => cancelIdleCallback(h);
      } else {
        const h = window.setTimeout(() => setArmed(true), 60);
        cancel = () => clearTimeout(h);
      }
    });
    return () => {
      cancelAnimationFrame(raf);
      cancel();
    };
  }, []);

  // The hero is 940vh with ~10 sections after it. Left alone the 3D keeps drawing
  // at 60fps long after it has scrolled away, so park it once it is out of sight.
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
    <section id="top" className="hero">
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

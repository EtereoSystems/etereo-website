import { Scene } from "../three/Scene";
import { ProjectPanel } from "./ProjectPanel";
import { useContent } from "../i18n";

export function Hero() {
  const c = useContent();
  return (
    <section id="top" className="hero">
      <div className="hero__sticky">
        <div className="grid-bg" />
        <div className="hero__glow" />
        <div className="hero__canvas">
          <Scene />
        </div>

        <ProjectPanel />

        <div className="hero__overlay">
          <div className="hero__col">
            <div className="hero__badge">
              <span className="dot" /> {c.hero.badge}
            </div>
            <h1 className="hero__wordmark">ETEREO</h1>
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
          <span>{c.hero.scrollHint}</span>
          <span className="hero__hint-line" />
        </div>

        <div className="hero__veil" />
      </div>
    </section>
  );
}

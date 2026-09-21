import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SeoHead } from "../seo/SeoHead";
import { useLangSync } from "../components/useLangSync";
import { useReveal } from "../components/useReveal";
import { useContent } from "../i18n";

export default function AboutPage() {
  const c = useContent();
  const a = c.aboutPage;
  useLangSync();
  useReveal();

  return (
    <>
      <SeoHead page="about" />
      <Nav base="/" />

      <main className="subpage subpage--about">
        <header className="page-head">
          <div className="container container--narrow">
            <a className="page-back" href="/">
              {a.back}
            </a>
            <h1 className="reveal">{a.title}</h1>
            <p className="page-intro reveal">{a.intro}</p>
          </div>
        </header>

        <section className="about-story">
          <div className="container container--narrow">
            {a.story.map((para) => (
              <p className="reveal" key={para}>{para}</p>
            ))}
          </div>
        </section>

        <section className="about-facts">
          <div className="container">
            <h2 className="reveal">{a.factsTitle}</h2>
            <dl className="facts">
              {a.facts.map((f) => (
                <div className="fact reveal" key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="about-team">
          <div className="container">
            <h2 className="reveal">{a.teamTitle}</h2>
            <p className="about-team__intro reveal">{a.teamIntro}</p>
            <ul className="roster">
              {c.team.people.map((p) => (
                <li className="roster__row reveal" key={p.name}>
                  <span className="roster__av" aria-hidden>
                    {p.initials}
                  </span>
                  <div className="roster__id">
                    <h3>{p.name}</h3>
                    <div className="roster__role">{p.role}</div>
                  </div>
                  <p className="roster__body">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="page-cta">
          <div className="container container--narrow">
            <h2 className="reveal">{a.cta.title}</h2>
            <p className="reveal">{a.cta.body}</p>
            <div className="page-cta__actions reveal">
              <a className="btn btn--primary" href="/#contact">
                {a.cta.action}
              </a>
              <a className="btn btn--ghost" href="/projects/">
                {a.cta.work}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

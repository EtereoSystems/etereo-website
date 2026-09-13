import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SeoHead } from "../seo/SeoHead";
import { useLangSync } from "../components/useLangSync";
import { useContent } from "../i18n";

export default function AboutPage() {
  const c = useContent();
  const a = c.aboutPage;
  useLangSync();

  return (
    <>
      <SeoHead page="about" />
      <Nav base="/" />

      <main className="subpage">
        <header className="page-head">
          <div className="container container--narrow">
            <a className="page-back" href="/">
              {a.back}
            </a>
            <h1>{a.title}</h1>
            <p className="page-intro">{a.intro}</p>
          </div>
        </header>

        <section className="about-story">
          <div className="container container--narrow">
            {a.story.map((para) => (
              <p key={para}>{para}</p>
            ))}
            <p className="page-note">{a.note}</p>
          </div>
        </section>

        <section className="about-facts">
          <div className="container">
            <h2>{a.factsTitle}</h2>
            <dl className="facts">
              {a.facts.map((f) => (
                <div className="fact" key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="about-team">
          <div className="container">
            <h2>{a.teamTitle}</h2>
            <p className="about-team__intro">{a.teamIntro}</p>
            <ul className="roster">
              {c.team.people.map((p) => (
                <li className="roster__row" key={p.name}>
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
            <h2>{a.cta.title}</h2>
            <p>{a.cta.body}</p>
            <a className="btn btn--primary" href="/#contact">
              {a.cta.action}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

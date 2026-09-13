import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SeoHead } from "../seo/SeoHead";
import { useLangSync } from "../components/useLangSync";
import { useContent } from "../i18n";

export default function ProjectsPage() {
  const c = useContent();
  const p = c.casePage;
  useLangSync();

  return (
    <>
      <SeoHead page="projects" />
      <Nav base="/" />

      <main className="subpage">
        <header className="page-head">
          <div className="container container--narrow">
            <a className="page-back" href="/">
              {p.back}
            </a>
            <h1>{p.title}</h1>
            <p className="page-intro">{p.intro}</p>
            <p className="page-note">{p.note}</p>
          </div>
        </header>

        {c.work.items.map((w, i) => (
          <article className="case" id={`case-${i + 1}`} key={w.title}>
            <div className="container case__grid">
              <div className="case__aside">
                <dl className="case__facts">
                  <div>
                    <dt>{p.labels.kind}</dt>
                    <dd>{w.kind}</dd>
                  </div>
                  <div>
                    <dt>{p.labels.duration}</dt>
                    <dd>{w.duration}</dd>
                  </div>
                  <div>
                    <dt>{p.labels.stack}</dt>
                    <dd>{w.stack}</dd>
                  </div>
                </dl>
                <div className="case__stats">
                  {w.stats.map((st) => (
                    <div className="case__stat" key={st.label}>
                      <div className="case__val">{st.value}</div>
                      <div className="case__lbl">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="case__body">
                <span className="chip">{w.tag}</span>
                <h2>{w.title}</h2>

                <h3>{p.labels.challenge}</h3>
                <p>{w.challenge}</p>

                <h3>{p.labels.approach}</h3>
                <ul className="case__steps">
                  {w.approach.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>

                <h3>{p.labels.outcome}</h3>
                <p>{w.outcome}</p>
              </div>
            </div>
          </article>
        ))}

        <section className="page-cta">
          <div className="container container--narrow">
            <h2>{p.cta.title}</h2>
            <p>{p.cta.body}</p>
            <a className="btn btn--primary" href="/#contact">
              {p.cta.action}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

import { useState } from "react";
import { useContent } from "../i18n";

function Eyebrow({ children, left = false }: { children: React.ReactNode; left?: boolean }) {
  return <div className={"eyebrow" + (left ? " eyebrow--left" : "")}>{children}</div>;
}

export function Services() {
  const c = useContent();
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-head reveal">
          <Eyebrow>{c.services.eyebrow}</Eyebrow>
          <h2>{c.services.title}</h2>
          <p>{c.services.sub}</p>
        </div>
        <div className="svc-grid">
          {c.services.items.map((s, i) => (
            <article className="card svc reveal" style={{ transitionDelay: `${(i % 3) * 70}ms` }} key={s.id}>
              <div className="svc__n">{s.id}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="svc__tags">
                {s.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const c = useContent();
  return (
    <section id="process" className="section">
      <div className="container">
        <div className="section-head reveal">
          <Eyebrow>{c.process.eyebrow}</Eyebrow>
          <h2>{c.process.title}</h2>
          <p>{c.process.sub}</p>
        </div>
        <div className="timeline reveal">
          <div className="timeline__line" />
          {c.process.items.map((s) => (
            <div className="tl" key={s.n}>
              <div className="tl__dot">{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
              <div className="tl__artifact">{s.artifact}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Tech() {
  const c = useContent();
  const chips = ["OpenTelemetry", "GraphQL", "TypeScript", "Go", "Python", "Rust", "Java", ".NET", "React", "Next.js", "Swift", "Kotlin"];
  return (
    <section id="tech" className="section">
      <div className="container">
        <div className="section-head reveal">
          <Eyebrow>{c.tech.eyebrow}</Eyebrow>
          <h2>{c.tech.title}</h2>
          <p>{c.tech.sub}</p>
        </div>
        <div className="tech-marquee reveal" aria-hidden>
          <div className="tech-marquee__row">
            {[...chips, ...chips].map((t, i) => (
              <span className="chip" key={i}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="tech-grid">
          {c.tech.groups.map((g, i) => (
            <div className="card tech-col reveal" style={{ transitionDelay: `${i * 60}ms` }} key={g.label}>
              <div className="tech-col__label">{g.label}</div>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  const c = useContent();
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head reveal">
          <Eyebrow>{c.work.eyebrow}</Eyebrow>
          <h2>{c.work.title}</h2>
          <p>{c.work.note}</p>
        </div>
        <div className="work-list">
          {c.work.items.map((w) => (
            <article className="card work reveal" key={w.title}>
              <div className="work__left">
                <div className="work__meta">
                  <span className="chip">{w.tag}</span>
                  <span className="chip">{w.kind}</span>
                  <span className="work__dur">{w.duration}</span>
                </div>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
                <div className="work__stack">{w.stack}</div>
              </div>
              <div className="work__stats">
                {w.stats.map((st) => (
                  <div className="work__stat" key={st.label}>
                    <div className="work__val">{st.value}</div>
                    <div className="work__lbl">{st.label}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const c = useContent();
  return (
    <section id="industries" className="section">
      <div className="container">
        <div className="section-head reveal">
          <Eyebrow>{c.industries.eyebrow}</Eyebrow>
          <h2>{c.industries.title}</h2>
        </div>
        <div className="ind-grid reveal">
          {c.industries.items.map((it) => (
            <div className="ind" key={it.n}>
              <div className="ind__n">{it.n}</div>
              <h4>{it.title}</h4>
              <p>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Engage() {
  const c = useContent();
  return (
    <section id="engage" className="section">
      <div className="container">
        <div className="section-head reveal">
          <Eyebrow>{c.engage.eyebrow}</Eyebrow>
          <h2>{c.engage.title}</h2>
        </div>
        <div className="engage-grid">
          {c.engage.items.map((e) => (
            <article className={"card engage reveal" + (e.featured ? " engage--featured" : "")} key={e.title}>
              <div className="engage__head">
                <h3>{e.title}</h3>
                <span className={"engage__badge" + (e.featured ? " on" : "")}>{e.badge}</span>
              </div>
              <div className="engage__cadence">{e.cadence}</div>
              <p className="engage__body">{e.body}</p>
              <ul className="engage__points">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <a href="#contact" className={"btn " + (e.featured ? "btn--primary" : "btn--ghost")}>
                {e.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Voices() {
  const c = useContent();
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="section-head reveal">
          <Eyebrow>{c.voices.eyebrow}</Eyebrow>
        </div>
        <div className="voices">
          {c.voices.items.map((v, i) => (
            <figure className="card voice reveal" style={{ transitionDelay: `${i * 70}ms` }} key={i}>
              <blockquote>“{v.quote}”</blockquote>
              <figcaption>
                <span className="voice__av">{v.name.split(" ").map((s) => s[0]).join("")}</span>
                <span>
                  <strong>{v.name}</strong>
                  <em>{v.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Team() {
  const c = useContent();
  return (
    <section id="team" className="section">
      <div className="container">
        <div className="section-head reveal">
          <Eyebrow>{c.team.eyebrow}</Eyebrow>
          <h2>{c.team.title}</h2>
        </div>
        <div className="team-grid">
          {c.team.people.map((p, i) => (
            <article className="card person reveal" style={{ transitionDelay: `${i * 60}ms` }} key={p.name}>
              <div className="person__av">{p.initials}</div>
              <h4>{p.name}</h4>
              <div className="person__role">{p.role}</div>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Insights() {
  const c = useContent();
  return (
    <section id="insights" className="section">
      <div className="container">
        <div className="insights-head reveal">
          <div>
            <Eyebrow left>{c.insights.eyebrow}</Eyebrow>
            <h2>{c.insights.title}</h2>
          </div>
          <a href="#" className="btn btn--ghost">
            {c.insights.all}
          </a>
        </div>
        <div className="insights-grid">
          {c.insights.items.map((a, i) => (
            <article className="card article reveal" style={{ transitionDelay: `${i * 70}ms` }} key={a.title}>
              <div className="article__meta">
                <span className="chip">{a.tag}</span>
                <span className="article__read">{a.read}</span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const c = useContent();
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section section--tight">
      <div className="container container--narrow">
        <div className="section-head reveal">
          <Eyebrow>{c.faq.eyebrow}</Eyebrow>
        </div>
        <div className="faq reveal">
          {c.faq.items.map((f, i) => (
            <div className={"faq__item" + (open === i ? " open" : "")} key={i}>
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="faq__sign">{open === i ? "×" : "+"}</span>
              </button>
              <div className="faq__a">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

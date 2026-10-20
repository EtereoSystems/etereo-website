import { useEffect, useState, type CSSProperties } from "react";
import { useContent } from "../i18n";
import { useUI } from "../store";
import { TESTIMONIALS, visibleTestimonials, type Testimonial } from "../data/testimonials";
import { WORK_PROJECTS } from "../data/work";
import { Avatar, LinkedInLink, TeamIcon, type TeamIconKind } from "../components/Person";
import { contactHref, openContact } from "../components/contactPreset";

function ProductTags({ tags }: { tags: string[] }) {
  return (
    <ul className="prod__tags">
      {tags.map((t) => (
        <li className="chip" key={t}>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Products() {
  const c = useContent();
  const lang = useUI((s) => s.lang);
  const { featured: f, items } = c.products;
  // keep the chosen language across the jump to a static /services/ page
  const svc = (slug: string) => (lang === "sk" ? `/services/${slug}/?lang=sk` : `/services/${slug}/`);
  return (
    <section id="products" className="section products">
      {/* This section was #services; links to that still land here, at the same spot. */}
      <span id="services" className="products__alias" />
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{c.products.eyebrow}</div>
          <h2>{c.products.title}</h2>
          <p>{c.products.sub}</p>
        </div>

        <article className="card prod prod--featured reveal">
          <div className="prod--featured__main">
            <div className="prod__top">
              <span className="prod__n" aria-hidden="true">
                {f.id}
              </span>
              <span className="prod__badge">{f.badge}</span>
            </div>
            <h3>{f.title}</h3>
            <p className="prod__lead">{f.subtitle}</p>
            <p>{f.body}</p>
            <div className="prod__action">
              <a
                href={contactHref(lang, { product: "ai" })}
                onClick={(e) => openContact(e, { product: "ai" })}
                className="btn btn--primary prod__cta"
              >
                {/* one flex item with a no-break space, so a wrapped label keeps its arrow */}
                <span>
                  {f.cta}
                  {"\u00a0"}
                  <span aria-hidden="true">→</span>
                </span>
              </a>
              <a href={svc(f.slug)} className="prod__more">
                <span>
                  {c.products.more}
                  {" "}
                  <span aria-hidden="true">→</span>
                </span>
              </a>
            </div>
          </div>
          <div className="prod--featured__side">
            <h4 className="prod__list-title">{f.listTitle}</h4>
            <ul className="prod__list">
              {f.list.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <ProductTags tags={f.tags} />
          </div>
        </article>

        <div className="prod-grid">
          {items.map((s) => (
            <article className="card prod reveal" key={s.id}>
              <span className="prod__n" aria-hidden="true">
                {s.id}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ProductTags tags={s.tags} />
              <a href={svc(s.slug)} className="prod__more prod__more--card">
                <span>
                  {c.products.more}
                  {" "}
                  <span aria-hidden="true">→</span>
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const c = useContent();
  const p = c.process;
  return (
    <section id="process" className="section process">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{p.eyebrow}</div>
          <h2>{p.title}</h2>
          <p>{p.sub}</p>
        </div>
        {/* The <ol> carries the order, so the drawn numbers are hidden. role="list" because
            Safari drops list semantics from a list styled with list-style: none. */}
        <ol className="timeline reveal" role="list">
          {p.items.map((s) => (
            <li className="tl" key={s.n}>
              <span className="tl__dot" aria-hidden="true">
                {s.n}
              </span>
              <h3>{s.title}</h3>
              <p className="tl__body">{s.body}</p>
              <p className="tl__output">
                <span className="sr-only">{p.outputLabel} </span>
                {s.output}
              </p>
            </li>
          ))}
        </ol>
        <div className="process__action reveal">
          <a href="#contact" className="btn btn--primary process__cta">
            {/* one flex item with a no-break space, so a wrapped label keeps its arrow */}
            <span>
              {p.cta}
              {" "}
              <span aria-hidden="true">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

const TECH_CHIPS = ["OpenTelemetry", "GraphQL", "TypeScript", "Node.js", "Go", "Python", "Rust", "Java", ".NET", "React", "Vue", "Next.js", "Swift", "Kotlin", "Docker", "Azure", "LLM"];

export function Tech() {
  const c = useContent();
  const t = c.tech;
  return (
    <section id="tech" className="section tech">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.sub}</p>
        </div>
        <div className="tech-marquee reveal">
          {/* The loop needs the chips twice; the second run is hidden from screen readers, and
              from view too once reduced motion stops the scroll. role="list" as in Process. */}
          <ul className="tech-marquee__row" role="list">
            {[...TECH_CHIPS, ...TECH_CHIPS].map((name, i) => (
              <li className="chip" key={i} aria-hidden={i >= TECH_CHIPS.length || undefined}>
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div className="tech-grid">
          {t.groups.map((g) => (
            <div className="card tech-col reveal" key={g.label}>
              <h3 className="tech-col__label">{g.label}</h3>
              <ul role="list">
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
  const lang = useUI((s) => s.lang);
  const w = c.work;
  return (
    <section id="work" className="section work-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{w.eyebrow}</div>
          <h2>{w.title}</h2>
          <p>{w.sub}</p>
        </div>
        <div className="work-list">
          {WORK_PROJECTS.map((p) => (
            <article className="card work reveal" key={p.id}>
              <div className="work__left">
                <div className="work__meta">
                  <span className="chip">{p.tag[lang]}</span>
                </div>
                <h3>{p.title[lang]}</h3>
                <p className="work__desc">{p.description[lang]}</p>
                {p.url ? (
                  <a
                    className="work__link"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${w.visit}: ${p.title[lang]} (${w.newTab})`}
                  >
                    {w.visit}
                    {" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  p.confidential && (
                    <span className="work__badge">
                      <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
                        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
                      </svg>
                      {w.confidential}
                    </span>
                  )
                )}
              </div>
              <dl className="work__cells">
                {p.cells.map((cell) => (
                  <div className="work__cell" key={cell.label.en}>
                    <dt className="work__lbl">{cell.label[lang]}</dt>
                    <dd className="work__val">{cell.value[lang]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <div className="work-more">
          <a href="/projects/" className="btn btn--ghost">
            {w.all}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  const c = useContent();
  const ind = c.industries;
  return (
    <section id="industries" className="section industries">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{ind.eyebrow}</div>
          <h2>{ind.title}</h2>
          <p>{ind.sub}</p>
        </div>
        <ul className="ind-grid reveal" role="list">
          {ind.items.map((it) => (
            <li className="ind" key={it.n}>
              <span className="ind__n" aria-hidden="true">
                {it.n}
              </span>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Engage() {
  const c = useContent();
  const en = c.engage;
  const last = en.items.length - 1;
  return (
    <section id="engage" className="section engagement">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{en.eyebrow}</div>
          <h2>{en.title}</h2>
          <p>{en.sub}</p>
        </div>
        {/* The <ol> carries the order, so the drawn numbers are hidden. role="list" because
            Safari drops list semantics from a list styled with list-style: none. */}
        <ol className="steps" role="list">
          {en.items.map((s, i) => (
            <li className="step reveal" key={s.n}>
              <div className="card step__card">
                <span className="step__n" aria-hidden="true">
                  {s.n}
                </span>
                <h3>{s.title}</h3>
                <p className="step__output">
                  {en.outputLabel} {s.output}
                </p>
                <p className="step__body">{s.body}</p>
                <ul className="step__points" role="list">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              {/* outside the card, so the card's hover lift does not drag it off the next one */}
              {i < last && <span className="step__link" aria-hidden="true" />}
            </li>
          ))}
        </ol>
        <div className="engage__action reveal">
          <a href="#contact" className="btn btn--primary engage__cta">
            {/* one flex item with a no-break space, so a wrapped label keeps its arrow */}
            <span>
              {en.cta}
              {"\u00a0"}
              <span aria-hidden="true">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// One run of the loop has to be wider than the 1200px container, or the seam shows as a
// gap; a short list repeats within the run until it is.
const MIN_RUN = 6;
let warnedMock = false;

// one labelled image, so a screen reader hears the rating once rather than five glyphs
function Stars({ n, label }: { n: number; label: string }) {
  return (
    <span className="voice__stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className={"voice__star" + (i < n ? "" : " voice__star--off")} viewBox="0 0 20 18.2" aria-hidden="true">
          <polygon points="10,0.5 12.35,6.76 19.04,7.06 13.8,11.24 15.58,17.69 10,14 4.42,17.69 6.2,11.24 0.96,7.06 7.65,6.76" />
        </svg>
      ))}
    </span>
  );
}

export function Voices({ items = TESTIMONIALS, dev = import.meta.env.DEV }: { items?: Testimonial[]; dev?: boolean }) {
  const c = useContent();
  const lang = useUI((s) => s.lang);
  const shown = visibleTestimonials(items, dev);
  const mock = shown.some((t) => t.isMock);
  useEffect(() => {
    if (!mock || warnedMock) return;
    warnedMock = true;
    console.warn("[testimonials] rendering mock data");
  }, [mock]);
  // a single quote reads as cherry-picked, so the section waits for a second one
  if (shown.length < 2) return null;
  // an even number of identical sets, so -50% lands exactly on a seam
  const perRun = Math.ceil(MIN_RUN / shown.length);
  const sets = 2 * perRun;
  return (
    <section id="testimonials" className="section section--tight voices-section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{c.voices.eyebrow}</div>
          <h2 id="voices-title">{c.voices.title}</h2>
        </div>
        {/* focusable so a keyboard user can pause it (and scroll it, under reduced motion) */}
        <div
          className="voices-marquee reveal"
          role="region"
          aria-labelledby="voices-title"
          tabIndex={0}
          style={{ "--voice-n": shown.length * perRun } as CSSProperties}
        >
          <div className="voices-track">
            {Array.from({ length: sets }, (_, set) => (
              <div className="voices-set" key={set} aria-hidden={set > 0 ? "true" : undefined} inert={set > 0}>
                {shown.map((t) => (
                  <figure className="card voice" key={t.id}>
                    {t.rating && <Stars n={t.rating} label={c.voices.rating.replace("{n}", String(t.rating))} />}
                    <blockquote>
                      <p>{t.quote[lang]}</p>
                    </blockquote>
                    <figcaption>
                      <Avatar name={t.name} photo={t.photo} className="voice__av" />
                      <span className="voice__id">
                        <strong>{t.name}</strong>
                        <span className="voice__role">
                          {t.role[lang]}
                          {t.company && (
                            <>
                              {", "}
                              {t.companyUrl ? (
                                <a href={t.companyUrl} target="_blank" rel="noopener noreferrer">
                                  {t.company}
                                </a>
                              ) : (
                                t.company
                              )}
                            </>
                          )}
                        </span>
                        {t.industry && <span className="voice__industry">{t.industry[lang]}</span>}
                      </span>
                      {t.linkedin && <LinkedInLink href={t.linkedin} label={`${c.voices.linkedin} ${t.name}`} />}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// one per card: the two core disciplines, then the network
const TEAM_ICONS: TeamIconKind[] = ["engineering", "integrations", "network"];

export function Team() {
  const c = useContent();
  const t = c.team;
  return (
    <section id="team" className="section team">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </div>
        <ul className="team-grid" role="list">
          {[...t.core, t.network].map((m, i) => (
            <li className={"card team-card reveal" + (m === t.network ? " team-card--network" : "")} key={m.title}>
              <TeamIcon kind={TEAM_ICONS[i]} className="team-card__icon" />
              <p className="team-card__label">{m.label}</p>
              <h3>{m.title}</h3>
              <p className="team-card__body">{m.body}</p>
            </li>
          ))}
        </ul>
        <div className="team-more">
          <a href="/about/" className="btn btn--ghost">
            {t.all}
          </a>
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
          <h2>{c.faq.title}</h2>
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

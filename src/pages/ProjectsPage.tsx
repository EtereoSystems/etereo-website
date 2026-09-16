import { useEffect, useMemo, useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SeoHead } from "../seo/SeoHead";
import { useLangSync } from "../components/useLangSync";
import { useReveal } from "../components/useReveal";
import { useContent } from "../i18n";
import { useUI } from "../store";
import { PROJECTS, PANELS, PROJECT_COUNT, type ScreenSpec } from "../i18n/projects";

// TODO: migrate these labels into content.ts alongside the rest of the copy.
const L = {
  en: {
    hubTitle: "Selected work",
    hubIntro:
      "Real systems we've designed, built and shipped — from confidential government and defence platforms to consumer products live in the app stores.",
    search: "Search projects…",
    noResults: "No projects match that.",
    view: "View project",
    all: "All projects",
    next: "Next project",
    prev: "Previous",
    role: "Role",
    sector: "Sector",
    status: "Status",
    links: "Links",
    confidential: "Shown anonymised at the client's discretion.",
    draft: "A full write-up of this project is on the way. Here's the short version for now.",
  },
  sk: {
    hubTitle: "Vybraná práca",
    hubIntro:
      "Reálne systémy, ktoré sme navrhli, postavili a dodali — od dôverných vládnych a obranných platforiem po spotrebiteľské produkty v obchodoch s aplikáciami.",
    search: "Hľadať projekty…",
    noResults: "Žiadny projekt nezodpovedá.",
    view: "Zobraziť projekt",
    all: "Všetky projekty",
    next: "Ďalší projekt",
    prev: "Predchádzajúci",
    role: "Rola",
    sector: "Odvetvie",
    status: "Stav",
    links: "Odkazy",
    confidential: "Zobrazené anonymizovane podľa dohody s klientom.",
    draft: "Podrobný popis tohto projektu pripravujeme. Zatiaľ tu je tá najkratšia verzia.",
  },
};

/** A stylised product screen, mirroring the MacBook's — pure HTML, no three.js. */
function ProjectScreen({ spec, small = false }: { spec: ScreenSpec; small?: boolean }) {
  const path = "etereo / " + spec.title.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={"pscreen" + (small ? " pscreen--sm" : "")} style={{ ["--accent" as string]: spec.accent }}>
      <div className="pscreen__bar">
        <span className="pscreen__dots">
          <i /><i /><i />
        </span>
        <span className="pscreen__path">{path}</span>
      </div>
      <div className="pscreen__body">
        <div className="pscreen__sub">{spec.subtitle}</div>
        <div className="pscreen__title">{spec.title}</div>
        <div className="pscreen__kpis">
          {spec.kpis.map((k) => (
            <div className="pscreen__kpi" key={k.l}>
              <div className="pscreen__v">{k.v}</div>
              <div className="pscreen__l">{k.l}</div>
            </div>
          ))}
        </div>
        <div className="pscreen__rows">
          {spec.rows.map((r, i) => (
            <span className={"pscreen__row" + (i === 1 ? " on" : "")} key={r}>
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const c = useContent();
  const lang = useUI((s) => s.lang);
  useLangSync();
  // re-run per view (hub ⇄ detail render different trees) so their .reveal nodes get observed
  useReveal();
  const t = L[lang];
  const labels = c.casePage.labels;

  // ?p=<slug> selects a project; anything unknown (or absent) falls back to the hub.
  const slug = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("p") : null;
  const index = PROJECTS.findIndex((pr) => pr.slug === slug);
  const detail = index >= 0;

  const withLang = (path: string) =>
    lang === "sk" ? `${path}${path.includes("?") ? "&" : "?"}lang=sk` : path;

  return (
    <>
      <SeoHead page="projects" />
      <Nav base="/" />
      <main className="subpage">
        {detail ? (
          <ProjectDetail index={index} t={t} labels={labels} c={c} withLang={withLang} />
        ) : (
          <ProjectHub t={t} c={c} withLang={withLang} />
        )}
      </main>
      <Footer />
    </>
  );
}

// ── hub: searchable index of every project ────────────────────────────────────
function ProjectHub({
  t,
  c,
  withLang,
}: {
  t: (typeof L)["en"];
  c: ReturnType<typeof useContent>;
  withLang: (p: string) => string;
}) {
  const lang = useUI((s) => s.lang);
  const [q, setQ] = useState("");
  const list = PANELS[lang];

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PROJECTS.map((proj, i) => ({ proj, text: list[i], i })).filter(({ proj, text }) => {
      if (!needle) return true;
      return (
        text.name.toLowerCase().includes(needle) ||
        text.sector.toLowerCase().includes(needle) ||
        text.blurb.toLowerCase().includes(needle) ||
        proj.stack.toLowerCase().includes(needle)
      );
    });
  }, [q, list]);

  return (
    <>
      <header className="page-head">
        <div className="container container--narrow">
          <a className="page-back" href={withLang("/")}>
            {c.casePage.back}
          </a>
          <h1 className="reveal">{t.hubTitle}</h1>
          <p className="page-intro reveal stagger-1">{t.hubIntro}</p>
          <div className="psearch reveal stagger-2">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.search}
              aria-label={t.search}
            />
          </div>
        </div>
      </header>

      <div className="container">
        {results.length === 0 ? (
          <p className="phub-empty">{t.noResults}</p>
        ) : (
          <div className="phub">
            {results.map(({ proj, text }, idx) => (
              <a
                className={"pcard reveal" + (idx ? " stagger-" + Math.min(idx, 4) : "")}
                key={proj.slug}
                href={withLang(`/projects/?p=${proj.slug}`)}
              >
                <ProjectScreen spec={proj.screen} small />
                <div className="pcard__body">
                  <div className="pcard__meta">
                    <span className="pcard__num">
                      {proj.id} / 0{PROJECT_COUNT}
                    </span>
                    <span className="chip" style={{ borderColor: proj.screen.accent, color: proj.screen.accent }}>
                      {text.sector}
                    </span>
                  </div>
                  <h2 className="pcard__name">{text.name}</h2>
                  <p className="pcard__blurb">{text.blurb}</p>
                  <span className="pcard__more" style={{ color: proj.screen.accent }}>
                    {t.view} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <section className="page-cta">
        <div className="container container--narrow">
          <h2>{c.casePage.cta.title}</h2>
          <p>{c.casePage.cta.body}</p>
          <a className="btn btn--primary" href={withLang("/#contact")}>
            {c.casePage.cta.action}
          </a>
        </div>
      </section>
    </>
  );
}

// ── detail: one project, full page, with a next/prev loop ─────────────────────
function ProjectDetail({
  index,
  t,
  labels,
  c,
  withLang,
}: {
  index: number;
  t: (typeof L)["en"];
  labels: ReturnType<typeof useContent>["casePage"]["labels"];
  c: ReturnType<typeof useContent>;
  withLang: (p: string) => string;
}) {
  const lang = useUI((s) => s.lang);
  const proj = PROJECTS[index];
  const text = PANELS[lang][index];
  const accent = proj.screen.accent;

  const next = PROJECTS[(index + 1) % PROJECT_COUNT];
  const prev = PROJECTS[(index - 1 + PROJECT_COUNT) % PROJECT_COUNT];
  const nextText = PANELS[lang][(index + 1) % PROJECT_COUNT];
  const prevText = PANELS[lang][(index - 1 + PROJECT_COUNT) % PROJECT_COUNT];

  // reflect the project in the tab title (SeoHead sets a generic /projects/ one)
  useEffect(() => {
    document.title = `${text.name} — ETEREO`;
  }, [text.name]);

  const hasBody = !!(text.challenge || text.approach || text.outcome);

  return (
    <>
      <header className="page-head">
        <div className="container">
          <a className="page-back" href={withLang("/projects/")}>
            {t.all}
          </a>
          <div className="pdetail-head">
            <div className="pdetail-head__text reveal">
              <div className="pdetail-eyebrow">
                Project {proj.id} <span>/ 0{PROJECT_COUNT}</span>
              </div>
              <h1 style={{ color: "var(--text)" }}>{text.name}</h1>
              <div className="pdetail-chips">
                <span className="chip" style={{ borderColor: accent, color: accent }}>
                  {text.sector}
                </span>
                {text.stage && <span className="pdetail-stage">{text.stage}</span>}
              </div>
              <p className="page-intro">{text.blurb}</p>
            </div>
            <div className="pdetail-head__screen reveal stagger-2">
              <ProjectScreen spec={proj.screen} />
            </div>
          </div>
        </div>
      </header>

      <article className="case">
        <div className="container case__grid">
          <div className="case__aside reveal">
            <dl className="case__facts">
              <div>
                <dt>{t.sector}</dt>
                <dd>{text.sector}</dd>
              </div>
              {text.role && (
                <div>
                  <dt>{t.role}</dt>
                  <dd>{text.role}</dd>
                </div>
              )}
              <div>
                <dt>{labels.stack}</dt>
                <dd>{proj.stack}</dd>
              </div>
              {text.stage && (
                <div>
                  <dt>{t.status}</dt>
                  <dd>{text.stage}</dd>
                </div>
              )}
              {proj.links && proj.links.length > 0 && (
                <div>
                  <dt>{t.links}</dt>
                  <dd>
                    {proj.links.map((ln) => (
                      <a key={ln.href} href={ln.href} target="_blank" rel="noopener noreferrer" style={{ color: accent }}>
                        {ln.label}
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            {text.metrics.length > 0 && (
              <div className="case__stats">
                {text.metrics.map((m) => (
                  <div className="case__stat" key={m.l}>
                    <div className="case__val" style={{ color: accent }}>
                      {m.v}
                    </div>
                    <div className="case__lbl">{m.l}</div>
                  </div>
                ))}
              </div>
            )}
            {proj.confidential && <p className="pdetail-conf">{t.confidential}</p>}
          </div>

          <div className="case__body reveal stagger-1">
            {hasBody ? (
              <>
                {text.challenge && (
                  <>
                    <h3>{labels.challenge}</h3>
                    <p>{text.challenge}</p>
                  </>
                )}
                {text.approach && text.approach.length > 0 && (
                  <>
                    <h3>{labels.approach}</h3>
                    <ul className="case__steps">
                      {text.approach.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </>
                )}
                {text.outcome && (
                  <>
                    <h3>{labels.outcome}</h3>
                    <p>{text.outcome}</p>
                  </>
                )}
              </>
            ) : (
              <p className="pdetail-draft">{t.draft}</p>
            )}
          </div>
        </div>
      </article>

      <nav className="pnav">
        <div className="container pnav__grid">
          <a className="pnav__side" href={withLang(`/projects/?p=${prev.slug}`)}>
            <span className="pnav__dir">← {t.prev}</span>
            <span className="pnav__name">{prevText.name}</span>
          </a>
          <a className="pnav__next" href={withLang(`/projects/?p=${next.slug}`)}>
            <span className="pnav__dir">{t.next} →</span>
            <span className="pnav__name" style={{ color: next.screen.accent }}>
              {nextText.name}
            </span>
          </a>
        </div>
      </nav>

      <section className="page-cta">
        <div className="container container--narrow">
          <h2>{c.casePage.cta.title}</h2>
          <p>{c.casePage.cta.body}</p>
          <a className="btn btn--primary" href={withLang("/#contact")}>
            {c.casePage.cta.action}
          </a>
        </div>
      </section>
    </>
  );
}

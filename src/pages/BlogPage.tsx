import { useState } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SeoHead } from "../seo/SeoHead";
import { useLangSync } from "../components/useLangSync";
import { useContent } from "../i18n";
import { useUI } from "../store";

const PER_PAGE = 10;

export default function BlogPage() {
  const c = useContent();
  const b = c.blogPage;
  const lang = useUI((s) => s.lang);
  useLangSync();

  const withLang = (p: string) => (lang === "sk" ? `${p}?lang=sk` : p);

  const items = c.insights.items;
  const pageCount = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const [page, setPage] = useState(1);
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PER_PAGE;
  const shown = items.slice(start, start + PER_PAGE);

  // Jump to the top of the list so a new page starts at the first post, not mid-scroll.
  const goTo = (p: number) => {
    setPage(p);
    document.querySelector(".blog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const prevLabel = lang === "sk" ? "Predošlá" : "Previous";
  const nextLabel = lang === "sk" ? "Ďalšia" : "Next";
  const pageWord = lang === "sk" ? "Strana" : "Page";

  return (
    <>
      <SeoHead page="blog" />
      <Nav base="/" />

      <main className="subpage">
        <header className="page-head">
          <div className="container container--narrow">
            <a className="page-back" href="/">
              {b.back}
            </a>
            <h1>{b.title}</h1>
            <p className="page-intro">{b.intro}</p>
            <p className="page-note">{b.note}</p>
          </div>
        </header>

        <section className="blog">
          <div className="container">
            <ul className="posts">
              {shown.map((a) => (
                <li key={a.slug}>
                  <a className="post" href={withLang(`/blog/${a.slug}/`)}>
                    <div className="post__meta">
                      <span className="chip">{a.tag}</span>
                      <span className="post__read">{a.read}</span>
                    </div>
                    <div className="post__body">
                      <h2>{a.title}</h2>
                      <p>{a.body}</p>
                      <span className="post__more">{lang === "sk" ? "Čítať článok →" : "Read article →"}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {pageCount > 1 && (
              <nav className="pager" aria-label={pageWord}>
                <button
                  className="pager__step"
                  onClick={() => goTo(current - 1)}
                  disabled={current === 1}
                  aria-label={prevLabel}
                >
                  <span aria-hidden>←</span> {prevLabel}
                </button>

                <div className="pager__nums">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      className={"pager__num" + (p === current ? " on" : "")}
                      onClick={() => goTo(p)}
                      aria-current={p === current ? "page" : undefined}
                      aria-label={`${pageWord} ${p}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  className="pager__step"
                  onClick={() => goTo(current + 1)}
                  disabled={current === pageCount}
                  aria-label={nextLabel}
                >
                  {nextLabel} <span aria-hidden>→</span>
                </button>
              </nav>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

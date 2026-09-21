import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SeoHead } from "../seo/SeoHead";
import { useLangSync } from "../components/useLangSync";
import { useReveal } from "../components/useReveal";
import { useContent } from "../i18n";
import { useUI } from "../store";

export default function BlogPage() {
  const c = useContent();
  const b = c.blogPage;
  const lang = useUI((s) => s.lang);
  useLangSync();
  useReveal();

  const withLang = (p: string) => (lang === "sk" ? `${p}?lang=sk` : p);

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
            <h1 className="reveal">{b.title}</h1>
            <p className="page-intro reveal">{b.intro}</p>
            <p className="page-note reveal">{b.note}</p>
          </div>
        </header>

        <section className="blog">
          <div className="container">
            <ul className="posts">
              {c.insights.items.map((a) => (
                <li className="reveal" key={a.slug}>
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

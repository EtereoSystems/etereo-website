import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SeoHead } from "../seo/SeoHead";
import { useLangSync } from "../components/useLangSync";
import { useContent } from "../i18n";

export default function BlogPage() {
  const c = useContent();
  const b = c.blogPage;
  useLangSync();

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
              {c.insights.items.map((a) => (
                <li className="post" key={a.title}>
                  <div className="post__meta">
                    <span className="chip">{a.tag}</span>
                    <span className="post__read">{a.read}</span>
                  </div>
                  <div className="post__body">
                    <h2>{a.title}</h2>
                    <p>{a.body}</p>
                  </div>
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

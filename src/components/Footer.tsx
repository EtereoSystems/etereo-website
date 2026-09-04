import { useContent } from "../i18n";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const c = useContent();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Wordmark className="footer__logo" />
          <p>{c.footer.blurb}</p>
        </div>
        {c.footer.cols.map((col) => (
          <div className="footer__col" key={col.title}>
            <div className="footer__col-title">{col.title}</div>
            <ul>
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container footer__bar">
        <span>{c.footer.rights}</span>
        <span className="footer__tag">{c.footer.tagline}</span>
      </div>
    </footer>
  );
}

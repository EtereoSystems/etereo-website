import { useContent } from "../i18n";
import { useUI } from "../store";
import { Wordmark } from "./Wordmark";

export function Nav() {
  const c = useContent();
  const { lang, setLang, menuOpen, setMenuOpen } = useUI();

  const links: [string, string][] = [
    [c.nav.services, "#services"],
    [c.nav.process, "#process"],
    [c.nav.work, "#work"],
    [c.nav.industries, "#industries"],
    [c.nav.team, "#team"],
    [c.nav.insights, "#insights"],
  ];

  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__brand" aria-label="ETEREO home">
          <Wordmark className="nav__logo" />
        </a>

        <nav className={"nav__links" + (menuOpen ? " open" : "")}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <div className="lang" role="group" aria-label="Language">
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
              EN
            </button>
            <span>·</span>
            <button className={lang === "sk" ? "on" : ""} onClick={() => setLang("sk")}>
              SK
            </button>
          </div>
          <a href="#contact" className="btn btn--primary nav__cta">
            {c.nav.start}
          </a>
          <button
            className="nav__burger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

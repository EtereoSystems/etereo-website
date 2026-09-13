import { useContent } from "../i18n";
import { useUI } from "../store";
import { Wordmark } from "./Wordmark";

/** `base` prefixes the in-page anchors: "" on the home page, "/" on a subpage. */
export function Nav({ base = "" }: { base?: string }) {
  const c = useContent();
  const { lang, setLang, menuOpen, setMenuOpen } = useUI();

  const links: [string, string][] = [
    [c.nav.services, `${base}#services`],
    [c.nav.process, `${base}#process`],
    [c.nav.work, "/projects/"],
    [c.nav.industries, `${base}#industries`],
    [c.nav.about, "/about/"],
    [c.nav.insights, "/blog/"],
  ];

  return (
    <header className="nav">
      <div className="nav__inner">
        <a href={`${base}#top`} className="nav__brand" aria-label="ETEREO home">
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
          <a href={`${base}#contact`} className="btn btn--primary nav__cta">
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

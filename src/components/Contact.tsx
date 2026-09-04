import { useState } from "react";
import { useContent } from "../i18n";

export function Contact() {
  const c = useContent();
  const [need, setNeed] = useState(0);
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="section contact">
      <div className="container contact__grid">
        <div className="contact__left reveal">
          <div className="eyebrow eyebrow--left">{c.contact.eyebrow}</div>
          <h2>{c.contact.title}</h2>
          <p className="contact__sub">{c.contact.sub}</p>
          <ul className="contact__channels">
            {c.contact.channels.map((ch) => (
              <li key={ch.label}>
                <span className="contact__ch-label">{ch.label}</span>
                <span className="contact__ch-value">{ch.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <form
          className="card contact__form reveal"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h3>{c.contact.formTitle}</h3>
          <p className="contact__formsub">{c.contact.formSub}</p>

          {sent ? (
            <div className="contact__sent">{c.contact.sent}</div>
          ) : (
            <>
              <div className="field-row">
                <label className="field">
                  <span>{c.contact.name}</span>
                  <input type="text" required placeholder="Jane Okafor" />
                </label>
                <label className="field">
                  <span>{c.contact.email}</span>
                  <input type="email" required placeholder="jane@company.com" />
                </label>
              </div>
              <label className="field">
                <span>{c.contact.company}</span>
                <input type="text" placeholder="Company name" />
              </label>
              <div className="field">
                <span>{c.contact.need}</span>
                <div className="need-chips">
                  {c.contact.needs.map((n, i) => (
                    <button
                      type="button"
                      key={n}
                      className={"need-chip" + (need === i ? " on" : "")}
                      onClick={() => setNeed(i)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <label className="field">
                <span>{c.contact.context}</span>
                <textarea rows={3} placeholder={c.contact.contextPh} />
              </label>
              <button type="submit" className="btn btn--primary contact__submit">
                {c.contact.submit}
              </button>
              <p className="contact__disclaimer">{c.contact.disclaimer}</p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

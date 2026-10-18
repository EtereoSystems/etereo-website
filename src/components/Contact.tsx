import { useEffect, useRef, useState, type FormEvent } from "react";
import { useContent } from "../i18n";
import { TOPICS, type TopicId } from "../i18n/content";
import { SITE } from "../config";
import { PRESET_EVENT, readPreset } from "./contactPreset";

type Field = "name" | "email" | "context" | "consent";
const FIELDS: Field[] = ["name", "email", "context", "consent"];
type Values = { name: string; email: string; company: string; context: string; consent: boolean; website: string };
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const id = (f: string) => `contact-${f}`;

function invalid(f: Field, v: Values): boolean {
  if (f === "email") return !EMAIL.test(v.email.trim());
  if (f === "consent") return !v.consent;
  return v[f].trim() === "";
}

// TODO: wire submission. The site is static and nothing receives the form yet, so this
// fails on purpose: the visitor gets the error state and a prefilled email, never a fake "sent".
async function submitInquiry(_inquiry: Values & { topics: string[] }): Promise<void> {
  throw new Error("Contact form submission is not wired");
}

export function Contact() {
  const c = useContent();
  const t = c.contact;
  const [values, setValues] = useState<Values>({ name: "", email: "", company: "", context: "", consent: false, website: "" });
  const [topics, setTopics] = useState<TopicId[]>(() => readPreset(window.location.search));
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const sentRef = useRef<HTMLParagraphElement>(null);

  // an engagement card or product CTA on this page asked for a chip
  useEffect(() => {
    const onPreset = () => {
      const want = readPreset(window.location.search);
      setTopics((cur) => [...cur, ...want.filter((x) => !cur.includes(x))]);
    };
    window.addEventListener(PRESET_EVENT, onPreset);
    return () => window.removeEventListener(PRESET_EVENT, onPreset);
  }, []);

  // the submit button is gone once the form is replaced, so focus would fall to <body>
  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    const next = { ...values, [k]: v };
    setValues(next);
    // an error already on screen clears as soon as the field is fixed, not on the next blur
    if (errors[k as Field]) setErrors((e) => ({ ...e, [k]: invalid(k as Field, next) }));
  };
  const blur = (f: Field) => setErrors((e) => ({ ...e, [f]: invalid(f, values) }));
  const toggle = (topic: TopicId) =>
    setTopics((cur) => (cur.includes(topic) ? cur.filter((x) => x !== topic) : [...cur, topic]));

  const labels = TOPICS.filter((x) => topics.includes(x)).map((x) => t.topics[x]);
  const mailto =
    `mailto:${SITE.email}?subject=${encodeURIComponent(t.formTitle)}&body=` +
    encodeURIComponent(
      [values.name, values.company, labels.join(", "), "", values.context].filter((l, i) => l || i === 3).join("\n"),
    );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const next = Object.fromEntries(FIELDS.map((f) => [f, invalid(f, values)]));
    setErrors(next);
    const first = FIELDS.find((f) => next[f]);
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    // honeypot: only a bot fills a field nobody can see; let it think it worked
    if (values.website) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      await submitInquiry({ ...values, topics: labels });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field = (f: Field) => ({
    id: id(f),
    onBlur: () => blur(f),
    "aria-invalid": errors[f] || undefined,
    "aria-describedby": errors[f] ? id(`${f}-error`) : undefined,
  });
  const error = (f: Field) =>
    errors[f] ? (
      <p className="field__error" id={id(`${f}-error`)}>
        {t.errors[f]}
      </p>
    ) : null;
  const [errBefore, errAfter] = t.error.split("{email}");

  return (
    <section id="contact" className="section contact">
      <div className="container contact__grid">
        <div className="contact__left reveal">
          <div className="eyebrow eyebrow--left">{t.eyebrow}</div>
          <h2>{t.title}</h2>
          <p className="contact__sub">{t.sub}</p>
          <ul className="contact__channels">
            {t.channels.map((ch) => (
              <li key={ch.label}>
                <span className="contact__ch-label">{ch.label}</span>
                {ch.href ? (
                  <a className="contact__ch-value contact__ch-link" href={ch.href}>
                    {ch.value}
                  </a>
                ) : (
                  <span className="contact__ch-value">{ch.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <form className="card contact__form reveal" onSubmit={onSubmit} noValidate>
          <h3>{t.formTitle}</h3>
          <p className="contact__formsub">{t.formSub}</p>

          {status !== "sent" && (
            <>
              <div className="field-row">
                <div className="field">
                  <label htmlFor={id("name")}>{t.name}</label>
                  <input
                    {...field("name")}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={t.namePh}
                    value={values.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                  {error("name")}
                </div>
                <div className="field">
                  <label htmlFor={id("email")}>{t.email}</label>
                  <input
                    {...field("email")}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={t.emailPh}
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  {error("email")}
                </div>
              </div>
              <div className="field">
                <label htmlFor={id("company")}>{t.company}</label>
                <input
                  id={id("company")}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder={t.companyPh}
                  value={values.company}
                  onChange={(e) => set("company", e.target.value)}
                />
              </div>
              <fieldset className="field field--topics">
                <legend>{t.topicsLegend}</legend>
                <div className="need-chips">
                  {TOPICS.map((x) => (
                    <button
                      type="button"
                      key={x}
                      className="need-chip"
                      aria-pressed={topics.includes(x)}
                      onClick={() => toggle(x)}
                    >
                      {t.topics[x]}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="field">
                <label htmlFor={id("context")}>{t.context}</label>
                <textarea
                  {...field("context")}
                  name="message"
                  rows={4}
                  required
                  placeholder={t.contextPh}
                  value={values.context}
                  onChange={(e) => set("context", e.target.value)}
                />
                {error("context")}
              </div>
              {/* off-screen rather than display:none, which some bots know to skip */}
              <div className="contact__hp" aria-hidden="true">
                <label htmlFor={id("website")}>Website</label>
                <input
                  id={id("website")}
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(e) => set("website", e.target.value)}
                />
              </div>
              <div className="field field--consent">
                <div className="consent">
                  <input
                    {...field("consent")}
                    name="consent"
                    type="checkbox"
                    required
                    checked={values.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                  />
                  <label htmlFor={id("consent")}>
                    {t.consent}{" "}
                    {SITE.privacyUrl ? (
                      <a href={SITE.privacyUrl} target="_blank" rel="noopener">
                        {t.privacy}
                      </a>
                    ) : (
                      <span className="consent__policy">{t.privacy}</span>
                    )}
                  </label>
                </div>
                {error("consent")}
              </div>
              <button type="submit" className="btn btn--primary contact__submit" disabled={status === "sending"}>
                {status === "sending" && <span className="contact__spinner" aria-hidden="true" />}
                {status === "sending" ? t.sending : t.submit}
              </button>
            </>
          )}

          <div className="contact__status" role="status">
            {status === "sent" && (
              <p className="contact__sent" ref={sentRef} tabIndex={-1}>
                {t.sent}
              </p>
            )}
            {status === "error" && (
              <p className="contact__error">
                {errBefore}
                <a href={mailto}>{SITE.email}</a>
                {errAfter}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

// Shared runtime for the static blog post pages (blog/<slug>/index.html). No React: the full
// bilingual article is already in the HTML, and the design-system CSS is linked render-blocking
// from the page head (see gen-blog.mjs) so nothing flashes unstyled. This only toggles the
// language (EN/SK) and the mobile menu, mirroring the ?lang=sk + localStorage rules used app-wide.
type Lang = "en" | "sk";
const root = document.documentElement;

function detect(): Lang {
  const url = new URLSearchParams(location.search).get("lang");
  if (url === "sk" || url === "en") return url;
  try {
    const stored = localStorage.getItem("etereo.lang");
    if (stored === "sk" || stored === "en") return stored;
  } catch {
    /* private mode can throw on access */
  }
  const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  return langs.some((l) => /^(sk|cs)/i.test(l)) ? "sk" : "en";
}

function apply(lang: Lang, persist: boolean) {
  root.setAttribute("lang", lang);

  // swap the two article bodies
  document.querySelectorAll<HTMLElement>("[data-lang-body]").forEach((el) => {
    el.hidden = el.getAttribute("data-lang-body") !== lang;
  });
  // swap every inline chrome/label string
  document.querySelectorAll<HTMLElement>("[data-en][data-sk]").forEach((el) => {
    const v = el.getAttribute("data-" + lang);
    if (v != null) el.textContent = v;
  });
  // title + meta description from the values baked onto <html>
  const title = root.getAttribute("data-title-" + lang);
  if (title) document.title = title;
  const desc = root.getAttribute("data-desc-" + lang);
  if (desc) {
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", desc);
  }
  // active language button
  document.querySelectorAll<HTMLElement>("[data-lang-btn]").forEach((b) => {
    b.classList.toggle("on", b.getAttribute("data-lang-btn") === lang);
  });
  // keep the URL shareable/crawlable (sk => ?lang=sk, en drops it)
  const u = new URL(location.href);
  if (lang === "sk") u.searchParams.set("lang", "sk");
  else u.searchParams.delete("lang");
  history.replaceState(null, "", u.pathname + u.search + u.hash);

  if (persist) {
    try {
      localStorage.setItem("etereo.lang", lang);
    } catch {
      /* ignore */
    }
  }
}

apply(detect(), false);

document.querySelectorAll<HTMLElement>("[data-lang-btn]").forEach((b) => {
  b.addEventListener("click", () => apply(b.getAttribute("data-lang-btn") as Lang, true));
});

const burger = document.querySelector(".nav__burger");
const links = document.querySelector(".nav__links");
burger?.addEventListener("click", () => links?.classList.toggle("open"));
links?.addEventListener("click", (e) => {
  if ((e.target as HTMLElement).closest("a")) links.classList.remove("open");
});

import type { Lang } from "../store";

const STORAGE_KEY = "etereo.lang";

const isLang = (v: string | null | undefined): v is Lang => v === "en" || v === "sk";

function fromParam(): Lang | null {
  const v = new URLSearchParams(window.location.search).get("lang")?.toLowerCase();
  return isLang(v) ? v : null;
}

/** The last language the visitor explicitly chose. */
function fromStorage(): Lang | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return isLang(v) ? v : null;
  } catch {
    return null; // private window, or site data blocked
  }
}

/**
 * Scans the whole list, not just `navigator.language` — a visitor's second
 * preference may be one we ship. `cs` resolves to `sk` (mutually intelligible).
 */
function fromBrowser(): Lang | null {
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const base = tag?.toLowerCase().split("-")[0];
    if (base === "sk" || base === "cs") return "sk";
    if (base === "en") return "en";
  }
  return null;
}

/** Explicit choices only — storing a detected one would freeze a guess forever. */
export function rememberLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // no storage — the ?lang= param still carries the choice
  }
}

/**
 * Most explicit signal first, resolved once at store creation so the first render
 * is already right. Country/IP is deliberately unused: it needs a third-party
 * round trip on static hosting and is a poor proxy for language.
 */
export function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  const param = fromParam();
  if (param) {
    rememberLang(param); // arriving on a variant counts as choosing it
    return param;
  }
  return fromStorage() ?? fromBrowser() ?? "en";
}

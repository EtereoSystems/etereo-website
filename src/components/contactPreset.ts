import type { MouseEvent } from "react";
import type { Lang } from "../store";
import type { TopicId } from "../i18n/content";

export type ProductParam = "ai" | "custom" | "saas" | "web" | "cloud";
type Preset = { product: ProductParam };

const TOPIC_FOR = new Map<string, TopicId>([
  ["ai", "ai"],
  ["custom", "custom"],
  ["saas", "saas"],
  ["web", "web"],
  ["cloud", "cloud"],
]);

export const PRESET_EVENT = "contact:preset";

/** The chip a `?product=` URL asks the contact form to start with. */
export function readPreset(search: string): TopicId[] {
  const id = TOPIC_FOR.get(new URLSearchParams(search).get("product") ?? "");
  return id ? [id] : [];
}

/** Where the link goes without JS, or in a new tab. */
export function contactHref(lang: Lang, preset: Preset): string {
  const q = new URLSearchParams(lang === "en" ? [] : [["lang", lang]]);
  for (const [k, v] of Object.entries(preset)) q.set(k, v);
  return `/?${q}#contact`;
}

/** Same-page version: a changed query string would reload the page and restart the hero. */
export function openContact(e: MouseEvent<HTMLAnchorElement>, preset: Preset) {
  const target = document.getElementById("contact");
  if (!target || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  const url = new URL(window.location.href);
  url.searchParams.delete("product");
  for (const [k, v] of Object.entries(preset)) url.searchParams.set(k, v);
  url.hash = "contact";
  window.history.pushState(null, "", url);
  window.dispatchEvent(new Event(PRESET_EVENT));
  target.scrollIntoView();
}

import type { MouseEvent } from "react";
import type { Lang } from "../store";
import type { EngagementType, TopicId } from "../i18n/content";

export type ProductParam = "ai" | "custom" | "saas" | "web" | "cloud";
type Preset = { type: EngagementType } | { product: ProductParam };

// A delivery team is an engagement shape rather than a topic, so `?type=team` is valid
// but has no chip to select.
const TOPIC_FOR = {
  type: new Map<string, TopicId>([
    ["assessment", "assessment"],
    ["embedded", "team-extension"],
  ]),
  product: new Map<string, TopicId>([
    ["ai", "ai"],
    ["custom", "custom"],
    ["saas", "saas"],
    ["web", "web"],
    ["cloud", "cloud"],
  ]),
};

export const PRESET_EVENT = "contact:preset";

/** The chips a `?type=` / `?product=` URL asks the contact form to start with. */
export function readPreset(search: string): TopicId[] {
  const q = new URLSearchParams(search);
  return (["type", "product"] as const).flatMap((k) => {
    const id = TOPIC_FOR[k].get(q.get(k) ?? "");
    return id ? [id] : [];
  });
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
  url.searchParams.delete("type");
  url.searchParams.delete("product");
  for (const [k, v] of Object.entries(preset)) url.searchParams.set(k, v);
  url.hash = "contact";
  window.history.pushState(null, "", url);
  window.dispatchEvent(new Event(PRESET_EVENT));
  target.scrollIntoView();
}

import { create } from "zustand";
import { detectLang, rememberLang } from "./i18n/lang";

export type Lang = "en" | "sk";

interface UIState {
  lang: Lang;
  setLang: (l: Lang) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  /** true once the hero 3D scene has zoomed in far enough to reveal the site */
  entered: boolean;
  setEntered: (v: boolean) => void;
}

export const useUI = create<UIState>((set) => ({
  lang: detectLang(),
  setLang: (lang) => {
    // only reachable from the language switcher, so this is always an explicit choice
    rememberLang(lang);
    set({ lang });
  },
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  entered: false,
  setEntered: (entered) => set({ entered }),
}));

/**
 * Hero scroll progress lives outside React so the 3D loop can read it every
 * frame without triggering component re-renders. 0 = top of page, 1 = fully
 * zoomed into the MacBook screen.
 */
export const heroScroll = { progress: 0 };

/**
 * Mirror of `prefers-reduced-motion`, kept outside React like `heroScroll` so the
 * frame loop can read it every frame. Gates the autonomous idle float/sway only.
 */
export const motionPref = { reduced: false };

if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionPref.reduced = mq.matches;
  mq.addEventListener("change", (e) => {
    motionPref.reduced = e.matches;
  });
}

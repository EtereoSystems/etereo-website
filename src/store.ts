import { create } from "zustand";

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
  lang: "en",
  setLang: (lang) => set({ lang }),
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

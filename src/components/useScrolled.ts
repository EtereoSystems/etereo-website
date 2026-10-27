import { useEffect } from "react";

/**
 * Toggles `body[data-scrolled]` once the page has scrolled past the nav, so the
 * fixed header picks up its frosted-glass background on the subpages (nav.css reads
 * this flag). The home page writes the same flag from its own scroll loop in App.tsx,
 * at the same 24px threshold; this is the native-scroll equivalent for pages without
 * the hero's Lenis loop.
 */
export function useScrolled() {
  useEffect(() => {
    // Writing a dataset attribute invalidates style even when the value is unchanged,
    // so write only on an actual transition — the same discipline App.tsx keeps.
    let scrolled: boolean | null = null;
    const update = () => {
      const now = window.scrollY > 24;
      if (now !== scrolled) {
        scrolled = now;
        document.body.dataset.scrolled = now ? "true" : "false";
      }
    };
    update(); // a page can load already scrolled (anchor, refresh, back-forward)
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
}

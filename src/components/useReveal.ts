import { useEffect } from "react";

/** Items landing in the same batch stagger against each other; this caps how long that runs. */
const STAGGER_CAP = 5;

/**
 * Adds `.in` to any `.reveal` element as it enters the viewport.
 *
 * The bottom rootMargin starts the fade while the element is still below the fold, so it
 * is already settling by the time it is actually looked at — which is also the window in
 * which its images and fonts finish arriving.
 */
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        // Everything crossing the line in one callback is one visual group, so it steps
        // in order down the page. An element arriving on its own gets --i 0 and no delay.
        const shown = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        shown.forEach((e, i) => {
          const el = e.target as HTMLElement;
          el.style.setProperty("--i", String(Math.min(i, STAGGER_CAP)));
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { threshold: 0, rootMargin: "0px 0px 15% 0px" },
    );

    const scan = () => document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    scan();

    // Filtering the project hub mounts fresh .reveal nodes long after this effect ran, and
    // an unobserved one sits at opacity 0 for good. Observing twice is a no-op, so rescan.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}

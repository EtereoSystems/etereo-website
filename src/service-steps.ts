// The delivery stepper on the static service pages (markup from scripts/gen-services.mjs).

/** Wires one `.svc-steps` block as WAI-ARIA tabs, plus its Back / Next buttons. */
export function initSteps(root: HTMLElement) {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const panels = tabs.map((t) => root.querySelector<HTMLElement>("#" + t.getAttribute("aria-controls")));
  const pager = [...root.querySelectorAll<HTMLButtonElement>("[data-step-go]")];
  const last = tabs.length - 1;
  let current = 0;

  const select = (i: number) => {
    current = Math.max(0, Math.min(last, i));
    tabs.forEach((t, j) => {
      t.setAttribute("aria-selected", String(j === current));
      t.tabIndex = j === current ? 0 : -1;
      t.classList.toggle("done", j < current);
    });
    panels.forEach((p, j) => p?.classList.toggle("is-active", j === current));
    // aria-disabled rather than disabled, which would drop keyboard focus at either end
    for (const b of pager) {
      const atEnd = Number(b.dataset.stepGo) < 0 ? current === 0 : current === last;
      if (atEnd) b.setAttribute("aria-disabled", "true");
      else b.removeAttribute("aria-disabled");
    }
  };

  tabs.forEach((t, i) => t.addEventListener("click", () => select(i)));

  root.querySelector('[role="tablist"]')?.addEventListener("keydown", (e) => {
    const key = (e as KeyboardEvent).key;
    const to =
      key === "ArrowRight" || key === "ArrowDown"
        ? (current + 1) % tabs.length
        : key === "ArrowLeft" || key === "ArrowUp"
          ? (current - 1 + tabs.length) % tabs.length
          : key === "Home"
            ? 0
            : key === "End"
              ? last
              : null;
    if (to === null) return;
    e.preventDefault();
    select(to);
    tabs[current].focus();
  });

  for (const b of pager) {
    b.addEventListener("click", () => {
      if (b.getAttribute("aria-disabled") === "true") return;
      select(current + Number(b.dataset.stepGo));
      // On a phone the buttons sit under a tall panel: bring the new step's start back into view.
      const top = root.getBoundingClientRect().top;
      const nav = document.querySelector(".nav")?.getBoundingClientRect().height ?? 0;
      if (top < nav) {
        const smooth = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: window.scrollY + top - nav - 16, behavior: smooth ? "smooth" : "auto" });
      }
    });
  }

  select(0);
}

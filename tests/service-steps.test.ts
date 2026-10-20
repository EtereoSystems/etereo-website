import { beforeEach, describe, expect, it } from "vitest";
import { initSteps } from "../src/service-steps";

// the shape scripts/gen-services.mjs emits, minus the copy
const markup = (n: number) => `
  <div class="svc-steps">
    <div role="tablist">${Array.from({ length: n }, (_, i) => `<button role="tab" aria-controls="p${i}"></button>`).join("")}</div>
    ${Array.from({ length: n }, (_, i) => `<section id="p${i}" role="tabpanel"></section>`).join("")}
    <button data-step-go="-1"></button><button data-step-go="1"></button>
  </div>`;

let root: HTMLElement;
const tabs = () => [...root.querySelectorAll<HTMLElement>('[role="tab"]')];
const selected = () => tabs().findIndex((t) => t.getAttribute("aria-selected") === "true");
const shown = () => [...root.querySelectorAll('[role="tabpanel"]')].map((p) => p.classList.contains("is-active"));
const pager = (dir: 1 | -1) => root.querySelector<HTMLElement>(`[data-step-go="${dir}"]`)!;
const press = (key: string) =>
  root.querySelector('[role="tablist"]')!.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));

beforeEach(() => {
  document.body.innerHTML = markup(3);
  root = document.querySelector<HTMLElement>(".svc-steps")!;
  initSteps(root);
});

describe("service page stepper", () => {
  it("starts on the first step, with only its panel shown and Back unavailable", () => {
    expect(selected()).toBe(0);
    expect(shown()).toEqual([true, false, false]);
    expect(tabs().map((t) => t.tabIndex)).toEqual([0, -1, -1]);
    expect(pager(-1).getAttribute("aria-disabled")).toBe("true");
    expect(pager(1).hasAttribute("aria-disabled")).toBe(false);
  });

  // aria-disabled, not disabled: a disabled button would drop keyboard focus at the ends
  it("walks the steps with Next and Back and stops at either end", () => {
    pager(1).click();
    pager(1).click();
    pager(1).click();
    expect(selected()).toBe(2);
    expect(shown()).toEqual([false, false, true]);
    expect(pager(1).getAttribute("aria-disabled")).toBe("true");
    pager(-1).click();
    expect(selected()).toBe(1);
    expect(pager(1).hasAttribute("aria-disabled")).toBe(false);
  });

  it("marks the steps already behind you as done, for the rail", () => {
    tabs()[2].click();
    expect(tabs().map((t) => t.classList.contains("done"))).toEqual([true, true, false]);
  });

  it("follows the WAI-ARIA tabs keys: arrows wrap and take focus along, Home and End jump", () => {
    press("ArrowLeft");
    expect(selected()).toBe(2);
    expect(document.activeElement).toBe(tabs()[2]);
    press("ArrowDown");
    expect(selected()).toBe(0);
    press("End");
    expect(selected()).toBe(2);
    press("Home");
    expect(selected()).toBe(0);
    expect(tabs().map((t) => t.tabIndex)).toEqual([0, -1, -1]);
  });
});

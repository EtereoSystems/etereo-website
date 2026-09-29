import { afterEach, describe, expect, it } from "vitest";
import {
  BEATS,
  INTRO_END,
  LX,
  SHOW_END,
  clamp,
  computeShow,
  currentProgress,
  interpArr,
  seg,
} from "../src/three/choreo";
import { PROJECT_COUNT } from "../src/i18n/projects";
import { heroScroll } from "../src/store";

/** Progress samples dense enough that no beat can hide between two of them. */
const SAMPLES = Array.from({ length: 2001 }, (_, i) => i / 2000);

describe("choreo timeline", () => {
  it("has one laptop x per project, with the last centred for the zoom", () => {
    expect(LX).toHaveLength(PROJECT_COUNT);
    expect(LX.at(-1)).toBe(0);
  });

  it("spans one beat fewer than the project count", () => {
    expect(BEATS).toBe(PROJECT_COUNT - 1);
  });

  it("never returns an index outside PROJECTS", () => {
    for (const p of SAMPLES) {
      const { index } = computeShow(p);
      expect(index, `at p=${p}`).toBeGreaterThanOrEqual(0);
      expect(index, `at p=${p}`).toBeLessThan(PROJECT_COUNT);
    }
  });

  // Adding a project shifts every beat; if one stops being reachable it is simply
  // never shown, which no type or lint rule would notice.
  it("gives every project a stretch of scroll", () => {
    const seen = new Set(SAMPLES.filter((p) => computeShow(p).active).map((p) => computeShow(p).index));
    expect([...seen].sort((a, b) => a - b)).toEqual(
      Array.from({ length: PROJECT_COUNT }, (_, i) => i),
    );
  });

  it("shows the splash before INTRO_END and the handoff after SHOW_END", () => {
    expect(computeShow(0).active).toBe(false);
    expect(computeShow(INTRO_END - 0.001).active).toBe(false);
    expect(computeShow(INTRO_END).active).toBe(true);
    expect(computeShow(SHOW_END).active).toBe(true);
    expect(computeShow(SHOW_END + 0.001).active).toBe(false);
    expect(computeShow(1).index).toBe(PROJECT_COUNT - 1);
  });

  it("puts the text opposite the laptop", () => {
    for (const p of SAMPLES) {
      const { index, side } = computeShow(p);
      if (index >= PROJECT_COUNT - 1) continue; // last beat is centred, side is fixed
      expect(side, `at p=${p}`).toBe(LX[index] < 0 ? "right" : "left");
    }
  });
});

describe("choreo maths", () => {
  it("clamps to the unit range by default", () => {
    expect(clamp(-1)).toBe(0);
    expect(clamp(2)).toBe(1);
    expect(clamp(0.5)).toBe(0.5);
  });

  it("eases monotonically from 0 to 1 across the segment", () => {
    expect(seg(0, 0.2, 0.8)).toBe(0);
    expect(seg(1, 0.2, 0.8)).toBe(1);
    let prev = -1;
    for (const p of SAMPLES) {
      const v = seg(p, 0.2, 0.8);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });

  it("interpolates inside an array and holds at both ends", () => {
    const arr = [0, 10, 20];
    expect(interpArr(arr, 0)).toBe(0);
    expect(interpArr(arr, 0.5)).toBe(5);
    expect(interpArr(arr, 1.5)).toBe(15);
    expect(interpArr(arr, -3)).toBe(0);
    expect(interpArr(arr, 99)).toBe(20);
  });
});

describe("currentProgress", () => {
  afterEach(() => {
    delete (window as { __P?: number }).__P;
    heroScroll.progress = 0;
  });

  it("reads the store", () => {
    heroScroll.progress = 0.42;
    expect(currentProgress()).toBe(0.42);
  });

  // The documented way to park the animation at a pose while checking a frame by hand.
  it("lets window.__P override it", () => {
    heroScroll.progress = 0.42;
    (window as { __P?: number }).__P = 0.9;
    expect(currentProgress()).toBe(0.9);
  });
});

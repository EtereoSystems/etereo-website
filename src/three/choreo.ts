import { heroScroll } from "../store";
import { PROJECT_COUNT } from "../i18n/projects";

export const INTRO_END = 0.08;
export const SHOW_END = 0.86;
// laptop position per project (beats 0..7): alternates sides each project (zig-zag), last centred
export const LX = [-1.2, 1.2, -1.2, 1.2, -1.2, 1.2, -1.2, 0.0];

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export function seg(p: number, a: number, b: number) {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
}
export function interpArr(arr: number[], f: number) {
  const n = arr.length;
  const i = Math.max(0, Math.min(n - 2, Math.floor(f)));
  const t = Math.min(1, Math.max(0, f - i));
  return arr[i] + (arr[i + 1] - arr[i]) * t;
}

/** current scroll progress, allowing a `window.__P` test override */
export function currentProgress(): number {
  const w = window as unknown as { __P?: number };
  return typeof w.__P === "number" ? w.__P : heroScroll.progress;
}

export interface ShowState {
  index: number;
  side: "left" | "right";
  active: boolean;
}

// projects face at integer beats; span is N-1 so project 0 sits at the start (flowing
// straight out of the splash) and the last project lands exactly at SHOW_END.
export const BEATS = PROJECT_COUNT - 1;

/** which project (and text side) should be shown for a given progress */
export function computeShow(p: number): ShowState {
  if (p < INTRO_END) {
    // splash shows the ETEREO branding, not a project panel
    return { index: 0, side: LX[0] < 0 ? "right" : "left", active: false };
  }
  if (p <= SHOW_END) {
    const phase = clamp((p - INTRO_END) / (SHOW_END - INTRO_END));
    const index = Math.min(PROJECT_COUNT - 1, Math.round(phase * BEATS));
    const side: "left" | "right" =
      index >= PROJECT_COUNT - 1 ? "left" : LX[index] < 0 ? "right" : "left";
    return { index, side, active: true };
  }
  return { index: PROJECT_COUNT - 1, side: "left", active: false };
}

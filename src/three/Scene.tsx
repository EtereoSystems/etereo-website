import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Macbook } from "./Macbook";
import { currentProgress } from "./choreo";
import { motionPref } from "../store";

// Scrolling is the content, so it gets every frame it asks for. The idle drift and the
// typewriter behind the splash do not: they are a 0.5 Hz sine and a ~13 char/s cursor,
// and a visitor who never scrolls was otherwise paying for 60 full passes a second of a
// scene that looks the same.
const IDLE_FPS = 24;
const HOT_MS = 420; // full rate this long past the last progress change (Lenis keeps easing)
const WARMUP_MS = 2500; // model, environment and first textures all land in here
// Share of the main thread the idle animation may take. A frame costs what the device
// makes it cost — 3 ms on a laptop, 150 ms on a cheap phone with no real GPU — so pacing
// by a fixed fps hands the weakest devices the largest bill. Holding a duty cycle instead
// keeps the drift at IDLE_FPS wherever that is nearly free and backs off to a few frames
// a second where it is not, which is the difference between a responsive page and a
// blocked one on the hardware that struggles.
const IDLE_DUTY = 0.25;

/** Drives `frameloop="demand"`: decides which frames are worth rendering. */
function Pacer({ running }: { running: boolean }) {
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = -Infinity;
    let movedAt = -Infinity;
    let lastP = NaN;
    let prevT = 0;
    let drew = false;
    let cost = 0; // rolling estimate of what one rendered frame costs this device
    const t0 = performance.now();

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      // A frame we drew is as long as the render made it; one we skipped is the bare
      // rAF interval. The gap between the two is the render, near enough to pace by.
      if (drew && prevT) cost = cost ? cost * 0.8 + (t - prevT - 16.7) * 0.2 : t - prevT - 16.7;
      prevT = t;
      drew = false;

      const p = currentProgress();
      if (p !== lastP) ((lastP = p), (movedAt = t));
      if (t - movedAt < HOT_MS) {
        // the user's own gesture, and it carries the content — never throttled
        ((last = t), (drew = true), invalidate());
        return;
      }
      // Under prefers-reduced-motion a parked scroll means a genuinely static frame —
      // the sway is off and the terminal holds one line — so stop drawing altogether.
      if (motionPref.reduced && t - t0 > WARMUP_MS) return;
      if (t - last < Math.max(1000 / IDLE_FPS, Math.max(0, cost) / IDLE_DUTY)) return;
      ((last = t), (drew = true), invalidate());
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, invalidate]);

  return null;
}

// What caps the framerate on a phone is per-pixel shading, not the geometry: six dynamic
// lights on a PBR material, multisampled, at 1.5× the CSS resolution is more fragment work
// than a mobile GPU can finish in 16 ms, which is why the scroll ran at ~20fps. The mobile
// tier below spends far less per pixel — a lower drawing buffer, no MSAA, and three of the
// six lights — and desktop keeps the full-quality look untouched. Read once (like SS in
// screenTexture): a resize does not switch tiers, and nobody rotates a desktop into a phone.
const MOBILE = window.innerWidth < 900;

/** `running` false parks the render loop entirely — see Hero. */
export default function Scene({ running }: { running: boolean }) {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0.15, 6.4], fov: 34, near: 0.1, far: 100 }}
      // A lower cap on the phone: dpr is quadratic in fragment cost, so 1.25 instead of 1.5
      // is ~30% fewer pixels to shade every frame, and the dark, stylised scene hides the
      // softening the browser's upscale adds.
      dpr={MOBILE ? [1, 1.25] : [1, 1.8]}
      // MSAA is one of the costliest things a mobile GPU does; the dpr keeps edges clean
      // enough without it. Stencil buffer is unused either way.
      gl={{ antialias: !MOBILE, alpha: true, stencil: false, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Pacer running={running} />
      <ambientLight intensity={MOBILE ? 0.62 : 0.5} />
      <directionalLight position={[4, 6, 5]} intensity={2.3} color="#eef2ff" />
      <directionalLight position={[-6, 2, -3]} intensity={1.35} color="#6d54f0" />
      {/* The three positional lights stand in for the studio panels an env map used to
          reflect — the priciest part of the fragment shader. Desktop keeps all three; a
          phone keeps only the brightest, turned up to make up for the two it drops. */}
      {!MOBILE && <pointLight position={[0, -2, 3]} intensity={0.75} color="#9db4ff" />}
      <pointLight position={[-3.2, 3.2, 4.6]} intensity={MOBILE ? 1.5 : 1.15} decay={0} color="#dfe6ff" />
      {!MOBILE && <pointLight position={[3.4, -1.4, 3.2]} intensity={0.6} decay={0} color="#8b78ff" />}

      <Suspense fallback={null}>
        <Macbook />
      </Suspense>
    </Canvas>
  );
}

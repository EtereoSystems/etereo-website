import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useUI } from "../store";
import { makeScreenTexture } from "./screenTexture";
import { PROJECT_COUNT } from "../i18n/projects";
import { INTRO_END, SHOW_END, LX, lerp, seg, clamp, interpArr, currentProgress } from "./choreo";

const TWO_PI = Math.PI * 2;
const MODEL_FIT = 3.4;

// ── mobile framing ────────────────────────────────────────────────────────────
// Below this canvas width we drop the left/right travel: the laptop stays centred
// and lifted into the upper half so the project description can sit beneath it.
const MOBILE_MAX = 900;
const MOBILE_Y = 1.02; // how far up the laptop floats (leaves the lower half for text)
const MOBILE_SCALE = 0.42; // base fit scale (smaller so it never clips on a narrow screen)

export function Macbook() {
  const { scene } = useGLTF("/models/macbook.glb");
  const camera = useThree((s) => s.camera);
  const group = useRef<THREE.Group>(null);
  const setEntered = useUI((s) => s.setEntered);
  const enteredRef = useRef(false);
  const fit = useRef(1);
  const drawn = useRef<number | "final" | null>(null);

  const { model, screenTex, draw } = useMemo(() => {
    const src = scene.clone(true);
    const box = new THREE.Box3().setFromObject(src);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    fit.current = MODEL_FIT / Math.max(size.x, size.y, size.z);
    src.position.sub(center);
    const wrap = new THREE.Group();
    wrap.add(src);

    const { texture, draw } = makeScreenTexture();

    src.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const nm = (mat?.name || "") + " " + (mesh.name || "");
      if (/Glass_-_Heavy_Color/i.test(mat?.name || "")) {
        mesh.material = new THREE.MeshStandardMaterial({
          map: texture,
          emissiveMap: texture,
          emissive: new THREE.Color("#ffffff"),
          emissiveIntensity: 1.2,
          roughness: 0.3,
          metalness: 0,
        });
      } else if (/keyboard/i.test(nm)) {
        mat.metalness = 0.6;
        mat.roughness = 0.5;
      } else if (mat) {
        mat.metalness = 0.85;
        mat.roughness = 0.34;
        mat.color = new THREE.Color("#c9ccd6");
        mat.envMapIntensity = 1.1;
      }
    });
    return { model: wrap, screenTex: texture, draw };
  }, [scene]);

  useEffect(() => () => screenTex.dispose(), [screenTex]);

  const setScreen = (idx: number | "final") => {
    if (drawn.current !== idx) {
      draw(idx);
      screenTex.needsUpdate = true;
      drawn.current = idx;
    }
  };

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const p = currentProgress();
    const t = state.clock.elapsedTime;
    const root = document.documentElement.style;
    const mobile = state.size.width < MOBILE_MAX;

    if (p < INTRO_END) {
      // splash. Desktop: laptop rests on the LEFT (LX[0]) with the wordmark on the
      // right. Mobile: laptop is centred and lifted, with the wordmark below it.
      // Either way this is exactly project 0's pose, so the hand-off needs no jump.
      const settle = seg(p, 0, INTRO_END); // sway eases out as we approach the showcase
      const sway = 1 - settle;
      g.rotation.x = 0.12 + Math.sin(t * 0.5) * 0.02 * sway;
      g.rotation.z = 0;
      if (mobile) {
        g.rotation.y = Math.sin(t * 0.4) * 0.12 * sway;
        g.position.x = 0;
        g.position.y = MOBILE_Y + Math.sin(t * 0.6) * 0.03 * sway;
        g.position.z = 0.35;
        g.scale.setScalar(fit.current * MOBILE_SCALE);
      } else {
        g.rotation.y = Math.sin(t * 0.4) * 0.16 * sway;
        g.position.x = LX[0];
        g.position.y = -0.03 + Math.sin(t * 0.6) * 0.03 * sway;
        g.position.z = 0.55;
        g.scale.setScalar(fit.current * 0.7);
      }
      setScreen(0);
      camera.position.set(0, 0.12, 6.4);
      camera.lookAt(0, 0.05, 0);
      root.setProperty("--hero-fade", (1 - seg(p, INTRO_END * 0.55, INTRO_END)).toFixed(3));
      root.setProperty("--handoff", "0");
    } else if (p <= SHOW_END) {
      // spin carousel: each project faces at an integer beat; span is N-1 so project 0
      // sits at the very start (flowing straight out of the splash) and the last lands at SHOW_END.
      const phase = clamp((p - INTRO_END) / (SHOW_END - INTRO_END));
      const beatFloat = phase * (PROJECT_COUNT - 1);
      const proj = Math.min(PROJECT_COUNT - 1, Math.round(beatFloat));

      g.rotation.y = -beatFloat * TWO_PI; // faces (y≡0) at each integer beat, back between
      g.rotation.x = 0.12 + Math.sin(t * 0.6) * 0.02;
      g.rotation.z = 0;

      const facing = (Math.cos(beatFloat * TWO_PI) + 1) / 2; // 1 while presenting, 0 back-on
      if (mobile) {
        // stay centred; spin in place to reveal each project — the description sits beneath (CSS)
        g.position.x = 0;
        g.position.y = MOBILE_Y + Math.sin(t * 0.7) * 0.025;
        g.position.z = facing * 0.3;
        g.scale.setScalar(fit.current * (MOBILE_SCALE - 0.05 + facing * 0.05));
      } else {
        g.position.x = interpArr(LX, beatFloat);
        g.position.y = -0.04 + Math.sin(t * 0.7) * 0.03;
        g.position.z = facing * 0.55; // breathing zoom: closer while presenting, back while spinning
        g.scale.setScalar(fit.current * (0.5 + facing * 0.2));
      }

      setScreen(proj);
      camera.position.set(0, 0.12, 6.4);
      camera.lookAt(0, 0.05, 0);
      root.setProperty("--hero-fade", "0");
      root.setProperty("--handoff", "0");
    } else {
      // final zoom into the screen → hand off to the site. The last project already
      // faces us, centred (LX[7]=0), so we continue straight in with no re-spin.
      const zt = seg(p, SHOW_END, 1);
      setScreen("final");
      g.rotation.y = 0;
      g.rotation.x = lerp(0.12, 0.045, zt);
      g.rotation.z = 0;
      g.position.x = 0;
      if (mobile) {
        g.position.y = lerp(MOBILE_Y, 0.1, zt);
        g.position.z = lerp(0.3, 4.5, zt);
        g.scale.setScalar(fit.current * lerp(MOBILE_SCALE - 0.05, 3.0, zt));
      } else {
        g.position.y = lerp(-0.04, 0.12, zt);
        g.position.z = lerp(0.55, 4.9, zt);
        g.scale.setScalar(fit.current * lerp(0.7, 3.4, zt));
      }
      camera.position.set(0, 0.12, 6.4);
      camera.lookAt(0, 0.05, 0);
      root.setProperty("--hero-fade", "0");
      root.setProperty("--handoff", seg(p, 0.92, 1).toFixed(3));
    }

    const nowEntered = p > 0.99;
    if (nowEntered !== enteredRef.current) {
      enteredRef.current = nowEntered;
      setEntered(nowEntered);
    }
  });

  return <primitive ref={group} object={model} />;
}

useGLTF.preload("/models/macbook.glb");

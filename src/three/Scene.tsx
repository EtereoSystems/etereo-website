import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, ContactShadows } from "@react-three/drei";
import { Macbook } from "./Macbook";

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 6.4], fov: 34, near: 0.1, far: 100 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} color="#eef2ff" />
      <directionalLight position={[-6, 2, -3]} intensity={0.8} color="#6d54f0" />
      <pointLight position={[0, -2, 3]} intensity={0.4} color="#9db4ff" />

      <Suspense fallback={null}>
        <Macbook />
        <ContactShadows
          position={[0, -1.15, 0]}
          opacity={0.5}
          scale={12}
          blur={2.6}
          far={4}
          color="#05060f"
        />
        {/* in-scene studio environment — no external HDR download */}
        <Environment resolution={256}>
          <Lightformer intensity={2.2} position={[0, 3, 2]} scale={[8, 3, 1]} color="#ffffff" />
          <Lightformer intensity={1.1} position={[-4, 1, 1]} scale={[3, 4, 1]} color="#9db4ff" />
          <Lightformer intensity={1.4} position={[4, 0, 2]} scale={[3, 4, 1]} color="#8b78ff" />
          <Lightformer intensity={0.8} position={[0, -3, 1]} scale={[8, 2, 1]} color="#3a3f66" />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

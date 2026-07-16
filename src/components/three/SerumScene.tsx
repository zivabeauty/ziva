"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * The centerpiece: a glass "serum bead" that slowly turns, refracting a
 * gold core through itself. Everything is procedural — no model files.
 * Lighting comes from in-scene Lightformers so it works fully offline
 * (no external HDR fetch).
 */

function GoldCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.6;
      ref.current.rotation.z += delta * 0.18;
    }
  });
  return (
    <mesh ref={ref} scale={0.62}>
      <torusKnotGeometry args={[0.7, 0.26, 180, 32]} />
      <meshStandardMaterial
        color="#C9A961"
        metalness={1}
        roughness={0.22}
        emissive="#5a4715"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

function GlassBead() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.22;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
  });
  return (
    <mesh ref={ref} scale={1.55}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshTransmissionMaterial
        transmission={1}
        thickness={1.6}
        roughness={0.06}
        ior={1.38}
        chromaticAberration={0.055}
        anisotropy={0.2}
        distortion={0.15}
        distortionScale={0.25}
        temporalDistortion={0.06}
        color="#fbedcf"
        attenuationColor="#d8b978"
        attenuationDistance={1.6}
        background={new THREE.Color("#0a0a0a")}
      />
    </mesh>
  );
}

function GoldRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.12;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0, 0]} scale={2.65}>
      <torusGeometry args={[1, 0.006, 16, 160]} />
      <meshStandardMaterial color="#E8D9B0" metalness={1} roughness={0.3} />
    </mesh>
  );
}

export default function SerumScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 34 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.1} />
      <pointLight position={[-4, -2, -4]} intensity={30} color="#C9A961" />

      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
        <GlassBead />
        <GoldCore />
      </Float>
      <GoldRing />

      <Sparkles
        count={44}
        scale={6}
        size={2.4}
        speed={0.3}
        opacity={0.7}
        color="#E8D9B0"
      />

      {/* In-scene studio — no external HDR, works offline */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 3, 2]}
          scale={[6, 3, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[-4, 0, 1]}
          scale={[3, 4, 1]}
          color="#E8D9B0"
        />
        <Lightformer
          form="circle"
          intensity={1.6}
          position={[3, -1, 2]}
          scale={[2, 2, 1]}
          color="#C9A961"
        />
      </Environment>
    </Canvas>
  );
}

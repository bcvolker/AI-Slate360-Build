"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Float, Stars } from "@react-three/drei";
import { Suspense } from "react";
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";

function HeroModel() {
  const { scene } = useGLTF(CEO_UPLOADS.heroModel);
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive object={scene} scale={2.5} />
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <HeroModel />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}

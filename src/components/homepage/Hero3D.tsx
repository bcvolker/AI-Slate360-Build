"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";

function Model() {
  try {
    // Try to load a 3D model - will fallback gracefully if not found
    const { scene } = useGLTF(CEO_UPLOADS.heroModel);
    return <primitive object={scene} scale={0.5} />;
  } catch (error) {
    // Fallback to a simple geometric shape
    return (
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
    );
  }
}

function Fallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-white/50">
        <div className="text-6xl mb-4">🏗️</div>
        <p className="text-lg">3D Model Loading...</p>
        <p className="text-sm">Interactive building visualization</p>
      </div>
    </div>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          <Model />

          <Environment preset="city" />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
          />
        </Suspense>
      </Canvas>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center text-white/90">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Slate360
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/70">
            The Operating System for the Physical World
          </p>
          <div className="text-sm text-white/50">
            Interactive 3D visualization • Drag to rotate • Scroll to zoom
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="absolute right-0 top-0 w-1/2 h-screen z-0 pointer-events-none">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = 'none';
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          <Model />

          <Environment preset="city" />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* HUD Controls */}
      <div className="absolute bottom-8 right-8 z-10 pointer-events-auto">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 text-white/60 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>Auto-rotating 3D model</span>
          </div>
        </div>
      </div>
    </div>
  );
}

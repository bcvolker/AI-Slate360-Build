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
    <div className="absolute right-0 top-0 w-2/5 h-screen z-0">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: "transparent" }}
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
            autoRotate={true}
            autoRotateSpeed={0.5}
            minDistance={3}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>

      {/* HUD Icon Bar - Vertical on the right */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 flex flex-col gap-3">
        <div className="bg-black/40 backdrop-blur-md rounded-lg p-3 shadow-lg border border-white/10">
          <div className="flex flex-col gap-3 text-white/80">
            {/* Rotate Icon */}
            <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Rotate">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            {/* Zoom Icon */}
            <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Zoom">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </button>

            {/* Pan Icon */}
            <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Pan">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>

            {/* Auto Rotate Toggle */}
            <button className="p-2 hover:bg-white/10 rounded transition-colors" title="Auto Rotate">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H13m-4 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

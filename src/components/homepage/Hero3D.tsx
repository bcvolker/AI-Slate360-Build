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
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}
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
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* HUD Controls */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-auto">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white/80 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="font-medium">Interactive 3D</span>
          </div>
          <div className="text-xs text-white/60 space-y-1">
            <div>🖱️ Drag to rotate</div>
            <div>🔍 Scroll to zoom</div>
            <div>👆 Right-click to pan</div>
          </div>
        </div>
      </div>
    </div>
  );
}

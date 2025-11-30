"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";
import { RotateCw, ZoomIn, Move, Play, Pause } from "lucide-react";

function Model() {
  const { scene } = useGLTF(CEO_UPLOADS.heroModel);
  return <primitive object={scene} scale={0.6} position={[0.4, 0, 0]} />;
}

function Fallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-slate-500">
        <div className="text-6xl mb-4">🏗️</div>
        <p className="text-lg">3D Model Loading...</p>
        <p className="text-sm">Interactive building visualization</p>
      </div>
    </div>
  );
}

export default function Hero3D() {
  const controlsRef = useRef<any>(null);
  const [autoRotate, setAutoRotate] = useState(false);

  const handleReset = () => {
    controlsRef.current?.reset();
  };

  return (
    <div className="w-full h-full relative group">
      <Canvas
        camera={{ position: [4, 2, 5], fov: 45 }}
        style={{ background: "transparent" }}
        className="cursor-move"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <Model />

          <Environment preset="city" />
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={1}
            minDistance={2}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
      
      {/* Interactive Hint Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
        <p className="text-[10px] text-white font-mono uppercase tracking-widest flex items-center gap-2">
            <Move className="h-3 w-3" /> Interactive 3D
        </p>
      </div>
    </div>
  );
}

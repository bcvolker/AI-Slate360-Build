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
    <>
      {/* 3D Model Container - Moved left and capped size */}
      <div className="absolute right-[120px] top-1/2 transform -translate-y-1/2 w-[500px] h-[500px] z-0 hidden lg:block">
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
              ref={controlsRef}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              minDistance={3}
              maxDistance={10}
            />
          </Suspense>
        </Canvas>
        
        {/* Navigation Text - Moved closer to model */}
        <div className="absolute bottom-[-60px] left-0 w-full text-center text-slate-400 text-xs font-mono tracking-wider">
          DRAG TO ROTATE • SCROLL TO ZOOM
        </div>
      </div>
    </>
  );
}

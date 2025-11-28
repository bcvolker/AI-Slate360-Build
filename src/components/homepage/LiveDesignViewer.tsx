"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Stage } from "@react-three/drei";
import { Suspense } from "react";
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";

function DesignModel() {
  const { scene } = useGLTF(CEO_UPLOADS.designModel);
  return <primitive object={scene} />;
}

export default function LiveDesignViewer() {
  return (
    <div className="w-full h-full bg-slate-900">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Stage environment="city" intensity={0.6}>
            <DesignModel />
          </Stage>
          <OrbitControls autoRotate />
        </Suspense>
      </Canvas>
    </div>
  );
}

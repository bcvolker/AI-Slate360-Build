"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Stage } from "@react-three/drei";
import { Suspense } from "react";
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";
import { Box } from "lucide-react";

function Model() {
  const { scene } = useGLTF(CEO_UPLOADS.designModel);
  return <primitive object={scene} />;
}

export default function LiveDesignViewer() {
  return (
    <div className="w-full h-full relative bg-zinc-900">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <Model />
          </Stage>
          <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
        </Suspense>
      </Canvas>

      <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-md border border-white/10 pointer-events-none">
        <p className="text-xs text-white font-mono flex items-center gap-2">
            <Box className="h-3 w-3" /> LIVE MODEL
        </p>
      </div>
    </div>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Grid } from "@react-three/drei";
import { Suspense } from "react";
import { useDesignStore } from "@/lib/stores/useDesignStore";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function ModelViewer() {
  const { activeModelUrl } = useDesignStore();

  return (
    <div className="w-full h-full bg-slate-950 rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {activeModelUrl && <Model url={activeModelUrl} />}
          <Grid infiniteGrid fadeDistance={50} sectionColor="#4f4f4f" cellColor="#2f2f2f" />
          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>
      {!activeModelUrl && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-500 pointer-events-none">
          <p>No model loaded. Upload or select a model to view.</p>
        </div>
      )}
    </div>
  );
}

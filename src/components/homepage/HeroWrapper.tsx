"use client";

import dynamic from "next/dynamic";
import { TileErrorBoundary } from "@/components/ui/tile-error-boundary";

const Hero3D = dynamic(() => import("@/components/homepage/Hero3D"), { 
  ssr: false 
});

export function HeroWrapper() {
  return (
    <TileErrorBoundary fallback={<div className="w-full h-full" />}>
      <Hero3D />
    </TileErrorBoundary>
  );
}

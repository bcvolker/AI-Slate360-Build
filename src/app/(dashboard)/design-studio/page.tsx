"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DesignToolbar from "@/components/features/design-studio/DesignToolbar";
import CostEstimator from "@/components/features/design-studio/CostEstimator";
import { Button } from "@/components/ui/button";
import { Upload, FileBox } from "lucide-react";
import { useDesignStore } from "@/lib/stores/useDesignStore";

import { useAuthStore } from "@/lib/stores/useAuthStore";
import { TileErrorBoundary } from "@/components/ui/tile-error-boundary";

const ModelViewer = dynamic(() => import("@/components/features/design-studio/ModelViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-950 rounded-lg flex items-center justify-center text-slate-500">Loading 3D Engine...</div>
});

export default function DesignStudioPage() {
  const [isMobile, setIsMobile] = useState(false);
  const { setActiveModel } = useDesignStore();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { tier } = useAuthStore();

  if (tier === 'creator') {
    return (
      <div className="min-h-[calc(100vh-4rem)] p-8 md:p-12 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-8 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
            Design Studio
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-lg mx-auto">
            Upgrade to Modeling Bundle to unlock 3D BIM tools, clash detection, IFC analysis, and robotics exports.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 opacity-80">
            <div className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-emerald-700">Lightweight BIM</h3>
              <ul className="space-y-2 text-left">
                <li>✅ IFC import/export</li>
                <li>✅ Basic measurements</li>
                <li>✅ Material library</li>
              </ul>
            </div>
            <div className="p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">Advanced Clash</h3>
              <ul className="space-y-2 text-left">
                <li>✅ Full clash detection</li>
                <li>✅ Robotics export</li>
                <li>✅ OpenDroneMap integration</li>
              </ul>
            </div>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black px-16 py-8 text-xl shadow-2xl hover:shadow-3xl mx-auto transition-all duration-300">
            Upgrade Modeling $149/mo
          </Button>
          <p className="mt-8 text-sm text-slate-500">14-day free trial • Cancel anytime</p>
        </div>
      </div>
    );
  }

  // Mock loading a model
  const handleUpload = () => {
    // In a real app, this would open a file picker
    // For demo, we'll load a sample box or duck if available, or just set a flag
    // Since we don't have a real backend for uploads yet, we'll simulate
    setActiveModel("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Design Studio</h1>
          <p className="text-slate-500">3D Visualization & Analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <CostEstimator />
          <Button onClick={handleUpload} className="gap-2">
            <Upload className="h-4 w-4" /> Upload Model
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* 3D Viewport */}
        <div className="flex-1 relative bg-slate-950 rounded-lg overflow-hidden">
            <TileErrorBoundary>
                <ModelViewer />
            </TileErrorBoundary>
            
            {/* Mobile Overlay */}
            {isMobile && (
                <div className="absolute top-4 left-4 right-4 bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm border border-yellow-200 shadow-sm">
                    <strong>View Only Mode:</strong> Editing is disabled on mobile devices. Switch to a tablet or desktop for full tools.
                </div>
            )}
        </div>

        {/* Sidebar Tools (Desktop Only) */}
        {!isMobile && (
          <div className="w-80 shrink-0 flex flex-col gap-4">
            <DesignToolbar />
            
            {/* File List Mock */}
            <div className="bg-white border rounded-lg p-4 flex-1">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                    <FileBox className="h-4 w-4" /> Project Files
                </h3>
                <div className="space-y-2">
                    <div className="text-sm p-2 hover:bg-slate-50 rounded cursor-pointer border border-transparent hover:border-slate-200">
                        Duck.gltf <span className="text-xs text-slate-400 block">2.4 MB • Uploaded just now</span>
                    </div>
                    <div className="text-sm p-2 hover:bg-slate-50 rounded cursor-pointer border border-transparent hover:border-slate-200 opacity-50">
                        Site_Plan_v2.ifc <span className="text-xs text-slate-400 block">Processing...</span>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

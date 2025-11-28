"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DesignToolbar from "@/components/features/design-studio/DesignToolbar";
import CostEstimator from "@/components/features/design-studio/CostEstimator";
import { Button } from "@/components/ui/button";
import { Upload, FileBox } from "lucide-react";
import { useDesignStore } from "@/lib/stores/useDesignStore";

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
        <div className="flex-1 relative">
            <ModelViewer />
            
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

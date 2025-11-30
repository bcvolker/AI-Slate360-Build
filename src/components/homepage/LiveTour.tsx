"use client";

import { useEffect, useRef } from "react";
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";
import { View } from "lucide-react";
import "pannellum/build/pannellum.css";

declare global {
  interface Window {
    pannellum: any;
  }
}

export default function LiveTour() {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let viewer: any = null;

    const initViewer = () => {
      if (window.pannellum && viewerRef.current) {
        try {
            viewer = window.pannellum.viewer(viewerRef.current, {
                type: "equirectangular",
                panorama: CEO_UPLOADS.tourImage,
                autoLoad: true,
                autoRotate: -2,
                compass: false,
                showControls: false
            });
        } catch (e) {
            console.error("Pannellum error:", e);
        }
      }
    };

    // Load script if not present
    if (!window.pannellum) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
      script.onload = initViewer;
      document.head.appendChild(script);
    } else {
      initViewer();
    }

    return () => {
      if (viewer) {
        // Pannellum doesn't have a clean destroy method in the global scope easily accessible
        // but we can clear the container
        if (viewerRef.current) {
            viewerRef.current.innerHTML = "";
        }
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative group overflow-hidden bg-zinc-900">
      {/* Pannellum Container */}
      <div ref={viewerRef} className="w-full h-full absolute inset-0 z-0" />
      
      <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-md border border-white/10 z-20 pointer-events-none">
        <p className="text-xs text-white font-mono">360° TOUR PREVIEW</p>
      </div>
    </div>
  );
}

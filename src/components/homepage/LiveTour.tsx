"use client";

import { useEffect, useRef } from "react";
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";
import "pannellum/build/pannellum.css";
// @ts-ignore
import "pannellum";

export default function LiveTour() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Access pannellum from window
    const pannellum = (window as any).pannellum;

    if (pannellum && !viewerRef.current) {
        viewerRef.current = pannellum.viewer(containerRef.current, {
            type: "equirectangular",
            panorama: CEO_UPLOADS.tourImage,
            autoLoad: true,
            pitch: 10,
            yaw: 180,
            hfov: 110,
            showZoomCtrl: false,
            compass: false,
            showFullscreenCtrl: false,
        });
    }

    return () => {
        if (viewerRef.current) {
            try {
                if (viewerRef.current.destroy) {
                    viewerRef.current.destroy();
                }
            } catch (e) {
                // ignore
            }
            viewerRef.current = null;
        }
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-slate-900">
        <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

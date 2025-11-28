"use client";

import React, { useEffect, useRef } from "react";
// @ts-ignore
import { Pannellum } from "pannellum-react"; // Using ignore because types might be missing
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";

export default function LiveTour() {
  return (
    <div className="w-full h-full relative">
        {/* Note: Pannellum component wrapper usually handles the window check, 
            but we'll wrap in a simple div to be safe */}
        <div className="w-full h-full bg-slate-900">
             {/* @ts-ignore */}
            <Pannellum
                width="100%"
                height="100%"
                image={CEO_UPLOADS.tourImage}
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                showZoomCtrl={false}
            />
        </div>
    </div>
  );
}

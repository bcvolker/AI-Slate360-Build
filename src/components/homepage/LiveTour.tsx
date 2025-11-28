"use client";

import React, { useEffect, useRef } from "react";
// import { Pannellum } from "pannellum-react"; 
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";

export default function LiveTour() {
  return (
    <div className="w-full h-full relative">
        <div className="w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
            {/* Temporary fallback while debugging Pannellum */}
            <img 
                src={CEO_UPLOADS.tourImage} 
                alt="360 Tour Preview" 
                className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white text-xl font-light">Interactive Tour Loading...</p>
            </div>
            
            {/* 
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
            */}
        </div>
    </div>
  );
}

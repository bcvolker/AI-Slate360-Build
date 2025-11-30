"use client";

import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";
import { View } from "lucide-react";

export default function LiveTour() {
  return (
    <div className="w-full h-full relative group overflow-hidden bg-zinc-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80"
        style={{ backgroundImage: `url(${CEO_UPLOADS.tourImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/50 backdrop-blur-sm p-4 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-300">
            <View className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-md border border-white/10">
        <p className="text-xs text-white font-mono">360° TOUR</p>
      </div>
    </div>
  );
}

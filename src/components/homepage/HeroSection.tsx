"use client";

import Link from "next/link";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroWrapper } from "@/components/homepage/HeroWrapper";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* 3D Hero Background */}
      <div 
        className={cn(
            "absolute inset-0 z-0 transition-opacity duration-500",
            isInteracting ? "opacity-100 pointer-events-auto" : "opacity-40 pointer-events-none"
        )}
      >
         <HeroWrapper />
      </div>

      {/* Main Content - Fades out when interacting */}
      <div 
        className={cn(
            "relative z-10 container mx-auto px-4 text-center max-w-5xl transition-all duration-500",
            isInteracting ? "opacity-0 pointer-events-none scale-95 blur-sm" : "opacity-100 pointer-events-auto scale-100 blur-0"
        )}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 mb-8 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Now in Early Access
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 drop-shadow-sm">
          From Design to Reality.
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
          One unified platform for the built environment. Turn site photos, 360 captures, and drawings into models, tours, and insights.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/subscribe">
            <Button size="lg" className="h-14 px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-lg font-medium transition-all hover:scale-105">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md text-lg font-medium">
              Request Demo
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Interaction Toggle Button */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsInteracting(!isInteracting)}
            className="bg-black/50 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full px-4 gap-2"
        >
            {isInteracting ? (
                <>
                    <EyeOff className="h-4 w-4" /> Return to Text
                </>
            ) : (
                <>
                    <Eye className="h-4 w-4" /> View 3D Model
                </>
            )}
        </Button>
      </div>

      {/* Scroll Indicator (Hidden when interacting) */}
      <div 
        className={cn(
            "absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-600 transition-opacity duration-300",
            isInteracting ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex justify-center pt-2">
          <div className="w-1 h-2 bg-zinc-600 rounded-full" />
        </div>
      </div>
    </section>
  );
}

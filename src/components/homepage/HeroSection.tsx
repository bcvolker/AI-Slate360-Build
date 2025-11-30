"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroWrapper } from "@/components/homepage/HeroWrapper";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-20 overflow-hidden bg-zinc-950">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-emerald-900/10 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-4 z-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-center">
            
            {/* Left Column: Text Content */}
            <div className="flex flex-col justify-center text-left space-y-8 pt-10 lg:pt-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400 w-fit backdrop-blur-md">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Now in Early Access
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
                    From Design <br /> to Reality.
                </h1>
                
                <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed font-light">
                    One unified platform for the built environment. Turn site photos, 360 captures, and drawings into models, tours, and insights.
                </p>
                
                <div className="flex flex-wrap gap-4">
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

                <div className="flex items-center gap-4 text-sm text-zinc-500 pt-4">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-950" />
                        ))}
                    </div>
                    <p>Trusted by 500+ construction teams</p>
                </div>
            </div>

            {/* Right Column: 3D Model */}
            <div className="relative h-[50vh] lg:h-[70vh] w-full flex items-center justify-center">
                {/* Glow Effect behind model */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transform scale-75" />
                
                <div className="w-full h-full relative z-10">
                    <HeroWrapper />
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}

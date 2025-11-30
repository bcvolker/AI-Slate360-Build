import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroWrapper } from "@/components/homepage/HeroWrapper";
import { FeatureGrid } from "@/components/homepage/FeatureGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white/20 font-sans">
      <SiteHeader />

      <main className="flex flex-col items-center">
        
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* 3D Hero Background */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
             <HeroWrapper />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
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
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-zinc-600">
            <div className="w-6 h-10 rounded-full border-2 border-zinc-600 flex justify-center pt-2">
              <div className="w-1 h-2 bg-zinc-600 rounded-full" />
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <FeatureGrid />

        {/* CTA Section */}
        <section className="w-full py-32 bg-gradient-to-b from-black to-zinc-900 border-t border-white/5">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">Ready to replace 7 tools with 1?</h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Join the platform that connects every stage of the built environment lifecycle.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/subscribe">
                <Button size="lg" className="h-16 px-10 rounded-full bg-white text-black hover:bg-zinc-200 text-xl font-medium">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/homepage/HeroSection";
import { FeatureGrid } from "@/components/homepage/FeatureGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-white/20 font-sans">
      <SiteHeader />

      <main className="flex flex-col items-center">
        
        {/* HERO SECTION */}
        <HeroSection />

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

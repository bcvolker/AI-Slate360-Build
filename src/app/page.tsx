import Link from "next/link";
import { ArrowRight, Box, Layers, Map, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* Section 1: Hero */}
      <section className="h-screen w-full snap-start flex flex-col items-center justify-center bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-black to-black opacity-50" />
        <div className="z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Slate360
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            The Operating System for the Physical World.
            <br />
            Manage projects, visualize data, and collaborate in 3D.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                Enter Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-black">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Project Hub */}
      <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-slate-50 text-slate-900">
        <div className="flex-1 flex flex-col justify-center p-8 md:p-16">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Layers className="h-8 w-8" />
            <span className="text-xl font-semibold uppercase tracking-widest">Project Hub</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Centralized Command.</h2>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-md">
            Organize your missions, designs, and teams in one unified interface. No more scattered files.
          </p>
        </div>
        <div className="flex-1 bg-slate-200 flex items-center justify-center relative overflow-hidden">
           {/* Placeholder for visual */}
           <div className="absolute inset-0 bg-grid-slate-300/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
           <div className="z-10 bg-white p-6 rounded-xl shadow-2xl max-w-sm mx-4">
              <div className="h-4 w-24 bg-slate-200 rounded mb-4" />
              <div className="h-8 w-full bg-slate-100 rounded mb-2" />
              <div className="h-8 w-3/4 bg-slate-100 rounded" />
           </div>
        </div>
      </section>

      {/* Section 3: Geospatial */}
      <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-slate-900 text-white">
        <div className="flex-1 flex flex-col justify-center p-8 md:p-16">
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <Map className="h-8 w-8" />
            <span className="text-xl font-semibold uppercase tracking-widest">Geospatial</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Map the World.</h2>
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
            Integrate photogrammetry, LiDAR, and robotics data into a seamless map interface.
          </p>
        </div>
        <div className="flex-1 bg-slate-800 flex items-center justify-center relative">
            {/* Placeholder for visual */}
            <div className="w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl absolute" />
            <div className="z-10 border border-slate-700 bg-slate-900/50 p-8 rounded-2xl backdrop-blur-sm">
                <Map className="h-32 w-32 text-emerald-500" />
            </div>
        </div>
      </section>

      {/* Section 4: Design Studio */}
      <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-white text-slate-900">
        <div className="flex-1 flex flex-col justify-center p-8 md:p-16">
          <div className="flex items-center gap-3 mb-4 text-purple-600">
            <Box className="h-8 w-8" />
            <span className="text-xl font-semibold uppercase tracking-widest">Design Studio</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Visualize in 3D.</h2>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-md">
            Interact with high-fidelity 3D models directly in your browser. GLB, IFC, USDZ support.
          </p>
        </div>
        <div className="flex-1 bg-slate-100 flex items-center justify-center">
             {/* Placeholder for visual */}
             <Box className="h-48 w-48 text-purple-200 animate-pulse" />
        </div>
      </section>

       {/* Section 5: CTA */}
       <section className="h-screen w-full snap-start flex flex-col items-center justify-center bg-blue-600 text-white text-center px-4">
          <Zap className="h-16 w-16 mb-6 text-yellow-300" />
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl">
            Join the platform that powers the next generation of physical operations.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-10 py-6 h-auto">
              Launch Slate360
            </Button>
          </Link>
       </section>
    </main>
  );
}

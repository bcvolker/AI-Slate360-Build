"use client";

import Link from "next/link";
import { ArrowRight, Box, Layers, Map, Video, Activity, BarChart3, FileText, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import LiveProjectList from "@/components/homepage/LiveProjectList";
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";
import { TileErrorBoundary } from "@/components/ui/tile-error-boundary";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuthStore } from "@/lib/stores/useAuthStore";

// Dynamic Imports for Heavy/Browser-Only Components
const Hero3D = dynamic(() => import("@/components/homepage/Hero3D"), { ssr: false });
const LiveMap = dynamic(() => import("@/components/homepage/LiveMap"), { ssr: false, loading: () => <div className="w-full h-full bg-slate-200 animate-pulse" /> });
const LiveTour = dynamic(() => import("@/components/homepage/LiveTour"), { ssr: false, loading: () => <div className="w-full h-full bg-slate-900 animate-pulse" /> });
const LiveDesignViewer = dynamic(() => import("@/components/homepage/LiveDesignViewer"), { ssr: false, loading: () => <div className="w-full h-full bg-slate-900 animate-pulse" /> });

export default function Home() {
  const { user } = useAuthStore();
  return (
    <>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">Slate360</Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Subscribe
              </Button>
            </Link>
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-white text-black hover:bg-slate-200">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-white text-black hover:bg-slate-200">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="min-h-screen w-full bg-black text-white" data-scroll-container>
        
        {/* Section 1: Hero (3D) */}
        <section className="h-screen w-full snap-start relative flex items-center justify-center overflow-hidden">
          <TileErrorBoundary fallback={<div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black" />}>
              <Hero3D />
          </TileErrorBoundary>
          <div className="z-10 text-center px-4 max-w-5xl mx-auto pointer-events-none">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 drop-shadow-2xl">
              Slate360
            </h1>
            <p className="text-xl md:text-3xl text-slate-200 mb-10 max-w-3xl mx-auto font-light drop-shadow-md">
              The Operating System for the Physical World.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full bg-white text-black hover:bg-slate-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
                  Enter Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10 left-0 right-0 text-center animate-bounce text-slate-500">
              <p className="text-sm uppercase tracking-widest">Scroll to Explore</p>
          </div>
        </section>

        {/* Section 2: Design Studio */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-slate-900 text-white overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-purple-400">
              <Box className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Design Studio</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Interactive 3D.</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
              Visualize CAD, BIM, and photogrammetry models directly in the browser.
            </p>
            <ul className="space-y-2 mb-8 text-slate-300">
              <li>✅ Drag-and-drop 3D model uploads</li>
              <li>✅ Real-time collaboration</li>
              <li>✅ AI-powered model optimization</li>
              <li>✅ Export to multiple formats</li>
            </ul>
            <Link href="/features/design-studio">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white border-none">
                  Learn More
              </Button>
            </Link>
          </div>
          <div className="flex-1 relative bg-black">
              <TileErrorBoundary>
                  <LiveDesignViewer />
              </TileErrorBoundary>
          </div>
        </section>

        {/* Section 3: Project Hub */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-slate-50 text-slate-900 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-blue-600">
              <Layers className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Project Hub</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Centralized Command.</h2>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-md">
              Live sync with your organization's real-time mission data.
            </p>
            <Link href="/features/project-hub">
              <Button size="lg" variant="outline" className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white">
                  Learn More
              </Button>
            </Link>
          </div>
          <div className="flex-1 bg-slate-200 flex items-center justify-center relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
             <div className="w-full max-w-md p-6">
                  <LiveProjectList />
             </div>
          </div>
        </section>

        {/* Section 4: Content Studio */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-slate-800 text-white overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-green-400">
              <FileText className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Content Studio</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Create & Edit Media.</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
              AI-powered content creation and editing tools for immersive experiences.
            </p>
            <Link href="/features/content-studio">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white border-none">
                  Learn More
              </Button>
            </Link>
          </div>
          <div className="flex-1 relative bg-black flex items-center justify-center">
              <video 
                  src={CEO_UPLOADS.demoVideo} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover opacity-80"
              />
          </div>
        </section>

        {/* Section 5: 360 Tour Builder */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-slate-100 text-slate-900 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-cyan-600">
              <Video className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">360 Tour Builder</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Build Immersive Tours.</h2>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-md">
              Create interactive 360-degree tours with drag-and-drop simplicity.
            </p>
            <Link href="/features/360-tour-builder">
              <Button size="lg" variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white">
                  Learn More
              </Button>
            </Link>
          </div>
          <div className="flex-1 relative h-[50vh] md:h-auto">
              <TileErrorBoundary>
                  <LiveTour />
              </TileErrorBoundary>
          </div>
        </section>

        {/* Section 6: Geospatial & Robotics */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-white text-slate-900 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-emerald-600">
              <Map className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Geospatial & Robotics</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Global Intelligence & Automation.</h2>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-md">
              Track assets, missions, and robotics on a live, interactive map with AI insights.
            </p>
            <Link href="/features/geospatial-robotics">
              <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                  Learn More
              </Button>
            </Link>
          </div>
          <div className="flex-1 relative h-[50vh] md:h-auto">
              <TileErrorBoundary>
                  <LiveMap />
              </TileErrorBoundary>
          </div>
        </section>

        {/* Section 7: Virtual Studio */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-slate-950 text-white overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-blue-400">
              <Zap className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Virtual Studio</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Immersive Virtual Reality.</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
              Step inside your sites and designs in full VR with haptic feedback.
            </p>
            <Link href="/features/virtual-studio">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
                  Learn More
              </Button>
            </Link>
          </div>
          <div className="flex-1 relative h-[50vh] md:h-auto">
              <TileErrorBoundary>
                  <LiveTour />
              </TileErrorBoundary>
          </div>
        </section>

        {/* Section 8: Reports & Analytics */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-slate-100 text-slate-900 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-orange-600">
              <TrendingUp className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Reports & Analytics</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Data-Driven Insights.</h2>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-md">
              Comprehensive reporting and analytics for project performance and ROI.
            </p>
            <Link href="/features/reports-analytics">
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                  Learn More
              </Button>
            </Link>
          </div>
          <div className="flex-1 relative flex items-center justify-center bg-black">
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                  <div className="flex items-center gap-2 text-white mb-2">
                      <BarChart3 className="h-4 w-4" />
                      <span className="text-sm font-medium">Live Analytics</span>
                  </div>
                  {/* Simple CSS Chart */}
                  <div className="flex items-end gap-1 h-16">
                      {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60].map((h, i) => (
                          <div key={i} className="flex-1 bg-orange-500/80 rounded-t-sm hover:bg-orange-400 transition-colors" style={{ height: `${h}%` }} />
                      ))}
                  </div>
              </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="h-screen w-full snap-start flex items-center justify-center bg-gradient-to-b from-slate-900 to-black text-white">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to replace 7 tools with 1?</h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-10">
              Join thousands of teams already using Slate360 to streamline their workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/pricing">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full bg-white text-black hover:bg-slate-200 transition-all">
                  Subscribe Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full border-white text-white hover:bg-white hover:text-black">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

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
      <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-obsidian-600">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-50">Slate360</Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="outline" className="border-obsidian-600 text-slate-50 hover:bg-cyan-400/10">
                Subscribe
              </Button>
            </Link>
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-cyan text-obsidian hover:bg-cyan-500">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-cyan text-obsidian hover:bg-cyan-500">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="min-h-screen w-full bg-obsidian text-slate-50" data-scroll-container>
        
        {/* Section 1: Hero (3D) */}
        <section className="h-screen w-full snap-start relative flex items-center overflow-hidden">
          <TileErrorBoundary fallback={<div className="absolute inset-0 bg-gradient-to-b from-obsidian to-obsidian-800" />}>
              <Hero3D />
          </TileErrorBoundary>
          <div className="z-10 text-left px-4 max-w-4xl mx-0 ml-8 lg:ml-16 pointer-events-none">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-50 to-slate-400 drop-shadow-2xl">
              Slate360
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 mb-10 max-w-3xl font-light drop-shadow-md">
              From raw data to finished reality — one unified platform.
            </p>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-4xl font-light drop-shadow-md">
              Turn site photos, video, 360 camera captures, drawings, and notes into models, tours, videos, and insights — all of your work, perfectly connected.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-start pointer-events-auto">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full bg-cyan text-obsidian hover:bg-cyan-500 transition-all shadow-[0_0_40px_-10px_rgba(0,245,255,0.5)]">
                  Enter Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10 left-8 text-left animate-bounce text-slate-400">
              <p className="text-sm uppercase tracking-widest">Scroll to Explore</p>
          </div>
        </section>

        {/* Section 2: Design Studio */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-obsidian-800 text-slate-50 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-cyan">
              <Box className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Design Studio</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Design Studio</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
              Create and edit 2D and 3D projects, upload your visual data to be processed into digital twins, open complex 3D files instantly in the browser. Review, mark up, measure, and collaborate in real time — no installs, no lag.
            </p>
            <ul className="space-y-2 mb-8 text-slate-300">
              <li>✅ Drag-and-drop 3D model uploads</li>
              <li>✅ Real-time collaboration</li>
              <li>✅ AI-powered model optimization</li>
              <li>✅ Export to multiple formats</li>
            </ul>
            <Link href="/learn/design-studio">
              <Button size="lg" className="bg-cyan text-obsidian hover:bg-cyan-500 border-none">
                  Learn More
              </Button>
            </Link>
          </div>
          <div className="flex-1 relative bg-obsidian">
              <TileErrorBoundary>
                  <LiveDesignViewer />
              </TileErrorBoundary>
          </div>
        </section>

        {/* Section 3: Project Hub */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-slate-50 text-slate-950 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-cyan">
              <Layers className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Project Hub</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Project Hub</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
              Your single source of truth. Manage your building projects, documents, schedules, photos, tasks, and field reports in one clean workspace everyone on your team can actually use.
            </p>
            <Link href="/learn/project-hub">
              <Button size="lg" variant="outline" className="border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-slate-50">
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
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-obsidian-700 text-slate-50 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-emerald-500">
              <FileText className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Content Studio</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Content Studio</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
              Turn your standard and 360 video footage, site walkthroughs, and photos into polished videos and reels — fast, beautiful, no extra software.
            </p>
            <Link href="/learn/content-studio">
              <Button size="lg" className="bg-emerald-500 text-slate-50 hover:bg-emerald-600 border-none">
                  Learn More
              </Button>
            </Link>
          </div>
          <div className="flex-1 relative bg-obsidian flex items-center justify-center">
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
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-slate-100 text-slate-950 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-amber-500">
              <Video className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">360 Tour Builder</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">360 Tour Builder</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
              Drag-and-drop immersive tours with hotspots, floorplans, and progress comparisons. Share with anyone, anywhere, on any device.
            </p>
            <Link href="/learn/tour-builder">
              <Button size="lg" variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-50">
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
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-white text-slate-950 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-red-500">
              <Map className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Geospatial & Robotics</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Geospatial & Robotics</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
              Plan drone missions, monitor robots, overlay drawings on maps, measure volumes — everything in one intelligent map interface.
            </p>
            <Link href="/learn/geospatial-robotics">
              <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
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
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-obsidian-700 text-slate-50 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-cyan">
              <Zap className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Virtual Studio</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Virtual Studio</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
              Transform designs into cinematic walkthroughs. Adjust lighting, materials, and camera paths, then export stunning videos for presentations.
            </p>
            <Link href="/learn/virtual-studio">
              <Button size="lg" className="bg-cyan text-obsidian hover:bg-cyan-500 border-none">
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
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-obsidian-800 text-slate-50 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10">
            <div className="flex items-center gap-3 mb-4 text-emerald-500">
              <TrendingUp className="h-8 w-8" />
              <span className="text-xl font-semibold uppercase tracking-widest">Reports & Analytics</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Analytics & Reports</h2>
            <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-md">
              See real progress, not guesses. Automated dashboards, trend forecasting, and custom reports built from all your project data.
            </p>
            <Link href="/learn/analytics-reports">
              <Button size="lg" className="bg-emerald-500 text-slate-50 hover:bg-emerald-600 border-none">
                  Learn More
              </Button>
            </Link>
          </div>
          <div className="flex-1 relative flex items-center justify-center bg-obsidian">
              <div className="absolute bottom-8 left-8 right-8 bg-obsidian-700/50 backdrop-blur-md p-4 rounded-lg border border-obsidian-600">
                  <div className="flex items-center gap-2 text-slate-300 mb-2">
                      <BarChart3 className="h-4 w-4" />
                      <span className="text-sm font-medium">Live Analytics</span>
                  </div>
                  {/* Simple CSS Chart */}
                  <div className="flex items-end gap-1 h-16">
                      {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60].map((h, i) => (
                          <div key={i} className="flex-1 bg-cyan/80 rounded-t-sm hover:bg-cyan transition-colors" style={{ height: `${h}%` }} />
                      ))}
                  </div>
              </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="h-screen w-full snap-start flex items-center justify-center bg-gradient-to-b from-obsidian to-obsidian-800 text-slate-50">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to replace 7 tools with 1?</h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-10">
              Join thousands of teams already using Slate360 to streamline their workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/pricing">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full bg-cyan text-obsidian hover:bg-cyan-500 transition-all">
                  Subscribe Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full border-obsidian-600 text-slate-50 hover:bg-cyan hover:text-obsidian">
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

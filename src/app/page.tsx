"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, Box, Layers, Map, Video, Activity, BarChart3, FileText, Zap, TrendingUp, Check } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollY = window.scrollY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          // Add parallax effect to background gradients
          const parallaxElements = section.querySelectorAll('[class*="absolute inset-0"]');
          parallaxElements.forEach((element) => {
            const speed = 0.5;
            const yPos = -(scrollY * speed);
            (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
          });

          // Add fade-in animation to content
          const contentElements = section.querySelectorAll('.backdrop-blur-xl');
          contentElements.forEach((element, i) => {
            setTimeout(() => {
              element.classList.add('animate-in', 'fade-in-0', 'slide-in-from-bottom-4');
            }, i * 200);
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-obsidian-600">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-50">Slate360</Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="outline" className="border-obsidian-600 text-obsidian hover:bg-cyan-400/10">
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
          <div className="z-10 text-left px-4 max-w-3xl mx-0 ml-8 lg:ml-16 pointer-events-none">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-slate-50 to-slate-400 drop-shadow-2xl">
              Slate360
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-2xl font-light drop-shadow-md">
              From raw data to finished reality — one unified platform.
            </p>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl font-light drop-shadow-md">
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
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-obsidian-800 text-slate-50 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-blue-500/8 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,245,255,0.05),transparent_50%)]" />
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/4 border border-white/15 rounded-2xl p-8 shadow-2xl hover:bg-gradient-to-br hover:from-white/10 hover:to-white/6 transition-all duration-500 hover:shadow-cyan-500/10 hover:border-cyan-500/20 hover:scale-[1.005] hover:shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-cyan">
                  <Box className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Design Studio</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Design Studio</h2>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-md leading-relaxed">
                  Create and edit 2D and 3D projects, upload your visual data to be processed into digital twins, open complex 3D files instantly in the browser. Review, mark up, measure, and collaborate in real time — no installs, no lag.
                </p>
                <ul className="space-y-2 mb-8 text-slate-200">
                  <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                    <Check className="h-4 w-4 text-cyan-400" />
                    Drag-and-drop 3D model uploads
                  </li>
                  <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                    <Check className="h-4 w-4 text-cyan-400" />
                    Real-time collaboration
                  </li>
                  <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                    <Check className="h-4 w-4 text-cyan-400" />
                    AI-powered model optimization
                  </li>
                  <li className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
                    <Check className="h-4 w-4 text-cyan-400" />
                    Export to multiple formats
                  </li>
                </ul>
                <Link href="/learn/design-studio">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 border-none shadow-lg hover:shadow-cyan-500/15 transition-all duration-300 hover:scale-[1.02]">
                      Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 relative bg-obsidian">
              <TileErrorBoundary>
                  <LiveDesignViewer />
              </TileErrorBoundary>
          </div>
        </section>

        {/* Section 3: Project Hub */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-slate-50 text-slate-950 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100/60 via-transparent to-slate-200/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(100,116,139,0.08),transparent_50%)]" />
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/85 to-white/75 border border-white/25 rounded-2xl p-8 shadow-2xl hover:bg-gradient-to-br hover:from-white/90 hover:to-white/80 transition-all duration-500 hover:shadow-slate-500/10 hover:border-slate-500/20 hover:scale-[1.005] hover:shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-cyan">
                  <Layers className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Project Hub</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Project Hub</h2>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-md leading-relaxed">
                  Your single source of truth. Manage your building projects, documents, schedules, photos, tasks, and field reports in one clean workspace everyone on your team can actually use.
                </p>
                <Link href="/learn/project-hub">
                  <Button size="lg" variant="outline" className="border-slate-950 text-slate-950 hover:bg-slate-950 hover:text-slate-50 shadow-lg hover:shadow-slate-500/15 transition-all duration-300 hover:scale-[1.02]">
                      Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-slate-200 flex items-center justify-center relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
             <div className="w-full max-w-md p-6">
                  <LiveProjectList />
             </div>
          </div>
        </section>

        {/* Section 4: Content Studio */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-obsidian-700 text-slate-50 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-green-500/8 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,185,129,0.06),transparent_50%)]" />
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/4 border border-white/15 rounded-2xl p-8 shadow-2xl hover:bg-gradient-to-br hover:from-white/10 hover:to-white/6 transition-all duration-500 hover:shadow-emerald-500/10 hover:border-emerald-500/20 hover:scale-[1.005] hover:shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                  <FileText className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Content Studio</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">Content Studio</h2>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-md leading-relaxed">
                  Turn your standard and 360 video footage, site walkthroughs, and photos into polished videos and reels — fast, beautiful, no extra software.
                </p>
                <Link href="/learn/content-studio">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 text-slate-50 hover:from-emerald-600 hover:to-green-600 border-none shadow-lg hover:shadow-emerald-500/15 transition-all duration-300 hover:scale-[1.02]">
                      Learn More
                  </Button>
                </Link>
              </div>
            </div>
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
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-slate-100 text-slate-950 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-transparent to-yellow-100/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(245,158,11,0.08),transparent_50%)]" />
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/75 to-white/65 border border-white/35 rounded-2xl p-8 shadow-2xl hover:bg-gradient-to-br hover:from-white/80 hover:to-white/70 transition-all duration-500 hover:shadow-amber-500/10 hover:border-amber-500/20 hover:scale-[1.005] hover:shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-amber-500">
                  <Video className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">360 Tour Builder</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-amber-700 bg-clip-text text-transparent">360 Tour Builder</h2>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-md leading-relaxed">
                  Drag-and-drop immersive tours with hotspots, floorplans, and progress comparisons. Share with anyone, anywhere, on any device.
                </p>
                <Link href="/learn/tour-builder">
                  <Button size="lg" variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-50 shadow-lg hover:shadow-amber-500/15 transition-all duration-300 hover:scale-[1.02]">
                      Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 relative h-[50vh] md:h-auto">
              <TileErrorBoundary>
                  <LiveTour />
              </TileErrorBoundary>
          </div>
        </section>        {/* Section 6: Geospatial & Robotics */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-white text-slate-950 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/40 via-transparent to-pink-50/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_40%,rgba(239,68,68,0.06),transparent_50%)]" />
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/85 to-white/75 border border-white/35 rounded-2xl p-8 shadow-2xl hover:bg-gradient-to-br hover:from-white/90 hover:to-white/80 transition-all duration-500 hover:shadow-red-500/10 hover:border-red-500/20 hover:scale-[1.005] hover:shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-red-500">
                  <Map className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Geospatial & Robotics</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-red-700 bg-clip-text text-transparent">Geospatial & Robotics</h2>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-md leading-relaxed">
                  Plan drone missions, monitor robots, overlay drawings on maps, measure volumes — everything in one intelligent map interface.
                </p>
                <Link href="/learn/geospatial-robotics">
                  <Button size="lg" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white shadow-lg hover:shadow-red-500/15 transition-all duration-300 hover:scale-[1.02]">
                      Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 relative h-[50vh] md:h-auto">
              <TileErrorBoundary>
                  <LiveMap />
              </TileErrorBoundary>
          </div>
        </section>

        {/* Section 7: Virtual Studio */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-obsidian-700 text-slate-50 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-blue-500/8 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(0,245,255,0.05),transparent_50%)]" />
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/4 border border-white/15 rounded-2xl p-8 shadow-2xl hover:bg-gradient-to-br hover:from-white/10 hover:to-white/6 transition-all duration-500 hover:shadow-cyan-500/10 hover:border-cyan-500/20 hover:scale-[1.005] hover:shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-cyan">
                  <Zap className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Virtual Studio</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Virtual Studio</h2>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-md leading-relaxed">
                  Transform designs into cinematic walkthroughs. Adjust lighting, materials, and camera paths, then export stunning videos for presentations.
                </p>
                <Link href="/learn/virtual-studio">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 border-none shadow-lg hover:shadow-cyan-500/15 transition-all duration-300 hover:scale-[1.02]">
                      Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 relative h-[50vh] md:h-auto">
              <TileErrorBoundary>
                  <LiveTour />
              </TileErrorBoundary>
          </div>
        </section>        {/* Section 8: Reports & Analytics */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-obsidian-800 text-slate-50 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-green-500/8 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(16,185,129,0.05),transparent_50%)]" />
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/8 to-white/4 border border-white/15 rounded-2xl p-8 shadow-2xl hover:bg-gradient-to-br hover:from-white/10 hover:to-white/6 transition-all duration-500 hover:shadow-emerald-500/10 hover:border-emerald-500/20 hover:scale-[1.005] hover:shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-emerald-500">
                  <TrendingUp className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Reports & Analytics</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">Analytics & Reports</h2>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-md leading-relaxed">
                  See real progress, not guesses. Automated dashboards, trend forecasting, and custom reports built from all your project data.
                </p>
                <Link href="/learn/analytics-reports">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-500 text-slate-50 hover:from-emerald-600 hover:to-green-600 border-none shadow-lg hover:shadow-emerald-500/15 transition-all duration-300 hover:scale-[1.02]">
                      Learn More
                  </Button>
                </Link>
              </div>
            </div>
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
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full border-obsidian-600 text-obsidian hover:bg-cyan hover:text-obsidian">
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

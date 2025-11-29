"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowRight, Box, Layers, Map, Video, BarChart3, FileText, Zap, TrendingUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import LiveProjectList from "@/components/homepage/LiveProjectList";
import { CEO_UPLOADS } from "@/lib/data/ceo-uploads";
import { TileErrorBoundary } from "@/components/ui/tile-error-boundary";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import ExpandableViewer from "@/components/homepage/ExpandableViewer";

// Dynamic Imports for Heavy/Browser-Only Components
const Hero3D = dynamic(() => import("@/components/homepage/Hero3D"), { ssr: false });
const LiveMap = dynamic(() => import("@/components/homepage/LiveMap"), { ssr: false, loading: () => <div className="w-full h-full bg-obsidian-900 animate-pulse" /> });
const LiveTour = dynamic(() => import("@/components/homepage/LiveTour"), { ssr: false, loading: () => <div className="w-full h-full bg-obsidian-900 animate-pulse" /> });
const LiveDesignViewer = dynamic(() => import("@/components/homepage/LiveDesignViewer"), { ssr: false, loading: () => <div className="w-full h-full bg-obsidian-900 animate-pulse" /> });

export default function Home() {
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollY = window.scrollY;

      sections.forEach((section) => {
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
          const contentElements = section.querySelectorAll('.animate-on-scroll');
          contentElements.forEach((element, i) => {
             // Simple check to add class if not present
             if (!element.classList.contains('animate-in')) {
                setTimeout(() => {
                  element.classList.add('animate-in', 'fade-in-0', 'slide-in-from-bottom-4', 'duration-700');
                }, i * 100);
             }
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
      <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-50">Slate360</Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="outline" className="border-white/20 text-slate-200 hover:bg-white/10 hover:text-white">
                Subscribe
              </Button>
            </Link>
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-cyan text-obsidian hover:bg-cyan-400">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-cyan text-obsidian hover:bg-cyan-400">
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
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full bg-cyan text-obsidian hover:bg-cyan-400 transition-all shadow-[0_0_40px_-10px_rgba(0,245,255,0.5)]">
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
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-slate-100 text-slate-950 overflow-hidden relative border-t border-slate-200">
          {/* Content Half */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-4 text-cyan">
                  <Box className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Design Studio</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Design Studio</h2>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                  Create and edit 2D and 3D projects, upload your visual data to be processed into digital twins, open complex 3D files instantly in the browser.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-cyan" /> Drag-and-drop 3D uploads</div>
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-cyan" /> Real-time collaboration</div>
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-cyan" /> AI-powered optimization</div>
                </div>
                <Link href="/learn/design-studio">
                  <Button variant="outline" className="border-cyan text-cyan hover:bg-cyan/10">
                      Learn More
                  </Button>
                </Link>
             </div>
          </div>
          {/* Viewer Half - Split into two */}
          <div className="flex-1 flex flex-col">
              <div className="flex-[0.45] bg-slate-200">
                <ExpandableViewer>
                  <TileErrorBoundary>
                      <LiveDesignViewer />
                  </TileErrorBoundary>
                </ExpandableViewer>
              </div>
              <div className="flex-[0.45] bg-slate-200">
                <ExpandableViewer>
                  <div className="w-full h-full flex items-center justify-center bg-slate-600 text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📁</div>
                      <p className="text-lg font-semibold">Upload Pending</p>
                      <p className="text-sm opacity-90">Click to expand and upload</p>
                    </div>
                  </div>
                </ExpandableViewer>
              </div>
          </div>
        </section>

        {/* Section 3: Project Hub */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-obsidian text-slate-50 overflow-hidden relative border-t border-white/5">
          {/* Content Half */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-4 text-purple-600">
                  <Layers className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Project Hub</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Project Hub</h2>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
                  Your single source of truth. Manage your building projects, documents, schedules, photos, tasks, and field reports in one clean workspace.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                   <div className="flex items-center gap-2 text-slate-600"><Check className="h-4 w-4 text-purple-600" /> Centralized management</div>
                   <div className="flex items-center gap-2 text-slate-600"><Check className="h-4 w-4 text-purple-600" /> Document collaboration</div>
                   <div className="flex items-center gap-2 text-slate-600"><Check className="h-4 w-4 text-purple-600" /> Task tracking</div>
                </div>
                <Link href="/learn/project-hub">
                  <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600/10">
                      Learn More
                  </Button>
                </Link>
             </div>
          </div>
          {/* Viewer Half - Split into two */}
          <div className="flex-1 flex flex-col">
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                 <div className="w-full h-full flex items-center justify-center bg-slate-300">
                    <div className="w-full max-w-2xl p-6">
                        <LiveProjectList />
                    </div>
                 </div>
                </ExpandableViewer>
              </div>
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📊</div>
                      <p className="text-lg font-semibold">Analytics Pending</p>
                      <p className="text-sm opacity-90">Click to expand and view</p>
                    </div>
                  </div>
                </ExpandableViewer>
              </div>
          </div>
        </section>

        {/* Section 4: Content Studio */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-obsidian text-slate-50 overflow-hidden relative border-t border-white/5">
          {/* Content Half */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                  <FileText className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Content Studio</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Content Studio</h2>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                  Turn your standard and 360 video footage, site walkthroughs, and photos into polished videos and reels — fast, beautiful, no extra software.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-emerald-400" /> Video editing</div>
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-emerald-400" /> 360° processing</div>
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-emerald-400" /> Automated creation</div>
                </div>
                <Link href="/learn/content-studio">
                  <Button variant="outline" className="border-emerald-400 text-emerald-400 hover:bg-emerald-400/10">
                      Learn More
                  </Button>
                </Link>
             </div>
          </div>
          {/* Viewer Half - Split into two */}
          <div className="flex-1 flex flex-col">
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <video
                      src={CEO_UPLOADS.demoVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-80"
                  />
                </ExpandableViewer>
              </div>
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <div className="w-full h-full flex items-center justify-center bg-slate-600 text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎬</div>
                      <p className="text-lg font-semibold">Video Editor</p>
                      <p className="text-sm opacity-90">Click to expand and edit</p>
                    </div>
                  </div>
                </ExpandableViewer>
              </div>
          </div>
        </section>

        {/* Section 5: 360 Tour Builder */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-obsidian text-slate-50 overflow-hidden relative border-t border-white/5">
          {/* Content Half */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-4 text-amber-500">
                  <Video className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">360 Tour Builder</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">360 Tour Builder</h2>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
                  Drag-and-drop immersive tours with hotspots, floorplans, and progress comparisons. Share with anyone, anywhere, on any device.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                   <div className="flex items-center gap-2 text-slate-600"><Check className="h-4 w-4 text-amber-500" /> Interactive hotspots</div>
                   <div className="flex items-center gap-2 text-slate-600"><Check className="h-4 w-4 text-amber-500" /> Floorplan integration</div>
                   <div className="flex items-center gap-2 text-slate-600"><Check className="h-4 w-4 text-amber-500" /> Progress tracking</div>
                </div>
                <Link href="/learn/tour-builder">
                  <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500/10">
                      Learn More
                  </Button>
                </Link>
             </div>
          </div>
          {/* Viewer Half - Split into two */}
          <div className="flex-1 flex flex-col">
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <TileErrorBoundary>
                      <LiveTour />
                  </TileErrorBoundary>
                </ExpandableViewer>
              </div>
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏠</div>
                      <p className="text-lg font-semibold">Tour Preview</p>
                      <p className="text-sm opacity-90">Click to expand and navigate</p>
                    </div>
                  </div>
                </ExpandableViewer>
              </div>
          </div>
        </section>

        {/* Section 6: Geospatial & Robotics */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-obsidian text-slate-50 overflow-hidden relative border-t border-white/5">
          {/* Content Half */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-4 text-red-500">
                  <Map className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Geospatial & Robotics</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Geospatial & Robotics</h2>
                <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
                  Plan drone missions, monitor robots, overlay drawings on maps, measure volumes — everything in one intelligent map interface.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                   <div className="flex items-center gap-2 text-slate-600"><Check className="h-4 w-4 text-red-500" /> Drone mission planning</div>
                   <div className="flex items-center gap-2 text-slate-600"><Check className="h-4 w-4 text-red-500" /> Robot monitoring</div>
                   <div className="flex items-center gap-2 text-slate-600"><Check className="h-4 w-4 text-red-500" /> Map overlay tools</div>
                </div>
                <Link href="/learn/geospatial-robotics">
                  <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                      Learn More
                  </Button>
                </Link>
             </div>
          </div>
          {/* Viewer Half - Split into two */}
          <div className="flex-1 flex flex-col">
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <TileErrorBoundary>
                      <LiveMap />
                  </TileErrorBoundary>
                </ExpandableViewer>
              </div>
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-700">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🚁</div>
                      <p className="text-lg font-semibold">Drone Control</p>
                      <p className="text-sm opacity-90">Click to expand and monitor</p>
                    </div>
                  </div>
                </ExpandableViewer>
              </div>
          </div>
        </section>

        {/* Section 7: Virtual Studio */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row-reverse bg-obsidian text-slate-50 overflow-hidden relative border-t border-white/5">
          {/* Content Half */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-4 text-blue-400">
                  <Zap className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Virtual Studio</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Virtual Studio</h2>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                  Transform designs into cinematic walkthroughs. Adjust lighting, materials, and camera paths, then export stunning videos for presentations.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-blue-400" /> Cinematic walkthroughs</div>
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-blue-400" /> Lighting control</div>
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-blue-400" /> Camera path animation</div>
                </div>
                <Link href="/learn/virtual-studio">
                  <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10">
                      Learn More
                  </Button>
                </Link>
             </div>
          </div>
          {/* Viewer Half - Split into two */}
          <div className="flex-1 flex flex-col">
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <TileErrorBoundary>
                      <LiveTour />
                  </TileErrorBoundary>
                </ExpandableViewer>
              </div>
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <div className="w-full h-full flex items-center justify-center bg-slate-600 text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎥</div>
                      <p className="text-lg font-semibold">Video Renderer</p>
                      <p className="text-sm opacity-90">Click to expand and render</p>
                    </div>
                  </div>
                </ExpandableViewer>
              </div>
          </div>
        </section>

        {/* Section 8: Reports & Analytics */}
        <section className="h-screen w-full snap-start flex flex-col md:flex-row bg-obsidian text-slate-50 overflow-hidden relative border-t border-white/5">
          {/* Content Half */}
          <div className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10 relative">
            <div className="max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                  <TrendingUp className="h-8 w-8" />
                  <span className="text-xl font-semibold uppercase tracking-widest">Reports & Analytics</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Analytics & Reports</h2>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                  See real progress, not guesses. Automated dashboards, trend forecasting, and custom reports built from all your project data.
                </p>
                <div className="flex flex-wrap gap-6 mb-8">
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-emerald-400" /> Automated dashboards</div>
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-emerald-400" /> Trend forecasting</div>
                   <div className="flex items-center gap-2 text-slate-300"><Check className="h-4 w-4 text-emerald-400" /> Custom report builder</div>
                </div>
                <Link href="/learn/analytics-reports">
                  <Button variant="outline" className="border-emerald-400 text-emerald-400 hover:bg-emerald-400/10">
                      Learn More
                  </Button>
                </Link>
             </div>
          </div>
          {/* Viewer Half - Split into two */}
          <div className="flex-1 flex flex-col">
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <div className="w-full h-full flex items-center justify-center bg-obsidian-950">
                    <div className="bg-obsidian-900/50 backdrop-blur-md p-8 rounded-lg border border-white/10 w-full max-w-2xl">
                        <div className="flex items-center gap-2 text-slate-300 mb-6">
                            <BarChart3 className="h-6 w-6" />
                            <span className="text-lg font-medium">Live Analytics</span>
                        </div>
                        {/* Simple CSS Chart */}
                        <div className="flex items-end gap-2 h-64">
                            {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60].map((h, i) => (
                                <div key={i} className="flex-1 bg-cyan/80 rounded-t-sm hover:bg-cyan transition-colors" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>
                  </div>
                </ExpandableViewer>
              </div>
              <div className="flex-[0.45] bg-black">
                <ExpandableViewer>
                  <div className="w-full h-full flex items-center justify-center bg-slate-600 text-white">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📈</div>
                      <p className="text-lg font-semibold">Report Builder</p>
                      <p className="text-sm opacity-90">Click to expand and customize</p>
                    </div>
                  </div>
                </ExpandableViewer>
              </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="h-screen w-full snap-start flex items-center justify-center bg-gradient-to-b from-obsidian to-obsidian-950 text-slate-50">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to replace 7 tools with 1?</h2>
            <p className="text-xl md:text-2xl text-slate-400 mb-10">
              Join thousands of teams already using Slate360 to streamline their workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/pricing">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full bg-cyan text-obsidian hover:bg-cyan-400 transition-all">
                  Subscribe Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full border-white/20 text-slate-200 hover:bg-white/10 hover:text-white">
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

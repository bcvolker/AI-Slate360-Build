"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Layers, Box, FileText, Video, Map, Zap, BarChart3, Check, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassyCard } from "@/components/ui/glassy-card";
import { TileErrorBoundary } from "@/components/ui/tile-error-boundary";

// Loading State
const LoadingState = () => <div className="w-full h-full bg-white/5 animate-pulse min-h-[300px]" />;

// Dynamic Imports
const LiveMap = dynamic(() => import("@/components/homepage/LiveMap"), { ssr: false, loading: LoadingState });
const LiveTour = dynamic(() => import("@/components/homepage/LiveTour"), { ssr: false, loading: LoadingState });
const LiveDesignViewer = dynamic(() => import("@/components/homepage/LiveDesignViewer"), { ssr: false, loading: LoadingState });
const LiveProjectList = dynamic(() => import("@/components/homepage/LiveProjectList"), { ssr: false });

interface FeatureTileProps {
  icon: LucideIcon;
  title: string;
  headline: string;
  description: string;
  features: string[];
  link: string;
  cta: string;
  viewer: React.ReactNode;
}

function FeatureTile({ icon: Icon, title, headline, description, features, link, cta, viewer }: FeatureTileProps) {
  return (
    <GlassyCard className="p-0 overflow-hidden flex flex-col h-full border-white/10 bg-black/40 backdrop-blur-xl group" hoverEffect>
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 bg-white/5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/10 text-white shadow-inner border border-white/5">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-sm font-semibold uppercase tracking-widest text-zinc-300">{title}</span>
      </div>

      {/* Viewer Area - The "Unified" part */}
      <div className="relative w-full h-[300px] lg:h-[350px] bg-zinc-900/50 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <TileErrorBoundary>
            {viewer}
            </TileErrorBoundary>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-8 flex flex-col flex-grow space-y-6 bg-gradient-to-b from-black/20 to-transparent">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{headline}</h3>
          <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
            {description}
          </p>
        </div>

        <ul className="space-y-3 text-zinc-300 flex-grow">
          {features.map((feat, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-emerald-500" />
              </div>
              {feat}
            </li>
          ))}
        </ul>

        <div className="pt-4 mt-auto">
          <Link href={link} className="block w-full">
            <Button variant="outline" className="w-full h-12 border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-all duration-300">
              {cta} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </GlassyCard>
  );
}

export function FeatureGrid() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      
      {/* 1. Project Hub */}
      <FeatureTile 
        icon={Layers}
        title="Project Hub"
        headline="Centralize your chaos."
        description="Your single source of truth. Manage building projects, documents, schedules, and field reports in one clean workspace."
        features={[
            "Gantt charts & punch lists",
            "AI document review",
            "Real-time team collaboration"
        ]}
        link="/features/project-hub"
        cta="Explore Project Hub"
        viewer={
            <div className="w-full h-full flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-60">
                    <LiveProjectList />
                </div>
                <div className="z-10 text-center p-6 bg-black/60 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-4xl mb-2">📂</div>
                    <p className="text-sm font-medium text-zinc-200">Live Project Data</p>
                </div>
            </div>
        }
      />

      {/* 2. Design Studio */}
      <FeatureTile 
        icon={Box}
        title="Design Studio"
        headline="Build in the browser."
        description="Create and edit 2D and 3D projects instantly. Upload visual data to be processed into digital twins or open complex 3D files."
        features={[
            "AI 2D-to-3D conversion",
            "Parametric component library",
            "3D print preparation"
        ]}
        link="/features/design-studio"
        cta="Explore Design Studio"
        viewer={<LiveDesignViewer />}
      />

      {/* 3. Content Studio */}
      <FeatureTile 
        icon={FileText}
        title="Content Studio"
        headline="Pro video, simplified."
        description="Turn site footage, 360 videos, and photos into polished reels. AI stabilization, grading, and timelapse stitching in seconds."
        features={[
            "Automated timelapse stitching",
            "AI color grading & stabilization",
            "Social-ready exports"
        ]}
        link="/features/content-studio"
        cta="Explore Content Studio"
        viewer={
            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                <div className="text-center">
                    <div className="text-5xl mb-4 animate-pulse">🎬</div>
                    <p className="text-zinc-400">AI Video Editor Preview</p>
                </div>
            </div>
        }
      />

      {/* 4. Tour Builder */}
      <FeatureTile 
        icon={Video}
        title="360 Tour Builder"
        headline="Immersive tours, fast."
        description="Drag-and-drop tour creation. Add hotspots, floorplans, and progress comparisons. Share with a simple link."
        features={[
            "Interactive hotspots",
            "Floorplan integration",
            "VR-ready exports"
        ]}
        link="/features/tour-builder"
        cta="Explore Tour Builder"
        viewer={<LiveTour />}
      />

      {/* 5. Geospatial */}
      <FeatureTile 
        icon={Map}
        title="Geospatial & Robotics"
        headline="Command the field."
        description="Plan drone missions, monitor robots, and overlay drawings on maps. Measure volumes and track site changes from the sky."
        features={[
            "Drone mission planning",
            "LiDAR volume analysis",
            "Anomaly detection"
        ]}
        link="/features/geospatial-robotics"
        cta="Explore Geospatial"
        viewer={<LiveMap />}
      />

      {/* 6. Virtual Studio */}
      <FeatureTile 
        icon={Zap}
        title="Virtual Studio"
        headline="Cinematic visualization."
        description="Transform designs into cinematic walkthroughs. Adjust lighting, materials, and camera paths for stunning presentations."
        features={[
            "Real-time rendering",
            "WebXR support",
            "Athlete 360 motion analysis"
        ]}
        link="/features/virtual-studio"
        cta="Explore Virtual Studio"
        viewer={
            <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                <div className="text-center">
                    <div className="text-5xl mb-4 text-yellow-500">⚡</div>
                    <p className="text-zinc-400">WebXR Preview</p>
                </div>
            </div>
        }
      />

      {/* 7. Analytics (Full Width) */}
      <div className="lg:col-span-2">
        <FeatureTile 
            icon={BarChart3}
            title="Analytics & Reports"
            headline="Data, not guesses."
            description="Automated dashboards and custom reports built from all your project data. Forecast trends and track ROI instantly."
            features={[
                "Cross-project insights",
                "Automated PDF reports",
                "Risk forecasting"
            ]}
            link="/features/analytics-reports"
            cta="Explore Analytics"
            viewer={
                <div className="w-full h-full flex items-center justify-center p-8 bg-zinc-900">
                    <div className="w-full h-full flex items-end gap-2 opacity-70 max-w-md mx-auto">
                        {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60].map((h, i) => (
                            <div key={i} className="flex-1 bg-white rounded-t-sm hover:bg-emerald-500 transition-colors duration-300" style={{ height: `${h}%` }} />
                        ))}
                    </div>
                </div>
            }
        />
      </div>

    </div>
  );
}

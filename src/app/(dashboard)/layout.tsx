"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { CommandMenu } from "@/components/dashboard/CommandMenu";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { entitlements, user, tier, creditsRemaining, clear } = useAuthStore();

  const isCEO = user?.email === "ceo@slate360.com";
  const hasAthleteAccess = entitlements["athlete360"] || isCEO;

  const navItems = [
    entitlements["project-hub"] && {
      key: "project-hub",
      label: "Project Hub",
      hint: "Projects",
      href: "/dashboard?tab=project-hub",
    },
    entitlements["design-studio"] && {
      key: "design-studio",
      label: "Design Studio",
      hint: "3D",
      href: "/dashboard?tab=design-studio",
    },
    entitlements["content-studio"] && {
      key: "content-studio",
      label: "Content Studio",
      hint: "Media",
      href: "/dashboard?tab=content-studio",
    },
    entitlements["360-tour-builder"] && {
      key: "360-tour-builder",
      label: "360 Tour Builder",
      hint: "Tours",
      href: "/dashboard?tab=360-tour-builder",
    },
    entitlements["geospatial-robotics"] && {
      key: "geospatial-robotics",
      label: "Geospatial & Robotics",
      hint: "Maps",
      href: "/dashboard?tab=geospatial-robotics",
    },
    entitlements["virtual-studio"] && {
      key: "virtual-studio",
      label: "Virtual Studio",
      hint: "VR",
      href: "/dashboard?tab=virtual-studio",
    },
    entitlements["analytics-reports"] && {
      key: "analytics-reports",
      label: "Analytics & Reports",
      hint: "Data",
      href: "/dashboard?tab=analytics-reports",
    },
    { key: "my-account", label: "My Account", hint: "Profile", href: "/dashboard?tab=my-account" },
    isCEO && { key: "ceo", label: "CEO", hint: "Internal", href: "/dashboard?tab=ceo" },
    hasAthleteAccess && {
      key: "athlete360",
      label: "Athlete360",
      hint: "Sports",
      href: "/dashboard?tab=athlete360",
    },
  ].filter(Boolean) as { key: string; label: string; href: string; hint: string }[];

  return (
    <div className="h-screen bg-slate-950 text-zinc-100 flex overflow-hidden selection:bg-white/20 font-sans">
      {/* Left rail */}
      <aside className="hidden md:flex md:flex-col w-64 border-r border-white/10 bg-slate-900 text-zinc-400 z-50">
        <div className="h-20 px-6 flex items-center border-b border-white/10 bg-slate-900">
          <Link href="/" className="flex items-center gap-2">
            <Image 
                src="/slate360newlogo.png" 
                alt="Slate360" 
                width={600} 
                height={150} 
                className="h-32 w-auto object-contain" 
            />
          </Link>
        </div>
        <div className="flex-1 relative min-h-0">
          <nav className="absolute inset-0 overflow-y-auto py-6 px-4 space-y-1.5 sidebar-scrollbar">
            {navItems.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : false;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`group flex items-center rounded-xl px-3 py-2.5 transition-all duration-200 border border-transparent ${
                    active
                      ? "bg-white/10 text-white border-white/10 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                  }`}
                >
                  <span className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                      active ? "bg-white/20 text-white" : "bg-white/5 text-zinc-400 group-hover:bg-white/10 group-hover:text-zinc-100"
                  }`}>
                    {item.hint?.[0] ?? ""}
                  </span>
                  <span className="ml-3 flex flex-col leading-none">
                    <span className="text-sm font-medium">{item.label}</span>
                    {active && <span className="text-[10px] text-zinc-300 mt-1 font-normal">{item.hint}</span>}
                  </span>
                  {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="px-4 py-4 border-t border-white/10 bg-zinc-900/50">
          {/* Workspace / Enterprise / CEO context (compressed) */}
          <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-3 space-y-2 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {isCEO ? "Slate360" : "Workspace"}
              </p>
              <span className="text-[10px] rounded-full bg-white/10 border border-white/10 px-2 py-0.5 text-zinc-200 font-medium">
                {tier || "Unknown"}
              </span>
            </div>

            {/* Individual license tiers / simple blurb */}
            {!isCEO && tier !== "enterprise" && (
              <p className="text-[11px] text-zinc-300 truncate">
                {tier === "trial"
                  ? "Trial • Core tools"
                  : tier === "creator"
                  ? "Creator • Design + content"
                  : tier === "modeling"
                  ? "Modeling • Heavy 3D"
                  : tier === "god-mode"
                  ? "God Mode • All tools"
                  : "Single-seat workspace"}
              </p>
            )}

            {/* Enterprise / multi-seat org view */}
            {!isCEO && tier === "enterprise" && (
              <p className="text-[11px] text-zinc-300 truncate">
                Enterprise org • 14 / 20 seats
              </p>
            )}

            {/* CEO internal view */}
            {isCEO && (
              <p className="text-[11px] text-zinc-300 truncate">
                Slate360 internal controls
              </p>
            )}
          </div>

          {/* Signed-in footer */}
          <div>
            <div className="flex items-center justify-between gap-2 mt-3">
              <p className="font-medium text-zinc-200 text-xs truncate">
                {user?.email ?? "Guest"}
              </p>
              <Link
                href="/"
                className="text-[10px] text-zinc-400 hover:text-white transition-colors"
              >
                Home
              </Link>
            </div>
            {user && (
              <button
                type="button"
                onClick={() => {
                  clear();
                  router.push("/login");
                }}
                className="mt-1 text-[10px] text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-950 relative">
        
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-slate-900 flex-shrink-0 z-40 sticky top-0">
            <div className="flex items-center gap-4 flex-1">
                <CommandMenu />
            </div>
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                    <Bell className="h-5 w-5" />
                </Button>
                <div className="h-6 w-px bg-white/10 mx-1"></div>
                <div className="flex -space-x-2 overflow-hidden pl-1">
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-zinc-800 flex items-center justify-center text-xs text-white font-bold border border-white/10">JD</div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-black bg-zinc-700 flex items-center justify-center text-xs text-white font-bold border border-white/10">AS</div>
                </div>
            </div>
        </header>
        {children}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/useAuthStore";

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
    <div className="h-screen bg-background text-foreground flex overflow-hidden">
      {/* Left rail */}
      <aside className="hidden md:flex md:flex-col w-56 border-r border-border/60 bg-card/80 backdrop-blur-sm">
        <div className="h-14 px-4 flex items-center border-b border-border/60">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Slate360
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1.5 text-[13px]">
          {navItems.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : false;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center rounded-full px-3 py-2 transition-colors border ${
                  active
                    ? "bg-background text-foreground border-border/80 shadow-sm"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40 hover:border-border/60"
                }`}
              >
                <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-border/60 text-[11px] text-muted-foreground/80">
                  {item.hint?.[0] ?? ""}
                </span>
                <span className="ml-2 flex flex-col leading-tight">
                  <span className="text-[13px] font-medium">{item.label}</span>
                  <span className="text-[10px] text-muted-foreground/80">{item.hint}</span>
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="px-3 py-2 border-t border-border/60 text-[11px] text-muted-foreground space-y-2">
          {/* Workspace / Enterprise / CEO context (compressed) */}
          <div className="rounded-lg border border-border/70 bg-background/70 px-2.5 py-2 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {isCEO ? "Slate360" : "Workspace"}
              </p>
              <span className="text-[11px] rounded-full border border-border/60 px-2 py-0.5 text-foreground/80">
                {tier || "Unknown"}
              </span>
            </div>

            {/* Individual license tiers / simple blurb */}
            {!isCEO && tier !== "enterprise" && (
              <p className="text-[11px] text-muted-foreground/90 truncate">
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
              <p className="text-[11px] text-muted-foreground/90 truncate">
                Enterprise org • 14 / 20 seats
              </p>
            )}

            {/* CEO internal view */}
            {isCEO && (
              <p className="text-[11px] text-muted-foreground/90 truncate">
                Slate360 internal controls
              </p>
            )}
          </div>

          {/* Signed-in footer */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-foreground text-[11px] truncate">
                {user?.email ?? "Guest"}
              </p>
              <Link
                href="/"
                className="text-[11px] underline-offset-2 hover:underline"
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
                className="mt-1 text-[11px] text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

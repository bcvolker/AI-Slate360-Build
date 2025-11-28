"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderKanban,
  Map,
  Box,
  Video,
  Activity,
  Users,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Project Hub", href: "/project-hub", icon: FolderKanban },
  { name: "Geospatial", href: "/geospatial", icon: Map },
  { name: "Design Studio", href: "/design-studio", icon: Box },
  { name: "Virtual Studio", href: "/virtual-studio", icon: Video },
  { name: "Athlete 360", href: "/athlete-360", icon: Activity },
  { name: "Team", href: "/team", icon: Users },
];

import { CreditTopUpModal } from "@/components/features/project-hub/CreditTopUpModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { entitlements, creditsRemaining, tier, setEntitlements, setTier, setCreditsRemaining } = useAuthStore();

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then((d) => {
        setEntitlements(d.entitlements);
        setTier(d.tier);
        setCreditsRemaining(d.usage.creditsRemaining);
      });
  }, []);

  const filteredNavItems = navItems.filter(item => entitlements[item.href.slice(1) as keyof typeof entitlements] ?? false || item.href === '/dashboard');

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col border-r bg-white h-full">
        <div className="flex items-center justify-between p-6 border-b bg-white">
          <Link href="/dashboard" className="flex items-center gap-3 hover:no-underline">
            <h1 className="text-2xl font-bold tracking-tight">Slate360</h1>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-slate-600 font-medium">
              Credits: <span className="font-bold text-slate-900">{creditsRemaining ?? 1250}</span>
            </div>
            <CreditTopUpModal />
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>


  <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t bg-slate-50">

          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Topbar - Mobile/Tablet/Desktop */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
             <span className="lg:hidden font-bold text-lg">Slate360</span>
             {/* Breadcrumbs or Page Title could go here for Desktop */}
          </div>
          
          <div className="flex items-center gap-2">
             <CreditTopUpModal />
             <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
             </Button>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute inset-0 z-50 bg-white flex flex-col p-4 animate-in slide-in-from-top-5">
             <div className="flex justify-end mb-4">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                </Button>
             </div>
             <nav className="space-y-2">
                {filteredNavItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-md text-lg font-medium",
                            pathname.startsWith(item.href)
                                ? "bg-slate-900 text-white"
                                : "text-slate-600 hover:bg-slate-100"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </Link>
                ))}
             </nav>
          </div>
        )}

        {/* Content Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>

        {/* Bottom Nav - Mobile Only (<= 640px) */}
        <nav className="sm:hidden border-t bg-white flex justify-around items-center h-16 shrink-0 pb-safe">
            {filteredNavItems.slice(0, 4).map((item) => (
                <Link key={item.href} href={item.href} className={cn("flex flex-col items-center justify-center w-full h-full", pathname.startsWith(item.href) ? "text-blue-600" : "text-slate-400")}>
                    <item.icon className="h-5 w-5" />
                    <span className="text-[10px] mt-1">{item.name.split(' ')[0]}</span>
                </Link>
            ))}
             <Link href="/menu" className="flex flex-col items-center justify-center w-full h-full text-slate-400">
                <Menu className="h-5 w-5" />
                <span className="text-[10px] mt-1">More</span>
            </Link>
        </nav>
      </div>
    </div>
  );
}

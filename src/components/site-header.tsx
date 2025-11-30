"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for glass background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    { href: "/features/project-hub", label: "Project Hub", desc: "Management & Docs" },
    { href: "/features/design-studio", label: "Design Studio", desc: "3D Modeling" },
    { href: "/features/content-studio", label: "Content Studio", desc: "Video & Media" },
    { href: "/features/tour-builder", label: "360 Tour Builder", desc: "Virtual Tours" },
    { href: "/features/geospatial-robotics", label: "Geospatial", desc: "Maps & Drones" },
    { href: "/features/virtual-studio", label: "Virtual Studio", desc: "WebXR & Sim" },
    { href: "/features/analytics-reports", label: "Analytics", desc: "Data & Reports" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-black/80 backdrop-blur-xl border-white/10 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
             <span className="text-white font-bold text-lg">S</span>
          </div>
          Slate360
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          
          {/* About */}
          <Link href="/about">
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium">
              About
            </Button>
          </Link>

          {/* Plans & Pricing */}
          <Link href="/subscribe">
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium">
              Plans & Pricing
            </Button>
          </Link>

          {/* Features Dropdown */}
          <div className="relative group">
            <Button 
              variant="ghost" 
              className="text-zinc-400 hover:text-white hover:bg-white/5 text-sm font-medium gap-1"
              onClick={() => setFeaturesOpen(!featuresOpen)}
              onMouseEnter={() => setFeaturesOpen(true)}
            >
              Features <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
            
            {/* Dropdown Menu */}
            <div 
              className={cn(
                "absolute top-full right-0 mt-2 w-64 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl p-2 shadow-2xl transition-all duration-200 origin-top-right",
                featuresOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"
              )}
              onMouseLeave={() => setFeaturesOpen(false)}
            >
              <div className="grid gap-1">
                {features.map((feature) => (
                  <Link 
                    key={feature.href} 
                    href={feature.href}
                    className="flex flex-col px-3 py-2 rounded-lg hover:bg-white/10 transition-colors group/item"
                  >
                    <span className="text-sm font-medium text-zinc-200 group-hover/item:text-white">{feature.label}</span>
                    <span className="text-xs text-zinc-500 group-hover/item:text-zinc-400">{feature.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-white/10 mx-4" />

          {/* Login */}
          <Link href="/login">
            <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10 font-medium">
              Login
            </Button>
          </Link>

          {/* CTA */}
          <Link href="/subscribe">
            <Button className="ml-2 bg-white text-black hover:bg-zinc-200 rounded-full px-6 font-medium transition-transform hover:scale-105">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-zinc-300 hover:text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full border-b border-white/10 bg-black/95 backdrop-blur-xl p-6 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-5 h-[calc(100vh-80px)] overflow-y-auto">
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium text-zinc-400 hover:text-white py-2">
            About
          </Link>
          <Link href="/subscribe" onClick={() => setIsOpen(false)} className="text-lg font-medium text-zinc-400 hover:text-white py-2">
            Plans & Pricing
          </Link>
          
          <div className="py-2">
            <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Features</p>
            <div className="grid gap-3 pl-4 border-l border-white/10">
              {features.map((feature) => (
                <Link 
                  key={feature.href} 
                  href={feature.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base text-zinc-300 hover:text-white"
                >
                  {feature.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-white/10 my-2" />
          
          <Link href="/login" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-zinc-300 hover:text-white hover:bg-white/10 text-lg h-12">
              Login
            </Button>
          </Link>
          <Link href="/subscribe" onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-white text-black hover:bg-zinc-200 h-12 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

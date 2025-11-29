"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/useAuthStore";

export default function Home() {
  const { user } = useAuthStore();
  return (
    <>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">Slate360</Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="outline" className="border-slate-600 text-white hover:bg-cyan-400/10">
                Subscribe
              </Button>
            </Link>
            {user ? (
              <Link href="/dashboard">
                <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="min-h-screen w-full bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            Slate360
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 mb-10 max-w-3xl">
            From raw data to finished reality — one unified platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-6 rounded-full bg-cyan-500 text-black hover:bg-cyan-400 transition-all">
                Enter Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

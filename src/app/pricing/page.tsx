import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function PricingPage() {
  return (
    <div className="h-screen bg-obsidian text-slate-50 overflow-hidden flex flex-col">
      {/* Header - Compact */}
      <header className="border-b border-white/10 bg-obsidian/80 backdrop-blur-md z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image 
                src="/slate360newlogo.png" 
                alt="Slate360" 
                width={200} 
                height={55} 
                className="h-12 w-auto object-contain" 
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-400 hover:text-white transition-colors text-sm">
              Login
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-center px-4 max-w-7xl mx-auto w-full py-4">
        <div className="text-center mb-6 flex-shrink-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-0.5">
              <span className="text-emerald-400 font-medium text-xs">✨ Save 20% with annual billing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          {/* Creator Plan */}
          <div className="bg-obsidian-900/50 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm rounded-xl p-5 flex flex-col">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold mb-1 text-white">Creator</h2>
              <div className="text-3xl font-bold text-blue-500 mb-0.5">$79<span className="text-base text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-500 text-xs">Annual: $63/mo (save 20%)</p>
            </div>
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-2 text-slate-600">
                <X className="h-4 w-4 shrink-0" />
                Project Hub
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-blue-500 shrink-0" />
                Content Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-blue-500 shrink-0" />
                360 Tour Builder
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <X className="h-4 w-4 shrink-0" />
                Geospatial & Robotics
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <X className="h-4 w-4 shrink-0" />
                Virtual Studio
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <X className="h-4 w-4 shrink-0" />
                Analytics & Reports
              </li>
            </ul>
            <Link href="/login">
                <Button className="w-full bg-blue-500 text-obsidian hover:bg-blue-500-400 h-9 text-sm font-medium">
                Start Free Trial
                </Button>
            </Link>
          </div>

          {/* Modeling Plan */}
          <div className="bg-obsidian-900/80 border border-blue-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm rounded-xl p-5 relative flex flex-col shadow-[0_0_40px_-10px_rgba(0,245,255,0.2)]">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-blue-500 text-obsidian px-3 py-0.5 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-wider">
                Most Popular
              </div>
            </div>
            <div className="text-center mb-4 mt-1">
              <h2 className="text-xl font-bold mb-1 text-white">Modeling</h2>
              <div className="text-3xl font-bold text-blue-500 mb-0.5">$199<span className="text-base text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-500 text-xs">Annual: $159/mo (save 20%)</p>
            </div>
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-2 text-slate-600">
                <X className="h-4 w-4 shrink-0" />
                Project Hub
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-blue-500 shrink-0" />
                Design Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-blue-500 shrink-0" />
                Content Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-blue-500 shrink-0" />
                360 Tour Builder
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-blue-500 shrink-0" />
                Geospatial & Robotics
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <X className="h-4 w-4 shrink-0" />
                Virtual Studio
              </li>
              <li className="flex items-center gap-2 text-slate-600">
                <X className="h-4 w-4 shrink-0" />
                Analytics & Reports
              </li>
            </ul>
            <Link href="/login">
                <Button className="w-full bg-blue-500 text-obsidian hover:bg-blue-500-400 h-9 text-sm font-medium">
                Start Free Trial
                </Button>
            </Link>
          </div>

          {/* God Mode Plan */}
          <div className="bg-obsidian-900/50 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm rounded-xl p-5 flex flex-col">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold mb-1 text-white">God Mode</h2>
              <div className="text-3xl font-bold text-purple-400 mb-0.5">$499<span className="text-base text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-500 text-xs">Annual: $399/mo (save 20%)</p>
            </div>
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-purple-400 shrink-0" />
                Project Hub
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-purple-400 shrink-0" />
                Design Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-purple-400 shrink-0" />
                Content Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-purple-400 shrink-0" />
                360 Tour Builder
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-purple-400 shrink-0" />
                Geospatial & Robotics
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-purple-400 shrink-0" />
                Virtual Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-purple-400 shrink-0" />
                Analytics & Reports
              </li>
            </ul>
            <Link href="/login">
                <Button className="w-full bg-purple-500 text-white hover:bg-purple-600 h-9 text-sm font-medium">
                Start Free Trial
                </Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-obsidian-900/50 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm rounded-xl p-5 flex flex-col">
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold mb-1 text-white">Enterprise</h2>
              <div className="text-3xl font-bold text-slate-200 mb-0.5">Custom</div>
              <p className="text-slate-500 text-xs">Contact for annual pricing</p>
            </div>
            <ul className="space-y-3 mb-6 text-sm">
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-slate-400 shrink-0" />
                All features included
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-slate-400 shrink-0" />
                Custom integrations
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-slate-400 shrink-0" />
                Dedicated support
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-slate-400 shrink-0" />
                White-label options
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-slate-400 shrink-0" />
                SLA Guarantees
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-slate-400 shrink-0" />
                SSO & Security
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-slate-400 shrink-0" />
                API Access
              </li>
            </ul>
            <Link href="/login">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 h-9 text-sm font-medium">
                Contact Sales
                </Button>
            </Link>
          </div>
        </div>

        {/* CTA Section - Minimal */}
        <div className="text-center mt-6 mb-2 flex-shrink-0">
          <p className="text-slate-400 mb-2 text-xs">
            Join thousands of teams already using Slate360.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/login" className="text-blue-500 hover:text-blue-500-400 text-xs font-medium hover:underline">
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

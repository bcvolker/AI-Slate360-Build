import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-50">
      {/* Header */}
      <header className="border-b border-white/10 bg-obsidian/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-50 hover:text-cyan transition-colors">
            ← Back to Slate360
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-400 hover:text-white transition-colors">
              Login
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan/10 text-cyan px-3 py-1 rounded-full text-sm font-medium mb-4 border border-cyan/20">
            💰 Pricing Plans
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Select the perfect plan for your team's needs. All plans include our core features with different levels of access and capabilities.
          </p>
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
              <span className="text-emerald-400 font-medium">✨ Save 20% with annual billing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Creator Plan */}
          <div className="bg-obsidian-900/50 border border-white/10 hover:border-cyan/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-10px_rgba(0,245,255,0.3)] backdrop-blur-sm rounded-2xl p-8 flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">Creator</h2>
              <div className="text-4xl font-bold text-cyan mb-1">$79<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-500 text-sm">Perfect for small teams</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-cyan shrink-0" />
                Project Hub
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-cyan shrink-0" />
                Design Studio
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-cyan shrink-0" />
                Content Studio
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-cyan shrink-0" />
                360 Tour Builder
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <X className="h-5 w-5 shrink-0" />
                Geospatial & Robotics
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <X className="h-5 w-5 shrink-0" />
                Virtual Studio
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <X className="h-5 w-5 shrink-0" />
                Analytics & Reports
              </li>
            </ul>
            <Link href="/login">
                <Button className="w-full bg-cyan text-obsidian hover:bg-cyan-400 shadow-lg hover:shadow-cyan/25 transition-all duration-300">
                Start Free Trial
                </Button>
            </Link>
          </div>

          {/* Modeling Plan */}
          <div className="bg-obsidian-900/80 border border-cyan/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(0,245,255,0.4)] backdrop-blur-sm rounded-2xl p-8 relative flex flex-col">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-cyan text-obsidian px-4 py-1 rounded-full text-sm font-bold shadow-lg uppercase tracking-wider">
                Most Popular
              </div>
            </div>
            <div className="text-center mb-6 mt-2">
              <h2 className="text-2xl font-bold mb-2 text-white">Modeling</h2>
              <div className="text-4xl font-bold text-cyan mb-1">$199<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-500 text-sm">For growing businesses</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-cyan shrink-0" />
                Project Hub
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-cyan shrink-0" />
                Design Studio
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-cyan shrink-0" />
                Content Studio
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-cyan shrink-0" />
                360 Tour Builder
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-cyan shrink-0" />
                Geospatial & Robotics
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <X className="h-5 w-5 shrink-0" />
                Virtual Studio
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-cyan shrink-0" />
                Analytics & Reports
              </li>
            </ul>
            <Link href="/login">
                <Button className="w-full bg-cyan text-obsidian hover:bg-cyan-400 shadow-lg hover:shadow-cyan/25 transition-all duration-300">
                Start Free Trial
                </Button>
            </Link>
          </div>

          {/* God Mode Plan */}
          <div className="bg-obsidian-900/50 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)] backdrop-blur-sm rounded-2xl p-8 flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">God Mode</h2>
              <div className="text-4xl font-bold text-purple-400 mb-1">$499<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <p className="text-slate-500 text-sm">Everything included</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-purple-400 shrink-0" />
                Project Hub
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-purple-400 shrink-0" />
                Design Studio
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-purple-400 shrink-0" />
                Content Studio
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-purple-400 shrink-0" />
                360 Tour Builder
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-purple-400 shrink-0" />
                Geospatial & Robotics
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-purple-400 shrink-0" />
                Virtual Studio
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-purple-400 shrink-0" />
                Analytics & Reports
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-purple-400 shrink-0" />
                Athlete360
              </li>
            </ul>
            <Link href="/login">
                <Button className="w-full bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                Start Free Trial
                </Button>
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-obsidian-900/50 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)] backdrop-blur-sm rounded-2xl p-8 flex flex-col">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-white">Enterprise</h2>
              <div className="text-4xl font-bold text-slate-200 mb-1">Custom</div>
              <p className="text-slate-500 text-sm">Tailored solutions</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-slate-400 shrink-0" />
                All features included
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-slate-400 shrink-0" />
                Custom integrations
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-slate-400 shrink-0" />
                Dedicated support
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-slate-400 shrink-0" />
                White-label options
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <Check className="h-5 w-5 text-slate-400 shrink-0" />
                API access
              </li>
            </ul>
            <Link href="/login">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 shadow-lg transition-all duration-300">
                Contact Sales
                </Button>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-obsidian-900 to-obsidian-800 backdrop-blur-sm rounded-2xl p-12 border border-white/10 mt-16">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Get Started?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Slate360 to streamline their workflows and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button className="bg-cyan text-obsidian hover:bg-cyan-400 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-cyan/25 transition-all duration-300">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/learn/project-hub">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full shadow-lg transition-all duration-300">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

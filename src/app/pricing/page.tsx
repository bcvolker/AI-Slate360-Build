import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-slate-50 hover:text-cyan-400 transition-colors">
            ← Back to Slate360
          </a>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-slate-600 hover:text-slate-900 transition-colors">
              Login
            </a>
          </div>
        </div>
      </header>

      <div className="p-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
            💰 Pricing Plans
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Select the perfect plan for your team's needs. All plans include our core features with different levels of access and capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 backdrop-blur-sm rounded-xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-slate-50">Creator</h2>
              <div className="text-4xl font-bold text-cyan-400 mb-1">$79<span className="text-lg text-slate-400">/month</span></div>
              <p className="text-slate-400 text-sm">Perfect for small teams</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Project Hub
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Design Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Content Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                360 Tour Builder
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <X className="h-4 w-4" />
                Geospatial & Robotics
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <X className="h-4 w-4" />
                Virtual Studio
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <X className="h-4 w-4" />
                Analytics & Reports
              </li>
            </ul>
            <Button className="w-full bg-cyan text-slate-900 hover:bg-cyan-500 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
              Start Free Trial
            </Button>
          </div>

          <div className="bg-slate-800/50 border-cyan-400/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-2 backdrop-blur-sm rounded-xl p-6 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-cyan-400 text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Most Popular
              </div>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-slate-50">Modeling</h2>
              <div className="text-4xl font-bold text-cyan-400 mb-1">$199<span className="text-lg text-slate-400">/month</span></div>
              <p className="text-slate-400 text-sm">For growing businesses</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Project Hub
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Design Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Content Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                360 Tour Builder
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Geospatial & Robotics
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <X className="h-4 w-4" />
                Virtual Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Analytics & Reports
              </li>
            </ul>
            <Button className="w-full bg-cyan text-slate-900 hover:bg-cyan-500 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
              Start Free Trial
            </Button>
          </div>

          <div className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 backdrop-blur-sm rounded-xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-slate-50">God Mode</h2>
              <div className="text-4xl font-bold text-cyan-400 mb-1">$499<span className="text-lg text-slate-400">/month</span></div>
              <p className="text-slate-400 text-sm">Everything included</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Project Hub
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Design Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Content Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                360 Tour Builder
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Geospatial & Robotics
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Virtual Studio
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Analytics & Reports
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Athlete360
              </li>
            </ul>
            <Button className="w-full bg-cyan text-slate-900 hover:bg-cyan-500 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
              Start Free Trial
            </Button>
          </div>

          <div className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 backdrop-blur-sm rounded-xl p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 text-slate-50">Enterprise</h2>
              <div className="text-4xl font-bold text-cyan-400 mb-1">Custom</div>
              <p className="text-slate-400 text-sm">Tailored solutions</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                All features included
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Custom integrations
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                Dedicated support
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                White-label options
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Check className="h-4 w-4 text-cyan-400" />
                API access
              </li>
            </ul>
            <Button className="w-full bg-cyan text-slate-900 hover:bg-cyan-500 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
              Contact Sales
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700/50 mt-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-50">Ready to Get Started?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Slate360 to streamline their workflows and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/login">
              <Button className="bg-cyan text-slate-900 hover:bg-cyan-500 px-8 py-3 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                Start Free Trial
              </Button>
            </a>
            <a href="/learn/project-hub">
              <Button variant="outline" className="border-slate-600 text-slate-900 hover:bg-slate-800 px-8 py-3 shadow-lg hover:shadow-slate-500/25 transition-all duration-300 hover:scale-105">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
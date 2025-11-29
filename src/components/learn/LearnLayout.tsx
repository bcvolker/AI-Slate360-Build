"use client";

import Link from "next/link";
import { ArrowLeft, Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LearnPage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  tiersHighlight?: string[];
  pricing?: {
    starter?: { price: number; features: string[] };
    pro?: { price: number; features: string[] };
    enterprise?: { price: number; features: string[] };
  };
}

interface LearnLayoutProps {
  page: LearnPage;
}

export function LearnLayout({ page }: LearnLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-50 hover:text-cyan-400 transition-colors">
            ← Back to Slate360
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                View Pricing
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-cyan text-slate-900 hover:bg-cyan-500">
                Try Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            {page.subtitle}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-transparent">
            {page.title}
          </h1>
          {page.tiersHighlight && (
            <p className="mt-3 text-xs text-cyan-400">
              Available in: {page.tiersHighlight.join(" • ")}
            </p>
          )}
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            {page.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-cyan text-slate-900 hover:bg-cyan-500 px-8 py-3 shadow-[0_4px_14px_0_rgba(0,245,255,0.3)]">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 shadow-[0_4px_14px_0_rgba(100,116,139,0.1)]">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {page.features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 backdrop-blur-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-slate-50">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Section */}
        {page.pricing && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-50">Choose Your Plan</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
                <CardHeader>
                  <CardTitle className="text-slate-50">Creator</CardTitle>
                  <div className="text-3xl font-bold text-cyan-400">${page.pricing?.starter?.price || 49}<span className="text-lg text-slate-400">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(page.pricing?.starter?.features || ["Project Hub", "Design Studio", "Content Studio", "360 Tour Builder"]).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300">
                        <Check className="h-4 w-4 text-cyan-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-400/50 backdrop-blur-sm shadow-[0_4px_14px_0_rgba(0,245,255,0.2)] relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-cyan-400 text-slate-900 px-3 py-1 text-sm font-medium">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-slate-50">Modeling</CardTitle>
                  <div className="text-3xl font-bold text-cyan-400">${page.pricing?.pro?.price || 149}<span className="text-lg text-slate-400">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(page.pricing?.pro?.features || ["All Creator features", "Geospatial & Robotics", "Analytics & Reports"]).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300">
                        <Check className="h-4 w-4 text-cyan-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
                <CardHeader>
                  <CardTitle className="text-slate-50">God Mode</CardTitle>
                  <div className="text-3xl font-bold text-cyan-400">${page.pricing?.enterprise?.price || 399}<span className="text-lg text-slate-400">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(page.pricing?.enterprise?.features || ["All features", "Virtual Studio", "Athlete360", "White-label"]).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-300">
                        <Check className="h-4 w-4 text-cyan-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]">
                <CardHeader>
                  <CardTitle className="text-slate-50">Enterprise</CardTitle>
                  <div className="text-3xl font-bold text-cyan-400">Custom</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
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
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700/50">
          <h2 className="text-3xl font-bold mb-4 text-slate-50">Ready to Get Started?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Slate360 to streamline their workflows and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button className="bg-cyan text-slate-900 hover:bg-cyan-500 px-8 py-3 shadow-[0_4px_14px_0_rgba(0,245,255,0.3)]">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 shadow-[0_4px_14px_0_rgba(100,116,139,0.1)]">
                Compare Plans
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
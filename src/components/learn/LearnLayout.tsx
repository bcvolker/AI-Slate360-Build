"use client";

import Link from "next/link";
import { ArrowLeft, Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="min-h-screen bg-obsidian text-slate-50">
      {/* Header */}
      <header className="border-b border-obsidian-600 bg-obsidian/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-50 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Slate360
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="outline" className="border-obsidian-600 text-slate-50 hover:bg-cyan-400/10">
                View Pricing
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-cyan text-obsidian hover:bg-cyan-500">
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
              <Button size="lg" className="bg-cyan text-obsidian hover:bg-cyan-500 px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-50 hover:bg-slate-800 px-8 py-3">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {page.features.map((feature, index) => (
            <Card key={index} className="bg-obsidian-800 border-obsidian-700 hover:bg-obsidian-700 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center mb-4">
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
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {page.pricing.starter && (
                <Card className="bg-obsidian-800 border-obsidian-700">
                  <CardHeader>
                    <CardTitle className="text-slate-50">Starter</CardTitle>
                    <div className="text-3xl font-bold text-cyan-400">${page.pricing.starter.price}<span className="text-lg text-slate-400">/month</span></div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {page.pricing.starter.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-400">
                          <Check className="h-4 w-4 text-cyan-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {page.pricing.pro && (
                <Card className="bg-obsidian-700 border-cyan-400 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-cyan-400 text-obsidian px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-slate-50">Professional</CardTitle>
                    <div className="text-3xl font-bold text-cyan-400">${page.pricing.pro.price}<span className="text-lg text-slate-400">/month</span></div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {page.pricing.pro.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-400">
                          <Check className="h-4 w-4 text-cyan-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {page.pricing.enterprise && (
                <Card className="bg-obsidian-800 border-obsidian-700">
                  <CardHeader>
                    <CardTitle className="text-slate-50">Enterprise</CardTitle>
                    <div className="text-3xl font-bold text-cyan-400">${page.pricing.enterprise.price}<span className="text-lg text-slate-400">/month</span></div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {page.pricing.enterprise.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-slate-400">
                          <Check className="h-4 w-4 text-cyan-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-obsidian-800 to-obsidian-900 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-50">Ready to Get Started?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Slate360 to streamline their workflows and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-cyan text-obsidian hover:bg-cyan-500 px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-50 hover:bg-slate-800 px-8 py-3">
                Compare Plans
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
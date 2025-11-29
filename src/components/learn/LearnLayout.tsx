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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Slate360
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="outline" className="border-border text-foreground hover:bg-accent">
                View Pricing
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Try Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Zap className="h-4 w-4" />
            {page.subtitle}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {page.title}
          </h1>
          {page.tiersHighlight && (
            <p className="mt-3 text-xs text-primary">
              Available in: {page.tiersHighlight.join(" • ")}
            </p>
          )}
          {page.tiersHighlight && (
            <p className="mt-3 text-xs text-primary">
              Available in: {page.tiersHighlight.join(" • ")}
            </p>
          )}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {page.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-accent px-8 py-3">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {page.features.map((feature, index) => (
            <Card key={index} className="bg-card/50 border-border/50 hover:bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Section */}
        {page.pricing && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Choose Your Plan</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <Card className="bg-card/50 border-border/50 hover:bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Creator</CardTitle>
                  <div className="text-3xl font-bold text-primary">${page.pricing?.starter?.price || 79}<span className="text-lg text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(page.pricing?.starter?.features || ["Project Hub", "Design Studio", "Content Studio", "360 Tour Builder"]).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-primary/50 hover:bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-2 backdrop-blur-sm relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 text-sm font-medium">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-foreground">Modeling</CardTitle>
                  <div className="text-3xl font-bold text-primary">${page.pricing?.pro?.price || 199}<span className="text-lg text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(page.pricing?.pro?.features || ["All Creator features", "Geospatial & Robotics", "Analytics & Reports"]).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 hover:bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">God Mode</CardTitle>
                  <div className="text-3xl font-bold text-primary">${page.pricing?.enterprise?.price || 499}<span className="text-lg text-muted-foreground">/month</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {(page.pricing?.enterprise?.features || ["All features", "Virtual Studio", "Athlete360", "White-label"]).map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border/50 hover:bg-card/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground">Enterprise</CardTitle>
                  <div className="text-3xl font-bold text-primary">Custom</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      All features included
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      Custom integrations
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      Dedicated support
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      White-label options
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-card/50 to-card/80 backdrop-blur-sm rounded-2xl p-12 border border-border/50">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Slate360 to streamline their workflows and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-accent px-8 py-3">
                Compare Plans
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
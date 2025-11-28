"use client";

import { useEffect, useState } from "react"
import { LIVE_PROJECTS } from "@/lib/data/ceo-uploads"
import { ProjectCard } from "@/components/features/project-hub/ProjectCard"
import { CreditTopUpModal } from "@/components/features/project-hub/CreditTopUpModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileBox } from "lucide-react";
import { Upload, FileBox } from "lucide-react";
import { useAuthStore } from "@/lib/stores/useAuthStore"

export default function DashboardPage() {
  const [data, setData] = useState<any | null>(null)
  const { tier, setTier, setEntitlements, setCreditsRemaining } = useAuthStore()

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then((d) => {
        setData(d)
        setTier(d.tier)
        setEntitlements(d.entitlements)
        setCreditsRemaining(d.usage.creditsRemaining)
      })
  }, [])

  if (!data) {
    return <div className="p-6 flex items-center justify-center h-64">
      <div className="text-slate-500 animate-pulse">Loading dashboard...</div>
    </div>
  }

  const activeProjects = data.projects.length


  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-slate-500">Welcome back. Here's what's happening with your projects.</p>
        </div>
        <CreditTopUpModal />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-500 mb-2">Active Projects</h3>
          <p className="text-3xl font-bold text-slate-900">{activeProjects}</p>
        </div>
        <div className="p-6 bg-white rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-500 mb-2">Storage</h3>
          <p className="text-3xl font-bold text-slate-900">{data.usage.storageUsed} GB</p>
          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{width: `${(data.usage.storageUsed / data.usage.storageLimit)*100}%`}} />
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-500 mb-2">Credits</h3>
          <p className="text-3xl font-bold text-slate-900">{data.usage.creditsRemaining}</p>
        </div>
        <div className="p-6 bg-white rounded-xl border shadow-sm">
          <h3 className="font-semibold text-slate-500 mb-2">Team</h3>
          <p className="text-3xl font-bold text-slate-900">{data.usage.teamMembers}</p>
        </div>
      </div>

      {/* Tier Banner */}
      {data.tier === 'free' && (
        <div className="bg-gradient-to-r from-orange-500/90 to-orange-600/90 backdrop-blur-sm text-white p-12 rounded-3xl text-center shadow-2xl border border-orange-400/30">
          <h2 className="text-4xl font-black mb-6 drop-shadow-lg">🚀 Upgrade to Creator</h2>
          <p className="text-xl mb-8 max-w-lg mx-auto leading-relaxed">Unlimited 360 tours, content exports, and team collaboration. Start creating pro content today.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-left max-w-2xl mx-auto">
            <div className="space-y-1">
              <div className="font-bold text-lg">✅ Unlimited Tours</div>
              <div className="text-sm opacity-90">Export for realtors</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-lg">✅ Social Exports</div>
              <div className="text-sm opacity-90">Instagram/Realtor.com</div>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-lg">$79/mo</div>
              <div className="text-sm opacity-90">Cancel anytime</div>
            </div>
          </div>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-slate-100 font-black px-12 py-6 text-xl shadow-2xl hover:shadow-3xl mx-auto">
            Start Free Trial
          </Button>
        </div>
      )}

      {/* Tier-Specific Dashboard */}
      {data.tier === 'free' ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300">
          <h2 className="text-3xl font-bold mb-4 text-slate-700">Limited Access</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">Upgrade to unlock full dashboard features, projects, analytics, and pro tools.</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-6 shadow-lg">
            Upgrade to Creator
          </Button>
        </div>
      ) : data.tier === 'creator' ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Content</h2>
          <p className="text-slate-500 mb-6">Recent tours and videos ready for social and realtor exports.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : data.tier === 'modeling' ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Models</h2>
          <p className="text-slate-500 mb-6">Recent designs, BIM models, and geospatial missions.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock model cards */}
            <div className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform"></div>
              <h3 className="font-bold mb-1">Site Plan v2</h3>
              <p className="text-sm text-slate-500 mb-3">Lightweight BIM</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Open</Button>
                <Button variant="ghost" size="sm"><Upload className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow cursor-pointer group opacity-60">
              <div className="h-32 bg-slate-200 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                <FileBox className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="font-bold mb-1">Mission Drone.glb</h3>
              <p className="text-sm text-slate-500 mb-3">Processing...</p>
              <Button variant="outline" size="sm" disabled className="flex-1">Open</Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">{data.tier === 'god' ? 'Contractor Activity' : 'Enterprise Dashboard'}</h2>
          <p className="text-slate-500 mb-6">RFIs, schedules, team activity, and admin insights.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {data.projects.slice(0,3).map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3">Open RFIs</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium">RFI #001 Drywall</span>
                  <Badge variant="destructive" className="px-3 py-1">Open</Badge>
                </div>
              </div>
            </div>
            <div className="p-6 bg-white rounded-xl border shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3">Upcoming Schedules</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="font-medium">Framing Inspection</span>
                  <span className="text-sm text-emerald-700 font-medium">Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

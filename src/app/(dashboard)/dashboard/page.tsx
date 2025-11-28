"use client";

import { useEffect, useState } from "react"
import { LIVE_PROJECTS } from "@/lib/data/ceo-uploads"
import { ProjectCard } from "@/components/features/project-hub/ProjectCard"
import { CreditTopUpModal } from "@/components/features/project-hub/CreditTopUpModal"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/stores/useAuthStore"

export default function DashboardPage() {
  const [data, setData] = useState<any | null>(null)
  const { setEntitlements, setCreditsRemaining } = useAuthStore()

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then((d) => {
        setData(d)
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
      {!data.entitlements?.includes('geospatial') && (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Creator Bundle</h3>
          <p className="text-lg mb-6">$79/mo — Unlock Geospatial & Design Studio</p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-slate-100 font-bold px-8">
            Upgrade Now
          </Button>
        </div>
      )}

      {/* Recent Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

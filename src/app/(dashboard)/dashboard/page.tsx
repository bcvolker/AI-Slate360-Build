"use client";

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LIVE_PROJECTS } from "@/lib/data/ceo-uploads"
import { ProjectCard } from "@/components/features/project-hub/ProjectCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileBox, Box, Layers, Video, FileText, Activity, Map, Zap, TrendingUp, BarChart3 } from "lucide-react";
import { useAuthStore } from "@/lib/stores/useAuthStore"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useCurrentProjectId, useSetCurrentProjectId } from "@/lib/hooks/useCurrentProject";
import { ProjectHubView } from "@/components/features/project-hub/ProjectHubView";
import { mockProjects } from "@/lib/mocks/projects";

function DashboardContent() {
  const [data, setData] = useState<any | null>({
    projects: [],
    usage: { creditsRemaining: 1250, creditsUsed: 250, storageUsed: 5 }
  })
  const { tier, entitlements, user, isLoading, _hasHydrated } = useAuthStore()
  const currentProjectId = useCurrentProjectId();
  const setCurrentProjectId = useSetCurrentProjectId();
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('my-account')
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectTool, setNewProjectTool] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])

    // Simulate upload progress
    files.forEach(file => {
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }))
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
        }
        setUploadProgress(prev => ({ ...prev, [file.name]: progress }))
      }, 200)
    })
  }

  const handleCreateProject = () => {
    // Simulate project creation
    if (!newProjectName || !newProjectTool) {
      alert("Add a name and choose a starting tool")
      return
    }
    alert(`Project "${newProjectName}" starting in ${newProjectTool} would be created here`)
    setNewProjectName("")
    setNewProjectTool("")
    setShowCreateProject(false)
  }

  useEffect(() => {
    const tab = searchParams.get('tab')
    
    if (tab) {
      // If a specific tab is requested, check entitlement
      if (tab !== 'my-account' && tab !== 'ceo' && entitlements && !entitlements[tab]) {
        // Not entitled? Fallback to first available tool or my-account
        const firstAvailable = Object.keys(entitlements).find(k => entitlements[k] === true)
        setActiveTab(firstAvailable || 'my-account')
      } else {
        setActiveTab(tab)
      }
    } else {
      // No tab requested? Default to first available tool (e.g. project-hub, content-studio)
      if (entitlements) {
        const firstAvailable = Object.keys(entitlements).find(k => entitlements[k] === true)
        setActiveTab(firstAvailable || 'my-account')
      } else {
        setActiveTab('my-account')
      }
    }
  }, [searchParams, entitlements])

  if (!_hasHydrated || isLoading) {
    return <div className="p-6 flex items-center justify-center h-64">
      <div className="text-slate-400 animate-pulse">Loading dashboard...</div>
    </div>
  }

  if (!user) {
    return <div className="p-6 flex items-center justify-center h-64">
      <div className="text-slate-400 animate-pulse">Redirecting to login...</div>
    </div>
  }

  if (!data) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-slate-500 animate-pulse">Loading dashboard...</div>
      </div>
    )
  }

  const currentProject =
    mockProjects.find((p) => p.id === currentProjectId) ?? mockProjects[0];

  const activeProjects = data.projects.length
  const isCEO = user?.email === 'ceo@slate360.com' // Placeholder for CEO check
  const hasAthleteAccess = entitlements['athlete360'] || isCEO

  return (
    <div className="bg-background text-foreground h-full flex flex-col max-h-screen overflow-hidden">
      <div className="space-y-4 p-6 pb-3 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back. You’re focused on{" "}
              <span className="font-medium text-foreground">
                {currentProject?.name}
              </span>
              .
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>
                Client: <span className="text-foreground">{currentProject.client}</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                Org:{" "}
                <span className="text-foreground">
                  {currentProject.organization} • {currentProject.region}
                </span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span>
                Phase: <span className="text-foreground">{currentProject.phase}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-stretch sm:items-end gap-3 min-w-[220px]">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Active project
            </div>
            <select
              className="w-full sm:w-60 bg-background border border-border text-sm rounded-md px-2 py-1.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/70"
              value={currentProject?.id ?? ""}
              onChange={(e) => setCurrentProjectId(e.target.value || null)}
            >
              {mockProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name} — {project.organization}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} className="w-full px-6 pb-4 flex-1 overflow-hidden">
        <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Start a new project</DialogTitle>
              <DialogDescription>
                Name your project and choose which Slate360 tool you want to start in.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 mt-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="new-project-name">
                  Project name
                </label>
                <Input
                  id="new-project-name"
                  placeholder="e.g. Downtown tower fit-out"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-medium text-muted-foreground">Start in</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewProjectTool("Project Hub")}
                    className={`rounded-lg border px-2.5 py-2 text-left text-[11px] transition-colors ${
                      newProjectTool === "Project Hub"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/70 bg-muted/40 hover:bg-muted/70"
                    }`}
                  >
                    <span className="block font-medium">Project Hub</span>
                    <span className="block text-[10px] text-muted-foreground">Core workspace</span>
                  </button>

                  {entitlements["design-studio"] && (
                    <button
                      type="button"
                      onClick={() => setNewProjectTool("Design Studio")}
                      className={`rounded-lg border px-2.5 py-2 text-left text-[11px] transition-colors ${
                        newProjectTool === "Design Studio"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/70 bg-muted/40 hover:bg-muted/70"
                      }`}
                    >
                      <span className="block font-medium">Design Studio</span>
                      <span className="block text-[10px] text-muted-foreground">3D modeling</span>
                    </button>
                  )}

                  {entitlements["content-studio"] && (
                    <button
                      type="button"
                      onClick={() => setNewProjectTool("Content Studio")}
                      className={`rounded-lg border px-2.5 py-2 text-left text-[11px] transition-colors ${
                        newProjectTool === "Content Studio"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/70 bg-muted/40 hover:bg-muted/70"
                      }`}
                    >
                      <span className="block font-medium">Content Studio</span>
                      <span className="block text-[10px] text-muted-foreground">Media workflows</span>
                    </button>
                  )}

                  {entitlements["360-tour-builder"] && (
                    <button
                      type="button"
                      onClick={() => setNewProjectTool("360 Tour Builder")}
                      className={`rounded-lg border px-2.5 py-2 text-left text-[11px] transition-colors ${
                        newProjectTool === "360 Tour Builder"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/70 bg-muted/40 hover:bg-muted/70"
                      }`}
                    >
                      <span className="block font-medium">360 Tour Builder</span>
                      <span className="block text-[10px] text-muted-foreground">Guided tours</span>
                    </button>
                  )}

                  {entitlements["geospatial-robotics"] && (
                    <button
                      type="button"
                      onClick={() => setNewProjectTool("Geospatial & Robotics")}
                      className={`rounded-lg border px-2.5 py-2 text-left text-[11px] transition-colors ${
                        newProjectTool === "Geospatial & Robotics"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/70 bg-muted/40 hover:bg-muted/70"
                      }`}
                    >
                      <span className="block font-medium">Geospatial & Robotics</span>
                      <span className="block text-[10px] text-muted-foreground">Maps & missions</span>
                    </button>
                  )}

                  {entitlements["virtual-studio"] && (
                    <button
                      type="button"
                      onClick={() => setNewProjectTool("Virtual Studio")}
                      className={`rounded-lg border px-2.5 py-2 text-left text-[11px] transition-colors ${
                        newProjectTool === "Virtual Studio"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/70 bg-muted/40 hover:bg-muted/70"
                      }`}
                    >
                      <span className="block font-medium">Virtual Studio</span>
                      <span className="block text-[10px] text-muted-foreground">VR walkthroughs</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 text-xs">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowCreateProject(false)
                    setNewProjectName("")
                    setNewProjectTool("")
                  }}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleCreateProject}>
                  Create project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {entitlements['project-hub'] && (
          <TabsContent value="project-hub" className="h-full overflow-hidden mt-0 pt-2">
            <ProjectHubView onNewProject={() => setShowCreateProject(true)} />
          </TabsContent>
        )}

        {entitlements['design-studio'] && (
          <TabsContent value="design-studio" className="mt-2">
            <div className="max-w-3xl rounded-xl border border-border/70 bg-card/70 p-4">
              <h2 className="text-lg font-semibold text-foreground mb-1">Design Studio</h2>
              <p className="text-sm text-muted-foreground mb-2">
                Interactive 3D design workspace. This view is being rebuilt for the new dashboard shell.
              </p>
              <p className="text-xs text-muted-foreground/80">
                You’ll see tools, canvas, and recent designs here once the new layout is in place.
              </p>
            </div>
          </TabsContent>
        )}

        {entitlements['content-studio'] && (
          <TabsContent value="content-studio" className="mt-2">
            <div className="max-w-3xl rounded-xl border border-border/70 bg-card/70 p-4">
              <h2 className="text-lg font-semibold text-foreground mb-1">Content Studio</h2>
              <p className="text-sm text-muted-foreground mb-2">
                AI-assisted video and media tools. This tab is parked while we finalize the new dashboard design.
              </p>
              <p className="text-xs text-muted-foreground/80">
                Expect a calm, single-screen layout with uploads, timelines, and export actions.
              </p>
            </div>
          </TabsContent>
        )}

        {entitlements['360-tour-builder'] && (
          <TabsContent value="360-tour-builder" className="mt-2">
            <div className="max-w-3xl rounded-xl border border-border/70 bg-card/70 p-4">
              <h2 className="text-lg font-semibold text-foreground mb-1">360 Tour Builder</h2>
              <p className="text-sm text-muted-foreground mb-2">
                Drag-and-drop tour creation. The final layout will keep a single-screen canvas with hotspots and scenes.
              </p>
              <p className="text-xs text-muted-foreground/80">
                Placeholder mode while the new non-scrolling tour builder view is designed.
              </p>
            </div>
          </TabsContent>
        )}

        {entitlements['geospatial-robotics'] && (
          <TabsContent value="geospatial-robotics" className="mt-2">
            <div className="max-w-3xl rounded-xl border border-border/70 bg-card/70 p-4">
              <h2 className="text-lg font-semibold text-foreground mb-1">Geospatial & Robotics</h2>
              <p className="text-sm text-muted-foreground mb-2">
                Mission planning, live maps, and asset tracking will live here in a compact control surface.
              </p>
              <p className="text-xs text-muted-foreground/80">
                For now this is a placeholder while we rebuild the experience.
              </p>
            </div>
          </TabsContent>
        )}

        {entitlements['virtual-studio'] && (
          <TabsContent value="virtual-studio" className="mt-2">
            <div className="max-w-3xl rounded-xl border border-border/70 bg-card/70 p-4">
              <h2 className="text-lg font-semibold text-foreground mb-1">Virtual Studio</h2>
              <p className="text-sm text-muted-foreground mb-2">
                VR walkthroughs and cinematic views. This tab will become a focused staging area for scenes and camera paths.
              </p>
              <p className="text-xs text-muted-foreground/80">
                Placeholder content to keep the dashboard lightweight while we design.
              </p>
            </div>
          </TabsContent>
        )}

        {entitlements['analytics-reports'] && (
          <TabsContent value="analytics-reports" className="mt-2">
            <div className="max-w-3xl rounded-xl border border-border/70 bg-card/70 p-4">
              <h2 className="text-lg font-semibold text-foreground mb-1">Analytics & Reports</h2>
              <p className="text-sm text-muted-foreground mb-2">
                High-level metrics and exportable reports. This will be a single-screen overview with drill-down options.
              </p>
              <p className="text-xs text-muted-foreground/80">
                We’re simplifying this area in preparation for the new reporting system.
              </p>
            </div>
          </TabsContent>
        )}

        <TabsContent value="my-account" className="mt-2">
          <div className="max-w-3xl rounded-xl border border-border/70 bg-card/70 p-4 space-y-3">
            <h2 className="text-lg font-semibold text-foreground">My Account</h2>
            <p className="text-sm text-muted-foreground">
              Account settings and theme controls will live here in a compact layout.
            </p>
            <p className="text-xs text-muted-foreground/80">
              You’re logged in as <span className="font-medium text-foreground">{user?.email}</span>. Theme and billing controls will be wired in next.
            </p>
          </div>
        </TabsContent>

        {isCEO && (
          <TabsContent value="ceo" className="space-y-4 mt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Business Overview */}
              <div className="space-y-6">
                <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-4">
                  <h2 className="text-xl font-semibold mb-4 text-slate-50">Business Overview</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-400/10 rounded-lg border border-green-400/30">
                      <p className="text-2xl font-bold text-green-400">$12,450</p>
                      <p className="text-sm text-green-300">Monthly Revenue</p>
                    </div>
                    <div className="text-center p-4 bg-blue-400/10 rounded-lg border border-blue-400/30">
                      <p className="text-2xl font-bold text-blue-400">247</p>
                      <p className="text-sm text-blue-300">Active Users</p>
                    </div>
                    <div className="text-center p-4 bg-purple-400/10 rounded-lg border border-purple-400/30">
                      <p className="text-2xl font-bold text-purple-400">89%</p>
                      <p className="text-sm text-purple-300">Retention Rate</p>
                    </div>
                    <div className="text-center p-4 bg-orange-400/10 rounded-lg border border-orange-400/30">
                      <p className="text-2xl font-bold text-orange-400">1,203</p>
                      <p className="text-sm text-orange-300">Credits Used</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-4">
                  <h2 className="text-xl font-semibold mb-4 text-slate-50">User Management</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                      <div>
                        <p className="font-medium text-slate-50">creator@slate360.com</p>
                        <p className="text-sm text-slate-400">Creator Tier - Active</p>
                      </div>
                      <Badge variant="outline" className="bg-cyan-400/10 text-cyan-400 border-cyan-400/50">Creator</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                      <div>
                        <p className="font-medium text-slate-50">modeling@slate360.com</p>
                        <p className="text-sm text-slate-400">Modeling Tier - Active</p>
                      </div>
                      <Badge variant="outline" className="bg-cyan-400/10 text-cyan-400 border-cyan-400/50">Modeling</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600/50">
                      <div>
                        <p className="font-medium text-slate-50">godmode@slate360.com</p>
                        <p className="text-sm text-slate-400">God Mode Tier - Active</p>
                      </div>
                      <Badge variant="outline" className="bg-cyan-400/10 text-cyan-400 border-cyan-400/50">God Mode</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-[0_4px_14px_0_rgba(0,245,255,0.3)]" variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    Manage All Users
                  </Button>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-4">
                  <h2 className="text-xl font-semibold mb-4 text-slate-50">System Controls</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">Creator Tier Price</label>
                      <div className="flex gap-2">
                        <input type="number" className="flex-1 p-2 border border-slate-600 rounded bg-slate-700/50 text-slate-50" defaultValue="79" />
                        <span className="p-2 bg-slate-600 rounded text-slate-300">USD/month</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">Modeling Tier Price</label>
                      <div className="flex gap-2">
                        <input type="number" className="flex-1 p-2 border border-slate-600 rounded bg-slate-700/50 text-slate-50" defaultValue="199" />
                        <span className="p-2 bg-slate-600 rounded text-slate-300">USD/month</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-slate-300">God Mode Tier Price</label>
                      <div className="flex gap-2">
                        <input type="number" className="flex-1 p-2 border border-slate-600 rounded bg-slate-700/50 text-slate-50" defaultValue="499" />
                        <span className="p-2 bg-slate-600 rounded text-slate-300">USD/month</span>
                      </div>
                    </div>
                    <Button className="w-full bg-cyan-500 text-slate-900 hover:bg-cyan-400 shadow-[0_4px_14px_0_rgba(0,245,255,0.3)]">
                      <FileText className="h-4 w-4 mr-2" />
                      Update Pricing
                    </Button>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm p-4">
                  <h2 className="text-xl font-semibold mb-4 text-slate-50">Content Management</h2>
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-600" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Homepage Content
                    </Button>
                    <Button className="w-full justify-start bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-600" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Manage Feature Descriptions
                    </Button>
                    <Button className="w-full justify-start bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-600" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics Dashboard
                    </Button>
                    <Button className="w-full justify-start bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-600" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Generate Revenue Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {hasAthleteAccess && (
          <TabsContent value="athlete360" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-slate-800/50 border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-slate-50">Athlete360 (Experimental)</h2>
                  <p className="text-slate-400 mb-6">
                    Advanced performance analytics for athletes and sports professionals.
                    Biomechanical analysis and movement tracking.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-400/10 rounded-lg flex items-center justify-center">
                        <Activity className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-50">Motion Analysis</h3>
                        <p className="text-sm text-slate-400">Biomechanical tracking</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-400/10 rounded-lg flex items-center justify-center">
                        <Video className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-50">Video Analysis</h3>
                        <p className="text-sm text-slate-400">Performance recording</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-400/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-50">Performance Metrics</h3>
                        <p className="text-sm text-slate-400">Data visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-6 flex items-center justify-center border border-slate-600/50">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚽</div>
                  <p className="text-lg font-semibold text-slate-50">Athlete Performance</p>
                  <p className="text-slate-400">Sports analytics (Beta)</p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 flex items-center justify-center h-64"><div className="text-slate-400 animate-pulse">Loading dashboard...</div></div>}>
      <DashboardContent />
    </Suspense>
  )
}
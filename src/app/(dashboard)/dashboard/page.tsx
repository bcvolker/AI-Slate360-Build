"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LIVE_PROJECTS } from "@/lib/data/ceo-uploads"
import { ProjectCard } from "@/components/features/project-hub/ProjectCard"
import { CreditTopUpModal } from "@/components/features/project-hub/CreditTopUpModal"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, FileBox, Box, Layers, Video, FileText, Activity, Map, Zap, TrendingUp, BarChart3 } from "lucide-react";
import { useAuthStore } from "@/lib/stores/useAuthStore"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [data, setData] = useState<any | null>(null)
  const { tier, entitlements, user } = useAuthStore()
  const router = useRouter()
  const [showCreateProject, setShowCreateProject] = useState(false)
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
    alert('Project creation functionality would be implemented here')
    setShowCreateProject(false)
  }

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    fetch('/api/dashboard')
      .then(r => r.json())
      .then((d) => {
        setData(d)
      })
  }, [user, router])

  if (!user) {
    return <div className="p-6 flex items-center justify-center h-64">
      <div className="text-slate-500 animate-pulse">Redirecting to login...</div>
    </div>
  }

  if (!data) {
    return <div className="p-6 flex items-center justify-center h-64">
      <div className="text-slate-500 animate-pulse">Loading dashboard...</div>
    </div>
  }

  const activeProjects = data.projects.length
  const isCEO = user?.email === 'ceo@slate360.com' // Placeholder for CEO check
  const hasAthleteAccess = entitlements['athlete360'] || isCEO

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-slate-500">Welcome back. Here's what's happening with your projects.</p>
        </div>
        <CreditTopUpModal />
      </div>

      <Tabs defaultValue="project-hub" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex h-12 items-center justify-start rounded-lg bg-slate-100 p-1 text-slate-500 w-max min-w-full">
            {entitlements['project-hub'] && <TabsTrigger value="project-hub" className="whitespace-nowrap">Project Hub</TabsTrigger>}
            {entitlements['design-studio'] && <TabsTrigger value="design-studio" className="whitespace-nowrap">Design Studio</TabsTrigger>}
            {entitlements['content-studio'] && <TabsTrigger value="content-studio" className="whitespace-nowrap">Content Studio</TabsTrigger>}
            {entitlements['360-tour-builder'] && <TabsTrigger value="360-tour-builder" className="whitespace-nowrap">360 Tour Builder</TabsTrigger>}
            {entitlements['geospatial-robotics'] && <TabsTrigger value="geospatial-robotics" className="whitespace-nowrap">Geospatial & Robotics</TabsTrigger>}
            {entitlements['virtual-studio'] && <TabsTrigger value="virtual-studio" className="whitespace-nowrap">Virtual Studio</TabsTrigger>}
            {entitlements['analytics-reports'] && <TabsTrigger value="analytics-reports" className="whitespace-nowrap">Analytics & Reports</TabsTrigger>}
            <TabsTrigger value="my-account" className="whitespace-nowrap">My Account</TabsTrigger>
            {isCEO && <TabsTrigger value="ceo" className="whitespace-nowrap">CEO</TabsTrigger>}
            {hasAthleteAccess && <TabsTrigger value="athlete360" className="whitespace-nowrap">Athlete360</TabsTrigger>}
          </TabsList>
        </div>

        {entitlements['project-hub'] && (
          <TabsContent value="project-hub" className="space-y-6 mt-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-xl border shadow-sm">
                <h3 className="font-semibold text-slate-500 mb-2">Active Projects</h3>
                <p className="text-3xl font-bold text-slate-900">{activeProjects}</p>
              </div>
              <div className="p-6 bg-white rounded-xl border shadow-sm">
                <h3 className="font-semibold text-slate-500 mb-2">Credits Remaining</h3>
                <p className="text-3xl font-bold text-slate-900">{data.usage.creditsRemaining}</p>
              </div>
              <div className="p-6 bg-white rounded-xl border shadow-sm">
                <h3 className="font-semibold text-slate-500 mb-2">Tier</h3>
                <Badge variant="outline" className="text-lg px-3 py-1">{tier}</Badge>
              </div>
              <div className="p-6 bg-white rounded-xl border shadow-sm">
                <h3 className="font-semibold text-slate-500 mb-2">Storage Used</h3>
                <p className="text-3xl font-bold text-slate-900">{data.usage.storageUsed}GB</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Files
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Upload CAD files, images, or documents to start a new project.
                </p>
                <input
                  type="file"
                  multiple
                  accept=".obj,.fbx,.gltf,.jpg,.png,.pdf,.dwg"
                  className="hidden"
                  id="file-upload"
                  onChange={handleFileUpload}
                />
                <label htmlFor="file-upload">
                  <Button className="w-full" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </label>
              </div>

              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <FileBox className="h-5 w-5" />
                  New Project
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  Create a new project from scratch with templates.
                </p>
                <Button className="w-full" onClick={() => setShowCreateProject(true)}>
                  <FileBox className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </div>

              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </h3>
                <p className="text-slate-600 text-sm mb-4">
                  View processing status and recent uploads.
                </p>
                <Button variant="outline" className="w-full">
                  <Activity className="h-4 w-4 mr-2" />
                  View Activity
                </Button>
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Projects</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Templates
                  </Button>
                  <Button size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LIVE_PROJECTS.map((project: any) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>

            {/* Processing Queue */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Processing Queue</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Processing 3D model: office-building.obj</span>
                  </div>
                  <span className="text-sm text-slate-500">45% complete</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Completed: site-survey.pdf</span>
                  </div>
                  <span className="text-sm text-slate-500">Ready for review</span>
                </div>
              </div>
            </div>

            {/* Recent Uploads */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {uploadProgress[file.name] < 100 ? (
                          <div className="w-20 bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[file.name] || 0}%` }}
                            ></div>
                          </div>
                        ) : (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                        <span className="text-sm text-slate-500">
                          {uploadProgress[file.name] === 100 ? 'Complete' : `${Math.round(uploadProgress[file.name] || 0)}%`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        )}

        {entitlements['design-studio'] && (
          <TabsContent value="design-studio" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tools Panel */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Design Tools</h2>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Box className="h-4 w-4 mr-2" />
                      Import Model
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Layers className="h-4 w-4 mr-2" />
                      Add Primitive
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileBox className="h-4 w-4 mr-2" />
                      Boolean Operations
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Activity className="h-4 w-4 mr-2" />
                      Measurements
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Materials</h2>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg cursor-pointer hover:ring-2 ring-blue-500"></div>
                    <div className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg cursor-pointer hover:ring-2 ring-blue-500"></div>
                    <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-lg cursor-pointer hover:ring-2 ring-blue-500"></div>
                    <div className="aspect-square bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg cursor-pointer hover:ring-2 ring-blue-500"></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Export</h2>
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      Export STL (3D Print)
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Export OBJ
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Export GLTF
                    </Button>
                  </div>
                </div>
              </div>

              {/* 3D Viewer */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">3D Workspace</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Box className="h-4 w-4 mr-2" />
                        Wireframe
                      </Button>
                      <Button variant="outline" size="sm">
                        <Activity className="h-4 w-4 mr-2" />
                        Render
                      </Button>
                    </div>
                  </div>

                  {/* 3D Canvas Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎨</div>
                      <p className="text-lg font-semibold text-slate-700">3D Design Canvas</p>
                      <p className="text-slate-500">Interactive 3D modeling workspace</p>
                      <p className="text-sm text-slate-400 mt-2">Drag & drop models or use tools to create</p>
                    </div>
                  </div>

                  {/* Model Properties */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">0</p>
                      <p className="text-sm text-slate-500">Vertices</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">0</p>
                      <p className="text-sm text-slate-500">Faces</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">0MB</p>
                      <p className="text-sm text-slate-500">File Size</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">--</p>
                      <p className="text-sm text-slate-500">Material</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {entitlements['content-studio'] && (
          <TabsContent value="content-studio" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Content Studio</h2>
                  <p className="text-slate-600 mb-6">
                    AI-powered content creation and editing tools for immersive experiences.
                    Create, edit, and enhance media content with professional tools.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Video className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Video Editor</h3>
                        <p className="text-sm text-slate-500">Professional video editing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Photo Editor</h3>
                        <p className="text-sm text-slate-500">Advanced image processing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">AI Enhancement</h3>
                        <p className="text-sm text-slate-500">Smart content improvement</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Media Library</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Files
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileBox className="h-4 w-4 mr-2" />
                      Create Project
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg font-semibold text-slate-700">Content Creation Suite</p>
                  <p className="text-slate-500">Professional media tools</p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {entitlements['360-tour-builder'] && (
          <TabsContent value="360-tour-builder" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">360° Tour Builder</h2>
                  <p className="text-slate-600 mb-6">
                    Create interactive 360-degree tours with drag-and-drop simplicity.
                    Build immersive virtual experiences for real estate, construction, and more.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <Video className="h-4 w-4 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Tour Editor</h3>
                        <p className="text-sm text-slate-500">Visual tour creation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <Map className="h-4 w-4 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Hotspots</h3>
                        <p className="text-sm text-slate-500">Interactive navigation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Export Options</h3>
                        <p className="text-sm text-slate-500">Multiple formats</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Tour Projects</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload 360° Images
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileBox className="h-4 w-4 mr-2" />
                      New Tour
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <p className="text-lg font-semibold text-slate-700">360° Tour Builder</p>
                  <p className="text-slate-500">Immersive virtual tours</p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {entitlements['geospatial-robotics'] && (
          <TabsContent value="geospatial-robotics" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Geospatial & Robotics</h2>
                  <p className="text-slate-600 mb-6">
                    Track assets, missions, and robotics on interactive maps with AI insights.
                    Manage drone operations, geospatial data, and robotic automation.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Map className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Live Maps</h3>
                        <p className="text-sm text-slate-500">Real-time asset tracking</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Drone Control</h3>
                        <p className="text-sm text-slate-500">Flight planning & monitoring</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Zap className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Robotics</h3>
                        <p className="text-sm text-slate-500">Automated systems</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Mission Control</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Geospatial Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileBox className="h-4 w-4 mr-2" />
                      Plan Mission
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-lg font-semibold text-slate-700">Geospatial Intelligence</p>
                  <p className="text-slate-500">Live asset & robotics tracking</p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {entitlements['virtual-studio'] && (
          <TabsContent value="virtual-studio" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Virtual Studio</h2>
                  <p className="text-slate-600 mb-6">
                    Immersive virtual reality experiences with haptic feedback.
                    Step inside your designs and sites in full VR.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Zap className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">VR Viewer</h3>
                        <p className="text-sm text-slate-500">Full immersion experience</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Haptic Feedback</h3>
                        <p className="text-sm text-slate-500">Tactile interactions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Video className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Multi-user Sessions</h3>
                        <p className="text-sm text-slate-500">Collaborative VR</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="font-semibold mb-4">VR Sessions</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload VR Content
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileBox className="h-4 w-4 mr-2" />
                      Start Session
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🥽</div>
                  <p className="text-lg font-semibold text-slate-700">Virtual Reality Studio</p>
                  <p className="text-slate-500">Immersive experiences</p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {entitlements['analytics-reports'] && (
          <TabsContent value="analytics-reports" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Reports & Analytics</h2>
                  <p className="text-slate-600 mb-6">
                    Comprehensive reporting and analytics for project performance and ROI.
                    Generate professional reports and analyze project data.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Report Builder</h3>
                        <p className="text-sm text-slate-500">Custom report templates</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Data Analytics</h3>
                        <p className="text-sm text-slate-500">Performance insights</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Export Options</h3>
                        <p className="text-sm text-slate-500">Professional formats</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h3 className="font-semibold mb-4">Report Templates</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Project Status Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      ROI Analysis
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Custom Report
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-lg font-semibold text-slate-700">Analytics Dashboard</p>
                  <p className="text-slate-500">Data-driven insights</p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        <TabsContent value="my-account" className="space-y-6 mt-6">
          <div className="max-w-2xl space-y-6">
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full p-2 border rounded" defaultValue={user?.email} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input type="text" className="w-full p-2 border rounded" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </div>
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Subscription</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current Plan:</span>
                  <Badge variant="outline">{tier}</Badge>
                </div>
                <Button variant="outline">Manage Subscription</Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {isCEO && (
          <TabsContent value="ceo" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Business Overview */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Business Overview</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">$12,450</p>
                      <p className="text-sm text-green-700">Monthly Revenue</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">247</p>
                      <p className="text-sm text-blue-700">Active Users</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">89%</p>
                      <p className="text-sm text-purple-700">Retention Rate</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">1,203</p>
                      <p className="text-sm text-orange-700">Credits Used</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">User Management</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium">creator@slate360.com</p>
                        <p className="text-sm text-slate-500">Creator Tier - Active</p>
                      </div>
                      <Badge variant="outline">Creator</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium">modeling@slate360.com</p>
                        <p className="text-sm text-slate-500">Modeling Tier - Active</p>
                      </div>
                      <Badge variant="outline">Modeling</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium">godmode@slate360.com</p>
                        <p className="text-sm text-slate-500">God Mode Tier - Active</p>
                      </div>
                      <Badge variant="outline">God Mode</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    Manage All Users
                  </Button>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">System Controls</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Creator Tier Price</label>
                      <div className="flex gap-2">
                        <input type="number" className="flex-1 p-2 border rounded" defaultValue="79" />
                        <span className="p-2 bg-slate-100 rounded">USD/month</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Modeling Tier Price</label>
                      <div className="flex gap-2">
                        <input type="number" className="flex-1 p-2 border rounded" defaultValue="199" />
                        <span className="p-2 bg-slate-100 rounded">USD/month</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">God Mode Tier Price</label>
                      <div className="flex gap-2">
                        <input type="number" className="flex-1 p-2 border rounded" defaultValue="499" />
                        <span className="p-2 bg-slate-100 rounded">USD/month</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Update Pricing
                    </Button>
                  </div>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Content Management</h2>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Homepage Content
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Manage Feature Descriptions
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics Dashboard
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
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
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Athlete360 (Experimental)</h2>
                  <p className="text-slate-600 mb-6">
                    Advanced performance analytics for athletes and sports professionals.
                    Biomechanical analysis and movement tracking.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Activity className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Motion Analysis</h3>
                        <p className="text-sm text-slate-500">Biomechanical tracking</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Video className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Video Analysis</h3>
                        <p className="text-sm text-slate-500">Performance recording</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Performance Metrics</h3>
                        <p className="text-sm text-slate-500">Data visualization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚽</div>
                  <p className="text-lg font-semibold text-slate-700">Athlete Performance</p>
                  <p className="text-slate-500">Sports analytics (Beta)</p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

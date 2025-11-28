"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGlobalStore } from "@/lib/stores/useGlobalStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Map, Box, Video, Activity, Settings, Share2, Calendar, MapPin } from "lucide-react";

// Mock Data (In a real app, fetch this based on ID)
const MOCK_PROJECT_DETAILS = {
  id: '1',
  name: 'Downtown Redevelopment',
  status: 'active',
  address: '123 Main St, Austin, TX',
  description: 'Comprehensive redevelopment plan for the downtown district including photogrammetry surveys and 3D architectural models.',
  created: 'Oct 15, 2023',
  stats: {
    missions: 12,
    models: 5,
    tours: 3
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { setActiveProjectId } = useGlobalStore();
  const projectId = params.projectId as string;

  // Set active project ID on mount
  useEffect(() => {
    if (projectId) {
      setActiveProjectId(projectId);
    }
    return () => setActiveProjectId(null); // Cleanup on unmount
  }, [projectId, setActiveProjectId]);

  // Mock Data Loading
  const project = MOCK_PROJECT_DETAILS; // In reality, find by projectId

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumb / Back */}
      <div className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer" onClick={() => router.push('/project-hub')}>
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Back to Projects</span>
      </div>

      {/* Project Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Active</Badge>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-500 text-sm">
            <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {project.address}
            </div>
            <div className="hidden sm:block text-slate-300">|</div>
            <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Created {project.created}
            </div>
          </div>
          <p className="text-slate-600 max-w-2xl mt-2">{project.description}</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" /> Settings
            </Button>
        </div>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Geospatial Card */}
        <Card className="hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group" onClick={() => router.push('/geospatial')}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Map className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">{project.stats.missions}</span>
                </div>
                <CardTitle className="text-lg">Geospatial</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Manage drone missions, orthomosaics, and LiDAR point clouds.</CardDescription>
            </CardContent>
        </Card>

        {/* Design Studio Card */}
        <Card className="hover:border-purple-500 hover:shadow-md transition-all cursor-pointer group" onClick={() => router.push('/design-studio')}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Box className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">{project.stats.models}</span>
                </div>
                <CardTitle className="text-lg">Design Studio</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Visualize and interact with 3D CAD/BIM models (GLB, IFC).</CardDescription>
            </CardContent>
        </Card>

        {/* Virtual Studio Card */}
        <Card className="hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group" onClick={() => router.push('/virtual-studio')}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Video className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">{project.stats.tours}</span>
                </div>
                <CardTitle className="text-lg">Virtual Studio</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Create immersive 360° virtual tours and walkthroughs.</CardDescription>
            </CardContent>
        </Card>

        {/* Athlete 360 Card */}
        <Card className="hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group" onClick={() => router.push('/athlete-360')}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                        <Activity className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-slate-900">-</span>
                </div>
                <CardTitle className="text-lg">Athlete 360</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Human performance analysis and biomechanics tracking.</CardDescription>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

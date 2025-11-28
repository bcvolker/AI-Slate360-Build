"use client";

import { Suspense } from "react";
import { useGlobalStore } from "@/lib/stores/useGlobalStore";
import LinkedTourFromQuery from "@/components/features/project-hub/LinkedTourFromQuery";
import { ProjectCard, Project } from "@/components/features/project-hub/ProjectCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter } from "lucide-react";

// Mock Data
const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Downtown Redevelopment', status: 'active', address: '123 Main St, Austin, TX', lastUpdated: '2h ago' },
  { id: '2', name: 'Riverfront Park', status: 'planning', address: '45 River Rd, Austin, TX', lastUpdated: '1d ago' },
  { id: '3', name: 'Tech Campus Phase 2', status: 'active', address: '800 Innovation Dr, Austin, TX', lastUpdated: '3d ago' },
  { id: '4', name: 'Westside Highway Survey', status: 'archived', address: 'Hwy 71, Westlake, TX', lastUpdated: '2w ago' },
  { id: '5', name: 'Skyline Tower Inspection', status: 'hold', address: '500 Congress Ave, Austin, TX', lastUpdated: '1mo ago' },
];

export default function ProjectHubPage() {
  const { activeProjectId } = useGlobalStore();

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Hub</h1>
          <p className="text-slate-500">Manage your organization's missions and assets.</p>
        </div>
        <Button className="w-full sm:w-auto gap-2">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Linked Tour Banner (Conditional) */}
      <Suspense fallback={null}>
        <LinkedTourFromQuery />
      </Suspense>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search projects..." className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
        {MOCK_PROJECTS.map((project) => {
            const isActive = project.id === activeProjectId;
            return (
                <div key={project.id} className={isActive ? "ring-2 ring-blue-500 ring-offset-2 rounded-lg" : ""}>
                    <ProjectCard project={project} />
                </div>
            );
        })}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/features/project-hub/ProjectCard";
import { LIVE_PROJECTS } from "@/lib/data/ceo-uploads";
import { mockProjects } from "@/lib/mocks/projects";
import { useCurrentProjectId } from "@/lib/hooks/useCurrentProject";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, ChevronLeft, Layers, Maximize2, ZoomIn, ZoomOut, MousePointer2, Clock, FileText, MessageSquare, User } from "lucide-react";

interface ProjectHubViewProps {
  onNewProject: () => void;
}

export function ProjectHubView({ onNewProject }: ProjectHubViewProps) {
  const [isRailCollapsed, setIsRailCollapsed] = useState(false);
  const currentProjectId = useCurrentProjectId();
  const currentProject = mockProjects.find((p) => p.id === currentProjectId) ?? mockProjects[0];

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {/* Top Section: Viewer + Project List */}
      <div className="flex-1 min-h-0 flex gap-4 transition-all duration-300 ease-in-out">
        {/* Main Viewer Area */}
        <div className="flex-1 bg-white border border-indigo-100 rounded-2xl p-1 flex flex-col gap-3 relative overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-md ring-1 ring-indigo-50">
          <div className="flex items-center justify-between gap-3 z-10 px-4 pt-3">
            <div>
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Current Project Viewer
              </h2>
              <p className="text-[11px] text-slate-500 pl-4">
                Interactive 3D / Map view for <span className="font-medium text-indigo-600">{currentProject.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] px-2.5 py-1 bg-indigo-50 text-indigo-700 border-indigo-100 font-semibold tracking-wide uppercase">
                {currentProject.phase}
                </Badge>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 md:hidden" 
                >
                    <Maximize2 className="h-3 w-3" />
                </Button>
            </div>
          </div>
          
          {/* Placeholder for actual 3D canvas */}
          <div className="flex-1 m-1 rounded-xl border border-indigo-50 bg-slate-50/50 bg-grid-pattern flex items-center justify-center relative overflow-hidden group-hover:border-indigo-100 transition-colors">
             {/* Floating Toolbar */}
             <div className="absolute top-4 right-4 flex flex-col gap-2 bg-white/90 backdrop-blur-md border border-indigo-100 p-1.5 rounded-xl shadow-lg shadow-indigo-500/5 z-20">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors">
                    <MousePointer2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors">
                    <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors">
                    <ZoomOut className="h-4 w-4" />
                </Button>
                <div className="h-px w-full bg-indigo-50 my-0.5"></div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors">
                    <Layers className="h-4 w-4" />
                </Button>
             </div>

             <div className="text-center px-6 z-10 bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-xl shadow-indigo-500/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-2">
                  {currentProject.organization}
                </p>
                <p className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">
                  {currentProject.name}
                </p>
                <div className="flex items-center justify-center gap-2">
                    <Badge className="bg-slate-900 text-white hover:bg-slate-800">3D Model</Badge>
                    <Badge variant="secondary" className="bg-white border border-slate-200">Map View</Badge>
                </div>
              </div>
          </div>
        </div>

        {/* Right Rail: Vertical Project Carousel */}
        <div 
            className={`
                flex-shrink-0 bg-white/40 border border-white/50 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out relative backdrop-blur-sm
                ${isRailCollapsed ? "w-14" : "w-80"}
            `}
        >
          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 left-3 z-30 h-8 w-8 bg-white shadow-md border border-indigo-50 rounded-full hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-all"
            onClick={() => setIsRailCollapsed(!isRailCollapsed)}
          >
            {isRailCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>

          {/* Header + System Status (Hidden when collapsed) */}
          <div className={`
            p-4 pb-3 border-b border-indigo-50/50 bg-transparent z-20 transition-opacity duration-200
            ${isRailCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}>
             <div className="flex items-center justify-between mb-3 pl-10"> 
                <div className="flex items-center gap-2 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">System Normal</span>
                </div>
             </div>
             <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-slate-700">Active Projects <span className="text-slate-400 font-normal ml-1">({LIVE_PROJECTS.length})</span></h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium"
                  onClick={onNewProject}
                >
                  + New
                </Button>
             </div>
          </div>

          {/* Vertical Scroll Area with Fade */}
          <div className="flex-1 relative min-h-0">
             {/* Collapsed State Indicator */}
             {isRailCollapsed && (
                <div className="absolute inset-0 flex flex-col items-center pt-16 gap-4">
                    <div className="h-full w-0.5 bg-indigo-100/50"></div>
                </div>
             )}

             {/* Expanded Content */}
             <div className={`absolute inset-0 transition-opacity duration-300 ${isRailCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                {/* Top Fade */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/40 to-transparent z-10 pointer-events-none"></div>
                
                <div className="absolute inset-0 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar">
                    {LIVE_PROJECTS.map((project: any) => (
                    <div key={project.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                        <ProjectCard project={project} />
                    </div>
                    ))}
                    {/* Spacer for bottom fade visibility */}
                    <div className="h-6"></div>
                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/60 to-transparent z-10 pointer-events-none"></div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Tabbed Panel */}
      <div className="h-36 flex-shrink-0 bg-white border border-indigo-100 rounded-2xl overflow-hidden flex flex-col shadow-sm ring-1 ring-indigo-50">
        <Tabs defaultValue="queue" className="flex-1 flex flex-col">
          <div className="border-b border-indigo-50 px-4 py-2.5 bg-slate-50/80 backdrop-blur-sm flex items-center justify-between">
            <TabsList className="h-9 bg-slate-200/50 p-1 rounded-xl inline-flex">
              <TabsTrigger 
                value="queue" 
                className="h-7 rounded-lg px-4 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all text-slate-500"
              >
                Processing Queue
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="h-7 rounded-lg px-4 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all text-slate-500"
              >
                Recent Activity
              </TabsTrigger>
              <TabsTrigger 
                value="usage" 
                className="h-7 rounded-lg px-4 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm transition-all text-slate-500"
              >
                Data Usage
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                <span>Real-time Updates</span>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            <TabsContent value="queue" className="mt-0 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="flex items-center justify-between text-xs bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50 hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                      <span className="font-medium text-slate-700">office-building.obj</span>
                    </div>
                    <span className="text-indigo-600 font-bold bg-white px-2 py-0.5 rounded-md shadow-sm border border-indigo-50">45%</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50 hover:border-emerald-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <span className="font-medium text-slate-700">site-survey.pdf</span>
                    </div>
                    <span className="text-emerald-600 font-bold bg-white px-2 py-0.5 rounded-md shadow-sm border border-emerald-50">Ready</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-0 h-full">
              <div className="space-y-3 pr-2">
                <div className="flex items-start gap-3 group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 border border-blue-100 shadow-sm">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs text-slate-800 font-semibold">Model Updated</p>
                    <p className="text-[11px] text-slate-500">
                      <span className="font-medium text-indigo-600">Sarah Jenkins</span> uploaded a new version of the lobby mesh.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap font-medium">2m ago</span>
                </div>

                <div className="flex items-start gap-3 group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 border border-amber-100 shadow-sm">
                    <MessageSquare className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs text-slate-800 font-semibold">New Comment</p>
                    <p className="text-[11px] text-slate-500">
                      "Can we check the ceiling height here?" on <span className="underline decoration-dotted decoration-slate-300 hover:decoration-indigo-400">Level 2 Plan</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap font-medium">15m ago</span>
                </div>

                <div className="flex items-start gap-3 group p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100 shadow-sm">
                    <FileText className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs text-slate-800 font-semibold">Export Completed</p>
                    <p className="text-[11px] text-slate-500">
                      High-res render package is ready for download.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap font-medium">1h ago</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="mt-0 h-full">
              <div className="flex items-center gap-8 h-full px-2">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Credits</span>
                        <span className="font-bold text-indigo-600">850 / 1000</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[85%] shadow-[0_0_10px_rgba(99,102,241,0.3)]"></div>
                    </div>
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Storage</span>
                        <span className="font-bold text-blue-600">45GB / 100GB</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 w-[45%] shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                    </div>
                </div>
                <Button size="sm" className="h-8 text-xs bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20 whitespace-nowrap px-4 rounded-lg">
                    Buy Credits
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

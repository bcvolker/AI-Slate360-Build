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
        <div className="flex-1 bg-slate-900 border border-white/10 rounded-2xl p-1 flex flex-col gap-3 relative overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-md ring-1 ring-white/5">
          <div className="flex items-center justify-between gap-3 z-10 px-4 pt-3">
            <div>
              <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Current Project Viewer
              </h2>
              <p className="text-[11px] text-slate-400 pl-4">
                Interactive 3D / Map view for <span className="font-medium text-blue-400">{currentProject.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] px-2.5 py-1 bg-blue-500/10 text-blue-400 border-blue-500/20 font-semibold tracking-wide uppercase">
                {currentProject.phase}
                </Badge>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 md:hidden text-slate-400 hover:text-white" 
                >
                    <Maximize2 className="h-3 w-3" />
                </Button>
            </div>
          </div>
          
          {/* Placeholder for actual 3D canvas */}
          <div className="flex-1 m-1 rounded-xl border border-white/5 bg-slate-950 flex items-center justify-center relative overflow-hidden group-hover:border-white/10 transition-colors">
             {/* Floating Toolbar */}
             <div className="absolute top-4 right-4 flex flex-col gap-2 bg-slate-900/90 backdrop-blur-md border border-white/10 p-1.5 rounded-xl shadow-lg shadow-black/20 z-20">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-colors">
                    <MousePointer2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-colors">
                    <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-colors">
                    <ZoomOut className="h-4 w-4" />
                </Button>
                <div className="h-px w-full bg-white/10 my-0.5"></div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-colors">
                    <Layers className="h-4 w-4" />
                </Button>
             </div>

             <div className="text-center px-6 z-10 bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl shadow-black/20">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-2">
                  {currentProject.organization}
                </p>
                <p className="text-3xl font-bold text-slate-100 mb-3 tracking-tight">
                  {currentProject.name}
                </p>
                <div className="flex items-center justify-center gap-2">
                    <Badge className="bg-white text-slate-900 hover:bg-slate-200">3D Model</Badge>
                    <Badge variant="secondary" className="bg-slate-800 border border-slate-700 text-slate-300">Map View</Badge>
                </div>
              </div>
          </div>
        </div>

        {/* Right Rail: Vertical Project Carousel */}
        <div 
            className={`
                flex-shrink-0 bg-slate-900 border border-white/10 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out relative
                ${isRailCollapsed ? "w-14" : "w-80"}
            `}
        >
          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 left-3 z-30 h-8 w-8 bg-slate-800 shadow-md border border-white/10 rounded-full hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            onClick={() => setIsRailCollapsed(!isRailCollapsed)}
          >
            {isRailCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>

          {/* Header + System Status (Hidden when collapsed) */}
          <div className={`
            p-4 pb-3 border-b border-white/5 bg-transparent z-20 transition-opacity duration-200
            ${isRailCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}>
             <div className="flex items-center justify-between mb-3 pl-10"> 
                <div className="flex items-center gap-2 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">System Normal</span>
                </div>
             </div>
             <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-slate-200">Active Projects <span className="text-slate-500 font-normal ml-1">({LIVE_PROJECTS.length})</span></h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-white/5 font-medium"
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
                    <div className="h-full w-0.5 bg-blue-100/50"></div>
                </div>
             )}

             {/* Expanded Content */}
             <div className={`absolute inset-0 transition-opacity duration-300 ${isRailCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                
                {/* Bottom Fade for Scroll Indication */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none z-10"></div>

                <div className="absolute inset-0 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar pb-20">
                    {LIVE_PROJECTS.map((project: any) => (
                    <div key={project.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                        <ProjectCard project={project} />
                    </div>
                    ))}
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Tabbed Panel */}
      <div className="h-36 flex-shrink-0 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-sm ring-1 ring-white/5">
        <Tabs defaultValue="queue" className="flex-1 flex flex-col">
          <div className="border-b border-white/5 px-4 py-2.5 bg-slate-900 backdrop-blur-sm flex items-center justify-between">
            <TabsList className="h-9 bg-slate-950 p-1 rounded-xl inline-flex">
              <TabsTrigger 
                value="queue" 
                className="h-7 rounded-lg px-4 text-xs font-semibold data-[state=active]:bg-slate-800 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm transition-all text-slate-500 hover:text-slate-300"
              >
                Processing Queue
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="h-7 rounded-lg px-4 text-xs font-semibold data-[state=active]:bg-slate-800 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm transition-all text-slate-500 hover:text-slate-300"
              >
                Recent Activity
              </TabsTrigger>
              <TabsTrigger 
                value="usage" 
                className="h-7 rounded-lg px-4 text-xs font-semibold data-[state=active]:bg-slate-800 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm transition-all text-slate-500 hover:text-slate-300"
              >
                Data Usage
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                <span>Real-time Updates</span>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            <TabsContent value="queue" className="mt-0 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                <div className="flex items-center justify-between text-xs bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.5)]"></div>
                      <span className="font-medium text-slate-300">office-building.obj</span>
                    </div>
                    <span className="text-blue-400 font-bold bg-slate-900 px-2 py-0.5 rounded-md shadow-sm border border-white/5">45%</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <span className="font-medium text-slate-300">site-survey.pdf</span>
                    </div>
                    <span className="text-emerald-400 font-bold bg-slate-900 px-2 py-0.5 rounded-md shadow-sm border border-white/5">Ready</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-0 h-full">
              <div className="space-y-3 pr-2">
                <div className="flex items-start gap-3 group p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20 shadow-sm">
                    <User className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs text-slate-200 font-semibold">Model Updated</p>
                    <p className="text-[11px] text-slate-500">
                      <span className="font-medium text-blue-400">Sarah Jenkins</span> uploaded a new version of the lobby mesh.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-600 whitespace-nowrap font-medium">2m ago</span>
                </div>

                <div className="flex items-start gap-3 group p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 border border-amber-500/20 shadow-sm">
                    <MessageSquare className="h-4 w-4 text-amber-400" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs text-slate-200 font-semibold">New Comment</p>
                    <p className="text-[11px] text-slate-500">
                      "Can we check the ceiling height here?" on <span className="underline decoration-dotted decoration-slate-600 hover:decoration-indigo-400">Level 2 Plan</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-600 whitespace-nowrap font-medium">15m ago</span>
                </div>

                <div className="flex items-start gap-3 group p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="mt-0.5 h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 border border-purple-500/20 shadow-sm">
                    <FileText className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs text-slate-200 font-semibold">Export Completed</p>
                    <p className="text-[11px] text-slate-500">
                      High-res render package is ready for download.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-600 whitespace-nowrap font-medium">1h ago</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usage" className="mt-0 h-full">
              <div className="flex items-center gap-8 h-full px-2">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Credits</span>
                        <span className="font-bold text-blue-400">850 / 1000</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[85%] shadow-[0_0_10px_rgba(99,102,241,0.3)]"></div>
                    </div>
                </div>
                <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Storage</span>
                        <span className="font-bold text-blue-400">45GB / 100GB</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 w-[45%] shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
                    </div>
                </div>
                <Button size="sm" className="h-8 text-xs bg-white text-slate-900 hover:bg-slate-200 shadow-lg shadow-black/20 whitespace-nowrap px-4 rounded-lg">
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

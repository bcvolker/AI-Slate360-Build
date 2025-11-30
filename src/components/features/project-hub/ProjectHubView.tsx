import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/features/project-hub/ProjectCard";
import { LIVE_PROJECTS } from "@/lib/data/ceo-uploads";
import { mockProjects } from "@/lib/mocks/projects";
import { useCurrentProjectId } from "@/lib/hooks/useCurrentProject";

interface ProjectHubViewProps {
  onNewProject: () => void;
}

export function ProjectHubView({ onNewProject }: ProjectHubViewProps) {
  const currentProjectId = useCurrentProjectId();
  const currentProject = mockProjects.find((p) => p.id === currentProjectId) ?? mockProjects[0];

  return (
    <div className="h-full flex flex-col gap-4 overflow-hidden">
      {/* Top Section: Viewer + Project List */}
      <div className="flex-1 min-h-0 flex gap-4">
        {/* Main Viewer Area */}
        <div className="flex-1 bg-card/70 border border-border/80 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden group">
          <div className="flex items-center justify-between gap-3 z-10">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Current project viewer</h2>
              <p className="text-[11px] text-muted-foreground">
                Interactive 3D / Map view for {currentProject.name}
              </p>
            </div>
            <Badge variant="outline" className="text-[11px] px-2 py-0.5">
              {currentProject.phase}
            </Badge>
          </div>
          
          {/* Placeholder for actual 3D canvas */}
          <div className="absolute inset-0 top-16 m-4 rounded-lg border border-dashed border-border/70 bg-muted/20 flex items-center justify-center">
             <div className="text-center px-6">
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  {currentProject.organization}
                </p>
                <p className="text-2xl font-semibold text-foreground mb-2">
                  {currentProject.name}
                </p>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  [Interactive 3D Canvas Placeholder]
                </p>
              </div>
          </div>
        </div>

        {/* Right Rail: Vertical Project Carousel */}
        <div className="w-80 flex-shrink-0 bg-card/70 border border-border/80 rounded-xl p-0 flex flex-col overflow-hidden">
          {/* Header + System Status */}
          <div className="p-3 pb-2 border-b border-border/50 bg-card/50 backdrop-blur-sm z-20">
             <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-medium text-emerald-500 uppercase tracking-wider">System Normal</span>
                </div>
             </div>
             <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-foreground">Active Projects ({LIVE_PROJECTS.length})</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-[10px] text-primary hover:text-primary/80 hover:bg-primary/10"
                  onClick={onNewProject}
                >
                  + New Project
                </Button>
             </div>
          </div>

          {/* Vertical Scroll Area with Fade */}
          <div className="flex-1 relative min-h-0 bg-muted/10">
             {/* Top Fade */}
             <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background/80 to-transparent z-10 pointer-events-none"></div>
             
             <div className="absolute inset-0 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
                {LIVE_PROJECTS.map((project: any) => (
                  <div key={project.id} className="transform transition-all duration-300 hover:scale-[1.02]">
                    <ProjectCard project={project} />
                  </div>
                ))}
                {/* Spacer for bottom fade visibility */}
                <div className="h-4"></div>
             </div>

             {/* Bottom Fade */}
             <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/90 to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Quick Stats / Uploads (Collapsed/Compact) */}
      <div className="h-32 flex-shrink-0 grid grid-cols-3 gap-4">
         <div className="bg-card/70 border border-border/80 rounded-xl p-3">
            <h3 className="text-xs font-semibold text-foreground mb-2">Processing Queue</h3>
            <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] bg-muted/40 p-1.5 rounded border border-border/50">
                    <span>office-building.obj</span>
                    <span className="text-primary">Processing...</span>
                </div>
                <div className="flex items-center justify-between text-[10px] bg-muted/40 p-1.5 rounded border border-border/50">
                    <span>site-survey.pdf</span>
                    <span className="text-emerald-500">Ready</span>
                </div>
            </div>
         </div>
         <div className="bg-card/70 border border-border/80 rounded-xl p-3">
            <h3 className="text-xs font-semibold text-foreground mb-2">Recent Activity</h3>
            <div className="text-[10px] text-muted-foreground space-y-1">
                <p>• User X updated the model</p>
                <p>• New comment on "Lobby"</p>
                <p>• Export completed</p>
            </div>
         </div>
         <div className="bg-card/70 border border-border/80 rounded-xl p-3 flex flex-col justify-between">
            <div>
                <h3 className="text-xs font-semibold text-foreground mb-2">Data Usage</h3>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">Credits</span>
                        <span className="font-medium text-foreground">850 / 1000</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[85%]"></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground">Storage</span>
                        <span className="font-medium text-foreground">45GB / 100GB</span>
                    </div>
                </div>
            </div>
            <Button size="sm" variant="outline" className="w-full h-7 text-[10px] mt-1 border-primary/20 hover:bg-primary/5 text-primary">
                Buy Credits
            </Button>
         </div>
      </div>
    </div>
  );
}

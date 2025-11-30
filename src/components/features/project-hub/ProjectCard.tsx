import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'planning' | 'archived' | 'hold';
  address: string;
  lastUpdated: string;
  thumbnail?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    planning: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    archived: "bg-slate-100 text-slate-800 hover:bg-slate-100",
    hold: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="h-32 bg-muted/30 relative border-b border-border/50">
        {/* Placeholder for Project Thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
            <MapPin className="h-8 w-8" />
        </div>
        <div className="absolute top-3 right-3">
             <Badge variant="secondary" className="bg-background/80 backdrop-blur-md border-border/50 text-xs font-medium">
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
             </Badge>
        </div>
      </div>
      <CardHeader className="pb-2 pt-3">
        <CardTitle className="text-base font-semibold truncate text-foreground">{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center text-xs text-muted-foreground mb-1.5">
          <MapPin className="h-3 w-3 mr-1.5 opacity-70" />
          <span className="truncate">{project.address}</span>
        </div>
        <div className="flex items-center text-[10px] text-muted-foreground/70">
          <Calendar className="h-3 w-3 mr-1.5 opacity-70" />
          <span>Updated {project.lastUpdated}</span>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
            <MoreHorizontal className="h-4 w-4" />
        </Button>
        <Link href={`/project-hub/${project.id}`}>
            <Button size="sm" variant="secondary" className="h-7 text-xs gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 border-transparent">
            Open <ArrowRight className="h-3 w-3" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

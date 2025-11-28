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
    <Card className="overflow-hidden hover:shadow-md transition-shadow group">
      <div className="h-32 bg-slate-200 relative">
        {/* Placeholder for Project Thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <MapPin className="h-8 w-8 opacity-20" />
        </div>
        <div className="absolute top-3 right-3">
             <Badge className={statusColors[project.status] || "bg-slate-100"}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
             </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold truncate">{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center text-sm text-slate-500 mb-2">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">{project.address}</span>
        </div>
        <div className="flex items-center text-xs text-slate-400">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Updated {project.lastUpdated}</span>
        </div>
      </CardContent>
      <CardFooter className="bg-slate-50 p-3 flex justify-between items-center">
        <Button variant="ghost" size="sm" className="text-slate-500">
            <MoreHorizontal className="h-4 w-4" />
        </Button>
        <Link href={`/project-hub/${project.id}`}>
            <Button size="sm" className="gap-2">
            Open <ArrowRight className="h-3 w-3" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

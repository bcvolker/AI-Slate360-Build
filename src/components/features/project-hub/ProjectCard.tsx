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
    active: "bg-emerald-500",
    planning: "bg-blue-500",
    archived: "bg-slate-500",
    hold: "bg-amber-500",
  };

  const statusBadgeVariants = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    planning: "bg-blue-50 text-blue-700 border-blue-200",
    archived: "bg-slate-50 text-slate-700 border-slate-200",
    hold: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-indigo-100 bg-white shadow-sm hover:-translate-y-1 relative pl-1">
      {/* Status Indicator Strip */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${statusColors[project.status]} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
      
      <div className="h-28 bg-slate-50 relative border-b border-indigo-50 overflow-hidden">
        {/* Placeholder for Project Thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform duration-500">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <MapPin className="h-8 w-8 relative z-10 text-indigo-200 group-hover:text-indigo-400 transition-colors" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-2 right-2">
             <Badge variant="outline" className={`backdrop-blur-md text-[10px] font-semibold shadow-sm uppercase tracking-wide ${statusBadgeVariants[project.status]}`}>
                {project.status}
             </Badge>
        </div>
      </div>
      <CardHeader className="pb-2 pt-3 px-4">
        <CardTitle className="text-sm font-bold truncate text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-3 px-4">
        <div className="flex items-center text-[11px] text-slate-500 mb-1.5">
          <MapPin className="h-3 w-3 mr-1.5 text-indigo-400" />
          <span className="truncate">{project.address}</span>
        </div>
        <div className="flex items-center text-[10px] text-slate-400">
          <Calendar className="h-3 w-3 mr-1.5 text-indigo-300" />
          <span>Updated {project.lastUpdated}</span>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 px-4 flex justify-between items-center">
        <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
            <MoreHorizontal className="h-3.5 w-3.5" />
        </Button>
        <Link href={`/project-hub/${project.id}`}>
            <Button size="sm" variant="ghost" className="h-7 text-[10px] gap-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 font-semibold px-3 rounded-full">
            Open <ArrowRight className="h-3 w-3" />
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

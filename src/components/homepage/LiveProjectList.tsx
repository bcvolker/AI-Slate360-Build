"use client";

import { LIVE_PROJECTS } from "@/lib/data/ceo-uploads";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function LiveProjectList() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {LIVE_PROJECTS.map((project) => (
        <Card key={project.id} className="overflow-hidden border-none shadow-lg bg-white/90 backdrop-blur">
          <div className="flex items-center gap-4 p-2">
            <div className="h-16 w-24 relative rounded-md overflow-hidden shrink-0">
              <Image 
                src={project.thumbnail} 
                alt={project.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate text-slate-900">{project.name}</h4>
              <Badge variant={project.status === 'active' ? 'default' : 'secondary'} className="mt-1 text-xs">
                {project.status}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

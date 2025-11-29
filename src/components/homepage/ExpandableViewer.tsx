"use client";

import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ExpandableViewerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ExpandableViewer({ children, className }: ExpandableViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "relative transition-all duration-500 ease-in-out overflow-hidden group",
        isExpanded ? "fixed inset-0 z-50 h-screen w-screen" : "w-full h-full min-h-[50vh]",
        "bg-black",
        className
      )}
    >
      {/* Viewer Content */}
      <div className="w-full h-full">
        {children}
      </div>

      {/* Expand/Collapse Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
      </Button>

      {/* Overlay hint (only when not expanded) */}
      {!isExpanded && (
        <div 
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        >
            <span className="text-white/80 text-sm font-medium tracking-widest uppercase bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                Expand
            </span>
        </div>
      )}
    </div>
  );
}

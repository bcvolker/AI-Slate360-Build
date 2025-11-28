"use client";

import { Button } from "@/components/ui/button";
import { useDesignStore } from "@/lib/stores/useDesignStore";
import { Layers, MousePointer2 } from "lucide-react";

export default function DesignToolbar() {
  const { xRayValue, setXRayValue, isEditMode, toggleEditMode } = useDesignStore();

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border rounded-lg shadow-sm">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium flex items-center gap-2">
            <Layers className="h-4 w-4" /> X-Ray Comparison
          </label>
          <span className="text-xs text-slate-500">{Math.round(xRayValue * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={xRayValue}
          onChange={(e) => setXRayValue(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex gap-2">
        <Button 
          variant={isEditMode ? "default" : "outline"} 
          size="sm" 
          onClick={toggleEditMode}
          className="flex-1 gap-2"
        >
          <MousePointer2 className="h-4 w-4" />
          {isEditMode ? "Editing" : "View Mode"}
        </Button>
      </div>
    </div>
  );
}

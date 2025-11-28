"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useState } from "react";

export default function CostEstimator() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <Calculator className="h-4 w-4" /> Estimate Processing
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Processing Cost Estimator</DialogTitle>
          <DialogDescription>
            Estimate the cloud credit cost for high-resolution rendering.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="flex justify-between items-center border-b pb-2">
                <span>Standard Render (1080p)</span>
                <span className="font-mono">5 Credits</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
                <span>High-Res Render (4K)</span>
                <span className="font-mono">12 Credits</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
                <span>LiDAR Processing (per GB)</span>
                <span className="font-mono">25 Credits</span>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-md mt-4">
                <p className="text-sm text-slate-600">Current Balance: <span className="font-bold text-slate-900">1,250 Credits</span></p>
            </div>
        </div>
        <div className="flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

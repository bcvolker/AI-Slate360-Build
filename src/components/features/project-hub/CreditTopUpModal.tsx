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
import { CreditCard, Plus } from "lucide-react";

export function CreditTopUpModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 hidden md:flex">
          <CreditCard className="h-4 w-4 text-blue-600" />
          <span className="font-semibold text-blue-900">1,250 Credits</span>
          <Plus className="h-3 w-3 text-slate-400" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Top Up Credits</DialogTitle>
          <DialogDescription>
            You have 1,250 credits remaining. Purchase more to continue processing high-resolution geospatial data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="p-4 border rounded-lg bg-slate-50 text-center">
                <p className="text-sm text-slate-500">Stripe Integration Stub</p>
                <Button className="mt-2 w-full">Purchase 5,000 Credits ($50)</Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

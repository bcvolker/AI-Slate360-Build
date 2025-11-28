"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LinkedTourFromQuery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tourId = searchParams.get("tourId");

  if (!tourId) return null;

  return (
    <div className="mb-6 animate-in slide-in-from-top-2">
      <Alert className="bg-blue-50 border-blue-200 text-blue-900">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800 font-semibold">Linked Tour Detected</AlertTitle>
        <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
          <p>
            You are viewing a direct link to Virtual Tour <strong>#{tourId}</strong>.
            This tour is part of the current project context.
          </p>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-white text-blue-700 border-blue-300 hover:bg-blue-100 whitespace-nowrap"
            onClick={() => router.push(`/virtual-studio?tourId=${tourId}`)}
          >
            Open in Virtual Studio <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

import { NextResponse } from 'next/server'
import { LIVE_PROJECTS } from "@/lib/data/ceo-uploads"

export async function GET() {
  return NextResponse.json({
    projects: LIVE_PROJECTS.slice(0,3),
    usage: {
      storageUsed: 450,
      storageLimit: 1000,
      creditsRemaining: 1250,
      teamMembers: 8
    },
    entitlements: ['project-hub', 'design-studio', 'geospatial', 'virtual-studio', 'athlete-360']
  })
}

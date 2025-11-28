import { NextResponse } from 'next/server'
import { LIVE_PROJECTS } from "@/lib/data/ceo-uploads"

export async function GET() {
  const tier: string = 'enterprise' // In real app, get from auth

  const entitlements: Record<string, boolean> = {
    'project-hub': true,
    'my-account': true,
  }

  if (tier === 'creator' || tier === 'modeling' || tier === 'god' || tier === 'enterprise') {
    entitlements['content-studio'] = true
    entitlements['360-tour-builder'] = true
  }

  if (tier === 'modeling' || tier === 'god' || tier === 'enterprise') {
    entitlements['design-studio'] = true
    entitlements['geospatial-robotics'] = true
  }

  if (tier === 'god' || tier === 'enterprise') {
    entitlements['virtual-studio'] = true
    entitlements['analytics-reports'] = true
  }

  if (tier === 'enterprise') {
    entitlements['athlete360'] = true
  }

  return NextResponse.json({
    tier,
    projects: LIVE_PROJECTS.slice(0,3),
    usage: {
      storageUsed: 450,
      storageLimit: 1000,
      creditsRemaining: 1250,
      teamMembers: 8
    },
    entitlements
  })
}

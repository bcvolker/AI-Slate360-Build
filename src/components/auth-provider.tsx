"use client"

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/stores/useAuthStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setIsLoading } = useAuthStore()

  useEffect(() => {
    // Initialize auth state - for demo mode, we just set loading to false
    // In a real app, this would check for existing sessions
    setIsLoading(false)
  }, [setIsLoading])

  return <>{children}</>
}
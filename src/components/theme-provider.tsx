"use client"

import { useEffect } from 'react'
import { useThemeStore } from '@/lib/stores/useThemeStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { updateResolvedTheme } = useThemeStore()

  useEffect(() => {
    updateResolvedTheme()
  }, [updateResolvedTheme])

  return <>{children}</>
}
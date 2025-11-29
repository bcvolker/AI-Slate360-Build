"use client"

import { useEffect } from 'react'
import { useThemeStore } from '@/lib/stores/useThemeStore'

// Theme color definitions
const themes = {
  light: {
    '--background': '210 40% 98%',
    '--foreground': '222 84% 5%',
    '--card': '0 0% 100%',
    '--card-foreground': '222 84% 5%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '222 84% 5%',
    '--primary': '188 95% 37%',
    '--primary-foreground': '180 100% 97%',
    '--secondary': '210 40% 96%',
    '--secondary-foreground': '222 84% 5%',
    '--muted': '210 40% 96%',
    '--muted-foreground': '215 16% 47%',
    '--accent': '210 40% 96%',
    '--accent-foreground': '222 84% 5%',
    '--destructive': '0 84% 60%',
    '--destructive-foreground': '0 62% 30%',
    '--border': '214 32% 91%',
    '--input': '214 32% 91%',
    '--ring': '188 95% 37%',
  },
  dark: {
    '--background': '215 28% 7%',
    '--foreground': '210 40% 96%',
    '--card': '215 28% 17%',
    '--card-foreground': '210 40% 96%',
    '--popover': '215 28% 17%',
    '--popover-foreground': '210 40% 96%',
    '--primary': '188 95% 43%',
    '--primary-foreground': '222 84% 5%',
    '--secondary': '215 28% 27%',
    '--secondary-foreground': '210 40% 96%',
    '--muted': '215 28% 27%',
    '--muted-foreground': '217 19% 65%',
    '--accent': '215 28% 27%',
    '--accent-foreground': '210 40% 96%',
    '--destructive': '0 84% 60%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '215 28% 27%',
    '--input': '215 28% 27%',
    '--ring': '188 95% 43%',
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, updateResolvedTheme, _hasHydrated } = useThemeStore()

  useEffect(() => {
    updateResolvedTheme()
  }, [updateResolvedTheme])

  // Apply theme CSS variables only after hydration to prevent SSR mismatches
  useEffect(() => {
    if (_hasHydrated && typeof window !== 'undefined') {
      const root = document.documentElement
      const themeVars = themes[resolvedTheme as keyof typeof themes] || themes.light

      Object.entries(themeVars).forEach(([property, value]) => {
        root.style.setProperty(property, value)
      })
    }
  }, [resolvedTheme, _hasHydrated])

  return <>{children}</>
}
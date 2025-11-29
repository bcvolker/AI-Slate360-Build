"use client"

import { useEffect } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useThemeStore } from '@/lib/stores/useThemeStore'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme, updateResolvedTheme } = useThemeStore()

  useEffect(() => {
    updateResolvedTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        updateResolvedTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, updateResolvedTheme])

  const cycleTheme = () => {
    const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />
      case 'dark':
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={cycleTheme}
      className="w-full justify-start"
    >
      {getIcon()}
      <span className="ml-2 capitalize">{theme}</span>
    </Button>
  )
}
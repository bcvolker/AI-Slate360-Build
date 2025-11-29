"use client"

import { useEffect } from 'react'
import { useThemeStore } from '@/lib/stores/useThemeStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { updateResolvedTheme } = useThemeStore()

  useEffect(() => {
    updateResolvedTheme()
  }, [updateResolvedTheme])

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              const theme = localStorage.getItem('theme-storage');
              const parsed = theme ? JSON.parse(theme) : null;
              const userTheme = parsed?.state?.theme || 'system';
              const resolved = userTheme === 'system'
                ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                : userTheme;
              document.documentElement.classList.add(resolved);
            } catch (e) {
              document.documentElement.classList.add('light');
            }
          `,
        }}
      />
      {children}
    </>
  )
}
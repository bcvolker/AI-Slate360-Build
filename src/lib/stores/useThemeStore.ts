import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  updateResolvedTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      setTheme: (theme: Theme) => {
        set({ theme })
        get().updateResolvedTheme()
      },
      resolvedTheme: 'light',
      updateResolvedTheme: () => {
        const { theme } = get()
        const resolved = theme === 'system'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme
        set({ resolvedTheme: resolved })

        // Apply theme to document
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(resolved)
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.updateResolvedTheme()
        }
      },
    }
  )
)
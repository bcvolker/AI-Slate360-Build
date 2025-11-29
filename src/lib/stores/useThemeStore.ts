import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  updateResolvedTheme: () => void
  _hasHydrated: boolean
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
        const { theme, _hasHydrated } = get()
        if (!_hasHydrated) return

        const resolved = theme === 'system'
          ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme
        set({ resolvedTheme: resolved })

        // Don't apply theme classes here - let the ThemeProvider handle it
      },
      _hasHydrated: false,
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true
          // Delay theme application to prevent hydration mismatch
          setTimeout(() => {
            state.updateResolvedTheme()
          }, 0)
        }
      },
    }
  )
)
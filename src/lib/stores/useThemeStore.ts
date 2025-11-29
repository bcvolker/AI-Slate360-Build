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
        const resolved = theme === 'system'
          ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme
        set({ resolvedTheme: resolved })

        // Only apply theme to document if we've hydrated (to avoid hydration mismatch)
        if (typeof window !== 'undefined' && _hasHydrated) {
          const root = document.documentElement
          root.classList.remove('light', 'dark')
          root.classList.add(resolved)
        }
      },
      _hasHydrated: false,
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._hasHydrated = true
          state.updateResolvedTheme()
        }
      },
    }
  )
)
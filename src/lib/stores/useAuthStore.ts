import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  entitlements: Record<string, boolean>
  setEntitlements: (entitlements: Record<string, boolean>) => void
  tier: string
  setTier: (tier: string) => void
  creditsRemaining: number
  setCreditsRemaining: (creditsRemaining: number) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
      entitlements: {},
      setEntitlements: (entitlements) => set({ entitlements }),
      tier: 'free',
      setTier: (tier) => set({ tier }),
      creditsRemaining: 1250,
      setCreditsRemaining: (creditsRemaining) => set({ creditsRemaining }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        entitlements: state.entitlements,
        tier: state.tier,
        creditsRemaining: state.creditsRemaining,
      }),
    }
  )
)

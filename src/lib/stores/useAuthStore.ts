import { create } from 'zustand'
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

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  entitlements: {},
  setEntitlements: (entitlements) => set({ entitlements }),
  tier: 'free',
  setTier: (tier) => set({ tier }),
  creditsRemaining: 1250,
  setCreditsRemaining: (creditsRemaining) => set({ creditsRemaining }),
}))

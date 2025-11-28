import { create } from 'zustand'
import { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  entitlements: string[]
  setEntitlements: (entitlements: string[]) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  entitlements: [],
  setEntitlements: (entitlements) => set({ entitlements }),
}))

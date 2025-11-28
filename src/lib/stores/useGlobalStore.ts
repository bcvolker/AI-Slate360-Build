import { create } from 'zustand'

interface GlobalState {
  activeProjectId: string | null
  setActiveProjectId: (id: string | null) => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
  activeProjectId: null,
  setActiveProjectId: (id) => set({ activeProjectId: id }),
}))

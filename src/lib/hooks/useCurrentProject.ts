"use client";

import { create } from "zustand";

type CurrentProjectState = {
  currentProjectId: string | null;
  setCurrentProjectId: (id: string | null) => void;
};

export const useCurrentProjectStore = create<CurrentProjectState>((set) => ({
  currentProjectId: null,
  setCurrentProjectId: (id) => set({ currentProjectId: id }),
}));

export function useCurrentProjectId() {
  return useCurrentProjectStore((s) => s.currentProjectId);
}

export function useSetCurrentProjectId() {
  return useCurrentProjectStore((s) => s.setCurrentProjectId);
}

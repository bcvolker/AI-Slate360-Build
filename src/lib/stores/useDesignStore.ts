import { create } from 'zustand';

interface DesignState {
  activeModelUrl: string | null;
  xRayValue: number; // 0 to 1
  isEditMode: boolean;
  hotspots: Array<{ id: string; position: [number, number, number]; label: string }>;
  setActiveModel: (url: string) => void;
  setXRayValue: (value: number) => void;
  toggleEditMode: () => void;
  addHotspot: (hotspot: { id: string; position: [number, number, number]; label: string }) => void;
}

export const useDesignStore = create<DesignState>((set) => ({
  activeModelUrl: null,
  xRayValue: 0,
  isEditMode: false,
  hotspots: [],
  setActiveModel: (url) => set({ activeModelUrl: url }),
  setXRayValue: (value) => set({ xRayValue: value }),
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  addHotspot: (hotspot) => set((state) => ({ hotspots: [...state.hotspots, hotspot] })),
}));

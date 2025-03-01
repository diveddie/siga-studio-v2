import { create } from 'zustand'

type LoadingState = {
  isGeneratingImage: boolean
  isGeneratingMask: boolean
  isInpainting: boolean
  setGeneratingImage: (isLoading: boolean) => void
  setGeneratingMask: (isLoading: boolean) => void
  setInpainting: (isLoading: boolean) => void
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isGeneratingImage: false,
  isGeneratingMask: false,
  isInpainting: false,
  setGeneratingImage: (isLoading) => set({ isGeneratingImage: isLoading }),
  setGeneratingMask: (isLoading) => set({ isGeneratingMask: isLoading }),
  setInpainting: (isLoading) => set({ isInpainting: isLoading }),
}))
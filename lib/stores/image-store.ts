import { create } from 'zustand'

interface ImageStore {
  images: { [key: string]: string }  // messageId -> imageUrl mapping
  addImage: (messageId: string, imageUrl: string) => void
  getImage: (messageId: string) => string | undefined
  getLatestImage: () => string | undefined
  getLatestMask: () => string | undefined
  getLatestIndividualMasks: () => string[]
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: {},
  addImage: (messageId, imageUrl) => 
    set((state) => ({ 
      images: { ...state.images, [messageId]: imageUrl } 
    })),
  getImage: (messageId) => get().images[messageId],
  getLatestImage: () => {
    const state = get();
    const regularImages = Object.entries(state.images)
      .filter(([id]) => !id.startsWith('mask-') && !id.startsWith('inpainted-'))
      .sort(([a], [b]) => Number(b) - Number(a));
    return regularImages[0]?.[1];
  },
  getLatestMask: () => {
    const state = get();
    const masks = Object.entries(state.images)
      .filter(([id]) => id.startsWith('mask-'))
      .sort(([a], [b]) => {
        const timestampA = Number(a.split('-')[1]);
        const timestampB = Number(b.split('-')[1]);
        return timestampB - timestampA;
      });
    return masks[0]?.[1];
  },
  getLatestIndividualMasks: () => {
    const state = get();
    return Object.entries(state.images)
      .filter(([id]) => id.startsWith('mask-individual-'))
      .map(([_, url]) => url);
  }
}))

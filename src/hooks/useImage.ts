import { create } from "zustand";

interface ImageState {
  image: string;
  setImage: (image: string) => void;
}

export const useImage = create<ImageState>()((set) => ({
  image: "",
  setImage: (image) => set({ image: image }),
}));

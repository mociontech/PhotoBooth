import { create } from "zustand";

export const useImage = create((set) => ({
  image: "",
  setImage: (image) => set({ image: image }),
}));

import { create } from "zustand";

export const useTitle = create((set) => ({
  title: "",
  setTitle: (title) => set({ title: title }),
}));

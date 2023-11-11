import { create } from "zustand";

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

interface NavbarState {
  isOpen: boolean;
  toggle: () => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
  isOpen:
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("isOpen") || "true")
      : false,
  toggle: () =>
    set((state) => {
      localStorage.setItem("isOpen", JSON.stringify(!state.isOpen));
      return { isOpen: !state.isOpen };
    }),
}));

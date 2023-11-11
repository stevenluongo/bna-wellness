import { fetchClientById } from "@/app/clients/_actions";
import { set } from "react-hook-form";
import { create } from "zustand";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
type ClientWithAddress = ThenArg<ReturnType<typeof fetchClientById>>;

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

interface ClientState {
  isCreateClientModalOpen: boolean;
  toggleCreateClientModal: () => void;
  isEditClientModalOpen: boolean;
  toggleEditClientModal: (client: ClientWithAddress | null) => void;
  isDeleteClientModalOpen: boolean;
  toggleDeleteClientModal: (id: string) => void;
  client: ClientWithAddress | null;
  id?: string;
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

export const useClientsStore = create<ClientState>((set) => ({
  isCreateClientModalOpen: false,
  toggleCreateClientModal: () =>
    set((state) => ({
      isCreateClientModalOpen: !state.isCreateClientModalOpen,
    })),
  client: null,
  id: undefined,
  isEditClientModalOpen: false,
  toggleEditClientModal: (client: ClientWithAddress | null) =>
    set((state) => ({
      client: client && client,
      isEditClientModalOpen: !state.isEditClientModalOpen,
    })),
  isDeleteClientModalOpen: false,
  toggleDeleteClientModal: (id: string) =>
    set((state) => ({
      id,
      isDeleteClientModalOpen: !state.isDeleteClientModalOpen,
    })),
}));

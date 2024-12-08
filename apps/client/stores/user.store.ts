import { create } from "zustand";
import { Me } from "@/utils/types";

interface UserState {
  me: Me | null;
  hydrateUser: (userData: Me) => void;
}

export const useUserStore = create<UserState>((set) => ({
  me: null,
  hydrateUser: (userData) => set(() => ({ me: userData })),
}));

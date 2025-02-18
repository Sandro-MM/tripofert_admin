import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    role: null,
    accessToken: null,

    setUser: (user, accessToken) => set({ user, accessToken }),
    setRole: (role) => set({ role }),
    logout: () => set({ user: null, role: null, accessToken: null }),
}));

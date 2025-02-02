import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            role: null,
            accessToken: null,
            refreshToken: null,

            setAuth: (session) => {
                if (!session) return;

                console.log('Setting auth:', session); // Debug log

                set({
                    user: session.user,
                    role: session.user.role,
                    accessToken: session.access_token,
                    refreshToken: session.refresh_token,
                });
            },

            clearAuth: () => set({ user: null, role: null, accessToken: null, refreshToken: null }),
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage, // Default to localStorage for persistence
            onRehydrateStorage: (state) => {
                console.log('State is rehydrated from storage:', state); // Debug log
            },
        }
    )
);


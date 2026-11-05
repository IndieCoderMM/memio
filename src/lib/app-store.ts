import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  displayName: string;
  isDarkMode: boolean;
  setDisplayName: (value: string) => void;
  toggleDarkMode: () => void;
  setDarkMode: (value: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      displayName: "",
      isDarkMode: true,
      setDisplayName: (value: string) => set({ displayName: value }),
      toggleDarkMode: () =>
        set((state) => {
          const newValue = !state.isDarkMode;
          document.documentElement.classList.toggle("dark", newValue);
          return { isDarkMode: newValue };
        }),
      setDarkMode: (value: boolean) => {
        document.documentElement.classList.toggle("dark", value);
        set({ isDarkMode: value });
      },
    }),
    {
      name: "app-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle("dark", state.isDarkMode);
        }
      },
    },
  ),
);

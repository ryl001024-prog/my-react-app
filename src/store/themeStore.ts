import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeConfig, defaultTheme, applyTheme } from "@/styles/theme";

interface ThemeState {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: defaultTheme,
      setTheme: (newTheme: ThemeConfig) => {
        applyTheme(newTheme);
        set({ theme: newTheme });
      },
      resetTheme: () => {
        applyTheme(defaultTheme);
        set({ theme: defaultTheme });
      },
    }),
    {
      name: "appTheme",
      // We only want to persist the 'theme' part of the state
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    },
  ),
);

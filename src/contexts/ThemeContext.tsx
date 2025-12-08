import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ThemeConfig,
  defaultTheme,
  getStoredTheme,
  saveTheme,
  applyTheme,
} from "@/styles/theme";

interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: (theme: ThemeConfig) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    const stored = getStoredTheme();
    applyTheme(stored);
    return stored;
  });

  const setTheme = (newTheme: ThemeConfig) => {
    setThemeState(newTheme);
    saveTheme(newTheme);
    applyTheme(newTheme);
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};


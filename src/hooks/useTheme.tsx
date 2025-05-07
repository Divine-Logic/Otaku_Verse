import type { ReactNode } from "react";

import React, { createContext, use, useState } from "react";

import type { ThemeContextType } from "../lib/types/AnimeTypes.ts";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext value={{ isDark, toggleTheme, setIsDark }}>
      {children}
    </ThemeContext>
  );
};

export function useTheme() {
  const context = use(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

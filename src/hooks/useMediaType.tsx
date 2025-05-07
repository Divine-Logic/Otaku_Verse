import type { ReactNode } from "react";

import { createContext, use, useState } from "react";

import type { ChangeTypeContext } from "../lib/types/AnimeTypes.ts";

const MediaTypeContext = createContext<ChangeTypeContext | undefined>(undefined);

export function MediaTypeProvider({ children }: { children: ReactNode }) {
  const [isAnime, setIsAnime] = useState(true);

  const toggleTheme = () => {
    setIsAnime(prev => !prev);
  };

  return (
    <MediaTypeContext value={{ isAnime, toggleTheme, setIsAnime }}>
      {children}
    </MediaTypeContext>
  );
}

export function useMediaType() {
  const context = use(MediaTypeContext);
  if (context === undefined) {
    throw new Error("useMediaType must be used within a MediaTypeProvider");
  }
  return context;
}

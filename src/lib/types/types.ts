import type React from "react";

export type cardtype = {
  children: React.ReactNode;
  className?: string;
};

export type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};
export type AnimeData = {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  coverImage: {
    large: string;
  };
  episodes: number;
  averageScore: number;
};

export type Props = {
  data: AnimeData;
};

export type SliderAnimationTypes = {
  text: string;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  className?: string;
};

export type TrendingAnimeProps = {
  data: any[];
  text: string;
};

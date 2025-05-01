import type React from "react";

export type cardtype = {
  children: React.ReactNode;
  className?: string;
};

export type AnimeCardtype = {
  img?: string;
  episodes?: string[];
  score?: string;
  title1?: string;
  title2?: string;
};

export type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};
export type AnimeData = {
  id?: number;
  title: {
    romaji?: string;
    english?: string;
    native?: string;
  };
  coverImage: {
    large?: string;
  };
  episodes?: number;
  averageScore?: number;
};

export type Props = {
  data: AnimeData;
};

export type SliderAnimationTypes = {
  text?: string | null;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
};

export type TrendingAnimeProps = {
  data?: undefined | any[];
  text?: string;
};

export type FilterOptionProps = {
  title: string;
  options: string[] | { label: string }[];
  selected: string[] | { label: string }[];
  onSelect: (value: string | { label: string }) => void;
  isCategory: boolean;
};

export type SearchAnimeCardProps = {
  key?: number;
  img?: string;
  handleCardClick: () => void;
  title1?: string;
  title2?: string;
  rating?: number;
  genration?: string[] | undefined;
};

export type CharacterDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  characterId: number;
};

export type CharacterCardProps = {
  anime: {
    node?: {
      id?: number | string;
      coverImage?: { large?: string };
      title?: string;
    };
    voiceActors?: {
      image?: { large?: string };
      name?: { full?: string };
    }[];
  };
  onClick: (id?: number | string) => void;
};

export type DynamicCharacterCardProps = {
  data: any;
  keys: {
    id: string;
    titleEnglish: string;
    titleRomaji: string;
    coverImage: string;
    voiceActorImage?: string | undefined;
    voiceActorName?: string | undefined;
  };
  onClick: (id: number | string) => void;
};

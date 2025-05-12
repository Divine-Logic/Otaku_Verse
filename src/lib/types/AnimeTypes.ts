import type React from "react";

export type cardtype = {
  children: React.ReactNode;
  className?: string;
};

export type AnimeCardtype = {
  img?: string;
  episodes?: string[];
  score?: number;
  title1?: string;
  title2?: string;
};

export type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ChangeTypeContext = {
  isAnime: boolean;
  toggleTheme: () => void;
  setIsAnime: React.Dispatch<React.SetStateAction<boolean>>;
};
export type SliderAnimationTypes = {
  text?: string | null;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
};

export type TrendingAnimeProps = {
  data?: undefined | any[];
  text?: string;
  isLoading: boolean;
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
export type DynamicCharacterCardProps = {
  data: any;
  keys: {
    id: string;
    titleEnglish: string;
    titleRomaji: string;
    coverImage: string;
    voiceActorImage?: string | null;
    voiceActorName?: string | undefined;
  };
  onClick: (id: number | string) => void;
};

export type IconActionButtonProps = {
  isActive?: boolean;
  onClick?: () => void;
  activeClassName?: string;
  inactiveClassName: string;
  icon: React.ReactNode;
};
export type CharacterCardArgs = {
  id?: number;
  role?: string;
  coverImage1?: string;
  englishName?: string;
  nativeName?: string;
  isDark: boolean;
  handleOpenCharacterModal: (id: number | null | undefined) => void;
};

export type SwitchToggleButton = {
  option1: string;
  option2: string;
  onChange: { (value: string): void } | { (value: React.SetStateAction<string>): void } | any;
};

export type StaffCardProps = {
  img: string;
  nativeName: string;
  englishName: string;
  role: string;
  index: number;
  isDark: boolean;
};
export type RecommedationAnimeProps = {
  data: any[];
  text: string;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export type DetailsPartProps = {
  coverImage: string;
  englishTitle: string;
  romajiTitle: string;
  nativeTitle: string;
  genration: string[];
  averageScore: number;
  popularity: number;
  favourites: number;
  status: string;
  format: string;
  isDark: boolean;
  volumes: number;
  chapters: string[];
};
export type OverviewCardProps = {
  description: string;
  externalLinks: string[];
  statusDistribution: string;
  isDark: boolean;
};

type StatusItem = {
  status: string;
  amount: number;
};
export type StatusDataProps = {
  statusData: StatusItem[];
};

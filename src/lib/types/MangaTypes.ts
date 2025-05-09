import type { Key } from "react";

export type PopularMangaProps = {

  id: Key | null;
  coverImage: { large: string | undefined; medium: string | undefined };
  title: { romaji: string | undefined; english: string | null };
  status: string;
  description: string;
  chapters: any;
  volumes: any;
  averageScore: number;
  popularity: number;
  rankings?: { rank: number; type?: string }[] | undefined;
};

export type PopularityProps = {
  node: {
    id: number | undefined;
    image: { large: string | undefined };
    name: { full: string | undefined; native: string | undefined };
  };
  role: string | undefined;
};
export type MangaCharacterProps = {
  key?: number;
  id?: number;
  bannerImage?: string;
  nameNative?: string;
  nameFull?: string;
  role?: string;
};

export type MangaCardProps = {
  id?: number | null;
  coverImage1?: string;
  coverImage2?: string;
  status?: string;
  rank?: number;
  title1?: string | null;
  title2?: string | null;
  description?: string;
  chapters?: number;
  volumes?: number;
};
export type RelatedCardProps = {
  key: string;
  id: number | null;
  img: string;
  title1: string;
  title2: string;
  type: string;
  status: string;
};

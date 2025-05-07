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

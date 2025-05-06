import { useQuery } from "@tanstack/react-query";

import { anilistApi } from "./Client.ts";
import { POPULAR_MANGA_QUERY } from "./query/MangaQuery.ts";

async function fetchPopularManga() {
  const response = await anilistApi.post("", {
    query: POPULAR_MANGA_QUERY,
  });
  return response.data.data.Page.media;
}

export function usePopulerManga() {
  return useQuery({ queryKey: ["trendingAnime"], queryFn: fetchPopularManga });
}

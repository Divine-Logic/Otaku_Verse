import { useQuery } from "@tanstack/react-query";

import { anilistApi } from "../Client.ts";
import { MANGA_DETAILS_QUERY, POPULAR_MANGA_QUERY } from "../query/mangaQuery/MangaQuery.ts";

async function fetchPopularManga() {
  const response = await anilistApi.post("", {
    query: POPULAR_MANGA_QUERY,
  });
  return response.data.data.Page.media;
}

async function fetchMangaDetails(id: string | undefined) {
  const response = await anilistApi.post("", {
    query: MANGA_DETAILS_QUERY,
    variables: { id },
  });
  return response.data.data.Media;
}

export function usePopularManga() {
  return useQuery({ queryKey: ["popularManga"], queryFn: fetchPopularManga });
}

export function useMangaDetails(id: string | undefined) {
  return useQuery({
    queryKey: ["mangaDetails", id],
    queryFn: () => fetchMangaDetails(id),
    enabled: !!id,
  });
}

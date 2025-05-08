import { useQuery } from "@tanstack/react-query";

import { anilistApi } from "../../Client.ts";

export const TRENDING_ANIME_QUERY = `
  query {
    Page(perPage: 50) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
        }
        genres
        episodes
        averageScore
      }
    }
  }
`;

async function fetchTrendingAnime() {
  const response = await anilistApi.post("", {
    query: TRENDING_ANIME_QUERY,
  });
  return response.data.data.Page.media;
}

export function useTrendingAnime() {
  return useQuery({ queryKey: ["trendingAnime"], queryFn: fetchTrendingAnime });
}

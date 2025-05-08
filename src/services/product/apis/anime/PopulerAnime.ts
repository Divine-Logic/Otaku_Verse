import { useQuery } from "@tanstack/react-query";

import { anilistApi } from "../../Client.ts";

export const POPULAR_ANIME_QUERY = `
  query {
    Page(perPage: 20) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
        }
        bannerImage
        coverImage {
          large
        }
        genres
        averageScore
        description(asHtml: false)
      }
    }
  }
`;

async function fetchPopularAnime() {
  const response = await anilistApi.post("", {
    query: POPULAR_ANIME_QUERY,
  });
  return response.data.data.Page.media;
}

export function usePopularAnime() {
  return useQuery({ queryKey: ["popularAnime"], queryFn: fetchPopularAnime });
}

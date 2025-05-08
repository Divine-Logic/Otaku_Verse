import { useQuery } from "@tanstack/react-query";

import { anilistApi } from "../../Client.ts";

export const SEARCH_ANIME_QUERY = `
  query ($search: String) {
    Page(perPage: 20) {
      media(search: $search, type: ANIME) {
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

async function searchAnime(search: string) {
  const response = await anilistApi.post("", {
    query: SEARCH_ANIME_QUERY,
    variables: { search },
  });
  return response.data.data.Page.media;
}

export function useSearchAnime(search: string) {
  return useQuery({
    queryKey: ["searchAnime", search],
    queryFn: () => searchAnime(search),
    enabled: !!search,
  });
}

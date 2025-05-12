import { useInfiniteQuery } from "@tanstack/react-query";

import { anilistApi } from "../../Client.ts";

type PageParamType = { pageParam?: number };

export const RECOMMENDATIONS_ANIME_QUERY = `
  query ($page: Int, $perPage: Int, $id: Int) {
    Media(id: $id, type: ANIME) {
      recommendations(page: $page, perPage: $perPage, sort: RATING_DESC) {
        pageInfo {
          currentPage
          hasNextPage
        }
        nodes {
          rating
          mediaRecommendation {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            genres
            averageScore
            description(asHtml: false)
          }
        }
      }
    }
  }
`;

async function fetchRecommendAnime({ pageParam = 1 }: PageParamType) {
  const response = await anilistApi.post("", {
    query: RECOMMENDATIONS_ANIME_QUERY,
    variables: {
      id: 1,
      page: pageParam,
      perPage: 10,
    },
  });

  const recommendations = response.data.data.Media.recommendations;

  return {
    nodes: recommendations.nodes,
    nextPage: recommendations.pageInfo.hasNextPage
      ? recommendations.pageInfo.currentPage + 1
      : undefined,
  };
}

export function useRecommendAnime() {
  return useInfiniteQuery({
    queryKey: ["recommendAnime"],
    queryFn: fetchRecommendAnime,
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 1,
  });
}

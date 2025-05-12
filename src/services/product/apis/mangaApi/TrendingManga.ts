import { useInfiniteQuery } from "@tanstack/react-query";

import { anilistApi } from "../../Client.ts";

type PageParamType = { pageParam?: number };
export const TRENDING_MANGA_QUERY = `query TrendingManga($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      currentPage
      hasNextPage
    }
    media(type: MANGA, sort: TRENDING_DESC) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
        medium
      }
      bannerImage
      description(asHtml: false)
      averageScore
      popularity
      genres
      status
      chapters
      volumes
      startDate {
        year
        month
        day
      }
      rankings {
        rank
        type
        allTime
        context
      }
    }
  }
}`;

async function fetchTrendingManga({ pageParam = 1 }: PageParamType) {
  const response = await anilistApi.post("", {
    query: TRENDING_MANGA_QUERY,
    variables: {
      page: pageParam,
      perPage: 10,
    },
  });

  const page = response.data.data.Page;

  return {
    nodes: page.media,
    nextPage: page.pageInfo.hasNextPage ? page.pageInfo.currentPage + 1 : undefined,
  };
}

export function useTrendingManga() {
  return useInfiniteQuery({
    queryKey: ["trendingManga"],
    queryFn: fetchTrendingManga,
    getNextPageParam: lastPage => lastPage.nextPage,
    initialPageParam: 1,
  });
}

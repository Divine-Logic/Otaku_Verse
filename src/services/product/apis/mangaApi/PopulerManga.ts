import { useQuery } from "@tanstack/react-query";

import { anilistApi } from "../../Client.ts";

export const POPULAR_MANGA_QUERY = `query {
    Page(page: 1, perPage: 50) {
        media(type: MANGA, sort: POPULARITY_DESC) {
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

async function fetchPopularManga() {
  const response = await anilistApi.post("", {
    query: POPULAR_MANGA_QUERY,
  });
  return response.data.data.Page.media;
}

export function usePopularManga() {
  return useQuery({ queryKey: ["popularManga"], queryFn: fetchPopularManga });
}

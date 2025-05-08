import { useQuery } from "@tanstack/react-query";

import { anilistApi } from "../../Client.ts";

export const UPCOMING_EPISODES_QUERY = `
  query {
    Page(perPage: 50) {
      airingSchedules(notYetAired: true, sort: TIME) {
        airingAt
        episode
        media {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
        }
      }
    }
  }
`;

async function fetchUpcomingEpisodes() {
  const response = await anilistApi.post("", {
    query: UPCOMING_EPISODES_QUERY,
  });
  return response.data.data.Page.airingSchedules.map((item: any) => ({
    id: item.media.id,
    title: item.media.title.english || item.media.title.romaji,
    episode: item.episode,
    airingAt: item.airingAt,
    image: item.media.coverImage.large,
    siteUrl: item.media.siteUrl,
  }));
}

export function useUpcomingEpisodes() {
  return useQuery({
    queryKey: ["upcomingEpisodes"],
    queryFn: fetchUpcomingEpisodes,
  });
}

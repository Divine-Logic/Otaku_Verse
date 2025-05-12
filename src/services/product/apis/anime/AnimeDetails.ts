import { useQuery } from "@tanstack/react-query";

import { anilistApi } from "../../Client.ts";

export const ANIME_DETAIL_QUERY = `
 query ($id: Int, $page: Int) {
  Media(id: $id) {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
    }
    bannerImage
    description(asHtml: false)
    seasonYear
    episodes
    genres
    averageScore
     chapters
    volumes
    popularity
    favourites
    status
    format
    trailer {
      id
      site
    }
    characters(page: $page, sort: [ROLE, RELEVANCE]) {
      edges {
        node {
          id
          name {
            full
          }
          image {
            large
          }
        }
        role
        voiceActors(language: JAPANESE) {
          id
          name {
            full
          }
          image {
            large
          }
        }
      }
    }
     stats {
      statusDistribution {
        status
        amount
      }
    }
      externalLinks {
      site
      url
      icon
      color
    }
    staff(page: $page, sort: [RELEVANCE]) {
      edges {
        node {
          id
          name {
            full
            native
          }
          image {
            large
          }
          description
        }
        role
      }
    }
  }
}
`;

async function fetchAnimeDetails(id: string | undefined) {
  const response = await anilistApi.post("", {
    query: ANIME_DETAIL_QUERY,
    variables: { id },
  });
  return response.data.data.Media;
}

export function useAnimeDetails(id: string | undefined) {
  return useQuery({
    queryKey: ["animeDetails", id],
    queryFn: () => fetchAnimeDetails(id),
    enabled: !!id,
  });
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const anilistApi = axios.create({
  baseURL: "https://graphql.anilist.co",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const TRENDING_ANIME_QUERY = `
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
        episodes
        averageScore
      }
    }
  }
`;

const SEARCH_ANIME_QUERY = `
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
        episodes
        averageScore
      }
    }
  }
`;

const POPULAR_ANIME_QUERY = `
  query {
    Page(perPage: 10) {
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
        description(asHtml: false)
      }
    }
  }
`;
const ANIME_DETAIL_QUERY = `
  query ($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
      }
      description(asHtml: false)
      episodes
      genres
      averageScore
      bannerImage
    }
  }
`;

async function fetchTrendingAnime() {
  const response = await anilistApi.post("", {
    query: TRENDING_ANIME_QUERY,
  });
  return response.data.data.Page.media;
}

async function searchAnime(search: string) {
  const response = await anilistApi.post("", {
    query: SEARCH_ANIME_QUERY,
    variables: { search },
  });
  return response.data.data.Page.media;
}

async function fetchPopularAnime() {
  const response = await anilistApi.post("", {
    query: POPULAR_ANIME_QUERY,
  });
  return response.data.data.Page.media;
}

export function useTrendingAnime() {
  return useQuery({ queryKey: ["trendingAnime"], queryFn: fetchTrendingAnime });
}

export function useSearchAnime(search: string) {
  return useQuery({
    queryKey: ["searchAnime", search],
    queryFn: () => searchAnime(search),
    enabled: !!search,
  });
}

export function usePopularAnime() {
  return useQuery({ queryKey: ["popularAnime"], queryFn: fetchPopularAnime });
}

async function fetchAnimeDetails(id: number) {
  const response = await anilistApi.post("", {
    query: ANIME_DETAIL_QUERY,
    variables: { id },
  });
  return response.data.data.Media;
}

export function useAnimeDetails(id: number) {
  return useQuery({
    queryKey: ["animeDetails", id],
    queryFn: () => fetchAnimeDetails(id),
    enabled: !!id, // Ensures the query runs only when `id` is not falsy
  });
}

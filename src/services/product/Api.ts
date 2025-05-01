import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  ANIME_DETAIL_QUERY,
  CHARACTER_DETAIL_QUERY,
  POPULAR_ANIME_QUERY,
  RECOMMENDATIONS_ANIME_QUERY,
  SEARCH_ANIME_QUERY,
  TRENDING_ANIME_QUERY,
  UPCOMING_EPISODES_QUERY,
} from "./GraphQlQuery.ts";

const anilistApi = axios.create({
  baseURL: "https://graphql.anilist.co",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

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

async function fetchAnimeDetails(id: string | undefined) {
  const response = await anilistApi.post("", {
    query: ANIME_DETAIL_QUERY,
    variables: { id },
  });
  return response.data.data.Media;
}

async function fetchRecommendAnime() {
  const response = await anilistApi.post("", {
    query: RECOMMENDATIONS_ANIME_QUERY,
    // variables: { id },
  });
  return response.data.data.Media.recommendations.nodes;
}

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

async function fetchCharacterDetails(id: string | number | undefined) {
  if (!id)
    throw new Error("Character ID is required");
  const characterId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  const response = await anilistApi.post("", {
    query: CHARACTER_DETAIL_QUERY,
    variables: { id: characterId },
  });
  if (response.data.errors)
    throw new Error(response.data.errors[0].message);
  return response.data.data.Character;
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

export function useAnimeDetails(id: string | undefined) {
  return useQuery({
    queryKey: ["animeDetails", id],
    queryFn: () => fetchAnimeDetails(id),
    enabled: !!id,
  });
}

export function useRecommendAnime() {
  return useQuery({
    queryKey: ["recommendAnime"],
    queryFn: () => fetchRecommendAnime(),
    // enabled: !!id,
  });
}

export function useUpcomingEpisodes() {
  return useQuery({
    queryKey: ["upcomingEpisodes"],
    queryFn: fetchUpcomingEpisodes,
  });
}

export function useCharacterDetails(id: number) {
  return useQuery({
    queryKey: ["characterDetails", id],
    queryFn: () => fetchCharacterDetails(id),
    enabled: !!id,
  });
}

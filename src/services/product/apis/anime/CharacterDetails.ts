import { useQuery } from "@tanstack/react-query";

import { anilistApi } from "../../Client.ts";

export const CHARACTER_DETAIL_QUERY = `
  query ($id: Int) {
    Character(id: $id) {
      id
      name {
        full
        native
      }
      image {
        large
      }
      description
      gender
      age
   
      siteUrl
      media(perPage: 50) {
        edges {
          node {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
          }
          voiceActors(language: JAPANESE) {
            id
            name {
              full
            }
            image {
              large
            }
            siteUrl
          }
        }
      }
    }
  }
`;

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

export function useCharacterDetails(id: number) {
  return useQuery({
    queryKey: ["characterDetails", id],
    queryFn: () => fetchCharacterDetails(id),
    enabled: !!id,
  });
}

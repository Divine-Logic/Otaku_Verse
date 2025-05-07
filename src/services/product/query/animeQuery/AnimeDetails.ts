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

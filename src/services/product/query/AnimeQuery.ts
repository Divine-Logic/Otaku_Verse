export const TRENDING_ANIME_QUERY = `
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
        genres
        episodes
        averageScore
      }
    }
  }
`;

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

export const POPULAR_ANIME_QUERY = `
  query {
    Page(perPage: 20) {
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
        genres
        averageScore
        description(asHtml: false)
      }
    }
  }
`;

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

export const RECOMMENDATIONS_ANIME_QUERY = `
  query {
    Media(id: 1, type: ANIME) {
      title {
        romaji
        english
      }
      recommendations(page: 1, perPage: 50, sort: RATING_DESC) {
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

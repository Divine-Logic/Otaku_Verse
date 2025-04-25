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
        episodes
        averageScore
      }
    }
  }
`;

export const POPULAR_ANIME_QUERY = `
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

export const ANIME_DETAIL_QUERY = `
 query ($id: Int, $page: Int) {
  Media(id: $id) {
    season
    seasonYear
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      large
    }
    rankings {
      year  
    }
    description(asHtml: false)
    episodes
    genres
    averageScore
    bannerImage
    trailer {
      id
      site
      thumbnail
    }
    characters(page: $page, sort: [ROLE, RELEVANCE]) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      edges {
        role
        node {
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
      recommendations(page: 1, perPage: 300, sort: RATING_DESC) {
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
            description(asHtml: false)
          }
        }
      }
    }
  }
`;

export const UPCOMING_EPISODES_QUERY = `
  query {
    Page(perPage: 20) {
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
          siteUrl
        }
      }
    }
  }
`;

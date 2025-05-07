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

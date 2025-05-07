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

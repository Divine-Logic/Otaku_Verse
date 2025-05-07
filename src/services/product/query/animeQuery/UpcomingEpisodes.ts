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

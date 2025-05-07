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

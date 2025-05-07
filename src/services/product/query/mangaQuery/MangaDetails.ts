export const MANGA_DETAILS_QUERY = `query MangaDetails($id: Int) {
  Media(id: $id, type: MANGA) {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      medium
      color
    }
    bannerImage
    description(asHtml: false)
    format
    status(version: 2)
    chapters
    volumes
    countryOfOrigin
    isLicensed
    synonyms
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    genres
    tags {
      name
      rank
      isGeneralSpoiler
      isMediaSpoiler
      category
    }
    averageScore
    meanScore
    popularity
    favourites
    isFavourite
    relations {
      edges {
        relationType(version: 2)
        node {
          id
          title {
            romaji
            english
          }
          type
          format
          status(version: 2)
          coverImage {
            medium
          }
        }
      }
    }
    characters(perPage: 50) {
      edges {
        role
        node {
          id
          name {
            full
            native
          }
          image {
            large
          }
        }
      }
    }
    staff(perPage: 50) {
      edges {
        role
        node {
          id
          name {
            full
            native
          }
          image {
            large
          }
        }
      }
    }
    stats {
      statusDistribution {
        status
        amount
      }
    }
    externalLinks {
      site
      url
      icon
      color
    }
    siteUrl
  }
}
`;

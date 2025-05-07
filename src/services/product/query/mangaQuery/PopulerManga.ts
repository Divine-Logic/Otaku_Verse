export const POPULAR_MANGA_QUERY = `query {
    Page(page: 1, perPage: 50) {
        media(type: MANGA, sort: POPULARITY_DESC) {
            id
            title {
                romaji
                english
                native
            }
            coverImage {
                large
                medium
            }
            bannerImage
            description(asHtml: false)
            averageScore
            popularity
            genres
            status
            chapters
            volumes
            startDate {
                year
                month
                day
            }
            rankings {
                rank
                type
                allTime
                context
            }
        }
    }
}`;

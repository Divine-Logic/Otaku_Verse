import Card from "../../component/Card.tsx";
import Loader from "../../component/Loader.tsx";
import { usePopularAnime, useRecommendAnime, useTrendingAnime, useUpcomingEpisodes } from "../../services/product/Api.ts";
import PopularAnime from "./component/PopularAnime.tsx";
import RecommendingAnime from "./component/RecommendingAnime.tsx";
import TrendingAnime from "./component/TrendingAnime.tsx";
import UpcomingEpisodes from "./component/UpcomingEpisodes.tsx";

function HomePage() {
  const { data: trendingData, isLoading: isTrendingLoading } = useTrendingAnime();
  const { data: popularData, isLoading: isPopularLoading } = usePopularAnime();
  const { data: recommendData, isLoading: isRecommendLoading } = useRecommendAnime();
  const { data: upcommingEpi, isLoading: isUpcomingEpiLoading } = useUpcomingEpisodes();

  if (isTrendingLoading || isPopularLoading || isRecommendLoading || isUpcomingEpiLoading) {
    return <Loader />;
  }
  console.log("this is upcomingEpi", upcommingEpi);

  return (
    <Card className="overflow-x-auto bg-transparent flex flex-col gap-[1rem] md:gap-[2rem] max-w-screen">

      <PopularAnime data={popularData} />

      <RecommendingAnime data={recommendData} text="Recommending Anime" />

      <TrendingAnime data={trendingData} text="Trending Anime" />

      <UpcomingEpisodes data={upcommingEpi} text="Upcoming Episodes" />

    </Card>
  );
}

export default HomePage;

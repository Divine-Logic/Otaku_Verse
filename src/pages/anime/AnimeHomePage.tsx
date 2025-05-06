import Card from "../../component/atoms/Card.tsx";
import Loader from "../../component/atoms/Loader.tsx";
import { usePopularAnime, useRecommendAnime, useTrendingAnime } from "../../services/product/Api.ts";
import PopularAnime from "./component/PopularAnime.tsx";
import RecommendingAnime from "./component/RecommendingAnime.tsx";
import TrendingAnime from "./component/TrendingAnime.tsx";
import UpcomingEpisodes from "./component/UpcomingEpisodes.tsx";

function AnimeHomePage() {
  const { data: trendingData, isLoading: isTrendingLoading } = useTrendingAnime();
  const { data: popularData, isLoading: isPopularLoading } = usePopularAnime();
  const { data: recommendData, isLoading: isRecommendLoading } = useRecommendAnime();

  if (isTrendingLoading || isPopularLoading || isRecommendLoading) {
    return <Loader />;
  }

  return (
    <Card className=" bg-transparent flex flex-col gap-[1rem] md:gap-[2rem] max-w-screen">

      <PopularAnime data={popularData} />
      <UpcomingEpisodes text="Upcoming Episodes" />
      <RecommendingAnime data={recommendData} text="Recommending Anime" />

      <TrendingAnime data={trendingData} text="Trending Anime" />

    </Card>
  );
}

export default AnimeHomePage;

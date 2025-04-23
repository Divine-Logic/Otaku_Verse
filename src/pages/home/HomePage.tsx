import Card from "../../component/Card.tsx";
import Loader from "../../component/Loader.tsx";
import { usePopularAnime, useTrendingAnime } from "../../services/product/Api.ts"; // Ensure to import usePopularAnime
import PopularAnime from "./component/PopularAnime.tsx";
import TrandingAnime from "./component/TrandingAnime.tsx";

function HomePage() {
  const { data: trendingData, isLoading: isTrendingLoading } = useTrendingAnime(); // Renaming to avoid conflict
  const { data: popularData, isLoading: isPopularLoading } = usePopularAnime(); // Renaming to avoid conflict

  console.log(popularData);
  if (isTrendingLoading || isPopularLoading) {
    return <Loader />;
  }

  return (
    <Card className="overflow-x-auto bg-transparent flex flex-col gap-[2rem]">
      <PopularAnime data={popularData} />
      <TrandingAnime data={trendingData} text="Trending" />
    </Card>
  );
}

export default HomePage;

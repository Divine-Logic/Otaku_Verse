import Card from "../../component/Card.tsx";
import Loader from "../../component/Loader.tsx";
import { useTrendingAnime } from "../../services/product/Api.ts";
import TrandingAnime from "./component/TrandingAnime.tsx";

function HomePage() {
  const { data, isLoading } = useTrendingAnime();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Card className="overflow-x-auto bg-transparent">

      <TrandingAnime data={data} text="Trending" />

    </Card>
  );
}

export default HomePage;

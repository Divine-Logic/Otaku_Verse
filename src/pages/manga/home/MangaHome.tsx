import Card from "../../../component/atoms/Card.tsx";
import PopularManga from "./components/PopulerManga.tsx";
import TrendingManga from "./components/TrendingManga.tsx";

function MangaHome() {
  return (
    <Card className="flex flex-col justify-center bg-transparent max-w-screen overflow-x-auto no-scrollbar">
      <PopularManga />
      <TrendingManga />
    </Card>
  );
}

export default MangaHome;

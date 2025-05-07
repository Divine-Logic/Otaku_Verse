import Card from "../../../component/atoms/Card.tsx";
import PopularManga from "./components/PopulerManga.tsx";

function MangaHome() {
  return (
    <Card className="flex flex-col justify-center bg-transparent max-w-screen overflow-x-auto no-scrollbar">
      <PopularManga />
    </Card>
  );
}

export default MangaHome;

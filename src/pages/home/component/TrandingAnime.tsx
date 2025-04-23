import { useRef } from "react";

import AnimeCard from "../../../component/AnimeCard.tsx";
import SliderAnimation from "../../../component/SliderAnimation.tsx";

function AnimeScrollContainer({ data, text }: { data: any[]; text: string }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full bg-transparent gap-[1rem] flex flex-col">
      <SliderAnimation text={text} scrollContainerRef={scrollContainerRef} />
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth no-scrollbar"
      >
        <div className="flex gap-5 items-center pr-10">
          {data && data?.map(anime => (
            <div key={anime.id} className="flex-shrink-0 w-64">
              <AnimeCard data={anime} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnimeScrollContainer;

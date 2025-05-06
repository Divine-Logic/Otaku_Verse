import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import type { TrendingAnimeProps } from "../../../lib/types/Types.ts";

import AnimeCard from "../../../component/atoms/AnimeCard.tsx";
import Card from "../../../component/atoms/Card.tsx";
import SliderAnimation from "../../../component/atoms/SliderAnimation.tsx";

function TrendingAnime({ data, text }: TrendingAnimeProps) {
  const scrollContainerRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // console.log("trendingAnime", data);

  return (
    <Card className=" bg-transparent gap-4 flex flex-col  w-full overflow-x-auto">
      <SliderAnimation
        text={text}
        scrollContainerRef={scrollContainerRef}
        className="text-xl md:text-3xl font-bold text-primary-500 w-full justify-between"
      />
      <div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar w-full">
        <div className="flex gap-5 items-center pr-10">
          {data?.map(anime => (
            <div
              key={anime.id}
              className="w-64 cursor-pointer"
              onClick={() => navigate(`/anime/${anime.id}`)}
            >
              <AnimeCard
                img={anime.coverImage.large}
                title1={anime.title.english}
                title2={anime.title.romaji}
                score={anime.averageScore}
                episodes={anime.episodes}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default TrendingAnime;

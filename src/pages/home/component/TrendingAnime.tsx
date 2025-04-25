import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import type { TrendingAnimeProps } from "../../../lib/types/types.ts";

import AnimeCard from "../../../component/AnimeCard";
import Card from "../../../component/Card";
import SliderAnimation from "../../../component/SliderAnimation";

function TrendingAnime({ data, text }: TrendingAnimeProps) {
  const scrollContainerRef: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <Card className=" bg-transparent gap-4 flex flex-col py-3 w-full overflow-x-auto">
      <SliderAnimation
        text={text}
        scrollContainerRef={scrollContainerRef}
        className="text-xl md:text-3xl font-bold text-red-500 w-full justify-between"
      />
      <div ref={scrollContainerRef} className="overflow-x-auto no-scrollbar w-full">
        <div className="flex gap-5 items-center pr-10">
          {data.map(anime => (
            <div
              key={anime.id}
              className="w-64 cursor-pointer"
              onClick={() => navigate(`/anime/${anime.id}`)}
            >
              <AnimeCard data={anime} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default TrendingAnime;

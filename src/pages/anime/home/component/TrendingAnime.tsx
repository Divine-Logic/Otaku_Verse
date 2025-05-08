import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import type { TrendingAnimeProps } from "../../../../lib/types/AnimeTypes.ts";

import AnimeCard from "../../../../component/atoms/AnimeCard.tsx";
import Card from "../../../../component/atoms/Card.tsx";
import SkeletonAnimeCard from "../../../../component/atoms/SkeletonAnimeCard.tsx";
import SliderAnimation from "../../../../component/atoms/SliderAnimation.tsx";

function TrendingAnime({ data, text, isLoading }: TrendingAnimeProps) {
  const scrollContainerRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // console.log("trendingAnime", data);

  return isLoading
    ? (
        <Card className=" bg-transparent gap-4 overflow-x-auto overflow-y-hidden     no-scrollbar">
          <SliderAnimation
            text={text}
            scrollContainerRef={scrollContainerRef}
            className="text-xl md:text-3xl font-bold text-primary-500 w-full justify-between   "
          />
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden  no-scrollbar w-full flex rounded-lg bg-transparent "
          >
            <div className="flex gap-5 items-center pr-10 bg-transparent  ">
              {Array.from({ length: 7 }).map((_, index) => (
                <SkeletonAnimeCard key={index} />
              ))}
            </div>
          </div>
        </Card>
      )
    : (
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

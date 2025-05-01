import type { RefObject } from "react";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import AnimeCard from "../../../component/AnimeCard.tsx";
import SliderAnimation from "../../../component/SliderAnimation.tsx";

function RecommendingAnime({ data, text }: { data: any; text: string }) {
  const scrollContainerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // console.log("this is RecommendingAnime", data);

  return (
    <div className="flex flex-col gap-8 w-full">
      <SliderAnimation
        text={text}
        scrollContainerRef={scrollContainerRef}
        className="text-xl md:text-4xl font-bold text-primary-500 "
      />

      <div
        className="flex gap-6 pb-4 w-full overflow-x-auto  no-scrollbar"
        ref={scrollContainerRef}
      >
        {data?.map((item: any) => (
          <div
            key={item.mediaRecommendation.id}
            onClick={() => navigate(`/anime/${item.mediaRecommendation.id}`)}
            className="min-w-64 rounded-lg  cursor-pointer  relative group "
          >
            <AnimeCard
              img={item.mediaRecommendation.coverImage.large}
              title1={item.mediaRecommendation.title.english}
              title2={item.mediaRecommendation.title.romaji}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendingAnime;

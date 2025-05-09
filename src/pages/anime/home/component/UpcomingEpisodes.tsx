import React, { useRef } from "react";
import Skeleton from "react-loading-skeleton";

import Card from "../../../../component/atoms/Card.tsx";
import SliderAnimation from "../../../../component/atoms/SliderAnimation.tsx";
import UpcomingEpisodesCard from "../../../../component/atoms/UpcomingEpisodesCard.tsx";
import { useUpcomingEpisodes } from "../../../../services/product/apis/anime/UpcomingEpisodes.ts";

function UpcomingEpisodes({ text }: { text: string }) {
  const scrollContainerRef: React.RefObject<HTMLDivElement | null> = useRef(null);
  const { data, isLoading } = useUpcomingEpisodes();

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
              {Array.from({ length: 7 }).map((_, index?: number) => (
                <div
                  key={index}
                  className="flex gap-[1rem] min-w-[22rem] h-full md:min-w-[25rem] cursor-pointer bg-gradient-to-r from-white/20 via-white/15 to-white/10 rounded-lg p-2"
                >
                  <Skeleton height="10rem" width="7rem" borderRadius=".5rem" baseColor="#848884" />
                  <div className="flex items-start justify-center flex-col">
                    <Skeleton height={50} width={170} baseColor="#848884" />
                    <Skeleton height={10} width={50} baseColor="#848884" />
                    <Skeleton height={20} width={100} baseColor="#848884" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )
    : (
        <div className="flex flex-col gap-[2rem]">
          <SliderAnimation
            scrollContainerRef={scrollContainerRef}
            className="text-xl  md:text-4xl font-bold text-primary-500"
            text={text}
          />
          <div
            ref={scrollContainerRef}
            className="flex max-w-[95.5vw] overflow-x-auto gap-6 text-white no-scrollbar"
          >
            {data?.map((item: any) => (
              <UpcomingEpisodesCard
                key={item.id}
                img={item.image}
                title={item.title}
                episode={item.episode}
                time={item.airingAt}
              />

            ))}
          </div>
        </div>
      );
}

export default UpcomingEpisodes;

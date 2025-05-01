import React, { useRef } from "react";

import SliderAnimation from "../../../component/SliderAnimation.tsx";
import { useUpcomingEpisodes } from "../../../services/product/Api.ts";

function UpcomingEpisodes({ text }: { text: string | null }) {
  const scrollContainerRef: React.RefObject<HTMLDivElement | null> = useRef(null);
  const { data } = useUpcomingEpisodes();

  return (
    <div className="flex flex-col gap-[2rem]">
      <SliderAnimation
        scrollContainerRef={scrollContainerRef}
        className="text-xl md:text-3xl font-bold text-primary-500 w-full justify-between"
        text={text}
      />
      <div
        ref={scrollContainerRef}
        className="flex max-w-[95.5vw] overflow-x-auto gap-6 text-white no-scrollbar"
      >
        {data?.map((item: any) => (
          <div
            key={item.id}

            className="flex gap-[1rem] min-w-[22rem] h-full md:min-w-[25rem] cursor-pointer bg-gradient-to-l from-primary-600/100 via-primary-560/80 to-primary-600/60 rounded-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-[10rem] object-cover rounded-r-lg rounded-l-lg"
            />
            <div className="flex items-start justify-center flex-col">
              <h2 className="text-xl font-bold text-start">{item.title}</h2>
              <p>{`EP : ${item.episode}`}</p>
              <div className="flex items-center mb-3 text-sm">
                {new Date(item.airingAt * 1000).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpcomingEpisodes;

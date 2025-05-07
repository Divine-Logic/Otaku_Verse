import type { RefObject } from "react";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import type { PopularMangaProps } from "../../../../lib/types/MangaTypes.ts";

import Card from "../../../../component/atoms/Card.tsx";
import Loader from "../../../../component/atoms/Loader.tsx";
import SliderAnimation from "../../../../component/atoms/SliderAnimation.tsx";
import { usePopularManga } from "../../../../services/product/Apis/MangaApi.ts";

export default function PopularManga() {
  const { data, isLoading, isError } = usePopularManga();
  const scrollContainerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  console.log("PopularManga", data);

  return isLoading
    ? (<Loader />
      )
    : isError
      ? (
          <p className="text-red-700">Not Found</p>
        )
      : (

          <Card className=" gap-4 w-full bg-transparent rounded-lg">
            <SliderAnimation
              scrollContainerRef={scrollContainerRef}
              text="Trending Manga"
              className="w-full  text-xl md:text-4xl font-bold text-primary-500"
            />
            <div className="p-6 flex overflow-x-auto gap-8 no-scrollbar rounded-lg" ref={scrollContainerRef}>
              {data.map((manga: PopularMangaProps) => (
                <div
                  key={manga.id}
                  onClick={() => {
                    navigate(`/manga/${manga.id}`);
                  }}
                  className="group w-64 min-w-[16rem] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={manga.coverImage.large || manga.coverImage.medium}
                      alt={manga.title.romaji}
                      className="w-full h-[15rem] object-cover rounded-t-xl group-hover:brightness-75 transition-all duration-300"
                    />
                    <div
                      className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[0.7rem] font-semibold py-1 px-3 rounded-full shadow-md"
                    >
                      {manga.status}
                    </div>
                    <div
                      className="absolute top-3 right-3 bg-primary-700/70 text-emerald-400 text-xl font-bold py-1 px-2 rounded-md"
                    >
                      #
                      {manga?.rankings?.[2]?.rank || "?"}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between h-[13rem]">
                    <h2 className="text-white font-semibold text-lg line-clamp-2">
                      {manga.title.english || manga.title.romaji}
                    </h2>
                    <p className="text-sm text-gray-300 line-clamp-3 my-2">
                      {manga.description?.replace(/<[^>]+>/g, "")}
                    </p>

                    <div className="flex justify-between items-center border-t border-gray-700 pt-3">
                      <div className="text-emerald-400 text-sm flex gap-3">
                        <span>{`${manga.chapters || "*"} Chap`}</span>
                        <span>{`${manga.volumes || "?"} Vol`}</span>
                      </div>
                      <button
                        className="bg-emerald-500 hover:bg-emerald-600 text-sm text-white px-3 py-1 rounded-md transition duration-300 shadow-md hover:scale-105"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </Card>
        );
}

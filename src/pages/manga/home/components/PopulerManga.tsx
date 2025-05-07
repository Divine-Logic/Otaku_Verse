import type { RefObject } from "react";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import type { PopularMangaProps } from "../../../../lib/types/MangaTypes.ts";

import Card from "../../../../component/atoms/Card.tsx";
import Loader from "../../../../component/atoms/Loader.tsx";
import SliderAnimation from "../../../../component/atoms/SliderAnimation.tsx";
import { usePopularManga } from "../../../../services/product/MangaApi";

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
                  className=""
                  onClick={() => {
                    navigate(`/manga/${manga.id}`);
                  }}
                >
                  <div className="relative  ">
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#001e25] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                    />
                    <img
                      src={manga.coverImage.large || manga.coverImage.medium}
                      alt={manga.title.romaji}
                      className="w-full h-[15rem] object-contain rounded-lg  "
                    />
                    <div
                      className="absolute top-3 right-3 bg-red-500 text-[#001e25] text-xs font-bold py-1 px-2 rounded-full"
                    >
                      {manga.status}
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="flex gap-8 text-lg text-center text-primary-500 ">

                      <div>

                        #
                        {manga?.rankings?.[2]?.rank}

                      </div>
                      {manga.title.english || manga.title.romaji}
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 h-16 overflow-hidden">
                      {manga.description?.replace(/<[^>]+>/g, "")}
                    </p>

                    <div
                      className="flex justify-between items-center pt-3 border-t border-emerald-100 "
                    >
                      <div className="flex  text-lg  gap-6 text-emerald-400">

                        <div>
                          {`${manga.chapters || "*"}
                  Chap`}
                        </div>

                        <div>
                          {`${manga.volumes || "?"}
                  Vol`}
                        </div>

                      </div>

                      <button
                        className="bg-[#38bb8c] hover:bg-[#115039] text-white text-sm font-medium py-1 px-3 rounded-md transition-colors duration-300 transform hover:scale-105"
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

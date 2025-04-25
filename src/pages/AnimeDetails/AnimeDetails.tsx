import { useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

import Card from "../../component/Card.tsx";
import Loader from "../../component/Loader.tsx";
import SliderAnimation from "../../component/SliderAnimation.tsx";
import { useTheme } from "../../hooks/useTheme.tsx";
import { useAnimeDetails } from "../../services/product/Api.ts";

function AnimeDetails() {
  const { isDark } = useTheme();
  const { id } = useParams();
  const { data, isLoading, isError } = useAnimeDetails(id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  console.log("this is animedetails", data);

  return (
    <Card className={`bg-transparent ${isDark ? "text-white" : "text-black"} px-4 sm:px-6 py-6`}>
      {isLoading
        ? (
            <Loader />
          )
        : isError
          ? (
              <div className="text-center text-red-500 mt-10">
                Failed to load anime details
              </div>
            )
          : (
              <div className="w-full mx-auto flex flex-col gap-[2rem]">

                <div className="w-full overflow-hidden rounded-lg">
                  {data?.trailer?.id
                    ? (
                        <ReactPlayer
                          url={`https://www.youtube.com/embed/${data.trailer.id}`}
                          playing={false}
                          width="100%"
                          pip={true}
                          className="rounded-lg overflow-hidden aspect-video"
                        />
                      )
                    : (
                        <img
                          src={data?.bannerImage || data?.coverImage?.large}
                          alt="Banner"
                          className="w-full h-48 md:h-[25rem] lg:h-[28rem] object-cover rounded-lg"
                        />
                      )}
                </div>

                <div className="flex flex-col md:flex-row gap-6 max-w-screen">

                  <img
                    src={data?.coverImage?.large}
                    alt={data?.title?.english}
                    className="w-full max-h-[25rem] md:max-h-full object-cover shadow-md mx-auto rounded-lg"
                  />

                  <div className="flex flex-col items-start justify-start gap-4 md:gap-5 w-full">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-Gothic text-primary-500 text-start">
                      {data?.title?.english || data?.title?.romaji}
                    </h1>

                    <div className="flex  items-start flex-col gap-2 sm:gap-4">
                      <p className="flex items-center gap-1 text-gray-400 text-sm sm:text-base md:text-lg font-bold">
                        {`Release Year: ${data?.seasonYear || "N/A"}`}
                      </p>
                      <p className="flex items-center gap-1 text-primary-500 text-sm sm:text-base md:text-lg">
                        <AiFillStar className="text-yellow-400" />
                        {`${data?.averageScore || "N/A"}/100`}
                      </p>
                      <p className="text-sm sm:text-base md:text-lg text-gray-400">
                        {`Episodes: ${data?.episodes || "N/A"}`}
                      </p>
                    </div>

                    <div
                      className="flex flex-col items-start  max-w-full sm:max-w-[55vw] xl:max-w-6xl overflow-x-auto rounded-lg mt-2"
                    >
                      <SliderAnimation
                        text="Cast"
                        scrollContainerRef={scrollContainerRef}
                        className="justify-between w-full text-xl md:text-2xl"
                      />

                      <div
                        ref={scrollContainerRef}
                        className="w-full overflow-x-auto no-scrollbar rounded-lg pb-2"
                      >
                        <div
                          className="flex gap-3 sm:gap-4 md:gap-6 min-w-max px-1 sm:px-2 rounded-lg w-full"
                        >
                          {data?.characters?.edges?.map((item: any) => (
                            <div
                              key={item?.node?.id}
                              className="flex flex-col items-center bg-primary-500 rounded-xl overflow-hidden transition-transform duration-300 w-28 sm:w-32 md:w-40 lg:w-48 h-auto"
                            >
                              <div
                                className="w-full h-36 sm:h-40 md:h-48 lg:h-56 overflow-hidden"
                              >
                                <img
                                  src={item?.node?.image?.large}
                                  alt={item?.node?.name?.full}
                                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 rounded-lg"
                                />
                              </div>
                              <div className="p-2 w-full text-center">
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white truncate">
                                  {item?.node?.name?.full || "Unknown"}
                                </h3>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex flex-wrap items-center gap-2 sm:gap-3 max-w-full font-bold text-base sm:text-lg text-gray-400 mt-2"
                    >
                      <span className="mr-1">Generation:</span>
                      {data?.genres?.map((genre: string, index: number) => (
                        <div
                          key={index}
                          className="bg-primary-500/80 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm"
                        >
                          {genre}
                        </div>
                      ))}
                    </div>

                    <p className="max-w-full mt-2 sm:mt-4 text-start font-Gothic text-sm sm:text-base md:text-lg">
                      {data?.description?.replace(/<[^>]+>/g, "")}
                    </p>
                  </div>
                </div>
              </div>
            )}
    </Card>
  );
}

export default AnimeDetails;

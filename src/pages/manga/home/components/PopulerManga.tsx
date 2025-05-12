import type { RefObject } from "react";

import { useRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";

import Card from "../../../../component/atoms/Card.tsx";
import MangaCard from "../../../../component/atoms/MangaCard.tsx";
import SliderAnimation from "../../../../component/atoms/SliderAnimation.tsx";
import { usePopularManga } from "../../../../services/product/apis/mangaApi/PopulerManga.ts";
import MangaSkeleton from "./MangaSkeleton.tsx";

export default function PopularManga() {
  const { data, isLoading, isError } = usePopularManga();
  const scrollContainerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  return isError
    ? (
        <p className="text-red-700">Not Found</p>
      )
    : (
        <Card className="bg-transparent gap-4 overflow-x-auto overflow-y-hidden no-scrollbar">
          <SliderAnimation
            scrollContainerRef={scrollContainerRef}
            text="Popular Manga"
            className="w-full text-xl md:text-4xl font-bold text-primary-500"
          />
          <div className="p-6 flex overflow-x-auto gap-8 no-scrollbar rounded-lg" ref={scrollContainerRef}>

            <div className="flex gap-5 items-center pr-10 bg-transparent">
              {isLoading
                ? Array.from({ length: 8 }).map((_, i) => <MangaSkeleton key={i} />)
                : data?.map((manga: any) => (
                  <MangaCard
                    key={manga.id}
                    id={manga.id}
                    coverImage1={manga.coverImage.large}
                    coverImage2={manga.coverImage.medium}
                    status={manga.status}
                    rank={manga?.rankings?.[2]?.rank}
                    title1={manga.title.english}
                    title2={manga.title.romaji}
                    description={manga.description}
                    chapters={manga.chapters}
                    volumes={manga.volumes}
                  />
                ))}

            </div>
          </div>
        </Card>

      );
}

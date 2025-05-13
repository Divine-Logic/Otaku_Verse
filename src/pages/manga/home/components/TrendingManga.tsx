import type { RefObject } from "react";

import { useEffect, useRef } from "react";

import Card from "../../../../component/atoms/Card";
import MangaCard from "../../../../component/atoms/MangaCard.tsx";
import MangaSkeleton from "../../../../component/atoms/MangaSkeleton.tsx";
import SliderAnimation from "../../../../component/atoms/SliderAnimation";
import { useTrendingManga } from "../../../../services/product/apis/mangaApi/TrendingManga.ts";

function RecommendedManga() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useTrendingManga();

  const scrollContainerRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const manga = data?.pages.flatMap(page => page.nodes) || [];
  console.log("this is Trending manga", manga);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "0px",
        threshold: 1.0,
      },
    );

    const loaderEl = loaderRef.current;
    if (loaderEl)
      observer.observe(loaderEl);

    return () => {
      if (loaderEl)
        observer.unobserve(loaderEl);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Card className="bg-transparent gap-4 overflow-x-auto overflow-y-hidden no-scrollbar">
      <SliderAnimation
        scrollContainerRef={scrollContainerRef}
        text="Recommnded Manga"
        className="w-full text-xl md:text-4xl font-bold text-primary-500"
      />
      <div className="p-6 flex overflow-x-auto gap-8 no-scrollbar rounded-lg" ref={scrollContainerRef}>

        <div className="flex gap-5 items-center pr-10 bg-transparent">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <MangaSkeleton key={i} />)
            : manga.map(manga => (
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
          {hasNextPage && <div ref={loaderRef} className="w-10 h-10 shrink-0" />}
        </div>
      </div>
    </Card>
  );
}

export default RecommendedManga;

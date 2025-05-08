import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import AnimeCard from "../../../../component/atoms/AnimeCard.tsx";
import SliderAnimation from "../../../../component/atoms/SliderAnimation.tsx";

function RecommendingAnime({
  data,
  text,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  data: any[];
  text: string;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const observer = useRef<IntersectionObserver>(null);

  const observeLoader = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage)
        return;
      if (observer.current)
        observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node)
        observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    if (loaderRef.current)
      observeLoader(loaderRef.current);
  }, [observeLoader]);

  return (
    <div className="flex flex-col gap-8 w-full">
      <SliderAnimation
        text={text}
        scrollContainerRef={scrollContainerRef}
        className="text-xl md:text-4xl font-bold text-primary-500"
      />

      <div
        className="flex gap-6 pb-4 w-full overflow-x-auto no-scrollbar"
        ref={scrollContainerRef}
      >
        {data?.map((item: any) => (
          <div
            key={item.mediaRecommendation.id}
            onClick={() => navigate(`/anime/${item.mediaRecommendation.id}`)}
            className="min-w-64 rounded-lg cursor-pointer relative group"
          >
            <AnimeCard
              img={item.mediaRecommendation.coverImage.large}
              title1={item.mediaRecommendation.title.english}
              title2={item.mediaRecommendation.title.romaji}
            />
          </div>
        ))}
        <div ref={loaderRef} className="min-w-64 flex justify-center items-center">
          {isFetchingNextPage && <span className="text-white">Loading...</span>}
        </div>
      </div>
    </div>
  );
}

export default RecommendingAnime;

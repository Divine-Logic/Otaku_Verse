import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import type { SliderAnimationTypes } from "../../lib/types/AnimeTypes";

function SimpleCreativeSlider({ text, scrollContainerRef, className = "" }: SliderAnimationTypes) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [_isScrolling, setIsScrolling] = useState(false);
  const [_progress, setProgress] = useState<number>(0);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsAtStart(scrollLeft <= 5);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 6);
      setProgress((scrollLeft / (scrollWidth - clientWidth)) * 100 || 0);
      // console.log(progress);

      if (scrollTimerRef.current)
        clearTimeout(scrollTimerRef.current);
      setIsScrolling(true);
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 500);
      // console.log(isScrolling);
    }
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -600, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 600, behavior: "smooth" });
  };

  useEffect(() => {
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      updateScrollState();
      scrollElement.addEventListener("scroll", updateScrollState);
      window.addEventListener("resize", updateScrollState);

      observerRef.current = new MutationObserver(() => {
        setTimeout(updateScrollState, 100);
      });

      observerRef.current.observe(scrollElement, {
        childList: true,
        subtree: true,
        attributes: true,
      });

      return () => {
        scrollElement.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
        observerRef.current?.disconnect?.();
        if (scrollTimerRef.current)
          clearTimeout(scrollTimerRef.current);
      };
    }
  }, []);

  return (
    <div className={`flex justify-between items-center ${className}`}>
      <h2>{text}</h2>
      <div className="md:flex hidden items-center gap-2">
        <button
          onClick={scrollLeft}
          disabled={isAtStart}
          className={`z-10 rounded-full p-2 cursor-pointer hover:bg-gray-600/10 ${isAtStart ? "opacity-50 disabled" : ""}`}
        >
          <MdKeyboardArrowLeft
            size={30}
            className={`text-2xl ${isAtStart ? "text-gray-400" : "hover:text-primary-500/80"}`}
          />
        </button>
        <button
          onClick={scrollRight}
          disabled={isAtEnd}
          className={`z-10 rounded-full p-2 cursor-pointer hover:bg-gray-600/10 ${isAtEnd ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <MdKeyboardArrowRight
            size={30}
            className={`text-2xl ${isAtEnd ? "text-gray-400" : "hover:text-primary-500/80"}`}
          />
        </button>
      </div>
    </div>
  );
}

export default SimpleCreativeSlider;

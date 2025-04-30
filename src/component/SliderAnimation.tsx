import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import type { SliderAnimationTypes } from "../lib/types/Types.ts";

function SliderAnimation({ text, scrollContainerRef, className }: SliderAnimationTypes) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const updateArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  useEffect(() => {
    updateArrows();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateArrows);
      window.addEventListener("resize", updateArrows);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateArrows);
        window.removeEventListener("resize", updateArrows);
      }
    };
  }, [scrollContainerRef]);

  return (
    <div className={`flex justify-between items-center ${className}`}>
      <h1>{`${text}`}</h1>
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

export default SliderAnimation;

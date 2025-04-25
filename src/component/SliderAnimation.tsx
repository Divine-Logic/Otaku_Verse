import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import type { SliderAnimationTypes } from "../lib/types/types.ts";

function SliderAnimation({ text, scrollContainerRef, className }: SliderAnimationTypes) {
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

  return (
    <div
      className={`flex  justify-between ${className}`}
    >
      <h1>
        {`${text}`}
      </h1>
      <div className="md:block hidden">
        <button
          onClick={scrollLeft}
          className="z-10  hover:bg-gray-600/10  rounded-full p-2 cursor-pointer"
        >
          <MdKeyboardArrowLeft size={30} className="hover:text-primary-500/80 text-2xl" />
        </button>
        <button
          onClick={scrollRight}
          className="z-10  hover:bg-gray-600/10  rounded-full p-2 cursor-pointer text-4xl"
        >
          <MdKeyboardArrowRight size={30} className="hover:text-primary-500/80 " />
        </button>
      </div>
    </div>
  );
}

export default SliderAnimation;

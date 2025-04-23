import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { useTheme } from "../hooks/useTheme.tsx";

function SliderAnimation({ text, scrollContainerRef }: {
  text: string;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}) {
  const { isDark } = useTheme();
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`flex  justify-between ${isDark ? "text-white" : "text-black"}`}
    >
      <h1 className="text-xl md:text-3xl font-Gothic">
        {`${text} Anime`}
      </h1>
      <div className="md:block hidden">
        <button
          onClick={scrollLeft}
          className="z-10  hover:bg-gray-600/10  rounded-full p-2 cursor-pointer"
        >
          <MdKeyboardArrowLeft size={30} />
        </button>
        <button
          onClick={scrollRight}
          className="z-10  hover:bg-gray-600/10  rounded-full p-2 cursor-pointer "
        >
          <MdKeyboardArrowRight size={30} />
        </button>
      </div>
    </div>
  );
}

export default SliderAnimation;

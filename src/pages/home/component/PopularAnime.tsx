import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Card from "../../../component/Card.tsx";

function PopularAnime({ data }: { data: any }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

  const slide = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => {
      const newIndex = prev + dir;
      if (newIndex >= data.length)
        return 0;
      if (newIndex < 0)
        return data.length - 1;
      return newIndex;
    });
  };
  useEffect(() => {
    if (!data || data.length === 0)
      return;

    const interval = setInterval(() => {
      if (isAutoPlaying) {
        slide(1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [data, isAutoPlaying]);

  const handleManualSlide = (dir: number) => {
    slide(dir);
    setIsAutoPlaying(false);
    if (pauseTimeout.current)
      clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const anime = data[index];

  return (
    <Card className="w-full h-[65vh] relative overflow-hidden rounded-xl bg-transparent">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={anime.id}
          initial={{ x: direction > 0 ? "100%" : "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: direction > 0 ? "-100%" : "100%" }}
          transition={{ duration: 0.8 }}
          onClick={() => navigate(`/anime/${anime.id}`)}
          className="absolute w-full h-full"
        >
          <img
            src={anime.coverImage.large}
            alt={anime.title.english || anime.title.romaji}
            className="absolute block sm:hidden w-full h-full object-cover brightness-[0.5] rounded-lg"
          />

          <img
            src={anime.bannerImage}
            alt={anime.title.english || anime.title.romaji}
            className="absolute hidden sm:block w-full h-full object-cover brightness-[0.5]"
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute flex flex-col items-start px-6 sm:px-12 text-white max-w-2xl gap-[1rem] sm:mt-[15rem] mt-[18rem]"
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl sm:text-4xl font-bold drop-shadow mb-2"
            >
              {anime.title.english || anime.title.romaji}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-start text-sm sm:text-base drop-shadow line-clamp-3"
            >
              {anime.description.replace(/<[^>]+>/g, "")}
            </motion.p>

            <motion.a
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              href={`/anime/${anime.id}`}
              className="inline-block bg-primary-500 px-4 py-2 rounded-lg text-white w-fit hover:bg-primary-500/80 transition-colors"
            >
              View Details
            </motion.a>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleManualSlide(-1);
          }}
          className="bg-primary-500/40 hover:bg-primary-500/60 p-2 rounded-full text-white"
        >
          <MdKeyboardArrowLeft size={20} />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleManualSlide(1);
          }}
          className="bg-primary-500/40 hover:bg-primary-500/60 p-2 rounded-full text-white"
        >
          <MdKeyboardArrowRight size={20} />
        </button>
      </div>
    </Card>
  );
}

export default PopularAnime;

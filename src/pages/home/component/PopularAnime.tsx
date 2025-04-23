import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Card from "../../../component/Card.tsx";

function PopularAnime({ data }: { data: any }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying] = useState(true);

  useEffect(() => {
    if (!data || data.length === 0)
      return;

    const interval = setInterval(() => {
      if (isAutoPlaying) {
        setIndex((prev) => {
          const nextIndex = prev + direction;

          if (nextIndex >= data.length) {
            setDirection(-1);
            return prev - 1;
          }
          else if (nextIndex < 0) {
            setDirection(1);
            return prev + 1;
          }
          return nextIndex;
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [data, direction]);

  const anime = data[index];

  return (
    <Card className="w-full h-[65vh] relative overflow-hidden rounded-xl bg-transparent">
      <AnimatePresence mode="sync">
        <motion.div
          key={anime.id}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 1 }}
          className="absolute  w-full h-full "
        >
          <img
            src={anime.coverImage.large}
            alt={anime.title.english || anime.title.romaji}
            className="absolute block md:hidden w-full h-full object-cover brightness-[0.5] rounded-lg"
          />

          <img
            src={anime.bannerImage}
            alt={anime.title.english || anime.title.romaji}
            className="absolute hidden md:block w-full h-full object-cover brightness-[0.5]"
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute flex flex-col items-start  px-6 sm:px-12 text-white max-w-2xl  gap-[1rem] mt-[18rem]"
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
              className="text-start text-sm sm:text-base drop-shadow line-clamp-3 "
            >
              {anime.description}
            </motion.p>

            <motion.a
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              href={`/anime/${anime.id}`}
              className=" inline-block bg-primary-500 px-4 py-2 rounded text-white w-fit hover:bg-primary-500/80 transition-colors"
            >
              View Details
            </motion.a>
          </motion.div>
        </motion.div>
      </AnimatePresence>

    </Card>
  );
}

export default PopularAnime;

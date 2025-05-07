import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

import type { SearchAnimeCardProps } from "../../lib/types/AnimeTypes.ts";

function SearchAnimeCard({ img, handleCardClick, title1, title2, rating, genration }: SearchAnimeCardProps) {
  const [showAllGenres, setShowAllGenres] = useState(false);

  const genreList = 4;
  const MoreGenres = genration && genration.length > genreList;

  const displayGenres = showAllGenres && genration ? genration : genration?.slice(0, genreList);

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-white/10 rounded-xl cursor-pointer transition-all duration-300 border border-transparent hover:border-white/10 relative overflow-hidden   "
    >

      <div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:via-primary-500/10 group-hover:to-primary-500/5 transition-all duration-500 no-scrollbar"
      />

      <div
        className="relative w-full sm:w-[140px] h-[180px] sm:h-[100px] rounded-lg overflow-hidden shadow-lg flex-shrink-0 "
      >
        <img
          src={img}
          alt={title1 || title2 || "Anime cover"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      <div className="flex flex-col text-start ">

        <div className="space-y-2">
          <h3 className="font-medium sm:text-lg group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
            {title1 || title2}
          </h3>

          {rating && (
            <div className="flex items-center gap-2">
              <span className="flex items-center text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full text-sm">
                <AiFillStar className="mr-1" />
                {rating}
              </span>
            </div>
          )}
        </div>

        <div className="mt-2 sm:mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {displayGenres?.map(genre => (
              <span
                key={genre}
                className="px-2 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-105"
              >
                {genre}
              </span>
            ))}

            {!showAllGenres && MoreGenres && (
              <button
                className="px-2 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllGenres(true);
                }}
              >
                +
                {genration.length - genreList}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchAnimeCard;

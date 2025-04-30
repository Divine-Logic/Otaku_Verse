import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

import type { SearchAnimeCardProps } from "../lib/types/Types.ts";

function SearchAnimeCard({ img, handleCardClick, title1, title2, rating, genration }: SearchAnimeCardProps) {
  const [showAllGenres, setShowAllGenres] = useState(false);

  const genreList = 4;
  const MoreGenres = genration.length > genreList;

  const displayGenres = showAllGenres ? genration : genration.slice(0, genreList);

  return (
    <div
      onClick={handleCardClick}
      className="flex gap-8 items-center p-2 hover:bg-primary-500/50 rounded-lg cursor-pointer "
    >
      <img
        src={img}
        alt="Not Found"
        className="min-h-[5rem] min-w-[10rem] max-h-[8rem] max-w-[10rem] object-cover rounded-md shadow-sm "
      />
      <div className="flex flex-col text-start max-w-lg">
        <h3 className="font-medium">{title1 || title2}</h3>
        <div className="flex flex-col items-start">
          {rating
            ? (
                <span className="flex items-center text-yellow-400">
                  <AiFillStar className="mr-1" />
                  {rating}
                </span>
              )
            : ""}

          <div className="flex flex-wrap gap-1.5 mt-1">
            {displayGenres.map(genre => (
              <span
                key={genre}
                className="px-2 py-2 text-xs bg-primary-500 rounded-full cursor-pointer"
              >
                {genre}
              </span>
            ))}

            {!showAllGenres && MoreGenres && (
              <div
                className="px-2 py-2 text-xs bg-primary-500  rounded-full cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllGenres(true);
                }}
              >
                +
                {genration.length - genreList}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchAnimeCard;

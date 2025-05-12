import { FaStar } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { MdOutlineFavorite } from "react-icons/md";

import type { DetailsPartProps } from "../../lib/types/AnimeTypes.ts";

function DetailsPart({
  coverImage,
  englishTitle,
  romajiTitle,
  nativeTitle,
  genration,
  averageScore,
  popularity,
  favourites,
  status,
  format,
  isDark,
  volumes,
  chapters,
}: DetailsPartProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/4 flex justify-center md:block">
        <img
          src={coverImage}
          alt="Not Found"
          className="rounded-lg shadow-lg  w-48 md:w-[20rem] object-cover"
        />
      </div>
      <div
        className="w-full md:w-3/4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center sm:text-left text-primary-500">{englishTitle || romajiTitle}</h1>
        <p className="text-primary-500 mb-4 italic text-center md:text-left">{nativeTitle}</p>
        <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
          {genration?.map((genre: any) => (
            <div
              key={genre}
              className="bg-primary-600 px-3 py-1 rounded-full text-xs sm:text-sm"
            >
              {genre}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
          <div
            className="flex items-center gap-2 text-yellow-400 justify-center md:justify-start"
          >
            <FaStar />
            <span>{averageScore / 10}</span>
          </div>
          <div
            className="flex items-center gap-2 text-orange-400 justify-center md:justify-start"
          >
            <ImFire />
            <span>{popularity}</span>
          </div>
          <div
            className="flex items-center gap-2 text-red-500 justify-center md:justify-start"
          >
            <MdOutlineFavorite />
            <span>{favourites}</span>
          </div>
        </div>
        <div className="flex  gap-[10rem]">
          <div
            className={`flex flex-col gap-[2rem] ${isDark ? "text-white" : "text-primary-600"}   `}
          >
            <div>
              <p className="text-primary-500">Status</p>
              <p className="font-medium ">{status}</p>
            </div>
            <div>
              <p className="text-primary-500">Format</p>
              <p className="font-medium">{format}</p>
            </div>
          </div>
          <div className="flex flex-col gap-[2rem]">
            <div>
              <p className="text-primary-500">Chapters</p>
              <p
                className="font-medium"
              >
                {chapters ?? "N/A"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-primary-500"> Vol.</p>
              <p>
                {volumes ?? "N/A"}
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPart;

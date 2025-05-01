import { get } from "lodash";

import type { DynamicCharacterCardProps } from "../../../lib/types/Types";

function CharacterCard({ data, keys, onClick }: DynamicCharacterCardProps) {
  const animeId = keys.id ? get(data, keys.id) : undefined;
  const title
        = get(data, keys.titleEnglish) || get(data, keys.titleRomaji) || "";
  const coverImage = get(data, keys.coverImage) || "/api/placeholder/180/270";
  const voiceActorImage = get(data, keys.voiceActorImage);
  const voiceActorName = get(data, keys.voiceActorName);

  return (
    <div
      onClick={() => onClick(animeId)}
      className="flex flex-col sm:flex-row w-full rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:scale-[1.02] bg-primary-500 hover:bg-primary-500/70"
    >
      <div className="relative sm:w-32 md:w-40 h-48 sm:h-auto">
        <img
          src={coverImage}
          alt="Not Found"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:hidden"></div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between w-full">
        <div className="flex-1 flex items-center">
          <h3 className="font-bold text-white text-lg md:text-xl line-clamp-2 sm:pr-4 mx-auto">
            {title}
          </h3>
        </div>

        {voiceActorImage && voiceActorName && (
          <div className="flex justify-around sm:justify-between items-center flex-row sm:flex-col h-full">
            <img
              src={voiceActorImage}
              alt={voiceActorName || "Not Found"}
              className="object-cover h-[4rem] w-[4rem] sm:h-[9rem] sm:w-[8rem] sm:rounded-none rounded-full border-2 border-primary-500"
            />
            <p className="text-xs md:text-sm font-medium text-white text-center my-auto">
              {voiceActorName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterCard;

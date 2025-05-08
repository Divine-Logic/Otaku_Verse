import { FaStar } from "react-icons/fa";

import type { AnimeCardtype } from "../../lib/types/AnimeTypes.ts";

function AnimeCard({ img, episodes, score, title1, title2 }: AnimeCardtype) {
  return (
    <div
      className="w-[15rem] h-[21.125rem] relative group overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-500 hover:scale-[0.97]"

    >
      <div className="absolute inset-0">
        <img
          src={img}
          alt={title1 || title2 || "animeQuery cover"}
          className="w-full h-full object-cover "
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80" />

      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-6 transition-transform duration-500 group-hover:translate-y-0 translate-y-3"
      >
        <h2 className="text-white text-lg font-semibold truncate mb-2 drop-shadow-md">
          {title1 || title2}
        </h2>
        <div className="flex justify-between items-center text-white text-sm">
          {episodes && (
            <p className="bg-primary-500/90 px-3 py-1 rounded-full font-medium shadow-md backdrop-blur">
              {` ${episodes} EP`}
            </p>
          )}
          {score && (
            <div
              className=" flex items-center text-yellow-400 gap-1"
            >
              <FaStar />
              {score / 10}
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />
    </div>
  );
}

export default AnimeCard;

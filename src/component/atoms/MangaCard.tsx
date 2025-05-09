import { useNavigate } from "react-router-dom";

import type { MangaCardProps } from "../../lib/types/MangaTypes.ts";

function MangaCard({
  id,
  coverImage1,
  coverImage2,
  status,
  rank,
  title1,
  title2,
  description,
  chapters,
  volumes,
}: MangaCardProps) {
  const navigate = useNavigate();
  return (
    <div
      key={id}
      onClick={() => navigate(`/manga/${id}`)}
      className="group w-64 min-w-[16rem] bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] rounded-xl  overflow-hidden"
    >
      <div className="relative">
        <img
          src={coverImage1 || coverImage2}
          alt="not found"
          className="w-full h-[15rem] object-cover rounded-t-xl group-hover:brightness-75 transition-all duration-300"
        />
        <div
          className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[0.7rem] font-semibold py-1 px-3 rounded-full shadow-md"
        >
          {status}
        </div>
        <div
          className="absolute top-3 right-3 bg-primary-700/70 text-emerald-400 text-xl font-bold py-1 px-2 rounded-md"
        >
          #
          {rank || "?"}
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between h-[13rem]">
        <h2 className="text-white font-semibold text-lg line-clamp-2">
          {title1 || title2}
        </h2>
        <p className="text-sm text-gray-300 line-clamp-3 my-2">
          {description?.replace(/<[^>]+>/g, "")}
        </p>
        <div className="flex justify-between items-center border-t border-gray-700 pt-3">
          <div className="text-emerald-400 text-sm flex gap-3">
            <span>{`${chapters || "*"} Chap`}</span>
            <span>{`${volumes || "?"} Vol`}</span>
          </div>
          <button
            className="bg-emerald-500 hover:bg-emerald-600 text-sm text-white px-3 py-1 rounded-md transition duration-300 shadow-md hover:scale-105"
            onClick={() => {
              navigate(`/manga/${id}`);
            }}
          >

            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default MangaCard;

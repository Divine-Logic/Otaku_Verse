import { useNavigate } from "react-router-dom";

import type { RelatedCardProps } from "../../lib/types/MangaTypes.ts";

function RelatedDetailsCard({
  key,
  id,
  img,
  title1,
  title2,
  status,
  type,
}: RelatedCardProps) {
  const navigate = useNavigate();
  return (
    <div
      key={key}
      className="group relative cursor-pointer rounded-3xl overflow-hidden bg-[#1a1a2e]  transition-transform duration-500 hover:scale-105"
      onClick={() => {
        navigate(`/manga/${id}`);
      }}
    >
      <div className="relative">
        <img
          src={img}
          alt="not found"
          className="w-full h-64 object-fill rounded-t-3xl group-hover:brightness-110 transition duration-500"
        />

        <div
          className="absolute top-3 left-3 z-10 bg-primary-500/80 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 text-[10px] uppercase tracking-widest text-white font-bold shadow-md"
        >
          {type}
        </div>

      </div>

      <div
        className="px-5 py-4 bg-black/60 backdrop-blur-md rounded-b-3xl text-white space-y-1 transition duration-300 group-hover:bg-black/70"
      >
        <h2 className="text-2xl font-extrabold leading-tight text-primary-500 drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)] tracking-wide">
          {title1 || title2}
        </h2>
        <p className="text-sm text-white/70  tracking-wide">{status}</p>
      </div>

    </div>

  );
}

export default RelatedDetailsCard;

import type { Props } from "../lib/types/types.ts";

import Card from "./Card.tsx";

function AnimeCard({ data }: Props) {
  return (
    <Card className="w-[15rem] h-[21.125rem] relative group">
      <img
        src={data?.coverImage?.large}
        alt={data?.title?.romaji}
        className="rounded-xl w-[15rem] h-[21.125rem] "
      />
      <div

        className="flex md:hidden group-hover:flex flex-col absolute w-full bottom-0 text-white rounded-t-xl bg-gradient-to-t  from-black/100 via-black/70  to-black/20 h-[5rem]
          "
      >
        <h2 className="text-lg font-bold truncate max-w-[10rem] text-center mx-auto">{data?.title?.romaji}</h2>
        <p>
          Episodes:
          {data?.episodes ?? "N/A"}
        </p>
        <p>
          Score:
          {data?.averageScore ?? "N/A"}
        </p>

      </div>
    </Card>

  );
}

export default AnimeCard;

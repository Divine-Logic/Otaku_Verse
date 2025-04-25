import type { Props } from "../lib/types/types.ts";

import Card from "./Card.tsx";

function AnimeCard({ data }: Props) {
  return (
    <Card
      className="w-[15rem] h-[21.125rem] relative group"

    >
      <img
        src={data?.coverImage?.large}
        alt={data?.title?.romaji}
        className="rounded-xl w-[15rem] h-[21.125rem] "
      />
      <div

        className="flex lg:hidden group-hover:flex flex-col absolute w-full bottom-0 text-white rounded-xl bg-gradient-to-t   from-primary-500/100 via-primary-500/70  to-primary-500/20 h-[5rem]"
      >
        <h2 className="text-lg font-bold truncate max-w-[10rem] text-center mx-auto">{data?.title?.english || data?.title?.romaji}</h2>
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

import type { AnimeCardtype } from "../lib/types/Types.ts";

import Card from "./Card.tsx";

function AnimeCard({ img, episodes, score, title1, title2 }: AnimeCardtype) {
  return (
    <Card
      className="w-[15rem] h-[21.125rem] relative group"

    >
      <img
        src={img}
        alt="Not Found"
        className="rounded-xl w-[15rem] h-[21.125rem] "
      />
      <div

        className="flex lg:hidden group-hover:flex flex-col absolute w-full bottom-0 text-white rounded-xl bg-gradient-to-t   from-primary-500/100 via-primary-500/70  to-primary-500/20 h-[5rem] items-center justify-center  "
      >
        {title1 || title2
          ? (
              <h2 className="text-lg font-bold truncate max-w-[10rem] text-center mx-auto">{title1 || title2}</h2>)
          : ""}
        {episodes
          ? (
              <p>
                {`   Episodes :${episodes}`}
              </p>
            )
          : ""}

        {score
          ? (
              <p>
                {` Score:  ${score}`}
              </p>
            )
          : " "}

      </div>
    </Card>

  );
}

export default AnimeCard;

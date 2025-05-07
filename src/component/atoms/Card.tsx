import classNames from "classnames";

import type { cardtype } from "../../lib/types/AnimeTypes.ts";

function Card({ className, children }: cardtype) {
  return (
    <div
      className={classNames("bg-gray-200/50 rounded-lg text-center flex flex-col w-full", className)}
    >
      {children}
    </div>

  );
}

export default Card;

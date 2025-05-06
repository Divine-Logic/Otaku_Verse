import classNames from "classnames";

import type { cardtype } from "../../lib/types/Types.ts";

function Card({ className, children }: cardtype) {
  return (
    <div
      className={classNames("bg-gray-200/50 rounded-2xl text-center flex flex-col items-center", className)}
    >
      {children}
    </div>

  );
}

export default Card;

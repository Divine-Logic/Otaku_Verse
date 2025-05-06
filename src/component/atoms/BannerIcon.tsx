import classNames from "classnames";
import { motion } from "framer-motion";

import type { IconActionButtonProps } from "../../lib/types/Types.ts";

function BannerIcon({
  isActive = false,
  onClick,
  activeClassName,
  inactiveClassName,
  icon,
}: IconActionButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={classNames(
        "p-3 rounded-full backdrop-blur-sm transition-colors hover:cursor-pointer",
        isActive ? activeClassName : inactiveClassName,
      )}
    >
      {icon}
    </motion.button>
  );
}

export default BannerIcon;

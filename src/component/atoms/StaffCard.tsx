import { motion } from "framer-motion";
import { memo } from "react";

import { classNames } from "../../utils/classNames.ts";

export const StaffCard = memo(({
  img,
  englishName,
  nativeName,
  role,

  isDark,
}: {
  img: string;
  nativeName: string;
  englishName: string;
  role: string;
  index: number;
  isDark: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.005, y: -1 }}
    className={classNames(
      "relative min-w-full sm:min-w-[24rem] flex items-center gap-4 p-5 rounded-2xl backdrop-blur-md shadow-lg overflow-hidden group transition-all duration-300",
      isDark
        ? "bg-gradient-to-br from-[#001e25] to-[#115039] hover:shadow-[0_0_20px_#38bb8c40]"
        : "bg-gradient-to-br from-[#e6fdf4] to-[#c9f7e4] hover:shadow-[0_0_20px_#38bb8c40]",
    )}
  >
    <div className="relative w-25 h-25 flex-shrink-0">
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#38bb8c] via-[#115039] to-[#001e25] animate-spin-slow blur-md opacity-30"
      />
      <div className={classNames(
        "absolute inset-0 rounded-full",
        isDark ? "bg-white/10" : "bg-[#38bb8c]/10",
      )}
      />
      <img
        src={img}
        alt="Not found"
        className="w-full h-full rounded-xl object-cover relative z-10 border-2 border-white group-hover:border-[#38bb8c]"
        loading="lazy"
      />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className={classNames(
        "text-lg font-bold tracking-wide truncate",
        isDark ? "text-[#38bb8c]" : "text-primary-600",
      )}
      >
        <p>{englishName}</p>
        <p>
          {nativeName}
        </p>
      </h4>
      <p className={classNames(
        "text-sm italic truncate",
        isDark ? "text-white/70" : "text-[#001e25]/70",
      )}
      >
        {role}
      </p>
    </div>
  </motion.div>
));

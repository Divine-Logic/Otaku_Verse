import { motion } from "framer-motion";
import { memo } from "react";

import { classNames } from "../../../../utils/classNames.ts";

export const StaffCard = memo(({
  staff,
  index,
  isDark,
}: {
  staff: any;
  index: number;
  isDark: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02, y: -5 }}
    className={classNames(
      "flex items-center gap-4 p-4 backdrop-blur-sm rounded-xl transition-all duration-300",
      isDark ? "bg-white/10 hover:shadow-white/20" : "bg-primary-500/10 hover:shadow-primary-500/20",
    )}
  >
    <div className="relative w-16 h-16 flex-shrink-0">
      <div className={classNames(
        "absolute inset-0 rounded-full",
        isDark ? "bg-white/20" : "bg-primary-500/20",
      )}
      />
      <img
        src={staff?.node?.image?.large}
        alt={staff?.node?.name?.full}
        className="w-full h-full rounded-full object-cover relative z-10"
        loading="lazy"
      />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className={classNames(
        "font-semibold truncate",
        isDark ? "text-white" : "text-primary-700",
      )}
      >
        {staff?.node?.name?.full}
      </h4>
      <p className={classNames(
        "text-sm truncate",
        isDark ? "text-white/60" : "text-primary-700/60",
      )}
      >
        {staff?.role}
      </p>

    </div>
  </motion.div>
));

import classNames from "classnames";
import { motion } from "framer-motion";

import type { CharacterCardArgs } from "../../../../lib/types/Types.ts";

export default function CharacterCard({ data, isDark, handleOpenCharacterModal }: CharacterCardArgs) {
  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {data?.characters?.edges?.map((item: any, index: number) => (
        <motion.div
          key={item?.node?.id || index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className={classNames(
            "flex flex-col backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg",
            isDark
              ? "bg-white/10 hover:shadow-white/50"
              : "bg-primary-500/10 hover:shadow-primary-500/50",
          )}
          onClick={() => handleOpenCharacterModal(item?.node?.id)}
        >
          <div className="relative h-64 overflow-hidden">
            <div className={classNames(
              "absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent",
            )}
            />
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.1 }}
              src={item?.node?.image?.large}
              alt={item?.node?.name?.full}
              className="w-full h-full object-cover transition-transform duration-500 absolute"
            />

          </div>

          <h3 className={classNames(
            "text-lg font-semibold truncate p-4  ",
            isDark ? "text-white" : "text-primary-700",
          )}
          >
            {item?.node?.name?.full || "Unknown"}
          </h3>

        </motion.div>
      ))}
    </motion.div>

  );
}

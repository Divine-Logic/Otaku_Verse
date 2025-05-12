import classNames from "classnames";
import { motion } from "framer-motion";

import type { CharacterCardArgs } from "../../lib/types/AnimeTypes.ts";

export default function CharacterCard({
  id,
  role,
  coverImage1,
  englishName,
  nativeName,
  isDark,
  handleOpenCharacterModal,
}: CharacterCardArgs) {
  return (

    <motion.div
      key={id}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={classNames(
        "flex flex-col backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 cursor-pointer shadow-lg  h-[170px] w-[150px]   sm:h-[316px]  sm:w-[280px]    ",
        isDark
          ? "bg-white/10 hover:shadow-white/50"
          : "bg-primary-500/10 hover:shadow-primary-500/50",
      )}
      onClick={() => handleOpenCharacterModal(id)}
    >
      <div className="relative h-64 overflow-hidden">
        <div className={classNames(
          "absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent",
        )}
        />
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.1 }}
          src={coverImage1}
          alt="Not Found"
          className="w-full h-full object-cover transition-transform duration-500 absolute"
        />

      </div>

      <div className={classNames(
        "text-xl mx-auto font-semibold truncate p-4  text-primary-500 flex flex-col items-center justify-center",
      )}
      >
        {role && (
          <p>
            {role}
          </p>
        )}
        {englishName && (
          <p>
            {englishName}
          </p>
        )}
        {nativeName && (
          <p>

            {nativeName || "Unknown"}
          </p>
        )}
      </div>

    </motion.div>

  );
}

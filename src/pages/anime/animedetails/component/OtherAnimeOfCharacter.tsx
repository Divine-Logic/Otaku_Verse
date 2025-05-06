import { motion } from "framer-motion";
import { get } from "lodash";
import { FaStar } from "react-icons/fa";

import type { DynamicCharacterCardProps } from "../../../../lib/types/Types.ts";

import { useTheme } from "../../../../hooks/useTheme.tsx";

function CharacterCard({ data, keys, onClick }: DynamicCharacterCardProps) {
  const { isDark } = useTheme();
  const animeId = keys.id ? get(data, keys.id) : undefined;
  const title = get(data, keys.titleEnglish) || get(data, keys.titleRomaji) || "";
  const coverImage = get(data, keys.coverImage) || "/api/placeholder/180/270";
  const voiceActorImage = keys.voiceActorImage ? get(data, keys.voiceActorImage) || "" : "";
  const voiceActorName = keys.voiceActorName ? get(data, keys.voiceActorName) || "" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(animeId)}
      className={`relative group flex flex-col sm:flex-row w-full rounded-xl overflow-hidden cursor-pointer
        ${isDark ? "bg-gray-900/80" : "bg-white/90"} backdrop-blur-sm
        shadow-lg hover:shadow-xl transition-all duration-300
        border border-transparent hover:border-primary-500/30`}
    >

      <div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
      />

      <div className="relative sm:w-32 md:w-40 h-48 sm:h-auto overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          src={coverImage}
          alt="Anime Cover"
          className="object-cover w-full h-full"
        />

      </div>

      <div className="flex flex-col sm:flex-row justify-between w-full p-4">

        <div className="flex-1 flex items-center">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`font-bold text-lg md:text-xl line-clamp-2 sm:pr-4 mx-auto
              ${isDark ? "text-white" : "text-gray-900"}
              `}
          >
            {title}
          </motion.h3>
        </div>

        {voiceActorImage && voiceActorName && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-2 sm:ml-4"
          >

            <img
              src={voiceActorImage}
              alt={voiceActorName}
              className="relative object-cover h-16 w-16 sm:h-20 sm:w-20 rounded-lg border-2 border-white/20"
            />

            <div className="flex flex-col items-center">
              <p className={`text-sm font-medium text-center
                ${isDark ? "text-white" : "text-gray-900"}`}
              >
                {voiceActorName}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <FaStar className="text-yellow-400 text-xs" />
                <span className="text-xs text-gray-400">Voice Actor</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.div>
  );
}

export default CharacterCard;

import classNames from "classnames";
import { motion } from "framer-motion";

type Props = {
  data: any;
  isDark: boolean;
};

export default function OverviewCard({ data, isDark }: Props) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={classNames(
          "backdrop-blur-sm p-6 rounded-xl",
          isDark ? "bg-white/10" : "bg-primary-500/10",
        )}
      >
        <h3 className={classNames(
          "text-xl font-semibold mb-4",
          isDark ? "text-white" : "text-primary-700",
        )}
        >
          Description
        </h3>
        <p className={classNames(
          "leading-relaxed text-start",
          isDark ? "text-white/90" : "text-primary-700/90",
        )}
        >
          {data?.description?.replace(/<[^>]+>/g, "")}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className={classNames(
          "text-xl font-semibold",
          isDark ? "text-white" : "text-primary-700",
        )}
        >
          Genres
        </h3>
        <div className="flex flex-wrap gap-2">
          {data?.genres?.map((genre: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={classNames(
                "px-4 py-2 rounded-full text-sm",
                isDark ? "bg-white/20 text-white" : "bg-primary-500/20 text-primary-700",
              )}
            >
              {genre}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {data?.tags?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className={classNames(
            "text-xl font-semibold",
            isDark ? "text-white" : "text-primary-700",
          )}
          >
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={classNames(
                  "px-3 py-1 rounded-full text-xs",
                  isDark ? "bg-white/10 text-white/80" : "bg-primary-500/10 text-primary-700/80",
                )}
              >
                {tag.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

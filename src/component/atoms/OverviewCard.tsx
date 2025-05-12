import type { OverviewCardProps } from "../../lib/types/AnimeTypes.ts";

import StatusChart from "./StatusChart.tsx";

export default function OverviewCard({ description, externalLinks, statusDistribution, isDark }: OverviewCardProps) {
  return (
    <div
      className={`flex flex-col gap-6  p-4 rounded-lg   text-start  ${isDark ? "bg-primary-600/50" : "bg-primary-700/50"}  `}
    >
      <h2 className="text-2xl font-semibold mb-6 text-primary-500">Description</h2>
      <div
        className="text-zinc-300 text-sm sm:text-base"
      >
        {description?.replace(/<[^>]+>/g, "")}
      </div>
      <h2 className="text-2xl font-semibold text-primary-500">External Links</h2>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {externalLinks.map((link: string | any, index: number) => (
          <div key={index}>
            <a
              key={link?.url}
              href={link?.url}
              target="_blank"
              rel="noreferrer"
              className={` hover:bg-primary-600 px-3 py-2 sm:px-4 rounded-r-md text-xs sm:text-sm flex items-center gap-4 rounded-md`}
              style={link?.color ? { backgroundColor: link.color } : { backgroundColor: "#38bb8c" }}
            >
              {link?.icon && (
                <img
                  src={link?.icon}
                  alt=""
                  className="h-[1rem] w-[1rem] rounded-lg "
                />
              )}
              {link?.site}
            </a>
          </div>
        ))}
      </div>
      <div className="h-[15rem] w-[25rem] ">
        <h2 className="text-2xl font-semibold mb-6 text-primary-500">
          Watcher's Details
        </h2>
        <StatusChart statusData={statusDistribution} />
      </div>
    </div>
  );
}

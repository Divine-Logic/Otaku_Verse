import type { OverviewCardProps } from "../../lib/types/AnimeTypes.ts";

import StatusChart from "./StatusChart.tsx";

export default function OverviewCard({ description, externalLinks, statusDistribution, isDark }: OverviewCardProps) {
  const parsedStatus = JSON.parse(statusDistribution);

  console.log("OverviewCard", statusDistribution);
  return (
    <div
      className={`flex flex-col gap-6 p-4 rounded-lg text-start ${isDark ? "bg-primary-600/50" : "bg-primary-700/50"}`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-primary-500">Description</h2>
      <div className="text-white text-sm sm:text-lg">
        {description?.replace(/<[^>]+>/g, "") || "No description available."}
      </div>

      <h2 className="text-2xl font-semibold text-primary-500">External Links</h2>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {externalLinks.map((link: any, index: number) => (
          <a
            key={index}
            href={link?.url}
            target="_blank"
            rel="noreferrer"
            className="hover:bg-primary-600 px-3 py-2 sm:px-4 text-xs sm:text-sm flex items-center gap-3 rounded-md"
            style={{ backgroundColor: link?.color || "#38bb8c" }}
          >
            {link?.icon && (
              <img src={link.icon} alt="" className="h-4 w-4 rounded-lg" />
            )}
            {link?.site}
          </a>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-primary-500">Watcher's Details</h2>

      <div className={`h-full w-[19rem] `}>
        <StatusChart statusData={parsedStatus} />

      </div>

    </div>
  );
}

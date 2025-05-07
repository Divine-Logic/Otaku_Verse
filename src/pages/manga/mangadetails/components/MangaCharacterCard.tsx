import type { MangaCharacterProps } from "../../../../lib/types/MangaTypes.ts";

function MangaCharacterCard({ key, id, bannerImage, role, nameFull, nameNative }: MangaCharacterProps) {
  return (

    <div key={key || id} className="group bg-primary-600 rounded-lg">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={bannerImage}
          alt="Not Found"
          className="w-full h-60 object-cover  transition-transform group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary-600 to-transparent opacity-0 group-hover:opacity-100 flex items-end"
        >
          <div className="p-2 w-full text-center">

            <span
              className="text-xs px-2 py-1 bg-primary-500 rounded-full"
            >
              {role}
            </span>

          </div>
        </div>
      </div>
      <p className="mt-2 text-xs sm:text-sm text-center truncate text-primary-500">
        <p>
          {nameFull}
        </p>
        <p>
          {nameNative}
        </p>
      </p>
    </div>

  );
}

export default MangaCharacterCard;

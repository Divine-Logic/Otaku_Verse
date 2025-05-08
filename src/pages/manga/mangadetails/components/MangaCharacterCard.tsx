import type { MangaCharacterProps } from "../../../../lib/types/MangaTypes.ts";

function MangaCharacterCard({ key, id, bannerImage, role, nameFull, nameNative }: MangaCharacterProps) {
  return (

    <div key={key || id} className="group bg-primary-600 rounded-lg">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={bannerImage}
          alt="Not Found"
          className="w-full sm:w-60 h-52 sm:h-60 object-cover  transition-transform group-hover:scale-105"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary-600 to-transparent opacity-0 group-hover:opacity-100 flex items-end"
        >
          <div className="p-2 w-full text-center font-bold  ">

            {role}

          </div>
        </div>
      </div>
      <div
        className="mt-2 mx-auto text-sm sm:text-lg text-center truncate text-primary-500 max-w-50  line-clamp-3"
      >
        <p>
          {nameFull}
        </p>
        <p>
          {nameNative}
        </p>
      </div>
    </div>

  );
}

export default MangaCharacterCard;

function OtherAnimeOfCharacter({ id, animeImg, title1, title2, actor, actorImg, name }) {
  return (
    <div>
      <div
        key={`${id}-${index}`}
        className="bg-primary-600 flex gap-8 items-center
                                  max-h-[10rem]  rounded-lg
                                  "
      >
        <img
          src={animeImg}
          alt="Not Found"
          className=" object-cover rounded-md max-h-[10rem]  w-[8rem]"
        />
        <div className="flex flex-col gap-6 p-4">
          <p className="font-light sm:font-bold text-white line-clamp-2 ">
            {title1 || title2}
          </p>
          {actor?.length > 0 && (
            <div className="flex items-center gap-3">
              <img
                src={actorImg}
                alt="Not Found"
                className="w-10 h-10 object-cover rounded-full border-2"
              />
              <p className="text-sm text-white">
                {actor.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtherAnimeOfCharacter;

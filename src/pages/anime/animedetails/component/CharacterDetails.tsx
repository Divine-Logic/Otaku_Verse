import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import type { CharacterDetailsProps } from "../../../../lib/types/AnimeTypes.ts";

import Loader from "../../../../component/atoms/Loader.tsx";
import { useCharacterDetails } from "../../../../services/product/apis/anime/CharacterDetails.ts";
import CharacterCard from "./OtherAnimeOfCharacter.tsx";

function CharacterDetails({ isOpen, onClose, characterId }: CharacterDetailsProps) {
  const { data, isLoading, isError } = useCharacterDetails(characterId);
  const [isMore, setIsMore] = useState(false);
  const navigate = useNavigate();
  console.log("this is character details", data);
  useEffect(() => {
    if (!isOpen)
      return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape")
        onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const openDescription = () => {
    setIsMore(!isMore);
  };

  const handleCardClick = (id: number) => {
    navigate(`/anime/${id}`);
    onClose();
  };

  return (
    <div className="fixed z-50 inset-0 backdrop-blur-sm scrollbar1 rounded-lg">
      <div className="fixed inset-0 bg-black/60 rounded-lg" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center p-4 rounded-lg">
        <div
          className="bg-primary-700 p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          onClick={e => e.stopPropagation()}
        >
          {isLoading
            ? (
                <Loader />
              )
            : isError
              ? (
                  <div className="text-center text-red-500 py-8">Failed to load character details</div>
                )
              : !data
                  ? (
                      <div className="text-center text-primary-500 py-8">No character data found</div>
                    )
                  : (
                      <div className="flex flex-col gap-8 rounded-lg">
                        <div className="flex justify-between items-center">
                          <h2 className="text-2xl font-bold text-primary-500">Character Details</h2>
                          <IoMdClose
                            size={24}
                            onClick={onClose}
                            className="rounded-full text-primary-500 hover:text-primary-500/60"
                          />
                        </div>

                        <div
                          className="flex flex-col sm:flex-row gap-6 text-start max-h-full overflow-y-auto relative"
                        >
                          <img
                            src={data.image?.large}
                            alt={data.name?.full}
                            className="w-[15rem] h-[15rem] mx-auto sm:w-[20rem] sm:h-[20rem] object-cover rounded-lg shadow-md sticky z-20"
                          />
                          <div className="flex flex-col overflow-y-auto h-[20rem] no-scrollbar">
                            <h2 className="text-3xl font-bold text-primary-500 mb-2 mx-auto sm:mx-0">
                              {data.name?.full}
                            </h2>
                            <div className="relative">
                              <p
                                className={`text-sm text-start text-gray-300 whitespace-pre-line ${
                                  !isMore ? "line-clamp-4" : ""
                                }`}
                              >
                                {data.description?.replace(/<[^>]+>/g, "") || "No description available."}
                              </p>
                              {data.description?.length > 500 && (
                                <button
                                  onClick={openDescription}
                                  className="text-xs text-primary-500 hover:text-primary-600 mt-1 font-medium"
                                >
                                  {isMore ? "Show less" : "Read more"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {data.media?.edges?.length > 0 && (
                          <div className="flex flex-col gap-4 text-start">
                            <h3 className="text-xl font-bold text-primary-500">Other Anime</h3>
                            <div className="flex flex-col gap-4">
                              {data.media.edges.map((edge: any, index: number) => (
                                <CharacterCard
                                  key={`${edge.node?.id}-${index}`}
                                  data={edge}
                                  onClick={() => handleCardClick(edge.node?.id)}
                                  keys={{
                                    id: "node.id",
                                    titleEnglish: "node.title.english",
                                    titleRomaji: "node.title.romaji",
                                    coverImage: "node.coverImage.large",
                                    voiceActorImage: "voiceActors[0].image.large",
                                    voiceActorName: "voiceActors[0].name.full",
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;

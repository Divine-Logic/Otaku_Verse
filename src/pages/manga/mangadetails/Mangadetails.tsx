import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineFavorite } from "react-icons/md";
import { useParams } from "react-router-dom";

import type { PopularityProps } from "../../../lib/types/MangaTypes.ts";

import Loader from "../../../component/atoms/Loader.tsx";
import { useTheme } from "../../../hooks/useTheme.tsx";
import { useMangaDetails } from "../../../services/product/Apis/MangaApi.ts";
import MangaCharacterCard from "./components/MangaCharacterCard.tsx";

function MangaDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useMangaDetails(id);
  const [activeTab, setActiveTab] = useState("overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark } = useTheme();

  const manga: any = data;

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return isLoading
    ? <Loader />
    : isError
      ? (
          <div className="flex items-center justify-center bg-red-500 text-white text-xl m-auto h-[75vh]">
            Manga Details
            Not Found
          </div>
        )
      : (
          <div className="min-h-screen text-white  bg-transparent">

            {manga.bannerImage && (
              <div
                className="h-40 hidden sm:flex sm:h-64 md:h-96 bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${manga.bannerImage})` }}
              >

              </div>
            )}

            <div className=" mx-auto px-4 py-6 relative">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4 flex justify-center md:block">
                  <img
                    src={manga.coverImage.extraLarge}
                    alt={manga.title.romaji}
                    className="rounded-lg shadow-lg  w-48 md:w-[20rem] object-cover"
                  />
                </div>
                <div className="w-full md:w-3/4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center sm:text-left">{manga.title.english || manga.title.romaji}</h1>
                  <p className="text-primary-500 mb-4 italic text-center md:text-left">{manga.title.native}</p>
                  <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                    {manga.genres.map((genre: any) => (
                      <div
                        key={genre}
                        className="bg-primary-600 px-3 py-1 rounded-full text-xs sm:text-sm"
                      >
                        {genre}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                    <div
                      className="flex items-center gap-2 text-yellow-400 justify-center md:justify-start"
                    >
                      <FaStar />
                      <span>{manga.averageScore / 10}</span>
                    </div>
                    <div
                      className="flex items-center gap-2 text-orange-400 justify-center md:justify-start"
                    >
                      <ImFire />
                      <span>{manga.popularity}</span>
                    </div>
                    <div
                      className="flex items-center gap-2 text-red-500 justify-center md:justify-start"
                    >
                      <MdOutlineFavorite />
                      <span>{manga.favourites}</span>
                    </div>
                  </div>
                  <div className="flex  gap-[10rem]">
                    <div className="flex flex-col gap-[2rem]">
                      <div>
                        <p className="text-primary-500">Status</p>
                        <p className="font-medium">{manga.status}</p>
                      </div>
                      <div>
                        <p className="text-primary-500">Format</p>
                        <p className="font-medium">{manga.format}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[2rem]">
                      <div>
                        <p className="text-primary-500">Chapters</p>
                        <p
                          className="font-medium"
                        >
                          {manga.chapters ?? "N/A"}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-primary-500"> Vol.</p>
                        <p>
                          {manga.volumes ?? "N/A"}
                        </p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" mt-8">
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 bg-primary-600 "
                  >
                    <span
                      className="font-medium"
                    >
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </span>
                    <IoIosArrowDown />
                  </button>
                  {isMenuOpen && (
                    <div
                      className="absolute z-10  bg-primary-600   mx-auto "
                    >
                      {["overview", "characters", "staff", "related"].map(tab => (
                        <button
                          key={tab}
                          onClick={() => handleTabChange(tab)}
                          className={`block w-full text-left px-3 pr-[13.2rem] py-3 ${activeTab === tab ? "bg-primary-500  font-bold" : "text-white "}`}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <nav className="hidden md:flex gap-4 ">
                  {["overview", "characters", "staff", "related"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? "border-primary-500 text-primary-500" : "border-transparent text-zinc-400 hover:text-primary-600 hover:border-primary-600"}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-6">
                {activeTab === "overview" && (
                  <div
                    className={`flex flex-col gap-3  p-4 rounded-lg    ${isDark ? "bg-primary-600/50" : "bg-primary-700/20"}  `}
                  >
                    <h2 className="text-2xl font-semibold mb-6 text-primary-500">Description</h2>
                    <div
                      className="text-zinc-300 text-sm sm:text-base"
                    >
                      {manga.description?.replace(/<[^>]+>/g, "")}
                    </div>
                    <h2 className="text-2xl font-semibold mb-6 text-primary-500">External Links</h2>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {manga.externalLinks.map((link: string | any) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-primary-600/50 hover:bg-primary-600 px-3 py-2 sm:px-4 rounded-md text-xs sm:text-sm flex items-center"
                          style={{ borderLeft: `4px solid ${link.color || "#6366f1"}` }}
                        >
                          {link.site}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "characters" && (
                  <div>
                    <h2 className="text-2xl font-semibold mb-6 text-primary-500">Main Characters</h2>
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                    >
                      {manga.characters.edges.map((character: PopularityProps) => (
                        <MangaCharacterCard
                          key={character.node.id}
                          id={character.node.id}
                          bannerImage={character.node.image.large}
                          role={character.role}
                          nameFull={character.node.name.full}
                          nameNative={character.node.name.native}
                        />

                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "staff" && (
                  <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold mb-6 text-primary-500">Staff & Creators</h2>
                    <div className="flex flex-wrap gap-6 items-center justify-center">
                      {manga.staff.edges.map(({ node }: { node: any }) => (
                        <div
                          key={node.id}
                          className="w-[25rem ] flex flex-col items-center bg-primary-600 p-2 rounded-lg shadow-md hover:shadow-xl transition duration-300"
                        >
                          <img
                            src={node.image.large}
                            alt="Not found"
                            className=" h-[5rem] w-[7.5rem] sm:h-[10rem] sm:w-[15rem] rounded-lg object-center mb-2"
                          />
                          <p className="text-sm font-medium text-center text-white hover:text-primary-500">
                            {node.name.full}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                )}
                {activeTab === "related" && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-6 text-primary-500">Related Manga</h2>
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                    >
                      {manga.relations.edges.map(({ node }: { node: any }) => (
                        <div
                          key={node.id}
                          className="group cursor-pointer rounded-lg overflow-hidden  bg-primary-600 text-white text-center"
                        >
                          <img
                            src={node.coverImage.medium}
                            alt={node.title.romaji}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />

                          <p className="text-lg my-auto ">
                            {node.title.english || node.title.romaji}
                          </p>

                        </div>
                      ))}
                    </div>
                  </div>

                )}
              </div>
            </div>
          </div>
        );
}

export default MangaDetails;

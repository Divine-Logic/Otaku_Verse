import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { ImFire } from "react-icons/im";
import { MdOutlineFavorite } from "react-icons/md";
import { useParams } from "react-router-dom";

import type { PopularityProps } from "../../../lib/types/MangaTypes.ts";

import Loader from "../../../component/atoms/Loader.tsx";
import RelatedDetailsCard from "../../../component/atoms/RelatedDetailsCard.tsx";
import { StaffCard } from "../../../component/atoms/StaffCard.tsx";
import TabButton from "../../../component/atoms/TabButton.tsx";
import { useTheme } from "../../../hooks/useTheme.tsx";
import { useMangaDetails } from "../../../services/product/apis/mangaApi/MangaDetails.ts";
import MangaCharacterCard from "./components/MangaCharacterCard.tsx";

function MangaDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useMangaDetails(id);
  const [activeTab, setActiveTab] = useState("overview");

  const { isDark } = useTheme();

  const tabLabels: string[] = ["overview", "Cast", "staff", "related"];
  const manga: any = data;

  console.log(`this is staff details`, manga);

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

              <TabButton tabs={tabLabels} activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} />

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
                          className="bg-primary-600/50 hover:bg-primary-600 px-3 py-2 sm:px-4 rounded-r-md text-xs sm:text-sm flex items-center"
                          style={{ borderLeft: `4px solid ${link.color || "#38bb8c"}` }}
                        >
                          {link.site}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "Cast" && (
                  <div>

                    <div
                      className="flex flex-wrap gap-4"
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

                  <div
                    className="flex flex-wrap gap-4"
                  >
                    {manga?.staff?.edges?.map((item: any) => (
                      <StaffCard
                        key={item.node.id}
                        img={item.node.image.large}
                        role={item.role}
                        nativeName={item.node.name.native}
                        englishName={item.node.name.full}
                        index={0}
                        isDark={isDark}
                      />
                    ),
                    )}
                  </div>
                )}
                {activeTab === "related" && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-6 text-primary-500">Related Manga</h2>
                    <div
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                    >
                      {manga.relations.edges.map(({ node }: { node: any }) => (
                        <RelatedDetailsCard
                          key={node.id}
                          img={node.coverImage.medium}
                          title1={node.title.english}
                          title2={node.title.romaji}
                          type={node.status}
                          status={node.type}
                        />
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

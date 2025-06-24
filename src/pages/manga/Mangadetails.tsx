import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import type { PopularityProps } from "../../lib/types/MangaTypes.ts";

import CharacterCard from "../../component/atoms/CharacterCard.tsx";
import CharacterDetailsCard from "../../component/atoms/CharacterDetailsCard.tsx";
import DetailsPart from "../../component/atoms/DetailsPart.tsx";
import Loader from "../../component/atoms/Loader.tsx";
import OverviewCard from "../../component/atoms/OverviewCard.tsx";
import RelatedDetailsCard from "../../component/atoms/RelatedDetailsCard.tsx";
import { StaffCard } from "../../component/atoms/StaffCard.tsx";
import TabButton from "../../component/atoms/TabButton.tsx";
import { useTheme } from "../../hooks/useTheme.tsx";
import { useMangaDetails } from "../../services/product/apis/mangaApi/MangaDetails.ts";

function MangaDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useMangaDetails(id);
  const [activeTab, setActiveTab] = useState("overview");
  const [characterId, setCharacterId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDark } = useTheme();

  const tabLabels: string[] = ["overview", "Cast", "staff", "related"];
  const manga: any = data;
  console.log("this is releted data", manga);

  const handleOpenCharacterModal = useCallback((id: number | null | undefined) => {
    setCharacterId(id ?? null);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setCharacterId(null), 200);
  }, []);

  return isLoading
    ? (
        <Loader />
      )
    : isError
      ? (
          <div
            className="flex items-center justify-center bg-transparent text-primary-500 text-xl m-auto h-[75vh]"
          >
            Manga Details Not Found
          </div>
        )
      : (
          <div className="min-h-screen text-white bg-transparent">
            {manga.bannerImage && (
              <div
                className="h-40 hidden sm:flex sm:h-64 md:h-96 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${manga.bannerImage})`,
                }}
              >
              </div>
            )}

            <div className="mx-auto px-4 py-6 relative">
              <DetailsPart
                coverImage={manga.coverImage.extraLarge}
                englishTitle={manga.title.english}
                romajiTitle={manga.title.romaji}
                nativeTitle={manga.title.native}
                genration={manga.genres}
                averageScore={manga.averageScore}
                popularity={manga.popularity}
                favourites={manga.favourites}
                status={manga.status}
                format={manga.format}
                isDark={isDark}
                volumes={manga.volumes}
                chapters={manga.chapters}
              />
              <TabButton tabs={tabLabels} activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} />

              <div className="mt-6">
                {activeTab === "overview" && (
                  <OverviewCard
                    description={manga?.description}
                    externalLinks={manga.externalLinks}
                    statusDistribution={manga?.stats?.statusDistribution}
                    isDark={isDark}
                  />
                )}

                {activeTab === "Cast" && (
                  <div
                    className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  3xl:grid-cols-7 gap-8 mx-auto"
                  >
                    {manga.characters?.edges.map((character: PopularityProps) => (
                      <CharacterCard
                        key={character?.node?.id}
                        id={character?.node?.id}
                        coverImage1={character?.node?.image?.large}
                        // role={character?.role}
                        englishName={character?.node?.name?.full}
                        nativeName={character?.node?.name?.native}
                        isDark={false}
                        handleOpenCharacterModal={handleOpenCharacterModal}
                      />
                    ))}
                  </div>
                )}

                {activeTab === "staff" && (
                  <div
                    className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  3xl:grid-cols-6 gap-8 mx-auto"
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
                    ))}
                  </div>
                )}

                {activeTab === "related" && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-6 text-primary-500">Related Manga</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {manga.relations.edges.map(({ node }: { node: any }) => (
                        <RelatedDetailsCard
                          key={node.id}
                          id={node.id}
                          img={node.coverImage.large}
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

              {characterId && (
                <CharacterDetailsCard
                  isOpen={isModalOpen}
                  onClose={handleModalClose}
                  characterId={characterId}
                />
              )}
            </div>
          </div>
        );
}

export default MangaDetails;

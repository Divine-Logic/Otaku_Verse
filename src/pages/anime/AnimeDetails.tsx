import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

import Card from "../../component/atoms/Card.tsx";
import CharacterCard from "../../component/atoms/CharacterCard.tsx";
import CharacterDetailsCard from "../../component/atoms/CharacterDetailsCard.tsx";
import DetailsPart from "../../component/atoms/DetailsPart.tsx";
import Loader from "../../component/atoms/Loader.tsx";
import OverviewCard from "../../component/atoms/OverviewCard.tsx";
import { StaffCard } from "../../component/atoms/StaffCard.tsx";
import TabButton from "../../component/atoms/TabButton.tsx";
import { useTheme } from "../../hooks/useTheme.tsx";
import { useAnimeDetails } from "../../services/product/apis/anime/AnimeDetails.ts";

function AnimeDetails() {
  const { isDark } = useTheme();
  const [videoError, setVideoError] = useState<boolean | null>(false);
  const { id } = useParams();
  const { data, isLoading, isError } = useAnimeDetails(id);
  const [characterId, setCharacterId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const tabLabels: string[] = ["overview", "Cast", "staff"];
  console.log("THIS IS ANIME DATA", data);

  const handleOpenCharacterModal = useCallback((id: number | null | undefined) => {
    setCharacterId(id ?? null);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setCharacterId(null), 200);
  }, []);

  return isLoading
    ? <Loader />
    : (isError)
        ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-primary-500 mt-10"
            >
              Failed to load anime details
            </motion.div>
          )
        : (
            <Card className={`bg-transparent ${isDark ? "text-white" : "text-black"} transition-all duration-500`}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full mx-auto flex flex-col gap-[2rem]"
              >
                {data && (
                  <div
                    className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-8 "
                  >
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"
                    />
                    {!videoError && data?.trailer?.id
                      ? (
                          <ReactPlayer
                            url={`https://www.youtube.com/embed/${data.trailer.id}`}
                            playing={false}
                            width="100%"
                            pip={false}
                            controls={true}
                            onError={() => {
                              setVideoError(true);
                            }}
                            className="rounded-lg overflow-hidden aspect-video"
                          />
                        )
                      : (
                          <img
                            src={data?.bannerImage || data?.coverImage?.extraLarge || data?.coverImage?.large}
                            alt="Not Found"
                            className="w-full h-full object-cover absolute inset-0"
                            loading="eager"
                          />
                        )}
                  </div>

                )}

                <DetailsPart
                  coverImage={data?.coverImage?.large}
                  englishTitle={data?.title?.english}
                  romajiTitle={data?.title?.romaji}
                  nativeTitle={data?.title?.native}
                  genration={data?.genration}
                  averageScore={data?.averageScore}
                  popularity={data?.popularity}
                  favourites={data?.favourites}
                  status={data?.status}
                  format={data?.format}
                  isDark={isDark}
                  volumes={data?.volume}
                  chapters={data?.chapters}
                />

                <div className="flex flex-col lg:flex-row gap-8">

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className=" flex flex-col  gap-4"
                  >
                    <TabButton
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      isDark={isDark}
                      tabs={tabLabels}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      {activeTab === "overview"
                        && (
                          <div
                            className="flex flex-wrap gap-4"
                          >
                            <OverviewCard
                              isDark={isDark}
                              description={data?.description}
                              externalLinks={data?.externalLinks}
                              statusDistribution={data?.stats?.statusDistribution}
                            />
                          </div>
                        )}
                      {activeTab === "Cast" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="flex flex-wrap gap-6"
                        >
                          {data?.characters?.edges?.map((item: any, index: number) => (
                            <CharacterCard
                              key={index}
                              englishName={item?.node?.name?.full}
                              isDark={isDark}
                              handleOpenCharacterModal={handleOpenCharacterModal}
                              id={item?.node?.id}
                              coverImage1={item?.node?.image?.large}
                              nativeName={item?.node?.name?.native}
                            />
                          ))}
                        </motion.div>
                      )}

                      {activeTab === "staff" && (

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="space-y-6"
                        >

                          <div className="flex flex-wrap gap-4">
                            {data?.staff?.edges?.map((item: any, index: number) => (
                              <StaffCard
                                key={item?.node?.id}
                                index={index}
                                isDark={isDark}
                                img={item?.node?.image?.large}
                                nativeName={item?.node?.name?.native}
                                englishName={item?.node?.name?.full}
                                role={item.role}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}

                    </motion.div>
                  </motion.div>
                </div>

                {characterId && (
                  <CharacterDetailsCard
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    characterId={characterId}
                  />
                )}
              </motion.div>
            </Card>
          );
}

export default AnimeDetails;

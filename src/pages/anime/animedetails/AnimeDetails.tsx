import { motion } from "framer-motion";
import { memo, useCallback, useMemo, useState } from "react";
import { FaBookmark, FaCalendarAlt, FaCog, FaFilm, FaHeart, FaPlay, FaShare, FaStar, FaUsers } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

import BannerIcon from "../../../component/atoms/BannerIcon.tsx";
import Card from "../../../component/atoms/Card.tsx";
import Loader from "../../../component/atoms/Loader.tsx";
import { useTheme } from "../../../hooks/useTheme.tsx";
import { useAnimeDetails } from "../../../services/product/Apis/AnimeApi.ts";
import { classNames } from "../../../utils/classNames.ts";
import CharacterCard from "./component/CharacterCard.tsx";
import CharacterDetails from "./component/CharacterDetails.tsx";
import OverviewCard from "./component/OverviewCard.tsx";
import { StaffCard } from "./component/StaffCard.tsx";

const TabButton = memo(({
  tab,
  activeTab,
  setActiveTab,
  isDark,
}: {
  tab: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
}) => (
  <motion.button
    onClick={() => setActiveTab(tab)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={classNames(
      "px-4 py-2 text-sm font-medium transition-colors hover:cursor-pointer",
      activeTab === tab
        ? isDark
          ? "text-white border-b-2 border-white"
          : "text-primary-700 border-b-2 border-primary-700"
        : isDark
          ? "text-white/60 hover:text-white"
          : "text-primary-700/60 hover:text-primary-700",
    )}
  >
    {tab.charAt(0).toUpperCase() + tab.slice(1)}
  </motion.button>
));

function AnimeDetails() {
  const { isDark } = useTheme();
  const [videoError, setVideoError] = useState<boolean | null>(false);
  const { id } = useParams();
  const { data, isLoading, isError } = useAnimeDetails(id);
  const [characterId, setCharacterId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const title = useMemo(() => data?.title?.english || data?.title?.romaji, [data]);
  const bannerImage = useMemo(() => data?.bannerImage || data?.coverImage?.extraLarge || data?.coverImage?.large, [data]);
  const coverImage = useMemo(() => data?.coverImage?.large, [data]);

  const handleOpenCharacterModal = useCallback((id: number | null) => {
    setCharacterId(id);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setCharacterId(null), 200);
  }, []);

  const toggleTrailer = useCallback(() => {
    setShowTrailer(prev => !prev);
  }, []);

  if (isLoading)
    return <Loader />;
  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-primary-500 mt-10"
      >
        Failed to load anime details
      </motion.div>
    );
  }

  return (
    <Card className={`bg-transparent ${isDark ? "text-white" : "text-black"} transition-all duration-500`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full mx-auto flex flex-col gap-[2rem]"
      >

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-8"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-gray-900" : "from-gray-900"} via-transparent to-transparent z-10`}
            >
            </div>
            {showTrailer && !videoError && data?.trailer?.id
              ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-20"
                  >
                    <ReactPlayer
                      url={`https://www.youtube.com/embed/${data.trailer.id}`}
                      playing={true}
                      width="100%"
                      height="80%"
                      controls={true}
                      onError={() => setVideoError(true)}
                      className="rounded-xl overflow-hidden aspect-video"
                    />
                  </motion.div>
                )
              : (
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={bannerImage}
                    alt={title}
                    className="w-full h-[25rem] md:h-[30rem] lg:h-[35rem] object-cover rounded-xl"
                    loading="eager"
                  />
                )}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-0 left-0 right-0 p-8 z-20"
            >
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <h1 className={classNames(
                    "text-primary-500 text-3xl md:text-4xl lg:text-5xl font-bold",
                  )}
                  >
                    {title}
                  </h1>
                  {data?.trailer?.id && (
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleTrailer}
                        className={classNames(
                          "flex items-center gap-2 px-6 py-2 rounded-lg shadow-lg transition-colors bg-white/10 text-white hover:bg-white/20",
                        )}
                      >
                        <FaPlay />
                        {showTrailer ? "Hide Trailer" : "Watch Trailer"}
                      </motion.button>

                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <BannerIcon
                    isActive={isFavorite}
                    onClick={() => setIsFavorite(!isFavorite)}
                    activeClassName="bg-red-500 text-white"
                    inactiveClassName="bg-white/10 text-white"
                    icon={<FaHeart className="text-xl" />}
                  />
                  <BannerIcon
                    isActive={isBookmarked}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    activeClassName="bg-primary-500 text-white"
                    inactiveClassName="bg-white/10 text-white"
                    icon={<FaBookmark className="text-xl" />}
                  />
                  <BannerIcon
                    inactiveClassName="bg-white/10 text-white"
                    icon={<FaShare className="text-xl" />}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">

          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-1/3 space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className={classNames(
                "absolute inset-0 rounded-xl blur transition duration-1000 group-hover:duration-200",
                isDark
                  ? "bg-gradient-to-r from-primary-500/20 to-primary-600/20 opacity-75 group-hover:opacity-100"
                  : "bg-gradient-to-r from-primary-500/10 to-primary-600/10 opacity-50 group-hover:opacity-75",
              )}
              />
              <img
                src={coverImage}
                alt={title}
                className="w-full h-auto rounded-xl shadow-xl relative z-10"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={classNames(
                "space-y-4 backdrop-blur-sm p-6 rounded-xl",
                isDark ? "bg-white/10" : "bg-primary-500/10",
              )}
            >
              <div className={classNames(
                "flex items-center gap-2",
                isDark ? "text-white" : "text-primary-700",
              )}
              >
                <FaCalendarAlt />

                {`      Release Year : ${data?.seasonYear || "N/A"}`}

              </div>
              <div className={classNames(
                "flex items-center gap-2",
                isDark ? "text-white" : "text-primary-700",
              )}
              >
                <FaFilm />

                {`  Episodes :
                  ${data?.episodes || "N/A"}`}

              </div>
              <div className={classNames(
                "flex items-center gap-2 tracking-wide",
                isDark ? "text-white" : "text-primary-700",
              )}
              >
                <FaStar className="text-yellow-400" />

                {`Rating :
                  ${data?.averageScore ? `${(data.averageScore / 10).toFixed(1)}` : "N/A"}`}

              </div>
              <div className={classNames(
                "flex items-center gap-2",
                isDark ? "text-white" : "text-primary-700",
              )}
              >
                <FaUsers />

                {`Status : ${data?.status || "N/A"} `}

              </div>
              <div className={classNames(
                "flex items-center gap-2",
                isDark ? "text-white" : "text-primary-700",
              )}
              >
                <FaCog />

                {`   Format : ${data?.format || "N/A"}`}

              </div>
            </motion.div>

          </motion.div>

          <div className="flex-1">

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={classNames(
                "flex gap-4 border-b mb-6 ",
                isDark ? "border-white/20" : "border-primary-500/20",
              )}
            >
              {["overview", "characters", "staff"].map(tab => (
                <TabButton
                  key={tab}
                  tab={tab}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isDark={isDark}

                />
              ))}
            </motion.div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {activeTab === "overview" && <OverviewCard data={data} isDark={isDark} />}

              {activeTab === "characters" && (
                <CharacterCard
                  data={data}
                  isDark={isDark}
                  handleOpenCharacterModal={handleOpenCharacterModal}
                />
              )}

              {activeTab === "staff" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data?.staff?.edges?.map((item: any, index: number) => (
                      <StaffCard
                        key={item?.node?.id}
                        staff={item}
                        index={index}
                        isDark={isDark}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

            </motion.div>
          </div>
        </div>
      </motion.div>

      {characterId && (
        <CharacterDetails
          isOpen={isModalOpen}
          onClose={handleModalClose}
          characterId={characterId}
        />
      )}

    </Card>
  );
}

export default AnimeDetails;

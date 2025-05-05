import { useMemo, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { useSearchAnime } from "../services/product/Api";
import Card from "./Card";
import Filter from "./Filter.tsx";
import Loader from "./Loader.tsx";
import SearchAnimeCard from "./SearchAnimeCard";

const GENRE_OPTIONS = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
];

const SCORE_RANGES = [
  { label: "All Scores", min: 0, max: 100 },
  { label: "90+", min: 90, max: 100 },
  { label: "80-89", min: 80, max: 89 },
  { label: "70-79", min: 70, max: 79 },
  { label: "< 70", min: 0, max: 69 },
];

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [scoreRange, setScoreRange] = useState(SCORE_RANGES[0]);
  const { data, isLoading, isError } = useSearchAnime(searchQuery);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const openModal = () => {
    setIsPopupOpen(prev => !prev);
    if (isPopupOpen) {
      setSearchQuery("");
      setSelectedGenres([]);
      setScoreRange(SCORE_RANGES[0]);
      setShowFilters(false);
    }
  };

  const toggleGenre = (genre: string | { label: string }) => {
    const genreValue = typeof genre === "string" ? genre : genre.label;
    setSelectedGenres(prev =>
      prev.includes(genreValue) ? prev.filter(g => g !== genreValue) : [...prev, genreValue],
    );
  };

  const handleCardClick = (id: number) => () => {
    setIsPopupOpen(prev => !prev);
    setSearchQuery("");
    navigate(`/anime/${id}`);
  };

  const handleScoreRangeSelect = (selectedOption: string | { label: string }) => {
    const label = typeof selectedOption === "string" ? selectedOption : selectedOption.label;
    const newScoreRange = SCORE_RANGES.find(range => range.label === label);
    if (newScoreRange) {
      setScoreRange(newScoreRange);
    }
  };

  const toggleFilters = () => setShowFilters(prev => !prev);

  const clearFilters = () => {
    setSelectedGenres([]);
    setScoreRange(SCORE_RANGES[0]);
  };

  const filteredAnime = useMemo(() => {
    if (!data)
      return [];
    return data.filter((anime: { averageScore: number; genres: string[] }) => {
      const scoreMatch = anime.averageScore >= scoreRange.min && anime.averageScore <= scoreRange.max;
      const genreMatch = selectedGenres.length === 0 || selectedGenres.every(genre => anime.genres?.includes(genre));
      return scoreMatch && genreMatch;
    });
  }, [data, scoreRange, selectedGenres]);

  return (
    <Card className="bg-transparent no-scrollbar w-full">
      <button
        onClick={openModal}
        className="flex items-center justify-center p-3 bg-primary-500/90 backdrop-blur-sm rounded-full hover:bg-primary-500  hover:shadow-primary-500/25 hover:cursor-pointer"
      >
        <FaSearch className="h-5 w-5 text-white" />
      </button>

      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 md:p-20 text-white backdrop-blur-md"
        >
          <Card
            className="z-60 w-full max-w-3xl bg-primary-700/80 backdrop-blur-lg p-4 sm:p-6 rounded-2xl relative gap-4 sm:gap-8 shadow-2xl border border-white/10 max-h-[90vh] overflow-hidden flex flex-col"
          >
            <button
              onClick={openModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors duration-200 z-10"
            >
              <IoMdClose className="h-6 w-6" />
            </button>

            <div className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Search Anime</div>

            <div className="flex items-center gap-2 sm:gap-4 w-full">
              <div
                className="relative bg-white/10 backdrop-blur-sm rounded-xl w-full flex items-center gap-2 sm:gap-4 p-3 sm:p-4 transition-all duration-300 focus-within:bg-white/15 focus-within:shadow-lg"
              >
                <FaSearch size={18} className="text-white/60" />
                <input
                  type="text"
                  placeholder="Search For Anime"
                  value={searchQuery}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none text-white placeholder-white/50 text-sm sm:text-base"
                  autoFocus={true}
                />
              </div>
              <button
                onClick={toggleFilters}
                className={`p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                  showFilters
                    ? "bg-primary-500 shadow-lg shadow-primary-500/25"
                    : "bg-white/10 hover:bg-white/15"
                }`}
              >
                <FaFilter size={18} />
              </button>
            </div>

            {showFilters && (
              <div
                className="rounded-xl p-3 sm:p-4 mt-4 sm:mt-6 w-full bg-white/5 backdrop-blur-sm relative"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-medium">Filters</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={clearFilters}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      Clear all
                    </button>
                    <button
                      onClick={toggleFilters}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <IoMdClose className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-4 sm:gap-6">
                  <Filter
                    title="Category"
                    options={GENRE_OPTIONS}
                    selected={selectedGenres}
                    onSelect={toggleGenre}
                    isCategory
                  />
                  <Filter
                    title="Rating"
                    options={SCORE_RANGES}
                    selected={[scoreRange]}
                    onSelect={handleScoreRangeSelect}
                    isCategory={false}
                  />
                </div>
              </div>
            )}

            {isLoading
              ? (

                  <Loader />

                )
              : isError
                ? (
                    <div className="bg-red-500/20 text-red-200 p-4 rounded-xl text-center w-full">
                      Error fetching anime data
                    </div>
                  )
                : filteredAnime.length > 0
                  ? (
                      <div className="w-full overflow-y-auto scrollbar1">
                        {searchQuery && (
                          <div className="text-sm text-white/60 mb-4 ">
                            {`${filteredAnime.length} ${filteredAnime.length === 1 ? "result" : "results"} found`}
                          </div>
                        )}
                        <div className="w-full space-y-2   ">
                          {filteredAnime.map((anime: any, index: number) => (
                            <SearchAnimeCard
                              key={index}
                              img={anime?.coverImage?.large}
                              handleCardClick={handleCardClick(anime?.id)}
                              title1={anime?.title?.english}
                              title2={anime?.title?.romaji}
                              rating={anime?.averageScore}
                              genration={anime?.genres}
                            />
                          ))}
                        </div>
                      </div>
                    )
                  : (
                      <div className="text-center py-8 text-white/60">
                        {searchQuery ? `No results found for "${searchQuery}"` : "Enter anime name"}
                      </div>
                    )}

          </Card>
        </div>
      )}
    </Card>
  );
}

export default SearchBar;

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
    <Card className="bg-transparent no-scrollbar w-full ">
      <button
        onClick={openModal}
        className="flex items-center justify-center p-2 bg-primary-500 rounded-full hover:bg-primary-500/80 transition-colors duration-200"
      >
        <FaSearch className="h-5 w-5 text-white" />
      </button>

      {isPopupOpen && (
        <div
          className="fixed inset-0.5 z-50 flex items-start justify-center p-20 text-white backdrop-blur-sm w-full  "
        >
          <Card className="z-60 w-full max-w-3xl bg-primary-700/75 p-4 rounded-lg relative gap-8">
            <button
              onClick={openModal}
              className="absolute top-3 right-3 text-primary-500 hover:text-primary-500/60"
            >
              <IoMdClose className="h-6 w-6" />
            </button>

            <div className="text-xl font-semibold">Search Anime</div>

            <div className="flex items-center gap-8 w-full mt-4">
              <div className="relative bg-primary-500/80 rounded-lg w-full flex items-center gap-6 p-4">
                <FaSearch size={24} />
                <input
                  type="text"
                  placeholder="Search For Anime"
                  value={searchQuery}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-transparent outline-none text-white"
                  autoFocus={true}
                />
              </div>
              <button
                onClick={toggleFilters}
                className={`p-3 rounded-lg ${showFilters ? "bg-primary-500" : "bg-primary-500/80"} hover:bg-primary-600`}
              >
                <FaFilter size={24} />
              </button>
            </div>

            {showFilters && (
              <div className="rounded-lg p-3 mb-4 w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary-200 hover:text-white transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-col gap-8">
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
                    <div className="bg-red-100 text-primary-500 p-3 rounded-md text-center w-full">
                      Error fetching anime data
                    </div>
                  )
                : filteredAnime.length > 0
                  ? (
                      <div className="w-full ">
                        {searchQuery && (
                          <div className="text-sm text-gray-400 mb-2">
                            {`${filteredAnime.length} ${filteredAnime.length === 1 ? "result" : "results"} found`}
                          </div>
                        )}
                        <div
                          className=" max-h-96 w-full overflow-y-auto mt-2 text-white
                           gap-8 scrollbar1"
                        >
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
                      <div className="text-center p-4 text-gray-500 dark:text-gray-400">
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

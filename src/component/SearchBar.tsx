import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { useSearchAnime } from "../services/product/Api.ts";
import Card from "./Card.tsx";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { data, isLoading, isError } = useSearchAnime(searchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    if (!isPopupOpen) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "auto";
      setSearchQuery("");
    }
  };

  return (
    <Card className="bg-transparent">

      <button
        type="button"
        onClick={togglePopup}
        className="flex items-center justify-center p-2 bg-primary-500/80 rounded-full hover:bg-primary-500 transition-colors duration-200"

      >
        <FaSearch className="h-5 w-5 text-white" />
      </button>

      {isPopupOpen && (
        <div className="fixed  inset-0 z-50 flex items-start justify-center pt-20">

          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={togglePopup}
          >
          </div>

          <Card
            className="z-60 w-full max-w-2xl bg-white dark:bg-primary-700/75 p-4 rounded-lg relative"
          >

            <button
              type="button"
              onClick={togglePopup}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <IoMdClose className="h-6 w-6" />
            </button>

            <div className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Search Anime</div>

            <div className="relative bg-primary-500/80 rounded-full mb-4 w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="h-4 w-4 text-white" />
              </div>
              <input
                type="text"
                placeholder="Search Anime"
                value={searchQuery}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-full bg-transparent focus:ring-2 focus:border-primary-500 transition-all duration-200 outline-none text-white"
                autoFocus
              />
            </div>

            {isLoading
              ? (

                  <div
                    className="animate-spin rounded-full h-11 w-11 border-b-2 border-primary-500"
                  >
                  </div>

                )
              : isError
                ? (
                    <div className="bg-red-100 text-primary-500 p-3 rounded-md text-center w-full">
                      Error fetching anime data
                    </div>
                  )
                : data && data?.length > 0
                  ? (
                      <div
                        className="anime-results max-h-96 w-full overflow-y-auto mt-2 space-y-3 text-white"
                      >
                        {data.map((anime: any) => (
                          <div
                            key={anime?.id}
                            className="flex items-center space-x-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 cursor-pointer"
                          >
                            <img
                              src={anime?.coverImage?.large}
                              alt={anime?.title?.english}
                              className="h-20 w-16 object-cover rounded-md shadow-sm"
                            />
                            <div className="flex flex-col">
                              {anime?.title?.english
                                ? <h3 className="font-medium ">{anime?.title?.english}</h3>
                                : <h3 className="font-medium ">{anime?.title?.romaji}</h3>}
                              <div className="flex items-center mt-1">
                                <div
                                  className="flex items-center bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full"
                                >
                                  <AiFillStar className="text-yellow-500 mr-1 text-xl" />
                                  {anime?.averageScore}

                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  : (
                      <div className="text-center p-4 text-gray-500 dark:text-gray-400">
                        No results found
                        {searchQuery}
                      </div>
                    )}

          </Card>
        </div>
      )}
    </Card>
  );
}

export default SearchBar;

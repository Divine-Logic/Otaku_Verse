import classNames from "classnames";
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { PiSunFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import icon from "../../assets/logo/icon2.png";
import { useTheme } from "../../hooks/useTheme.tsx";
import ModeSwitcher from "../atoms/ModeSwitcher.tsx";
import SearchBar from "../atoms/SearchBar.tsx";
import SwitchToggle from "../atoms/SwitchToggle.tsx";

function Header() {
  const { isDark, setIsDark } = useTheme();
  const navigate = useNavigate();
  const [contentType, setContentType] = useState<"anime" | "manga">("anime");

  const handleToggle = (value: string) => {
    const lower = value.toLowerCase();

    if (lower !== "anime") {
      setContentType("anime");
      navigate(`/manga`);
    }
    else {
      setContentType("manga");
      navigate(`/anime`);
    }
    console.log(contentType);
  };

  return (
    <div
      className={`sticky w-full top-0 z-50 flex flex-row justify-between items-center px-4 py-2 ${isDark ? "bg-primary-700" : "bg-white"} `}
    >
      <div className="flex items-center cursor-pointer gap-2" onClick={() => navigate("/")}>
        <img
          src={icon}
          alt="Otaku Verse Logo"
          className="h-10 w-10 hidden sm:block md:h-14 md:w-14 object-contain"
        />
        <p className={classNames(
          "text-primary-500 text-xl sm:text-4xl font-Gothic",
          "flex items-center justify-center text-shadow-md",
        )}
        >
          Otaku Verse
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <SearchBar />
        <div className="  gap-3 hidden md:flex w-full">

          <SwitchToggle onChange={handleToggle} option1="Anime" option2="Manga" />
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center justify-center hover:cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-primary-600 transition-colors duration-200"

          >
            {isDark
              ? (
                  <FaMoon className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
                )
              : (
                  <PiSunFill className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
                )}
          </button>
        </div>

        <ModeSwitcher handleToggle={handleToggle} setIsDark={setIsDark} isDark={isDark} />

        {/* <div className="flex items-center justify-center rounded-full bg-primary-500 p-2 md:p-3"> */}
        {/*  <FiUser */}
        {/*    className="w-5 h-5 md:w-6 md:h-6 text-white" */}
        {/*  /> */}
        {/* </div> */}
      </div>

    </div>
  );
}

export default Header;

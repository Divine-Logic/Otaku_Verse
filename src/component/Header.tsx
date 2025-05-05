import classNames from "classnames";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { PiSunFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import icon from "../assets/logo/icon2.png";
import { useTheme } from "../hooks/useTheme.tsx";
import SearchBar from "./SearchBar.tsx";

function Header() {
  const { isDark, setIsDark } = useTheme();
  const navigate = useNavigate();
  const [contentType, setContentType] = useState<"anime" | "manga">("anime");

  return (
    <div
      className={`sticky w-full top-0 z-50 flex flex-row justify-between items-center ${isDark ? "bg-primary-700" : "bg-white"}`}
    >
      <div className="flex items-center cursor-pointer gap-2" onClick={() => navigate("/")}>
        <img
          src={icon}
          alt="Otaku Verse Logo"
          className="h-10 w-10 md:h-14 md:w-14 object-contain"
        />
        <p className={classNames(
          "text-primary-500 text-xl md:text-4xl font-Gothic",
          "flex items-center justify-center text-shadow-md",
        )}
        >
          Otaku Verse
        </p>
      </div>

      <div className="flex items-center justify-center gap-3">
        <div className="relative">
          <div
            className={classNames(
              "relative flex h-10 w-[180px] cursor-pointer items-center justify-between rounded-full p-1",
              isDark ? "bg-primary-800" : "bg-gray-100",
              "transition-all duration-300 ease-in-out",
            )}
            onClick={() => setContentType(contentType === "anime" ? "manga" : "anime")}
          >
            <motion.div
              className="absolute h-8 w-[85px] rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
              animate={{
                x: contentType === "anime" ? 2 : 93,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400/20 to-primary-600/20 blur-md"
              animate={{
                opacity: contentType === "anime" ? 1 : 0,
                x: contentType === "anime" ? 2 : 93,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
            <span className={classNames(
              "relative z-10 w-[85px] text-center text-sm font-semibold transition-colors duration-200",
              contentType === "anime" ? "text-white" : isDark ? "text-primary-200" : "text-gray-600",
            )}
            >
              Anime
            </span>
            <span className={classNames(
              "relative z-10 w-[85px] text-center text-sm font-semibold transition-colors duration-200",
              contentType === "manga" ? "text-white" : isDark ? "text-primary-200" : "text-gray-600",
            )}
            >
              Manga
            </span>
          </div>
        </div>

        <SearchBar />

        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center justify-center"
        >
          {isDark
            ? (
                <FaMoon className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
              )
            : (
                <PiSunFill className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
              )}
        </button>

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

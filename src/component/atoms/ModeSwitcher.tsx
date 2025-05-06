"use client";
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { PiSunFill } from "react-icons/pi";

import SwitchToggle from "./SwitchToggle";

function ModeSwitcher({ handleToggle, setIsDark, isDark }: any) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full flex md:hidden">
      <div className="gap-3 hidden md:flex w-full">
        <SwitchToggle onChange={handleToggle} option1="Anime" option2="Manga" />
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center justify-center hover:cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-primary-600 transition-colors duration-200"
        >
          {isDark
            ? <FaMoon className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
            : <PiSunFill className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />}
        </button>
      </div>

      <div className="md:hidden flex justify-end relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-primary-600 transition"
        >
          <FiMenu className="w-6 h-6 text-primary-500" />
        </button>

        {menuOpen && (
          <div
            className="absolute right-0 top-12 bg-primary-600  shadow-md rounded-lg p-3 w-44 z-50 flex flex-col gap-3"
          >
            <SwitchToggle onChange={handleToggle} option1="Anime" option2="Manga" />
            <button
              onClick={() => {
                setIsDark(!isDark);
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2 rounded-md dark:hover:bg-primary-600 transition-colors duration-200"
            >
              {isDark
                ? (

                    <div
                      className="flex items-center justify-center text-white gap-3 font-bold"
                    >
                      <PiSunFill className="w-5 h-5 text-primary-500" />

                      Light
                    </div>
                  )

                : (
                    <div
                      className="flex items-center justify-center text-white gap-3 font-bold"
                    >
                      <FaMoon className="w-5 h-5 text-primary-500" />

                      Dark
                    </div>
                  )}

            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModeSwitcher;

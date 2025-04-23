import classNames from "classnames";
import { FaMoon } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { PiSunFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

import icon from "../assets/logo/icon.png";
import { useTheme } from "../hooks/useTheme.tsx";
import Card from "./Card.tsx";
import SearchBar from "./SearchBar.tsx";

function Header() {
  const { isDark, setIsDark } = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      className="sticky top-0 z-50 flex flex-row justify-between items-center w-full bg-transparent dark:bg-transparent shadow-none rounded-md px-4 py-2"
    >

      <div className="flex items-center gap-2 " onClick={() => navigate("/")}>
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

        <SearchBar />

        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center justify-center "
        >
          {isDark
            ? (
                <FaMoon className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
              )
            : (
                <PiSunFill className="w-6 h-6 md:w-7 md:h-7 text-primary-500" />
              )}
        </button>

        <div className="flex items-center justify-center rounded-full bg-primary-500 p-2 md:p-3">
          <FiUser
            className="w-5 h-5 md:w-6 md:h-6 text-white"
          />
        </div>
      </div>

    </Card>
  );
}

export default Header;

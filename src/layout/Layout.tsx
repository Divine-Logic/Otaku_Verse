import classNames from "classnames";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../component/molecules/Header.tsx";
import { useTheme } from "../hooks/useTheme.tsx";
import SplashScreen from "../pages/splashscreen/SplashScreen.tsx";

function Layout() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const splashKey = "splashShownAt";
    const now = new Date();
    const today: string = now.toDateString();
    const lastShown: string | null = localStorage.getItem(splashKey);

    if (lastShown === today) {
      setIsLoading(false);
    }
    else {
      localStorage.setItem(splashKey, today);
      setTimeout(() => {
        setIsLoading(false);
      }, 3700);
    }
  }, []);

  return isLoading
    ? (
        <SplashScreen />
      )
    : (
        <div
          className={classNames(
            "bg-primary-700 flex flex-col w-full p-[0.8rem] sm:p-[2rem]  min-h-screen gap-[2rem] relative",
            { "bg-white brightness-80": !isDark },
          )}
        >
          <Header />
          <div className="grow p-[0.8rem] sm:p-[0.5rem]">
            <Outlet />
          </div>
        </div>
      );
}

export default Layout;

import classNames from "classnames";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../component/Header.tsx";
import { useTheme } from "../hooks/useTheme.tsx";
import SplashScreen from "../pages/splashscreen/SplashScreen.tsx";

function Layout() {
  const [isLoading, setIsLoading] = useState(true);

  const { isDark } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading
    ? (
        <SplashScreen />
      )
    : (
        <div
          className={classNames("bg-black flex flex-col w-full p-[0.5rem] md:p-[2rem] min-h-screen gap-[2rem] relative ", { "bg-white": !isDark })}
        >
          <Header />
          <div className="grow ">
            <Outlet />
          </div>
        </div>
      );
}

export default Layout;

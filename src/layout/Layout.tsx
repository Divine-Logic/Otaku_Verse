import classNames from "classnames";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../component/Header.tsx";
import { useTheme } from "../hooks/useTheme.tsx";
import SplashScreen from "../pages/splashscreen/SplashScreen.tsx";

function Layout() {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3);
  }, []);

  return isLoading
    ? (<SplashScreen />)

    : (
        <div
          className={classNames("bg-primary-700 flex flex-col w-full p-[0.8rem] sm:p-[2rem]  min-h-screen gap-[2rem] relative ", { "bg-white": !isDark })}
        >

          <Header />

          <div className="grow ">
            <Outlet />
          </div>
        </div>
      );
}

export default Layout;

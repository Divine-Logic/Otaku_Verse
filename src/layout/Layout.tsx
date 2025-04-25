import classNames from "classnames";
import { Outlet } from "react-router-dom";

import Header from "../component/Header.tsx";
import { useTheme } from "../hooks/useTheme.tsx";

function Layout() {
  const { isDark } = useTheme();

  return (
    <div
      className={classNames("bg-black flex flex-col w-full p-[0.8rem] sm:p-[2rem]  min-h-screen gap-[2rem] relative ", { "bg-white": !isDark })}
    >

      <Header />

      <div className="grow ">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;

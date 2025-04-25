import { useNavigate } from "react-router-dom";

import error from "../../assets/logo/error1.png";
import { useTheme } from "../../hooks/useTheme.tsx";

function NotFound() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  return (
    <div
      className={` flex md:gap-[5rem] text-primary-500  ${isDark ? "bg-black " : "bg-white "} max-w-[90vw]  `}
    >

      <img src={error} alt="404" className="xl:h-[80vh] xl:w-[20vw] h-[25rem] w-[15rem] " />
      <div
        className="flex flex-col my-auto items-center justify-center w-full h-full text-2xl sm:text-[4rem] font-Gothic gap-[2rem] "
      >
        <div className="flex items-center justify-center">
          <p>4</p>
          <p>0</p>
          <p>4</p>
        </div>
        <p className="sm:text-[4rem] text-[1rem]">Page Not Found</p>

        <button
          className="sm:text-lg text-sm text-white bg-primary-600 sm:p-5 p-2 rounded-lg"
          onClick={() => {
            navigate("/");
          }}
        >
          Return To Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;

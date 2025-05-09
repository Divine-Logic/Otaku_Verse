import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonAnimeCard() {
  return (
    <div
      className="w-[16rem] h-[21.125rem] relative transition-all duration-500   rounded-xl "
    >
      <div className="absolute  bg-transparent rounded-xl ">
        <Skeleton height="100%" width="100%" baseColor="#848884" />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-r  from-white/20 via-white/15 to-white/10 rounded-xl"
      />

      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-6 transition-transform duration-500 flex flex-col gap-2 bg-transparent"
      >
        <Skeleton height={20} width="80%" baseColor="#848884" />
        <div className="flex justify-between items-center  text-sm rounded-4xl ">
          <Skeleton width={60} height={20} baseColor="#848884" />
          <Skeleton width={60} height={20} baseColor="#848884" />
        </div>
      </div>

    </div>
  );
}

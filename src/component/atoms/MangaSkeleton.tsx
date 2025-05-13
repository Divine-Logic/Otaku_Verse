import Skeleton from "react-loading-skeleton";

function MangaSkeleton() {
  return (
    <div

      className="h-[28rem] w-[16rem] bg-gradient-to-br from-white/20   via-white/15 to-white/10 rounded-xl flex flex-col justify-between"
    >
      <div className="w-full h-[15rem]">
        <Skeleton
          height="100%"
          baseColor="#848884"
          highlightColor="#A9A9A9"
          style={{
            borderRadius: "0.75rem 0.75rem 0 0",

          }}

        />
      </div>

      <Skeleton
        height={20}
        width={100}
        baseColor="#848884"
        highlightColor="#A9A9A9"
      />
      <Skeleton
        width={190}
        height={15}
        count={3}
        baseColor="#848884"
        highlightColor="#A9A9A9"
      />
      <div className="flex justify-between p-5">
        <div className={`flex flex-row gap-2 text-primary-500 `}>
          <Skeleton
            width={40}
            height={20}
            baseColor="#848884"
            highlightColor="#A9A9A9"
          />
          <Skeleton
            width={40}
            height={20}
            baseColor="#848884"
            highlightColor="#A9A9A9"
          />
        </div>
        <Skeleton
          width={50}
          height={20}
          baseColor="#848884"
          highlightColor="#A9A9A9"
        />
      </div>

    </div>
  );
}

export default MangaSkeleton;

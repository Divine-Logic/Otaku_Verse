function Loader() {
  return (
    <div
      className="relative w-24 h-24 bg-red-600 border-[6px] border-black rounded-full animate-spin-slow m-auto mx-auto my-auto"
    >
      <div
        className="absolute left-1/2 top-1/2 w-14 h-14 border-4 border-[rgba(110,13,13,0.5)] rounded-full transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="absolute top-[-0.5em] left-1/2 w-[0.9em] h-[0.9em] bg-black rounded-full transform -translate-x-[40%]"
        >
          <div
            className="absolute top-[-0.5em] right-[-0.2em] w-[1.1em] h-[0.9em] border-l-[16px] border-l-black rounded-tl-full"
          >
          </div>
        </div>
        <div
          className="absolute bottom-[0.5em] left-[-0.35em] w-[0.9em] h-[0.9em] bg-black rounded-full transform rotate-[-120deg]"
        >
          <div
            className="absolute top-[-0.5em] right-[-0.2em] w-[1.1em] h-[0.9em] border-l-[16px] border-l-black rounded-tl-full"
          >
          </div>
        </div>
        <div
          className="absolute bottom-[0.5em] right-[-0.35em] w-[0.9em] h-[0.9em] bg-black rounded-full transform rotate-[120deg]"
        >
          <div
            className="absolute top-[-0.5em] right-[-0.2em] w-[1.1em] h-[0.9em] border-l-[16px] border-l-black rounded-tl-full"
          >
          </div>
        </div>
        <div
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full shadow-[0_0_20px_1px_black] transform -translate-x-1/2 -translate-y-1/2"
        >
        </div>
      </div>
    </div>
  );
}

export default Loader;

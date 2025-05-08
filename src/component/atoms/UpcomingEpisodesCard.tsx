function UpcomingEpisodesCard({ key, img, title, episode, time }: {
  key: string;
  img: string;
  title: string;
  episode: string;
  time: number;
}) {
  return (
    <div
      key={key}

      className="flex gap-[1rem] min-w-[22rem] h-full md:min-w-[25rem] cursor-pointer bg-gradient-to-l from-primary-600/100 via-primary-560/80 to-primary-600/60 rounded-lg"
    >
      <img
        src={img}
        alt="Not found"
        className="h-[10rem] max-w-[7rem] object-cover rounded-r-lg rounded-l-lg"
      />
      <div className="flex items-start justify-center flex-col">
        <h2 className="text-xl font-bold text-start">{title}</h2>
        <p>{`EP : ${episode}`}</p>
        <div className="flex items-center mb-3 text-sm">
          {new Date(time * 1000).toLocaleString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

export default UpcomingEpisodesCard;

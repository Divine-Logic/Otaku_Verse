function RelatedDetailsCard({
  key,
  img,
  title1,
  title2,
  status,
  type,
}: {
  key: string;
  img: string;
  title1: string;
  title2: string;
  type: string;
  status: string;
}) {
  return (
    <div
      key={key}
      className="group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-primary-600 text-white transition duration-300 hover:shadow-2xl"
    >
      <img
        src={img}
        alt="not found"
        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"
      />

      <div className="absolute bottom-4 left-4 right-4 text-left">
        <p className="text-xl font-semibold drop-shadow-md">
          {title1 || title2}
        </p>
        <p>
          {status}
        </p>
        <p className="text-sm font-semibold drop-shadow-md">
          {type}
        </p>

      </div>
    </div>
  );
}

export default RelatedDetailsCard;

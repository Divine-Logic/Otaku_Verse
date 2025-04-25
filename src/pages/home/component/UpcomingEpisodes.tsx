function UpcomingEpisodes({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data?.map(item => (
        <div key={item.id} className="bg-white p-4 rounded-xl shadow">
          <img src={item.image} alt={item.title} className="w-full rounded-xl mb-2" />
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p>
            Episode
            {item.episode}
          </p>
          `
          <p className="text-sm text-gray-500">
            Airing:
            {" "}
            {new Date(item.airingAt * 1000).toLocaleString()}
          </p>
          <a
            href={item.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm mt-2 inline-block"
          >
            View on AniList
          </a>
        </div>
      ))}
    </div>
  );
}

export default UpcomingEpisodes;

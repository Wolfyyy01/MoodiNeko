
type AnimeCardProps = {
  title: string;
  description: string;
  image: string;
  url: string;
  reason: string;
};

export default function AnimeCard({ title, description, image, url, reason }: AnimeCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="max-w-sm bg-gradient-to-br from-purple-900/80 via-pink-900/70 to-black/90 rounded-xl shadow-lg shadow-pink-600/60 hover:shadow-pink-500/90 transition-shadow duration-300 overflow-hidden border border-pink-600"
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl shadow-[0_0_15px_rgba(255,0,255,0.7)]">
        <img
          src={image}
          alt={title+ "  MoodiNeko"}
          className="w-full h-full object-cover filter brightness-90 hover:brightness-110 transition duration-300"
        />
        {/* Neon border glow overlay */}
        <div className="absolute inset-0 rounded-t-xl border-2 border-pink-500 shadow-[0_0_15px_5px_rgba(255,0,255,0.5)] pointer-events-none"></div>
      </div>
      <div className="p-4 text-white">
        <h3 className="text-xl font-bold mb-1 drop-shadow-[0_0_8px_rgba(255,0,255,0.9)]">{title}</h3>
        <p className="text-sm mb-3 line-clamp-4 text-pink-300">{description}</p>
        <p className="italic text-pink-400 text-xs mb-2 drop-shadow-[0_0_6px_rgba(255,0,255,0.7)]">
          Recommendation reason: {reason}
        </p>
        <button
          type="button"
          className="w-full bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white font-semibold py-2 rounded-lg shadow-md shadow-pink-500/70 transition"
        >
          Watch Now
        </button>
      </div>
    </a>
  );
}

import axios from 'axios';

export const getAnimeData = async (title: string) => {
  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&limit=1`);
  const data = await response.json() as {
    data?: Array<{
      mal_id: number;
      title: string;
      synopsis: string;
      images: { jpg: { large_image_url: string } };
      url: string;
    }>;
  };

  if (data.data?.length) {
    const anime = data.data[0];

    return {
      id: anime?.mal_id,
      title: anime?.title,
      description: anime?.synopsis,
      image: anime?.images.jpg.large_image_url,
      url: anime?.url,
    };
  }

  return undefined;
};

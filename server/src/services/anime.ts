import { redis } from "../lib/redis";
import axios from "axios";

export const getAnimeData = async (title: string) => {
  const cacheKey = `anime:${title.toLowerCase()}`;


  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);}


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
    const animeData = {
      id: anime?.mal_id,
      title: anime?.title,
      description: anime?.synopsis,
      image: anime?.images.jpg.large_image_url,
      url: anime?.url,
    };

    await redis.set(cacheKey, JSON.stringify(animeData), 'EX', 60 * 60 * 24); // Cache for 24 hours

    return animeData;
  }

  return undefined;
};
import type { Context } from 'hono';
import { getRecommendations } from '../services/gpt';
import { getAnimeData } from '../services/anime';

export const recommendRoute = async (c: Context) => {
  const { mood } = await c.req.json();

  // Obține recomandările de anime pe baza stării
  const titles = await getRecommendations(mood);

  const rawResults = await Promise.all(
  titles.map(async title => await getAnimeData(title))
);

const recommendations = rawResults.filter(Boolean); // elimină null / undefined

return c.json({ recommendations });



  return c.json({ recommendations: recommendations });
};

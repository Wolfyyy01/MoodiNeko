import type { Context } from 'hono';
import { getRecommendations } from '../services/gpt';
import { getAnimeData } from '../services/anime';

export const recommendRoute = async (c: Context) => {
  try {
    const body = await c.req.json();

    const moodRaw = body.mood;

    // Validate mood
    if (typeof moodRaw !== 'string' || !moodRaw.trim()) {
      return c.json({ error: 'Invalid or missing mood' }, 400);
    }

    const mood = moodRaw.trim().slice(0, 100); // limit to 100 chars

    // Optional: sanitize strange characters
    const sanitizedMood = mood.replace(/[^\w\săâîșțĂÂÎȘȚéèêëç\-'"!?.,]/gi, '');

    const gptRecs = await getRecommendations(sanitizedMood);

    if (!gptRecs.length) {
      return c.json({ message: 'No recommendations found for that mood.' }, 200);
    }

    const results = await Promise.all(
      gptRecs.map(async ({ title, reason }) => {
        const anime = await getAnimeData(title);
        if (!anime) return null;

        return {
          ...anime,
          reason,
        };
      })
    );

    const recommendations = results.filter(Boolean);

    if (!recommendations.length) {
      return c.json({ message: 'Could not fetch any matching anime data.' }, 200);
    }

    return c.json({ recommendations });
  } catch (err) {
    console.error('Error in /recommend:', err);
    return c.json({ error: 'Something went wrong while processing your request.' }, 500);
  }
};

import type { Context } from 'hono';
import { redis } from '../lib/redis';

// Interface for rating request
interface RatingRequest {
  animeId: number;
  rating: 'up' | 'down';
  previousRating: 'up' | 'down' | null;
}

// Function to validate the rating request
function isValidRatingRequest(body: any): body is RatingRequest {
  return (
    typeof body === 'object' &&
    body !== null &&
    typeof body.animeId === 'number' &&
    (body.rating === 'up' || body.rating === 'down') &&
    (body.previousRating === null || body.previousRating === 'up' || body.previousRating === 'down')
  );
}

// Route to handle rating an anime
export const rateAnimeRoute = async (c: Context) => {
  try {
    const body = await c.req.json();

    // Validate request body
    if (!isValidRatingRequest(body)) {
      return c.json({ error: 'Invalid rating request' }, 400);
    }

    const { animeId, rating, previousRating } = body;

    // Create Redis keys for storing ratings
    const upvotesKey = `anime:${animeId}:upvotes`;
    const downvotesKey = `anime:${animeId}:downvotes`;

    // If user is switching their vote, decrement the previous rating counter
    if (previousRating === 'up') {
      const currentUpvotes = parseInt(await redis.get(upvotesKey) || '0');
      if (currentUpvotes > 0) {
        await redis.decr(upvotesKey);
      }
    } else if (previousRating === 'down') {
      const currentDownvotes = parseInt(await redis.get(downvotesKey) || '0');
      if (currentDownvotes > 0) {
        await redis.decr(downvotesKey);
      }
    }

    // Update the new rating counter
    if (rating === 'up') {
      await redis.incr(upvotesKey);
    } else {
      await redis.incr(downvotesKey);
    }

    // Get the current counts
    const upvotes = parseInt(await redis.get(upvotesKey) || '0');
    const downvotes = parseInt(await redis.get(downvotesKey) || '0');

    return c.json({
      success: true,
      animeId,
      ratings: {
        upvotes,
        downvotes
      }
    });
  } catch (err) {
    console.error('Error in /rate-anime:', err);
    return c.json({ error: 'Something went wrong while processing your request.' }, 500);
  }
};

// Route to get ratings for an anime
export const getAnimeRatingsRoute = async (c: Context) => {
  try {
    const animeId = c.req.param('id');
    
    if (!animeId || isNaN(parseInt(animeId))) {
      return c.json({ error: 'Invalid anime ID' }, 400);
    }

    // Get the current counts
    const upvotesKey = `anime:${animeId}:upvotes`;
    const downvotesKey = `anime:${animeId}:downvotes`;
    
    const upvotes = parseInt(await redis.get(upvotesKey) || '0');
    const downvotes = parseInt(await redis.get(downvotesKey) || '0');

    return c.json({
      animeId: parseInt(animeId),
      ratings: {
        upvotes,
        downvotes
      }
    });
  } catch (err) {
    console.error('Error in /anime/:id/ratings:', err);
    return c.json({ error: 'Something went wrong while processing your request.' }, 500);
  }
};
import {Hono} from 'hono';
import {cors} from 'hono/cors';
import {logger} from 'hono/logger';
import { recommendRoute } from './controllers/recommend';
import { rateAnimeRoute, getAnimeRatingsRoute } from './controllers/ratings';

const app = new Hono();
const PORT = process.env.PORT || 3000;

app.use('*',cors(),)
app.use("*", logger())

// Recommendation route
app.post('/recommend', recommendRoute);

// Rating routes
app.post('/rate-anime', rateAnimeRoute);
app.get('/anime/:id/ratings', getAnimeRatingsRoute);

export default { 
  port: PORT, 
  fetch: app.fetch, 
}
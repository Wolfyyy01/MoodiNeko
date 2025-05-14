import { Hono } from 'hono';
import { recommendRoute } from './routes/recommend';

const app = new Hono();

// Adaugă ruta pentru recomandări
app.post('/recommend', recommendRoute);

export default { 
  port: process.env.PORT || 3000, 
  fetch: app.fetch, 
} 
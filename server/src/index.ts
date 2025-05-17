import {Hono} from 'hono';
import {cors} from 'hono/cors';
import { recommendRoute } from './controllers/recommend';

const app = new Hono();
const PORT = process.env.PORT || 3000;

app.use('*',cors())
app.post('/recommend', recommendRoute);

export default { 
  port: PORT, 
  fetch: app.fetch, 
} 
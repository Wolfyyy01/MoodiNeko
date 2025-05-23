import Redis from "ioredis";

export const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis({
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD,
    });

// Connect to Redis
redis.on("connect", () => {
  console.log("Connected to Redis");
});

// Handle Redis connection errors
redis.on("error", (err) => {
  console.error("Redis connection error:", err);
  process.exit(1);
});

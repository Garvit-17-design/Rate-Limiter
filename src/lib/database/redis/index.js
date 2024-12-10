const Redis = require("ioredis");
const config = require("config");

const REDIS_URL = `redis://${config.get("redis.host")}:${config.get(
  "redis.port"
)}`;

const redisClient = new Redis(REDIS_URL);

// Event listeners for debugging and error handling
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err.message);
});

const connectRedis = async () => {
  try {
    await redisClient.ping();
    console.log("Redis connection verified");
  } catch (err) {
    console.error("Error connecting to Redis:", err.message);
    process.exit(1);
  }
};

module.exports = {
  redisClient,
  connectRedis,
};

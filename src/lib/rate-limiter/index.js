const { redisClient } = require("../../lib/database/redis");

// Rate Limiter Middleware
async function validateRateLimit(req, res) {
  try {
    const targetUserId = req.targetUserId;
    const { maxRequests, timeWindowInSeconds } = req.customer;

    // Use the user ID as the Redis key
    const key = `rate_limit:${targetUserId}`;

    // Increment the counter for the customer
    const currentCount = await redisClient.incr(key);

    if (currentCount === 1) {
      // Set the expiry time for the rate limit window
      await redisClient.expire(key, timeWindowInSeconds);
    }

    if (currentCount > maxRequests) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    return res.status(201).json({
      message: "Requests within limit.",
    });
  } catch (error) {
    console.error("Rate limiter error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  validateRateLimit,
};

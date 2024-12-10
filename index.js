require("dotenv").config();

const express = require("express");

const config = require("config");
const { initializeDatabaseConnection } = require("./src/lib/database/mongo");
const { connectRedis } = require("./src/lib/database/redis");
const authRoutes = require("./src/routes/authentication");
const validationRoutes = require("./src/routes/validate");

const app = express();
app.use(express.json());

const PORT = config.get("server.port");
app.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT}`);
  await initializeDatabaseConnection();
  await connectRedis();
});

// Use authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/rate-limit", validationRoutes);

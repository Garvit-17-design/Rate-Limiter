const mongoose = require("mongoose");
const config = require("config");

async function initializeDatabaseConnection() {
  // destructuring
  const { host, port, username, password } = config.get("mongodb");
  const MONGO_URI = `mongodb://${username}:${password}@${host}:${port}`;
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}

module.exports = {
  initializeDatabaseConnection,
};

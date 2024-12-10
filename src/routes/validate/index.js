const express = require("express");
const { verifyToken } = require("../../lib/middleware/authentication");
const { validateRateLimit } = require("../../lib/rate-limiter");

const router = express.Router();
// Validation Route
router.post("/validate", verifyToken, validateRateLimit);

module.exports = router;

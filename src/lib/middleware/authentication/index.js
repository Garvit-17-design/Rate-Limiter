const jwt = require("jsonwebtoken");
const config = require("config");
const Customer = require("../../../models/customer");

const JWT_SECRET = config.get("jwtSecret");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from 'Authorization' header (Bearer token)

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const customer = await Customer.findOne({ email: decoded.email });

    // Attach the decoded user data to the request object (for access in later middleware/handlers)
    req.customer = customer;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };

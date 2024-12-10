const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Customer = require("../../models/customer");
const config = require("config");

const JWT_SECRET = config.get("jwtSecret");
const JWT_EXPIRES_IN = config.get("jwtExpiresIn");

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    maxRequests = 60,
    timeWindowInSeconds = 100,
  } = req.body;
  try {
    const customerExists = await Customer.findOne({ email });
    if (customerExists) {
      return res.status(400).json({ message: "Customer already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
      maxRequests,
      timeWindowInSeconds,
    });
    await newCustomer.save();

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Customer not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: customer.email, name: customer.name },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token, expiresIn: JWT_EXPIRES_IN });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = { register, login };

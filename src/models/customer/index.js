const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  maxRequests: {
    type: Number,
    default: 100, // Default rate limit: 100 requests
  },
  timeWindowInSeconds: {
    type: Number,
    default: 60, // Default time window: 60 seconds
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;

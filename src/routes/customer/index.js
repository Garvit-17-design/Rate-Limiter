const express = require("express");
const bcrypt = require("bcryptjs");
const Customer = require("../../models/customer");  // Import the Customer model

const router = express.Router();

// Function to update customer details
router.put("/update/:id", async (req, res) => {
  const customerId = req.params.id; // Customer ID from URL params
  const { name, email, password, maxRequests, timeWindowInSeconds } = req.body;

  try {
    // Find the customer by ID
    const customer = await Customer.findById(customerId);

    // Check if customer exists
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // If password is provided, hash it before saving
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      customer.password = hashedPassword;
    }

    // Update the customer details
    if (name) customer.name = name;
    if (email) customer.email = email;
    if (maxRequests) customer.maxRequests = maxRequests;
    if (timeWindowInSeconds) customer.timeWindowInSeconds = timeWindowInSeconds;

    // Save the updated customer to the database
    await customer.save();

    // Send success response
    res.status(200).json({ message: "Customer details updated successfully", customer });
  } catch (err) {
    console.error("Error updating customer details:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;
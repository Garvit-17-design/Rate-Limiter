const express = require("express");
const { register, login } = require("../../lib/authentication");

const router = express.Router();
// Registration Route
router.post("/register", register);
// Login Route
router.post("/login", login);

module.exports = router;

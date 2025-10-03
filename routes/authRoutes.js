const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// ========================================
// SIGNUP API - POST /api/auth/signup
// ========================================
router.post("/signup", async (req, res) => {
  try {
    // Step 1: Get data from request body
    const { name, email, password } = req.body;

    // Step 2: Validate input (check if all fields are provided)
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (name, email, password)"
      });
    }

    // Step 3: Check password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
    }

    // Step 4: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Step 5: Hash password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Step 6: Create new user object
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // Step 7: Save user to database
    await newUser.save();

    // Step 8: Send success response (don't send password back)
    res.status(201).json({
      success: true,
      message: "User registered successfully! 🎉",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    // Handle any errors
    console.error("Signup Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message
    });
  }
});

// ========================================
// TEST ROUTE - GET /api/auth/test
// ========================================
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth routes are working! ✅"
  });
});

// Export the router
module.exports = router;
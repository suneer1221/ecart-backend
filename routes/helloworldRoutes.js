// routes/testRoutes.js
// This file contains test and hello world routes

const express = require("express");
const router = express.Router();

// ========================================
// HELLO WORLD API - GET /api/hello
// ========================================
router.get("/hello", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World! Welcome to Emart Backend API 🛒",
    timestamp: new Date().toISOString()
  });
});



// Export the router
module.exports = router;
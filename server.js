const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/emart";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

  // Hello World API Route
app.get("/api/hello", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello World! Welcome to Emart Backend API 🛒",
    
  });
});

// Test Route
app.get("/", (req, res) => {
  res.send("Ecart Ecommerce server is running 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const helloworldRoutes = require("./routes/helloworldRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/emart";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

  // Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Ecommerce server is running 🚀",
    endpoints: {
      hello: "/api/hello",
      signup: "/api/auth/signup",
    
    }
  });
});

// Hello World API Route
app.use("/api", helloworldRoutes);

// Authentication routes (signup, login, etc.)
app.use("/api/auth", authRoutes);

// ========================================
// START SERVER
// ========================================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 API Endpoints:`);
  console.log(`   - GET  /api/hello`);
  console.log(`   - POST /api/auth/signup`);
  console.log(`   - GET  /api/auth/test`);
});

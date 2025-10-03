// middleware/auth.js
// This middleware protects routes by verifying JWT tokens

const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    // Example header: "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No token provided, authorization denied' 
      });
    }

    // 3. Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Add user info to request object
    // Now other routes can access req.user
    req.user = decoded;
    
    // 5. Continue to next middleware/route
    next();
    
  } catch (error) {
    // Token is invalid or expired
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token is invalid' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token has expired' 
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Server error during authentication' 
    });
  }
};

module.exports = auth;
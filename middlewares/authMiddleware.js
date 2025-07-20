// === backend/middlewares/authMiddleware.js ===
const jwt = require("jsonwebtoken");

// Middleware to check for a valid token
const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer <token>"
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// Middleware to allow only admin users
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = { protect, adminOnly };

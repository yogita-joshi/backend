// === backend/routes/roleRoutes.js ===
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// PUT /api/roles/change/:id — update user role (admin only)
router.put("/change/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { role: req.body.role });
    res.json({ message: "Role updated" });
  } catch {
    res.status(400).json({ message: "Failed to update role" });
  }
});

module.exports = router;

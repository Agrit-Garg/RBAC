const express = require("express");
const verifyToken = require("../middlewares/authMiddleware"); // Middleware to verify the JWT token
const authorizeRoles = require("../middlewares/roleMiddleware"); // Middleware to authorize roles

const router = express.Router();

// Route accessible only by admin
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome admin" });
});

// Route accessible by admin and manager
router.get("/manager", verifyToken, authorizeRoles("admin", "manager"), (req, res) => {
    res.json({ message: "Welcome Manager" });
});

// Route accessible by admin, manager, and user
router.get("/user", verifyToken, authorizeRoles("admin", "manager", "user"), (req, res) => {
    res.json({ message: "Welcome User" });
});

module.exports = router;

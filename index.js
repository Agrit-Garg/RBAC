const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dbConnect(); // Connect to the database

const app = express();

app.use(express.json()); // Middleware to handle JSON payloads

// API routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api", userRoutes); // User management routes

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Confirm server is running
});

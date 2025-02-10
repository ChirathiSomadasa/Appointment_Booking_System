const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const appointmentRoutes = require("./routes/appointments");
const { authenticate } = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Appointment Booking API is Running");
});

// Routes
app.use("/auth", authRoutes);
app.use("/admin", authenticate, adminRoutes);
app.use(authenticate);
app.use("/appointments", appointmentRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


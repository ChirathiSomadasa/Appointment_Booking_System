const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const { generateJWT } = require("../config/auth");

const router = express.Router();

// register user
router.post("/register", async (req, res) => {
  const { name, email, password, role = "customer" } = req.body;

  try {
    // Check if user already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) throw hashErr;

        // Insert new user into the database
        db.query(
          "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
          [name, email, hashedPassword, role],
          (insertErr) => {
            if (insertErr) throw insertErr;

            res.status(201).json({ message: "User registered successfully" });
          }
        );
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Convert email to lowercase to ensure case-insensitivity
    const normalizedEmail = email.toLowerCase();
    // Find user by email
    db.query("SELECT * FROM users WHERE email = ?", [normalizedEmail], (err, results) => {
      if (err) throw err;
      const user = results[0];
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      // Compare password
      bcrypt.compare(password, user.password_hash, (compareErr, isMatch) => {
        if (compareErr || !isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate JWT token
        const token = generateJWT(user);
        // Return user details along with the token
        res.json({
          token,
          role: user.role,
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
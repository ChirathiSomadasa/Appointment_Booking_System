const express = require("express");
const db = require("../config/db");
const { isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all appointments (Admin only)
router.get("/appointments", isAdmin, (req, res) => {
  db.query(
    `
    SELECT a.id, u.name AS user_name, s.start_time, s.end_time 
    FROM appointments a 
    JOIN users u ON a.user_id = u.id 
    JOIN slots s ON a.slot_id = s.id
    `,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      }
      res.json(results);
    }
  );
});

module.exports = router;
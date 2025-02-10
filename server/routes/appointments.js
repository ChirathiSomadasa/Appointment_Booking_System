const express = require("express");
const db = require("../config/db");
const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

// Get all appointments for a user
router.get("/:id", (req, res) => {
  const appointmentId = req.user.id;
  db.query(
    "SELECT * FROM appointments WHERE user_id = ?",
    [appointmentId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (results.length === 0) return res.status(404).json({ message: "Appointment not found" });
      res.json(results);
    }
  );
});

// Book an appointment
router.post("/", (req, res) => {

  console.log(req.user);

  const { name, email, contact_no, appointment_date, time_slot } = req.body;
  const user_id = req.user.id;
  // Validate required fields
  if (!user_id || !name || !email || !contact_no || !appointment_date || !time_slot) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the time slot is already booked
  db.query(
    "SELECT * FROM appointments WHERE appointment_date = ? AND time_slot = ?",
    [appointment_date, time_slot],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (results.length > 0) {
        return res.status(400).json({ message: "This time slot is already booked" });
      }

      // Insert the new appointment
      db.query(
        "INSERT INTO appointments (user_id, name, email, contact_no, appointment_date, time_slot) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, name, email, contact_no, appointment_date, time_slot],
        (insertErr) => {
          if (insertErr) return res.status(500).json({ message: "Server error" });
          res.status(201).json({ message: "Appointment booked successfully" });
        }
      );
    }
  );
});

// Update an appointment
router.put("/:id", (req, res) => {
    const { name, contact_no, appointment_date, time_slot } = req.body;
    const appointmentId = req.params.id;
  
    // Check if the time slot is already booked for another appointment
    db.query(
      "SELECT * FROM appointments WHERE appointment_date = ? AND time_slot = ? AND id != ?",
      [appointment_date, time_slot, appointmentId],
      (err, results) => {
        if (err) return res.status(500).json({ message: "Server error" });
  
        if (results.length > 0) {
          return res.status(400).json({ message: "This time slot is already booked" });
        }
  
        // Update the appointment
        db.query(
          "UPDATE appointments SET name = ?, contact_no = ?, appointment_date = ?, time_slot = ? WHERE id = ?",
          [name, contact_no, appointment_date, time_slot, appointmentId],
          (updateErr) => {
            if (updateErr) return res.status(500).json({ message: "Server error" });
            res.json({ message: "Appointment updated successfully" });
          }
        );
      }
    );
  });

// Delete an appointment
router.delete("/:id", (req, res) => {
  const appointmentId = req.params.id;

  db.query("DELETE FROM appointments WHERE id = ?", [appointmentId], (err) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json({ message: "Appointment deleted successfully" });
  });
});


// Get booked time slots for a specific date
router.get("/booked-slots/:date", (req, res) => {
  const { date } = req.params;

  db.query(
    "SELECT time_slot FROM appointments WHERE appointment_date = ?",
    [date],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });

      const bookedSlots = results.map((row) => row.time_slot);
      console.log("Booked Slots for Date:", date, bookedSlots);
      res.json(bookedSlots);
    }
  );
});
module.exports = router;
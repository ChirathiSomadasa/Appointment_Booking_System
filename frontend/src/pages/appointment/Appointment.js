import React, { useState } from "react";
import "./Appointment.css";

const timeSlots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM"
];

function Appointment() {

  return (
    <div className="appointment-container">
      <h2>Book an Appointment</h2>
      <form className="appointment-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
        />

        <label htmlFor="contact">Contact No</label>
        <input
          type="text"
          id="contact"
          name="contact"
          required
        />

        <label htmlFor="date">Select Date</label>
        <input
          type="date"
          id="date"
          name="date"
          required
        />

        <label htmlFor="timeSlot">Select Time Slot</label>
        <select
          id="timeSlot"
          name="timeSlot"
          required
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default Appointment;

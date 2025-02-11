import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appointment.css";
import heroImage from "../../images/img3.jpg"; 
import { useNavigate } from 'react-router-dom';
import { useMemo } from "react";

const timeSlots = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM"
];

function Appointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_no: "",
    appointment_date: "",
    time_slot: ""
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  
  // Retrieve logged-in user details from localStorage
  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  // Auto-fill name and email if user is logged in
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        name: user.name || "",  // Auto-fill name
        email: user.email || "" // Auto-fill email
      }));
    }
  }, [user]);

  // Fetch available time slots when the date changes
  useEffect(() => {
    if (formData.appointment_date) {
      axios
        .get(`http://localhost:5000/appointments/booked-slots/${formData.appointment_date}`,{
          headers: {
            Authorization: 'Bearer '+ localStorage.getItem("token")
          }
        })
        .then((response) => {
          const bookedSlots = response.data; // Booked slots from the backend
          const slots = timeSlots.filter((slot) => !bookedSlots.includes(slot)); // Available slots
          setAvailableSlots(slots);
        })
        .catch((error) => {
          console.error("Error fetching booked slots:", error);
        });
    } else {
      setAvailableSlots([]); // Reset available slots if no date is selected
    }
  }, [formData.appointment_date]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(localStorage.getItem("user"));

    try {
      await axios.post("http://localhost:5000/appointments/create", {
        ...formData
      },{
        headers:{
          Authorization: 'Bearer '+ localStorage.getItem("token")
        },
        method: 'POST'
      });
      alert("Appointment booked successfully!");
      navigate("/appointmentList");

    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="appointment-page">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={heroImage} alt="Appointment Hero" className="hero-image" />
        <div className="hero-overlay">
          <h1>Book Your Appointment</h1>
          <p>Choose a time slot that works best for you</p>
        </div>
      </div>

      {/* Appointment Form */}
      <div className="appointment-container">
        <h2>Book an Appointment</h2>
        <form className="appointment-form" onSubmit={handleSubmit}>
          {/* Name Field (Auto-filled) */}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Email Field (Auto-filled) */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Contact Number Field */}
          <label htmlFor="contact_no">Contact No</label>
          <input
            type="text"
            id="contact_no"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            required
          />

          {/* Date Field */}
          <label htmlFor="appointment_date">Select Date</label>
          <input
            type="date"
            id="appointment_date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
          />

          {/* Time Slot Dropdown */}
          <label htmlFor="time_slot">Select Time Slot</label>
          <select
            id="time_slot"
            name="time_slot"
            value={formData.time_slot}
            onChange={handleChange}
            required
          >
            <option value="">Select a time slot</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <button type="submit">Book Appointment</button>
        </form>

        {/* Display Available Time Slots */}
        {formData.appointment_date && (
          <div className="available-slots">
            <h3>Available Time Slots</h3>
            <ul>
              {availableSlots.length > 0 ? (
                availableSlots.map((slot, index) => (
                  <li key={index}>{slot}</li>
                ))
              ) : (
                <li>No available slots for the selected date.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Appointment;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Appointment.css";

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

function EditAppointment() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    contact_no: "",
    appointment_date: "",
    time_slot: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointmentDetails();
  }, []);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/appointments/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/appointments/${id}`, formData);
      alert("Appointment updated successfully!");
      navigate("/appointments"); // Navigate to the appointment list page
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment. Please try again.");
    }
  };

  return (
    <div>
      <h1>Edit Your Appointment</h1>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        {/* Contact Number Field */}
        <label>Contact No</label>
        <input type="text" name="contact_no" value={formData.contact_no} onChange={handleChange} required />

        {/* Date Field */}
        <label>Select Date</label>
        <input type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} required />

        {/* Time Slot Dropdown */}
        <label>Select Time Slot</label>
        <select name="time_slot" value={formData.time_slot} onChange={handleChange} required>
          <option value="">Select a time slot</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button type="submit">Edit Appointment</button>
      </form>
    </div>
  );
}

export default EditAppointment;
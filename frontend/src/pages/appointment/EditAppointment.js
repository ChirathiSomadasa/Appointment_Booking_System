import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { showSuccessAlert, showErrorAlert } from '../../utils/Alert';
import "./EditAppointment.css";

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
    email: "",
    contact_no: "",
    appointment_date: "",
    time_slot: ""
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointmentDetails();
  }, [id]);
  //fetch Appointment data
  const fetchAppointmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/appointments/get/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      });
      console.log("API Response:", response.data);

      const formattedData = {
        ...response.data,
        appointment_date: formatDate(response.data.appointment_date)
      };
      setFormData(formattedData);
    } catch (error) {
      console.error("Error fetching appointment details:", error);
      alert("Failed to load appointment details. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fetch available time slots when the date changes
  useEffect(() => {
    if (formData.appointment_date) {
      axios
        .get(`http://localhost:5000/appointments/booked-slots/${formData.appointment_date}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        })
        .then((response) => {
          const bookedSlots = response.data;
          const slots = timeSlots.filter((slot) => !bookedSlots.includes(slot));
          setAvailableSlots(slots);
        })
        .catch((error) => {
          console.error("Error fetching booked slots:", error);
        });
    } else {
      setAvailableSlots([]);
    }
  }, [formData.appointment_date]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number
    if (name === "contact_no") {
      const isValidPhone = /^[0-9]{10}$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact_no: !isValidPhone ? "Phone number must be 10 digits." : ""
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const errors = {};
    if (!formData.contact_no || !/^[0-9]{10}$/.test(formData.contact_no)) {
      errors.contact_no = "Phone number must be 10 digits.";
    }
    if (!formData.appointment_date) {
      errors.appointment_date = "Please select a valid date.";
    } else if (new Date(formData.appointment_date) < new Date()) {
      errors.appointment_date = "Past dates are not allowed.";
    }
    if (!formData.time_slot) {
      errors.time_slot = "Please select a time slot.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    //update appointment
    try {
      await axios.put(
        `http://localhost:5000/appointments/update/${id}`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem("token")
          }
        }
      );
      showSuccessAlert("Success!", "Appointment updated successfully!", () => {
        navigate('/appointmentList');
      });

    } catch (error) {
      console.error("Error updating appointment:", error);
      showErrorAlert("Error!", "Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="appointment-page">

      <div className="appointment-container">
        <h2>Edit an Appointment</h2>
        <form className="appointment-form" onSubmit={handleSubmit}>

          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact_no">Contact No</label>
          <input
            type="text"
            id="contact_no"
            name="contact_no"
            value={formData.contact_no}
            onChange={handleChange}
            required
          />
          {errors.contact_no && <span className="error">{errors.contact_no}</span>}

          <label htmlFor="appointment_date">Select Date</label>
          <input
            type="date"
            id="appointment_date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />
          {errors.appointment_date && <span className="error">{errors.appointment_date}</span>}

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
          {errors.time_slot && <span className="error">{errors.time_slot}</span>}

          <button type="submit">Edit Appointment</button>
        </form>

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

export default EditAppointment;
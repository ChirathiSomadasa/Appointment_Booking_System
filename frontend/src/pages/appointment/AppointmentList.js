import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Edit, Delete, Search, Clear } from "@mui/icons-material";
import "./AppointmentList.css";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Fetch all appointments from the backend
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/appointments/get`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setAppointments(response.data);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle search input changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter appointments based on the search query
    const filtered = appointments.filter((appointment) => {
      return (
        appointment.name.toLowerCase().includes(query) ||
        appointment.email.toLowerCase().includes(query) ||
        appointment.contact_no.includes(query) ||
        appointment.appointment_date.toLowerCase().includes(query) ||
        appointment.time_slot.toLowerCase().includes(query)
      );
    });

    setFilteredAppointments(filtered); // Update the filtered list
  };

  // Clear search input and reset filtered appointments
  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredAppointments(appointments);
  };

  // Handle edit button click
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await axios.delete(`http://localhost:5000/appointments/delete/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        fetchAppointments();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="appointment-list-container">
      <h1>My Appointments</h1>
      <br />

      <div className="search-container">
        <div className="input-with-icon">
          <Search className="search-icon-inside" />
          <input
            type="text"
            placeholder="Search by any field..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <button className="clear-search-button" onClick={handleClearSearch}>
          <Clear /> Clear Search
        </button>
      </div>

      <table className="appointment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact No</th>
            <th>Date</th>
            <th>Time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.name}</td>
                <td>{appointment.email}</td>
                <td>{appointment.contact_no}</td>
                <td>{appointment.appointment_date.split("T")[0]}</td>
                <td>{appointment.time_slot}</td>
                <td>
                  <button onClick={() => handleEdit(appointment.id)} className="edit-btn">
                    <Edit fontSize="small" />
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(appointment.id)} className="delete-btn">
                    <Delete fontSize="small" />
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
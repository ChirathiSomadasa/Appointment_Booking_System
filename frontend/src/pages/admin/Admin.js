import React, { useEffect, useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import { Search, Clear } from "@mui/icons-material";
import axios from "axios";
import "./Admin.css";

function Admin() {
  UseAuth();
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all appointments 
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/appointments/get/all",
          {},
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("token"),
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
        alert("Error fetching appointments. Please try again.");
      }
    };
    fetchAppointments();
  }, []);

  // Filter appointments based on search term across all fields
  const filteredAppointments = appointments.filter((appointment) =>
    Object.values(appointment).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Clear search functionality
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="admin-list-container">
      <div>
        <h1>Welcome to Admin Dashboard</h1>
      </div>
      <div className="admin-container">
        <h2>Manage Appointments</h2>
        <div className="search-container">
          <div className="input-with-icon">
            <Search className="search-icon-inside" />
            <input
              type="text"
              placeholder="Search by any field..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="clear-search-button" onClick={clearSearch}>
            <Clear /> Clear Search
          </button>
        </div>
        <table className="appointment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Contact No</th>
              <th>Date</th>
              <th>Time Slot</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.name}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.contact_no}</td>
                  <td>{appointment.appointment_date.split("T")[0]}</td>
                  <td>{appointment.time_slot}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No appointments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
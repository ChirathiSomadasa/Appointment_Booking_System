import React from "react";
import { Edit, Delete, Search } from "@mui/icons-material"; // Import Material Icons
import "./AppointmentList.css";

function AppointmentList() {
  return (
    <div className="appointment-list-container">
      <h2>My Appointments</h2>

      <div className="search-container">
        <input type="text" placeholder="Search by name or date..." />
        <Search className="search-icon" />
      </div>

      <table className="appointment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact No</th>
            <th>Date</th>
            <th>Time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>1234567890</td>
            <td>2024-02-08</td>
            <td>8:00 AM - 9:00 AM</td>
            <td>
              <button className="edit-btn">
                <Edit fontSize="small" /> Edit
              </button>
            </td>
            <td>
              <button className="delete-btn">
                <Delete fontSize="small" /> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;

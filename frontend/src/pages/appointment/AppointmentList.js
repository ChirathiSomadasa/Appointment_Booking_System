import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { Edit, Delete,Search } from "@mui/icons-material";
import "./AppointmentList.css";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/appointments/get`,{
        headers: {
          Authorization: 'Bearer '+ localStorage.getItem("token")
        }
    });
    
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await axios.delete(`http://localhost:5000/appointments/${id}`,{
         
          headers: {
            Authorization: 'Bearer '+ localStorage.getItem("token")
          }
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
      <div className="search-container">
        <input type="text" placeholder="Search by name or date..." />
        <Search className="search-icon" />
      </div>
      <table  className="appointment-table">
        <thead>
          <tr>
            
            <th>Contact No</th>
            <th>Date</th>
            <th>Time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.contact_no}</td>
              <td>{appointment.appointment_date}</td>
              <td>{appointment.time_slot}</td>
              <td>
                < Link to={`/edit/${appointment.id}`} className="edit-btn">
                <Edit fontSize="small" />
                  Edit
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(appointment.id)} className="delete-btn">
                <Delete fontSize="small" /> 
                Delete                 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
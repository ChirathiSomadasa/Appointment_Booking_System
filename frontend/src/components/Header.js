import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Notifications, Menu, Close, AccountCircle } from "@mui/icons-material";
import "./Header.css";
import UseLogout from "../hooks/UseLogout"; 

function Header() {
  const logout = UseLogout(); // Use the logout hook
  const [isOpen, setIsOpen] = useState(false);

  // Check if the user is logged in by verifying the presence of a token in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        <div className="nav-left">
          <h2 className="logo">CompanyName</h2>
          <div className="nav-links">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/appointment" className="nav-item">Appointment</Link>
            <Link to="/appointmentList" className="nav-item">My Appointments</Link>
          </div>
        </div>

        
        <div className="nav-right">
          {/* Conditional Rendering for Authenticated/Unauthenticated Users */}
          {isAuthenticated ? (
            <>
              {/* Show Logout Button for Authenticated Users */}
              <button onClick={logout} className="nav-item logout-btn">
                Logout
              </button>
              <Link to="/profile" className="icon">
                <AccountCircle />
              </Link>
              <Link to="/notifications" className="icon">
                <Notifications />
              </Link>
            </>
          ) : (
            <>
              {/* Show Login and Signup Buttons for Unauthenticated Users */}
              <Link to="/register" className="nav-item">Signup</Link>
              <Link to="/login" className="nav-item">Login</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Close /> : <Menu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/appointment" onClick={() => setIsOpen(false)}>Appointment</Link>

          {/* Conditional Rendering for Mobile Menu */}
          {isAuthenticated ? (
            <>
              {/* Show Logout Button for Authenticated Users */}
              <button onClick={logout} className="nav-item logout-btn" style={{ display: "block", width: "100%" }}>
                Logout
              </button>
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                <AccountCircle /> Profile
              </Link>
              <Link to="/notifications" onClick={() => setIsOpen(false)}>
                <Notifications /> Notifications
              </Link>
            </>
          ) : (
            <>
              {/* Show Login and Signup Buttons for Unauthenticated Users */}
              <Link to="/register" onClick={() => setIsOpen(false)}>Signup</Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Notifications, Menu, Close } from "@mui/icons-material";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        <div className="nav-left">
          <h2 className="logo">CompanyName</h2>
          <div className="nav-links">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/appointment" className="nav-item">Appointment</Link>
          </div>
        </div>

        <div className="nav-right">
          <Link to="/signup" className="nav-item">Signup</Link>
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/notifications" className="icon">
            <Notifications />
          </Link>
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
          <Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/notifications" onClick={() => setIsOpen(false)}>
            <Notifications />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;

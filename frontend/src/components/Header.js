import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Notifications, Menu, Close, AccountCircle } from "@mui/icons-material";
import "./Header.css";

function Header() {
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

          <Link to="/register" className="nav-item">Signup</Link>
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/logout" className="nav-item">Logout</Link>
          <Link to="/profile" className="icon">
            <AccountCircle />
          </Link>
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
          
          
          <Link to="/register" onClick={() => setIsOpen(false)}>Signup</Link>
          <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
          <Link to="/logout" onClick={() => setIsOpen(false)}>Logout</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)}>
            <AccountCircle /> Profile
          </Link>
          <Link to="/notifications" onClick={() => setIsOpen(false)}>
            <Notifications /> Notifications
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;

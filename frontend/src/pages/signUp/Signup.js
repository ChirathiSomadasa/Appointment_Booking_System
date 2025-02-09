import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { Link,useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/register`,
        formData
      );
      alert("User registered successfully");
      navigate('/login'); // Redirect to login page
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Display error message
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>CREATE AN ACCOUNT</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ paddingRight: "30px" }} // Add padding to avoid text overlap with the icon
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              style={{
                position: "absolute",
                right: "5px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="anchor">
            LOGIN
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
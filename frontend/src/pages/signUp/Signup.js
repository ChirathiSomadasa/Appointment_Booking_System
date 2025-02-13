import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { showSuccessAlert, showErrorAlert } from '../../utils/Alert'; 
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  // Handle input changes and validate in real-time
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate the field in real-time
    validateField(name, value);
  };

  // Real-time validation logic
  const validateField = (fieldName, value) => {
    let error = "";

    if (fieldName === "name") {
      if (/\d/.test(value)) error = "Name cannot contain numbers.";
    } else if (fieldName === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Please enter a valid email address.";
    } else if (fieldName === "password") {
      if (value.length < 4) error = "Password must be at least 4 characters long.";
    }

    // Update the specific field's error message
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (Object.values(errors).some((error) => error)) {
      showErrorAlert("Error!", "Failed to register  user.", "Please check your input and try again.");
      return;
    }

    try {
      await axios.post(`http://localhost:5000/auth/register`, formData);
      showSuccessAlert("Success!", "User registered successfully!", () => {
        navigate('/login'); 
    });
    } catch (error) {
      showErrorAlert("Error!", "Failed to register  user.","User already registered.");

    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>CREATE AN ACCOUNT</h2>

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
          {errors.name && <p className="error-message">{errors.name}</p>}
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
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

    
        <div className="form-group">
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"} 
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ paddingRight: "30px" }} 
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

          {errors.password && <p className="error-message">{errors.password}</p>}
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
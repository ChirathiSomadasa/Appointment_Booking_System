import React, { useState } from "react";
import axios from "axios";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { showSuccessAlert, showErrorAlert } from "../../utils/Alert";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = (e) => {
    e.preventDefault(); // Prevent form submission when toggling password visibility
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", formData);
      console.log("Login Response:", response.data);
      const { token, role, user } = response.data; // Assuming the backend returns user details (name, email) along with the token
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user)); // Store user details
      if (role === "admin") {
        showSuccessAlert("Success!", "User logged in successfully!", () => {
          navigate("/admin");
        });
      } else {
        showSuccessAlert("Success!", "User logged in successfully!", () => {
          navigate("/");
        });
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      showErrorAlert("Error!", "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <div className="form-group">
          <div className="input-wrapper">
            <Email className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <Lock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              className="visibility-icon"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/register" className="anchor">
            SIGN UP
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
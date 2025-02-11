import React, { useState } from "react";
import axios from "axios";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
  try {
    const response = await axios.post("http://localhost:5000/auth/login", formData);
    console.log("Login Response:", response.data);
    const { token, role, user } = response.data; // Assuming the backend returns user details (name, email) along with the token
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user)); // Store user details
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    alert("Login failed. Please check your credentials.");
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <div className="form-group">
          <TextField
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
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
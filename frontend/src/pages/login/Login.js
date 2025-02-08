import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import "./Login.css";
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>LOGIN</h2>

        <div className="form-group">
          <TextField
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
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
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </div>

        <button type="submit" className="login-btn">Login</button>
        <p className="signup-text">
          Already have an account? <Link to="/register" className="anchor">SIGN UP</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

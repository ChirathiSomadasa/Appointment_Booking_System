import React from "react";
import "./Signup.css";

function Signup() {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>CREATE AN ACCOUNT</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contact"
            placeholder="Enter your contact number"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;

// utils/logout.js
import { useNavigate } from "react-router-dom";

export const logout = () => {
  const navigate = useNavigate();

  // Clear token and role from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  // Redirect to the login page
  navigate("/login", { replace: true });
};
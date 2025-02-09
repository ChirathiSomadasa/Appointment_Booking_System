// hooks/useLogout.js
import { useNavigate } from "react-router-dom";

function useLogout (){
  const navigate = useNavigate();

  const logout = () => {
    // Clear token and role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to the login page
    navigate("/login", { replace: true });
  };

  return logout;
};

export default useLogout;
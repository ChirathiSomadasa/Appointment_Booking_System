import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuth () {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);
};

export default useAuth;
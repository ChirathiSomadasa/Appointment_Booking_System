import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UseAuth() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);
}

export default UseAuth;
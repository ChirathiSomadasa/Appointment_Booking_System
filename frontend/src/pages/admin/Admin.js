import React from "react";
import useAuth from "../../hooks/useAuth";

function Admin() {
  useAuth();
    return (
    <div>Admin</div>
    );
  }
  
  export default Admin;
  
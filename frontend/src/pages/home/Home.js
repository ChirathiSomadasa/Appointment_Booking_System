import React from "react";
import useAuth from "../../hooks/useAuth";

function Home() {

  useAuth();

  return (
  <div>Home</div>
  );
}

export default Home;

import React from "react";
import UseAuth from "../../hooks/UseAuth";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

function Home() {
  UseAuth();


  return (
    <div className="home-container">
     Home
    </div>
  );
}

export default Home;
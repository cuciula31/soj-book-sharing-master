import React from "react";
import "../css/home.css";
import Button from "@mui/material/Button";
import Navbar from "../navbar/Navbar";
import "react-alice-carousel/lib/alice-carousel.css";
import FeaturedWeek from "../dynamic/FeaturedWeek.jsx";
import BlindPick from "../dynamic/BlindPick";

function Home() {

  return (
    <div id="homeContainer">
      <Navbar />
      <div id="greetingContainer">
        <FeaturedWeek/>
      </div>
       <BlindPick/>
    </div>
  );
}

export default Home;

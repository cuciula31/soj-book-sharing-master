import React from "react";
import '../css/welcome.css';
import Button from "@mui/material/Button";


function Welcome(){
    return(
      <div id="welcomeContainer">
        <div id= "welcomePhoto"></div>
        <div id = "welcomeText">Sharing is caring, be a part of our journey and tell us your stories</div>
        <Button variant="outlined" href="/login" sx={{
            position:"absolute",
            bottom:"30%",
            left:"33%",
            color: "white",
            width: "30%",
            fontSize: "30px"
        }}>Get started now, is free</Button>
      </div> 
);
}

export default Welcome;
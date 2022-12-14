import React from "react";
import '../css/notFound.css';

import Button from "@mui/material/Button";


function NotFound(){
    return(
      <div id="container">
        <div id="errorPhotoContainer"/>
        <div id="heading">Look, it's a 404</div>
        <div id="content">Our archeologist found into hieroglyphics that there is an error, come back to home</div>
        <Button href = "/" variant="outlined" sx={{
            color:"white",
            width:"30%",
            position: "absolute",
            bottom: "33%",
            left: "33%",
            fontSize: "20px"
        }}>Back to home</Button>
      </div>
        
);
}

export default NotFound;
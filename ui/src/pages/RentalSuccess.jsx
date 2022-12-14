import { Grow } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/rentalSuccess.css';


function RentalSuccess(){

    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/explore");
    }, 21000);

    return(
      <div id="rentalSuccessContainer">
        <div id="rentalSuccessSubContainer">

            <div id="rentalSuccessText1">Yay, thank You!</div>
            <div id="rentalSuccessText2">It will take a little while until owner will review your rent, and then you can be a part of a new story</div>
        </div>
      </div>
        
);
}

export default RentalSuccess;
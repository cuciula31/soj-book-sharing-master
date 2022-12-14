import React from "react";
import "../../css/rentals/rentalContainer.css"

import Pending from "./Pending";
import Rentals from "./Rentals";
import Rejected from "./Rejected";
import EndedRental from "./EndedRental";



function RentalContainer(props){

    const user = props.user;

    return(
      <div id="rentalContainer">
        <div id="pendingsContainer">
            <Pending user = {user}/>
        </div>
        <div id="rentalsContainer">
            <Rentals user = {user}/>
        </div>
        <div id="rejectedContainer">
            <Rejected user = {user}/>
        </div>
        <div id="endedContainer">
            <EndedRental user = {user}/>
        </div>
      </div>
        
);
}

export default RentalContainer;
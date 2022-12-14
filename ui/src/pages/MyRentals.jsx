import React, { useEffect, useState } from "react";
import "../css/myRentals.css";
import Navbar from "../navbar/Navbar";
import { Button } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import RentalContainer from "../dynamic/rentals/RentalContainer"

function MyRentals() {

    const currentUser = jwt(Cookies.get("user"));
    const userId = currentUser.id;
  
    const [books, setBooks] = useState([]);
  
    let items = [];
  
    
  
    useEffect(() => {
      fetch("http://localhost:8080/api/users/" + userId + "/books", {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        method: "get",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setBooks(data);
        });
    }, []);
  
  
    return (
      <div id="myRentalsContainer">
        <Navbar />
        <div id="MyRentalsSubContainer">
        <RentalContainer user = {currentUser} />
        </div>
      </div>
    );
  }

export default MyRentals;

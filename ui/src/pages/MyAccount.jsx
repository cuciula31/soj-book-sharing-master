import React, { useEffect, useState } from "react";
import '../css/myAccount.css';
import Navbar from "../navbar/Navbar";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import AliceCarousel from "react-alice-carousel";
import ListElement from "../dynamic/ListElement";

function MyAccount(){
    const cookieUser = Cookies.get("user");
    const decodedUser = jwt(cookieUser);
    const userId = decodedUser.id;
    const [books, setBooks] = useState([]);
    var items = [];


    window.addEventListener("load", initializeThumbs());

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



  function initializeThumbs() {
    books.forEach((b) => {
      console.log(b.thumb);
      items.push(
        <item style={{ width: "200px", height: "235px" }}>
          <ListElement
            book = {b}
          />
        </item>
      );
    });
  }

    const responsive = {
      1024: { items: 9 },
  };


    return(
      <div id="myAccountContainer">  
      <Navbar/>
      <div id="accountContainerBar">
        <AccountCircle sx = {{
            position: "absoulte",
            fontSize : "150px",
             top : "90%",
             color: "white"
        }}/>
        <div id="accountNameText" style={{
            position: "absolute",
            color: "white",
            fontFamily: "impact",
            top: "15.5%",
            left: "10%",
            fontSize: "75px"
        }}>
           {decodedUser.name.toUpperCase() + " " + decodedUser.surname.toUpperCase()}
         </div>
      </div>
      <div id="accountSomeListingsText">Here are some of your listings</div>
      <div id="accountSomeListings">
      <AliceCarousel id = "accountSomeListingsCarousel" responsive={responsive} 
             autoHeight disableButtonsControls disableDotsControls  mouseTracking items={items}/>
      </div>
      
      <div id="deleteYourAccount"></div>
      </div>
);
}

export default MyAccount;
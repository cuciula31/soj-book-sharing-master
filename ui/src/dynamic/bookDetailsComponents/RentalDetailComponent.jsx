import React, { useEffect } from "react";
import "../../css/bookDetailComponents/rentalDetailComponent.css";

import Button from "@mui/material/Button";
import { useState } from "react";
import styled from "styled-components";
import { MenuItem, TextField } from "@mui/material";
import jwt from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

let book;
let userId = jwt(Cookies.get("user")).id;

// function rentReleased() {

// }

function ExploreDetailAvailableText(props) {
  const available = props.available;

  if (available) {
    return (
      <div style={{ color: "white" }} id="exploreDetailAvailableText">
        This book is available for renting
      </div>
    );
  } else {
    return (
      <div style={{ color: "white" }} id="exploreDetailAvailableText">
        This book isn't available for renting, you can add it to wishlist if you
        want
      </div>
    );
  }
}

function OtherPendingAcceptButton(props) {
  const object = props.object;
  const navigate = useNavigate();

  function sendRental() {
    console.log(object.id);

    fetch(
      "api/users/" +
        object.user.id +
        "/books/rent/" +
        object.book.id +
        "/period/" +
        1,
      {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        method: "put",
      }
    ).then((response) => {
      return response.json();
    });

    fetch(
      "api/rentals/pending/" + object.id,

      {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        method: "delete",
      }
    )
      .then((response) => {
        navigate("/rentals");
      });
      
  }

  return (
    <Button
      id="acceptButton"
      sx={{
        color: "white",
        width: "100%",
        height: "7ch",
        backgroundColor: "green",
      }}
      onClick={sendRental}
    >
      Accept
    </Button>
  );
}

function OtherPendingRejectButton(props) {
  const object = props.object;
  const navigate = useNavigate();

  function sendRental() {
    console.log(object);

    fetch(
      "api/users/" +
        object.user.id +
        "/books/rent/" +
        object.book.id +
        "/rejected/" +
        object.rentedFrom.id,
      {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        method: "put",
      }
    ).then((response) => {
      return response.json();
    });

    fetch(
      "api/rentals/pending/" + object.id,

      {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        method: "delete",
      }
    )
      .then((response) => {
        navigate("/rentals");
      });
      
  }
  return (
    <Button
      id="rejectButton"
      onClick={sendRental}
      sx={{
        color: "white",
        width: "100%",
        height: "7ch",
        backgroundColor: "red",
      }}
    >
      Reject
    </Button>
  );
}

function PendingContainer(props) {
  const object = props.object;
  const bookOwner =
    object.rentedFrom.name.charAt(0).toUpperCase() +
    object.rentedFrom.name.slice(1) +
    " " +
    object.rentedFrom.surname.charAt(0).toUpperCase() +
    object.rentedFrom.surname.slice(1);

  console.log(bookOwner);

  return (
    <div id="rentalDetailPendingContainer">
      <div id="rentalDetailPendingText">
        Your rental will be reviewed soon by:{"\n"} {bookOwner}, which is owner
        of book. You will may be contacted for details.
      </div>
    </div>
  );
}

function OtherPendingContainer(props) {
  const object = props.object;
  const username =
    object.user.name.charAt(0).toUpperCase() +
    object.user.name.slice(1) +
    " " +
    object.user.surname.charAt(0).toUpperCase() +
    object.user.surname.slice(1);
  return (
    <div id="rentalDetailOtherPendingContainer">
      <div id="rentalDetailOtherPendingTextContainer"></div>
      <div id="rentalDetailOtherPendingText">
        {username} want to rent your book until{" "}
        {object.endDate.substring(0, 10)}. Contact this user if you have any
        doubts.
      </div>
      <div id="rentalDetailOtherPendingButton">
        <OtherPendingAcceptButton  object={object} />
        <OtherPendingRejectButton object = {object}/>
      </div>
    </div>
  );
}

function ActiveEndButton(props){
  const object = props.object;
  const navigate = useNavigate();

  function sendRental() {
    console.log(object.id);

    fetch(
      "api/users/" +
        object.user.id +
        "/books/rent/" +
        object.book.id +
        "/ended/" +
        object.rentedFrom.id,
      {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        method: "put",
      }
    ).then((response) => {
      return response.json();
    });

    fetch(
      "api/rentals/" + object.id,

      {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        method: "delete",
      }
    )
      .then((response) => {
        navigate("/rentals");
      })
  }

  return(
<Button 
onClick={()=>(sendRental())}
sx={{
        color: "black",
        width: "100%",
        height: "2.5vw",
        fontFamily : "impact",
        fontSize: "1.2vw",
        backgroundColor: "LightBlue",
      }} >End rental</Button>
  )
}

function ActiveContainer(props) {
  const object = props.object;
  const owner = object.rentedFrom.name.charAt(0).toUpperCase() + object.rentedFrom.name.slice(1) + " " + object.rentedFrom.surname.charAt(0).toUpperCase() + object.rentedFrom.surname.slice(1);

  console.log(object);

  return (
    <div id="rentalDetailActiveContainer">
      <div id="rentalDetailActiveTextContainer">
        You rented this book from {owner} at date of {object.startDate.substring(0, 10)} and you must return it at date of {object.endDate.substring(0, 10)}. Have fun!
      </div>
      <div id="rentalDetailActiveButtonContainer">
        <ActiveEndButton object = {object}/>
        <Button sx={{
        color: "black",
        fontFamily : "impact",
        width: "100%",
        height: "2.5vw",
        fontSize: "1.2vw",
        backgroundColor: "lightgrey",
      }} >Extend rental</Button>
      </div>
    </div>
  );
}

function OtherActiveContainer(props) {
  const object = props.object;
  const whoRented = object.user.name.charAt(0).toUpperCase() + object.user.name.slice(1) + " " + object.user.surname.charAt(0).toUpperCase() + object.user.surname.slice(1);

  console.log(object);

  return (
    <div id="rentalDetailActiveContainer">
      <div id="rentalDetailActiveTextContainer">
       {whoRented} rented this book from you at date of {object.startDate.substring(0, 10)} and it must return at date of {object.endDate.substring(0, 10)}. 
      </div>
    </div>
  );
}

function ContainerSelector(props) {
  const pending = props.pending;
  const otherPending = props.otherPending;
  const active = props.active;
  const otherActive = props.otherActive;
  const rejected = props.rejected;
  const ended = props.ended;
  const object = props.object;

  if (pending) {
    return <PendingContainer object={object} />;
  }

  if (otherPending) {
    return <OtherPendingContainer object={object} />;
  }

  if (active) {
    return <ActiveContainer object={object} />;
  }

  if (otherActive) {
    return <OtherActiveContainer object={object} />;
  }
}

function RentalDetailComponent(props) {
  const pending = props.pending;
  const otherPending = props.otherPending;
  const active = props.active;
  const otherActive = props.otherActive;
  const rejected = props.rejected;
  const ended = props.ended;
  const object = props.object;

  console.log(object);

  return (
    <div id="rentalDetailContainer">
      <ContainerSelector
        pending={pending}
        otherPending={otherPending}
        active={active}
        otherActive={otherActive}
        rejected={rejected}
        ended={ended}
        object={object}
      />
    </div>
  );
}

export default RentalDetailComponent;

import React, { useEffect } from "react";
import "../../css/bookDetailComponents/exploreDetailComponent.css";

import Button from "@mui/material/Button";
import { useState } from "react";
import styled from "styled-components";
import { MenuItem, TextField } from "@mui/material";
import jwt from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

let book;
var rentingPeriod = 1;
let userId = jwt(Cookies.get("user")).id;

function rentReleased() {

  fetch(
    "api/users/" +
      userId +
      "/books/rent/" +
      book.id +
      "/period/" +
      rentingPeriod +
      "/pending",
    {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      method: "put",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

function wishlistReleased() {

  fetch(
    "api/users/" +
      userId +
      "/books/rent/" +
      book.id +
      "/addtowishlist",
    {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      method: "put",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}


const StyledTextField = styled(TextField)`
  background: transparent;
  & label.Mui-focused {
    color: white;
  }
  & label {
    color: white;
  }
  & .MuiInput-underline:after {
    border-bottom-color: white;
  }
  & .MuiOutlinedInput-input {
    color: white;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: white;
    }
    &:hover fieldset {
      border-color: white;
    }
    &.Mui-focused fieldset {
      border-color: white;
      text-color: white;
    }
  }
`;

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

function ExploreDetailOwnerText(props) {
  const available = props.available;
  const owner = props.owner;

  if (available) {
    return <div id="exploreDetailOwnerText">provided by: Giani Pistolaru'</div>;
  }
}

function ExploreDetailDateSelector(props) {
  const available = props.available;
  const navigate = useNavigate();

  if (available) {
    return (
      <StyledTextField
        value={rentingPeriod}
        onChange={(e) => {
          rentingPeriod = e.target.value;
        }}
        select
        variant="outlined"
        label="Renting period"
        sx={{
          width: "100%",
          color: "white",
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        <MenuItem value={1}>One week</MenuItem>
        <MenuItem value={2}>Two weeks</MenuItem>
        <MenuItem value={3}>Three weeks</MenuItem>
        <MenuItem value={4}>One month</MenuItem>
      </StyledTextField>
    );
  }
}

function ExploreDetailButton(props) {
  const available = props.available;
  const navigate = useNavigate();

  

  if (available) {
    return (
      <Button
        sx={{
          color: "white",
          width: "100%",
          height: "7ch",
          backgroundColor: "green",
        }}
        onClick={()=>{
          rentReleased();
          navigate("/success");
        }}
      >
        Rent right now!
      </Button>
    );
  } else {
    return (
      <Button
        sx={{
          color: "white",
          width: "100%",
          height: "7ch",
          backgroundColor: "gray",
        }}
        onClick={()=>{
          rentReleased();
          navigate("/explore");
        }}
      >
        Add to wishlist
      </Button>
    );
  }
}

function ExploreDetailComponent(props) {
  const [isAvailable, setAvailable] = useState(true);
  book = props.book;

  useEffect(() => {
    fetch("api/rentals/available/" + book.id, {
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
        setAvailable(data);
      });
  }, []);

  return (
    <div id="exploreDetailContainer">
      <div id="exploreDetailAvailableTextContainer">
        <ExploreDetailAvailableText available={isAvailable} />
      </div>
      <div id="exploreDetailOwnerContainer">
        <ExploreDetailOwnerText available={isAvailable} />
      </div>
      <div id="exploreDetailDateSelectorContainer">
        <ExploreDetailDateSelector available={isAvailable} />
      </div>
      <div id="exploreDetailButtonContainer">
        <ExploreDetailButton available={isAvailable} />
      </div>
    </div>
  );
}

export default ExploreDetailComponent;

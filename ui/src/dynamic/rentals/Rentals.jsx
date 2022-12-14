import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../css/rentals/pending.css";
import { useEffect } from "react";
import ListElement from "../ListElement";

function Rentals(props) {
  const user = props.user;

  const [expanded, setExpanded] = useState(false);
  const [rentals, setRentals] = useState([]);
  const [otherRentals, setOtherRentals] = useState([]);

  var rentalItems = [];
  var othersRentalItems = [];

  window.addEventListener("load", initializeThumbs());

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/users/" + user.id + "/books/rented", {
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
        setRentals(data);
        console.log(data);
      });

    fetch("http://localhost:8080/api/users/" + user.id + "/books/whorented", {
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
        setOtherRentals(data);
      });
  }, []);

  function initializeThumbs() {
    rentals.forEach((b) => {
      console.log(b.book.thumb);
      rentalItems.push(
        <item style={{ maxWidth: "200px", height: "fit-content" }}>
          <ListElement book={b.book} rental={true} active={true} object={b} />
        </item>
      );
    });

    otherRentals.forEach((b) => {
      // console.log(b.book.thumb);
      othersRentalItems.push(
        <item style={{ width: "fit-content", height: "fit-content" }}>
          <ListElement
            book={b.book}
            rental={true}
            otherActive={true}
            object={b}
          />
        </item>
      );
    });
  }

  return (
    <div id="pendingMainContainer">
      <Accordion
        expanded={expanded === "panel1"}
        sx={{ backgroundColor: "green", color: "snow" }}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1bh-header">
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            My active rentals
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            position: "relative",
            zIndex: "11",
            top: "-5%",
            display: "flex",
            flexFlow: "row",
            height: "fit-content",
            maxWidth: "fit-content",
            alignContent: "flex-start",
            flexFlow: "row wrap",
          }}
        >
          <div id="othersBookList">{rentalItems}</div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ backgroundColor: "green", color: "snow" }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Active rentals from others
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            position: "relative",
            zIndex: "11",
            top: "-5%",
            display: "flex",
            flexFlow: "row",
            height: "fit-content",
            maxWidth: "fit-content",
            alignContent: "flex-start",
            flexFlow: "row wrap",
          }}
        >
          <div id="othersBookList">{othersRentalItems}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Rentals;

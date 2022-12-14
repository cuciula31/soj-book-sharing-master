import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../../css/rentals/pending.css"
import { useEffect } from "react";
import ListElement from "../ListElement";




function Rejected(props){

  const user = props.user;


  const [expanded, setExpanded] = useState(false);
  const [rejected,setRejected] = useState([]);
  const [usersRejected,setusersRejected] = useState([]);

  var rejectedItems = [];
  var usersRejectedItems = [];


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  window.addEventListener("load", initializeThumbs());

  useEffect(() => {
    fetch("http://localhost:8080/api/users/"+user.id+"/books/rejected", {
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
        setRejected(data);
      });

      fetch("http://localhost:8080/api/users/"+user.id+"/books/usersrejected", {
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
        setusersRejected(data);

      });

  }, []);



function initializeThumbs() {
  rejected.forEach((b) => {
    rejectedItems.push(
      <item style={{maxWidth: "200px", height: "fit-content" }}>
        <ListElement
         book = {b.book} rental = {true} rejected = {true} object = {b}
        />
      </item>
    );
  });

  usersRejected.forEach((b) => {
    usersRejectedItems.push(
      <item style={{  width: "fit-content", height: "fit-content" }}>
        <ListElement
         book = {b.book} rental = {true} rejected = {true} object = {b}
        />
      </item>
    );
  });
  }


    return(
      <div id="pendingMainContainer">
       <Accordion expanded={expanded === 'panel1'} sx={{backgroundColor:"orangeRed", color:"snow"}} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            My rejected rentals
          </Typography>
        </AccordionSummary>
        <AccordionDetails id="myPendingsList"  sx={{position:"relative",zIndex:"11", top:"-5%", display:'flex',flexFlow:"row", height:"fit-content", maxWidth:"fit-content", alignContent:"flex-start", flexFlow:"row wrap" }}>
        <div id="othersBookList">
        {rejectedItems}
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{backgroundColor:"orangeRed", color:"snow"}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Rentals rejected by others</Typography>
          
        </AccordionSummary>
        <AccordionDetails id="myPendingsList"  sx={{position:"relative",zIndex:"11", top:"-5%", display:'flex',flexFlow:"row", height:"fit-content", maxWidth:"fit-content", alignContent:"flex-start", flexFlow:"row wrap" }}>
        <div id="othersBookList">
        {usersRejectedItems}
        </div>
        </AccordionDetails>
      </Accordion>
      </div>
        
);
}

export default Rejected;
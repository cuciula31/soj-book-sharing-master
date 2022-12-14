import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../../css/rentals/pending.css"
import { useEffect } from "react";
import ListElement from "../ListElement";



function Pending(props){

  const user = props.user;


    const [expanded, setExpanded] = useState(false);
    const [pending,setPending] = useState([]);
    const [userPending,setUserPending] = useState([]);

    var pendingItems = [];
    var userPendingItems = [];


    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    window.addEventListener("load", initializeThumbs());

    useEffect(() => {
      fetch("http://localhost:8080/api/users/"+user.id+"/books/pending", {
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
          setPending(data);
        });

        fetch("http://localhost:8080/api/users/"+user.id+"/books/userspending", {
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
          setUserPending(data);

        });

    }, []);



  function initializeThumbs() {
    pending.forEach((b) => {
      pendingItems.push(
        <item style={{maxWidth: "200px", height: "fit-content" }}>
          <ListElement
           book = {b.book} rental = {true} pending = {true} object = {b}
          />
        </item>
      );
    });

    userPending.forEach((b) => {
      userPendingItems.push(
        <item style={{  width: "fit-content", height: "fit-content" }}>
          <ListElement
           book = {b.book} rental = {true} otherPending = {true} object = {b}
          />
        </item>
      );
    });
    }


    return(
      <div id="pendingMainContainer">
       <Accordion expanded={expanded === 'panel1'} sx={{backgroundColor:"orange",height:"fit-content", color:"snow"}} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            My rentals on pending
          </Typography>
        </AccordionSummary>
        <AccordionDetails id="myPendingsList" sx={{position:"relative",zIndex:"11", top:"-5%", display:'flex',flexFlow:"row", height:"fit-content", maxWidth:"fit-content", alignContent:"flex-start", flexFlow:"row wrap" }}>
        
        <div id="othersBookList">
        {pendingItems}
        </div>
     
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{backgroundColor:"orange", color:"snow"}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Rentals pending from others</Typography>
          
        </AccordionSummary>
        <AccordionDetails id="myPendingsList"  sx={{position:"relative",zIndex:"11", top:"-5%", display:'flex',flexFlow:"row", height:"fit-content", maxWidth:"fit-content", alignContent:"flex-start", flexFlow:"row wrap" }}>
        <div id="othersBookList">
        {userPendingItems}
        </div>
        </AccordionDetails>
      </Accordion>
      </div>
        
);
}

export default Pending;
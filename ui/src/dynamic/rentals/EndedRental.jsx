import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../../css/rentals/pending.css"
import { useEffect } from "react";
import ListElement from "../ListElement";




function EndedRental(props){

    const [expanded, setExpanded] = useState(false);

    const user = props.user;

    const [ended,setEnded] = useState([]);
    const [userEnded,setUserRented] = useState([]);

    var endedItems = [];
    var userEndedItems = [];
    window.addEventListener("load", initializeThumbs());

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
      fetch("http://localhost:8080/api/users/" + user.id + "/books/ended", {
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
          setEnded(data);
          console.log(data);
        });
  
      fetch("http://localhost:8080/api/users/" + user.id + "/books/usersended", {
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
          setUserRented(data);
        });
    }, []);

    function initializeThumbs() {
      ended.forEach((b) => {
        endedItems.push(
          <item style={{maxWidth: "200px", height: "fit-content" }}>
            <ListElement
             book = {b.book} explore = {true}
            />
          </item>
        );
      });
  
      userEnded.forEach((b) => {
        userEndedItems.push(
          <item style={{  width: "fit-content", height: "fit-content" }}>
            <ListElement
             book = {b.book} myBook  = {true}
            />
          </item>
        );
      });
      }

    return(
      <div id="pendingMainContainer">
       <Accordion expanded={expanded === 'panel1'} sx={{backgroundColor:"gray", color:"snow"}} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            My rentals history
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{position:"relative",zIndex:"11", top:"-5%", display:'flex',flexFlow:"row", height:"fit-content", maxWidth:"fit-content", alignContent:"flex-start", flexFlow:"row wrap" }}>
          
          <div id="othersBookList">{endedItems}</div>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{backgroundColor:"gray", color:"snow"}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Others rentals history</Typography>
          
        </AccordionSummary>
        <AccordionDetails sx={{position:"relative",zIndex:"11", top:"-5%", display:'flex',flexFlow:"row", height:"fit-content", maxWidth:"fit-content", alignContent:"flex-start", flexFlow:"row wrap" }}>
          
          <div id="othersBookList">{userEndedItems}</div>
        </AccordionDetails>
      </Accordion>
      </div>
        
);
}

export default EndedRental;
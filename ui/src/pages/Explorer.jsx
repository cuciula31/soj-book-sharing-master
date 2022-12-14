import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import "../css/explorer.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
  ToggleButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import ListElement from "../dynamic/ListElement";

const StyledTextField = styled(TextField)`
  background: transparent;
  & label.Mui-focused {
    color: black;
  }
  & label {
    color: black;
  }
  & .MuiInput-underline:after {
    border-bottom-color: black;
  }
  & .MuiOutlinedInput-input {
    color: black;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: black;
    }
    &:hover fieldset {
      border-color: black;
    }
    &.Mui-focused fieldset {
      border-color: black;
      text-color: black;
    }
  }
`;

function fetchBySearch(fragment,books,items) {

  console.log(items);
  if(fragment.length > 0){
    books.forEach((b)=>{
      if(b.bookTitle.toLowerCase().includes(fragment.toLowerCase())){
        items.push(
          <item style={{ width: "200px", height: "235px" }}>
          <ListElement book = {b} />
        </item>
        )
      }
    });
  }  else{
   initializeThumbs(books,items)
  }
  
        
  }


  function initializeThumbs(books,items) {
    books.forEach((b) => {
      items.push(
        <item style={{ width: "200px", height: "235px" }}>
          <ListElement book = {b} explore = {true} />
        </item>
      );
    });
  }

function Explorer() {
  const [expanded, setExpanded] = React.useState(false);
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  

var items = [];



  useEffect(() => {

    fetch("api/books", {
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
    ;

  }, []);
    
  initializeThumbs(books,items);

  

  

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div id="explorerMainContainer">
      <Navbar />
      <div id="exploreMainSubContainer">
        <Accordion
          sx={{
            zIndex: "11",
            position: "absolute",
            top: "5%",
            width: "100%",
            backgroundColor: "darkgray",
          }}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              sx={{
                width: "33%",
                flexShrink: 0,
                fontFamily: "impact",
                fontSize: "22px",
              }}
            >
              Filters
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StyledTextField
              label="Search"
              sx={{ width: "15%", m: "20px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={searchText}
              onChange={e => {setSearchText(e.target.value);
              fetchBySearch(searchText,books,items)}}
            />
            <StyledTextField
              label="Category"
              select
              sx={{ width: "15%", m: "20px" }}
            >
              <MenuItem value={"Adventure"}>Adventure</MenuItem>
              <MenuItem value={"Comic"}>Comic</MenuItem>
              <MenuItem value={"Mystery"}>Mystery</MenuItem>
              <MenuItem value={"Fantasy"}>Fantasy</MenuItem>
              <MenuItem value={"Fiction"}>Fiction</MenuItem>
              <MenuItem value={"Horror"}>Horror</MenuItem>
              <MenuItem value={"Romance"}>Romance</MenuItem>
              <MenuItem value={"Sci-fi"}>Sci-fi</MenuItem>
              <MenuItem value={"Thriller"}>Thriller</MenuItem>
              <MenuItem value={"Biographies"}>Biographies</MenuItem>
              <MenuItem value={"Cookbooks"}>Cookbooks</MenuItem>
              <MenuItem value={"History"}>History</MenuItem>
              <MenuItem value={"Poetry"}>Poetry</MenuItem>
              <MenuItem value={"Self-Help"}>Self-Help</MenuItem>
              <MenuItem value={"True Crime"}>True Crime</MenuItem>
            </StyledTextField>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Only available books"
              sx={{ m: "20px" }}
            />
          </AccordionDetails>
        </Accordion>

        <div id="allBooksListSubContainer">
          <div id="allBooksList">{items}</div>
        </div>
      </div>
    </div>
  );
}

export default Explorer;

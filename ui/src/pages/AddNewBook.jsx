import React, { useEffect } from "react";
import "../css/addNewBook.css";
import Navbar from "../navbar/Navbar";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { useState } from "react";
import $ from "jquery";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../util/UseLocalState";

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

const addBookButtonSx = {
  position: "absolute",
  boxShadow: 3,
  backgroundColor: "green",
  color: "white",
  left: "15%",
  bottom: "20%",
  width: "30%",
  position: "absolute",
  "&:hover": {
    backgroundColor: "green",
    boxShadow: 8,
  },
};

function AddNewBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumb, setThumb] = useState("");

  const currentUser = jwt(Cookies.get("user"));
  const userId = currentUser.id;

  const navigate = useNavigate();

  var isPhoto = false;
  var counter = 0;
  var photo;

  const requestBody = {
    bookTitle: title,
    author: author,
    category: category,
    description: description,
    thumb: thumb,
  };

  // function fetchPhoto() {

  //   fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`, {
  //     method: "GET"
  //   })
  //     .then(res => res.json())
  //     .then(jsonResult => {
  //       while (!isPhoto && counter < jsonResult.items.length) {
  //         if(typeof jsonResult.items[counter].volumeInfo.imageLinks?.thumbnail !== 'undefined'){
  //           photo = jsonResult.items[counter].volumeInfo.imageLinks?.thumbnail;
  //           console.log(photo);
  //           isPhoto = true;
  //         }else{
  //           counter++;
  //         }
  //       }
  //       setThumb(photo);
  //       $("#addBookPhoto").attr(
  //         "style",
  //         "background-image:url(" +
  //               photo +
  //           "); background-repeat:no-repeat;background-position:center;background-size:cover;"
  //       );
  //     })
  // }

  function fetchPhoto(){
    fetch(`https://cors-anywhere.herokuapp.com/https://bookcoverapi.herokuapp.com/bookcover?book_title=` + title.split(" ").join('+') + `&author_name=`+ author.split(" ").join('+') , {
      method: "GET"
    })
      .then(res => res.json())
      .then(jsonResult => {
       
            photo = jsonResult.url;
            console.log(photo);
        
        setThumb(photo);
        console.log(photo);
        $("#addBookPhoto").attr(
                  "style",
                  "background-image:url(" +
                        photo +
                    "); background-repeat:no-repeat;background-position:center;background-size:cover;"
                );
              })
  }

  function sendDataToServer() {
    fetch("http://localhost:8080/api/users/" + userId + "/books", {
      headers: {
        "Content-type": "application/json",
      },
      method: "put",
      body: JSON.stringify(requestBody),
    }).then((response) => {
      if (response.status === 200) {
        navigate("/mybooks");
      }
    });
  }

  const [books, setBooks] = useLocalState(
    localStorage.getItem("books"),
    "books"
  );

 
  return (
    <div id="addNewBookContainer">
      <Navbar />
      <div id="addBookPhoto" />
      <div id="addNewBookBackground"></div>
      <div id="addNewBookGenericText">Sharing is caring, thank you!</div>
      <div id="addNewBookSubContainer">
        <StyledTextField
          id="addNewBookTitleField"
          value={title}
          onChange={(a) => {
            setTitle(a.target.value);
          }}
          label="Book title"
          sx={{
            position: "absolute",
            top: "15%",
            left: "15%",
            width: "30%",
            height: "40%",
          }}
        />
        <StyledTextField
          value={author}
          onChange={(b) => {
            setAuthor(b.target.value);
            console.log(b.target.value);
          }}
          id="addNewBookAuthorField"
          label="Author"
          sx={{
            position: "absolute",
            top: "25%",
            left: "15%",
            width: "30%",
            height: "40%",
          }}
        />
        <StyledTextField
          value={category}
          onChange={(c) => {
            setCategory(c.target.value);
            fetchPhoto();
          
          }}
          id="addNewBookCategoryField"
          select
          variant="outlined"
          label="Book category"
          sx={{
            position: "absolute",
            top: "35%",
            left: "15%",
            width: "30%",
            color: "white",
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
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
        <StyledTextField
          id="addNewBookDescriptionField"
          value={description}
          onChange={(d) => setDescription(d.target.value)}
          multiline
          minRows={7}
          maxRows={8}
          label="Description"
          sx={{
            position: "absolute",
            top: "45%",
            left: "15%",
            width: "30%",
            height: "40%",
          }}
        />
        <Button
          id="addNewBookButton"
          sx={addBookButtonSx}
          onClick={() => {
            sendDataToServer();
          }}
        >
          Add new book!
        </Button>
      </div>
    </div>
  );
}

export default AddNewBook;

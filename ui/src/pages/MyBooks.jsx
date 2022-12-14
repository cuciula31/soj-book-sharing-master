import React, { useEffect, useState } from "react";
import "../css/myBooks.css";
import Navbar from "../navbar/Navbar";
import { Button } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import ListElement from "../dynamic/ListElement";

function MyBooks() {
  const currentUser = jwt(Cookies.get("user"));
  const userId = currentUser.id;

  const [books, setBooks] = useState([]);

  let items = [];

  console.log(books);

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

  return (
    <div id="myBooksContainer">
      <Navbar />
      <div id="MyBooksSubContainer">
      <Button
        id="addNewBookButton"
        href="/addbook"
        sx={{
          position: "relative",
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          alignItems:"flex-end",
          width: "100%",
          height: "15vh",
          backgroundColor: "green",
        }}
      >
        <ControlPointIcon
          sx={{
            // position: "absolute",
            color: "white",
            fontSize: "85px",
            // bottom: "10%",
            // left: "28%",
          }}
        />
        <div
          style={{
            // position: "absolute",
            fontFamily: "impact",
            fontSize: "50px",
            color: "white",
            // bottom: "15%",
          }}
        >
          Want to add a new book?
        </div>
      </Button>
      <div id="myBooksListSubContainer">
        <div id="myBooksList">{items}</div>
      </div>
      </div>
    </div>
  );
}

export default MyBooks;

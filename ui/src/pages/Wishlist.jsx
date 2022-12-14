import React, { useEffect, useState } from "react";
import "../css/myBooks.css";
import Navbar from "../navbar/Navbar";
import Cookies from "js-cookie";
import jwt from "jwt-decode";
import ListElement from "../dynamic/ListElement";


function Wishlist() {
    const currentUser = jwt(Cookies.get("user"));
    const userId = currentUser.id;
  
    const [books, setBooks] = useState([]);
  
    let items = [];
  
    console.log(books);
  
    window.addEventListener("load", initializeThumbs());
  
    useEffect(() => {
      fetch("http://localhost:8080/api/users/" + userId + "/wishlist", {
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
        <div id="myBooksListSubContainer">
          <div id="myBooksList">{items}</div>
        </div>
        </div>
      </div>
    );
  }
  
  export default Wishlist;
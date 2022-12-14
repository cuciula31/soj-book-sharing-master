import React, { useState } from "react";
import "../css/ListElement.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function navigateFromElement(myBook, rental, explore) {}

function ListElement(props) {
  //Corespondent book
  const book = props.book;

  //Default states props
  const myBook = props.myBook;
  const rental = props.rental;
  const explore = props.explore;

  //Rental states props
  const pending = props.pending;
  const otherPending = props.otherPending;
  const active = props.active;
  const otherActive = props.otherActive;
  const rejected = props.rejected;
  const ended = props.ended;

  const object = props.object;

  return (
    // <Button id="listElementContainer">
    <Link
      id="listElementContainer"
      to="/mybook"
      state={{
        currentBook: book,
        myBook: myBook,
        rental: rental,
        explore: explore,
        pending: pending,
        otherPending: otherPending,
        active: active,
        otherActive: otherActive,
        rejected: rejected,
        ended: ended,
        object: object,
      }}
      draggable="false"
    >
      <div
        id="listElementPhotoContainer"
        style={{
          backgroundImage: `url(${book.thumb})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </Link>

    //     {/* <div id ="listElementTitle">{bookTitle}</div> */}
    //     {/* <div id ="listElementAuthor">{author}</div> */}
    //  {/* </Button> */}
  );
}

export default ListElement;

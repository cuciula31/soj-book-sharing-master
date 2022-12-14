import React from "react";
import Navbar from "../navbar/Navbar";
import "../css/myBook.css";
import NotFound from "./NotFound";
import { useLocation } from "react-router-dom";
import BookTitle from "../dynamic/BookTitle";
import BookDetails from "../dynamic/BookDetails";
import { removeData } from "jquery";

function BookDetailsSelected(props) {
  const currentBook = props.currentBook;

  const rental = props.rental;
  const myBook = props.myBook;
  const explore = props.explore;

  const pending = props.pending;
  const otherPending = props.otherPending;
  const active = props.active;
  const otherActive = props.otherActive;
  const rejected = props.rejected;
  const ended = props.ended;
  const object = props.object;

  if (rental) {

    if(pending){
      return <BookDetails currentBook={currentBook} rental={true} pending = {true} object = {object}/>;
    }
    if(otherPending){
      return <BookDetails currentBook={currentBook} rental={true}  otherPending = {true} object = {object}/>;
    }
    if(active){
      return <BookDetails currentBook={currentBook} rental={true} active = {true}  object = {object}/>;
    }
    if(otherActive){
      return <BookDetails currentBook={currentBook} rental={true} otherActive = {true} object = {object}/>;
    }
    if(rejected){

    }
    if(ended){

    }

   
  }

  if (myBook) {
    return <BookDetails currentBook={currentBook} myBook={true} />;
  }

  if (explore) {
    return <BookDetails currentBook={currentBook} explore={true} />;
  }
}

function MyBook(props) {
  const location = useLocation();

  const myBook = location.state.myBook;
  const explore = location.state.explore;
  const currentBook = location.state.currentBook;
  const rental = location.state.rental;

  const pending = location.state.pending;
  const otherPending = location.state.otherPending;
  const active = location.state.active;
  const otherActive = location.state.otherActive;
  const rejected = location.state.rejected;
  const ended = location.state.ended;

  const object  = location.state.object;

  console.log(otherPending);

  return (
    <div id="myBookContainer">
      <Navbar />
      <div id="myBookTitlePropsContainer">
        <div id="myBookTitleContainer">
          <BookTitle book={currentBook} />
        </div>
        <div id="myBookDetailsContainer">
          <BookDetailsSelected
            currentBook={currentBook}
            rental={rental}
            myBook={myBook}
            explore={explore}
            pending ={pending}
            otherPending ={otherPending}
            active ={active}
            otherActive ={otherActive}
            rejected ={rejected}
            ended ={ended}
            object = {object}
          />
        </div>
      </div>
    </div>
  );
}

export default MyBook;

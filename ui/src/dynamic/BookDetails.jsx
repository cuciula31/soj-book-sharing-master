import React from "react";
import "../css/bookDetails.css";
import ExploreDetailComponent from "./bookDetailsComponents/ExploreDetailComponent";
import RentalDetailComponent from "./bookDetailsComponents/RentalDetailComponent";

function BookDetails(props) {
  const myBook = props.myBook;
  const explore = props.explore;
  const rental = props.rental;
  const currentBook = props.currentBook;

  const pending = props.pending;
  const otherPending = props.otherPending;
  const active = props.active;
  const otherActive = props.otherActive;
  const rejected = props.rejected;
  const ended = props.ended;
  const object = props.object;

  if (myBook) {
    return <div id="bookDetailsContainer"></div>;
  }

  if (explore) {
    return (
      <div id="bookDetailsContainer">
        <ExploreDetailComponent book={currentBook} />
      </div>
    );
  }

  if (rental) {
    if (pending) {
      return (
        <div id="bookDetailsContainer">
          <RentalDetailComponent pending={true} object = {object}/>
        </div>
      );
    }
    if (otherPending) {
      return (
        <div id="bookDetailsContainer">
          <RentalDetailComponent otherPending={true} object = {object}/>
        </div>
      );
    }
    if (active) {
      return <div id="bookDetailsContainer">
        <RentalDetailComponent active={true} object = {object}/>
      </div>;
    }
    if (otherActive) {
      return <div id="bookDetailsContainer">
        <RentalDetailComponent otherActive={true} object = {object}/>
      </div>;
    }
    if (rejected) {
      return <div id="bookDetailsContainer"></div>;
    }
    if (ended) {
      return <div id="bookDetailsContainer"></div>;
    }
  }
}

export default BookDetails;

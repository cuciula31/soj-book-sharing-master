import React from "react";
import '../css/bookTitle.css'

function BookTitle(props){

const book = props.book;

    return(
      <div id="bookTitleContainer">
        <div id="bookTitleCoverContainer">
          <div id="bookTitleCover" style={{backgroundImage: `url(${book.thumb})`, backgroundSize: "cover", backgroundPosition: "center"}}></div>
        </div>
        <div id="bookTitleContentContainer">
          <div id="bookTitle">{book.bookTitle}</div>
          <div id="bookCategory">{book.category}</div>
        </div>
      </div>
        
);
}

export default BookTitle;
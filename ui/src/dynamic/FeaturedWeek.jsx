import React, { useEffect, useState } from "react";
import "../css/featuredWeek.css";
import ListElement from "../dynamic/ListElement";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

function intializeFeaturedWeek(books, featuredItems) {
  books.forEach((b) => {
    var currentTitle = b.bookTitle;
    if (currentTitle.toLowerCase().includes("batman".toLowerCase())) {
      featuredItems.push(
        <item style={{ width: "200px", height: "235px" }}>
          <ListElement book={b} explore = {true} />
        </item>
      );
    }
  });
}

function FeaturedWeek() {
  let featuredItems = [];
  const [books, setBooks] = useState([]);

  const responsive = {
    1024: { items: 9 },
  };

  intializeFeaturedWeek(books, featuredItems);

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
        console.log(data);
      });
  }, []);

  return (
    <div id="featuredWeekContainer">
      <div id="greetingPhotoContainer"></div>
      <div id="greetingPhotoBlurContainer"></div>
      <div id="greetingCarouselContainer">
        <AliceCarousel
          id="greetingCarousel"
          responsive={responsive}
          autoHeight
          disableButtonsControls
          disableDotsControls
          mouseTracking
          items={featuredItems}
        />
      </div>
      <div id="greetingText">
        In Gotham City, Batsignal is brighting the sky, let's explore new
        adventures, is Batman week!
      </div>
    </div>
  );
}

export default FeaturedWeek;

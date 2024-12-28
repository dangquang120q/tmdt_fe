import React from "react";
import ProductItem from "components/ProductItem/ProductItem";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Slide } from "react-slideshow-image";

function BookSlide({ books = [] }) {
  const properties = {
    nextArrow: <IoChevronForward className="slide-button" />,
    prevArrow: <IoChevronBack className="slide-button" />,
  };
  return (
    <div className="book-slide">
      <h1 className="book-slide-title">New Books</h1>
      {books.length > 0 && (
        <Slide
          slidesToScroll={2}
          slidesToShow={5}
          indicators={true}
          {...properties}
        >
          {books.map((item, id) => {
            return (
              <div className="book-slide-item" key={id}>
                <ProductItem noFlex item={item} />
              </div>
            );
          })}
        </Slide>
      )}
    </div>
  );
}

export default BookSlide;

import { Carousel } from "antd";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <IoIosArrowBack color="black" size={20} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <IoIosArrowForward color="black" size={20} />
    </div>
  );
}
const ImageSlide = ({ listImg, selectedOption }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  let navSlide = useRef();
  let slideRef = useRef();
  const setting = {
    prevArrow: <SampleNextArrow />,
    nextArrow: <SamplePrevArrow />,
    dots: false,
  };
  useEffect(() => {
    if (selectedOption.id) {
      const index = listImg.findIndex(
        (item) => item.image == selectedOption.image
      );
      if (index) {
        slideRef.current.goTo(index);
      }
    }
  }, [selectedOption]);

  return (
    <div className="image-slide">
      <Carousel
        fade
        arrows
        {...setting}
        className="product-slide"
        beforeChange={(_prev, next) => {
          // console.log(prev, next);
          setCurrentSlide(next);
          navSlide.current.goTo(next);
        }}
        ref={slideRef}
      >
        {listImg.map((image) => (
          <img
            src={image.image}
            alt=""
            key={image.id}
            className="product-image"
          />
        ))}
      </Carousel>
      <Carousel
        dots={false}
        slidesToShow={6}
        swipeToSlide
        infinite={false}
        className="product-slide-nav"
        draggable
        ref={navSlide}
      >
        {listImg.map((image, index) => (
          <div
            className={`slide-item ${
              index == currentSlide ? "slide-current" : ""
            }`}
            onClick={() => {
              slideRef.current.goTo(index);
            }}
          >
            <img src={image.image} alt="" key={image.id} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlide;

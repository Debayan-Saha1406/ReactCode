/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "react-animated-slider/build/horizontal.css";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import "../../../css/movie-single.css";
import { useHistory } from "react-router-dom";
import { sliderItems, sliderXCoordinate } from "../../../Shared/Constants";
import { gender } from "../../../Shared/Constants";

const Slider = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSuccessfulImageLoad = (isLastImage) => {
    if (isLastImage) {
      dispatch(toggleLoader(false, 1));
    }
  };

  const sliderImageClick = (e, index) => {
    if (index === 1) {
      history.push({
        pathname: "/movies",
        isFromSlider: true,
      });
    } else if (index === 2) {
      if (e.nativeEvent.offsetX < sliderXCoordinate) {
        history.push({
          pathname: "/celebrities",
          isFromCelebSlide: true,
          category: gender.male,
        });
      } else {
        history.push({
          pathname: "/celebrities",
          isFromCelebSlide: true,
          category: gender.female,
        });
      }
    } else if (index === 3) {
      props.navigateToTrailers();
    } else {
      history.push({
        pathname: "/directors",
        isFromDirectorSlide: true,
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="slider" id="home-slider">
          <Carousel interval={3000}>
            {sliderItems.map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt="First slide"
                  onLoad={() =>
                    handleSuccessfulImageLoad(sliderItems.length - 1 === index)
                  }
                  style={{ cursor: "pointer" }}
                  onClick={(e) => sliderImageClick(e, item.id)}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Slider;

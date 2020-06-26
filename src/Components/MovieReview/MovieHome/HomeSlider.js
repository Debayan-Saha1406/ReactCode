/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import "../../../css/movie-single.css";
import { useHistory } from "react-router-dom";
import { sliderItems } from "./../../../Shared/Constants";

const HomeSlider = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSuccessfulImageLoad = (isLastImage) => {
    if (isLastImage) {
      dispatch(toggleLoader(false, 1));
    }
  };

  const sliderImageClick = (index) => {
    if (index === 1) {
      history.push({
        pathname: "/movies",
        isFromSlider: true,
      });
    } else if (index === 2) {
      history.push({
        pathname: "/celebrities",
        isFromSlider: true,
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="slider" id="home-slider">
          <Carousel interval={3000}>
            {sliderItems.map((item, index) => (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt="First slide"
                  onLoad={() =>
                    handleSuccessfulImageLoad(sliderItems.length - 1 === index)
                  }
                  style={{ cursor: "pointer" }}
                  onClick={() => sliderImageClick(item.id)}
                />
                {/* <Carousel.Caption>
                  <ul class="movie-information">
                    <li class="list-item"> Run Time: {item.runTime}’ </li>
                    <li class="list-item"> Release: {item.releaseDate}</li>
                  </ul>
                  <div className="inner">
                    <div class="cate">
                      {item.genre.split(",").map((genre, index) => (
                        <React.Fragment>
                          {index % 3 === 0 ? (
                            <span class="blue">
                              <a href="#" tabindex="0">
                                {genre}
                              </a>
                            </span>
                          ) : index % 3 === 1 ? (
                            <span class="yell">
                              <a href="#" tabindex="0">
                                {genre}
                              </a>
                            </span>
                          ) : (
                            <span class="orange">
                              <a href="#" tabindex="0">
                                {genre}
                              </a>
                            </span>
                          )}
                          {index !== 0 && index % 4 === 0 && (
                            <React.Fragment>
                              <br />
                              <br />
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </Carousel.Caption> */}
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;

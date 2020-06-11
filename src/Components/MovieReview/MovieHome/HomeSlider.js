/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import { useEffect } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { useState } from "react";
import { apiUrl } from "./../../../Shared/Constants";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

const HomeSlider = () => {
  const dispatch = useDispatch();
  const [sliderItems, setSliderItems] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    dispatch(toggleLoader(true, 0));
    ServiceProvider.get(apiUrl.sliderMovieDetails).then((response) => {
      if (response.status === 200) {
        setSliderItems(response.data.data);
        dispatch(toggleLoader(false, 1));
      }
    });
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="slider" id="home-slider">
          <Carousel interval={10000}>
            {sliderItems.map((item) => (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt="First slide"
                />
                <Carousel.Caption>
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
                        //   {/* <span class="yell">
                        //   <a href="#" tabindex="0">
                        //     Action
                        //   </a>
                        // </span>
                        // <span class="orange">
                        //   <a href="#" tabindex="0">
                        //     advanture
                        //   </a>
                        // </span> */}
                      ))}
                    </div>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;

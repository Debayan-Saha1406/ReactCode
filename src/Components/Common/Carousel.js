/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import "../../css/movie-single.css";

const content = [
  {
    title: "Vulputate Mollis Ultricies Fermentum Parturient",
    description:
      "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.",
    button: "Read More",
    image: "https://i.imgur.com/ZXBtVw7.jpg",
    user: "Luan Gjokaj",
    userProfile: "https://i.imgur.com/JSW6mEk.png",
  },
  {
    title: "Tortor Dapibus Commodo Aenean Quam",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
    button: "Discover",
    image: "https://i.imgur.com/DCdBXcq.jpg",
    user: "Erich Behrens",
    userProfile: "https://i.imgur.com/0Clfnu7.png",
  },
  {
    title: "Tortor Dapibus Commodo Aenean Quam",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.",
    button: "Discover",
    image: "https://i.imgur.com/DCdBXcq.jpg",
    user: "Erich Behrens",
    userProfile: "https://i.imgur.com/0Clfnu7.png",
  },
];

const Carousel = () => {
  return (
    <Slider className="slider-wrapper" autoplay={2000} infinite={true}>
      {content.map((item, index) => (
        <div
          key={index}
          className="slider-content"
          style={{ background: `url('${item.image}') no-repeat center center` }}
        >
          <div className="inner">
            <div class="cate">
              <span class="blue">
                <a href="#" tabindex="0">
                  Sci-fi
                </a>
              </span>
              <span class="yell">
                <a href="#" tabindex="0">
                  Action
                </a>
              </span>
              <span class="orange">
                <a href="#" tabindex="0">
                  advanture
                </a>
              </span>
            </div>
          </div>

          <section id="bottom">
            <br />
            <br />
            <br />
            <div class="movie-details">
              <p class="rating-info">
                <i
                  class="fa fa-star"
                  style={{ fontSize: "40px", color: "yellow" }}
                ></i>
                <span className="user-rating">7.4</span> /10
              </p>
              <ul class="movie-information">
                <li class="list-item"> Run Time: 2h21’ </li>
                <li class="list-item"> Rated: PG-13 </li>
                <li class="list-item"> Release: 1 May 2015</li>
              </ul>
            </div>
          </section>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;

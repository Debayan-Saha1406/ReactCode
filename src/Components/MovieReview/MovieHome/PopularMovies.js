/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import image from "../../../images/mv1.jpg";

const PopularMovies = () => {
  return (
    <div class="flex-wrap-movielist mv-grid-fw">
      <div class="movie-item-style-2 movie-item-style-1">
        <img src={image} alt="" />
        <div class="hvr-inner">
          <a href="moviesingle.html">
            {" "}
            Read more <i class="ion-android-arrow-dropright"></i>{" "}
          </a>
        </div>
        <div class="mv-item-infor">
          <h6>
            <a href="#">oblivion</a>
          </h6>
          <p class="rate">
            <i
              class="fa fa-star"
              style={{
                fontSize: "20px",
                color: "yellow",
                marginRight: "5px",
              }}
            ></i>
            <span>8.1</span> /10
          </p>
        </div>
      </div>
      <div class="movie-item-style-2 movie-item-style-1">
        <img src={image} alt="" />
        <div class="hvr-inner">
          <a href="moviesingle.html">
            {" "}
            Read more <i class="ion-android-arrow-dropright"></i>{" "}
          </a>
        </div>
        <div class="mv-item-infor">
          <h6>
            <a href="#">oblivion</a>
          </h6>
          <p class="rate">
            <i
              class="fa fa-star"
              style={{
                fontSize: "20px",
                color: "yellow",
                marginRight: "5px",
              }}
            ></i>
            <span>8.1</span> /10
          </p>
        </div>
      </div>
      <div class="movie-item-style-2 movie-item-style-1">
        <img src={image} alt="" />
        <div class="hvr-inner">
          <a href="moviesingle.html">
            {" "}
            Read more <i class="ion-android-arrow-dropright"></i>{" "}
          </a>
        </div>
        <div class="mv-item-infor">
          <h6>
            <a href="#">oblivion</a>
          </h6>
          <p class="rate">
            <i
              class="fa fa-star"
              style={{
                fontSize: "20px",
                color: "yellow",
                marginRight: "5px",
              }}
            ></i>
            <span>8.1</span> /10
          </p>
        </div>
      </div>
      <div class="movie-item-style-2 movie-item-style-1">
        <img src={image} alt="" />
        <div class="hvr-inner">
          <a href="moviesingle.html">
            {" "}
            Read more <i class="ion-android-arrow-dropright"></i>{" "}
          </a>
        </div>
        <div class="mv-item-infor">
          <h6>
            <a href="#">oblivion</a>
          </h6>
          <p class="rate">
            <i
              class="fa fa-star"
              style={{
                fontSize: "20px",
                color: "yellow",
                marginRight: "5px",
              }}
            ></i>
            <span>8.1</span> /10
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularMovies;

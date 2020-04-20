import React, { Component } from "react";
import "../../css/home.css";
import CarouselSlider from "react-carousel-slider";
import Carousel from "./../Common/Carousel";

const Main = () => {
  return (
    <div class="container">
      <div>
        <div class="row">
          <div class="col-md-9">
            <Carousel></Carousel>
            <div class="slider"></div>
          </div>
          <div class="col-md-3">
            <div class="row">
              <div class="col-sm-6 col-md-12">
                <div class="latest-movie" id="sideImage">
                  <a href="#">
                    <img
                      src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                      alt="Movie 1"
                    />
                  </a>
                </div>
              </div>
              <div class="col-sm-6 col-md-12">
                <div class="latest-movie" id="sideImage">
                  <a href="#">
                    <img
                      src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                      alt="Movie 2"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 col-md-3">
            <div class="latest-movie">
              <a href="#">
                <img
                  src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                  alt="Movie 3"
                />
              </a>
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="latest-movie">
              <a href="#">
                <img
                  src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                  alt="Movie 4"
                />
              </a>
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="latest-movie">
              <a href="#">
                <img
                  src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                  alt="Movie 5"
                />
              </a>
            </div>
          </div>
          <div class="col-sm-6 col-md-3">
            <div class="latest-movie">
              <a href="#">
                <img
                  src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                  alt="Movie 6"
                />
              </a>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <h2 class="section-title">December premiere</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <ul class="movie-schedule">
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <h2 class="section-title">November premiere</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <ul class="movie-schedule">
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
            </ul>
          </div>
          <div class="col-md-4">
            <h2 class="section-title">October premiere</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
            <ul class="movie-schedule">
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
              <li>
                <div class="date">16/12</div>
                <h2 class="entry-title">
                  <a href="#">Perspiciatis unde omnis</a>
                </h2>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

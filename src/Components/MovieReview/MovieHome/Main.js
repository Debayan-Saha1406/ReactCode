import React, { Component } from "react";
import "../../../css/home.css";
import Carousel from "../../Common/Carousel";
import ThreeMonthListing from "./ThreeMonthListing";

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
        <ThreeMonthListing></ThreeMonthListing>
      </div>
    </div>
  );
};

export default Main;

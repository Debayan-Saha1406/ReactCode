/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../../css/home.css";
import Carousel from "../../Common/Carousel";
import ThreeMonthListing from "./ThreeMonthListing";

const Main = () => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-6 col-md-3">
          <div className="latest-movie">
            <a href="#">
              <img
                src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                alt="Movie 3"
              />
            </a>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="latest-movie">
            <a href="#">
              <img
                src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                alt="Movie 4"
              />
            </a>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="latest-movie">
            <a href="#">
              <img
                src="https://demo.themezy.com/system/resources/demo_themes/000/000/010//dummy/slide-2@2x.jpg"
                alt="Movie 5"
              />
            </a>
          </div>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="latest-movie">
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
    </React.Fragment>
  );
};

export default Main;

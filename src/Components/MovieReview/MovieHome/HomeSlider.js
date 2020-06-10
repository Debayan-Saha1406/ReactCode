import React from "react";
import Carousel from "./../../Common/Carousel";

const HomeSlider = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div
          className="slider"
          style={{ marginTop: "200px", borderRadius: "10px" }}
        >
          <Carousel></Carousel>
        </div>
        <div>
          <span class="dot-active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;

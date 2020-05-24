import React from "react";
import image from "../../../images/movie-single.jpg";

const CelebrityList = () => {
  return (
    <div class="col-md-12">
      <div class="ceb-item-style-2">
        <img src={image} alt="" style={{ height: "175px" }} />
        <div class="ceb-infor">
          <h2>
            <a href="celebritysingle.html">Dan Stevens</a>
          </h2>
          <span>actor, usa</span>
          <p>
            Dan Stevens was born at Croydon in Surrey on 10th October 1982. His
            parents are teachers. He was educated at Tonbridge School and
            trained in acting at the National Youth Theatre of Great Britain...{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CelebrityList;

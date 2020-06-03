import React from "react";
import image from "../../../images/movie-single.jpg";

const DirectorList = () => {
  return (
    <div class="blog-item-style-1 blog-item-style-3">
      <img src={image} alt="" style={{ height: "210px", width: "230px" }} />
      <div class="blog-it-infor">
        <h3>
          <a href="blogdetail.html">
            Godzilla: King Of The Monsters Adds O’Shea Jackson Jr
          </a>
        </h3>
        <span class="time">27 Mar 2017</span>
        <p>
          Africa's burgeoning animation scene got a boost this week with the
          announcement of an ambitious new partnership that will pair rising
          talents from across the continent ...
        </p>
      </div>
    </div>
  );
};

export default DirectorList;

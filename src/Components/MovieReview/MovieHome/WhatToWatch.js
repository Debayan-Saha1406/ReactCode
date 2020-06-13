import React from "react";
import PopularMovies from "./PopularMovies";

const WhatToWatch = () => {
  return (
    <div class="col-md-12">
      <div class="title-hd">
        <h2>What To Watch</h2>
      </div>
      <div class="tabs">
        <ul class="tab-links">
          <li class="active">
            <a>Fan Favorites </a>
          </li>
        </ul>
        <PopularMovies></PopularMovies>
      </div>
    </div>
  );
};

export default WhatToWatch;

import React from "react";

const MovieGridPagination = () => {
  return (
    <div class="movieGridpagination">
      <a href="#" class="page-number prev">
        <i class="fa fa-angle-left"></i>
      </a>
      <span class="page-number current">1</span>
      <a href="#" class="page-number">
        2
      </a>
      <a href="#" class="page-number">
        3
      </a>
      <a href="#" class="page-number">
        4
      </a>
      <a href="#" class="page-number">
        5
      </a>
      <a href="#" class="page-number next">
        <i class="fa fa-angle-right"></i>
      </a>
    </div>
  );
};

export default MovieGridPagination;

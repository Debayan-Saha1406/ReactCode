/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const BoxStylePagination = () => {
  return (
    <ul class="pagination-box">
      <li class="icon-prev">
        <a href="#">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </a>
      </li>
      <li class="active">
        <a href="#">1</a>
      </li>
      <li>
        <a href="#">2</a>
      </li>
      <li>
        <a href="#">3</a>
      </li>
      <li>
        <a href="#">4</a>
      </li>
      <li>
        <a href="#">...</a>
      </li>
      <li>
        <a href="#">21</a>
      </li>
      <li>
        <a href="#">22</a>
      </li>
      <li class="icon-next">
        <a href="#">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  );
};

export default BoxStylePagination;

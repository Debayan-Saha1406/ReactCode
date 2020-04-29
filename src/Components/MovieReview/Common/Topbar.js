/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { pageType } from "../../../Shared/Constants";

const Topbar = (props) => {
  return (
    <div className="topbar-filter fw">
      <p>
        Found <span>{props.totalMovies}</span> in total
      </p>
      <label className="filterBy">Sort by:</label>
      <select>
        <option value="name">Name Descending</option>
        <option value="name">Name Ascending</option>
        <option value="rating">Rating Descending</option>
        <option value="rating">Rating Ascending</option>
      </select>
      {props.pageType === pageType.grid ? (
        <a
          onClick={props.selectList}
          className="movie-list"
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-list" aria-hidden="true"></i>
        </a>
      ) : (
        <a className="list" style={{ cursor: "pointer" }}>
          <i className="fa fa-list" aria-hidden="true"></i>
        </a>
      )}
      {props.pageType === pageType.list ? (
        <a className="grid" onClick={props.selectGrid}>
          <i className="fa fa-th" aria-hidden="true"></i>
        </a>
      ) : (
        <a className="movie-grid">
          <i className="fa fa-th" aria-hidden="true"></i>
        </a>
      )}
    </div>
  );
};

export default Topbar;

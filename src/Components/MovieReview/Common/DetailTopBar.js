import React from "react";

const DetailTopBar = (props) => {
  return (
    <div className="topbar-filter">
      <p>
        Found <span>{props.totalCount}</span> in total
      </p>
      <label className="filterBy">Filter by:</label>
      <select className="popularity">
        <option value="popularity">Popularity Descending</option>
        <option value="popularity">Popularity Ascending</option>
        <option value="rating">Rating Descending</option>
        <option value="rating">Rating Ascending</option>
        <option value="date">Release date Descending</option>
        <option value="date">Release date Ascending</option>
      </select>
    </div>
  );
};

export default DetailTopBar;

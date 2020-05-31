import React from "react";

const DetailTopBar = (props) => {
  return (
    <div className="topbar-filter">
      <p>
        Found <span>{props.totalCount}</span> in total
      </p>
      <label className="filterBy">Sort by:</label>
      <select className="popularity" onChange={(e) => props.fetchSortedData(e)}>
        {props.sortBylist.map((sortByItem) => (
          <option value={sortByItem.id}>{sortByItem.value}</option>
        ))}
      </select>
    </div>
  );
};

export default DetailTopBar;

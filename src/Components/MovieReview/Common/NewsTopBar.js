import React from "react";

const NewsTopBar = (props) => {
  return (
    <div className="topbar-filter">
      <p>
        Found <span>{props.totalCount}</span> in total
      </p>
      <label className="filterBy">Category</label>
      <select
        className="popularity"
        onChange={(e) => props.changeMediaType(e.target.value)}
      >
        {props.mediaTypes.map((mediaType, index) => (
          <option key={index} value={mediaType.value}>
            {mediaType.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewsTopBar;

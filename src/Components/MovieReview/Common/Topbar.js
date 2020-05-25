/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { pageType } from "../../../Shared/Constants";

const Topbar = (props) => {
  return (
    <div className="topbar-filter fw">
      <p>
        Found <span>{props.totalCount}</span> in total
      </p>
      <label className="filterBy">Sort by:</label>
      <select
        onChange={(e) => props.fetchSortedData(e)}
        className="dropdown-padding"
      >
        {props.sortBylist.map((sortByItem) => (
          <option value={sortByItem.id}>{sortByItem.value}</option>
        ))}
      </select>
      {props.pageType === pageType.grid ? (
        <a
          onClick={() => props.setPageType(pageType.list)}
          className="list"
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-list" aria-hidden="true"></i>
        </a>
      ) : (
        <a className="list" style={{ color: "#ffaa3c" }}>
          <i className="fa fa-list" aria-hidden="true"></i>
        </a>
      )}
      {props.pageType === pageType.list ? (
        <a
          className="grid"
          onClick={() => props.setPageType(pageType.grid)}
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-th" aria-hidden="true"></i>
        </a>
      ) : (
        <a className="grid" style={{ color: "#ffaa3c" }}>
          <i className="fa fa-th" aria-hidden="true"></i>
        </a>
      )}
    </div>
  );
};

export default Topbar;

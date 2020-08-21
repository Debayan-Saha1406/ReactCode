import React from "react";

const NewsTopBar = (props) => {
  return (
    <div className="topbar-filter">
      <p>
        Found <span>{props.totalCount}</span> in total
      </p>
      <label className="filterBy">Fetch News From</label>
      <select
        className="popularity"
        onChange={(e) => props.changeCountry(e.target.value)}
      >
        {props.countryList.map((country, index) => (
          <option key={index} value={country.id}>
            {country.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewsTopBar;

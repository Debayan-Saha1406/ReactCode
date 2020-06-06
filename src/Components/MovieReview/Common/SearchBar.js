import React from "react";
import { searchBarOptionsList } from "../../../Shared/Constants";

const SearchBar = () => {
  return (
    <div class="top-search">
      <select>
        {searchBarOptionsList.map((option) => (
          <option value={option.id}>{option.value}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search for a movie, celebrity or director that you are looking for"
      />
      <i className="fa fa-search" id="search-icon"></i>
    </div>
  );
};

export default SearchBar;

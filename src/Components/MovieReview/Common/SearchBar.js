import React, { useState } from "react";
import {
  searchBarOptionsList,
  apiUrl,
  countries,
} from "../../../Shared/Constants";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { searchBarSubType } from "./../../../Shared/Constants";
import { showErrorMessage } from "../../../Provider/ToastProvider";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState(searchBarSubType.movie);
  const [isSuggestionBoxOpen, toggleSuggestionBox] = useState(false);
  const [filteredCountries, setCountries] = useState([]);
  const history = useHistory();

  const handleSearch = () => {
    ServiceProvider.getWithTwoParams(
      apiUrl.search,
      searchType,
      searchTerm
    ).then((response) => {
      if (response.status === 200) {
        if (searchType === searchBarSubType.movie) {
          history.push(`/movie-details/${response.data.data.id}`);
        }
      } else {
        showErrorMessage(response.data.errors);
      }
    });
  };

  const handleOptionClick = (country) => {
    setSearchTerm(country);
    toggleSuggestionBox(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      setTimeout(() => {
        setCountries(countries.filter((country) => country.includes("a")));
      }, 2000);
      toggleSuggestionBox(true);
    } else {
      toggleSuggestionBox(false);
    }
  };

  return (
    <React.Fragment>
      <div class="top-search">
        <select
          onChange={(e) => {
            setSearchTerm("");
            setSearchType(e.target.value);
          }}
          onClick={() => {
            toggleSuggestionBox(false);
          }}
          value={searchType}
        >
          {searchBarOptionsList.map((option) => (
            <option value={option.id}>{option.value}</option>
          ))}
        </select>
        <div class="autocomplete">
          <input
            type="text"
            placeholder="Search for a movie, celebrity or director that you are looking for"
            value={searchTerm}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <i className="fa fa-search" id="search-icon" onClick={handleSearch}></i>
      </div>
      {isSuggestionBoxOpen && (
        <div id="myInputautocomplete-list" class="autocomplete-items">
          {filteredCountries.length === 0 ? (
            <div class="white-box">
              <div class="spinner" style={{ borderBottom: "none" }}>
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
            </div>
          ) : (
            filteredCountries.map((country) => (
              <div className="data" onClick={() => handleOptionClick(country)}>
                {country}
              </div>
            ))
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default SearchBar;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useRef } from "react";
import { searchBarOptionsList, apiUrl } from "../../../Shared/Constants";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { searchBarSubType } from "./../../../Shared/Constants";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { useEffect } from "react";
import ThreeDotSpinner from "./ThreeDotSpinner";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState(false); //just to run the effect again on SearchList with the same searchTerm
  const [searchType, setSearchType] = useState(searchBarSubType.all);
  const [isSuggestionBoxOpen, toggleSuggestionBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [noData, setNoData] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const handleSearch = () => {
    toggleSuggestionBox(false);
    setToggle(!toggle);
    setSearchTerm("");
    if (searchTerm !== "") {
      dispatch(toggleLoader(true, 0));
      history.push({
        pathname: "/search",
        searchTerm: searchTerm,
        searchType: searchType,
        fetchNoData: false,
        toggle: toggle,
      });
    } else {
      history.push({
        pathname: "/search",
        searchTerm: searchTerm,
        searchType: searchType,
        fetchNoData: true,
        toggle: toggle,
      });
    }
  };

  const handleTypeChange = (e) => {
    setSearchTerm("");
    if (e.target.value == 1) {
      setSearchType(searchBarSubType.all);
    } else if (e.target.value == 2) {
      setSearchType(searchBarSubType.movie);
    } else if (e.target.value == 3) {
      setSearchType(searchBarSubType.celebrity);
    } else {
      setSearchType(searchBarSubType.director);
    }
  };

  const handleOptionClick = (id, type) => {
    toggleSuggestionBox(false);
    setSearchTerm("");
    if (type === searchBarSubType.director) {
      history.push(`/director-details/${id}`);
    } else if (type === searchBarSubType.celebrity) {
      history.push(`/celebrity-details/${id}`);
    } else {
      history.push(`/movie-details/${id}`);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (searchTerm !== "" && searchTerm === inputRef.current.value) {
        setIsLoading(true);
        setNoData(false);
        if (inputRef.current.value.length > 0) {
          const body = {
            searchType: searchType,
            searchTerm: inputRef.current.value.trim(),
            pageNumber: 1,
            pageSize: 10,
          };

          if (searchType === searchBarSubType.all) {
            body.fetchAll = true;
          } else {
            body.fetchAll = false;
          }

          ServiceProvider.post(apiUrl.search, body).then((response) => {
            if (response.status === 200) {
              setIsLoading(false);
              setSearchData(response.data.data.details);
              if (response.data.data.details.length === 0) {
                setNoData(true);
              } else {
                setNoData(false);
              }
            }
          });
          toggleSuggestionBox(true);
        } else {
          toggleSuggestionBox(false);
        }
      } else {
        toggleSuggestionBox(false);
      }
    }, 500);
  }, [searchTerm]);

  return (
    <React.Fragment>
      <div className="top-search">
        <select
          onChange={(e) => {
            handleTypeChange(e);
          }}
          onClick={() => {
            toggleSuggestionBox(false);
          }}
        >
          {searchBarOptionsList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          ))}
        </select>
        <div className="autocomplete">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search for a movie, celebrity or director that you are looking for"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <i className="fa fa-search" id="search-icon" onClick={handleSearch}></i>
      </div>
      {isSuggestionBoxOpen && (
        <div id="myInputautocomplete-list" className="autocomplete-items">
          {noData && (
            <div className="white-box" style={{ borderBottom: "none" }}>
              <span className="no-record">No Result Found...</span>
            </div>
          )}
          {isLoading ? (
            <div className="white-box" style={{ borderBottom: "none" }}>
              <ThreeDotSpinner></ThreeDotSpinner>
            </div>
          ) : (
            <React.Fragment>
              {searchData.map((searchDetail, index) => (
                <div
                  key={index}
                  className="data"
                  onClick={() =>
                    handleOptionClick(searchDetail.id, searchDetail.type)
                  }
                >
                  <span className="row">
                    <span className="span-col-4">
                      <img
                        src={searchDetail.image}
                        alt=""
                        style={{ height: "70px", width: "50px" }}
                      ></img>
                    </span>
                    <span className="span-col-8">
                      <span className="search-record">{searchDetail.name}</span>
                      <br></br>
                      <span className="search-type">({searchDetail.type})</span>
                    </span>
                  </span>
                </div>
              ))}
              {!noData && (
                <div
                  className="data"
                  style={{ borderBottom: "none" }}
                  onClick={handleSearch}
                >
                  <span className="search-type">
                    {" "}
                    Show All Results For {searchTerm}
                  </span>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default SearchBar;

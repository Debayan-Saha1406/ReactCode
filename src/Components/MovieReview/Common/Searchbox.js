/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { rating, years, apiUrl } from "../../../Shared/Constants";
import ServiceProvider from "./../../../Provider/ServiceProvider";

const Searchbox = (props) => {
  const [movieName, setMovieName] = useState("");
  const [selectedRating, setRating] = useState(0);
  const [fromYear, setFromYear] = useState(0);
  const [toYear, setToYear] = useState(0);
  const [languages, setLanguage] = useState([]);
  const [languageId, setSelectedLanguageId] = useState(0);
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    ServiceProvider.get(apiUrl.movieLanguages).then((response) => {
      if (response.status === 200) {
        setLanguage(response.data.data);
      }
    });
  }, []);

  const clearState = (e) => {
    e.preventDefault();
    setMovieName("");
    setRating(0);
    setFromYear(0);
    setToYear(0);
    setSelectedLanguageId(0);
    props.fetchInitialData("15%");
  };

  return (
    <div className="col-md-4 col-sm-12 col-xs-12">
      <div className="sidebar">
        <div className="searh-form">
          <h4 className="sb-title">{props.title}</h4>
          <form className="form-style-1" action="#">
            <div className="row">
              <div className="col-md-12 form-it">
                <label>{props.movieNameLabel}</label>
                <input
                  type="text"
                  placeholder="Enter keywords"
                  onChange={(e) => {
                    setIsFormDirty(true);
                    setMovieName(e.target.value);
                  }}
                  value={movieName}
                />
              </div>
              <div className="col-md-12 form-it">
                <label>{props.languageLabel}</label>
                <select
                  onChange={(e) => {
                    setIsFormDirty(true);
                    setSelectedLanguageId(e.target.value);
                  }}
                  value={languageId}
                >
                  <option value={0}>-- Select the language below --</option>
                  {languages.map((language, index) => (
                    <option key={index} value={language.id}>
                      {language.language}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 form-it">
                <label>{props.ratingLabel}</label>

                <select
                  onChange={(e) => {
                    setIsFormDirty(true);
                    setRating(e.target.value);
                  }}
                  value={selectedRating}
                >
                  <option value={0}>-- Select the rating range below --</option>
                  {rating.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}+
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 form-it">
                <label>{props.releaseYearLabel}</label>
                <div className="row">
                  <div className="col-md-6">
                    <select
                      onChange={(e) => {
                        setIsFormDirty(true);
                        setFromYear(e.target.value);
                      }}
                      value={fromYear}
                    >
                      <option value={0}>From</option>
                      {years.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      onChange={(e) => {
                        setIsFormDirty(true);
                        setToYear(e.target.value);
                      }}
                      value={toYear}
                    >
                      <option value={0}>To</option>
                      {years.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {toYear < fromYear && toYear != 0 && fromYear != 0 && (
                <div className="col-md-12">
                  <label className="error">
                    "To Year" Must Be More Than "From Year"
                  </label>
                </div>
              )}
              <div className="col-md-12 form-it">
                {(movieName ||
                  selectedRating != 0 ||
                  fromYear != 0 ||
                  toYear != 0 ||
                  languageId != 0) &&
                toYear >= fromYear &&
                fromYear != 0 ? (
                  <input
                    className="submit"
                    type="submit"
                    onClick={(e) =>
                      props.getFilteredMovies(
                        e,
                        movieName,
                        selectedRating,
                        fromYear,
                        toYear,
                        languageId
                      )
                    }
                  />
                ) : (
                  <input
                    className="submit"
                    type="submit"
                    disabled={true}
                    id="not-allowed"
                  />
                )}
              </div>
              <div className="col-md-12 form-it">
                {movieName ||
                selectedRating != 0 ||
                fromYear != 0 ||
                toYear != 0 ||
                languageId != 0 ||
                isFormDirty ? (
                  <button
                    className="reset"
                    type="submit"
                    onClick={(e) => clearState(e)}
                  >
                    Reset
                  </button>
                ) : (
                  <button
                    className="reset"
                    type="submit"
                    disabled={true}
                    id="not-allowed"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Searchbox;

/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { rating, years, apiUrl } from "../../../Shared/Constants";
import ServiceProvider from "./../../../Provider/ServiceProvider";

const Searchbox = ({
  setMovieDetails,
  movieDetails,
  title,
  movieNameLabel,
  languageLabel,
  ratingLabel,
  releaseYearLabel,
  handleSubmit,
  clearState,
}) => {
  // const [movieName, setMovieName] = useState("");
  // const [selectedRating, setRating] = useState(0);
  // const [fromYear, setFromYear] = useState(0);
  // const [toYear, setToYear] = useState(0);
  const [languages, setLanguage] = useState([]);
  // const [languageId, setSelectedLanguageId] = useState(0);
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    ServiceProvider.get(apiUrl.movieLanguages).then((response) => {
      if (response.status === 200) {
        setLanguage(response.data.data);
      }
    });
  }, []);

  return (
    <div className="col-md-4 col-sm-12 col-xs-12">
      <div className="sidebar">
        <div className="searh-form">
          <h4 className="sb-title">{title}</h4>
          <form className="form-style-1" action="#">
            <div className="row">
              <div className="col-md-12 form-it">
                <label>{movieNameLabel}</label>
                <input
                  type="text"
                  name="movieName"
                  placeholder="Enter keywords"
                  onChange={(e) => {
                    setIsFormDirty(true);
                    setMovieDetails(e);
                  }}
                  value={movieDetails.movieName}
                />
              </div>
              <div className="col-md-12 form-it">
                <label>{languageLabel}</label>
                <select
                  name="languageId"
                  onChange={(e) => {
                    setIsFormDirty(true);
                    setMovieDetails(e);
                  }}
                  value={movieDetails.languageId}
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
                <label>{ratingLabel}</label>
                <select
                  name="selectedRating"
                  onChange={(e) => {
                    setIsFormDirty(true);
                    setMovieDetails(e);
                  }}
                  value={movieDetails.selectedRating}
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
                <label>{releaseYearLabel}</label>
                <div className="row">
                  <div className="col-md-6">
                    <select
                      name="fromYear"
                      onChange={(e) => {
                        setIsFormDirty(true);
                        setMovieDetails(e);
                      }}
                      value={movieDetails.fromYear}
                    >
                      <option value={0}>From</option>
                      {years.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      name="toYear"
                      onChange={(e) => {
                        setIsFormDirty(true);
                        setMovieDetails(e);
                      }}
                      value={movieDetails.toYear}
                    >
                      <option value={0}>To</option>
                      {years.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-12 form-it">
                {movieDetails.movieName ||
                movieDetails.selectedRating != 0 ||
                movieDetails.languageId != 0 ||
                (movieDetails.toYear >= movieDetails.fromYear &&
                  movieDetails.fromYear != 0 &&
                  movieDetails.toYear != 0) ? (
                  <input
                    className="submit"
                    type="submit"
                    onClick={(e) => handleSubmit(e, movieDetails)}
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
                {movieDetails.movieName ||
                movieDetails.selectedRating != 0 ||
                movieDetails.fromYear != 0 ||
                movieDetails.toYear != 0 ||
                movieDetails.languageId != 0 ||
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

/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { rating, years } from "../../../Shared/Constants";

const Searchbox = (props) => {
  const [movieName, setMovieName] = useState("");
  const [selectedRating, setRating] = useState(0);
  const [fromYear, setFromYear] = useState(0);
  const [toYear, setToYear] = useState(0);

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
                  onChange={(e) => setMovieName(e.target.value)}
                />
              </div>
              <div className="col-md-12 form-it">
                <label>{props.ratingLabel}</label>

                <select onChange={(e) => setRating(e.target.value)}>
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
                    <select onChange={(e) => setFromYear(e.target.value)}>
                      <option value={0}>From</option>
                      {years.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select onChange={(e) => setToYear(e.target.value)}>
                      <option value={0}>To</option>
                      {years.map((year) => (
                        <option value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-12 ">
                {movieName ||
                selectedRating != 0 ||
                fromYear != 0 ||
                toYear != 0 ? (
                  <input
                    className="submit"
                    type="submit"
                    onClick={(e) =>
                      props.getFilteredMovies(
                        e,
                        movieName,
                        selectedRating,
                        fromYear,
                        toYear
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Searchbox;

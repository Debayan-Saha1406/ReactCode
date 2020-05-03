/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../../../css/movie-single.css";
import image from "../../../images/NotFound.png";
import { useState } from "react";
import { Redirect } from "react-router-dom";

import logo from "../../../images/logo.png";

const NotFound = () => {
  const [toMovies, setToMovies] = useState(false);

  return (
    <>
      {toMovies ? <Redirect to="/home" /> : null}
      <div class="page-single-2">
        <div class="error-container">
          <br></br>
          <img src={logo} alt="" className="logo" />
          <div className="logo-copy">
            <h3 className="site-title" style={{ color: "white" }}>
              Company Name
            </h3>
            <small className="site-description">Tagline goes here</small>
          </div>
          <div class="row">
            <div class="middle-content">
              <img src={image} alt="" />
              <h1>Page not found</h1>
              <a
                className="redbtn"
                onClick={() => setToMovies(true)}
                style={{ cursor: "pointer", color: "white" }}
                id="black-hover"
              >
                go home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;

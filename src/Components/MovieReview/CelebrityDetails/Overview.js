/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { celebrityTabs } from "../../../Shared/Constants";

import image from "../../../images/movie-single.jpg";
import { Link } from "react-router-dom";

const Overview = (props) => {
  const { biography, dateOfBirth, nationality } = props.celebrity;
  return (
    <React.Fragment>
      <div className="col-md-8 col-sm-12 col-xs-12">
        <p>{biography}</p>
        <p className="time">
          <a
            onClick={() => props.redirectToTab(celebrityTabs.biography)}
            className="blue-link"
          >
            See full bio
          </a>
        </p>

        <div className="title-hd-sm">
          <h4>filmography</h4>
          <a
            onClick={() => props.redirectToTab(celebrityTabs.filmography)}
            className="blue-link"
            style={{ fontSize: "12px" }}
          >
            Full Filmography
          </a>
        </div>
        <div className="mvcast-item">
          {props.movies.map((movie, index) => (
            <div className="cast-it" key={index}>
              <div className="cast-left cebleb-film">
                <img src={image} alt="" />
                {/* Replace movie.movieLogo here */}
                <div>
                  <Link
                    to={`/movie-details/${movie.movieId}`}
                    style={{ cursor: "pointer" }}
                    className="blue-link"
                  >
                    {movie.movieName}{" "}
                  </Link>
                  <p className="time">Logan</p>
                </div>
              </div>
              <p>{movie.releaseDate}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-md-4 col-xs-12 col-sm-12">
        <div className="sb-it">
          <h6 className="side-heading">Date of Birth: </h6>
          <p>{dateOfBirth}</p>
        </div>
        <div className="sb-it">
          <h6 className="side-heading">Country: </h6>
          <p>{nationality}</p>
        </div>
        {/* <div className="ads">
          <img src="images/uploads/ads1.png" alt="" />
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default Overview;

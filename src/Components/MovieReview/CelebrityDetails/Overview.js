/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { detailPageTabs } from "../../../Shared/Constants";
import { Link } from "react-router-dom";

const Overview = (props) => {
  const { biography, dateOfBirth, nationality } = props.star;
  return (
    <React.Fragment>
      <div className="col-md-8 col-sm-12 col-xs-12">
        <p>
          {biography.length > 400
            ? biography.substring(0, 400) + "..."
            : biography}{" "}
        </p>
        <p className="time">
          <a
            onClick={() => props.redirectToTab(detailPageTabs.biography)}
            className="blue-link"
          >
            See full bio
          </a>
        </p>

        <div className="title-hd-sm">
          <h4>filmography</h4>
          <a
            onClick={() => props.redirectToTab(detailPageTabs.filmography)}
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
                <img
                  src={movie.movieLogo}
                  alt=""
                  style={{ marginRight: "10px", marginTop: "-10px" }}
                />
                <div>
                  <Link
                    to={`/movie-details/${movie.movieId}`}
                    style={{ cursor: "pointer" }}
                    className="blue-link"
                  >
                    {movie.movieName}{" "}
                  </Link>
                  <p className="time" style={{ width: "auto" }}>
                    {movie.characterName}
                  </p>
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

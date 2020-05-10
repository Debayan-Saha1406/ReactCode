/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import image from "../../../images/mv1.jpg";
import { Link } from "react-router-dom";

const Grid = (props) => {
  return (
    <div className="flex-wrap-movielist mv-grid-fw">
      {props.moviesList.map((movie, index) => (
        <div key={index} className="movie-item-style-2 movie-item-style-1">
          <img
            src={image}
            alt=""
            onMouseOver={() => props.toggleReadMoreOpacity(1)}
            onMouseOut={() => props.toggleReadMoreOpacity(0)}
          />
          <div
            className="hvr-inner"
            style={{ opacity: props.readMoreOpacity }}
            onMouseOver={() => props.toggleReadMoreOpacity(1)}
          >
            <Link to={`/movie-details/${movie.movieId}`}> Read more </Link>
          </div>

          <div className="mv-item-infor">
            <h6>
              <a href="#">{movie.movieName}</a>
            </h6>
            <p className="rate">
              <i
                className="fa fa-star"
                style={{
                  fontSize: "20px",
                  color: "yellow",
                  marginRight: "5px",
                }}
              ></i>
              <span>{movie.avgRating}</span> /10
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;

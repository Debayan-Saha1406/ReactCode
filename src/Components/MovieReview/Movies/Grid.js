/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import image from "../../../images/mv1.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

const Grid = (props) => {
  const dispatch = useDispatch();
  const handleSuccessfulImageLoad = (isLastImage) => {
    debugger;
    if (isLastImage && props.isImageLoading) {
      dispatch(toggleLoader(false, 1));
    }
  };

  return (
    <div className="flex-wrap-movielist mv-grid-fw">
      {props.moviesList.map((movie, index) => (
        <div key={index} className="movie-item-style-2 movie-item-style-1">
          {props.movieIndexHovered === index ? (
            <img
              src={movie.movieLogo}
              style={{ opacity: props.imageOpacity }}
              alt=""
              onMouseOver={() => props.toggleOpacity(1, index)}
              onMouseOut={() => props.toggleOpacity(0, index)}
              onLoad={() =>
                handleSuccessfulImageLoad(props.moviesList.length - 1 === index)
              }
            />
          ) : (
            <img
              src={movie.movieLogo}
              alt=""
              onMouseOver={() => props.toggleOpacity(1, index)}
              onMouseOut={() => props.toggleOpacity(0, index)}
              onLoad={() =>
                handleSuccessfulImageLoad(props.moviesList.length - 1 === index)
              }
            />
          )}
          {props.movieIndexHovered === index ? (
            <div
              className="hvr-inner"
              style={{ opacity: props.readMoreOpacity }}
              onMouseOver={() => props.toggleOpacity(1, index)}
            >
              <Link to={`/movie-details/${movie.movieId}`}> Read more </Link>
            </div>
          ) : (
            <div
              className="hvr-inner"
              style={{ opacity: 0 }}
              onMouseOver={() => props.toggleOpacity(1, index)}
            >
              <Link to={`/movie-details/${movie.movieId}`}> Read more </Link>
            </div>
          )}

          <div className="mv-item-infor">
            <h6>
              <Link className="heading" to={`/movie-details/${movie.movieId}`}>
                {movie.movieName}
              </Link>
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

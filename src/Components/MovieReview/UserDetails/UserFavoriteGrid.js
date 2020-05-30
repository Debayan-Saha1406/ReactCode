/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

const opacity = {
  readMoreOpacity: 0,
  imageOpacity: 1,
  movieIndexHovered: -1,
};

const UserFavoriteGrid = (props) => {
  const [gridMovie, setGridMovieOpacity] = useState(opacity);
  const dispatch = useDispatch();

  const handleSuccessulImageLoad = (isLastImage) => {
    if (isLastImage && props.isImageLoaded) {
      dispatch(toggleLoader(false, 1));
    }
  };

  const setOpacity = (readMoreOpacity, index) => {
    if (readMoreOpacity === 1) {
      setGridMovieOpacity({
        ...gridMovie,
        imageOpacity: 0.2,
        readMoreOpacity: 1,
        movieIndexHovered: index,
      });
    } else {
      setGridMovieOpacity({
        ...gridMovie,
        imageOpacity: 1,
        readMoreOpacity: 0,
        movieIndexHovered: -1,
      });
    }
  };

  return (
    <div class="flex-wrap-movielist grid-fav">
      {props.moviesList.map((movie, index) => (
        <div class="movie-item-style-2 movie-item-style-1 style-3">
          {gridMovie.movieIndexHovered === index ? (
            <img
              src={movie.movieLogo}
              style={{ opacity: gridMovie.imageOpacity }}
              alt=""
              onMouseOver={() => setOpacity(1, index)}
              onMouseOut={() => setOpacity(0, index)}
              onLoad={() =>
                handleSuccessulImageLoad(props.moviesList.length - 1 === index)
              }
            />
          ) : (
            <img
              src={movie.movieLogo}
              alt=""
              onMouseOver={() => setOpacity(1, index)}
              onMouseOut={() => setOpacity(0, index)}
              onLoad={() =>
                handleSuccessulImageLoad(props.moviesList.length - 1 === index)
              }
            />
          )}
          {gridMovie.movieIndexHovered === index ? (
            <div
              class="hvr-inner"
              style={{ opacity: gridMovie.readMoreOpacity }}
              onMouseOver={() => setOpacity(1, index)}
            >
              <Link to={`/movie-details/${movie.movieId}`}>
                {" "}
                Read more <i class="ion-android-arrow-dropright"></i>{" "}
              </Link>
            </div>
          ) : (
            <div
              class="hvr-inner"
              style={{ opacity: 0 }}
              onMouseOver={() => setOpacity(1, index)}
            >
              <Link to={`/movie-details/${movie.movieId}`}>
                {" "}
                Read more <i class="ion-android-arrow-dropright"></i>{" "}
              </Link>
            </div>
          )}
          <div class="mv-item-infor">
            <h6>
              <Link className="heading" to={`/movie-details/${movie.movieId}`}>
                {movie.movieName}
              </Link>
            </h6>
            <p class="rate">
              <i
                class="fa fa-star"
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

export default UserFavoriteGrid;

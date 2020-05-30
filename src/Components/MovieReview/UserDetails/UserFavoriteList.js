/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

const UserFavoriteList = (props) => {
  const dispatch = useDispatch();

  const handleSuccessulImageLoad = (isLastImage) => {
    if (isLastImage && props.isImageLoaded) {
      dispatch(toggleLoader(false, 1));
    }
  };

  return (
    <div class="flex-wrap-movielist user-fav-list">
      {props.moviesList.map((movie, index) => (
        <div class="movie-item-style-2">
          <img
            src={movie.movieLogo}
            style={{ height: "260px", width: "170px" }}
            alt=""
            onLoad={() =>
              handleSuccessulImageLoad(props.moviesList.length - 1 === index)
            }
          />
          <div class="mv-item-infor">
            <h6>
              <Link className="heading" to={`/movie-details/${movie.movieId}`}>
                {movie.movieName}{" "}
                <span>
                  (
                  {movie.releaseDate.substring(
                    movie.releaseDate.indexOf(",") + 2,
                    movie.releaseDate.length
                  )}
                  )
                </span>
              </Link>
            </h6>
            <p class="rate">
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
            <p class="describe" style={{ marginTop: "20px" }}>
              {movie.description.length > 200
                ? movie.description.substring(0, 200) + "..."
                : movie.description}
            </p>
            <p class="run-time" style={{ marginTop: "20px" }}>
              {" "}
              Run Time:{" "}
              <span style={{ color: "white", marginLeft: "5px" }}>
                {movie.runTime}
              </span>
            </p>
            <p>
              Release:{" "}
              <span style={{ color: "white", marginLeft: "5px" }}>
                {movie.releaseDate}
              </span>{" "}
            </p>
            <p>
              Language:
              <span style={{ color: "white", marginLeft: "5px" }}>
                {movie.language}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserFavoriteList;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

const List = (props) => {
  const dispatch = useDispatch();

  const handleSuccessfulImageLoad = (isLastImage) => {
    if (isLastImage && props.isImageLoaded) {
      dispatch(toggleLoader(false, 1));
    }
  };
  return props.moviesList.map((movie, index) => (
    <div key={index} className="movie-item-style-2-list">
      <img
        src={movie.movieLogo}
        alt=""
        style={{ height: "260px", width: "170px" }}
        onLoad={() => {
          handleSuccessfulImageLoad(props.moviesList.length - 1 === index);
        }}
      />
      <div className="mv-item-infor">
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
        <p className="rate">
          <i
            className="fa fa-star"
            style={{
              fontSize: "20px",
              color: "yellow",
              marginRight: "5px",
            }}
          ></i>
          <span style={{ color: "white" }}>{movie.avgRating}</span> /10
        </p>
        <p className="describe">
          {movie.description.length > 200
            ? movie.description.substring(0, 200) + "..."
            : movie.description}
        </p>
        <p className="run-time">
          {" "}
          Run Time:{" "}
          <span style={{ color: "white", marginLeft: "5px" }}>
            {movie.runTime}
          </span>{" "}
          <br></br>
          <span>
            Release:
            <span style={{ color: "white", marginLeft: "5px" }}>
              {movie.releaseDate}
            </span>
          </span>
        </p>
        <p>
          Language: <span style={{ color: "white" }}>{movie.language}</span>
        </p>
      </div>
    </div>
  ));
};

export default List;

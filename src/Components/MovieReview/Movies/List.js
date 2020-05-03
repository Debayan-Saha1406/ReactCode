/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import image from "../../../images/mv1.jpg";

const List = (props) => {
  return props.moviesList.map((movie, index) => (
    <div key={index} className="movie-item-style-2-list">
      <img src={image} alt="" />
      <div className="mv-item-infor">
        <h6
          className="heading"
          onClick={() => props.redirectToDetail(movie.movieId, movie.movieName)}
        >
          {movie.movieName}
          <span>
            (
            {movie.releaseDate.substring(
              movie.releaseDate.indexOf(",") + 2,
              movie.releaseDate.length
            )}
            )
          </span>
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
        <p className="describe">
          {movie.description.length > 200
            ? movie.description.substring(0, 200) + "..."
            : movie.description}
        </p>
        <p className="run-time">
          {" "}
          Run Time: {movie.runTime} <br></br>
          <span>Release: {movie.releaseDate}</span>
        </p>
        <p>
          Language: <a href="#">{movie.language}</a>
        </p>
      </div>
    </div>
  ));
};

export default List;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Topbar from "./../Common/Topbar";
import Pagination from "../Common/Pagination";
import image from "../../../images/movie-single.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserFavoriteGrid = (props) => {
  const [readMoreOpacity, setReadMoreOpacity] = useState(0);
  const fetchSortedData = () => {};
  const changeMovieCount = () => {};
  const pageNumberClicked = () => {};
  return (
    <React.Fragment>
      <Topbar
        totalMovies={props.paginationData.totalMovies}
        selectGrid={props.selectGrid}
        pageType={props.pageViewType}
        fetchSortedData={fetchSortedData}
        selectList={props.selectList}
      ></Topbar>
      <div class="flex-wrap-movielist grid-fav">
        {props.moviesList.map((movie) => (
          <div class="movie-item-style-2 movie-item-style-1 style-3">
            <img
              src={image}
              alt=""
              onMouseOver={() => setReadMoreOpacity(1)}
              onMouseOut={() => setReadMoreOpacity(0)}
            />
            <div
              class="hvr-inner"
              style={{ opacity: readMoreOpacity }}
              onMouseOver={() => setReadMoreOpacity(1)}
            >
              <Link to={`/movie-details/${movie.movieId}`}>
                {" "}
                Read more <i class="ion-android-arrow-dropright"></i>{" "}
              </Link>
            </div>
            <div class="mv-item-infor">
              <h6>
                <Link
                  className="heading"
                  to={`/movie-details/${movie.movieId}`}
                >
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
      {props.moviesList.length > 0 && (
        <Pagination
          pageSize={props.paginationData.pageSize}
          totalCount={props.paginationData.totalMovies}
          currentPage={props.paginationData.pageNumber}
          changeCount={changeMovieCount}
          pageNumberClicked={pageNumberClicked}
          description="Movies"
        ></Pagination>
      )}
    </React.Fragment>
  );
};

export default UserFavoriteGrid;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Pagination from "./../Common/Pagination";
import Topbar from "../Common/Topbar";
import { Link } from "react-router-dom";
import image from "../../../images/movie-single.jpg";
import { movieSortTypeList } from "../../../Shared/Constants";
import NoResultFound from "../Common/NoResultFound";
import { countList } from "./../../../Shared/Constants";

const UserFavoriteList = (props) => {
  const changeMovieCount = (e) => {
    // setPaginationData({ ...initialData, pageSize: e.target.value });
  };

  const pageNumberClicked = () => {};

  const fetchSortedData = () => {};

  return (
    <React.Fragment>
      <Topbar
        totalCount={props.paginationData.totalMovies}
        pageType={props.pageViewType}
        fetchSortedData={fetchSortedData}
        setPageType={props.setPageType}
        sortBylist={movieSortTypeList}
      ></Topbar>
      <div class="flex-wrap-movielist user-fav-list">
        {props.moviesList.length === 0 ? (
          <NoResultFound></NoResultFound>
        ) : (
          props.moviesList.map((movie) => (
            <div class="movie-item-style-2">
              <img src={image} alt="" />
              <div class="mv-item-infor">
                <h6>
                  <Link
                    className="heading"
                    to={`/movie-details/${movie.movieId}`}
                  >
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
                <p class="describe">
                  {movie.description.length > 200
                    ? movie.description.substring(0, 200) + "..."
                    : movie.description}
                </p>
                <p class="run-time"> Run Time: {movie.runTime}</p>
                <p>Release: {movie.releaseDate}</p>
                <p>Language:{movie.language}</p>
              </div>
            </div>
          ))
        )}
      </div>
      {props.moviesList.length > 0 && (
        <Pagination
          pageSize={props.paginationData.pageSize}
          totalCount={props.paginationData.totalMovies}
          currentPage={props.paginationData.pageNumber}
          changeCount={changeMovieCount}
          pageNumberClicked={pageNumberClicked}
          countList={countList}
          description="Movies"
        ></Pagination>
      )}
    </React.Fragment>
  );
};

export default UserFavoriteList;

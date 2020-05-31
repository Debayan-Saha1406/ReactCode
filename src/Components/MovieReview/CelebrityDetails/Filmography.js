/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import image from "../../../images/movie-single.jpg";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import {
  apiUrl,
  sortDirection,
  sortColumns,
  movieSortTypeList,
  filmographySortTypeList,
} from "../../../Shared/Constants";
import { Link } from "react-router-dom";
import "../../../css/movie-single.css";
import DetailTopBar from "./../Common/DetailTopBar";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import Pagination from "../Common/Pagination";
import NotFound from "./../Common/NotFound";
import NoResultFound from "../Common/NoResultFound";
import { countList } from "./../../../Shared/Constants";

const initialState = {
  sortByColumn: sortColumns.movieName,
  sortByDirection: sortDirection.asc,
};

const Filmography = (props) => {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortDetails, setSortingDetails] = useState(initialState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleLoader(true, "15%"));
    const body = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortColumn: sortDetails.sortByColumn,
      sortDirection: sortDetails.sortByDirection,
      celebrityId: props.celebrityId,
    };
    ServiceProvider.post(apiUrl.celebrityMovies, body).then((response) => {
      if (response.status === 200) {
        setMovies(response.data.data.details);
        setTotalMovies(response.data.data.totalCount);
        dispatch(toggleLoader(false, 1));
      }
    });
  }, [
    pageSize,
    pageNumber,
    sortDetails.sortByColumn,
    sortDetails.sortByDirection,
  ]);

  const changeMovieCount = (e) => {
    setPageSize(Number(e.target.value));
    setPageNumber(1);
  };

  const pageNumberClicked = (page) => {
    setPageNumber(page);
  };

  const fetchSortedData = (e) => {
    let { sortColumn, sortByDirection } = getSortingDetails(e);
    setSortingDetails({
      ...sortDetails,
      sortByColumn: sortColumn,
      sortByDirection: sortByDirection,
    });
  };

  const getSortingDetails = (e) => {
    let sortColumn = "",
      sortByDirection = "";
    if (e.target.value == 1) {
      sortColumn = sortColumns.movieName;
      sortByDirection = sortDirection.asc;
    } else if (e.target.value == 2) {
      sortColumn = sortColumns.movieName;
      sortByDirection = sortDirection.desc;
    } else if (e.target.value == 3) {
      sortColumn = sortColumns.releaseDate;
      sortByDirection = sortDirection.asc;
    } else {
      sortColumn = sortColumns.releaseDate;
      sortByDirection = sortDirection.desc;
    }
    return { sortColumn, sortByDirection };
  };

  return (
    <div className="filmography">
      <div>
        <h3>Filmography of</h3>
        <h2 style={{ color: "white" }}>{props.celebrityName}</h2>
      </div>

      <DetailTopBar
        totalCount={totalMovies}
        sortBylist={filmographySortTypeList}
        fetchSortedData={fetchSortedData}
      ></DetailTopBar>
      <div className="mvcast-item">
        {movies.length === 0 ? (
          <NoResultFound></NoResultFound>
        ) : (
          movies.map((movie) => (
            <div className="cast-it">
              <div className="cast-left cebleb-film">
                <img src={movie.movieLogo} alt="" />
                <div>
                  <Link
                    to={`/movie-details/${movie.movieId}`}
                    className="blue-link"
                    style={{ cursor: "pointer" }}
                  >
                    {movie.movieName}{" "}
                  </Link>
                  <p className="time" style={{ width: "auto" }}>
                    {movie.characterName}
                  </p>
                </div>
              </div>
              <p>
                ...{" "}
                {movie.releaseDate.substring(
                  movie.releaseDate.indexOf(",") + 2,
                  movie.releaseDate.length
                )}
              </p>
            </div>
          ))
        )}
        {movies.length > 0 && (
          <Pagination
            pageSize={pageSize}
            totalCount={totalMovies}
            currentPage={pageNumber}
            changeCount={changeMovieCount}
            pageNumberClicked={pageNumberClicked}
            countList={countList}
            description="Movies"
          ></Pagination>
        )}
      </div>
    </div>
  );
};

export default Filmography;

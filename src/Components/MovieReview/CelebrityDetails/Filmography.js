/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import image from "../../../images/movie-single.jpg";
import Pagination from "../../Common/Pagination";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import { apiUrl, sortDirection, sortColumns } from "../../../Shared/Constants";
import { Link } from "react-router-dom";
import "../../../css/movie-single.css";
import DetailTopBar from "./../Common/DetailTopBar";
import ServiceProvider from "./../../../Provider/ServiceProvider";

const initialState = {
  sortByColumn: sortColumns.movieName,
  sortByDirection: sortDirection.asc,
};

const Filmography = (props) => {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleLoader(true, "15%"));
    const body = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortColumn: initialState.sortByColumn,
      sortDirection: initialState.sortByDirection,
      celebrityId: props.celebrityId,
    };
    ServiceProvider.post(apiUrl.celebrityMovies, body).then((response) => {
      if (response.status === 200) {
        setMovies(response.data.data.details);
        setTotalMovies(response.data.data.totalCount);
        dispatch(toggleLoader(false, 1));
      }
    });
  }, [pageSize, pageNumber]);

  const changeMovieCount = (e) => {
    setPageSize(e.target.value);
  };

  const pageNumberClicked = (page) => {
    setPageNumber(page);
  };

  return (
    <div className="filmography">
      <div>
        <h3>Filmography of</h3>
        <h2>{props.celebrityName}</h2>
      </div>

      <DetailTopBar totalCount={totalMovies}></DetailTopBar>
      <div className="mvcast-item">
        {movies.map((movie) => (
          <div className="cast-it">
            <div className="cast-left cebleb-film">
              <img src={image} alt="" />
              <div>
                <Link
                  to={`/movie-details/${movie.movieId}`}
                  className="blue-link"
                  style={{ cursor: "pointer" }}
                >
                  {movie.movieName}{" "}
                </Link>
                <p className="time">{movie.characterName}</p>
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
        ))}
        <Pagination
          pageSize={pageSize}
          totalCount={totalMovies}
          currentPage={pageNumber}
          changeCount={changeMovieCount}
          pageNumberClicked={pageNumberClicked}
          description="Movies"
        ></Pagination>
      </div>
    </div>
  );
};

export default Filmography;

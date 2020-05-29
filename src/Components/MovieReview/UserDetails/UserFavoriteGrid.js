/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Topbar from "./../Common/Topbar";
import Pagination from "../Common/Pagination";
import image from "../../../images/movie-single.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { countList, movieSortTypeList } from "./../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import NoResultFound from "./../Common/NoResultFound";

const UserFavoriteGrid = (props) => {
  const [readMoreOpacity, setReadMoreOpacity] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);
  const dispatch = useDispatch();
  const fetchSortedData = () => {};
  const changeMovieCount = () => {};
  const pageNumberClicked = () => {};

  const handleSuccessulImageLoad = (isLastImage) => {
    if (isLastImage && props.isImageLoaded) {
      dispatch(toggleLoader(false, 1));
    }
  };

  const setOpacity = (readMoreOpacity) => {
    if (readMoreOpacity === 1) {
      setImageOpacity(0.2);
      setReadMoreOpacity(1);
    } else {
      setImageOpacity(1);
      setReadMoreOpacity(0);
    }
  };

  return (
    <React.Fragment>
      <Topbar
        totalCount={props.paginationData.totalMovies}
        pageType={props.pageViewType}
        fetchSortedData={fetchSortedData}
        sortBylist={movieSortTypeList}
        setPageType={props.setPageType}
      ></Topbar>
      <div class="flex-wrap-movielist grid-fav">
        {props.moviesList.length === 0 ? (
          <NoResultFound></NoResultFound>
        ) : (
          props.moviesList.map((movie, index) => (
            <div class="movie-item-style-2 movie-item-style-1 style-3">
              <img
                src={movie.movieLogo}
                style={{ opacity: imageOpacity }}
                alt=""
                onMouseOver={() => setOpacity(1)}
                onMouseOut={() => setOpacity(0)}
                onLoad={() =>
                  handleSuccessulImageLoad(
                    props.moviesList.length - 1 === index
                  )
                }
              />
              <div
                class="hvr-inner"
                style={{ opacity: readMoreOpacity }}
                onMouseOver={() => setOpacity(1)}
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

export default UserFavoriteGrid;

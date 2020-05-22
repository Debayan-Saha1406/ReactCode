/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import DetailTopBar from "./../Common/DetailTopBar";
import Pagination from "../Common/Pagination";
import image from "../../../images/movie-single.jpg";
import { useEffect } from "react";
import { useState } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { Link } from "react-router-dom";

const initialData = {
  pageNumber: 1,
  pageSize: 10,
  totalReviewRatings: 0,
  reviewRatingList: [],
  sortColumn: "Id",
  sortDirection: "asc",
};

const UserRatedMovies = (props) => {
  const [reviewRatingData, setReviewRatingData] = useState(initialData);
  const [reviewRatingList, setReviewRatingList] = useState(
    initialData.reviewRatingList
  );
  const dispatch = useDispatch();

  const changeReviewCount = () => {};

  useEffect(() => {
    const body = {
      pageNumber: reviewRatingData.pageNumber,
      pageSize: reviewRatingData.pageSize,
      sortDirection: reviewRatingData.sortDirection,
      sortColumn: reviewRatingData.sortColumn,
      email: props.email,
    };

    dispatch(toggleLoader(true, "15%"));
    ServiceProvider.post(apiUrl.userRatedMovies, body).then((response) => {
      if (response.status === 200) {
        setReviewRatingList(response.data.data.details);
        setReviewRatingData({
          ...initialData,
          totalReviewRatings: response.data.data.totalCount,
        });
        dispatch(toggleLoader(false, 1));
      }
    });
  }, []);
  const pageNumberClicked = () => {};
  return (
    <React.Fragment>
      <DetailTopBar
        totalCount={reviewRatingData.totalReviewRatings}
      ></DetailTopBar>
      {reviewRatingList.map((reviewRatingData) => (
        <div class="movie-item-style-2 userrate">
          <img src={reviewRatingData.movieLogo} alt="" />
          <div class="mv-item-infor">
            <h6>
              <Link
                className="heading"
                to={`/movie-details/${reviewRatingData.movieId}`}
              >
                {reviewRatingData.movieName}{" "}
                <span>
                  (
                  {reviewRatingData.releaseDate.substring(
                    reviewRatingData.releaseDate.indexOf(",") + 2,
                    reviewRatingData.releaseDate.length
                  )}
                  )
                </span>
              </Link>
            </h6>
            {reviewRatingData.userRating && (
              <React.Fragment>
                <p class="time sm-text">your rate:</p>
                <p class="rate">
                  <i
                    class="fa fa-star"
                    style={{
                      fontSize: "20px",
                      color: "yellow",
                      marginRight: "5px",
                    }}
                  ></i>
                  <span>{reviewRatingData.userRating}</span> /10
                </p>
              </React.Fragment>
            )}
            {reviewRatingData.reviewId && (
              <React.Fragment>
                <p class="time sm-text">your reviews:</p>
                <h6 className="review-heading">
                  {reviewRatingData.reviewTitle}
                </h6>
                <p class="time sm">{reviewRatingData.reviewDate}</p>
                <p>{reviewRatingData.reviewDescription}</p>
              </React.Fragment>
            )}
          </div>
        </div>
      ))}
      {reviewRatingList.length > 0 && (
        <Pagination
          pageSize={reviewRatingData.pageSize}
          totalCount={reviewRatingData.totalReviewRatings}
          currentPage={reviewRatingData.pageNumber}
          changeCount={changeReviewCount}
          pageNumberClicked={pageNumberClicked}
          description="Reviews"
        ></Pagination>
      )}
    </React.Fragment>
  );
};

export default UserRatedMovies;

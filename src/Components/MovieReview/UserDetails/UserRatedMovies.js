/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import DetailTopBar from "./../Common/DetailTopBar";
import Pagination from "../Common/Pagination";
import image from "../../../images/movie-single.jpg";
import { useEffect } from "react";
import { useState } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import {
  apiUrl,
  movieSortTypeList,
  sortColumns,
  userMovieRatingReviewSortTypeList,
} from "./../../../Shared/Constants";
import { useDispatch } from "react-redux";
import {
  toggleLoader,
  togglePopup,
} from "./../../../Store/Actions/actionCreator";
import { Link } from "react-router-dom";
import { popupType } from "./../../../Shared/Constants";
import Information from "./../Popups/Information";
import UserContentPopup from "../Popups/UserContentPopup";
import NoResultFound from "./../Common/NoResultFound";
import { countList } from "./../../../Shared/Constants";
import { sortDirection } from "./../../../Shared/Constants";

const initialData = {
  pageNumber: 1,
  pageSize: 1,
  totalReviewRatings: 0,
  reviewRatingList: [],
  sortColumn: sortColumns.movieName,
  sortDirection: sortDirection.asc,
};

const UserRatedMovies = (props) => {
  const [reviewRatingData, setReviewRatingData] = useState(initialData);
  const [reviewRatingList, setReviewRatingList] = useState(
    initialData.reviewRatingList
  );
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(0);
  const [ratingIdToDelete, setRatingIdToDelete] = useState(0);
  const [popupClassName, setPopupClassName] = useState("");
  const [deletePopupType, setDeletePopupType] = useState(
    popupType.deleteRating
  );
  const dispatch = useDispatch();

  const changeReviewCount = (e) => {
    const body = {
      pageNumber: initialData.pageNumber,
      pageSize: e.target.value,
      sortDirection: reviewRatingData.sortDirection,
      sortColumn: reviewRatingData.sortColumn,
      email: props.email,
    };

    fetchReviewRatingData(
      reviewRatingData,
      props,
      dispatch,
      setReviewRatingList,
      setReviewRatingData,
      body
    );
  };

  const pageNumberClicked = (page) => {
    const body = {
      pageNumber: page,
      pageSize: reviewRatingData.pageSize,
      sortDirection: reviewRatingData.sortDirection,
      sortColumn: reviewRatingData.sortColumn,
      email: props.email,
    };

    fetchReviewRatingData(
      reviewRatingData,
      props,
      dispatch,
      setReviewRatingList,
      setReviewRatingData,
      body
    );
  };

  const fetchSortedData = (e) => {
    let { sortColumn, sortByDirection } = getSortingDetails(e);
    const body = {
      pageNumber: reviewRatingData.pageNumber,
      pageSize: reviewRatingData.pageSize,
      sortDirection: sortByDirection,
      sortColumn: sortColumn,
      email: props.email,
    };

    fetchReviewRatingData(
      reviewRatingData,
      props,
      dispatch,
      setReviewRatingList,
      setReviewRatingData,
      body
    );
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
      sortColumn = sortColumns.rating;
      sortByDirection = sortDirection.asc;
    } else if (e.target.value == 4) {
      sortColumn = sortColumns.rating;
      sortByDirection = sortDirection.desc;
    } else if (e.target.value == 5) {
      sortColumn = sortColumns.reviewDate;
      sortByDirection = sortDirection.asc;
    } else {
      sortColumn = sortColumns.reviewDate;
      sortByDirection = sortDirection.desc;
    }
    return { sortColumn, sortByDirection };
  };

  useEffect(() => {
    const body = {
      pageNumber: reviewRatingData.pageNumber,
      pageSize: reviewRatingData.pageSize,
      sortDirection: reviewRatingData.sortDirection,
      sortColumn: reviewRatingData.sortColumn,
      email: props.email,
    };
    fetchReviewRatingData(
      reviewRatingData,
      props,
      dispatch,
      setReviewRatingList,
      setReviewRatingData,
      body
    );
  }, []);

  const openDeleteReviewPopup = (reviewId) => {
    setPopupVisibility(true);
    setReviewIdToDelete(reviewId);
    setDeletePopupType(popupType.deleteReview);
    setPopupClassName("openform");
  };

  const openDeleteRatingPopup = (ratingId) => {
    setPopupVisibility(true);
    setRatingIdToDelete(ratingId);
    setDeletePopupType(popupType.deleteRating);
    setPopupClassName("openform");
  };

  const handleOk = (e) => {
    e.preventDefault();
    const body = {
      pageNumber: reviewRatingData.pageNumber,
      pageSize: reviewRatingData.pageSize,
      sortDirection: reviewRatingData.sortDirection,
      sortColumn: reviewRatingData.sortColumn,
      email: props.email,
    };
    if (deletePopupType === popupType.deleteRating) {
      ServiceProvider.deleteItem(
        apiUrl.deleteUserRating,
        ratingIdToDelete
      ).then((response) => {
        if (response.status === 200) {
          fetchReviewRatingData(
            reviewRatingData,
            props,
            dispatch,
            setReviewRatingList,
            setReviewRatingData,
            body
          );
          setPopupClassName("");
          setPopupVisibility(false);
        }
      });
    } else {
      deleteReview(
        reviewIdToDelete,
        reviewRatingData,
        props,
        dispatch,
        setReviewRatingList,
        setReviewRatingData,
        setPopupClassName,
        setPopupVisibility
      );
    }
  };

  const handleCancel = () => {
    setPopupClassName("");
    setPopupVisibility(false);
  };

  if (isPopupVisible) {
    return (
      <UserContentPopup
        title={
          deletePopupType === popupType.deleteReview
            ? "Delete Review"
            : "Delete Rating"
        }
        content={
          deletePopupType === popupType.deleteReview
            ? "This review will be deleted permanently. You have to again write the review for this movie."
            : "Your rating will be deleted permanently. You have to again give rating fo this movie."
        }
        loginPopupClassName={popupClassName}
        handlePrimaryButtonClick={handleOk}
        handleSecondaryButtonClick={handleCancel}
        primaryButtonText="Ok"
        secondaryButtonText="Cancel"
      ></UserContentPopup>
    );
  }

  return (
    <React.Fragment>
      <DetailTopBar
        totalCount={reviewRatingData.totalReviewRatings}
        sortBylist={userMovieRatingReviewSortTypeList}
        fetchSortedData={fetchSortedData}
      ></DetailTopBar>
      {reviewRatingList.length === 0 ? (
        <NoResultFound></NoResultFound>
      ) : (
        reviewRatingList.map((reviewRatingData) => (
          <div class="movie-item-style-2 userrate">
            <img src={reviewRatingData.movieLogo} alt="" />
            <div class="mv-item-infor" style={{ width: "100%" }}>
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
              {reviewRatingData.userRating !== 0 && (
                <React.Fragment>
                  <p
                    className="delete"
                    style={{
                      float: "right",
                      marginTop: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      openDeleteRatingPopup(reviewRatingData.ratingId)
                    }
                  >
                    Delete
                  </p>
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
                  <p
                    className="delete"
                    style={{
                      float: "right",
                      marginTop: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      openDeleteReviewPopup(reviewRatingData.reviewId)
                    }
                  >
                    Delete
                  </p>
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
        ))
      )}
      {reviewRatingList.length > 0 && (
        <Pagination
          pageSize={reviewRatingData.pageSize}
          totalCount={reviewRatingData.totalReviewRatings}
          currentPage={reviewRatingData.pageNumber}
          changeCount={changeReviewCount}
          countList={countList}
          pageNumberClicked={pageNumberClicked}
          description="Reviews"
        ></Pagination>
      )}
    </React.Fragment>
  );
};

export default UserRatedMovies;
function deleteReview(
  reviewIdToDelete,
  reviewRatingData,
  props,
  dispatch,
  setReviewRatingList,
  setReviewRatingData,
  setPopupClassName,
  setPopupVisibility
) {
  const body = {
    pageNumber: reviewRatingData.pageNumber,
    pageSize: reviewRatingData.pageSize,
    sortDirection: reviewRatingData.sortDirection,
    sortColumn: reviewRatingData.sortColumn,
    email: props.email,
  };
  ServiceProvider.deleteItem(apiUrl.deleteReview, reviewIdToDelete).then(
    (response) => {
      if (response.status === 200) {
        fetchReviewRatingData(
          reviewRatingData,
          props,
          dispatch,
          setReviewRatingList,
          setReviewRatingData,
          body
        );
        setPopupClassName("");
        setPopupVisibility(false);
      }
    }
  );
}

function fetchReviewRatingData(
  reviewRatingData,
  props,
  dispatch,
  setReviewRatingList,
  setReviewRatingData,
  body
) {
  let isReviewRatingPresent = false;
  dispatch(toggleLoader(true, "15%"));
  ServiceProvider.post(apiUrl.userRatedMovies, body).then((response) => {
    if (response.status === 200) {
      response.data.data.details.forEach((detail) => {
        if (detail.reviewId !== null || detail.userRating !== 0) {
          isReviewRatingPresent = true;
        }
      });
      if (isReviewRatingPresent) {
        setReviewRatingList(response.data.data.details);
        setReviewRatingData({
          ...reviewRatingData,
          totalReviewRatings: response.data.data.totalCount,
          pageSize: body.pageSize,
          pageNumber: body.pageNumber,
          sortColumn: body.sortColumn,
          sortDirection: body.sortDirection,
        });
        // May need to Review with Multiple Ratings And Review
      } else {
        setReviewRatingList([]);
        setReviewRatingData({ ...reviewRatingData, totalReviewRatings: 0 });
      }

      dispatch(toggleLoader(false, 1));
    }
  });
}

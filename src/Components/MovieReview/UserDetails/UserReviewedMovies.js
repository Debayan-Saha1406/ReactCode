/* eslint-disable eqeqeq */
import React from "react";
import DetailTopBar from "./../Common/DetailTopBar";
import NoResultFound from "./../Common/NoResultFound";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";
import {
  sortColumns,
  sortDirection,
  userMovieReviewSortTypeList,
  apiUrl,
  constants,
  countList,
} from "./../../../Shared/Constants";
import { useState } from "react";
import UserContentPopup from "./../Popups/UserContentPopup";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import {
  toggleLoader,
  saveUserInfo,
} from "./../../../Store/Actions/actionCreator";
import { removeLocalStorageItem } from "../../../Provider/LocalStorageProvider";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const initialData = {
  pageNumber: 1,
  pageSize: 1,
  totalReviews: 0,
  reviewedList: [],
  sortColumn: sortColumns.movieName,
  sortDirection: sortDirection.asc,
};

const UserReviewedMovies = (props) => {
  const [reviewedData, setReviewedData] = useState(initialData);
  const [reviewedList, setReviewedList] = useState(initialData.reviewedList);
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState(0);
  const [popupClassName, setPopupClassName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      pageNumber: reviewedData.pageNumber,
      pageSize: reviewedData.pageSize,
      sortDirection: reviewedData.sortDirection,
      sortColumn: reviewedData.sortColumn,
      email: props.email,
    };
    fetchReviewedData(body);
  }, []);

  const openDeleteReviewPopup = (reviewId) => {
    setPopupVisibility(true);
    setReviewIdToDelete(reviewId);
    setPopupClassName("openform");
  };

  const handleCancel = () => {
    setPopupClassName("");
    setPopupVisibility(false);
  };

  const handleOk = (e) => {
    e.preventDefault();
    const body = {
      pageNumber: reviewedData.pageNumber,
      pageSize: reviewedData.pageSize,
      sortDirection: reviewedData.sortDirection,
      sortColumn: reviewedData.sortColumn,
      email: props.email,
    };

    deleteReview(setPopupClassName, setPopupVisibility, body);
  };

  const deleteReview = (setPopupClassName, setPopupVisibility, body) => {
    ServiceProvider.deleteItem(apiUrl.deleteReview, reviewIdToDelete).then(
      (response) => {
        if (response.status === 200) {
          fetchReviewedData(body);
          setPopupClassName("");
          setPopupVisibility(false);
        }
      }
    );
  };

  const fetchReviewedData = (body) => {
    let isReviewRatingPresent = false;
    dispatch(toggleLoader(true, "15%"));
    ServiceProvider.post(apiUrl.userReviewedMovies, body).then((response) => {
      if (response.status === 200) {
        response.data.data.details.forEach((detail) => {
          if (detail.reviewId !== null) {
            isReviewRatingPresent = true;
          }
        });
        if (isReviewRatingPresent) {
          setReviewedList(response.data.data.details);
          setReviewedData({
            ...reviewedData,
            totalReviews: response.data.data.totalCount,
            pageSize: body.pageSize,
            pageNumber: body.pageNumber,
            sortColumn: body.sortColumn,
            sortDirection: body.sortDirection,
          });
          // May need to Review with Multiple Ratings And Review
        } else {
          setReviewedList([]);
          setReviewedData({ ...reviewedData, totalReviewRatings: 0 });
        }
        dispatch(toggleLoader(false, 1));
      } else if (response.status === 401) {
        dispatch(toggleLoader(false, 1));
        dispatch(saveUserInfo("", false, true));
        removeLocalStorageItem(constants.userDetails);
      }
    });
  };

  const fetchSortedData = (e) => {
    let { sortColumn, sortByDirection } = getSortingDetails(e);
    const body = {
      pageNumber: reviewedData.pageNumber,
      pageSize: reviewedData.pageSize,
      sortDirection: sortByDirection,
      sortColumn: sortColumn,
      email: props.email,
    };

    fetchReviewedData(body);
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
      sortColumn = sortColumns.reviewDate;
      sortByDirection = sortDirection.asc;
    } else if (e.target.value == 4) {
      sortColumn = sortColumns.reviewDate;
      sortByDirection = sortDirection.desc;
    }
    return { sortColumn, sortByDirection };
  };

  const changeReviewCount = (e) => {
    const body = {
      pageNumber: initialData.pageNumber,
      pageSize: e.target.value,
      sortDirection: reviewedData.sortDirection,
      sortColumn: reviewedData.sortColumn,
      email: props.email,
    };

    fetchReviewedData(body);
  };

  const pageNumberClicked = (page) => {
    const body = {
      pageNumber: page,
      pageSize: reviewedData.pageSize,
      sortDirection: reviewedData.sortDirection,
      sortColumn: reviewedData.sortColumn,
      email: props.email,
    };

    fetchReviewedData(body);
  };

  if (isPopupVisible) {
    return (
      <UserContentPopup
        title={"Delete Review"}
        content={
          "This review will be deleted permanently. You have to again write the review for this movie."
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
        totalCount={reviewedData.totalRatings}
        sortBylist={userMovieReviewSortTypeList}
        fetchSortedData={fetchSortedData}
      ></DetailTopBar>
      {reviewedList.length === 0 ? (
        <NoResultFound></NoResultFound>
      ) : (
        reviewedList.map((reviewedData, index) => (
          <div key={index} class="movie-item-style-2 userrate">
            <img src={reviewedData.movieLogo} alt="" />
            <div class="mv-item-infor" style={{ width: "100%" }}>
              <h6>
                <Link
                  className="heading"
                  to={`/movie-details/${reviewedData.movieId}`}
                >
                  {reviewedData.movieName}{" "}
                  <span>
                    (
                    {reviewedData.releaseDate.substring(
                      reviewedData.releaseDate.indexOf(",") + 2,
                      reviewedData.releaseDate.length
                    )}
                    )
                  </span>
                </Link>
              </h6>
              {reviewedData.reviewId && (
                <React.Fragment>
                  <p
                    className="delete"
                    style={{
                      float: "right",
                      marginTop: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => openDeleteReviewPopup(reviewedData.reviewId)}
                  >
                    Delete
                  </p>
                  <p class="time sm-text">your reviews:</p>

                  <h6 className="review-heading">{reviewedData.reviewTitle}</h6>
                  <p class="time sm">{reviewedData.reviewDate}</p>
                  <p>{reviewedData.reviewDescription}</p>
                </React.Fragment>
              )}
            </div>
          </div>
        ))
      )}
      {reviewedList.length > 0 && (
        <Pagination
          pageSize={reviewedData.pageSize}
          totalCount={reviewedData.totalReviews}
          currentPage={reviewedData.pageNumber}
          changeCount={changeReviewCount}
          countList={countList}
          pageNumberClicked={pageNumberClicked}
          description="Reviews"
        ></Pagination>
      )}
    </React.Fragment>
  );
};

export default UserReviewedMovies;

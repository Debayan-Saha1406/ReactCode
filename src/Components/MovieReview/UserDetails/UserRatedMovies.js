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
  userMovieRatingSortTypeList,
  constants,
} from "./../../../Shared/Constants";
import { useDispatch } from "react-redux";
import {
  toggleLoader,
  togglePopup,
  saveUserInfo,
} from "./../../../Store/Actions/actionCreator";
import { Link } from "react-router-dom";
import { popupType } from "./../../../Shared/Constants";
import Information from "./../Popups/Information";
import UserContentPopup from "../Popups/UserContentPopup";
import NoResultFound from "./../Common/NoResultFound";
import { countList } from "./../../../Shared/Constants";
import { sortDirection } from "./../../../Shared/Constants";
import { removeLocalStorageItem } from "../../../Provider/LocalStorageProvider";

const initialData = {
  pageNumber: 1,
  pageSize: 1,
  totalRatings: 0,
  ratingList: [],
  sortColumn: sortColumns.movieName,
  sortDirection: sortDirection.asc,
};

const UserRatedMovies = (props) => {
  const [ratingData, setratingData] = useState(initialData);
  const [ratingList, setRatingList] = useState(initialData.ratingList);
  const [ratingIdToDelete, setRatingIdToDelete] = useState(0);
  const [popupClassName, setPopupClassName] = useState("");
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const dispatch = useDispatch();

  const changeRatingCount = (e) => {
    const body = {
      pageNumber: initialData.pageNumber,
      pageSize: e.target.value,
      sortDirection: ratingData.sortDirection,
      sortColumn: ratingData.sortColumn,
      email: props.email,
    };

    fetchRatingData(setRatingList, setratingData, body);
  };

  const pageNumberClicked = (page) => {
    const body = {
      pageNumber: page,
      pageSize: ratingData.pageSize,
      sortDirection: ratingData.sortDirection,
      sortColumn: ratingData.sortColumn,
      email: props.email,
    };

    fetchRatingData(setRatingList, setratingData, body);
  };

  const fetchSortedData = (e) => {
    let { sortColumn, sortByDirection } = getSortingDetails(e);
    const body = {
      pageNumber: ratingData.pageNumber,
      pageSize: ratingData.pageSize,
      sortDirection: sortByDirection,
      sortColumn: sortColumn,
      email: props.email,
    };

    fetchRatingData(setRatingList, setratingData, body);
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
    }
    return { sortColumn, sortByDirection };
  };

  useEffect(() => {
    const body = {
      pageNumber: ratingData.pageNumber,
      pageSize: ratingData.pageSize,
      sortDirection: ratingData.sortDirection,
      sortColumn: ratingData.sortColumn,
      email: props.email,
    };
    fetchRatingData(setRatingList, setratingData, body);
  }, []);

  const openDeleteRatingPopup = (ratingId) => {
    setPopupVisibility(true);
    setRatingIdToDelete(ratingId);
    setPopupClassName("openform");
  };

  const handleOk = (e) => {
    e.preventDefault();
    const body = {
      pageNumber: ratingData.pageNumber,
      pageSize: ratingData.pageSize,
      sortDirection: ratingData.sortDirection,
      sortColumn: ratingData.sortColumn,
      email: props.email,
    };

    ServiceProvider.deleteItem(apiUrl.deleteUserRating, ratingIdToDelete).then(
      (response) => {
        if (response.status === 200) {
          body.pageNumber = 1;
          fetchRatingData(setRatingList, setratingData, body);
          setPopupClassName("");
          setPopupVisibility(false);
        } else if (response.status === 401) {
          dispatch(toggleLoader(false, 1));
          dispatch(saveUserInfo("", false, true));
          removeLocalStorageItem(constants.userDetails);
        }
      }
    );
  };

  const handleCancel = () => {
    setPopupClassName("");
    setPopupVisibility(false);
  };

  const fetchRatingData = (setRatingList, setratingData, body) => {
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
          setRatingList(response.data.data.details);
          setratingData({
            ...ratingData,
            totalRatings: response.data.data.totalCount,
            pageSize: body.pageSize,
            pageNumber: body.pageNumber,
            sortColumn: body.sortColumn,
            sortDirection: body.sortDirection,
          });
          // May need to Review with Multiple Ratings And Review
        } else {
          setRatingList([]);
          setratingData({ ...ratingData, totalRatings: 0 });
        }
        dispatch(toggleLoader(false, 1));
      } else if (response.status === 401) {
        dispatch(toggleLoader(false, 1));
        dispatch(saveUserInfo("", false, true));
        removeLocalStorageItem(constants.userDetails);
      }
    });
  };

  if (isPopupVisible) {
    return (
      <UserContentPopup
        title={"Delete Rating"}
        content={
          "Your rating will be deleted permanently. You have to again give rating fo this movie."
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
        totalCount={ratingData.totalRatings}
        sortBylist={userMovieRatingSortTypeList}
        fetchSortedData={fetchSortedData}
      ></DetailTopBar>
      {ratingList.length === 0 ? (
        <NoResultFound></NoResultFound>
      ) : (
        ratingList.map((ratingData, index) => (
          <div key={index} class="movie-item-style-2 userrate">
            <img src={ratingData.movieLogo} alt="" />
            <div class="mv-item-infor" style={{ width: "100%" }}>
              <h6>
                <Link
                  className="heading"
                  to={`/movie-details/${ratingData.movieId}`}
                >
                  {ratingData.movieName}{" "}
                  <span>
                    (
                    {ratingData.releaseDate.substring(
                      ratingData.releaseDate.indexOf(",") + 2,
                      ratingData.releaseDate.length
                    )}
                    )
                  </span>
                </Link>
              </h6>
              <React.Fragment>
                <p
                  className="delete"
                  style={{
                    float: "right",
                    marginTop: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => openDeleteRatingPopup(ratingData.ratingId)}
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
                  <span>{ratingData.userRating}</span> /10
                </p>
              </React.Fragment>
            </div>
          </div>
        ))
      )}
      {ratingList.length > 0 && (
        <Pagination
          pageSize={ratingData.pageSize}
          totalCount={ratingData.totalRatings}
          currentPage={ratingData.pageNumber}
          changeCount={changeRatingCount}
          countList={countList}
          pageNumberClicked={pageNumberClicked}
          description="Reviews"
        ></Pagination>
      )}
    </React.Fragment>
  );
};

export default UserRatedMovies;

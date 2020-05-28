/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
  movieDetailTabs,
  popupType,
  apiUrl,
  monthNames,
  reviewCountList,
} from "../../../Shared/Constants";
import Pagination from "../Common/Pagination";
import {
  toggleLoader,
  togglePopup,
} from "./../../../Store/Actions/actionCreator";

import { connect } from "react-redux";
import ServiceProvider from "../../../Provider/ServiceProvider";
import DetailTopBar from "../Common/DetailTopBar";
import ReviewPopup from "./../Popups/ReviewPopup";
import { countList } from "./../../../Shared/Constants";

class MovieReview extends Component {
  state = {
    openPopupClassName: "",
    reviewPopupType: popupType.addReview,
    reviewDescription: "",
    reviewTitle: "",
    reviewId: 0,
    needToClosePopup: false,
    reviews: [],
    pageNumber: 1,
    pageSize: 5,
    totalReviews: 0,
    isReviewGiven: false,
  };

  openReviewPopup = (
    reviewPopupType,
    reviewTitle,
    reviewDescription,
    reviewId
  ) => {
    if (this.props.isUserLoggedIn) {
      if (reviewPopupType === popupType.editReview) {
        this.setState({
          openPopupClassName: "openform",
          reviewPopupType: reviewPopupType,
          reviewTitle: reviewTitle,
          reviewDescription: reviewDescription,
          reviewId: reviewId,
        });
      } else {
        this.setState({
          openPopupClassName: "openform",
          reviewPopupType: reviewPopupType,
          reviewId: reviewId,
        });
      }
    } else {
      this.props.togglePopup("openform", popupType.login);
    }
  };

  closeReviewPopup = () => {
    if (!this.state.isReviewGiven) {
      this.setState({
        openPopupClassName: "",
        reviewDescription: "",
        reviewTitle: "",
      });
    } else {
      this.setState({
        openPopupClassName: "",
      });
    }
  };

  postReview = (
    e,
    reviewTitle,
    reviewDescription,
    reviewId,
    reviewPopupType
  ) => {
    e.preventDefault();
    const todayDate = new Date();
    let reviewDate =
      monthNames[todayDate.getMonth()] +
      " " +
      todayDate.getDate() +
      ", " +
      todayDate.getFullYear();
    this.props.toggleLoader(true, "15%");
    const body = {
      reviewTitle: reviewTitle.trim(),
      reviewDescription: reviewDescription.trim(),
      userEmail: this.props.loggedInEmail,
      reviewDate: reviewDate,
    };

    if (reviewPopupType === popupType.editReview) {
      ServiceProvider.put(apiUrl.updateReview, this.state.reviewId, body).then(
        (response) => {
          if (response.status === 200) {
            this.fetchReviews();
            this.closeReviewPopup();
          }
        }
      );
    } else {
      body.movieId = this.props.movieId;
      ServiceProvider.post(apiUrl.postReview, body).then((response) => {
        if (response.status === 200) {
          this.fetchReviews();
          this.closeReviewPopup();
        }
      });
    }
  };

  pageNumberClicked = (page) => {
    const body = {
      pageNumber: page,
      pageSize: this.state.pageSize,
      searchQuery: this.props.movieId,
    };
    ServiceProvider.post(apiUrl.reviews, body).then((response) => {
      this.setState({
        reviews: response.data.data.reviews,
        totalReviews: response.data.data.totalCount,
        pageNumber: page,
      });
    });
  };

  changeReviewCount = (e) => {
    this.setState({ pageSize: e.target.value });
    const body = {
      pageNumber: 1,
      pageSize: e.target.value,
      searchQuery: this.props.movieId,
    };
    ServiceProvider.post(apiUrl.reviews, body).then((response) => {
      this.setState({
        reviews: response.data.data.reviews,
        totalReviews: response.data.data.totalCount,
        pageNumber: 1,
      });
    });
  };

  componentDidMount() {
    this.props.toggleLoader(true, "15%");
    this.fetchReviews();
  }

  fetchReviews() {
    let body = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      searchQuery: this.props.movieId,
    };

    ServiceProvider.post(apiUrl.reviews, body).then((response) => {
      if (response.status === 200) {
        // {May Impact performance need to think if there are large number of reviews}
        response.data.data.reviews.forEach((review) => {
          if (review.userEmail === this.props.loggedInEmail) {
            this.setState({
              isReviewGiven: true,
              reviewTitle: review.reviewTitle,
              reviewDescription: review.reviewDescription,
              reviewId: review.id,
            });
          }
        });
        this.setState(
          {
            reviews: response.data.data.reviews,
            totalReviews: response.data.data.totalCount,
            openPopupClassName: "",
          },
          () => {
            this.props.toggleLoader(false, 1);
          }
        );
      }
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div
        id="reviews"
        className="tab review "
        style={
          this.props.selectedTab === movieDetailTabs.review
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {
          <ReviewPopup
            openPopupClassName={this.state.openPopupClassName}
            closeReviewPopup={this.closeReviewPopup}
            postReview={this.postReview}
            reviewPopupType={this.state.reviewPopupType}
            reviewTitle={this.state.reviewTitle}
            reviewDescription={this.state.reviewDescription}
            reviewId={this.state.reviewId}
            handleChange={this.handleChange}
          ></ReviewPopup>
        }
        <div className="row">
          <div className="rv-hd">
            <div className="div">
              <br></br>
              <br></br>
              <h3>Reviews Related To</h3>
              <h2 style={{ color: "white" }}>{this.props.movieName}</h2>
            </div>
            {this.state.isReviewGiven ? (
              <a
                className="redbtn"
                id="black-hover"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  this.openReviewPopup(
                    popupType.editReview,
                    this.state.reviewTitle,
                    this.state.reviewDescription,
                    this.state.reviewId
                  )
                }
              >
                Edit Review
              </a>
            ) : (
              <a
                className="redbtn"
                id="black-hover"
                style={{ cursor: "pointer" }}
                onClick={this.openReviewPopup}
              >
                Write Review
              </a>
            )}
          </div>
          <DetailTopBar totalCount={this.state.totalReviews}></DetailTopBar>
          <div className="mv-user-review-item">
            <ul>
              {this.state.reviews &&
                this.state.reviews.map((review, index) => (
                  <li key={index}>
                    <h3 style={{ color: "yellow" }}>{review.reviewTitle}</h3>
                    <p className="time">
                      {review.reviewDate} by{" "}
                      <a style={{ color: "white" }}> {review.userEmail}</a>
                    </p>
                    <p>{review.reviewDescription}</p>
                  </li>
                ))}
            </ul>
          </div>
          {this.state.totalReviews > 0 && (
            <Pagination
              pageSize={this.state.pageSize}
              totalCount={this.state.totalReviews}
              currentPage={this.state.pageNumber}
              countList={countList}
              changeCount={this.changeReviewCount}
              pageNumberClicked={this.pageNumberClicked}
              description="Reviews"
            ></Pagination>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInEmail: state.loggedInUserInfo.loggedInEmail,
    isUserLoggedIn: state.loggedInUserInfo.isUserLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoader: (showLoader, screenOpacity) => {
      dispatch(toggleLoader(showLoader, screenOpacity));
    },
    togglePopup: (popupClassName, popupType) => {
      dispatch(togglePopup(popupClassName, popupType));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieReview);

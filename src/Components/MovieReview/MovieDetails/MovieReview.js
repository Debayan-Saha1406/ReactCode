/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
  movieDetailTabs,
  popupType,
  apiUrl,
  monthNames,
} from "../../../Shared/Constants";
import Pagination from "../Common/Pagination";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

import { connect } from "react-redux";
import ReviewPopup from "./../Common/ReviewPopup";
import ServiceProvider from "../../../Provider/ServiceProvider";
import DetailTopBar from "../Common/DetailTopBar";

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
    this.setState({
      openPopupClassName: "",
      reviewTitle: "",
      reviewDescription: "",
    });
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
      ServiceProvider.put(apiUrl.updateReview, reviewId, body).then(
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
              <h2>{this.props.movieName}</h2>
            </div>
            <a
              className="redbtn"
              id="black-hover"
              style={{ cursor: "pointer" }}
              onClick={this.openReviewPopup}
            >
              Write Review
            </a>
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
                      <a className="link-color"> {review.userEmail}</a>
                      {this.props.loggedInEmail === review.userEmail && (
                        <i
                          className="fa fa-pencil"
                          aria-hidden="true"
                          style={{
                            float: "right",
                            cursor: "pointer",
                            color: "#ffaa3c",
                          }}
                          id="edit-pencil"
                          onClick={() =>
                            this.openReviewPopup(
                              popupType.editReview,
                              review.reviewTitle,
                              review.reviewDescription,
                              review.id
                            )
                          }
                        ></i>
                      )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieReview);

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl, movieDetailTabs, popupType } from "../../../Shared/Constants";
import Pagination from "../Common/Pagination";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

import { connect } from "react-redux";
import ReviewPopup from "./../Common/ReviewPopup";

class MovieReview extends Component {
  state = {
    openPopupClassName: "",
    reviewPopupType: popupType.addReview,
    reviewDescription: "",
    reviewTitle: "",
    isPopupClosed: false,
  };

  openReviewPopup = (reviewPopupType, reviewTitle, reviewDescription) => {
    if (this.props.isUserLoggedIn) {
      debugger;
      this.setState({
        openPopupClassName: "openform",
        reviewPopupType: reviewPopupType,
        reviewTitle: reviewTitle,
        reviewDescription: reviewDescription,
        isPopupClosed: false,
      });
    } else {
      this.props.togglePopup("openform", popupType.login);
    }
  };

  closeReviewPopup = () => {
    this.setState({
      openPopupClassName: "",
      reviewTitle: "",
      reviewDescription: "",
      isPopupClosed: true,
    });
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
            postReview={this.props.postReview}
            reviewPopupType={this.state.reviewPopupType}
            reviewTitle={this.state.reviewTitle}
            reviewDescription={this.state.reviewDescription}
            isPopupClosed={this.state.isPopupClosed}
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
          <div className="topbar-filter">
            <p>
              Found <span>{this.props.totalReviews}</span> in total
            </p>
            <label className="filterBy">Filter by:</label>
            <select className="popularity">
              <option value="popularity">Popularity Descending</option>
              <option value="popularity">Popularity Ascending</option>
              <option value="rating">Rating Descending</option>
              <option value="rating">Rating Ascending</option>
              <option value="date">Release date Descending</option>
              <option value="date">Release date Ascending</option>
            </select>
          </div>
          <div className="mv-user-review-item">
            <ul>
              {this.props.reviews &&
                this.props.reviews.map((review, index) => (
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
                              review.reviewDescription
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
          {this.props.totalReviews > 0 && (
            <Pagination
              pageSize={this.props.pageSize}
              totalCount={this.props.totalReviews}
              currentPage={this.props.pageNumber}
              changeCount={this.props.changeReviewCount}
              pageNumberClicked={this.props.pageNumberClicked}
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

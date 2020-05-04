/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl, movieDetailTabs } from "../../../Shared/Constants";
import Pagination from "../Common/Pagination";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

import { connect } from "react-redux";
import ReviewPopup from "./../Common/ReviewPopup";

class MovieReview extends Component {
  state = {};
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
            openPopupClassName={this.props.openPopupClassName}
            closeReviewPopup={this.props.closeReviewPopup}
            postReview={this.props.postReview}
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
              onClick={this.props.openReviewPopup}
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
                      {review.reviewDate} by <a> {review.userEmail}</a>
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoader: (showLoader, screenOpacity) => {
      dispatch(toggleLoader(showLoader, screenOpacity));
    },
  };
};

export default connect(null, mapDispatchToProps)(MovieReview);

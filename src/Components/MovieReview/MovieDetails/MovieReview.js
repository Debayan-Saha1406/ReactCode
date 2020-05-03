/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl } from "../../../Shared/Constants";
import Pagination from "../Common/Pagination";

class MovieReview extends Component {
  state = {
    reviews: [],
    totalReviews: 0,
    pageNumber: 1,
    pageSize: 5,
  };
  componentDidMount() {
    let body = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
      searchQuery: 1,
    };
    ServiceProvider.post(apiUrl.reviews, body).then((response) => {
      this.setState({
        reviews: response.data.data.reviews,
        totalReviews: response.data.data.totalCount,
      });
    });
  }

  changeReviewCount = (e) => {
    this.setState({ pageSize: e.target.value });
    const body = {
      pageNumber: this.state.pageNumber,
      pageSize: e.target.value,
      searchQuery: 1,
    };
    ServiceProvider.post(apiUrl.reviews, body).then((response) => {
      this.setState({
        reviews: response.data.data.reviews,
        totalReviews: response.data.data.totalCount,
      });
    });
  };

  pageNumberClicked = (page) => {
    const body = {
      pageNumber: page,
      pageSize: this.state.pageSize,
      searchQuery: 1,
    };
    ServiceProvider.post(apiUrl.reviews, body).then((response) => {
      this.setState({
        reviews: response.data.data.reviews,
        totalReviews: response.data.data.totalCount,
        pageNumber: page,
      });
    });
  };

  render() {
    return (
      <div
        id="reviews"
        className="tab review "
        style={
          this.props.selectedTab === "review"
            ? { display: "block" }
            : { display: "none" }
        }
      >
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
            >
              Write Review
            </a>
          </div>
          <div className="topbar-filter">
            <p>
              Found <span>{this.state.totalReviews}</span> in total
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
              {this.state.reviews &&
                this.state.reviews.map((review, index) => (
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

export default MovieReview;

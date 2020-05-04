/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../../css/movie-single.css";
import { useState } from "react";

const ReviewPopup = (props) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  return (
    <div className={`overlay ${props.openPopupClassName}`}>
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          <a
            className="close"
            data-ol-has-click-handler=""
            onClick={props.closeReviewPopup}
            style={{ cursor: "pointer" }}
          >
            x
          </a>
          <h3 className="add-review">Add Review</h3>
          <form method="post">
            <div className="row">
              <label htmlFor="username">Review Title:</label>
            </div>
            <div className="row">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Review Title"
                required="required"
                className="review-title"
                onChange={(e) => {
                  setReviewTitle(e.target.value);
                }}
              />
            </div>
            <br></br>
            <div className="row">
              <label htmlFor="password">Review Description:</label>
            </div>
            <div className="row">
              <textarea
                type="text"
                id="review-description"
                required="required"
                placeholder="Review Description"
                rows="4"
                cols="50"
                onChange={(e) => {
                  setReviewDescription(e.target.value);
                }}
              />
            </div>
            <br></br>
            <div className="row">
              {reviewTitle !== "" && reviewDescription !== "" ? (
                <button
                  type="submit"
                  onClick={(e) =>
                    props.postReview(e, reviewTitle, reviewDescription)
                  }
                >
                  Post Review
                </button>
              ) : (
                <button type="submit" disabled={true} id="not-allowed">
                  Post Review
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;

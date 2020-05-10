/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../../css/movie-single.css";
import { popupType } from "./../../../Shared/Constants";

const ReviewPopup = (props) => {
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
          {props.reviewPopupType === popupType.editReview ? (
            <h3 className="add-review">Edit Review </h3>
          ) : (
            <h3 className="add-review">Add Review </h3>
          )}
          <form method="post">
            <div className="row">
              <label htmlFor="username">Review Title:</label>
            </div>
            <div className="row">
              <input
                type="text"
                name="reviewTitle"
                id="username"
                placeholder="Review Title"
                required="required"
                className="review-title"
                onChange={(e) => {
                  props.handleChange(e);
                }}
                value={props.reviewTitle}
              />
            </div>
            <br></br>
            <div className="row">
              <label htmlFor="password">Review Description:</label>
            </div>
            <div className="row">
              <textarea
                type="text"
                name="reviewDescription"
                id="review-description"
                required="required"
                placeholder="Review Description"
                rows="4"
                cols="50"
                onChange={(e) => {
                  props.handleChange(e);
                }}
                value={props.reviewDescription}
              />
            </div>
            <br></br>
            <div className="row">
              {props.reviewTitle !== "" && props.reviewDescription !== "" ? (
                <button
                  type="submit"
                  onClick={(e) =>
                    props.postReview(
                      e,
                      props.reviewTitle,
                      props.reviewDescription,
                      props.reviewId,
                      props.reviewPopupType
                    )
                  }
                >
                  {props.reviewPopupType === popupType.editReview
                    ? "Update Review"
                    : "Post Review"}
                </button>
              ) : (
                <button type="submit" disabled={true} id="not-allowed">
                  {props.reviewPopupType === popupType.editReview
                    ? "Update Review"
                    : "Post Review"}
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

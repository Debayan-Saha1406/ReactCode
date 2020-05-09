/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../../css/movie-single.css";
import { useState } from "react";
import { popupType } from "./../../../Shared/Constants";

const ReviewPopup = (props) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [isEditReviewContentSet, setIsEditReviewContent] = useState(false);
  const [reviewDescription, setReviewDescription] = useState("");
  if (
    props.reviewPopupType === popupType.editReview &&
    !isEditReviewContentSet &&
    props.isPopupClosed !== true
  ) {
    setReviewTitle(props.reviewTitle);
    setReviewDescription(props.reviewDescription);
    setIsEditReviewContent(true);
  }

  const closeReviewPopup = () => {
    setIsEditReviewContent(false);
    props.closeReviewPopup();
  };

  return (
    <div className={`overlay ${props.openPopupClassName}`}>
      <div className="login-wrapper" id="login-content">
        <div className="login-content">
          <a
            className="close"
            data-ol-has-click-handler=""
            onClick={closeReviewPopup}
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
                name="username"
                id="username"
                placeholder="Review Title"
                required="required"
                className="review-title"
                onChange={(e) => {
                  setReviewTitle(e.target.value);
                }}
                value={reviewTitle}
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
                value={reviewDescription}
              />
            </div>
            <br></br>
            <div className="row">
              {reviewTitle !== "" && reviewDescription !== "" ? (
                <button
                  type="submit"
                  onClick={(e) =>
                    props.postReview(
                      e,
                      reviewTitle,
                      reviewDescription,
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

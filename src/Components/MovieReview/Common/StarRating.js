import React from "react";
import StarRatings from "react-star-ratings";

const StarRating = (props) => {
  return (
    <StarRatings
      rating={props.userRating}
      starRatedColor="yellow"
      changeRating={props.changeRating}
      numberOfStars={10}
      name="rating"
      starHoverColor="yellow"
      starDimension="30px"
      starSpacing="2px"
    />
  );
};

export default StarRating;

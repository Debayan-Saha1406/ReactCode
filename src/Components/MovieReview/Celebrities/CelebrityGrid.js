/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import image from "../../../images/movie-single.jpg";
import { Link } from "react-router-dom";
import { gender } from "../../../Shared/Constants";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

const CelebrityGrid = (props) => {
  const dispatch = useDispatch();
  const hideLoader = (isLastImage) => {
    if (isLastImage && props.isImageLoading) {
      dispatch(toggleLoader(false, 1));
    }
  };

  return (
    <div class="celebrity-items">
      {props.celebs.map((celeb, index) => (
        <div class="ceb-item">
          <a>
            <img
              src={celeb.photo}
              alt=""
              onLoad={() => {
                hideLoader(props.celebs.length - 1 === index);
              }}
            />
          </a>
          <div class="ceb-infor">
            <h2>
              <Link className="heading" to={`/celebrity-details/${celeb.id}`}>
                {celeb.celebrityName}
              </Link>
            </h2>
            <span>
              {celeb.gender.toLowerCase() === gender.male.toLowerCase()
                ? "Actor"
                : "Actress"}
              , {celeb.nationality}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CelebrityGrid;

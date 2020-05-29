/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import image from "../../../images/movie-single.jpg";
import { Link } from "react-router-dom";
import { gender } from "../../../Shared/Constants";

const CelebrityGrid = (props) => {
  return (
    <div class="celebrity-items">
      {props.celebs.map((celeb) => (
        <div class="ceb-item">
          <a>
            <img src={celeb.photo} alt="" />
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

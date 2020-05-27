import React from "react";
import image from "../../../images/movie-single.jpg";
import { gender } from "../../../Shared/Constants";
import { Link } from "react-router-dom";

const CelebrityList = (props) => {
  return (
    <React.Fragment>
      {props.celebs.map((celeb) => (
        <div class="col-md-12">
          <div class="ceb-item-style-2">
            <img
              src={celeb.photo}
              alt=""
              style={{ height: "175px", width: "120px" }}
            />
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
              <p style={{ marginTop: "10px" }}>
                {celeb.biography.length > 200
                  ? celeb.biography.substring(0, 200) + "..."
                  : celeb.biography.description}{" "}
              </p>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default CelebrityList;

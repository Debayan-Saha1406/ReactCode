import React from "react";
import image from "../../../images/movie-single.jpg";
import { gender } from "../../../Shared/Constants";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

const CelebrityList = (props) => {
  const dispatch = useDispatch();
  const hideLoader = (isLastImage) => {
    if (isLastImage && props.isImageLoading) {
      dispatch(toggleLoader(false, 1));
    }
  };
  return (
    <React.Fragment>
      {props.celebs.map((celeb, index) => (
        <div class="col-md-12">
          <div class="ceb-item-style-2">
            <img
              src={celeb.photo}
              alt=""
              style={{ height: "260px", width: "170px" }}
              onLoad={() => {
                hideLoader(props.celebs.length - 1 === index);
              }}
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
              </span>
              <p style={{ marginTop: "10px" }}>
                {celeb.biography.length > 200
                  ? celeb.biography.substring(0, 200) + "..."
                  : celeb.biography.description}{" "}
              </p>

              <span style={{ textTransform: "none", fontSize: "14px" }}>
                Date Of Birth :{" "}
                <span
                  style={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                >
                  {celeb.dateOfBirth}
                </span>
              </span>
              <br></br>
              <span style={{ textTransform: "none", fontSize: "14px" }}>
                Net worth:{" "}
                <span
                  style={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                >
                  ${celeb.netWorth} million
                </span>
              </span>
              <br></br>
              <span style={{ textTransform: "none", fontSize: "14px" }}>
                Nationality:{" "}
                <span
                  style={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                >
                  {celeb.nationality}
                </span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default CelebrityList;

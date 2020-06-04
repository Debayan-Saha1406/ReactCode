/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";

const DirectorList = (props) => {
  const dispatch = useDispatch();
  const hideLoader = (isLastImage) => {
    if (isLastImage && props.isImageLoading) {
      dispatch(toggleLoader(false, 1));
    }
  };
  return (
    <React.Fragment>
      {props.directors.map((director, index) => (
        <div class="blog-item-style-1 blog-item-style-3">
          <img
            className="director-photo"
            src={director.photo}
            alt=""
            style={{ height: "260px", width: "170px" }}
            onLoad={() => {
              hideLoader(props.directors.length - 1 === index);
            }}
          />
          <div class="blog-it-infor">
            <h3>
              <Link className="heading" to={`/director-details/${director.id}`}>
                {director.directorName}
              </Link>
            </h3>
            <p>
              {director.biography.length > 200
                ? director.biography.substring(0, 200) + "..."
                : director.biography}{" "}
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
                {director.dateOfBirth}
              </span>
            </span>
            <br></br>
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
                {director.nationality}
              </span>
            </span>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default DirectorList;

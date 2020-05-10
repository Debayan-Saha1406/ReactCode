/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import image from "../../../images/cast1.jpg";
import { Link } from "react-router-dom";

const Cast = (props) => {
  return (
    <div
      id="cast"
      className="tab"
      style={
        props.selectedTab === "cast"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="row" id="castRow">
        <br></br>
        <br></br>
        <h3>
          Cast of <span style={{ color: "#4280bf" }}>{props.movieName}</span>
        </h3>

        <div className="title-hd-sm">
          <h4>Directors</h4>
        </div>
        <div className="mvcast-item">
          {props.directors.map((director, index) => (
            <div key={index} className="cast-it">
              <div className="cast-left">
                <h4>
                  {(
                    ((director.directorName.match(/\b\w/g) || []).shift() ||
                      "") +
                    ((director.directorName.match(/\b\w/g) || []).pop() || "")
                  ).toUpperCase()}
                </h4>
                <a href="#">{director.directorName}</a>
              </div>
              <p>... Director</p>
            </div>
          ))}
        </div>
        <div className="title-hd-sm">
          <h4>Cast</h4>
        </div>
        <div className="mvcast-item">
          {props.stars.map((star, index) => (
            <div key={index} className="cast-it">
              <div className="cast-left">
                <h4>
                  {(
                    ((star.celebrityName.match(/\b\w/g) || []).shift() || "") +
                    ((star.celebrityName.match(/\b\w/g) || []).pop() || "")
                  ).toUpperCase()}
                </h4>
                <Link
                  to={`/celebrity-details/${star.id}`}
                  className="celebrity-name"
                >
                  {star.celebrityName}
                </Link>
              </div>
              <p>... {star.characterName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cast;

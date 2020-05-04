/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Overview = (props) => {
  return (
    <div className="tab-content">
      <div
        id="overview"
        className="tab active"
        style={
          props.selectedTab === "overview"
            ? { display: "block" }
            : { display: "none" }
        }
      >
        <div className="row">
          <div className="col-md-8 col-sm-12 col-xs-12">
            <br></br>
            <p>{props.movieOverview.description}</p>
            {props.reviews.length > 0 && (
              <div className="title-hd-sm">
                <h4>User reviews</h4>
                <a
                  className="time"
                  style={{ cursor: "pointer", color: "#4280bf" }}
                  id="yellow"
                >
                  <span onClick={() => props.toggleTab("review")}>
                    See All {props.reviews.length} Reviews{" "}
                  </span>
                </a>
              </div>
            )}
            {props.reviews.length > 0 && (
              <div className="mv-user-review-item">
                <h3>{props.reviews[0].reviewTitle}</h3>
                <p className="time">
                  {props.reviews[0].reviewDate} by{" "}
                  <a href="#"> {props.reviews[0].userEmail}</a>
                </p>
                <p>{props.reviews[0].reviewDescription}</p>
              </div>
            )}
          </div>

          <div className="col-md-4 col-xs-12 col-sm-12">
            <div className="sb-it">
              <h6 className="side-heading">Director: </h6>
              <ul className="menu">
                {props.directors.map((director, index) => (
                  <li
                    key={index}
                    style={{ color: "#4280bf", marginBottom: "10px" }}
                  >
                    <span className="space-margin">
                      {props.directors.length - 1 === index
                        ? director.directorName
                        : director.directorName + ","}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <br></br>
            <div className="sb-it">
              <h6 className="side-heading">Stars: </h6>
              <ul className="menu">
                {props.celebrities.map((celebrity, index) => (
                  <li
                    key={index}
                    style={{ color: "#4280bf", marginBottom: "10px" }}
                  >
                    <span className="space-margin">
                      {props.celebrities.length - 1 === index
                        ? celebrity.celebrityName
                        : celebrity.celebrityName + ","}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <br></br>
            <div className="sb-it">
              <h6 className="side-heading">Genres:</h6>
              <ul className="menu">
                {props.genres.map((genre, index) => (
                  <li
                    key={index}
                    style={{ color: "#4280bf", marginBottom: "10px" }}
                  >
                    <span className="space-margin">
                      {props.genres.length - 1 === index
                        ? genre.genreName
                        : genre.genreName + ","}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <br></br>
            <div className="sb-it">
              <h6 className="side-heading">Release Date:</h6>
              <p className="release-date">{props.movieOverview.releaseDate}</p>
            </div>
            <br />
            <div className="sb-it">
              <h6 className="side-heading">Run Time:</h6>
              <p>{props.movieOverview.runTime}</p>
            </div>
            <div className="ads">
              <img src="images/uploads/ads1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
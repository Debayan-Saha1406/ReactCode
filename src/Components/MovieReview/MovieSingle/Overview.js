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
                <a href="#" className="time">
                  See All 56 Reviews <i className="ion-ios-arrow-right"></i>
                </a>
              </div>
            )}
            {props.reviews.length > 0 && (
              <div className="mv-user-review-item">
                <h3>Best Marvel movie in my opinion</h3>
                <div className="no-star">
                  <i className="ion-android-star"></i>
                  <i className="ion-android-star"></i>
                  <i className="ion-android-star"></i>
                  <i className="ion-android-star"></i>
                  <i className="ion-android-star"></i>
                  <i className="ion-android-star"></i>
                  <i className="ion-android-star"></i>
                  <i className="ion-android-star"></i>
                  <i className="ion-android-star"></i>
                  <i className="ion-android-star last"></i>
                </div>
                <p className="time">
                  17 December 2016 by <a href="#"> hawaiipierson</a>
                </p>
                <p>
                  This is by far one of my favorite movies from the MCU. The
                  introduction of new Characters both good and bad also makes
                  the movie more exciting. giving the characters more of a back
                  story can also help audiences relate more to different
                  characters better, and it connects a bond between the audience
                  and actors or characters. Having seen the movie three times
                  does not bother me here as it is as thrilling and exciting
                  every time I am watching it. In other words, the movie is by
                  far better than previous movies (and I do love everything
                  Marvel), the plotting is splendid (they really do out do
                  themselves in each film, there are no problems watching it
                  more than once.
                </p>
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

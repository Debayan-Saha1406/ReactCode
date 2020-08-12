/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../../css/movie-single.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl, WhatToWatchType } from "./../../../Shared/Constants";
import { responsive } from "./../../../Shared/Constants";
import NoResultFound from "./../Common/NoResultFound";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import { useHistory } from "react-router-dom";

const WhatToWatch = () => {
  const [whatToWatchMovies, setWhatToWatchMovies] = useState([]);
  const [type, setType] = useState(WhatToWatchType.HighestRated);
  const [isComponentVisible, showComponent] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [readMoreOpacity, setReadMoreOpacity] = useState(0);
  const [indexHovered, setIndexHovered] = useState(-1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleLoader(true, "15%"));
    ServiceProvider.getWithParam(apiUrl.whatToWatchMovies, type).then(
      (response) => {
        if (response.status === 200) {
          dispatch(toggleLoader(false, 1));
          setWhatToWatchMovies(response.data.data);
        }
      }
    );
  }, [type]);

  const handleSuccessfulImageLoad = (isLastImage) => {
    if (isLastImage) {
      showComponent(true);
    }
  };

  const toggleOpacity = (opacity, indexHovered) => {
    if (opacity === 1) {
      setImageOpacity(0.2);
      setIndexHovered(indexHovered);
    } else {
      setImageOpacity(1);
      setIndexHovered(-1);
    }
    setReadMoreOpacity(opacity);
  };

  return (
    <React.Fragment>
      {
        <div className="col-md-12">
          <div className="title-hd" style={{ paddingTop: "20px" }}>
            {isComponentVisible && <h2>What To Watch</h2>}
          </div>
          <div className="tabs">
            <ul className="tab-links">
              {type === WhatToWatchType.HighestRated ? (
                <li className="active">
                  {isComponentVisible && (
                    <a style={{ cursor: "pointer" }}>Highest Rated </a>
                  )}
                </li>
              ) : (
                <li>
                  {isComponentVisible && (
                    <a
                      onClick={() => setType(WhatToWatchType.HighestRated)}
                      style={{ cursor: "pointer" }}
                    >
                      Highest Rated{" "}
                    </a>
                  )}
                </li>
              )}
              {type === WhatToWatchType.MostReviewed ? (
                <li className="active">
                  {isComponentVisible && (
                    <a style={{ cursor: "pointer" }}>Most Reviewed </a>
                  )}
                </li>
              ) : (
                <li>
                  {isComponentVisible && (
                    <a
                      onClick={() => setType(WhatToWatchType.MostReviewed)}
                      style={{ cursor: "pointer" }}
                    >
                      Most Reviewed{" "}
                    </a>
                  )}
                </li>
              )}
              {type === WhatToWatchType.ComingSoon ? (
                <li className="active">
                  {isComponentVisible && (
                    <a style={{ cursor: "pointer" }}>Coming Soon </a>
                  )}
                </li>
              ) : (
                <li>
                  {isComponentVisible && (
                    <a
                      onClick={() => setType(WhatToWatchType.ComingSoon)}
                      style={{ cursor: "pointer" }}
                    >
                      Coming Soon{" "}
                    </a>
                  )}
                </li>
              )}
            </ul>
            {isComponentVisible && whatToWatchMovies.length === 0 ? (
              <div style={{ marginTop: "20px" }}>
                <NoResultFound></NoResultFound>
              </div>
            ) : (
              <div
                className={
                  whatToWatchMovies.length === 3 && "carousel-left-shift"
                }
              >
                <Carousel
                  ssr
                  partialVisbile
                  // deviceType={deviceType}
                  itemClass="image-item"
                  responsive={responsive}
                >
                  {whatToWatchMovies.map((movie, index) => {
                    return (
                      <React.Fragment key={index}>
                        {indexHovered === index ? (
                          <img
                            draggable={false}
                            style={{
                              height: "380px",
                              width: "300px",
                              opacity: imageOpacity,
                            }}
                            src={movie.movieLogo}
                            onLoad={() =>
                              handleSuccessfulImageLoad(
                                whatToWatchMovies.length - 1 === index
                              )
                            }
                            onMouseOver={() => toggleOpacity(1, index)}
                            onMouseOut={() => toggleOpacity(0, index)}
                          />
                        ) : (
                          <img
                            draggable={false}
                            style={{
                              height: "380px",
                              width: "300px",
                            }}
                            src={movie.movieLogo}
                            onLoad={() =>
                              handleSuccessfulImageLoad(
                                whatToWatchMovies.length - 1 === index
                              )
                            }
                            onMouseOver={() => toggleOpacity(1, index)}
                            onMouseOut={() => toggleOpacity(0, index)}
                          />
                        )}
                        {indexHovered === index ? (
                          <div
                            className="read-more"
                            style={{ opacity: readMoreOpacity }}
                            onMouseOver={() => toggleOpacity(1, index)}
                          >
                            <Link
                              to={`/movie-details/${movie.movieId}`}
                              style={{ fontSize: "20px" }}
                              id="black-hover"
                            >
                              {" "}
                              <b>Read more</b>
                            </Link>
                          </div>
                        ) : (
                          <div
                            className="read-more"
                            style={{ opacity: 0 }}
                            onMouseOver={() => toggleOpacity(1, index)}
                          >
                            <Link
                              to={`/movie-details/${movie.movieId}`}
                              style={{ fontSize: "20px" }}
                            >
                              {" "}
                              Read more{" "}
                            </Link>
                          </div>
                        )}

                        <div className="mv-item-infor">
                          <h6
                            style={{ marginTop: "20px", marginBottom: "0px" }}
                            className="description"
                          >
                            {movie.movieName}
                          </h6>
                          <p className="rate">
                            {type === WhatToWatchType.HighestRated ? (
                              <i
                                className="fa fa-star"
                                style={{
                                  fontSize: "20px",
                                  color: "yellow",
                                  marginRight: "5px",
                                }}
                              ></i>
                            ) : (
                              <i
                                class="fa fa-comments"
                                style={{
                                  fontSize: "20px",
                                  marginRight: "5px",
                                  color: "beige",
                                }}
                              ></i>
                            )}
                            {type === WhatToWatchType.HighestRated ? (
                              <span>{movie.avgRating} /10</span>
                            ) : (
                              <span>{movie.totalReviews}</span>
                            )}
                          </p>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default WhatToWatch;

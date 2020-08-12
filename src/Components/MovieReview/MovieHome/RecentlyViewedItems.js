/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import { responsive, recentlyViewed } from "./../../../Shared/Constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { useState } from "react";
import { searchBarSubType } from "./../../../Shared/Constants";

const RecentlyViewedItem = (props) => {
  const [isComponentVisible, showComponent] = useState(false);
  const [imageOpacity, setImageOpacity] = useState(1);
  const [readMoreOpacity, setReadMoreOpacity] = useState(0);
  const [indexHovered, setIndexHovered] = useState(-1);

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
            <h2>
              Recently Viewed Items{" "}
              {props.recentlyViewedItems.length > 0 && (
                <span
                  className="clear-recently-viewed-items"
                  onClick={props.clearRecentlyViewedItems}
                >
                  Clear
                </span>
              )}
            </h2>
          </div>
          <div className="tabs">
            {props.recentlyViewedItems.length === 0 ? (
              <h3 style={{ color: "#abb7c4" }}>
                You Have not viewed anything recently
              </h3>
            ) : (
              <div
                className={
                  props.recentlyViewedItems.length === 3 &&
                  "carousel-left-shift"
                }
              >
                <Carousel
                  ssr
                  partialVisbile
                  itemClass="image-item"
                  responsive={responsive}
                >
                  {props.recentlyViewedItems.map(
                    (recentlyViewedItem, index) => {
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
                              src={recentlyViewedItem.logo}
                              onLoad={() =>
                                handleSuccessfulImageLoad(
                                  props.recentlyViewedItems.length - 1 === index
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
                              src={recentlyViewedItem.logo}
                              onLoad={() =>
                                handleSuccessfulImageLoad(
                                  props.recentlyViewedItems.length - 1 === index
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
                              {recentlyViewedItem.type ===
                              searchBarSubType.movie ? (
                                <Link
                                  to={`/movie-details/${recentlyViewedItem.id}`}
                                  style={{ fontSize: "20px" }}
                                  id="black-hover"
                                >
                                  {" "}
                                  <b>Read more </b>
                                </Link>
                              ) : searchBarSubType.director ? (
                                <Link
                                  to={`/director-details/${recentlyViewedItem.id}`}
                                  style={{ fontSize: "20px" }}
                                  id="black-hover"
                                >
                                  <b>Read more </b>
                                </Link>
                              ) : (
                                <Link
                                  to={`/celebrity-details/${recentlyViewedItem.id}`}
                                  style={{ fontSize: "20px" }}
                                  id="black-hover"
                                >
                                  <b>Read more </b>
                                </Link>
                              )}
                            </div>
                          ) : (
                            <div
                              className="read-more"
                              style={{ opacity: 0 }}
                              onMouseOver={() => toggleOpacity(1, index)}
                            >
                              {recentlyViewedItem.type ===
                              searchBarSubType.movie ? (
                                <Link
                                  to={`/movie-details/${recentlyViewedItem.id}`}
                                  style={{ fontSize: "20px" }}
                                >
                                  {" "}
                                  <b>Read more </b>
                                </Link>
                              ) : searchBarSubType.director ? (
                                <Link
                                  to={`/director-details/${recentlyViewedItem.id}`}
                                  style={{ fontSize: "20px" }}
                                >
                                  <b>Read more </b>
                                </Link>
                              ) : (
                                <Link
                                  to={`/celebrity-details/${recentlyViewedItem.id}`}
                                  style={{ fontSize: "20px" }}
                                >
                                  <b>Read more </b>
                                </Link>
                              )}
                            </div>
                          )}
                          <div className="mv-item-infor">
                            <h6
                              style={{ marginTop: "20px", marginBottom: "0px" }}
                              className="description"
                            >
                              {recentlyViewedItem.name}
                            </h6>
                          </div>
                        </React.Fragment>
                      );
                    }
                  )}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default RecentlyViewedItem;

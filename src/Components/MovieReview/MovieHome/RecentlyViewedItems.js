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

  const handleSuccessfulImageLoad = (isLastImage) => {
    if (isLastImage) {
      showComponent(true);
    }
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
              <Carousel
                ssr
                partialVisbile
                // deviceType={deviceType}
                itemClass="image-item"
                responsive={responsive}
              >
                {props.recentlyViewedItems.map((recentlyViewedItem, index) => {
                  return (
                    <React.Fragment key={index}>
                      <img
                        draggable={false}
                        style={{ height: "380px", width: "300px" }}
                        src={recentlyViewedItem.logo}
                        onLoad={() =>
                          handleSuccessfulImageLoad(
                            props.recentlyViewedItems.length - 1 === index
                          )
                        }
                      />
                      <div className="mv-item-infor">
                        <h6 style={{ marginTop: "20px", marginBottom: "0px" }}>
                          {recentlyViewedItem.type ===
                          searchBarSubType.movie ? (
                            <Link
                              className="heading"
                              to={`/movie-details/${recentlyViewedItem.id}`}
                            >
                              {recentlyViewedItem.name}
                            </Link>
                          ) : searchBarSubType.director ? (
                            <Link
                              className="heading"
                              to={`/director-details/${recentlyViewedItem.id}`}
                            >
                              {recentlyViewedItem.name}
                            </Link>
                          ) : (
                            <Link
                              className="heading"
                              to={`/celebrity-details/${recentlyViewedItem.id}`}
                            >
                              {recentlyViewedItem.name}
                            </Link>
                          )}
                        </h6>
                      </div>
                    </React.Fragment>
                  );
                })}
              </Carousel>
            )}
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default RecentlyViewedItem;

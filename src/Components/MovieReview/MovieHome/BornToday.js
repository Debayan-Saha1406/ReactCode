/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import {
  responsive,
  monthNames,
  searchBarSubType,
} from "./../../../Shared/Constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const BornToday = (props) => {
  const [isComponentVisible, showComponent] = useState(false);

  const handleSuccessfulImageLoad = (isLastImage) => {
    if (isLastImage) {
      showComponent(true);
    }
  };

  return (
    <React.Fragment>
      {
        <div class="col-md-12">
          <div class="title-hd" style={{ marginTop: "20px" }}>
            {isComponentVisible && <h2>Born Today</h2>}
          </div>
          <div class="tabs">
            <ul class="tab-links" style={{ marginBottom: "10px" }}>
              <li class="active">
                {isComponentVisible && (
                  <a>
                    People born on{" "}
                    {String(new Date().getDate()).padStart(2, "0")}{" "}
                    {monthNames[new Date().getMonth()]}{" "}
                  </a>
                )}
              </li>
            </ul>
            <div
              className={
                props.starsBornToday.length === 3 && "carousel-left-shift"
              }
            >
              <Carousel
                ssr
                partialVisbile
                // deviceType={deviceType}
                itemClass="image-item"
                responsive={responsive}
              >
                {props.starsBornToday.map((star, index) => {
                  return (
                    <React.Fragment>
                      <img
                        draggable={false}
                        style={{
                          height: "300px",
                          width: "300px",
                          borderRadius: "50%",
                        }}
                        src={star.image}
                        onLoad={() =>
                          handleSuccessfulImageLoad(
                            props.starsBornToday.length - 1 === index
                          )
                        }
                      />
                      <div class="mv-item-infor">
                        <h6
                          style={{
                            marginTop: "20px",
                            marginBottom: "0px",
                            textAlign: "center",
                          }}
                        >
                          {star.type === searchBarSubType.director ? (
                            <Link
                              className="heading"
                              to={`/director-details/${star.id}`}
                            >
                              {star.name}
                            </Link>
                          ) : (
                            <Link
                              className="heading"
                              to={`/celebrity-details/${star.id}`}
                            >
                              {star.name}
                            </Link>
                          )}
                        </h6>
                        <p class="rate" style={{ textAlign: "center" }}>
                          <span>{star.age}</span>
                        </p>
                      </div>
                    </React.Fragment>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default BornToday;

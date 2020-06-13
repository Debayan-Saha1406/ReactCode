/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import {
  responsive,
  monthNames,
  searchBarSubType,
} from "./../../../Shared/Constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import { Link } from "react-router-dom";

const BornToday = () => {
  const [starsBornToday, setStarsBornToday] = useState([]);
  const [isComponentVisible, showComponent] = useState(false);
  useEffect(() => {
    ServiceProvider.get(apiUrl.starsBornToday).then((response) => {
      if (response.status === 200) {
        setStarsBornToday(response.data.data);
      }
    });
  }, []);

  const handleSuccessfulImageLoad = (isLastImage) => {
    if (isLastImage) {
      showComponent(true);
    }
  };

  return (
    <React.Fragment>
      {
        <div class="col-md-12">
          <div class="title-hd">
            {isComponentVisible && <h2>Born Today</h2>}
          </div>
          <div class="tabs">
            <ul class="tab-links">
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
            <Carousel
              ssr
              partialVisbile
              // deviceType={deviceType}
              itemClass="image-item"
              responsive={responsive}
            >
              {starsBornToday.map((star, index) => {
                return (
                  <React.Fragment>
                    <img
                      draggable={false}
                      style={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                      }}
                      src={star.image}
                      onLoad={() =>
                        handleSuccessfulImageLoad(
                          starsBornToday.length - 1 === index
                        )
                      }
                    />
                    <div class="mv-item-infor">
                      <h6 style={{ marginTop: "20px", marginBottom: "0px" }}>
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
                      <p class="rate">
                        <span>{star.age}</span>
                      </p>
                    </div>
                  </React.Fragment>
                );
              })}
            </Carousel>
          </div>
        </div>
      }
    </React.Fragment>
  );
};

export default BornToday;

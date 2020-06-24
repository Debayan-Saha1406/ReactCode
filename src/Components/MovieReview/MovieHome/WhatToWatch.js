/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import { responsive } from "./../../../Shared/Constants";

const WhatToWatch = () => {
  const [fanFavoriteMovies, setFanFavoriteMovies] = useState([]);
  const [isComponentVisible, showComponent] = useState(false);

  useEffect(() => {
    ServiceProvider.get(apiUrl.fanFavoriteMovies).then((response) => {
      if (response.status === 200) {
        setFanFavoriteMovies(response.data.data);
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
          <div class="title-hd" style={{ paddingTop: "20px" }}>
            {isComponentVisible && <h2>What To Watch</h2>}
          </div>
          <div class="tabs">
            <ul class="tab-links">
              <li class="active">
                {isComponentVisible && <a>Fan Favorites </a>}
              </li>
            </ul>

            <Carousel
              ssr
              partialVisbile
              // deviceType={deviceType}
              itemClass="image-item"
              responsive={responsive}
            >
              {fanFavoriteMovies.map((movie, index) => {
                return (
                  <React.Fragment>
                    <img
                      draggable={false}
                      style={{ height: "380px", width: "300px" }}
                      src={movie.movieLogo}
                      onLoad={() =>
                        handleSuccessfulImageLoad(
                          fanFavoriteMovies.length - 1 === index
                        )
                      }
                    />
                    <div class="mv-item-infor">
                      <h6 style={{ marginTop: "20px", marginBottom: "0px" }}>
                        <Link
                          className="heading"
                          to={`/movie-details/${movie.movieId}`}
                        >
                          {movie.movieName}
                        </Link>
                      </h6>
                      <p class="rate">
                        <i
                          class="fa fa-star"
                          style={{
                            fontSize: "20px",
                            color: "yellow",
                            marginRight: "5px",
                          }}
                        ></i>
                        <span>{movie.avgRating}</span> /10
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

export default WhatToWatch;

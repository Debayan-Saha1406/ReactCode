/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import image from "../../../images/mv1.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

const PopularMovies = () => {
  const [fanFavoriteMovies, setFanfavoriteMovies] = useState([]);
  useEffect(() => {
    ServiceProvider.get(apiUrl.fanFavoriteMovies).then((response) => {
      if (response.status === 200) {
        setFanfavoriteMovies(response.data.data);
      }
    });
  }, []);
  return (
    <Carousel
      ssr
      partialVisbile
      // deviceType={deviceType}
      itemClass="image-item"
      responsive={responsive}
    >
      {fanFavoriteMovies.map((movie) => {
        return (
          <React.Fragment>
            <img
              draggable={false}
              style={{ height: "280px", width: "220px" }}
              src={movie.movieLogo}
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
  );
};

export default PopularMovies;

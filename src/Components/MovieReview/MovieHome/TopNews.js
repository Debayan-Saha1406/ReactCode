/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import NoResultFound from "./../Common/NoResultFound";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../../css/movie-single.css";
import {
  MediaTypes,
  responsive,
  tmdbImageUrl,
} from "./../../../Shared/Constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import noImage from "../../../images/noImage.jpg";
import { useHistory } from "react-router-dom";

const TopNews = () => {
  const [topNews, setTopNews] = useState([]);
  const [indexHovered, setIndexHovered] = useState(-1);
  const [imageOpacity, setImageOpacity] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(toggleLoader(true, "15%"));
    ServiceProvider.newsApiUrlGet(
      apiUrl.newsApiUrl,
      1,
      MediaTypes[0].value.toLowerCase()
    )
      .then((response) => {
        setTopNews(response.data.results);
        dispatch(toggleLoader(false, 1));
      })
      .catch((error) => {
        setTopNews([]);
        dispatch(toggleLoader(false, 1));
      });
  }, []);

  const toggleOpacity = (opacity, indexHovered) => {
    if (opacity === 1) {
      setImageOpacity(0.2);
      setIndexHovered(indexHovered);
    } else {
      setImageOpacity(1);
      setIndexHovered(-1);
    }
  };

  return (
    <React.Fragment>
      <div className="col-md-12">
        <div className="title-hd" style={{ paddingTop: "20px" }}>
          {
            <h2>
              Trending
              {topNews.length > 0 && (
                <span
                  className="clear-recently-viewed-items"
                  onClick={() => {
                    history.push("/currentNews");
                  }}
                >
                  See All
                </span>
              )}
            </h2>
          }
        </div>
        <div className="tabs">
          {topNews.length === 0 ? (
            <div style={{ marginTop: "20px" }}>
              <NoResultFound></NoResultFound>
            </div>
          ) : (
            <div className={topNews.length === 3 && "carousel-left-shift"}>
              <Carousel
                ssr
                partialVisbile
                itemClass="trending-item"
                responsive={responsive}
              >
                {topNews.map((newsItem, index) => {
                  return (
                    <React.Fragment key={index}>
                      {indexHovered === index ? (
                        <img
                          draggable={false}
                          style={{
                            height: "280px",
                            width: "380px",
                            opacity: imageOpacity,
                            cursor: "pointer",
                          }}
                          src={
                            newsItem.backdrop_path
                              ? `${tmdbImageUrl}${newsItem.backdrop_path}`
                              : noImage
                          }
                          onMouseOver={() => toggleOpacity(1, index)}
                          onMouseOut={() => toggleOpacity(0, index)}
                        />
                      ) : (
                        <img
                          draggable={false}
                          style={{
                            height: "280px",
                            width: "380px",
                            cursor: "pointer",
                          }}
                          src={
                            newsItem.backdrop_path
                              ? `${tmdbImageUrl}${newsItem.backdrop_path}`
                              : noImage
                          }
                          onMouseOver={() => toggleOpacity(1, index)}
                          onMouseOut={() => toggleOpacity(0, index)}
                        />
                      )}
                      <div className="mv-item-infor">
                        <h6
                          style={{
                            marginTop: "20px",
                            marginBottom: "0px",
                            textTransform: "none",
                          }}
                          className="description"
                        >
                          {newsItem.overview.length > 100
                            ? newsItem.overview.substring(0, 100) + "..."
                            : newsItem.overview}
                        </h6>
                      </div>
                    </React.Fragment>
                  );
                })}
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TopNews;

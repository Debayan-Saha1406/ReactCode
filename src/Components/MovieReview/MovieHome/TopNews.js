/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import NoResultFound from "./../Common/NoResultFound";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../../css/movie-single.css";
import { responsive } from "./../../../Shared/Constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import CountryList from "./../../../Shared/CountryList.json";
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
    ServiceProvider.newsApiUrlGet(apiUrl.newsApiUrl, 1, CountryList[0].id).then(
      (response) => {
        if (response.status === 200) {
          dispatch(toggleLoader(false, 1));
          setTopNews(response.data.articles);
        }
      }
    );
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
              Top News
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
                itemClass="image-item"
                responsive={responsive}
              >
                {topNews.map((newsItem, index) => {
                  return (
                    <React.Fragment key={index}>
                      {indexHovered === index ? (
                        <a href={newsItem.url}>
                          <img
                            draggable={false}
                            style={{
                              height: "280px",
                              width: "300px",
                              opacity: imageOpacity,
                              cursor: "pointer",
                            }}
                            src={
                              newsItem.urlToImage
                                ? newsItem.urlToImage
                                : noImage
                            }
                            onMouseOver={() => toggleOpacity(1, index)}
                            onMouseOut={() => toggleOpacity(0, index)}
                          />
                        </a>
                      ) : (
                        <img
                          draggable={false}
                          style={{
                            height: "280px",
                            width: "300px",
                            cursor: "pointer",
                          }}
                          src={
                            newsItem.urlToImage ? newsItem.urlToImage : noImage
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
                          {newsItem.title}
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

/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import Header from "./../Common/Header";
import BoxPagination from "./../Common/BoxPagination";
import Footer from "./../Common/Footer";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleLoader } from "./../../../Store/Actions/actionCreator";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "./../../../Shared/Constants";
import NewsTopBar from "../Common/NewsTopBar";
import CountryList from "../../../Shared/CountryList.json";
import noImage from "../../../images/noImage.jpg";

const NewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [totalNews, setTotalNews] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [country, setCountry] = useState(CountryList[0].id);
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  const dispatch = useDispatch();

  const hideLoader = (isLastImage) => {
    if (isLastImage) {
      dispatch(toggleLoader(false, 1));
    }
  };

  useEffect(() => {
    dispatch(toggleLoader(true, "15%"));
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    // const url = `http://newsapi.org/v2/top-headlines?apiKey=01f9b39795fb4729812099653bdbe6c4&category=entertainment&pageSize=10&page=${currentPage}&country=${country}`;

    const url = `https://api.themoviedb.org/3/trending/all/day?api_key=0310701bc95f6fccb81c4666548b2092&page=${currentPage}`;

    const request = new Request(url);

    fetch(request)
      .then((response) => response.json())

      .then((news) => {
        setNewsData(news.results);
        setTotalNews(news.total_results / 100);
        dispatch(toggleLoader(false, 1));
        window.scrollTo({
          top: 0,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // ServiceProvider.newsApiUrlGet(apiUrl.newsApiUrl, currentPage, country).then(
    //   (response) => {
    //     setNewsData(response.data.articles);
    //     setTotalNews(response.data.totalResults);
    //     dispatch(toggleLoader(false, 1));
    //     window.scrollTo({
    //       top: 0,
    //     });
    //   }
    // );
  }, [currentPage, country]);

  const pageNumberClicked = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const nextArrowBtnClicked = () => {
    setCurrentPage(currentPage + 1);
    scrollToTop();
  };

  const prevArrowBtnClicked = () => {
    setCurrentPage(currentPage - 1);
    scrollToTop();
  };

  const changeCountry = (val) => {
    setCountry(val);
  };

  return (
    <React.Fragment>
      {showLoader && (
        <div id="loaderContainer">
          <div id="loader">
            <LoaderProvider></LoaderProvider>
          </div>
        </div>
      )}
      <div
        style={{
          opacity: screenOpacity,
          backgroundColor: "#020d18",
        }}
      >
        <Header showSearchBar={true}></Header>

        <div className="search-single">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <NewsTopBar
                  forNews={true}
                  totalCount={totalNews}
                  countryList={CountryList}
                  changeCountry={changeCountry}
                ></NewsTopBar>
                {newsData.length === 0 ? (
                  <h2
                    style={{
                      color: "white",
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlign: "center",
                    }}
                  >
                    Not able to fetch current news. Please try again later.
                  </h2>
                ) : (
                  <React.Fragment>
                    <h1
                      style={{
                        color: "white",
                        marginLeft: "auto",
                        marginRight: "auto",
                        textAlign: "center",
                      }}
                    >
                      Current News
                    </h1>

                    {newsData.map((newsItem, index) => (
                      <div
                        key={index}
                        className="blog-item-style-1 search-list"
                      >
                        <img
                          src={
                            `${apiUrl.TmdbImageUrl}${newsItem.backdrop_path}`
                              ? `${apiUrl.TmdbImageUrl}${newsItem.backdrop_path}`
                              : noImage
                          }
                          alt=""
                          className="search-record-image"
                          style={{ height: "175px", width: "175px" }}
                          onLoad={() => {
                            hideLoader(newsData.length - 1 === index);
                          }}
                        />
                        <div className="blog-it-infor">
                          <React.Fragment>
                            <a href={newsItem.url} target="_blank">
                              <h4 className="news-title">{newsItem.title}</h4>
                            </a>

                            <span class="time">
                              {new Date(newsItem.release_date).toUTCString()}
                            </span>
                            <p className="news-description">
                              {newsItem.overview}
                            </p>
                          </React.Fragment>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
          {totalNews > 0 && (
            <BoxPagination
              pageSize={10}
              totalCount={totalNews}
              currentPage={currentPage}
              pageNumberClicked={pageNumberClicked}
              nextArrowBtnClicked={nextArrowBtnClicked}
              prevArrowBtnClicked={prevArrowBtnClicked}
              description="Movies"
            ></BoxPagination>
          )}
        </div>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default NewsList;

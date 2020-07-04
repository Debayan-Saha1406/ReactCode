/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import "../../../css/home.css";
import Header from "../Common/Header";
import "../../../css/movie-single.css";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import { useSelector } from "react-redux";
import "../../../css/login.css";
import { ToastContainer } from "react-toastify";
import Footer from "../Common/Footer";
import HomeSlider from "./HomeSlider";
import { page, apiUrl } from "./../../../Shared/Constants";
import homeImage from "../../../images/movieHome.jpg";
import WhatToWatch from "./WhatToWatch";
import BottomScrollListener from "react-bottom-scroll-listener";
import BornToday from "./BornToday";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import Trailers from "./Trailers";
import { useEffect } from "react";
import ThreeDotSpinner from "./../Common/ThreeDotSpinner";
import RecentlyViewedItem from "./RecentlyViewedItems";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "./../../../Provider/LocalStorageProvider";
import { recentlyViewed } from "./../../../Shared/Constants";
import NetworkDetector from "../Common/NetworkDetector";

const Home = () => {
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  const [starsBornToday, setStarsBornToday] = useState([]);
  const [movieTrailers, setMovieTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBottomReached, setIsBottomReached] = useState();
  const [recentlyViewedItems, setRecentlyViewedItems] = useState([]);
  const [
    isRecentlyViewedItemVisible,
    setIsRecentlyViewedItemVisible,
  ] = useState(false);
  const scrollToTrailers = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };
  const trailerRef = useRef(null);

  useEffect(() => {
    ServiceProvider.get(apiUrl.latestMovieTrailers).then((response) => {
      if (response.status === 200) {
        setMovieTrailers(response.data.data);
      }
    });
  }, []);

  useEffect(() => {
    if (isBottomReached) {
      ServiceProvider.get(apiUrl.starsBornToday).then((response) => {
        if (response.status === 200) {
          setStarsBornToday(response.data.data);
          setIsRecentlyViewedItemVisible(true);
          setIsLoading(false);
        } else {
          setIsRecentlyViewedItemVisible(true);
          setIsLoading(false);
        }
      });

      const recentlyViewedItems = getLocalStorageItem(recentlyViewed);
      setRecentlyViewedItems(recentlyViewedItems ? recentlyViewedItems : []);
    }
  }, [isBottomReached]);

  const handleScroll = (e) => {
    setIsLoading(true);
    setIsBottomReached(true);
  };

  const clearRecentlyViewedItems = () => {
    removeLocalStorageItem(recentlyViewed);
    setRecentlyViewedItems([]);
  };

  const navigateToTrailers = () => {
    scrollToTrailers(trailerRef);
  };

  return (
    <React.Fragment>
      <div id="loaderContainer">
        <div id="loader">{showLoader && <LoaderProvider></LoaderProvider>}</div>
      </div>
      <div
        style={{
          opacity: screenOpacity,
          backgroundColor: "#020d18",
        }}
      >
        <BottomScrollListener onBottom={handleScroll} />
        <div id="site-content">
          <Header showSearchBar={true} page={page.details}></Header>
          <div
            className="hero slider-5"
            style={{
              background: `url(${homeImage}) no-repeat`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <HomeSlider navigateToTrailers={navigateToTrailers}></HomeSlider>
            </div>
          </div>
          <main class="main-content">
            <div className="container">
              {/* <Main></Main> */}

              <div class="movie-items">
                <div class="row">
                  <WhatToWatch></WhatToWatch>
                  {movieTrailers.length > 0 && (
                    <div ref={trailerRef}>
                      <Trailers movieTrailers={movieTrailers}></Trailers>
                    </div>
                  )}
                  {isLoading && <ThreeDotSpinner></ThreeDotSpinner>}
                  {starsBornToday.length > 0 && (
                    <BornToday starsBornToday={starsBornToday}></BornToday>
                  )}

                  {isRecentlyViewedItemVisible && (
                    <RecentlyViewedItem
                      recentlyViewedItems={recentlyViewedItems}
                      clearRecentlyViewedItems={clearRecentlyViewedItems}
                    ></RecentlyViewedItem>
                  )}
                </div>
                <ToastContainer autoClose={3000}></ToastContainer>
              </div>
            </div>
          </main>
        </div>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default NetworkDetector(Home);

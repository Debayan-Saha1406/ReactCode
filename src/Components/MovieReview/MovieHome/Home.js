/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
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

const Home = () => {
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  const [starsBornToday, setStarsBornToday] = useState([]);
  const [isStarsBornTodayDataFetched, setStarsBornTodayDataFetched] = useState(
    false
  );

  const handleScroll = (e) => {
    if (!isStarsBornTodayDataFetched)
      ServiceProvider.get(apiUrl.starsBornToday).then((response) => {
        if (response.status === 200) {
          setStarsBornToday(response.data.data);
          setStarsBornTodayDataFetched(true);
        } else {
          setStarsBornTodayDataFetched(true);
        }
      });
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
              <HomeSlider></HomeSlider>
            </div>
          </div>
          <main class="main-content">
            <div className="container">
              {/* <Main></Main> */}

              <div class="movie-items">
                <div class="row">
                  <WhatToWatch></WhatToWatch>
                  {starsBornToday.length > 0 && (
                    <BornToday starsBornToday={starsBornToday}></BornToday>
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

export default Home;

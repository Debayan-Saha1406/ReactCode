/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../../css/home.css";
import Header from "../Common/Header";
import Main from "./Main";
import PopularMovies from "./PopularMovies";
import "../../../css/movie-single.css";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import { useSelector } from "react-redux";
import "../../../css/login.css";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);
  return (
    <React.Fragment>
      <div id="loaderContainer">
        <div id="loader">
          {showLoader && <LoaderProvider visible={showLoader}></LoaderProvider>}
        </div>
      </div>
      <div
        className="background"
        style={{
          opacity: screenOpacity,
        }}
      >
        <div id="site-content">
          <Header></Header>
          <main class="main-content">
            <div className="container">
              <Main></Main>

              <div class="movie-items">
                <div class="row">
                  <div class="col-md-12">
                    <div class="title-hd">
                      <h2>in theater</h2>
                      <a href="#" class="viewall">
                        View all <i class="ion-ios-arrow-right"></i>
                      </a>
                    </div>
                    <div class="tabs">
                      <ul class="tab-links">
                        <li class="active">
                          <a href="#tab1-h2">#Popular</a>
                        </li>
                        <li>
                          <a href="#tab2-h2"> #Coming soon</a>
                        </li>
                        <li>
                          <a href="#tab3-h2"> #Top rated </a>
                        </li>
                        <li>
                          <a href="#tab4-h2"> #Most reviewed</a>
                        </li>
                      </ul>
                      <PopularMovies></PopularMovies>
                    </div>
                    <ToastContainer autoClose={3000}></ToastContainer>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

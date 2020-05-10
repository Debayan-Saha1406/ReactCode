/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Overview from "../CelebrityDetails/Overview";
import Header from "./../../MovieReview/Common/Header";
import "../../../css/movie-single.css";
import image from "../../../images/movie-single.jpg";
import { page, celebrityTabs } from "../../../Shared/Constants";
import Biography from "./Biography";
import Filmography from "./Filmography";

const CelebrityDetails = (props) => {
  const [selectedTab, setSelectedTab] = useState(celebrityTabs.overview);
  return (
    <div>
      <Header page={page.details}></Header>
      <div class="hero hero3">
        <div class="celeb-container">
          <div class="row">
            <div class="col-md-12"></div>
          </div>
        </div>
      </div>

      <div class="celebrity-single movie-single cebleb-single">
        <div class="container">
          <div class="row ipad-width">
            <div class="col-md-4 col-sm-12 col-xs-12">
              <div class="mv-ceb">
                <img src={image} alt="" />
              </div>
            </div>
            <div class="col-md-8 col-sm-12 col-xs-12">
              <div class="movie-single-ct">
                <h1 class="bd-hd">Hugh Jackman</h1>
                <p class="ceb-single">Actor | Producer</p>
                <div class="movie-tabs">
                  <div class="tabs">
                    <ul class="tab-links tabs-mv">
                      {selectedTab === celebrityTabs.overview ? (
                        <li class="active">
                          <a
                            onClick={() =>
                              setSelectedTab(celebrityTabs.overview)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            Overview
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a
                            onClick={() =>
                              setSelectedTab(celebrityTabs.overview)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            Overview
                          </a>
                        </li>
                      )}
                      {selectedTab === celebrityTabs.biography ? (
                        <li className="active">
                          <a
                            onClick={() =>
                              setSelectedTab(celebrityTabs.biography)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            biography
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a
                            onClick={() =>
                              setSelectedTab(celebrityTabs.biography)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            biography
                          </a>
                        </li>
                      )}
                      {selectedTab === celebrityTabs.filmography ? (
                        <li className="active">
                          <a
                            onClick={() =>
                              setSelectedTab(celebrityTabs.filmography)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            filmography
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a
                            onClick={() =>
                              setSelectedTab(celebrityTabs.filmography)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            filmography
                          </a>
                        </li>
                      )}
                    </ul>
                    <div class="tab-content">
                      {selectedTab === celebrityTabs.overview ? (
                        <div
                          id="overviewceb"
                          class="tab active"
                          style={{ display: "block" }}
                        >
                          <div class="row">
                            <Overview></Overview>
                          </div>
                        </div>
                      ) : (
                        <div
                          id="overviewceb"
                          class="tab"
                          style={{ display: "none" }}
                        >
                          <div class="row">
                            <Overview></Overview>
                          </div>
                        </div>
                      )}
                      {selectedTab === celebrityTabs.biography ? (
                        <div
                          id="biography"
                          class="tab active"
                          style={{ display: "block" }}
                        >
                          <div class="row">
                            <Biography></Biography>
                          </div>
                        </div>
                      ) : (
                        <div
                          id="biography"
                          class="tab"
                          style={{ display: "none" }}
                        >
                          <div class="row">
                            <Biography></Biography>
                          </div>
                        </div>
                      )}
                    </div>
                    {selectedTab === celebrityTabs.filmography ? (
                      <div
                        id="filmography"
                        class="tab active"
                        style={{ display: "block" }}
                      >
                        <div class="row">
                          <Filmography></Filmography>
                        </div>{" "}
                      </div>
                    ) : (
                      <div
                        id="filmography"
                        class="tab"
                        style={{ display: "none" }}
                      >
                        <div class="row">
                          <Filmography></Filmography>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrityDetails;

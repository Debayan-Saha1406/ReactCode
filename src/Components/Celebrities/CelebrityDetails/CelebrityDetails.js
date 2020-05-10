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

  const redirectToTab = (tabType) => {
    if (tabType === celebrityTabs.biography) {
      setSelectedTab(celebrityTabs.biography);
    } else if (tabType === celebrityTabs.filmography) {
      setSelectedTab(celebrityTabs.filmography);
    }
  };
  return (
    <div>
      <Header page={page.details}></Header>
      <div className="hero hero3">
        <div className="celeb-container">
          <div className="row">
            <div className="col-md-12"></div>
          </div>
        </div>
      </div>

      <div className="celebrity-single movie-single cebleb-single">
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-4 col-sm-12 col-xs-12">
              <div className="mv-ceb">
                <img src={image} alt="" />
              </div>
            </div>
            <div className="col-md-8 col-sm-12 col-xs-12">
              <div className="movie-single-ct">
                <h1 className="bd-hd">Hugh Jackman</h1>
                <p className="ceb-single">Actor | Producer</p>
                <div className="movie-tabs">
                  <div className="tabs">
                    <ul className="tab-links tabs-mv">
                      {selectedTab === celebrityTabs.overview ? (
                        <li className="active">
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
                    <div className="tab-content">
                      {selectedTab === celebrityTabs.overview ? (
                        <div
                          id="overviewceb"
                          className="tab active"
                          style={{ display: "block" }}
                        >
                          <div className="row" style={{ marginTop: "30px" }}>
                            <Overview
                              setSelectedTab={setSelectedTab}
                              redirectToTab={redirectToTab}
                            ></Overview>
                          </div>
                        </div>
                      ) : (
                        <div
                          id="overviewceb"
                          className="tab"
                          style={{ display: "none" }}
                        >
                          <div className="row">
                            <Overview></Overview>
                          </div>
                        </div>
                      )}
                      {selectedTab === celebrityTabs.biography ? (
                        <div
                          id="biography"
                          className="tab active"
                          style={{ display: "block" }}
                        >
                          <div className="row">
                            <Biography></Biography>
                          </div>
                        </div>
                      ) : (
                        <div
                          id="biography"
                          className="tab"
                          style={{ display: "none" }}
                        >
                          <div className="row">
                            <Biography></Biography>
                          </div>
                        </div>
                      )}
                    </div>
                    {selectedTab === celebrityTabs.filmography ? (
                      <div
                        id="filmography"
                        className="tab active"
                        style={{ display: "block" }}
                      >
                        <div className="row">
                          <Filmography></Filmography>
                        </div>{" "}
                      </div>
                    ) : (
                      <div
                        id="filmography"
                        className="tab"
                        style={{ display: "none" }}
                      >
                        <div className="row">
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

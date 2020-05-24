/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Overview from "../CelebrityDetails/Overview";
import Header from "../../Common/Header";
import image from "../../../../images/movie-single.jpg";
import {
  page,
  celebrityTabs,
  apiUrl,
  gender,
} from "../../../../Shared/Constants";
import Biography from "./Biography";
import Filmography from "./Filmography";
import ServiceProvider from "../../../../Provider/ServiceProvider";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../../../Store/Actions/actionCreator";
import LoaderProvider from "../../../../Provider/LoaderProvider";
import "../../../../css/movie-single.css";

const CelebrityDetails = (props) => {
  const [selectedTab, setSelectedTab] = useState(celebrityTabs.overview);
  const [celebrity, setCelebrityResponse] = useState({});
  const [movies, setMovies] = useState([]);
  const [isCelebrityDetailFetched, setIsCelebrityDetailFetched] = useState(
    false
  );
  const dispatch = useDispatch();
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);

  useEffect(() => {
    const celebrityId = props.match.params.id;
    dispatch(toggleLoader(true, 0));
    ServiceProvider.getWithParam(apiUrl.celebrity, celebrityId).then(
      (response) => {
        if (response.status === 200) {
          setCelebrityResponse(response.data.data.celebrityResponse);
          setMovies(response.data.data.movieResponse);
          setIsCelebrityDetailFetched(true);
          dispatch(toggleLoader(false, 1));
        }
      }
    );
  }, [props.match.params.id, dispatch]);

  const redirectToTab = (tabType) => {
    if (tabType === celebrityTabs.biography) {
      setSelectedTab(celebrityTabs.biography);
    } else if (tabType === celebrityTabs.filmography) {
      setSelectedTab(celebrityTabs.filmography);
    }
  };
  return (
    <React.Fragment>
      <div id="loaderContainer">
        <div id="loader">
          {showLoader && <LoaderProvider visible={showLoader}></LoaderProvider>}
        </div>
      </div>
      <div
        style={{
          opacity: screenOpacity,
        }}
      >
        <Header page={page.details}></Header>
        {isCelebrityDetailFetched && (
          <div
            className="hero hero3"
            style={{
              background: `url(${celebrity.photo}) no-repeat`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        )}

        <div className="celebrity-single movie-single cebleb-single">
          <div className="container">
            <div className="row ipad-width">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <div className="mv-ceb">
                  <img src={image} alt="" />
                  {/* { Replace celebrity.photo } */}
                </div>
              </div>
              <div className="col-md-8 col-sm-12 col-xs-12">
                <div className="movie-single-ct">
                  <h1 className="bd-hd">
                    {isCelebrityDetailFetched && celebrity.celebrityName}
                  </h1>
                  <p className="ceb-single">
                    {isCelebrityDetailFetched &&
                    celebrity.gender.toLowerCase() === gender.male.toLowerCase()
                      ? "Actor"
                      : "Actress"}{" "}
                  </p>
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
                            {isCelebrityDetailFetched && (
                              <div
                                className="row"
                                style={{ marginTop: "30px" }}
                              >
                                <Overview
                                  setSelectedTab={setSelectedTab}
                                  redirectToTab={redirectToTab}
                                  celebrity={celebrity}
                                  movies={movies}
                                ></Overview>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div
                            id="overviewceb"
                            className="tab"
                            style={{ display: "none" }}
                          ></div>
                        )}
                        {selectedTab === celebrityTabs.biography ? (
                          <div
                            id="biography"
                            className="tab active"
                            style={{ display: "block" }}
                          >
                            {isCelebrityDetailFetched && (
                              <div className="row">
                                <Biography
                                  biography={celebrity.biography}
                                  celebrityName={celebrity.celebrityName}
                                ></Biography>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div
                            id="biography"
                            className="tab"
                            style={{ display: "none" }}
                          ></div>
                        )}
                      </div>
                      {selectedTab === celebrityTabs.filmography ? (
                        <div
                          id="filmography"
                          className="tab active"
                          style={{ display: "block" }}
                        >
                          {isCelebrityDetailFetched && (
                            <div className="row">
                              <Filmography
                                celebrityName={celebrity.celebrityName}
                                celebrityId={celebrity.id}
                              ></Filmography>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          id="filmography"
                          className="tab"
                          style={{ display: "none" }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CelebrityDetails;

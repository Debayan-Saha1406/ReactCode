/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import LoaderProvider from "../../../Provider/LoaderProvider";
import Header from "../Common/Header";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  gender,
  detailPageTabs,
  detailPageType,
  recentlyViewed,
} from "../../../Shared/Constants";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import { page } from "../../../Shared/Constants";
import Overview from "../CelebrityDetails/Overview";
import Biography from "../CelebrityDetails/Biography";
import Filmography from "../CelebrityDetails/Filmography";
import { useEffect } from "react";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl } from "../../../Shared/Constants";
import Footer from "../Common/Footer";
import { getLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { searchBarSubType } from "./../../../Shared/Constants";
import { setLocalStorageItem } from "./../../../Provider/LocalStorageProvider";

const DirectorDetails = (props) => {
  const [selectedTab, setSelectedTab] = useState(detailPageTabs.overview);
  const [director, setDirectorResponse] = useState({});
  const [movies, setMovies] = useState([]);
  const [isDirectorDetailFetched, setIsDirectorDetailFetched] = useState(false);
  const dispatch = useDispatch();
  const showLoader = useSelector((state) => state.uiDetails.showLoader);
  const screenOpacity = useSelector((state) => state.uiDetails.screenOpacity);

  useEffect(() => {
    const celebrityId = props.match.params.id;
    dispatch(toggleLoader(true, 0));
    ServiceProvider.getWithParam(apiUrl.director, celebrityId).then(
      (response) => {
        if (response.status === 200) {
          setDirectorResponse(response.data.data.directorResponse);
          setMovies(response.data.data.directorMovieResponse);
          setRecentlyViewedItems(response);
          setIsDirectorDetailFetched(true);
        }
      }
    );
  }, [props.match.params.id, dispatch]);

  const setRecentlyViewedItems = (response) => {
    const directorResponse = response.data.data.directorResponse;
    let recentlyViewedItems = getLocalStorageItem(recentlyViewed);
    let isItemAdded = false;
    if (!recentlyViewedItems) {
      recentlyViewedItems = [];
      recentlyViewedItems.push({
        id: Number(directorResponse.id),
        name: directorResponse.directorName,
        type: searchBarSubType.director,
        logo: directorResponse.photo,
      });
      setLocalStorageItem(recentlyViewed, recentlyViewedItems);
    } else {
      recentlyViewedItems.forEach((recentlyViewedItem) => {
        if (
          recentlyViewedItem.id === Number(directorResponse.id) &&
          recentlyViewedItem.type === searchBarSubType.director
        ) {
          isItemAdded = true;
        }
      });
      if (!isItemAdded) {
        recentlyViewedItems.unshift({
          id: Number(directorResponse.id),
          name: directorResponse.directorName,
          type: searchBarSubType.director,
          logo: directorResponse.photo,
        });
      }
      setLocalStorageItem(recentlyViewed, recentlyViewedItems);
    }
  };

  const redirectToTab = (tabType) => {
    if (tabType === detailPageTabs.biography) {
      setSelectedTab(detailPageTabs.biography);
    } else if (tabType === detailPageTabs.filmography) {
      setSelectedTab(detailPageTabs.filmography);
    }
  };

  const handleSuccessfulImageLoad = () => {
    setTimeout(() => {
      dispatch(toggleLoader(false, 1));
    }, 2000);
  };

  return (
    <React.Fragment>
      <div id="loaderContainer">
        <div id="loader">{showLoader && <LoaderProvider></LoaderProvider>}</div>
      </div>
      <div
        style={{
          opacity: screenOpacity,
        }}
      >
        <Header page={page.details} showSearchBar={true}></Header>
        {isDirectorDetailFetched && (
          <div
            className="hero hero3"
            style={{
              background: `url(${director.coverPhoto})`,
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
                  <img
                    src={director.photo}
                    style={{ width: "320px", height: "480px" }}
                    alt=""
                    onLoad={handleSuccessfulImageLoad}
                  />
                </div>
              </div>
              <div className="col-md-8 col-sm-12 col-xs-12">
                <div className="movie-single-ct">
                  <h1 className="bd-hd">
                    {isDirectorDetailFetched && director.directorName}
                  </h1>
                  <p className="ceb-single">
                    {isDirectorDetailFetched &&
                    director.gender.toLowerCase() === gender.male.toLowerCase()
                      ? "Director"
                      : "Women Director"}{" "}
                  </p>
                  <div className="movie-tabs">
                    <div className="tabs">
                      <ul className="tab-links tabs-mv">
                        {selectedTab === detailPageTabs.overview ? (
                          <li className="active">
                            <a
                              onClick={() =>
                                setSelectedTab(detailPageTabs.overview)
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
                                setSelectedTab(detailPageTabs.overview)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Overview
                            </a>
                          </li>
                        )}
                        {selectedTab === detailPageTabs.biography ? (
                          <li className="active">
                            <a
                              onClick={() =>
                                setSelectedTab(detailPageTabs.biography)
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
                                setSelectedTab(detailPageTabs.biography)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              biography
                            </a>
                          </li>
                        )}
                        {selectedTab === detailPageTabs.filmography ? (
                          <li className="active">
                            <a
                              onClick={() =>
                                setSelectedTab(detailPageTabs.filmography)
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
                                setSelectedTab(detailPageTabs.filmography)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              filmography
                            </a>
                          </li>
                        )}
                      </ul>
                      <div className="tab-content">
                        {selectedTab === detailPageTabs.overview ? (
                          <div
                            id="overviewceb"
                            className="tab active"
                            style={{ display: "block" }}
                          >
                            {isDirectorDetailFetched && (
                              <div
                                className="row"
                                style={{ marginTop: "30px" }}
                              >
                                <Overview
                                  setSelectedTab={setSelectedTab}
                                  redirectToTab={redirectToTab}
                                  star={director}
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
                        {selectedTab === detailPageTabs.biography ? (
                          <div
                            id="biography"
                            className="tab active"
                            style={{ display: "block" }}
                          >
                            {isDirectorDetailFetched && (
                              <div className="row">
                                <Biography
                                  biography={director.biography}
                                  name={director.celebrityName}
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
                      {selectedTab === detailPageTabs.filmography ? (
                        <div
                          id="filmography"
                          className="tab active"
                          style={{ display: "block" }}
                        >
                          {isDirectorDetailFetched && (
                            <div className="row">
                              <Filmography
                                directorName={director.directorName}
                                directorId={director.id}
                                type={detailPageType.director}
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
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
};

export default DirectorDetails;

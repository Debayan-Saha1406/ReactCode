/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Overview from "../CelebrityDetails/Overview";
import {
  page,
  detailPageTabs,
  apiUrl,
  gender,
  detailPageType,
  recentlyViewed,
} from "../../../Shared/Constants";
import Biography from "./Biography";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import "../../../css/movie-single.css";
import Filmography from "./Filmography";
import Header from "./../Common/Header";
import LoaderProvider from "./../../../Provider/LoaderProvider";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import Footer from "../Common/Footer";
import { getLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { searchBarSubType } from "./../../../Shared/Constants";
import { setLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import NetworkDetector from "../Common/NetworkDetector";
import CoverPhoto from "../Common/CoverPhoto";

const CelebrityDetails = (props) => {
  const [selectedTab, setSelectedTab] = useState(detailPageTabs.overview);
  const [celebrity, setCelebrityResponse] = useState({});
  const [movies, setMovies] = useState([]);
  const [isCelebrityDetailFetched, setIsCelebrityDetailFetched] = useState(
    false
  );
  const [isCoverPhotoVisible, setCoverPhotoVisibility] = useState(false);
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
          setRecentlyViewedItems(response);
          setIsCelebrityDetailFetched(true);
        }
      }
    );
  }, [props.match.params.id, dispatch]);

  const setRecentlyViewedItems = (response) => {
    const celebrityResponse = response.data.data.celebrityResponse;
    let recentlyViewedItems = getLocalStorageItem(recentlyViewed);
    let isItemAdded = false;
    if (!recentlyViewedItems) {
      recentlyViewedItems = [];
      recentlyViewedItems.push({
        id: Number(celebrityResponse.id),
        name: celebrityResponse.celebrityName,
        type: searchBarSubType.celebrity,
        logo: celebrityResponse.photo,
      });
      setLocalStorageItem(recentlyViewed, recentlyViewedItems);
    } else {
      recentlyViewedItems.forEach((recentlyViewedItem) => {
        if (
          recentlyViewedItem.id === Number(celebrityResponse.id) &&
          recentlyViewedItem.type === searchBarSubType.celebrity
        ) {
          isItemAdded = true;
        }
      });
      if (!isItemAdded) {
        recentlyViewedItems.unshift({
          id: Number(celebrityResponse.id),
          name: celebrityResponse.celebrityName,
          type: searchBarSubType.celebrity,
          logo: celebrityResponse.photo,
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
      {isCoverPhotoVisible && (
        <CoverPhoto
          closePhoto={() => setCoverPhotoVisibility(false)}
          coverPhoto={celebrity.coverPhoto}
        ></CoverPhoto>
      )}
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
        }}
      >
        <Header page={page.details} showSearchBar={true}></Header>
        {isCelebrityDetailFetched && (
          <div
            className="hero hero3"
            style={{
              background: `url(${celebrity.coverPhoto})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              cursor: "pointer",
            }}
            onClick={() => {
              setCoverPhotoVisibility(true);
            }}
          ></div>
        )}

        <div className="celebrity-single movie-single cebleb-single">
          <div className="container">
            <div className="row ipad-width">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <div className="mv-ceb">
                  <img
                    src={celebrity.photo}
                    alt=""
                    onLoad={handleSuccessfulImageLoad}
                  />
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
                            {isCelebrityDetailFetched && (
                              <div
                                className="row"
                                style={{ marginTop: "30px" }}
                              >
                                <Overview
                                  setSelectedTab={setSelectedTab}
                                  redirectToTab={redirectToTab}
                                  star={celebrity}
                                  movies={movies}
                                  showNetWorth={true}
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
                            {isCelebrityDetailFetched && (
                              <div className="row">
                                <Biography
                                  biography={celebrity.biography}
                                  name={celebrity.celebrityName}
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
                          {isCelebrityDetailFetched && (
                            <div className="row">
                              <Filmography
                                name={celebrity.celebrityName}
                                celebrityId={celebrity.id}
                                type={detailPageType.celebrity}
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

export default NetworkDetector(CelebrityDetails);

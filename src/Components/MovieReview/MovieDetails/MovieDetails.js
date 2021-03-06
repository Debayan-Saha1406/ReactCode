/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Header from "../Common/Header";
import "../../../css/movie-single.css";
import MovieReview from "./MovieReview";
import Overview from "./Overview";
import Cast from "./Cast";
import ServiceProvider from "../../../Provider/ServiceProvider";
import {
  apiUrl,
  movieDetailTabs,
  popupType,
  constants,
  page,
  recentlyViewed,
} from "../../../Shared/Constants";
import { connect } from "react-redux";
import {
  toggleLoader,
  togglePopup,
} from "../../../Store/Actions/actionCreator";
import LoaderProvider from "../../../Provider/LoaderProvider";
import ReactPlayer from "react-player";
import { Redirect } from "react-router-dom";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
} from "./../../../Provider/LocalStorageProvider";
import StarRating from "../Common/StarRating";
import Gallery from "../Common/Gallery";
import Footer from "./../Common/Footer";
import { setLocalStorageItem } from "./../../../Provider/LocalStorageProvider";
import { searchBarSubType } from "./../../../Shared/Constants";
import NetworkDetector from "../Common/NetworkDetector";
import { compose } from "redux";
import Information from "../Popups/Information";
import { saveUserInfo } from "./../../../Store/Actions/actionCreator";
import CoverPhoto from "../Common/CoverPhoto";
import ImageGallery from "./ImageGallery";

let releaseYear = "",
  loginDetails = {},
  movieId = 0;
class MovieDetails extends Component {
  state = {
    selectedTab: movieDetailTabs.overview,
    movie: {},
    showVideo: false,
    isRatingGiven: false,
    redirectToNotFound: false,
    isMovieDetailPresent: false,
    userRating: -1,
    isFavourite: false,
    isRatingDataFetched: false,
    showGallery: false,
    galleryImages: [],
    showInformationPopup: false,
    isCoverPhotoVisible: false,
  };

  toggleTab = (destTab) => {
    this.setState({ selectedTab: destTab });
  };

  toggleFavourite = () => {
    if (this.props.isUserLoggedIn) {
      this.setState({ isFavourite: !this.state.isFavourite }, () => {
        const movieDetail = { ...this.state.movie };
        this.sendUserMovieDetailsRequest(movieDetail, this.state.userRating);
      });
    } else {
      this.props.togglePopup("openform", popupType.login);
    }
  };

  componentDidMount() {
    movieId = this.props.match.params.id;
    this.fetchMovies();
  }

  showTrailer = (showVideo) => {
    this.setState({ showVideo });
  };

  changeRating = (newRating) => {
    if (this.props.isUserLoggedIn) {
      const movieDetail = { ...this.state.movie };
      this.setAvgRating(movieDetail, newRating);

      if (!this.state.isRatingGiven) {
        movieDetail.movie.totalRatings += 1;
      }

      this.sendUserMovieDetailsRequest(movieDetail, newRating);
    } else {
      this.props.togglePopup("openform", popupType.login);
    }
  };

  fetchMovies() {
    this.props.toggleLoader(true, 0);
    ServiceProvider.getWithParam(apiUrl.movie, movieId).then((response) => {
      if (response.status === 200) {
        let index = response.data.data.movie.releaseDate.indexOf(",");
        releaseYear = response.data.data.movie.releaseDate.substring(
          index + 1,
          response.data.data.movie.releaseDate.length
        );
        this.setRecentlyViewedItems(response);

        this.setState({
          movie: response.data.data,
          isMovieDetailPresent: true,
        });
      } else if (response.status === 404) {
        this.setState({ redirectToNotFound: true });
      }
    });
  }

  setRecentlyViewedItems(response) {
    let recentlyViewedItems = getLocalStorageItem(recentlyViewed);
    let isItemAdded = false;
    if (!recentlyViewedItems) {
      recentlyViewedItems = [];
      recentlyViewedItems.push({
        id: Number(movieId),
        name: response.data.data.movie.movieName,
        type: searchBarSubType.movie,
        logo: response.data.data.movie.movieLogo,
      });
      setLocalStorageItem(recentlyViewed, recentlyViewedItems);
    } else {
      recentlyViewedItems.forEach((recentlyViewedItem) => {
        if (
          recentlyViewedItem.id === Number(movieId) &&
          recentlyViewedItem.type === searchBarSubType.movie
        ) {
          isItemAdded = true;
        }
      });
      if (!isItemAdded) {
        recentlyViewedItems.unshift({
          id: Number(movieId),
          name: response.data.data.movie.movieName,
          type: searchBarSubType.movie,
          logo: response.data.data.movie.movieLogo,
        });
      }
      setLocalStorageItem(recentlyViewed, recentlyViewedItems);
    }
  }

  sendUserMovieDetailsRequest(movieDetail, userRating) {
    const body = {
      avgRating: movieDetail.movie.avgRating,
      userEmail: this.props.loggedInEmail,
      userRating: userRating,
      totalRating: movieDetail.movie.totalRatings,
      isFavourite: this.state.isFavourite,
    };
    this.props.toggleLoader(true, "15%");
    ServiceProvider.put(
      apiUrl.updateUserMovieDetails,
      this.state.movie.movie.movieId,
      body
    ).then((response) => {
      if (response.status === 200) {
        this.setState(
          {
            isRatingGiven: true,
            movie: movieDetail,
            userRating: userRating,
          },
          () => {
            this.props.toggleLoader(false, 1);
          }
        );
      } else if (response.status === 401) {
        this.setState({ showInformationPopup: true });
        this.props.saveUserInfo("", false, true);
        this.props.toggleLoader(false, 1);
        removeLocalStorageItem(constants.userDetails);
      }
    });
  }

  fetchMovieUserRatings(movieId) {
    ServiceProvider.getWithTwoParams(
      apiUrl.userMovieDetails,
      loginDetails.email,
      movieId
    ).then((response) => {
      if (response.status === 200 && response.data.data.length !== 0) {
        response.data.data.forEach((movieUserDetails) => {
          if (movieUserDetails.movieId == movieId) {
            if (movieUserDetails.rating !== 0) {
              this.setState({
                userRating: movieUserDetails.rating,
                isRatingGiven: true,
                isRatingDataFetched: true,
                isFavourite: movieUserDetails.isFavourite,
              });
            } else {
              this.setState({
                isRatingGiven: false,
                isRatingDataFetched: true,
                isFavourite: movieUserDetails.isFavourite,
              });
            }
          }
        });
      }
    });
  }

  setAvgRating(movieDetail, userRating) {
    if (!this.state.isRatingGiven)
      movieDetail.movie.avgRating = +(
        (movieDetail.movie.avgRating * movieDetail.movie.totalRatings +
          userRating) /
        (movieDetail.movie.totalRatings + 1)
      ).toFixed(1);
    else {
      movieDetail.movie.avgRating = +(
        (movieDetail.movie.avgRating * movieDetail.movie.totalRatings -
          this.state.userRating +
          userRating) /
        movieDetail.movie.totalRatings
      ).toFixed(1);
    }
  }

  handleImageLoad = () => {
    setTimeout(() => {
      this.props.toggleLoader(false, 1); //To ensure background image is also loaded
    }, 2000);
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      movieId = this.props.match.params.id;
      this.fetchMovies();
    }
    //Need To Check For Extra Api Calls
    if (!this.props.isUserLoggedIn && this.state.userRating !== -1) {
      this.setState({
        userRating: -1,
        isRatingGiven: false,
        isFavourite: false,
        isRatingDataFetched: false,
      });
    }

    if (this.props.isUserLoggedIn && !this.state.isRatingDataFetched) {
      loginDetails = getLocalStorageItem(constants.loginDetails);
      if (loginDetails) {
        this.fetchMovieUserRatings(movieId); //for Giving rating and Refresh
      }
    }
  }

  viewGallery = () => {
    this.setState({ showGallery: true });
  };

  closeGallery = () => {
    this.setState({ showGallery: false });
  };

  handleOk = () => {
    this.setState({ showInformationPopup: false });
    this.props.togglePopup("openform", popupType.login);
  };

  render() {
    const { isMovieDetailPresent } = this.state;
    if (this.state.redirectToNotFound) {
      return <Redirect to="/not-found"></Redirect>;
    }
    return (
      <React.Fragment>
        {this.state.isCoverPhotoVisible && (
          <CoverPhoto
            closePhoto={() => this.setState({ isCoverPhotoVisible: false })}
            coverPhoto={this.state.movie.movie.coverPhoto}
          ></CoverPhoto>
        )}
        {this.props.showLoader && (
          <div id="loaderContainer">
            <div id="loader">
              <LoaderProvider></LoaderProvider>
            </div>
          </div>
        )}
        {this.state.showInformationPopup && !this.props.isUserLoggedIn ? (
          <Information
            title={"Log In"}
            content={
              this.props.hasSessionTimedOut
                ? "Your session has timed out. Please Login To Continue"
                : "Please Login To Continue"
            }
            popupClassName={"openform"}
            closePopup={this.handleOk}
            btnText="Ok"
          ></Information>
        ) : (
          this.renderMovieDetails(isMovieDetailPresent)
        )}
      </React.Fragment>
    );
  }

  renderMovieDetails(isMovieDetailPresent) {
    return (
      <React.Fragment>
        {this.state.showGallery && (
          <ImageGallery
            closeGallery={this.closeGallery}
            movieId={movieId}
          ></ImageGallery>
        )}
        <div
          style={{
            opacity: this.props.screenOpacity,
          }}
        >
          <Header page={page.details} showSearchBar={true}></Header>

          {isMovieDetailPresent && (
            <div
              className="hero details"
              style={{
                background: `url(${this.state.movie.movie.coverPhoto}) center center / cover no-repeat`,
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({ isCoverPhotoVisible: true });
              }}
            >
              <div className="celeb-container">
                <div className="row">
                  <div className="col-md-12"></div>
                </div>
              </div>
            </div>
          )}
          {this.state.showVideo && (
            <div className="show-overlay openform">
              <div className="login-wrapper" id="login-content">
                <div
                  className="close-cross"
                  onClick={() => this.showTrailer(false)}
                  style={{ cursor: "pointer" }}
                >
                  <i class="fa fa-times-circle"></i>
                </div>
                <ReactPlayer
                  url={
                    isMovieDetailPresent && this.state.movie.movie.youtubeUrl
                  }
                  controls={true}
                  style={{ backgroundColor: "black" }}
                />
              </div>
            </div>
          )}
          <div
            className="celebrity-single movie-single movie_single movie-detail-single"
            id="movie-detail"
          >
            <div className="container">
              <div className="row ipad-width2">
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <div className="movie-img sticky-sb">
                    {isMovieDetailPresent && (
                      <img
                        src={this.state.movie.movie.movieLogo}
                        onLoad={this.handleImageLoad}
                        alt=""
                      />
                    )}
                    <div className="movie-btn">
                      <div className="btn-transform transform-vertical red">
                        <div>
                          <a
                            onClick={() => this.showTrailer(true)}
                            className="item item-1 redbtn"
                            id="black-hover"
                          >
                            <i className="fa fa-play" aria-hidden="true"></i>{" "}
                            Watch Trailer
                          </a>
                        </div>
                      </div>
                      <div className="btn-transform transform-vertical">
                        <div>
                          <a
                            className="item item-1 yellowbtn"
                            id="view-gallery"
                            onClick={this.viewGallery}
                          >
                            {" "}
                            View Gallery
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 col-sm-12 col-xs-12">
                  <div className="movie-single-ct main-content">
                    <h1 className="bd-hd">
                      {isMovieDetailPresent && this.state.movie.movie.movieName}
                      <span>{releaseYear}</span>
                    </h1>
                    <div className="social-btn">
                      <div className="parent-btn">
                        {this.state.isFavourite ? (
                          <i
                            className="fa fa-heart"
                            aria-hidden="true"
                            onClick={this.toggleFavourite}
                            style={{ cursor: "pointer" }}
                          ></i>
                        ) : (
                          <i
                            className="fa fa-heart-o"
                            aria-hidden="true"
                            onClick={this.toggleFavourite}
                            style={{ cursor: "pointer" }}
                          ></i>
                        )}
                        {this.state.isFavourite
                          ? "Remove From  Favourite"
                          : "Add to Favorite"}
                      </div>
                    </div>
                    <div className="movie-rate" id="movie-rate">
                      <div className="rate">
                        <i
                          className="fa fa-star"
                          id="rating-icon"
                          style={{
                            fontSize: "25px",
                            color: "yellow",
                          }}
                        ></i>
                        <p>
                          <span>
                            {isMovieDetailPresent &&
                              this.state.movie.movie.avgRating}
                          </span>
                          <br />
                          {
                            <span className="rv">
                              {isMovieDetailPresent &&
                                this.state.movie.movie.totalRatings}{" "}
                              Ratings
                            </span>
                          }
                        </p>
                      </div>
                      <div className="rate-star">
                        <p>Rate This Movie: </p>
                        <ul className="menu">
                          <StarRating
                            userRating={this.state.userRating}
                            changeRating={this.changeRating}
                          ></StarRating>
                        </ul>
                      </div>
                    </div>

                    <div className="movie-tabs">
                      <div className="tabs">
                        <ul className="tab-links tabs-mv">
                          {this.state.selectedTab ===
                          movieDetailTabs.overview ? (
                            <li className="active">
                              <a
                                onClick={() => {
                                  this.setState({
                                    selectedTab: movieDetailTabs.overview,
                                  });
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                Overview
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a
                                onClick={() => {
                                  this.setState({
                                    selectedTab: movieDetailTabs.overview,
                                  });
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                Overview
                              </a>
                            </li>
                          )}
                          {this.state.selectedTab === movieDetailTabs.review ? (
                            <li className="active">
                              <a
                                onClick={() => {
                                  this.setState({
                                    selectedTab: movieDetailTabs.review,
                                  });
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
                                Reviews
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a
                                onClick={() => {
                                  this.setState({
                                    selectedTab: movieDetailTabs.review,
                                  });
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
                                Reviews
                              </a>
                            </li>
                          )}
                          {this.state.selectedTab === movieDetailTabs.cast ? (
                            <li className="active">
                              <a
                                onClick={() => {
                                  this.setState({
                                    selectedTab: movieDetailTabs.cast,
                                  });
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
                                Cast{" "}
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a
                                onClick={() => {
                                  this.setState({
                                    selectedTab: movieDetailTabs.cast,
                                  });
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
                                Cast{" "}
                              </a>
                            </li>
                          )}
                        </ul>
                        <div className="tab-content">
                          {this.state.selectedTab ===
                            movieDetailTabs.overview &&
                            isMovieDetailPresent && (
                              <Overview
                                directors={this.state.movie.directors}
                                celebrities={this.state.movie.celebrities}
                                selectedTab={this.state.selectedTab}
                                genres={this.state.movie.genres}
                                movieOverview={this.state.movie.movie}
                                reviews={this.state.movie.reviews}
                                toggleTab={this.toggleTab}
                              ></Overview>
                            )}
                          {this.state.selectedTab === movieDetailTabs.review &&
                            isMovieDetailPresent && (
                              <MovieReview
                                movieName={this.state.movie.movie.movieName}
                                movieId={this.state.movie.movie.movieId}
                                selectedTab={this.state.selectedTab}
                              ></MovieReview>
                            )}
                          {this.state.selectedTab === movieDetailTabs.cast &&
                            isMovieDetailPresent && (
                              <Cast
                                selectedTab={this.state.selectedTab}
                                stars={this.state.movie.celebrities}
                                directors={this.state.movie.directors}
                                movieName={this.state.movie.movie.movieName}
                              />
                            )}
                        </div>
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
  }
}

const mapStateToProps = (state) => {
  return {
    showLoader: state.uiDetails.showLoader,
    screenOpacity: state.uiDetails.screenOpacity,
    isUserLoggedIn: state.loggedInUserInfo.isUserLoggedIn,
    loggedInEmail: state.loggedInUserInfo.loggedInEmail,
    hasSessionTimedOut: state.loggedInUserInfo.hasSessionTimedOut,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoader: (showLoader, screenOpacity) => {
      dispatch(toggleLoader(showLoader, screenOpacity));
    },
    togglePopup: (popupClassName, popupType) => {
      dispatch(togglePopup(popupClassName, popupType));
    },
    saveUserInfo: (loggedInEmail, isUserLoggedIn, hasSessionTimedOut) => {
      dispatch(saveUserInfo(loggedInEmail, isUserLoggedIn, hasSessionTimedOut));
    },
  };
};

const hoc = compose(
  connect(mapStateToProps, mapDispatchToProps),
  NetworkDetector
);

export default hoc(MovieDetails);

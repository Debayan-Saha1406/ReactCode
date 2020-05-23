/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Header from "../Common/Header";
import image from "../../../images/movie-single.jpg";
import "../../../css/movie-single.css";
import MovieReview from "./MovieReview";
import Overview from "./Overview";
import Cast from "./Cast";
import ServiceProvider from "../../../Provider/ServiceProvider";
import {
  apiUrl,
  ratingStars,
  movieDetailTabs,
  popupType,
  constants,
  page,
} from "../../../Shared/Constants";
import { connect } from "react-redux";
import {
  toggleLoader,
  togglePopup,
} from "../../../Store/Actions/actionCreator";
import LoaderProvider from "../../../Provider/LoaderProvider";
import ReactPlayer from "react-player";
import "../../../css/movie-single.css";
import { Redirect } from "react-router-dom";
import { getLocalStorageItem } from "./../../../Provider/LocalStorageProvider";

let releaseYear = "",
  loginDetails = {},
  movieId = 0;
class MovieDetails extends Component {
  state = {
    selectedTab: movieDetailTabs.overview,
    movie: {},
    indexClicked: -1,
    showVideo: false,
    isRatingGiven: false,
    redirectToNotFound: false,
    isMovieDetailPresent: false,
    userRating: -1,
    isFavourite: false,
    resetValue: true,
  };

  toggleTab = (destTab) => {
    this.setState({ selectedTab: destTab });
  };

  toggleFavourite = () => {
    if (this.props.isUserLoggedIn) {
      this.setState({ isFavourite: !this.state.isFavourite }, () => {
        const movieDetail = { ...this.state.movie };
        this.sendUserMovieDetailsRequest(
          movieDetail,
          this.state.indexClicked + 1
        );
      });
    } else {
      this.props.togglePopup("openform", popupType.login);
    }
  };

  componentDidMount() {
    movieId = this.props.match.params.id;
    if (!this.props.isUserLoggedIn) {
      this.setState({ indexClicked: -1, isFavourite: false });
    }

    loginDetails = getLocalStorageItem(constants.loginDetails);
    this.fetchMovieUserRatings(movieId); //for Giving rating and Refresh

    this.props.toggleLoader(true, 0);
    ServiceProvider.getWithParam(apiUrl.movie, movieId).then((response) => {
      if (response.status === 200) {
        let index = response.data.data.movie.releaseDate.indexOf(",");
        releaseYear = response.data.data.movie.releaseDate.substring(
          index + 1,
          response.data.data.movie.releaseDate.length
        );
        this.setState(
          { movie: response.data.data, isMovieDetailPresent: true },
          () => {
            this.props.toggleLoader(false, 1);
          }
        );
      } else if (response.status === 404) {
        this.setState({ redirectToNotFound: true });
      }
    });
  }

  toggleStar = (index) => {
    this.setState({ indexClicked: index });
  };

  toggleAllStars = () => {
    if (!this.state.isRatingGiven && this.state.indexClicked === -1) {
      this.setState({ indexClicked: -1 });
    } else {
      this.setState({ indexClicked: this.state.userRating });
    }
  };

  showTrailer = (showVideo) => {
    this.setState({ showVideo });
  };

  handleStarClick = (index) => {
    debugger;
    if (this.props.isUserLoggedIn) {
      const movieDetail = { ...this.state.movie };
      this.setAvgRating(movieDetail, index);

      if (!this.state.isRatingGiven) {
        movieDetail.movie.totalRatings += 1;
      }

      this.sendUserMovieDetailsRequest(movieDetail, index);
    } else {
      this.props.togglePopup("openform", popupType.login);
    }
  };

  sendUserMovieDetailsRequest(movieDetail, index) {
    const body = {
      avgRating: movieDetail.movie.avgRating,
      userEmail: this.props.loggedInEmail,
      userRating: index + 1,
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
            userRating: index,
          },
          () => {
            this.fetchMovieUserRatings(movieId);
            this.props.toggleLoader(false, 1);
          }
        );
      }
    });
  }

  fetchMovieUserRatings(movieId) {
    debugger;
    loginDetails = getLocalStorageItem(constants.loginDetails);
    if (loginDetails) {
      ServiceProvider.getWithTwoParams(
        apiUrl.userMovieDetails,
        loginDetails.email,
        movieId
      ).then((response) => {
        if (response.status === 200 && response.data.data.length !== 0) {
          response.data.data.forEach((movieUserDetails) => {
            if (movieUserDetails.movieId == movieId) {
              this.setState(
                {
                  indexClicked: movieUserDetails.rating - 1,
                  userRating: movieUserDetails.rating - 1,
                  isRatingGiven: true,
                  isFavourite: movieUserDetails.isFavourite,
                },
                () => {}
              );
            }
          });
        }
      });
    }
  }

  setAvgRating(movieDetail, index) {
    if (!this.state.isRatingGiven)
      movieDetail.movie.avgRating = +(
        (movieDetail.movie.avgRating * movieDetail.movie.totalRatings +
          (index + 1)) /
        (movieDetail.movie.totalRatings + 1)
      ).toFixed(1);
    else {
      movieDetail.movie.avgRating = +(
        (movieDetail.movie.avgRating * movieDetail.movie.totalRatings -
          this.state.userRating +
          (index + 1)) /
        movieDetail.movie.totalRatings
      ).toFixed(1);
    }
  }

  componentDidUpdate() {
    // if (!this.props.isUserLoggedIn && this.state.indexClicked !== -1) {
    //   this.setState({ indexClicked: -1 });
    // }
    if (!this.props.isUserLoggedIn && this.state.resetValue !== false) {
      this.setState({
        isFavourite: false,
        indexClicked: -1,
        resetValue: false,
      });
    }

    // if (this.state.indexClicked === -1 && this.props.isUserLoggedIn) {
    //   const userDetails = getLocalStorageItem(constants.userDetails);
    //   if (userDetails) {
    //     if (userDetails.userMovieRating.length > 0) {
    //       userDetails.userMovieRating.forEach((userMovieRating) => {
    //         if (userMovieRating.movieId == movieId) {
    //           this.setState({
    //             indexClicked: userMovieRating.rating - 1,
    //             isFavourite: userMovieRating.isFavourite,
    //           });
    //         }
    //       });
    //     }
    //   }
    //this.fetchMovieUserRatings(movieId);
  }

  render() {
    const { isMovieDetailPresent } = this.state;
    if (this.state.redirectToNotFound) {
      return <Redirect to="/not-found"></Redirect>;
    }
    return (
      <React.Fragment>
        <div id="loaderContainer">
          <div id="loader">
            {this.props.showLoader && (
              <LoaderProvider visible={this.props.showLoader}></LoaderProvider>
            )}
          </div>
        </div>
        {this.renderMovieDetails(isMovieDetailPresent)}
      </React.Fragment>
    );
  }

  renderMovieDetails(isMovieDetailPresent) {
    return (
      <div
        style={{
          opacity: this.props.screenOpacity,
        }}
      >
        <Header page={page.details}></Header>
        <div
          class="hero hero3"
          style={{
            background: `url(${image}) no-repeat`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div class="celeb-container">
            <div class="row">
              <div class="col-md-12"></div>
            </div>
          </div>
        </div>
        {this.state.showVideo && (
          <div className="overlay openform">
            <div className="login-wrapper" id="login-content">
              <div
                className="close-cross"
                onClick={() => this.showTrailer(false)}
                style={{ cursor: "pointer" }}
              >
                <i class="fa fa-times-circle"></i>
              </div>
              <ReactPlayer
                url={isMovieDetailPresent && this.state.movie.movie.youtubeUrl}
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
                  {<img src={image} alt="" />}
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
                        <a href="#" className="item item-1 yellowbtn">
                          {" "}
                          <i className="ion-card"></i> View Imdb
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
                  <div class="social-btn">
                    <div class="parent-btn">
                      <i
                        class="fa fa-heart"
                        aria-hidden="true"
                        onClick={this.toggleFavourite}
                        style={{ cursor: "pointer" }}
                      ></i>{" "}
                      {this.state.isFavourite
                        ? "Remove From  Favourite"
                        : "Add to Favorite"}
                    </div>
                  </div>
                  <div
                    className="movie-rate"
                    onMouseOut={this.toggleAllStars}
                    id="movie-rate"
                  >
                    <div className="rate">
                      <i
                        className="fa fa-star"
                        id="rating-icon"
                        style={{
                          fontSize: "17px",
                          color: "yellow",
                          cursor: "pointer",
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
                        {ratingStars.map((rating, index) => (
                          <li key={rating}>
                            {this.state.indexClicked >= index ? (
                              <i
                                className="fa fa-star"
                                style={{
                                  fontSize: "17px",
                                  color: "yellow",
                                  cursor: "pointer",
                                }}
                                onMouseOver={() => this.toggleStar(index)}
                                onMouseOut={() => this.toggleStar(index)}
                                onClick={() => this.handleStarClick(index)}
                              ></i>
                            ) : (
                              <i
                                className="fa fa-star-o"
                                style={{
                                  fontSize: "17px",
                                  color: "white",
                                  cursor: "pointer",
                                }}
                                onMouseOver={() => this.toggleStar(index)}
                                onMouseOut={() => this.toggleStar(index)}
                                onClick={() => this.handleStarClick(index)}
                              ></i>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="movie-tabs">
                    <div className="tabs">
                      <ul className="tab-links tabs-mv">
                        {this.state.selectedTab === movieDetailTabs.overview ? (
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
                        {this.state.selectedTab === movieDetailTabs.overview &&
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLoader: state.uiDetails.showLoader,
    screenOpacity: state.uiDetails.screenOpacity,
    isUserLoggedIn: state.loggedInUserInfo.isUserLoggedIn,
    loggedInEmail: state.loggedInUserInfo.loggedInEmail,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);

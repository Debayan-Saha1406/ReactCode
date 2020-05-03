/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Header from "../Common/Header";
import image from "../../../images/movie-single.jpg";
import "../../../css/movie-single.css";
import MovieReview from "./MovieReview";
import Overview from "./Overview";
import Cast from "./Cast";
import ServiceProvider from "../../../Provider/ServiceProvider";
import { apiUrl, ratingStars } from "../../../Shared/Constants";
import { connect } from "react-redux";
import { toggleLoader } from "../../../Store/Actions/actionCreator";
import LoaderProvider from "../../../Provider/LoaderProvider";
import ReactPlayer from "react-player";
import "../../../css/movie-single.css";

let releaseYear = "";
class MovieDetails extends Component {
  state = {
    selectedTab: "overview",
    movie: {},
    indexClicked: -1,
    showVideo: false,
    isRatingGiven: false,
  };

  toggleTab = (destTab) => {
    this.setState({ selectedTab: destTab });
  };

  componentDidMount() {
    const { movieId } = this.props.location.state;
    this.props.toggleLoader(true, 0);
    ServiceProvider.getWithParam(apiUrl.movie, movieId).then((response) => {
      if (response.status === 200) {
        let index = response.data.data.movie.releaseDate.indexOf(",");
        releaseYear = response.data.data.movie.releaseDate.substring(
          index + 1,
          response.data.data.movie.releaseDate.length
        );
        this.setState({ movie: response.data.data }, () => {
          this.props.toggleLoader(false, 1);
        });
      }
    });
  }

  toggleStar = (index) => {
    this.setState({ indexClicked: index });
  };

  toggleAllStars = () => {
    if (!this.state.isRatingGiven) {
      this.setState({ indexClicked: -1 });
    }
  };

  showTrailer = (showVideo) => {
    this.setState({ showVideo });
  };

  handleStarClick = (index) => {
    const movieDetail = { ...this.state.movie };
    movieDetail.movie.avgRating = +(
      (movieDetail.movie.avgRating * movieDetail.movie.totalRatings +
        (index + 1)) /
      (movieDetail.movie.totalRatings + 1)
    ).toFixed(1);
    movieDetail.movie.totalRatings += 1;

    const body = {
      avgRating: movieDetail.movie.avgRating,
    };

    ServiceProvider.put(apiUrl.rating, 1, body).then((response) => {
      if (response.status === 200) {
        this.setState({ isRatingGiven: true, movie: movieDetail });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.movie.movie ? (
          <div id="loaderContainer">
            <div id="loader">
              {this.props.showLoader && (
                <LoaderProvider
                  visible={this.props.showLoader}
                ></LoaderProvider>
              )}
            </div>
          </div>
        ) : (
          <div
            className="background"
            style={{
              opacity: this.props.screenOpacity,
            }}
          >
            <Header></Header>
            <div className="hero mv-single-hero">
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
                      url={this.state.movie.movie.youtubeUrl}
                      controls={true}
                      style={{ backgroundColor: "black" }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="page-single movie-single movie_single">
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
                        {this.state.movie.movie.movieName}
                        <span>{releaseYear}</span>
                      </h1>
                      <div className="movie-rate">
                        <div className="rate">
                          <i
                            className="fa fa-star"
                            id="rating-icon"
                            style={{ fontSize: "17px", color: "yellow" }}
                          ></i>
                          <p>
                            <span>{this.state.movie.movie.avgRating}</span>
                            <br />
                            {
                              <span className="rv">
                                {this.state.movie.movie.totalRatings} Ratings
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
                                    }}
                                    onMouseOver={() => this.toggleStar(index)}
                                    onMouseOut={() => this.toggleStar(index)}
                                  ></i>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div
                        className="movie-tabs"
                        onMouseOver={this.toggleAllStars}
                      >
                        <div className="tabs">
                          <ul className="tab-links tabs-mv">
                            {this.state.selectedTab === "overview" ? (
                              <li className="active">
                                <a
                                  onClick={() => {
                                    this.setState({ selectedTab: "overview" });
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
                                    this.setState({ selectedTab: "overview" });
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  Overview
                                </a>
                              </li>
                            )}
                            {this.state.selectedTab === "review" ? (
                              <li className="active">
                                <a
                                  onClick={() => {
                                    this.setState({ selectedTab: "review" });
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
                                    this.setState({ selectedTab: "review" });
                                  }}
                                  style={{ cursor: "pointer" }}
                                >
                                  {" "}
                                  Reviews
                                </a>
                              </li>
                            )}
                            {this.state.selectedTab === "cast" ? (
                              <li className="active">
                                <a
                                  onClick={() => {
                                    this.setState({ selectedTab: "cast" });
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
                                    this.setState({ selectedTab: "cast" });
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
                            {this.state.selectedTab === "overview" && (
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
                            {this.state.selectedTab === "review" && (
                              <MovieReview
                                movieName={this.state.movie.movie.movieName}
                                selectedTab={this.state.selectedTab}
                              ></MovieReview>
                            )}
                            {this.state.selectedTab === "cast" && (
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
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLoader: state.uiDetails.showLoader,
    screenOpacity: state.uiDetails.screenOpacity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoader: (showLoader, screenOpacity) => {
      dispatch(toggleLoader(showLoader, screenOpacity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);

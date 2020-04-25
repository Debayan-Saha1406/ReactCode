/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Header from "../Common/Header";
import image from "../../../images/movie-single.jpg";
import "../../../css/movie-single.css";
import MovieReview from "./MovieReview";
import Overview from "./Overview";
import Cast from "./Cast";
import ServiceProvider from "./../../../Provider/ServiceProvider";
import { apiUrl } from "../../../Shared/Constants";

class MovieSingleHomePage extends Component {
  state = {
    selectedTab: "overview",
    movie: {},
  };

  componentDidMount() {
    ServiceProvider.getWithParam(apiUrl.movie, 1).then((response) => {
      this.setState({ movie: response.data.data }, () => {});
    });
  }

  render() {
    return (
      <div className="background">
        <Header></Header>
        <div className="hero mv-single-hero">
          <div className="container"></div>
        </div>
        <div className="page-single movie-single movie_single">
          <div className="container">
            <div className="row ipad-width2">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <div className="movie-img sticky-sb">
                  {this.state.movie.movie && (
                    <img src={this.state.movie.movie.movieLogo} alt="" />
                  )}
                  <div className="movie-btn">
                    <div className="btn-transform transform-vertical red">
                      <div>
                        <a href="#" className="item item-1 redbtn">
                          {" "}
                          <i className="ion-play"></i> Watch Trailer
                        </a>
                      </div>
                      <div>
                        <a
                          href="https://www.youtube.com/embed/o-0hcF97wy0"
                          className="item item-2 redbtn fancybox-media hvr-grow"
                        >
                          <i className="ion-play"></i>
                        </a>
                      </div>
                    </div>
                    <div className="btn-transform transform-vertical">
                      <div>
                        <a href="#" className="item item-1 yellowbtn">
                          {" "}
                          <i className="ion-card"></i> Buy ticket
                        </a>
                      </div>
                      <div>
                        <a href="#" className="item item-2 yellowbtn">
                          <i className="ion-card"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-sm-12 col-xs-12">
                <div className="movie-single-ct main-content">
                  <h1 className="bd-hd">
                    {this.state.movie.movie && this.state.movie.movie.movieName}{" "}
                    <span>2015</span>
                  </h1>
                  <div className="movie-rate">
                    <div className="rate">
                      <i
                        className="fa fa-star"
                        id="rating-icon"
                        style={{ fontSize: "17px", color: "yellow" }}
                      ></i>
                      <p>
                        <span>
                          {this.state.movie.movie &&
                            this.state.movie.movie.avgRating}
                        </span>{" "}
                        /10
                        <br />
                        <span className="rv">56 Ratings</span>
                      </p>
                    </div>
                    <div className="rate-star">
                      <p>Rate This Movie: </p>
                      <i
                        className="fa fa-star"
                        style={{ fontSize: "17px", color: "yellow" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ fontSize: "17px", color: "yellow" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ fontSize: "17px", color: "yellow" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ fontSize: "17px", color: "yellow" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ fontSize: "17px", color: "yellow" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ fontSize: "17px", color: "yellow" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ fontSize: "17px", color: "yellow" }}
                      ></i>
                      <i
                        className="fa fa-star"
                        style={{ fontSize: "17px", color: "yellow" }}
                      ></i>
                      <i
                        className="fa fa-star-o"
                        style={{ fontSize: "17px", color: "white" }}
                      ></i>
                    </div>
                  </div>

                  <div className="movie-tabs">
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
                            >
                              {" "}
                              Cast{" "}
                            </a>
                          </li>
                        )}
                      </ul>
                      <div className="tab-content">
                        {this.state.selectedTab === "overview" &&
                          this.state.movie.directors &&
                          this.state.movie.celebrities &&
                          this.state.movie.movie && (
                            <Overview
                              directors={this.state.movie.directors}
                              celebrities={this.state.movie.celebrities}
                              selectedTab={this.state.selectedTab}
                              genres={this.state.movie.genres}
                              movieOverview={this.state.movie.movie}
                              reviews={this.state.movie.reviews}
                            ></Overview>
                          )}
                        {this.state.selectedTab === "review" && (
                          <MovieReview
                            selectedTab={this.state.selectedTab}
                          ></MovieReview>
                        )}
                        {this.state.selectedTab === "cast" && (
                          <Cast selectedTab={this.state.selectedTab} />
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

export default MovieSingleHomePage;

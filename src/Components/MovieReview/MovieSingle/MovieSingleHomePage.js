/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Header from "../Common/Header";
import image from "../../../images/movie-single.jpg";
import "../../../css/movie-single.css";
import MovieReview from "./MovieReview";
import Overview from "./Overview";
import Cast from "./Cast";

class MovieSingleHomePage extends Component {
  state = {
    selectedTab: "overview",
  };
  render() {
    return (
      <div className="background">
        <Header></Header>
        <div class="hero mv-single-hero">
          <div class="container"></div>
        </div>
        <div class="page-single movie-single movie_single">
          <div class="container">
            <div class="row ipad-width2">
              <div class="col-md-4 col-sm-12 col-xs-12">
                <div class="movie-img sticky-sb">
                  <img src={image} alt="" />
                  <div class="movie-btn">
                    <div class="btn-transform transform-vertical red">
                      <div>
                        <a href="#" class="item item-1 redbtn">
                          {" "}
                          <i class="ion-play"></i> Watch Trailer
                        </a>
                      </div>
                      <div>
                        <a
                          href="https://www.youtube.com/embed/o-0hcF97wy0"
                          class="item item-2 redbtn fancybox-media hvr-grow"
                        >
                          <i class="ion-play"></i>
                        </a>
                      </div>
                    </div>
                    <div class="btn-transform transform-vertical">
                      <div>
                        <a href="#" class="item item-1 yellowbtn">
                          {" "}
                          <i class="ion-card"></i> Buy ticket
                        </a>
                      </div>
                      <div>
                        <a href="#" class="item item-2 yellowbtn">
                          <i class="ion-card"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8 col-sm-12 col-xs-12">
                <div class="movie-single-ct main-content">
                  <h1 class="bd-hd">
                    Skyfall: Quantum of Spectre <span>2015</span>
                  </h1>
                  <div class="movie-rate">
                    <div class="rate">
                      <i
                        class="fa fa-star"
                        id="rating-icon"
                        style={{ fontSize: "18px", color: "yellow" }}
                      ></i>
                      <p>
                        <span>8.1</span> /10
                        <br />
                        <span class="rv">56 Reviews</span>
                      </p>
                    </div>
                    <div class="rate-star">
                      <p>Rate This Movie: </p>
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "18px", color: "yellow" }}
                      ></i>
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "18px", color: "yellow" }}
                      ></i>
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "18px", color: "yellow" }}
                      ></i>
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "18px", color: "yellow" }}
                      ></i>
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "18px", color: "yellow" }}
                      ></i>
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "18px", color: "yellow" }}
                      ></i>
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "18px", color: "yellow" }}
                      ></i>
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "18px", color: "yellow" }}
                      ></i>
                      <i
                        class="fa fa-star-o"
                        style={{ fontSize: "18px", color: "white" }}
                      ></i>
                    </div>
                  </div>

                  <div class="movie-tabs">
                    <div class="tabs">
                      <ul class="tab-links tabs-mv">
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
                          <li class="active">
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
                      <div class="tab-content">
                        {this.state.selectedTab === "overview" && (
                          <Overview
                            selectedTab={this.state.selectedTab}
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

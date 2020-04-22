/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "../../../css/home.css";
import Header from "../Common/Header";
import Main from "./Main";
import PopularMovies from "./PopularMovies";
import "../../../css/movie-single.css";

class MovieHomePage extends Component {
  state = {};
  render() {
    return (
      <div className="background">
        <div id="site-content">
          <Header></Header>
          <main class="main-content">
            <div className="container">
              <Main></Main>

              <div class="movie-items">
                <div class="row">
                  <div class="col-md-12">
                    <div class="title-hd">
                      <h2>in theater</h2>
                      <a href="#" class="viewall">
                        View all <i class="ion-ios-arrow-right"></i>
                      </a>
                    </div>
                    <div class="tabs">
                      <ul class="tab-links">
                        <li class="active">
                          <a href="#tab1-h2">#Popular</a>
                        </li>
                        <li>
                          <a href="#tab2-h2"> #Coming soon</a>
                        </li>
                        <li>
                          <a href="#tab3-h2"> #Top rated </a>
                        </li>
                        <li>
                          <a href="#tab4-h2"> #Most reviewed</a>
                        </li>
                      </ul>
                      <PopularMovies></PopularMovies>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default MovieHomePage;

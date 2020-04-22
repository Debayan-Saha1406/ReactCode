/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "../../../css/movie-single.css";
import image from "../../../images/mv1.jpg";
import { Component } from "react";
import { Redirect } from "react-router-dom";

class MovieGridMain extends Component {
  state = { readMoreOpacity: 0, redirectToDescPage: false };

  toggleReadMoreOpacity = (opacity) => {
    this.setState({ readMoreOpacity: opacity });
  };
  render() {
    if (this.state.redirectToDescPage) {
      return <Redirect to="/movie-single"></Redirect>;
    }
    return (
      <div class="page-single">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="topbar-filter fw">
                <p>
                  Found <span>1,608 movies</span> in total
                </p>
                <label className="filterBy">Sort by:</label>
                <select>
                  <option value="popularity">Popularity Descending</option>
                  <option value="popularity">Popularity Ascending</option>
                  <option value="rating">Rating Descending</option>
                  <option value="rating">Rating Ascending</option>
                  <option value="date">Release date Descending</option>
                  <option value="date">Release date Ascending</option>
                </select>
                <a href="movielist.html" class="list">
                  <i class="ion-ios-list-outline "></i>
                </a>
                <a href="moviegridfw.html" class="grid">
                  <i class="ion-grid active"></i>
                </a>
              </div>
              <div class="flex-wrap-movielist mv-grid-fw">
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src={image} alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">oblivion</a>
                    </h6>
                    <p class="rate">
                      <i
                        class="fa fa-star"
                        style={{
                          fontSize: "20px",
                          color: "yellow",
                          marginRight: "5px",
                        }}
                      ></i>
                      <span>8.1</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img
                    src={image}
                    alt=""
                    onMouseOver={() => this.toggleReadMoreOpacity(1)}
                    onMouseOut={() => this.toggleReadMoreOpacity(0)}
                  />
                  <div
                    class="hvr-inner"
                    style={{ opacity: this.state.readMoreOpacity }}
                  >
                    <a
                      onClick={() => {
                        this.setState({ redirectToDescPage: true });
                      }}
                      onMouseOver={() => this.toggleReadMoreOpacity(1)}
                    >
                      {" "}
                      Read more
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">into the wild</a>
                    </h6>
                    <p class="rate">
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "40px", color: "yellow" }}
                      ></i>
                      <span>7.8</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src={image} alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">Die hard</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src={image} alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">The walk</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src={image} alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">blade runner </a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.3</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src={image} alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">Mulholland pride</a>
                    </h6>
                    <p class="rate">
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "40px", color: "yellow" }}
                      ></i>
                      <span>7.2</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv5.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">skyfall: evil of boss</a>
                    </h6>
                    <p class="rate">
                      <i
                        class="fa fa-star"
                        style={{ fontSize: "40px", color: "yellow" }}
                      ></i>
                      <span>7.0</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-item1.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">Interstellar</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-item2.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">The revenant</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-it10.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">harry potter</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-it11.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">guardians galaxy</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-it12.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">the godfather</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-item6.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">blue velvet</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-item7.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">gravity</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-item8.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">southpaw</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-it9.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">jurassic park</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-item9.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">the forest</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-item10.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">spectre</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-item11.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">strager things</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv-item12.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">la la land</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.4</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv1.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">oblivion</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>8.1</span> /10
                    </p>
                  </div>
                </div>
                <div class="movie-item-style-2 movie-item-style-1">
                  <img src="images/uploads/mv2.jpg" alt="" />
                  <div class="hvr-inner">
                    <a href="moviesingle.html">
                      {" "}
                      Read more <i class="ion-android-arrow-dropright"></i>{" "}
                    </a>
                  </div>
                  <div class="mv-item-infor">
                    <h6>
                      <a href="#">into the wild</a>
                    </h6>
                    <p class="rate">
                      <i class="ion-android-star"></i>
                      <span>7.8</span> /10
                    </p>
                  </div>
                </div>
              </div>
              <div class="topbar-filter">
                <label>Movies per page:</label>
                <select>
                  <option value="range">20 Movies</option>
                  <option value="saab">10 Movies</option>
                </select>

                <div class="pagination2">
                  <span>Page 1 of 2:</span>
                  <a class="active" href="#">
                    1
                  </a>
                  <a href="#">2</a>
                  <a href="#">3</a>
                  <a href="#">...</a>
                  <a href="#">78</a>
                  <a href="#">79</a>
                  <a href="#">
                    <i class="ion-arrow-right-b"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieGridMain;
